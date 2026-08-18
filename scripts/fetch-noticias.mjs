#!/usr/bin/env node
/**
 * Bake de noticias (prebuild). Sin dependencias: Node 22+ trae fetch y AbortController.
 *
 * Baja los artículos publicados del tenant en Bravo y los deja en
 * `src/sections/noticias/noticias.generado.json`, que se commitea. El sitio queda 100%
 * estático: nadie pega a la API en runtime.
 *
 * Contrato de salida:
 *   - Éxito (incluso con 0 artículos): reescribe el JSON. `[]` es un estado VÁLIDO —
 *     un tenant recién creado no tiene nada publicado todavía; quien resuelve el
 *     respaldo es la capa de datos (`content.ts`), no este script.
 *   - Falla (sin red, HTTP != 200, JSON inválido, respuesta que no es un array):
 *     NO toca el archivo y deja el snapshot commiteado. Sale con código != 0 sólo si el
 *     snapshot no existe, porque ahí sí no hay con qué buildear.
 *
 * OJO con el snapshot: en el runner NO es una red de seguridad real. `actions/checkout`
 * restablece los archivos versionados, así que el snapshot es siempre el que está commiteado
 * (hoy `[]`) y no el del deploy anterior. Con Bravo caído el build termina publicando la
 * semilla. Lo que impide que eso pise artículos vivos es el guard del workflow, que lee
 * `.bake-estado.json` — no este archivo.
 *
 * `.bake-estado.json` (raíz del repo, NO se commitea) es el puente con `deploy.yml`:
 *   { vivo, articulos, hash, fuente, generadoEn }
 *   - vivo=true  -> se alcanzó la API. Que el conteo baje es una despublicación editorial
 *                   legítima y el deploy puede seguir.
 *   - vivo=false -> se buildeó con el snapshot. Ahí el guard anti-caída sí aplica.
 *   - hash       -> sha256 del cuerpo EXACTO que se buildeó; `deploy.yml` lo guarda como
 *                   marca del cron (mismo cálculo que `curl … | sha256sum`).
 *
 * Env:
 *   BRAVO_API_URL  base de la API. Default: http://127.0.0.1:4080 (el runner corre en el
 *                  mismo host que bravo_api). LITERAL 127.0.0.1, nunca "localhost": ::1
 *                  no está bindeado y un cliente IPv6-first falla.
 *   BRAVO_TENANT   slug del tenant. Default: ancashdespierta.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const SALIDA = join(RAIZ, "src", "sections", "noticias", "noticias.generado.json");
const ESTADO = join(RAIZ, ".bake-estado.json");

const TENANT = process.env.BRAVO_TENANT || "ancashdespierta";
const API_LOCAL = process.env.BRAVO_API_URL || "http://127.0.0.1:4080";
const API_PUBLICA = "https://bravo.goberna.us";

/** Las 12 claves del contrato público. Todo lo demás se descarta. */
const CLAVES = [
  "slug",
  "title",
  "excerpt",
  "body_html",
  "cover_image_url",
  "category",
  "seo_title",
  "seo_description",
  "og_image_url",
  "canonical_url",
  "noindex",
  "published_at",
];

/** Mismo patrón que valida Bravo al crear el artículo. */
const SLUG_VALIDO = /^[a-z0-9-]+$/;

/** Por loopback la API contesta en milisegundos; el origen público cruza la VPN. */
const espera = (base) => (/^https?:\/\/127\.0\.0\.1(:|\/|$)/.test(base) ? 3000 : 10000);

/** Candidatos en orden: loopback del runner primero, API pública como red de seguridad. */
const candidatos = [...new Set([API_LOCAL.replace(/\/+$/, ""), API_PUBLICA])].map((base) => ({
  url: `${base}/v1/public/articles?tenant=${encodeURIComponent(TENANT)}&status=published`,
  timeout: espera(base),
}));

async function bajar({ url, timeout }) {
  const corte = new AbortController();
  const reloj = setTimeout(() => corte.abort(), timeout);
  try {
    const respuesta = await fetch(url, {
      signal: corte.signal,
      headers: { accept: "application/json" },
    });
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
    // Se hashea el cuerpo crudo, byte a byte: es lo mismo que calcula el gate del
    // workflow con `curl … | sha256sum`.
    const cuerpo = await respuesta.text();
    const datos = JSON.parse(cuerpo);
    // Un 500 con HTML de error, o un `{error:…}`, NO son una lista vacía: son un fallo.
    if (!Array.isArray(datos)) throw new Error("la respuesta no es un array");
    return { datos, hash: createHash("sha256").update(cuerpo).digest("hex") };
  } finally {
    clearTimeout(reloj);
  }
}

/**
 * Deja cada artículo con las claves del contrato y descarta los inservibles.
 *
 * El slug termina siendo un nombre de directorio en el prerender: si no es el que valida
 * Bravo, se descarta acá. El prerender también lo verifica, pero ahí el remedio es abortar
 * el build — y que una sola nota malformada tumbe la publicación de todas las demás es
 * exactamente lo que este diseño evita.
 */
function normalizar(crudos) {
  const vistos = new Set();
  const articulos = [];

  for (const crudo of crudos) {
    if (!crudo || typeof crudo !== "object") continue;

    const slug = typeof crudo.slug === "string" ? crudo.slug.trim() : "";
    if (!SLUG_VALIDO.test(slug)) {
      console.warn(`[bake] descartado: slug inválido (${JSON.stringify(crudo.slug)}).`);
      continue;
    }
    if (typeof crudo.title !== "string" || !crudo.title.trim()) {
      console.warn(`[bake] descartado: "${slug}" no trae título.`);
      continue;
    }
    if (vistos.has(slug)) {
      console.warn(`[bake] descartado: "${slug}" está repetido.`);
      continue;
    }

    vistos.add(slug);
    const articulo = {};
    for (const clave of CLAVES) {
      const valor = crudo[clave];
      articulo[clave] = valor === undefined ? null : valor;
    }
    articulo.slug = slug;
    articulos.push(articulo);
  }

  return articulos;
}

function escribirEstado(estado) {
  writeFileSync(
    ESTADO,
    `${JSON.stringify({ ...estado, generadoEn: new Date().toISOString() }, null, 2)}\n`,
    "utf8",
  );
}

/** Dos rondas sobre la lista de candidatos: un parpadeo de red no tiene por qué costar un deploy. */
let bajada = null;
let fuente = null;
for (let ronda = 1; ronda <= 2 && bajada === null; ronda += 1) {
  for (const candidato of candidatos) {
    try {
      bajada = await bajar(candidato);
      fuente = candidato.url;
      console.log(`[bake] ${TENANT}: ${bajada.datos.length} artículo(s) desde ${candidato.url}`);
      break;
    } catch (error) {
      console.warn(`[bake] falló ${candidato.url} en el intento ${ronda}: ${error.message}`);
    }
  }
}

if (bajada === null) {
  let previas = null;
  if (existsSync(SALIDA)) {
    try {
      const contenido = JSON.parse(readFileSync(SALIDA, "utf8"));
      if (Array.isArray(contenido)) previas = contenido;
    } catch {
      previas = null;
    }
  }
  if (previas) {
    console.warn(
      `[bake] Bravo inalcanzable — se buildea con el snapshot commiteado (${previas.length} artículo(s)).`,
    );
    escribirEstado({ vivo: false, articulos: previas.length, hash: null, fuente: null });
    process.exit(0);
  }
  escribirEstado({ vivo: false, articulos: 0, hash: null, fuente: null });
  console.error("[bake] Bravo inalcanzable y no hay snapshot previo usable. Abortando el build.");
  process.exit(1);
}

const utiles = normalizar(bajada.datos);

if (utiles.length !== bajada.datos.length) {
  console.warn(
    `[bake] se descartaron ${bajada.datos.length - utiles.length} artículo(s) inservible(s).`,
  );
}

mkdirSync(dirname(SALIDA), { recursive: true });
writeFileSync(SALIDA, `${JSON.stringify(utiles, null, 2)}\n`, "utf8");
escribirEstado({ vivo: true, articulos: utiles.length, hash: bajada.hash, fuente });
console.log(`[bake] escrito ${SALIDA}`);
