/**
 * Saneo del HTML que llega del editor de Bravo.
 *
 * Bravo ya sanea del lado del servidor, pero esta es la ÚNICA defensa del HTML que emite
 * `scripts/prerender.mjs`: ahí no hay React ni whitelist, el string entra tal cual al archivo
 * que sirve nginx. Por eso el criterio es de comportamiento, no cosmético:
 *
 *   1. se borran los bloques y etiquetas que ejecutan o secuestran la página;
 *   2. se borra cualquier atributo `on*` (el separador puede ser espacio O `/`:
 *      `<img src="x"/onerror=…>` y `<svg/onload=…>` no llevan espacio);
 *   3. se borran `style`/`class`/`id` — Bravo no los deja pasar y sin ellos no hay overlay
 *      `position:fixed` encima del artículo;
 *   4. se borran los atributos de URL cuyo esquema, YA NORMALIZADO (entidades `&#106;`,
 *      espacios y caracteres de control), sea ejecutable.
 *
 * Las pasadas se repiten hasta punto fijo: quitar un fragmento puede dejar dos mitades
 * pegadas que vuelven a formar un payload (`<scr<script>ipt>`).
 *
 * Sin dependencias. **Está replicado tal cual en `scripts/prerender.mjs`** (corre en Node y no
 * puede importar TypeScript): si tocás uno, tocá el otro.
 */

/** Bloques que se borran con su contenido: el texto de adentro es código, no prosa. */
const BLOQUES_EJECUTABLES = /<\s*(script|style|noscript|template)\b[\s\S]*?<\s*\/\s*\1\s*>/gi;

/** Etiquetas que se borran dejando el texto: nunca son parte de un artículo. */
const ETIQUETAS_FUERA =
  /<\s*\/?\s*(?:script|style|noscript|template|iframe|frame|frameset|object|embed|applet|form|input|button|select|option|textarea|base|link|meta|math|svg)\b[^>]*>/gi;

/** `onerror=`, `onload=`… El separador puede ser espacio o `/`. */
const MANEJADORES = /[\s/]on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;

/** El saneador de Bravo descarta class/style/id; acá se hace valer ese contrato. */
const ATRIBUTOS_DE_ESTILO = /[\s/](?:style|class|id)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;

/** Atributos que el navegador resuelve como URL (no sólo href/src). */
const ATRIBUTOS_URL =
  /[\s/](?:href|src|srcset|action|formaction|poster|background|data|xlink:href)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;

const ESQUEMAS_PROHIBIDOS = /^(?:javascript|vbscript|livescript|data|blob|file):/;

function desdeCodigo(codigo: number): string {
  if (!Number.isFinite(codigo) || codigo < 0 || codigo > 0x10ffff) return "";
  try {
    return String.fromCodePoint(codigo);
  } catch {
    return "";
  }
}

/** El navegador decodifica las entidades ANTES de mirar el esquema; nosotros también. */
function normalizarUrl(valor: string): string {
  return valor
    .replace(/^\s*["']|["']\s*$/g, "")
    .replace(/&#x([0-9a-f]+);?/gi, (_, hex: string) => desdeCodigo(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);?/g, (_, dec: string) => desdeCodigo(Number(dec)))
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

function unaPasada(html: string): string {
  return html
    .replace(BLOQUES_EJECUTABLES, "")
    .replace(ETIQUETAS_FUERA, "")
    .replace(MANEJADORES, "")
    .replace(ATRIBUTOS_DE_ESTILO, "")
    .replace(ATRIBUTOS_URL, (coincidencia: string) => {
      const valor = coincidencia.slice(coincidencia.indexOf("=") + 1);
      return ESQUEMAS_PROHIBIDOS.test(normalizarUrl(valor)) ? "" : coincidencia;
    })
    .replace(MENOR_SUELTO, "&lt;");
}

export function sanear(html: string): string {
  if (!html) return "";
  let salida = String(html);
  for (let i = 0; i < 5; i += 1) {
    const previo = salida;
    salida = unaPasada(salida);
    if (salida === previo) break;
  }
  return salida;
}
