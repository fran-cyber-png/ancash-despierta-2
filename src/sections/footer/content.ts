export const footer = {
  marca: {
    // El diseño (XD y Figma) pone acá el escudo de HUARAZ AL DÍA, que es otro medio.
    // Se usa la marca del portal a pedido de la redacción; el archivo del diseño
    // queda en `/assets/logo-huaraz-2026.webp` por si se decide volver atrás.
    logo: "/assets/logo-ancash-2026.webp",
    alt: "Áncash Despierta",
    linea1: "Conectando",
    linea2: "nuestra región",
  },
  enlaces: {
    titulo: "Enlaces",
    items: [
      { texto: "Quiénes somos", href: "#quienes-somos" },
      { texto: "Lo que defendemos", href: "#defendemos" },
      { texto: "Mensaje", href: "#mensaje" },
      { texto: "Únete", href: "#unete" },
    ],
  },
  contacto: {
    titulo: "Contacto",
    email: "contacto@ancashdespierta.com",
    facebook: { nombre: "Áncash Despierta", href: "#" },
  },
  legal: { izquierda: "Derechos reservados", derecha: "Áncash Despierta" },
} as const;
