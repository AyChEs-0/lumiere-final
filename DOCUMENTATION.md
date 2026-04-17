# Cine Lumière — Documentación de Arquitectura y Producto

---

## 1. Decisión arquitectónica: TMDB → BD local → App

```
TMDB API ──► php artisan tmdb:sync ──► tabla `peliculas` (MySQL) ──► App
              (único momento en       (única fuente de verdad        (nunca consulta
               que se toca TMDB)       en runtime)                    TMDB directamente)
```

**Por qué este flujo unidireccional:**

- La app funciona aunque TMDB esté caído o la API key expire temporalmente.
- Permite añadir datos propios (salas, sesiones, precios, campo `activa`) sin acoplarlos a la API externa.
- Las queries del usuario son rápidas: van contra MySQL local, no contra una API HTTP.
- `tmdb:sync` es idempotente (upsert por `titulo`): se puede ejecutar N veces sin duplicar ni perder datos.

**Lo que NO existe (intencionalmente):**

- No hay endpoint que consulte TMDB durante una request de usuario.
- No hay "cartelera TMDB" separada de la cartelera local — hay una sola cartelera.
- No hay formulario admin de creación manual de películas desde cero (se usa `tmdb:sync`).

---

## 2. Por qué los pósters se sirven desde la CDN de TMDB

Los pósters **no se descargan ni almacenan localmente**. La columna `poster_path` guarda solo el path relativo (ej: `/abc123.jpg`) y la URL completa se construye en `Pelicula::getPosterUrlAttribute()`:

```
https://image.tmdb.org/t/p/w500 + /abc123.jpg
```

**Razones:**

| Criterio | CDN de TMDB |
|---|---|
| Almacenamiento | 0 MB en nuestro servidor |
| Ancho de banda | Servido por Akamai (CDN global) |
| Mantenimiento | Cero — TMDB actualiza sus imágenes |
| Disponibilidad | Alta disponibilidad de TMDB CDN |

**Prioridad de resolución del póster** (en `Pelicula::getPosterUrlAttribute()`):

1. Imagen local subida manualmente por el admin (`uploads/peliculas/xxx.jpg`)
2. URL externa ya completa almacenada en `poster_path` (compatibilidad con datos anteriores)
3. Path relativo de TMDB → CDN URL construida
4. SVG placeholder generado dinámicamente con las iniciales del título

---

## 3. Estrategia de base de datos

### Datos y su origen

| Dato | Origen | ¿Se puede regenerar? |
|---|---|---|
| Películas | TMDB via `tmdb:sync` | ✅ Sí, con `tmdb:sync` |
| Categorías | `tmdb:sync` + seeders | ✅ Sí |
| Cines / Salas | Seeders + admin | ⚠️ Solo si hay backup |
| Sesiones | Seeders + admin | ⚠️ Solo si hay backup |
| Reservas | Usuarios reales | ❌ No regenerables |
| Usuarios | Registro real | ❌ No regenerables |

### Cuándo usar cada comando

```bash
# Entorno de desarrollo nuevo (sin datos):
php artisan migrate:fresh --seed    # Borra TODO y recrea desde cero

# Producción / staging con datos reales:
php artisan migrate                 # Solo aplica migraciones nuevas, no toca datos
php artisan tmdb:sync               # Actualiza/añade películas sin tocar reservas ni usuarios

# CI / tests:
php artisan test                    # Usa SQLite en memoria — nunca toca la BD real
```

### Volumen Docker

```bash
docker compose down        # ✅ Seguro — el volumen mysql_data persiste
docker compose down -v     # ⚠️ DESTRUCTIVO — elimina el volumen y todos los datos
```

---

## 4. Flujo de compra

### Guest (sin autenticación)

```
GET /cartelera
  └─► GET /peliculas/{id}          (detalle + horarios)
       └─► GET /comprar?sesion_id=X   (paso 1: nº entradas por tipo)
            └─► POST /comprar          (guarda en sesión PHP)
                 └─► GET /comprar/butaques   (paso 2: mapa de butacas)
                      └─► POST /comprar/butaques  (bloqueo temporal 8 min)
                           └─► GET /comprar/pagament   (paso 3: datos + pago)
                                └─► POST /comprar/pagament
                                     └─► GET /comprar/confirmacio  ✅
                                          (email de confirmación en cola)
```

**Campos requeridos para guest:** nombre, email, butacas seleccionadas.

**Anti-concurrencia:** `SeatLock` bloquea la butaca durante 8 minutos mientras el usuario está en el flujo. Si otro usuario intenta la misma butaca, recibe error. Los bloqueos expiran automáticamente (`sesions:clean`).

### Usuario autenticado

Mismo flujo, pero:
- Los campos nombre/email se pre-rellenan desde el perfil.
- La reserva queda vinculada al `user_id`.
- Visible en "Les Meves Reserves" (`/mis-reserves`).

---

## 5. Modelo de datos

### Entidades principales

```
users
  id, name, apellidos, telefono, rol (cliente|admin|taquilla),
  email, password, tarjeta_guardada

categorias
  id, nombre

cines
  id, nombre, direccion_completa, ciudad, provincia

salas
  id, nombre, capacidad, disposicion_butacas (standard|premium|vip),
  fk_cine_id → cines.id

peliculas
  id, titulo, sinopsis, duracion_min, classificacio_edad,
  trailer_url, poster_path, activa

pelicula_categoria  (pivot)
  fk_pelicula_id → peliculas.id
  fk_categoria_id → categorias.id

sesions
  id, fk_sala_id → salas.id, fk_pelicula_id → peliculas.id,
  fecha_hora, preu_base

reservas
  id, fk_usuario_id → users.id (nullable para guests),
  fk_sesion_id → sesions.id,
  tipus_entrada (adult|reduit|familia|jubilat),
  butaques_seleccionades, total_pagat, estat (pendent|pagat|cancelat),
  nom_client, email_client  (solo para compras guest)

seat_locks
  id, sesion_id, butaca, user_id (nullable), session_token, expires_at
```

### Relaciones clave

```
Pelicula  ──has many──►  Sesion  ──has many──►  Reserva
                │                                   │
                └──belongs to many──► Categoria      └──belongs to──► User

Sala  ──belongs to──►  Cine
Sala  ──has many──►    Sesion
```

---

## 6. Roles de usuario

| Rol | Permisos |
|---|---|
| `cliente` | Comprar entradas, ver sus reservas, cancelar reservas propias |
| `taquilla` | Todo lo de cliente + gestión de sesiones y reservas |
| `admin` | Todo lo anterior + gestión de películas, cines, salas y usuarios |

Implementado via middleware `isAdmin` y `canManage` en `routes/web.php`.

---

## 7. Rutas principales

| Ruta | Descripción | Auth |
|---|---|---|
| `GET /` | Home con película destacada y carousel | Pública |
| `GET /cartelera` | Cartelera — películas activas con sesiones futuras | Pública |
| `GET /peliculas/{id}` | Detalle de película + sesiones disponibles | Pública |
| `GET /comprar` | Inicio del flujo de compra (paso 1) | Pública |
| `GET /mis-reserves` | Historial de reservas del usuario | Auth |
| `GET /dashboard` | Panel admin/taquilla | Auth + canManage |
| `GET /admin/peliculas` | Gestión de películas | Auth + canManage |
| `GET /tmdb` | Catálogo TMDB (solo admin) | Auth + isAdmin |
