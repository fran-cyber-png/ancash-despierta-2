import { Link } from "react-router-dom";
import { MetaNoticia } from "../../components/MetaNoticia";
import { IconoFlecha } from "../../components/Iconos";
import { partirTitulo } from "../../utils/formato";
import { noticiaHref, type Noticia } from "../noticias";

/**
 * "Noticia del día": la nota más reciente sobre el panel gris.
 *
 * La foto sangra hasta el borde izquierdo de la ventana, así que la sección NO
 * puede ir dentro del contenedor centrado de 1520: el texto se alinea a mano
 * con ese margen (`calc((100vw - 1520px) / 2)`) del lado derecho y la imagen
 * ocupa el resto. `flex-row-reverse` solo cambia el orden visual en desktop;
 * en mobile el texto sigue arriba y la imagen abajo (DOM sin tocar).
 */
export function Destacada({ noticia }: { noticia: Noticia }) {
  const margen = "desk:pr-[max(40px,calc((100vw-1520px)/2))]";
  const { fuerte, resto } = partirTitulo(noticia.titulo);

  return (
    <section className="w-full bg-panel">
      <div className="flex flex-col desk:flex-row-reverse desk:items-center">
        <div
          className={`flex flex-1 flex-col gap-[16px] px-[20px] py-[36px] desk:gap-[22px] desk:py-[44px] desk:pl-[56px] ${margen} ${
            noticia.imagen ? "" : "desk:pl-[max(40px,calc((100vw-1520px)/2))]"
          }`}
        >
          <p className="font-titulo text-[20px] font-extrabold uppercase text-rojo desk:text-[28px]">
            Noticia del día
          </p>

          <h2 className="font-titulo text-[26px] leading-[1.2] font-normal text-tinta desk:max-w-[640px] desk:text-[42px]">
            <Link
              to={noticiaHref(noticia.slug)}
              className="transition-colors duration-500 ease-in-out hover:text-rojo"
            >
              {fuerte && <span className="font-bold">{fuerte}</span>}
              {resto}
            </Link>
          </h2>

          {noticia.resumen && (
            <p className="font-texto text-[15px] leading-[1.5] text-meta desk:max-w-[560px] desk:text-[20px]">
              {noticia.resumen}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-[28px] gap-y-[10px]">
            <MetaNoticia noticia={noticia} className="text-meta" />
            <Link
              to={noticiaHref(noticia.slug)}
              className="group flex items-center gap-[8px] font-texto text-[15px] font-bold text-rojo transition-colors duration-300 ease-in-out hover:text-rojo-banda desk:text-[16px]"
            >
              LEER NOTA
              <IconoFlecha className="h-[16px] w-[16px] shrink-0 transition-transform duration-300 ease-in-out group-hover:translate-x-[3px]" />
            </Link>
          </div>
        </div>

        {noticia.imagen && (
          <Link
            to={noticiaHref(noticia.slug)}
            // El borde derecho (contra el texto) va en diagonal, como en el Figma.
            className="group block h-[220px] w-full shrink-0 overflow-hidden desk:h-[505px] desk:w-[54.5%] desk:[clip-path:polygon(0_0,95%_0,100%_100%,0_100%)]"
          >
            <img
              src={noticia.imagen}
              alt={noticia.titulo}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </Link>
        )}
      </div>
    </section>
  );
}
