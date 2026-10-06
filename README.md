# SoundMap — Paso 1
1. `npm install`
2. Copia `.env.example` a `.env.local` y rellena URL y anon key (Supabase → Project Settings → API).
3. Supabase → SQL Editor → pega y ejecuta `supabase/migrations/0001_init.sql`.
4. `npm run dev` → http://localhost:3000 debe mostrar "Conexión Supabase: ✅ OK".
5. Opcional PWA: añade `public/icon-192.png` y `public/icon-512.png`.
