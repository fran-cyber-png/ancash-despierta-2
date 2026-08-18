import { mapearArticulo, type ArticuloBravo } from "./bravo";
// GENERADO por scripts/fetch-noticias.mjs en el prebuild — NO EDITAR A MANO.
// Se commitea a propósito: deja el sitio buildeable sin red y guarda el historial
// de qué se publicó. Un array vacío es un estado válido (tenant sin noticias).
import generadas from "./noticias.generado.json";
// Única noticia real que queda en el repo. Sólo se usa como respaldo mientras
// Bravo no devuelva nada; en cuanto la redacción publique, desaparece de la home.
import semillaJson from "./semilla.json";

export type Noticia = {
  slug: string;
  titulo: string;
  resumen: string;
  imagen?: string;
  /** Cuerpo del artículo en HTML, tal cual lo emite el editor de Bravo. */
  bodyHtml: string;
  categoria?: string;
  /** ISO 8601 de publicación (JSON-LD, sitemap). */
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImageUrl?: string;
  canonicalUrl?: string;
  noindex: boolean;
};

const articulosBravo = generadas as ArticuloBravo[];
const articuloSemilla = semillaJson as ArticuloBravo;

/**
 * Lista resuelta que consume el sitio (y, con la misma regla, scripts/prerender.mjs):
 * lo que haya en Bravo y, si no hay nada, la semilla. Nunca queda vacía, así que el
 * build siempre genera al menos un `/noticia/<slug>/`.
 */
export const noticias: Noticia[] = (
  articulosBravo.length > 0 ? articulosBravo : [articuloSemilla]
).map(mapearArticulo);

export function getNoticia(slug: string | undefined): Noticia | undefined {
  return noticias.find((n) => n.slug === slug);
}

/** Ruta interna de una noticia. La barra final es obligatoria: nginx sirve
 *  `<dir>/index.html` y sin ella responde un 301. */
export function noticiaHref(slug: string): string {
  return `/noticia/${slug}/`;
}
