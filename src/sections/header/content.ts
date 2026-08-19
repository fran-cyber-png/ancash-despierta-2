export const header = {
  // Asset nuevo (el logo del XD ya trae el lema dentro). No se pisa
  // `logo-header.png`: va con `expires max` y quedaría viejo en el edge.
  logo: "/assets/logo-ancash-2026.webp",
  logoAlt: "Áncash Despierta — Conectando nuestra región",
  // Anclas, nunca rutas nuevas: el vhost no tiene fallback de SPA y una ruta
  // client-side sin prerender da 404 duro por deep-link.
  menu: [
    { texto: "NOTICIA DEL DÍA", href: "#noticia-del-dia" },
    { texto: "NOTICIAS", href: "#destacadas" },
    { texto: "NOSOTROS", href: "#nosotros" },
  ],
  cta: { texto: "INSCRÍBETE", href: "#unete" },
} as const;
