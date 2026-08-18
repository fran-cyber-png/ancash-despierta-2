export const articulo = {
  compartir: {
    /** El frame mobile dice "Comparte:" y el desktop "Comparte en:". */
    titulo: "Comparte:",
    tituloDesk: "Comparte en:",
    /** El primero va en círculo blanco con ícono oscuro; el resto en #450003
     *  con ícono blanco (tal cual el Figma). */
    redes: [
      { nombre: "Facebook", icono: "/assets/share-1.svg", href: "#", claro: true },
      { nombre: "Instagram", icono: "/assets/share-2.svg", href: "#", claro: false },
      { nombre: "WhatsApp", icono: "/assets/share-3.svg", href: "#", claro: false },
      { nombre: "Telegram", icono: "/assets/share-4.svg", href: "#", claro: false },
    ],
  },
  etiquetas: { titulo: "Etiquetas:" },
} as const;
