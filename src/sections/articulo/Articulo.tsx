import { Link } from "react-router-dom";
import { articulo, redesCompartir } from "./content";
import { urlCanonica, type Noticia } from "../noticias";
import { sanear } from "../../utils/sanear";

export function Articulo({ noticia }: { noticia: Noticia }) {
  const { compartir, etiquetas } = articulo;
  const redes = redesCompartir(urlCanonica(noticia), noticia.titulo);
  const categorias = noticia.categoria ? [noticia.categoria] : [];

  return (
    <article className="w-full bg-paper px-[20px] pt-[50px] pb-[70px] desk:bg-white desk:px-0 desk:pt-[75px] desk:pb-[188px]">
      <div className="mx-auto flex max-w-[390px] flex-col gap-[70px] desk:max-w-[780px]">
        <div className="flex flex-col gap-[50px]">
          <div className="flex flex-col gap-[15px]">
            <Link
              to="/"
              className="inline-flex w-fit items-center gap-[8px] font-ui text-[16px] font-bold uppercase text-brand-red"
            >
              <span aria-hidden="true">←</span>
              Inicio
            </Link>
            <h1 className="font-ui text-[40px] leading-[38px] font-bold uppercase text-black desk:font-display desk:text-[48px] desk:leading-[57.6px]">
              {noticia.titulo}
            </h1>
            {noticia.imagen && (
              <img
                src={noticia.imagen}
                alt={noticia.titulo}
                className="aspect-[4/3] w-full object-cover"
              />
            )}
          </div>

          {/* El cuerpo llega como HTML del editor de Bravo (h2/h3/ul/ol/blockquote…).
              La tipografía se define por etiqueta en `.cuerpo-articulo` (src/index.css):
              el saneador descarta class/style, así que no se puede estilar con clases. */}
          <div
            className="cuerpo-articulo"
            dangerouslySetInnerHTML={{ __html: sanear(noticia.bodyHtml) }}
          />
        </div>

        <div className="flex items-start justify-between desk:items-center">
          <div className="flex w-[190px] flex-col gap-[10px] desk:w-auto desk:flex-row desk:items-center desk:gap-[15px]">
            <p className="font-ui text-[16px] leading-[24px] font-bold whitespace-nowrap text-brand-ink desk:font-display desk:text-[18px] desk:leading-[27px]">
              <span className="desk:hidden">{compartir.titulo}</span>
              <span className="hidden desk:inline">{compartir.tituloDesk}</span>
            </p>
            <div className="flex items-center gap-[10px]">
              {redes.map((red) => (
                <a
                  key={red.nombre}
                  href={red.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Compartir en ${red.nombre}`}
                  className={`flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full desk:h-[50px] desk:w-[50px] ${
                    red.claro ? "bg-white" : "bg-brand-ink"
                  }`}
                >
                  {/* Los SVG se exportan invertidos; el Figma los voltea en Y */}
                  <img
                    src={red.icono}
                    alt=""
                    className="h-[16px] w-[16px] -scale-y-100 desk:h-[18px] desk:w-[18px]"
                  />
                </a>
              ))}
            </div>
          </div>

          {categorias.length > 0 && (
            <div className="flex flex-col gap-[10px] desk:flex-row desk:items-center desk:gap-[5px]">
              <p className="font-ui text-[16px] leading-[24px] font-bold whitespace-nowrap text-brand-ink desk:font-display desk:text-[18px] desk:leading-[27px]">
                {etiquetas.titulo}
              </p>
              {categorias.map((categoria) => (
                <p
                  key={categoria}
                  className="font-ui text-[14px] leading-[21px] font-medium text-brand-ink desk:font-display desk:text-[16px] desk:leading-[24px] desk:text-black"
                >
                  {categoria}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
