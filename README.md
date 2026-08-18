# landing-huascaran

Landing **Áncash Despierta** (Voz Huascarán). React 19 + Vite + TypeScript + Tailwind v4.

Diseño: Figma `ÁNCASH DESPIERTA` — archivo `fkpGJ8o2qT95sfhsTfOoCA`.
Implementación **mobile-first** a partir del frame mobile `7:267` (430 × 5398).

## Estructura

Una carpeta por sección de la landing; dentro vive todo lo relacionado a esa sección:

```
src/sections/
  header/    Header.tsx                    content.ts  index.ts
  hero/      Hero.tsx                      content.ts  index.ts
  noticias/  Noticias.tsx  NoticiaCard.tsx content.ts  index.ts
  footer/    Footer.tsx                    content.ts  index.ts
  index.ts   barrel de todas las secciones
```

- `content.ts` — textos, listas, links e imágenes de esa sección (único lugar a editar para cambiar copy).
- `<Seccion>.tsx` — markup, consume su propio `content.ts`.
- `index.ts` — barrel de la sección.

Para agregar una sección: crea la carpeta con esos archivos, expórtala en `src/sections/index.ts` y móntala en `src/App.tsx`.

## Tokens

Definidos como variables `@theme` en `src/index.css` (colores y familias tipográficas del Figma):
`brand-red #e7000b`, `brand-red-dark #ae0600`, `ink #101828`, `muted #7a7a7a`, `card #f9f9f9`, `card-border #d8d8d8`.
Fuentes: Inter (titulares), Archivo (cuerpo), Montserrat (footer/UI).

## Assets

`public/assets/` — exportados del Figma (logo header/footer, banner hero, imagen de noticia, bullet SVG).

## Desarrollo

```bash
npm install
npm run dev
npm run build
```
