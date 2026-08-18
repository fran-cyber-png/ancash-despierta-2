export const footer = {
  marca: {
    // El pie usa la MISMA marca que el header. El `logo-footer.png` original se borró: era
    // el escudo de "HUARAZ AL DÍA" (otro medio) y encima repetía el lema que ya va al lado.
    logo: "/assets/logo-header.png",
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
  legal: ["Derechos reservados", "Áncash Despierta"],
} as const;
