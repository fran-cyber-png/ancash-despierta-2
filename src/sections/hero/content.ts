export const hero = {
  // Rotan en el fondo del banner con un crossfade suave (ver Hero.tsx).
  imagenes: [
    { src: "/assets/nuevohero.jpg", alt: "Laguna Parón en la Cordillera Blanca" },
    { src: "/assets/b-blog-viajes-ancash.webp", alt: "Nevado de la Cordillera Blanca al atardecer" },
    { src: "/assets/interna-Playas-de-ancash-v2-2.jpg", alt: "Playa de la costa de Áncash" },
  ],
  titulo: "Lo que pasa en nuestra región merece ser contado.",
  bajada:
    "Contamos lo que pasa en Áncash y damos espacio a las voces de nuestra región. Información cercana y relevante para comprender, participar y conectar.",
  acciones: [
    { texto: "INSCRÍBETE", href: "#unete", tono: "rojo" },
    // En el Figma el secundario es contorneado (borde blanco), no azul relleno.
    { texto: "VER NOTICIAS", href: "#destacadas", tono: "borde" },
  ],
} as const;
