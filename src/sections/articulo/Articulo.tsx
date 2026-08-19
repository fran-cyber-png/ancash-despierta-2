import { useState } from "react";
import { Link } from "react-router-dom";
import { articulo } from "./content";
import { BarraLateral } from "./BarraLateral";
import {
  IconoCalendario,
  IconoClip,
  IconoFacebook,
  IconoFirma,
  IconoInstagram,
  IconoVolver,
  IconoWhatsapp,
} from "../../components/Iconos";
import { fechaISO, fechaLarga, partirTitulo } from "../../utils/formato";
import { sanear } from "../../utils/sanear";
import { type Noticia } from "../noticias";

const botonCompartir =
  "flex h-[36px] w-[36px] items-center justify-center rounded-full bg-panel text-tinta transition-colors duration-300 ease-in-out hover:bg-rojo hover:text-white";

/**
 * Instagram no tiene intent de compartir por URL (a diferencia de Facebook o
 * WhatsApp): el botón copia el enlace para que se pegue a mano en la historia
 * o el DM, igual que el clip.
 */
function Compartir({ noticia }: { noticia: Noticia }) {
  const [copiado, setCopiado] = useState(false);
  const url = noticia.canonicalUrl || window.location.href;

  // No se espera la promesa para el feedback: en algunos contextos (permisos
  // de portapapeles denegados/pendientes) nunca resuelve, y el botón se
  // quedaba sin mostrar nada. Con Clipboard API ausente, cae al método viejo.
  function copiarEnlace() {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).catch(() => {});
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <div className="flex flex-wrap items-center gap-[14px]">
      <span className="font-texto text-[15px] font-bold text-tinta desk:text-[16px]">
        Compartir en:
      </span>

      <div className="flex items-center gap-[10px]">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Compartir en Facebook"
          className={botonCompartir}
        >
          <IconoFacebook className="h-[15px] w-[15px]" />
        </a>

        <button
          type="button"
          onClick={copiarEnlace}
          aria-label="Copiar enlace para compartir en Instagram"
          className={botonCompartir}
        >
          <IconoInstagram className="h-[17px] w-[17px]" />
        </button>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${noticia.titulo} ${url}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Compartir en WhatsApp"
          className={botonCompartir}
        >
          <IconoWhatsapp className="h-[17px] w-[17px]" />
        </a>

        <button type="button" onClick={copiarEnlace} aria-label="Copiar enlace" className={botonCompartir}>
          <IconoClip className="h-[17px] w-[17px]" />
        </button>
      </div>

      {copiado && <span className="font-texto text-[13px] text-rojo">¡Enlace copiado!</span>}
    </div>
  );
}

/**
 * Página de nota, según el frame 2-1135 del Figma:
 * panel gris con titular centrado + firma, portada que desborda ese panel, y
 * abajo el cuerpo a dos columnas con la barra lateral.
 */
export function Articulo({ noticia, otras }: { noticia: Noticia; otras: Noticia[] }) {
  const { fuerte, resto } = partirTitulo(noticia.titulo);
  const fecha = fechaLarga(noticia.publishedAt);

  return (
    <article className="w-full">
      {/* Cabecera sobre el panel gris ------------------------------------
          pt-[108px]/[160px] = altura del header fijo (72/100) + el espaciado
          propio del diseño (36/60): sin esto el header semitransparente,
          pensado para flotar sobre el Hero, tapa el titular acá. */}
      <div className="w-full bg-panel">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center px-[20px] pt-[108px] desk:px-[40px] desk:pt-[160px]">
          <h1 className="text-center font-titulo text-[28px] leading-[1.2] font-normal text-tinta desk:max-w-[1180px] desk:text-[56px]">
            {fuerte && <span className="font-bold">{fuerte}</span>}
            {resto}
          </h1>

          <div className="mt-[18px] flex flex-wrap items-center justify-center gap-[14px] font-texto text-[14px] text-meta desk:mt-[28px] desk:gap-[24px] desk:text-[20px]">
            <span className="flex items-center gap-[10px]">
              <IconoFirma className="h-[20px] w-[20px] shrink-0 text-rojo" />
              {articulo.firma}
            </span>
            {fecha && (
              <>
                <span className="h-[22px] w-px bg-azul" aria-hidden="true" />
                <span className="flex items-center gap-[10px]">
                  <IconoCalendario className="h-[20px] w-[20px] shrink-0 text-rojo" />
                  <span>
                    {articulo.lugar},{" "}
                    <time dateTime={fechaISO(noticia.publishedAt)}>{fecha}</time>
                  </span>
                </span>
              </>
            )}
          </div>

          {/* La portada asoma por debajo del panel, como en el Figma. */}
          {noticia.imagen && (
            <img
              src={noticia.imagen}
              alt={noticia.titulo}
              className="mt-[24px] mb-[-24px] block h-[220px] w-full object-cover desk:mt-[38px] desk:mb-[-40px] desk:h-[545px] desk:w-[1376px] desk:max-w-full"
            />
          )}
        </div>
      </div>

      {/* Cuerpo + barra lateral ------------------------------------------
          desk:max-w-[1376px] desk:px-0: mismo ancho que la portada de arriba
          (desk:w-[1376px], centrada dentro del panel de 1520 útiles). Con el
          max-w-[1600px]/px-40 que tenía antes quedaba 144px más ancho que la
          foto y los bordes no coincidían. */}
      <div className="mx-auto w-full max-w-[1600px] px-[20px] pt-[48px] pb-[56px] desk:max-w-[1376px] desk:px-0 desk:pt-[76px] desk:pb-[90px]">
        <div className="flex flex-wrap items-center justify-between gap-y-[16px] font-texto text-[14px] desk:text-[15px]">
          <Link
            to="/"
            className="group flex items-center gap-[8px] text-rojo transition-colors duration-300 ease-in-out hover:text-rojo-banda"
          >
            <IconoVolver className="h-[16px] w-[16px] shrink-0 transition-transform duration-300 ease-in-out group-hover:-translate-x-[3px]" />
            {articulo.volver}
          </Link>

          <Compartir noticia={noticia} />
        </div>

        <div className="mt-[26px] flex flex-col gap-[40px] desk:mt-[38px] desk:flex-row desk:gap-[90px]">
          <div className="min-w-0 flex-1">
            {noticia.resumen && (
              <p className="font-texto text-[17px] leading-[1.5] font-bold text-tinta desk:text-[20px]">
                {noticia.resumen}
              </p>
            )}

            {/* El cuerpo llega como HTML del editor de Bravo (h2/h3/ul/ol/blockquote…).
                La tipografía se define por etiqueta en `.cuerpo-articulo` (src/index.css):
                el saneador descarta class/style, así que no se puede estilar con clases. */}
            <div
              className="cuerpo-articulo mt-[20px]"
              dangerouslySetInnerHTML={{ __html: sanear(noticia.bodyHtml) }}
            />
          </div>

          <BarraLateral actual={noticia} otras={otras} />
        </div>
      </div>
    </article>
  );
}
