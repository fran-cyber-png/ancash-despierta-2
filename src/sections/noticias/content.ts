export type Noticia = {
  id: string;
  titulo: string;
  resumen: string;
  imagen?: string;
  href: string;
};

export const noticias: Noticia[] = [
  {
    id: "mundial-sub-17",
    titulo: "¡Mundial Sub-17!",
    resumen:
      "La selección peruana femenina de vóley demostró todo su nivel y garra en la cancha al derrotar categóricamente por 3-0 a su similar...",
    imagen: "/assets/noticia-1.png",
    href: "#",
  },
  // Placeholders del Figma — descomentar y reemplazar por noticias reales.
  // {
  //   id: "noticia-2",
  //   titulo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
  //   resumen:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad...",
  //   href: "#",
  // },
  // {
  //   id: "noticia-3",
  //   titulo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
  //   resumen:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad...",
  //   href: "#",
  // },
  // {
  //   id: "noticia-4",
  //   titulo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
  //   resumen:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad...",
  //   href: "#",
  // },
  // {
  //   id: "noticia-5",
  //   titulo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
  //   resumen:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad...",
  //   href: "#",
  // },
  // {
  //   id: "noticia-6",
  //   titulo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
  //   resumen:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad...",
  //   href: "#",
  // },
];
