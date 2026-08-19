import { Link } from "react-router-dom";
import { articulo } from "./content";
import { BarraLateral } from "./BarraLateral";
import { IconoCalendario, IconoFirma, IconoVolver } from "../../components/Iconos";
import { fechaISO, fechaLarga, partirTitulo } from "../../utils/formato";
import { sanear } from "../../utils/sanear";
import { type Noticia } from "../noticias";

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
      {/* Cabecera sobre el panel gris ------------------------------------ */}
      <div className="w-full bg-panel">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center px-[20px] pt-[36px] desk:px-[40px] desk:pt-[60px]">
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

      {/* Cuerpo + barra lateral ------------------------------------------ */}
      <div className="mx-auto w-full max-w-[1600px] px-[20px] pt-[48px] pb-[56px] desk:px-[40px] desk:pt-[76px] desk:pb-[90px]">
        <div className="flex items-center justify-between font-texto text-[14px] text-rojo desk:text-[15px]">
          <nav className="flex items-center gap-[8px]">
            {articulo.migas.map((miga) => (
              <span key={miga.href} className="flex items-center gap-[8px]">
                <Link to={miga.href}>{miga.texto}</Link>
                <span aria-hidden="true">&gt;</span>
              </span>
            ))}
          </nav>

          <Link to="/" className="flex items-center gap-[8px]">
            <IconoVolver className="h-[16px] w-[16px] shrink-0" />
            {articulo.volver}
          </Link>
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
