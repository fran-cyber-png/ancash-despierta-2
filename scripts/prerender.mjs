#!/usr/bin/env node
/**
 * Prerender (postbuild). Sin dependencias.
 *
 * El vhost de Hestia NO tiene `try_files … /index.html`: no hay fallback de SPA, así que
 * toda URL pública tiene que existir como archivo físico. Por cada noticia se emite
 * `dist/noticia/<slug>/index.html` — DIRECTORIO + index.html, nunca `<slug>.html`.
 *
 * Cada archivo lleva:
 *   - `<head>` propio: title y description SEO, canónica con barra final, robots,
 *     Open Graph, Twitter Card y JSON-LD NewsArticle.
 *   - el cuerpo ya renderizado dentro de `<div id="root">`, para el crawler que no
 *     ejecuta JS. React lo reemplaza al montar (createRoot limpia el contenedor).
 *
 * Además genera `dist/sitemap.xml` y `dist/robots.txt`.
 *
 * Falla duro (exit != 0) si la lista resuelta viene vacía o rota: un build parcial +
 * `rsync --delete` despublica URLs ya indexadas. Un `[]` de Bravo NO es un fallo — ahí
 * entra la semilla, igual que en el sitio.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(RAIZ, "dist");
const NOTICIAS_JSON = join(RAIZ, "src", "sections", "noticias", "noticias.generado.json");
const SEMILLA_JSON = join(RAIZ, "src", "sections", "noticias", "semilla.json");

const SITIO = "https://ancashdespierta.com";
const NOMBRE = "Áncash Despierta";
const LOGO = `${SITIO}/assets/logo-header.png`;
const DESCRIPCION_SITIO =
  "Áncash Despierta, la voz de Huascarán. Noticias y actualidad de la región Áncash.";

const SLUG_VALIDO = /^[a-z0-9-]+$/;

function abortar(mensaje) {
  console.error(`[prerender] ${mensaje}`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Escapes
// ---------------------------------------------------------------------------

function escaparTexto(valor) {
  return String(valor ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escaparAtributo(valor) {
  return escaparTexto(valor).replace(/"/g, "&quot;");
}

/** Evita que un `</script>` dentro del JSON-LD cierre el bloque antes de tiempo. */
function escaparJsonLd(objeto) {
  return JSON.stringify(objeto).replace(/</g, "\\u003c");
}

/**
 * Mismo saneo que src/utils/sanear.ts (no se puede importar TS desde Node). Los dos archivos
 * tienen que quedar IDÉNTICOS: acá es la única defensa que hay — este HTML se escribe directo
 * al archivo que sirve nginx, sin React y sin whitelist en el medio.
 */
const BLOQUES_EJECUTABLES = /<\s*(script|style|noscript|template)\b[\s\S]*?<\s*\/\s*\1\s*>/gi;
const ETIQUETAS_FUERA =
  /<\s*\/?\s*(?:script|style|noscript|template|iframe|frame|frameset|object|embed|applet|form|input|button|select|option|textarea|base|link|meta|math|svg)\b[^>]*>/gi;
const MANEJADORES = /[\s/]on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;
const ATRIBUTOS_DE_ESTILO = /[\s/](?:style|class|id)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;
const ATRIBUTOS_URL =
  /[\s/](?:href|src|srcset|action|formaction|poster|background|data|xlink:href)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;
const ESQUEMAS_PROHIBIDOS = /^(?:javascript|vbscript|livescript|data|blob|file):/;

function desdeCodigo(codigo) {
  if (!Number.isFinite(codigo) || codigo < 0 || codigo > 0x10ffff) return "";
  try {
    return String.fromCodePoint(codigo);
  } catch {
    return "";
  }
}

/** El navegador decodifica las entidades ANTES de mirar el esquema; nosotros también. */
function normalizarUrl(valor) {
  return valor
    .replace(/^\s*["']|["']\s*$/g, "")
    .replace(/&#x([0-9a-f]+);?/gi, (_, hex) => desdeCodigo(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);?/g, (_, dec) => desdeCodigo(Number(dec)))
    .replace(/&colon;?/gi, ":")
    .replace(/&(?:tab|newline|nbsp);?/gi, " ")
    // Comerse espacios y caracteres de control es EL punto: `jav&#x09;ascript:` tiene que
    // quedar `javascript:` antes de mirar el esquema.
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0020\u00a0]+/g, "")
    .toLowerCase();
}

/** Un `<` que no abre una etiqueta bien formada es texto (o el resto de un payload roto:
 *  `<scr<script>ipt>` deja un `<scr` que si no se escapa se traga la etiqueta siguiente). */
const MENOR_SUELTO = /<(?!\/?[a-zA-Z][a-zA-Z0-9-]*[\s/>])/g;

function unaPasada(html) {
  return html
    .replace(BLOQUES_EJECUTABLES, "")
    .replace(ETIQUETAS_FUERA, "")
    .replace(MANEJADORES, "")
    .replace(ATRIBUTOS_DE_ESTILO, "")
    .replace(ATRIBUTOS_URL, (coincidencia) => {
      const valor = coincidencia.slice(coincidencia.indexOf("=") + 1);
      return ESQUEMAS_PROHIBIDOS.test(normalizarUrl(valor)) ? "" : coincidencia;
    })
    .replace(MENOR_SUELTO, "&lt;");
}

function sanear(html) {
  if (!html) return "";
  let salida = String(html);
  for (let i = 0; i < 5; i += 1) {
    const previo = salida;
    salida = unaPasada(salida);
    if (salida === previo) break;
  }
  return salida;
}

// ---------------------------------------------------------------------------
// Datos — misma resolución que src/sections/noticias/content.ts
// ---------------------------------------------------------------------------

function leerJson(ruta) {
  if (!existsSync(ruta)) abortar(`falta ${ruta}. ¿Corrió el bake (npm run bake)?`);
  try {
    return JSON.parse(readFileSync(ruta, "utf8"));
  } catch (error) {
    return abortar(`${ruta} no es JSON válido: ${error.message}`);
  }
}

function texto(valor) {
  return typeof valor === "string" ? valor.trim() : "";
}

function urlAbsoluta(valor) {
  const v = texto(valor);
  return /^https?:\/\//i.test(v) ? v : undefined;
}

function mapear(a) {
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

const crudas = leerJson(NOTICIAS_JSON);
if (!Array.isArray(crudas)) abortar(`${NOTICIAS_JSON} no contiene un array.`);

const semilla = leerJson(SEMILLA_JSON);
const resueltas = (crudas.length > 0 ? crudas : [semilla]).map(mapear);

if (resueltas.length === 0) abortar("la lista resuelta quedó vacía (ni Bravo ni semilla).");

for (const noticia of resueltas) {
  if (!SLUG_VALIDO.test(String(noticia.slug))) {
    abortar(`slug inválido: ${JSON.stringify(noticia.slug)} (se espera /^[a-z0-9-]+$/).`);
  }
  if (!noticia.titulo) abortar(`la noticia "${noticia.slug}" no tiene título.`);
}

// ---------------------------------------------------------------------------
// Plantilla
// ---------------------------------------------------------------------------

const PLANTILLA = join(DIST, "index.html");
if (!existsSync(PLANTILLA)) abortar("falta dist/index.html. ¿Corrió `vite build`?");
const plantilla = readFileSync(PLANTILLA, "utf8");

if (!plantilla.includes('<div id="root"></div>')) {
  abortar('dist/index.html no tiene <div id="root"></div>; no hay dónde inyectar el cuerpo.');
}

function urlCanonica(noticia) {
  return noticia.canonicalUrl ?? `${SITIO}/noticia/${noticia.slug}/`;
}

function cabecera(noticia) {
  const canonica = urlCanonica(noticia);
  const titulo = noticia.seoTitle || `${noticia.titulo} — ${NOMBRE}`;
  const descripcion = noticia.seoDescription || DESCRIPCION_SITIO;
  const imagen = noticia.ogImageUrl || noticia.imagen || LOGO;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: noticia.titulo,
    description: descripcion,
    image: [imagen],
    mainEntityOfPage: { "@type": "WebPage", "@id": canonica },
    inLanguage: "es-PE",
    publisher: {
      "@type": "Organization",
      name: NOMBRE,
      logo: { "@type": "ImageObject", url: LOGO },
    },
  };
  if (noticia.publishedAt) {
    jsonLd.datePublished = noticia.publishedAt;
    jsonLd.dateModified = noticia.publishedAt;
  }
  if (noticia.categoria) jsonLd.articleSection = noticia.categoria;

  const etiquetas = [
    `<link rel="canonical" href="${escaparAtributo(canonica)}" />`,
    noticia.noindex ? '<meta name="robots" content="noindex, nofollow" />' : "",
    '<meta property="og:type" content="article" />',
    `<meta property="og:site_name" content="${escaparAtributo(NOMBRE)}" />`,
    '<meta property="og:locale" content="es_PE" />',
    `<meta property="og:title" content="${escaparAtributo(noticia.titulo)}" />`,
    `<meta property="og:description" content="${escaparAtributo(descripcion)}" />`,
    `<meta property="og:url" content="${escaparAtributo(canonica)}" />`,
    `<meta property="og:image" content="${escaparAtributo(imagen)}" />`,
    noticia.publishedAt
      ? `<meta property="article:published_time" content="${escaparAtributo(noticia.publishedAt)}" />`
      : "",
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escaparAtributo(noticia.titulo)}" />`,
    `<meta name="twitter:description" content="${escaparAtributo(descripcion)}" />`,
    `<meta name="twitter:image" content="${escaparAtributo(imagen)}" />`,
    `<script type="application/ld+json">${escaparJsonLd(jsonLd)}</script>`,
  ].filter(Boolean);

  return { titulo, descripcion, etiquetas };
}

/**
 * Cuerpo para el crawler sin JS. Va con estilos en línea a propósito: Tailwind sólo
 * emite las clases que encuentra escaneando `src/`, y este HTML se arma acá.
 * `.cuerpo-articulo` sí existe siempre porque está declarado en src/index.css.
 */
function cuerpo(noticia) {
  const partes = [
    '<div style="max-width:780px;margin:0 auto;padding:50px 20px 70px">',
    `<a href="/" style="font-family:Montserrat,sans-serif;font-size:14px;color:#e7000b;text-decoration:none">${escaparTexto(NOMBRE)}</a>`,
    "<article>",
    `<h1 style="font-family:Montserrat,sans-serif;font-size:40px;line-height:1;font-weight:700;text-transform:uppercase;color:#000;margin:15px 0">${escaparTexto(noticia.titulo)}</h1>`,
  ];
  if (noticia.imagen) {
    partes.push(
      `<img src="${escaparAtributo(noticia.imagen)}" alt="${escaparAtributo(noticia.titulo)}" style="width:100%;height:auto;display:block" />`,
    );
  }
  if (noticia.resumen) {
    partes.push(
      `<p style="font-family:Inter,sans-serif;font-size:16px;line-height:24px;color:rgba(0,0,0,.75);margin:15px 0">${escaparTexto(noticia.resumen)}</p>`,
    );
  }
  partes.push(`<div class="cuerpo-articulo">${sanear(noticia.bodyHtml)}</div>`);
  if (noticia.categoria) {
    partes.push(
      `<p style="font-family:Montserrat,sans-serif;font-size:14px;color:#450003;margin-top:30px">Etiquetas: ${escaparTexto(noticia.categoria)}</p>`,
    );
  }
  partes.push("</article>", "</div>");
  return partes.join("");
}

// ---------------------------------------------------------------------------
// Emisión
// ---------------------------------------------------------------------------

/**
 * `String.replace` con un STRING de reemplazo interpreta `$&`, `` $` ``, `$'` y `$$`. Un
 * titular con "US$ 1,500" o un cuerpo con `$'` reinyectaba pedazos de la plantilla en el
 * archivo final (silenciosamente, con exit 0). Pasando una FUNCIÓN, el texto va literal.
 */
const literal = (valor) => () => valor;

let generados = 0;
for (const noticia of resueltas) {
  const { titulo, descripcion, etiquetas } = cabecera(noticia);

  const html = plantilla
    .replace(/<title>[\s\S]*?<\/title>/i, literal(`<title>${escaparTexto(titulo)}</title>`))
    .replace(
      /<meta\s+name="description"[^>]*>/i,
      literal(`<meta name="description" content="${escaparAtributo(descripcion)}" />`),
    )
    .replace("</head>", literal(`${etiquetas.map((e) => `    ${e}`).join("\n")}\n  </head>`))
    .replace('<div id="root"></div>', literal(`<div id="root">${cuerpo(noticia)}</div>`));

  const carpeta = join(DIST, "noticia", noticia.slug);
  mkdirSync(carpeta, { recursive: true });
  writeFileSync(join(carpeta, "index.html"), html, "utf8");
  generados += 1;
  console.log(`[prerender] /noticia/${noticia.slug}/`);
}

// sitemap.xml — sólo lo indexable, siempre con barra final.
// Un sitemap no puede listar URLs de otro host: si la redacción puso una canónica externa,
// esa nota no es nuestra a efectos de indexación y queda fuera (el archivo se genera igual).
const ajenas = resueltas.filter((n) => !n.noindex && !urlCanonica(n).startsWith(`${SITIO}/`));
for (const n of ajenas) {
  console.warn(`[prerender] fuera del sitemap (canónica de otro host): ${urlCanonica(n)}`);
}
const indexables = resueltas.filter((n) => !n.noindex && urlCanonica(n).startsWith(`${SITIO}/`));
const urls = [
  `  <url><loc>${escaparTexto(`${SITIO}/`)}</loc></url>`,
  ...indexables.map((n) => {
    const lastmod = n.publishedAt ? `<lastmod>${escaparTexto(n.publishedAt)}</lastmod>` : "";
    return `  <url><loc>${escaparTexto(urlCanonica(n))}</loc>${lastmod}</url>`;
  }),
];
writeFileSync(
  join(DIST, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
  "utf8",
);

writeFileSync(
  join(DIST, "robots.txt"),
  ["User-agent: *", "Allow: /", "Disallow: /panel", "", `Sitemap: ${SITIO}/sitemap.xml`, ""].join(
    "\n",
  ),
  "utf8",
);

console.log(
  `[prerender] ${generados} artículo(s), ${indexables.length} en sitemap.xml, robots.txt listo.`,
);
