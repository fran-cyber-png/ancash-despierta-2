# landing-huascaran

Portal **Áncash Despierta** — https://ancashdespierta.com. React 19 + Vite + TypeScript + Tailwind v4.

> **Cuidado con el cruce de nombres**, es real y confunde: este repo (`landing-huascaran`)
> publica **ancashdespierta.com**; el repo `lavozdeancash` publica **vozhuascaran.com**.

Diseño: Figma `ÁNCASH DESPIERTA` — archivo `fkpGJ8o2qT95sfhsTfOoCA`.
Implementación **mobile-first** a partir de los frames `7:267` (home mobile, 430 × 5398),
`7:297` (interno / artículo mobile, 430 × 1351), `7:172` (home desktop, 1366 × 2485)
y `7:173` (interno desktop, 1366 × 1539).

## Estructura

Una carpeta por sección; dentro vive todo lo relacionado a esa sección:

```
src/sections/
  header/    Header.tsx                    content.ts  index.ts
  hero/      Hero.tsx                      content.ts  index.ts
  noticias/  Noticias.tsx  NoticiaCard.tsx content.ts  index.ts  bravo.ts
             semilla.json  noticias.generado.json
  articulo/  Articulo.tsx                  content.ts  index.ts
  footer/    Footer.tsx                    content.ts  index.ts
  index.ts   barrel de todas las secciones

src/pages/
  Home.tsx          Header + Hero + Noticias + Footer
  NoticiaPage.tsx   Header + Articulo + Footer

src/utils/
  sanear.ts         saneo del HTML que llega del editor

scripts/
  fetch-noticias.mjs  prebuild  — baja los artículos de Bravo
  prerender.mjs       postbuild — un index.html físico por nota + sitemap + robots

public/panel/
  index.html          monta el panel de Bravo (bundle remoto)
```

- `content.ts` — textos, listas, links e imágenes de esa sección (único lugar a editar para cambiar copy).
  La excepción es `noticias/`: ahí el contenido lo manda Bravo, no el repo (ver *Contenido*).
- `<Seccion>.tsx` — markup, consume su propio `content.ts`.
- `index.ts` — barrel de la sección.

Para agregar una sección: crea la carpeta con esos archivos, expórtala en `src/sections/index.ts` y móntala en la página que corresponda.

## Rutas

React Router (`src/App.tsx`):

| Ruta | Vista |
|---|---|
| `/` | Home |
| `/noticia/:slug/` | Artículo (interno) |
| `/panel/` | Panel de Bravo (bundle remoto, no se buildea acá) |

> **No hay fallback de SPA.** El vhost de Hestia no tiene `try_files … /index.html`: nginx sirve
> `<directorio>/index.html` y nada más. Por eso cada nota se emite como archivo físico
> (`dist/noticia/<slug>/index.html`, ver *Contenido*) y **toda URL pública lleva barra final** —
> sin ella nginx responde un 301. Cualquier ruta nueva del cliente (paginación, filtros, búsqueda)
> da 404 duro por deep-link hasta que exista como archivo.

## Contenido: las noticias salen de Bravo

Las noticias **ya no se editan en el repo**. Se escriben y se publican en el panel:

    https://ancashdespierta.com/panel/     (tenant Bravo: `ancashdespierta`)

Flujo completo:

1. La redacción da *Publicar* → la API de Bravo guarda el snapshot y dispara `deploy.yml` de este
   repo por `workflow_dispatch`.
2. El runner (que corre en el mismo host que la API) ejecuta `npm run build`:
   - `scripts/fetch-noticias.mjs` (**prebuild**) baja
     `GET $BRAVO_API_URL/v1/public/articles?tenant=ancashdespierta&status=published` — un **array
     plano** con 12 campos en snake_case — y lo escribe en
     `src/sections/noticias/noticias.generado.json`.
   - `tsc -b && vite build`.
   - `scripts/prerender.mjs` (**postbuild**) emite un `dist/noticia/<slug>/index.html` por nota, con
     `<title>`/description SEO, canónica, Open Graph, Twitter Card y JSON-LD `NewsArticle`, más el
     cuerpo ya renderizado dentro de `#root` para el crawler sin JS. También `sitemap.xml` y
     `robots.txt`.
3. Guard + `rsync` al docroot. Total: ~1-3 min desde el clic en Publicar.

Archivos de datos:

| Archivo | Qué es |
|---|---|
| `src/sections/noticias/noticias.generado.json` | **Generado y commiteado.** No editar a mano: lo pisa el prebuild. Se commitea para poder buildear sin red (desarrollo local) y para tener historial de qué se publicó. `[]` es un estado válido. **No es una red de seguridad en el servidor**: `actions/checkout` restablece los archivos versionados, así que en el runner el snapshot es siempre el commiteado (hoy `[]`) y con Bravo caído el build cae en la semilla. Lo que protege al sitio ahí es el guard de `deploy.yml`, no este archivo. |
| `.bake-estado.json` (raíz, **no se commitea**) | Lo escribe el prebuild y lo lee `deploy.yml`: `vivo` (si se alcanzó la API), `articulos` (cuántos trajo) y `hash` (sha256 del cuerpo que se buildeó). Es lo que le permite al guard distinguir "Bravo dice 0" de "no hubo Bravo". |
| `src/sections/noticias/semilla.json` | La **única** nota que queda en el repo, en el mismo formato que devuelve Bravo. Sólo se usa de respaldo mientras Bravo no devuelva nada; desaparece de la home apenas la redacción publique. |
| `src/sections/noticias/bravo.ts` | Contrato de los 12 campos + mapper a `Noticia` + `urlCanonica()`. |
| `src/sections/noticias/content.ts` | Resuelve la lista: lo de Bravo, y si está vacío, la semilla. |

El cuerpo llega como **HTML** del editor (h2/h3/ul/ol/blockquote/strong…), se pasa por
`src/utils/sanear.ts` y se pinta con `dangerouslySetInnerHTML`. Su tipografía está en el bloque
`.cuerpo-articulo` de `src/index.css` y **cuelga de la etiqueta, nunca de una clase**: el saneador
descarta `class`, `style` e `id`.

El prebuild **descarta** las notas inservibles en vez de abortar: slug que no matchea
`/^[a-z0-9-]+$/` (termina siendo un nombre de directorio), nota sin título y slug repetido. Que una
nota malformada tumbe la publicación de todas las demás sería el mismo error que abortar por Bravo
caído. El prerender vuelve a verificar el slug como última red.

Para refrescar el snapshot a mano: `npm run bake` (o `BRAVO_API_URL=https://bravo.goberna.us npm run bake`
fuera del servidor).

## Responsive

Breakpoint único `desk` (1280px, definido en `@theme`). Debajo de 1280 va el diseño mobile;
de 1280 hacia arriba, el desktop.

Los frames de 1366 y 1920 del Figma usan **los mismos tamaños** (header 113px, logo 178×96,
título 73px, card 414px, grid de 1302px, footer de hasta 1180px): lo único que cambia entre
ambos son los márgenes laterales. Por eso el desktop no escala proporcionalmente — usa valores
fijos con contenedores centrados, y a 1920 coincide al pixel con el master
(grid centrado 1302 → header a 349px; hero 16:9 → 1080px de alto).

| | 1366 | 1920 |
|---|---|---|
| Hero (16:9) | 768px de alto | 1080px |
| Grid de noticias | 1302px (32px de margen) | 1302px centrado |
| Footer | 1126px (px-120) | 1180px |
| Artículo | columna de 780px centrada | 780px centrada |

En el interno, el desktop además cambia el fondo (`#f6faff` → blanco), pasa los títulos y
etiquetas de Montserrat a Inter, y pone *Comparte en:* + botones de 50px y *Etiquetas:* en
una sola fila (en mobile van apilados y los botones son de 40px).

## Tokens

Definidos como variables `@theme` en `src/index.css` (colores y familias tipográficas del Figma):
`brand-red #e7000b`, `brand-red-dark #ae0600`, `ink #101828`, `muted #7a7a7a`, `card #f9f9f9`, `card-border #d8d8d8`.
Fuentes: Inter (titulares), Archivo (cuerpo), Montserrat (footer/UI).

## Assets

`public/assets/` — exportados del Figma (marca, banner hero, imagen de noticia, bullet y los SVG de
compartir). La marca es **una sola** (`logo-header.png`) y se usa en el header y en el pie: el
`logo-footer.png` que venía del Figma era el escudo de *Huaraz al Día* — otro medio — y se borró.

> **No reemplazar un asset in-place.** El vhost manda `expires max` (10 años) para
> `png|jpg|webp|svg|ico|css|js`, y Cloudflare ya los tiene en HIT: `assets/logo-header.png`,
> `favicon.svg` e `icons.svg` quedarían viejos en el edge y en el navegador. Si cambia el diseño,
> **cambiales el nombre**. Las fotos de las notas no caen en esta trampa: salen de
> `bravo.goberna.us/media/…`.

## Deploy

`.github/workflows/deploy.yml` corre en el runner self-hosted `vps2-huascaran` (está **en** vps2, el
rsync es local) y se dispara con: `push` a `main`, el `workflow_dispatch` que manda Bravo al
publicar, y un `cron` cada 15 min que sólo buildea si cambió el `sha256` del JSON público (red de
seguridad por si se pierde un dispatch).

Antes del rsync hay cuatro guards, y los dos del medio se apoyan en `.bake-estado.json` para saber
**si el build habló con Bravo o no** (con el puro conteo de directorios no se puede distinguir):

| Guard | Corta cuando | Por qué |
|---|---|---|
| 1 | el prerender emitió 0 artículos | `rsync --delete` dejaría el sitio sin notas |
| 2 | Bravo devolvió **0** artículos y el docroot tiene notas vivas | lo que hay en `dist/` es la semilla; publicarla despublica notas reales y deja URLs indexadas en 404 |
| 3 | el build **no** alcanzó Bravo y el conteo baja | build a ciegas: no puede achicar el sitio |
| 4 | `dist/` está vacío | paranoia sobre el `--delete` |

Antes de contar el docroot se exige poder leerlo (`[ -d "$DOCROOT" ]`): lo escribe el rsync como
root y se lee sin privilegios, así que un ancestro sin `o+x` tiene que salir en rojo con un mensaje
claro y no colarse como "no había nada publicado" — que daría por buenos los guards 2 y 3 sin haber
comparado nada.

Despublicar una nota **sí** puede bajar el conteo y publicarse, siempre que el build haya hablado con
Bravo (guard 3 no aplica): retirar una nota errada es una acción editorial normal. Lo único que no se
publica solo es el caso "quedaron 0 notas": ahí el deploy aborta a propósito y hace falta que alguien
mire el panel (ver *Cuando el deploy aborta*).

El rsync va en dos pasadas (primero sin `--delete` para subir los assets nuevos, después con `--delete`
para limpiar), porque un 404 de `/assets/*.js` se cachea 4 h en el edge.

### Cuando el deploy aborta

Los guards 2 y 3 dejan el sitio **intacto** y el run en rojo; como el cron corre cada 15 min, el rojo se
repite hasta que se resuelva la causa. No es un bug: es la señal.

- `Bravo devolvió 0 artículos y el docroot tiene N` → alguien despublicó todo, o el tenant quedó vacío.
  Revisar el panel. Si el sitio de verdad tiene que quedarse sin notas, hay que borrar a mano
  `$DOCROOT/noticia/*` en vps2 y volver a correr el workflow.
- `build sin datos de Bravo y el conteo cae` → la API no respondió y el build salió de la semilla.
  Revisar `bravo_api` en vps2; cuando responda, el siguiente run pasa solo.

## Desarrollo

```bash
npm install
npm run dev                                        # el dev usa el snapshot commiteado
npm run build                                      # bake + tsc + vite + prerender
BRAVO_API_URL=https://bravo.goberna.us npm run bake # refrescar el snapshot desde afuera del server
```

En el servidor `BRAVO_API_URL` es el **literal** `http://127.0.0.1:4080` (nunca `localhost`: `::1`
no está bindeado y un cliente IPv6-first falla). Fuera del servidor, `https://bravo.goberna.us`.
Si la API no responde, el build sigue con el snapshot commiteado — que en el runner es siempre el
del repo, no el del deploy anterior (ver la tabla de arriba). El deploy no publica ese resultado a
ciegas: lo frenan los guards 2 y 3.
