export type Noticia = {
  id: string;
  titulo: string;
  resumen: string;
  imagen?: string;
  /** Cuerpo del artículo. Cada bloque es un array de líneas contiguas (sin
   *  espacio entre ellas); los bloques se separan con 15px. */
  contenido: string[][];
  etiquetas: string[];
};

export const noticias: Noticia[] = [
  {
    id: "mundial-sub-17",
    titulo: "¡Mundial Sub-17!",
    resumen:
      "La selección peruana femenina de vóley demostró todo su nivel y garra en la cancha al derrotar categóricamente por 3-0 a su similar...",
    imagen: "/assets/noticia-1.png",
    contenido: [
      [
        "Un sismo de magnitud 4.2 se registró durante la noche del sábado 15 de agosto de 2026, teniendo como epicentro la zona sur de la ciudad de Pisco, en la región Ica.",
      ],
      [
        "De acuerdo con el reporte oficial emitido por el Instituto Geofísico del Perú (IGP), el movimiento telúrico ocurrió a una profundidad de 16 kilómetros, lo que provocó que se percibiera con una intensidad de grado III por los habitantes de Pisco y zonas contiguas.",
      ],
      [
        "Reporte de actividad regional:",
        "Las autoridades de Defensa Civil y los organismos locales de monitoreo se encuentran realizando las evaluaciones correspondientes para descartar daños materiales o personales en la zona del epicentro. Asimismo, se mantiene el seguimiento a la actividad telúrica registrada en otras regiones del país como Junín y Piura.",
      ],
      [
        "Dada la condición sísmica de nuestro territorio, se recuerda a toda la población mantener la calma, identificar las rutas de evacuación y tener siempre preparada la mochila de emergencia.",
      ],
    ],
    etiquetas: ["Lorem"],
  },
  // Placeholders del Figma — descomentar y reemplazar por noticias reales.
  // {
  //   id: "noticia-2",
  //   titulo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
  //   resumen:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad...",
  //   contenido: [["Lorem ipsum dolor sit amet."]],
  //   etiquetas: ["Lorem"],
  // },
];

export function getNoticia(id: string | undefined): Noticia | undefined {
  return noticias.find((n) => n.id === id);
}

export function noticiaHref(id: string): string {
  return `/noticia/${id}`;
}
