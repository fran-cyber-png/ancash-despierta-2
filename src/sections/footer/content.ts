export const footer = {
  marca: {
    logo: "/assets/logo-footer.png",
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
    email: "contacto@vozhuascaran.com",
    facebook: { nombre: "La Voz de Áncash", href: "#" },
  },
  legal: ["Derechos reservados", "Voz Huascarán Perú"],
} as const;
