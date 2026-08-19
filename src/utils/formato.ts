/**
 * Formato de los metadatos que el XD muestra en cada tarjeta ("18 AGO 2026").
 * Bravo no manda la fecha formateada: sale de `published_at`.
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
 * Los primeros `cantidad` párrafos del cuerpo, en texto plano. A diferencia
 * de `extractoCuerpo` respeta los cortes reales del editor en vez de cortar
 * por cantidad de caracteres; se usa donde hay espacio para mostrar más de
 * un párrafo (p. ej. el hover de las tarjetas de DESTACADAS).
 */
export function parrafosCuerpo(bodyHtml: string, cantidad: number): string[] {
  const parrafos: string[] = [];
  for (const m of bodyHtml.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)) {
    const texto = m[1]
      .replace(/<[^>]*>/g, " ")
      .replace(/&[a-z]+;|&#\d+;/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (!texto) continue;
    parrafos.push(texto);
    if (parrafos.length === cantidad) break;
  }
  return parrafos;
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
