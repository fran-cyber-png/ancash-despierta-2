import type { Noticia } from "./content";

/** Tenant de este sitio en Bravo (panel: https://ancashdespierta.com/panel/). */
export const TENANT = "ancashdespierta";
/** Base pública del sitio; se usa para canónicas y para los botones de compartir. */
export const SITIO = "https://ancashdespierta.com";
/** Nombre del medio (JSON-LD, og:site_name, firma). */
export const NOMBRE_MEDIO = "Áncash Despierta";

/**
 * Forma EXACTA que devuelve `GET /v1/public/articles?tenant=…&status=published`.
 * El endpoint responde un array plano (no `{articles:[]}`) con estas 12 claves en
 * snake_case. No inventar campos: lo que no está acá, no llega.
 */
export type ArticuloBravo = {
  slug: string;
  title: string;
  excerpt: string | null;
  body_html: string | null;
  cover_image_url: string | null;
  category: string | null;
  seo_title: string | null;
  seo_description: string | null;
  og_image_url: string | null;
  canonical_url: string | null;
  noindex: boolean | null;
  published_at: string | null;
};

function texto(valor: string | null | undefined): string {
  return typeof valor === "string" ? valor.trim() : "";
}

/** Sólo aceptamos URLs absolutas (las imágenes viven en bravo.goberna.us/media/…). */
function urlAbsoluta(valor: string | null | undefined): string | undefined {
  const v = texto(valor);
  return /^https?:\/\//i.test(v) ? v : undefined;
}

/**
 * Traduce el artículo de Bravo al modelo del sitio.
 *
 * `og_image_url` NO se usa como segunda imagen: la API hace COALESCE(og, cover),
 * así que el sitio no puede distinguir "vacío" de "igual a la portada".
 */
export function mapearArticulo(a: ArticuloBravo): Noticia {
  const resumen = texto(a.excerpt);
  return {
    slug: a.slug,
    titulo: texto(a.title),
    resumen,
    imagen: urlAbsoluta(a.cover_image_url),
    bodyHtml: texto(a.body_html),
    categoria: texto(a.category) || undefined,
    publishedAt: texto(a.published_at) || undefined,
    seoTitle: texto(a.seo_title) || undefined,
    seoDescription: texto(a.seo_description) || resumen || undefined,
    ogImageUrl: urlAbsoluta(a.og_image_url),
    canonicalUrl: urlAbsoluta(a.canonical_url),
    noindex: a.noindex === true,
  };
}

/** URL canónica pública de una noticia (siempre con barra final). */
export function urlCanonica(noticia: Noticia): string {
  return noticia.canonicalUrl ?? `${SITIO}/noticia/${noticia.slug}/`;
}
