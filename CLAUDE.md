# CLAUDE.md — landing-huascaran

Portal **Áncash Despierta** (https://ancashdespierta.com). React 19 + Vite + TS + Tailwind v4.
Todo en español: nombres de variables, comentarios y copy.

## Lo primero: el cruce de nombres

| Repo | Dominio | Tenant en Bravo |
|---|---|---|
| **`landing-huascaran`** (este) | **ancashdespierta.com** | **`ancashdespierta`** |
| `lavozdeancash` | vozhuascaran.com | `vozhuascaran` |

Está cruzado a propósito por historia del proyecto. Confundirlos hace que publicar en un portal
rebuildee el otro, con un síntoma confusísimo. Verificá el tenant antes de tocar nada.

## De dónde sale el contenido

Las noticias **no viven en el repo**: las escribe la redacción en `https://ancashdespierta.com/panel/`
(panel embebido de Bravo, bundle compartido `bravo.goberna.us/bravo-admin.umd.js`).

    publicar en el panel
      -> POST /api/articles/:id/publish  (bravo.goberna.us -> VPS1 -> Tailscale -> VPS2:4080)
      -> la API dispara deploy.yml de este repo (workflow_dispatch)
      -> el runner vps2-huascaran-runner corre `npm run build` EN vps2
           prebuild : scripts/fetch-noticias.mjs  -> src/sections/noticias/noticias.generado.json
           build    : tsc -b && vite build
           postbuild: scripts/prerender.mjs       -> dist/noticia/<slug>/index.html + sitemap + robots
      -> guards + rsync (2 pasadas) al docroot

Endpoint que consume el build (**array plano**, no `{articles:[]}`), 12 campos snake_case:
`slug, title, excerpt, body_html, cover_image_url, category, seo_title, seo_description,
og_image_url, canonical_url, noindex, published_at`.

    GET $BRAVO_API_URL/v1/public/articles?tenant=ancashdespierta&status=published

`BRAVO_API_URL` = **literal `http://127.0.0.1:4080`** en el runner (nunca `localhost`: `::1` no está
bindeado). Fuera del servidor, `https://bravo.goberna.us`.

## Reglas del repo

1. **`src/sections/noticias/noticias.generado.json` es generado.** No lo edites: lo pisa el prebuild.
   Se commitea a propósito (build sin red + historial). Un `[]` es un estado válido. En el runner
   **no** funciona como respaldo del deploy anterior: `actions/checkout` lo restablece al commiteado,
   así que con Bravo caído el build cae en la semilla. Quien protege el sitio ahí es el guard de
   `deploy.yml`, que lee `.bake-estado.json` (`vivo` / `articulos` / `hash`, no se commitea).
2. **`src/sections/noticias/semilla.json` es el único contenido editorial del repo** y sólo se usa de
   respaldo mientras Bravo devuelva `[]`. No agregues noticias ahí: van al panel.
3. **No hay fallback de SPA.** El vhost de Hestia no tiene `try_files`. Toda ruta pública tiene que
   existir como archivo físico (`<dir>/index.html`) y **toda URL lleva barra final**. Si agregás una
   ruta client-side (paginación, categoría, búsqueda), o la prerenderizás, o da 404 duro por deep-link.
4. **El prerender nunca puede emitir 0 artículos.** Falla duro si la lista resuelta viene vacía o rota:
   `rsync --delete` con un build parcial despublica URLs ya indexadas. El guard del workflow es la
   segunda red y tiene dos cortes que **abortan el deploy a propósito** (el sitio queda intacto y el
   cron insiste en rojo hasta que se resuelva, eso es la señal):
   - *Bravo devolvió 0 artículos y el docroot tiene N* → se despublicó todo; publicar sería pisar
     notas reales con la semilla. Se revisa el panel; si el sitio de verdad tiene que quedar vacío,
     se borra a mano `$DOCROOT/noticia/*` en vps2 y se vuelve a correr.
   - *build sin datos de Bravo y el conteo cae* → la API no respondió. Cuando responda, pasa solo.

   Que el conteo baje **con Bravo respondiendo** sí se publica: retirar una nota errada es una acción
   editorial normal, y trabar el deploy por eso dejaba el sitio congelado. Antes de comparar, el
   guard exige poder leer `$DOCROOT` (`[ -d … ]`): si un ancestro perdiera el `o+x`, los dos cortes
   se darían por buenos sin haber comparado nada.

   El bake, en cambio, **descarta** la nota inservible (slug fuera de `/^[a-z0-9-]+$/`, sin título,
   repetida) y sigue: una nota malformada no puede tumbar la publicación de todas las demás.
5. **El cuerpo del artículo se estila por etiqueta**, en `.cuerpo-articulo` (`src/index.css`). El
   saneador de Bravo descarta `class`, `style` e `id`: adentro de ese bloque no funcionan las
   utilidades de Tailwind. La viñeta de `<ul>` va por `::before`, y `li > p { margin: 0 }` es
   obligatorio porque TipTap anida un `<p>` dentro de cada `<li>`.
   El saneo está **duplicado a propósito** en `src/utils/sanear.ts` y `scripts/prerender.mjs` (Node
   no importa TS): si tocás uno, tocá el otro. En el HTML prerenderizado ese saneo es la única
   defensa que hay — no pasa por React ni por ninguna whitelist antes de llegar a nginx.
6. **Cero dependencias nuevas en los scripts.** Node 22 trae `fetch` y `AbortController`.
7. **No reemplaces un asset in-place** (`assets/logo-header.png`, `favicon.svg`, `icons.svg`): van con
   `expires max` y quedan viejos en el edge. Cambiales el nombre.
8. Rama + PR, nunca push directo a `main` (`main` deploya a producción).

## Deuda conocida

- El artículo no muestra fecha de publicación (el Figma no la tiene). El dato existe
  (`published_at`) y ya se usa en el JSON-LD y el sitemap.
- No hay `alt` descriptivo para la portada: se usa el título. Bravo todavía no tiene
  `cover_image_alt`.
- El botón de Instagram del bloque *Comparte* se sacó: no existe intent web de compartir en
  Instagram. Quedan Facebook, WhatsApp y Telegram (`share-2.svg` sigue en `public/assets/` sin uso).
- El endpoint público no pagina: trae el `body_html` completo de todas las notas. Irrelevante hoy,
  serio con 300+. Si el build empieza a tardar, pedir paginación (issue Goberna-Lab/bravo#44).
