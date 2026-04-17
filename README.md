# 🎬 Cine Lumière

Aplicación de gestión de cine y venta de entradas online construida con **Laravel 12**, **Tailwind CSS** y **MySQL**.

---

## Requisitos

| Herramienta | Versión mínima |
|---|---|
| PHP | 8.2+ |
| Composer | 2.x |
| Node.js | 18+ |
| MySQL | 8.0+ (o Docker) |
| Docker + Compose | v2 (opcional, recomendado) |

---

## Setup local (sin Docker)

```bash
# 1. Clonar e instalar dependencias
git clone https://github.com/AyChEs-0/lumiere-final.git
cd lumiere-final
composer install
npm install

# 2. Configurar entorno
cp .env.example .env
php artisan key:generate

# 3. Editar .env con tus credenciales MySQL y tu TMDB_API_KEY

# 4. Migrar y sembrar (solo la primera vez en un entorno vacío)
php artisan migrate --seed

# 5. Importar películas desde TMDB
php artisan tmdb:sync

# 6. Enlazar storage público
php artisan storage:link

# 7. Compilar assets
npm run build

# 8. Arrancar servidor de desarrollo
php artisan serve
```

La app queda disponible en `http://localhost:8000`.

---

## Setup con Docker (recomendado)

```bash
# 1. Copiar variables de entorno Docker
cp .env.example .env
# Editar .env: APP_URL=http://localhost:8080, DB_HOST=mysql, etc.

# 2. Arrancar todos los servicios
docker compose up -d

# 3. Primera vez — migrar y sembrar (solo en entorno fresco sin datos)
docker compose exec app php artisan migrate --seed

# 4. Importar películas
docker compose exec app php artisan tmdb:sync
```

La app queda disponible en **http://localhost:8080**.

> ⚠️ **`docker compose down` es seguro** — los datos de MySQL persisten en el volumen `mysql_data`.
>
> ⚠️ **`docker compose down -v` es DESTRUCTIVO** — elimina el volumen y **borra todos los datos** (reservas, usuarios, etc.). Úsalo solo para resetear completamente el entorno.

---

## Comandos frecuentes

```bash
# Ejecutar tests
php artisan test

# Sincronizar películas desde TMDB (idempotente, seguro en producción)
php artisan tmdb:sync

# Procesar colas (emails de confirmación de reserva)
php artisan queue:work

# Limpiar sesiones de compra expiradas
php artisan sesions:clean

# Enlazar storage público (necesario tras clonar o desplegar)
php artisan storage:link

# Compilar assets para producción
npm run build

# Modo desarrollo con hot-reload
npm run dev
```

> ⚠️ **`php artisan migrate:fresh --seed` borra TODOS los datos** (usuarios, reservas, sesiones).
> Úsalo solo en desarrollo o CI desde cero, **nunca en producción o staging con datos reales**.
> En producción usa `php artisan migrate` (sin `--seed`) y luego `php artisan tmdb:sync`.

---

## Usuarios de prueba (tras `--seed`)

| Email | Contraseña | Rol |
|---|---|---|
| admin@cinema.test | password | admin |
| cliente@cinema.test | password | cliente |

---

## Despliegue en Railway.app

Railway ofrece MySQL gestionado y dominio HTTPS gratuito, ideal para portfolio/demo.

### Pasos

1. Crear cuenta en [railway.app](https://railway.app)
2. **New Project → Deploy from GitHub repo** → seleccionar este repositorio
3. Añadir un servicio **MySQL** desde el panel de Railway
4. Configurar las variables de entorno en el panel de Railway:

```env
APP_NAME="Cine Lumière"
APP_ENV=production
APP_KEY=             # php artisan key:generate --show
APP_DEBUG=false
APP_URL=https://tu-app.railway.app

DB_CONNECTION=mysql
DB_HOST=             # proporcionado por Railway MySQL
DB_PORT=3306
DB_DATABASE=         # proporcionado por Railway MySQL
DB_USERNAME=         # proporcionado por Railway MySQL
DB_PASSWORD=         # proporcionado por Railway MySQL

TMDB_API_KEY=        # tu clave de https://www.themoviedb.org/settings/api
SERVICES_MOVIES_API_API_KEY=  # mismo valor que TMDB_API_KEY

MAIL_MAILER=smtp
MAIL_HOST=           # tu proveedor SMTP (Resend, Mailgun, etc.)
MAIL_FROM_ADDRESS=noreply@tu-dominio.com

QUEUE_CONNECTION=sync
SESSION_DRIVER=database
CACHE_STORE=database
```

5. Tras el primer despliegue, ejecutar en el panel de Railway (o via CLI):

```bash
php artisan migrate --force
php artisan tmdb:sync
php artisan storage:link
```

### Alternativa: Render.com

Mismo perfil que Railway. Algo más lento en cold start (plan gratuito hiberna tras inactividad).

---

## Estructura del proyecto

```
app/
├── Console/Commands/       # tmdb:sync, sesions:clean, etc.
├── Http/Controllers/       # Controladores (delgados, lógica en Services)
├── Models/                 # Eloquent models
└── Services/               # DevsApiHubMovieService (TMDB)

database/
├── factories/              # Factories para tests
├── migrations/             # Esquema de BD versionado
└── seeders/                # DatabaseSeeder orquesta los demás

resources/views/
├── layout.blade.php        # Layout maestro
├── peliculas/              # Cartelera + detalle
├── compra/                 # Flujo de compra (3 pasos)
└── auth/                   # Login, registro, recuperación

routes/
├── web.php                 # Todas las rutas HTTP
└── console.php             # Scheduling de comandos
```

---

## Tests

```bash
php artisan test              # Suite completa
php artisan test --filter Cartelera   # Solo tests de cartelera
```

La suite usa SQLite en memoria (`DB_CONNECTION=sqlite`, `DB_DATABASE=:memory:`) — no afecta a la BD real.
