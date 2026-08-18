# landing-huascaran

Landing **Áncash Despierta** (Voz Huascarán). React 19 + Vite + TypeScript + Tailwind v4.

Diseño: Figma `ÁNCASH DESPIERTA` — archivo `fkpGJ8o2qT95sfhsTfOoCA`.
Implementación **mobile-first** a partir de los frames mobile `7:267` (home, 430 × 5398)
y `7:297` (interno / artículo, 430 × 1351).

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
