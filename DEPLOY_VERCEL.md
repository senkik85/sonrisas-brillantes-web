# Despliegue en Vercel

Este proyecto es un app **TanStack Start** (SSR + server functions + rutas API).
No es un SPA estático: requiere un runtime serverless de Node en Vercel.

## Pasos

1. **Conecta el repo de GitHub a Vercel** (Add New → Project → Import Git Repository).
2. Vercel detectará el proyecto. Confirma:
   - **Framework Preset:** *Other* (dejar por defecto)
   - **Build Command:** `npm run build` (o `bun run build`)
   - **Output Directory:** *(dejar vacío)* — Nitro genera `.vercel/output` automáticamente
   - **Install Command:** `npm install` (o `bun install`)
   - **Node.js Version:** `20.x`
3. **Variables de entorno** (Project Settings → Environment Variables):

   | Nombre | Valor | Notas |
   |---|---|---|
   | `VITE_SUPABASE_URL` | URL del backend | Pública, build-time |
   | `VITE_SUPABASE_PUBLISHABLE_KEY` | Anon key | Pública, build-time |
   | `VITE_SUPABASE_PROJECT_ID` | ID del proyecto | Pública, build-time |
   | `SUPABASE_URL` | Igual que arriba | Para server functions |
   | `SUPABASE_PUBLISHABLE_KEY` | Igual que anon | Para server functions |
   | `SUPABASE_SERVICE_ROLE_KEY` | Service role | **Secreto.** Solo backend |

   Copia los valores desde tu archivo `.env` de Lovable Cloud
   (Connectors → Lovable Cloud → ver claves).

4. Deploy. La primera build puede tardar unos minutos.

## ¿Cómo funciona?

- `vite.config.ts` detecta `process.env.VERCEL` (variable que Vercel define
  automáticamente en su entorno de build) y:
  - desactiva el plugin de Cloudflare Workers
  - cambia el target de TanStack Start a `vercel`, que hace que Nitro emita
    `.vercel/output/` con functions serverless + assets estáticos.
- En Lovable, `VERCEL` no está definido, así que el build sigue usando
  Cloudflare Workers como hasta ahora — los dos entornos conviven.

## Rutas dinámicas / refresh / deep links

Funcionan automáticamente con SSR. **No** añadas un `vercel.json` con
rewrites a `/index.html` — eso es para SPAs y rompería las rutas API
(`/api/public/contact`) y la hidratación SSR.
