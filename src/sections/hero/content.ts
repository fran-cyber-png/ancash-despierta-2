export const hero = {
  // Foto del Figma (la del XD traía las franjas diagonales quemadas encima).
  imagen: "/assets/hero-ancash-2026.jpg",
  alt: "Laguna de la Cordillera Blanca y el puerto de Chimbote al atardecer",
  titulo: "Lo que pasa en nuestra región merece ser contado.",
  bajada:
    "Contamos lo que pasa en Áncash y damos espacio a las voces de nuestra región. Información cercana y relevante para comprender, participar y conectar.",
  acciones: [
    { texto: "ÚNETE", href: "#unete", tono: "rojo", ancho: "desk:w-[263px]" },
    // En el Figma el secundario es contorneado (borde blanco), no azul relleno.
    { texto: "CONOCE NUESTRAS IDEAS", href: "#defendemos", tono: "borde", ancho: "desk:w-[316px]" },
  ],
} as const;
