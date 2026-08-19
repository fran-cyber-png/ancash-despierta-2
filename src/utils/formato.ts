/**
 * Formato de los metadatos que el XD muestra en cada tarjeta
 * ("18 AGO 2026 · 3 MIN DE LECTURA").
 *
 * Bravo no manda ninguno de los dos calculado: la fecha sale de `published_at`
 * y el tiempo de lectura se estima acá desde `body_html`. Si algún día el
 * endpoint agrega los campos, esto se borra.
 */

const MESES = [
  "ENE",
  "FEB",
  "MAR",
  "ABR",
  "MAY",
  "JUN",
  "JUL",
  "AGO",
  "SET",
  "OCT",
  "NOV",
  "DIC",
] as const;

/** "2026-08-18T10:00:00Z" -> "18 AGO 2026". Devuelve "" si no hay fecha usable. */
export function fechaCorta(iso: string | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  // UTC a propósito: el build corre en el servidor y la fecha no puede bailar
  // según la zona horaria de quien mira.
  return `${d.getUTCDate()} ${MESES[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** Fecha en formato `datetime` para el <time>. */
export function fechaISO(iso: string | undefined): string | undefined {
  if (!iso) return undefined;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}

/**
 * Estimación de lectura a 200 palabras por minuto, mínimo 1.
 * Se cuenta sobre el texto plano: las etiquetas del editor no son palabras.
 */
export function minutosLectura(bodyHtml: string): number {
  const texto = bodyHtml
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z]+;|&#\d+;/gi, " ")
    .trim();
  if (!texto) return 1;
  const palabras = texto.split(/\s+/).length;
  return Math.max(1, Math.round(palabras / 200));
}

/** "3 MIN DE LECTURA", tal cual el diseño. */
export function etiquetaLectura(bodyHtml: string): string {
  return `${minutosLectura(bodyHtml)} MIN DE LECTURA`;
}

/**
 * El diseño escribe el titular con el arranque en negrita y el resto en regular
 * ("**Perú vs. Venezuela:** hora y dónde ver el partido…"). Bravo manda el título
 * como texto plano, así que la partición se deduce: hasta los dos puntos, negrita.
 * Sin dos puntos, todo va en regular — nunca se inventa un corte.
 */
export function partirTitulo(titulo: string): { fuerte: string; resto: string } {
  const corte = titulo.indexOf(":");
  if (corte === -1) return { fuerte: "", resto: titulo };
  return { fuerte: titulo.slice(0, corte + 1), resto: titulo.slice(corte + 1) };
}

const MESES_LARGOS = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "setiembre",
  "octubre",
  "noviembre",
  "diciembre",
] as const;

/** "2026-08-05T…" -> "05 de agosto", como la firma del artículo en el Figma. */
export function fechaLarga(iso: string | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${String(d.getUTCDate()).padStart(2, "0")} de ${MESES_LARGOS[d.getUTCMonth()]}`;
}
