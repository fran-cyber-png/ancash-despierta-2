# landing-huascaran

Landing del proyecto **Huáscarán** (Áncash). React 19 + Vite + TypeScript + Tailwind v4.

## Estructura

Una carpeta por sección de la landing. Dentro de cada carpeta vive todo lo relacionado a esa sección:

```
src/sections/
  hero/        Hero.tsx        content.ts   index.ts
  nosotros/    Nosotros.tsx    content.ts   index.ts
  propuestas/  Propuestas.tsx  content.ts   index.ts
  equipo/      Equipo.tsx      content.ts   index.ts
  testimonios/ Testimonios.tsx content.ts   index.ts
  agenda/      Agenda.tsx      content.ts   index.ts
  contacto/    Contacto.tsx    content.ts   index.ts
  index.ts     barrel de todas las secciones
```

- `content.ts` — textos, listas, links e imágenes de esa sección (único lugar a editar para cambiar copy).
- `<Seccion>.tsx` — el markup, consume su propio `content.ts`.
- `index.ts` — barrel de la sección.

Para agregar una sección: crea la carpeta con los 3 archivos, expórtala en `src/sections/index.ts` y móntala en `src/App.tsx`.

## Desarrollo

```bash
npm install
npm run dev
npm run build
```
