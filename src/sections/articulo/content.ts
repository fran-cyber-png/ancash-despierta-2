export const articulo = {
  /** Firma bajo el titular. El Figma dice "Redacción Voz Huascarán"; este dominio
   *  es Áncash Despierta, así que se firma con el medio que corresponde. */
  firma: "Redacción Áncash Despierta",
  /** Antecede a la fecha: "Áncash, 05 de agosto". */
  lugar: "Áncash",
  migas: [
    { texto: "Inicio", href: "/" },
    { texto: "Blog", href: "/#lo-ultimo" },
  ],
  volver: "Volver",
  recientes: "Artículos recientes",
  otrasCategorias: "Otras categorías",
} as const;
