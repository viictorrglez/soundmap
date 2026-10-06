# CLAUDE.md — MVP red social de música (reseñas + mapa de artistas de España)

Consultar este archivo al inicio de CADA sesión. Trabajar paso a paso y esperar confirmación del usuario antes de pasar al siguiente bloque.

## Producto
1. **Reseñas estilo Letterboxd** de canciones y álbumes.
2. **Mapa interactivo de España** para descubrir artistas emergentes: CCAA → Provincia → Ciudad.

Mobile-first (PWA instalable, uso principal en móvil, probar a 375px) y correcto en escritorio. UI en español.

## Stack
- Next.js (App Router) + TypeScript, Tailwind CSS
- Supabase (Postgres, Auth, Storage) vía `@supabase/ssr`
- Vercel
- Mapa: `react-simple-maps` o `d3-geo` + `topojson-client`. PROHIBIDO Google Maps / Mapbox.
- Geodatos: TopoJSON de `martgnz/es-atlas` (autonomous_regions.json, provinces.json, municipalities.json), con códigos INE. Cargar SOLO el nivel necesario en cada momento.

## Modelo de datos
- users: id, username, display_name, avatar_url, city, bio, created_at
- artists: id, name, avatar_url, bio, genre, city, province, ccaa (+ city_code, province_code, ccaa_code INE), external_link, created_by, created_at
- releases: id, artist_id, title, cover_url, type (track|album), release_date, external_link, created_by
- reviews: id, user_id, release_id, rating (1–5, medios puntos), review_text, created_at — UNIQUE(user_id, release_id) (repetir = actualizar)
- follows (opcional): follower_id, followed_id
- RLS: nadie edita/borra reseñas ajenas. Lectura pública.

## Pantallas
/ (feed, 20 reseñas recientes) · /login · /registro · /release/[id] · /usuario/[username] · /perfil · /buscar (ilike) · /nuevo-release · /mapa · /artista/[id] · /nuevo-artista

## Mapa (comportamiento)
- Inicio: CCAA coloreadas por nº de artistas (más = más intenso), Canarias en recuadro, Ceuta y Melilla.
- Clic CCAA → zoom a provincias; clic provincia → municipios (si son muchos, solo ciudades con ≥1 artista); clic ciudad → bottom sheet/panel con artistas (avatar, nombre, género) enlazando a /artista/[id].
- Breadcrumb siempre visible ("España > Galicia > Pontevedra > Vigo") navegable. Botón "Resetear vista".
- Áreas de toque mínimas para polígonos pequeños. Regiones sin artistas: gris neutro, no navegables; si se clica: "Todavía no hay artistas en X. ¿Conoces a alguno? Añádelo tú."
- Animaciones suaves y ligeras.

## Criterios de aceptación clave
- Registro → puntuar → reseñar → se ve en perfil y ficha → media se actualiza.
- RLS impide tocar reseñas ajenas.
- /mapa: Galicia → Pontevedra → Vigo → lista de artistas. Nuevo artista actualiza contadores/color en la siguiente carga.

## Orden de trabajo
1. Base del proyecto + esquema BD  ← 
2. Registro, login, perfil
3. Ficha release + reseñas + feed
4. Alta artistas/releases + ficha artista con reproductor
5. Mapa a nivel CCAA
6. Zoom provincias/ciudades + panel + breadcrumb
7. Pulido (vacíos, errores, loading)

## Decisiones
- Cualquier usuario autenticado puede crear artistas y releases (created_by para permisos de edición).
- Tabla `public.users` enlazada a `auth.users`; se crea por trigger al registrarse.
