# landing-huascaran

Landing **Áncash Despierta** (Voz Huascarán). React 19 + Vite + TypeScript + Tailwind v4.

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
  noticias/  Noticias.tsx  NoticiaCard.tsx content.ts  index.ts
  articulo/  Articulo.tsx                  content.ts  index.ts
  footer/    Footer.tsx                    content.ts  index.ts
  index.ts   barrel de todas las secciones

src/pages/
  Home.tsx          Header + Hero + Noticias + Footer
  NoticiaPage.tsx   Header + Articulo + Footer
```

- `content.ts` — textos, listas, links e imágenes de esa sección (único lugar a editar para cambiar copy).
- `<Seccion>.tsx` — markup, consume su propio `content.ts`.
- `index.ts` — barrel de la sección.

Para agregar una sección: crea la carpeta con esos archivos, expórtala en `src/sections/index.ts` y móntala en la página que corresponda.

## Rutas

React Router (`src/App.tsx`):

| Ruta | Vista |
|---|---|
| `/` | Home |
| `/noticia/:id` | Artículo (interno) |

Las noticias viven en `src/sections/noticias/content.ts`: cada una lleva su resumen (card de la home)
y su `contenido` (cuerpo del artículo, un array por bloque de líneas) más `etiquetas`.
El id de la noticia es el segmento de la URL; si no existe, redirige a `/`.

> Deploy: al ser SPA, el servidor debe hacer fallback a `index.html` para rutas desconocidas.

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

`public/assets/` — exportados del Figma (logo header/footer, banner hero, imagen de noticia, bullet y los 4 SVG de compartir).

## Desarrollo

```bash
npm install
npm run dev
npm run build
```
