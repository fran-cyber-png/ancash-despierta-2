export const articulo = {
  compartir: {
    /** El frame mobile dice "Comparte:" y el desktop "Comparte en:". */
    titulo: "Comparte:",
    tituloDesk: "Comparte en:",
  },
  etiquetas: { titulo: "Etiquetas:" },
} as const;

export type RedCompartir = {
  nombre: string;
  icono: string;
  href: string;
  /** El primero va en círculo blanco con ícono oscuro; el resto en #450003
   *  con ícono blanco (tal cual el Figma). */
  claro: boolean;
};

/**
 * Botones de compartir cableados a la URL canónica de la nota.
 *
 * Sólo van las redes con intent web real. Instagram (`share-2.svg`) quedó fuera a
 * propósito: no expone ninguna URL de compartir desde web, y un botón que no comparte
 * nada es peor que no tenerlo. En Perú el canal de distribución es WhatsApp.
 */
export function redesCompartir(url: string, titulo: string): RedCompartir[] {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(titulo);
  return [
    {
      nombre: "Facebook",
      icono: "/assets/share-1.svg",
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      claro: true,
    },
    {
      nombre: "WhatsApp",
      icono: "/assets/share-3.svg",
      href: `https://wa.me/?text=${t}%20${u}`,
      claro: false,
    },
    {
      nombre: "Telegram",
      icono: "/assets/share-4.svg",
      href: `https://t.me/share/url?url=${u}&text=${t}`,
      claro: false,
    },
  ];
}
