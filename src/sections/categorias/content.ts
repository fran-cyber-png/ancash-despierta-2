export const categorias = {
  // Sólo rótulos: NO son enlaces. Una ruta /categoria/<slug>/ no existe como
  // archivo físico en el docroot y daría 404 duro por deep-link (el vhost no
  // tiene `try_files`). Cuando el prerender genere esas páginas, pasan a <Link>.
  items: [
    "ÚLTIMO",
    "ÁNCASH",
    "POLÍTICA",
    "ACTUALIDAD",
    "SEGURIDAD",
    "TURISMO",
    "CULTURA",
    "OPINIÓN",
  ],
} as const;
