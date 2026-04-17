<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key'    => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel'              => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    // ── TMDB / Movies API ────────────────────────────────────────────────────
    // Configuración usada por DevsApiHubMovieService.
    // Clave real en .env (SERVICES_MOVIES_API_API_KEY). Nunca en este fichero.
    'movies_api' => [
        'enabled'       => env('SERVICES_MOVIES_API_ENABLED', true),
        'base_url'      => env('SERVICES_MOVIES_API_BASE_URL', 'https://api.themoviedb.org/3'),
        'api_key'       => env('SERVICES_MOVIES_API_API_KEY', env('TMDB_API_KEY', '')),
        'language'      => env('SERVICES_MOVIES_API_LANGUAGE', 'es-ES'),
        'image_base_url'=> env('SERVICES_MOVIES_API_IMAGE_BASE_URL', 'https://image.tmdb.org/t/p/w500'),
        'timeout'       => env('SERVICES_MOVIES_API_TIMEOUT', 8),
    ],

];
