export const contacto = {
  titulo: "Súmate",
  bajada: "Déjanos tus datos y te contactamos para sumarte al voluntariado.",
  campos: [
    { name: "nombre", label: "Nombre completo", type: "text" },
    { name: "telefono", label: "Teléfono / WhatsApp", type: "tel" },
    { name: "distrito", label: "Distrito", type: "text" },
  ],
  boton: "Quiero participar",
  redes: [
    { nombre: "Facebook", href: "#" },
    { nombre: "TikTok", href: "#" },
    { nombre: "WhatsApp", href: "#" },
  ],
  endpoint: "/api/registro",
} as const;
