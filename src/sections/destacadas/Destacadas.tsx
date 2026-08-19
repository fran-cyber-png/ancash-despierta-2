import { Link } from "react-router-dom";
import { TituloSeccion } from "../../components/TituloSeccion";
import { MetaNoticia } from "../../components/MetaNoticia";
import { IconoFlecha } from "../../components/Iconos";
import { parrafosCuerpo } from "../../utils/formato";
import { noticiaHref, type Noticia } from "../noticias";

function TarjetaDestacada({ noticia }: { noticia: Noticia }) {
  // Bravo suele mandar `excerpt` vacío: si no hay resumen, el primer párrafo
  // del cuerpo hace de reemplazo y se completa con el segundo párrafo real.
  const parrafos = noticia.resumen
    ? [noticia.resumen, ...parrafosCuerpo(noticia.bodyHtml, 1)]
    : parrafosCuerpo(noticia.bodyHtml, 2);

  return (
    <article className="group relative aspect-[485/500] w-full overflow-hidden bg-tinta">
      {noticia.imagen && (
        <img
          src={noticia.imagen}
          alt={noticia.titulo}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* El degradado del XD ocupa poco más de la mitad baja de la tarjeta. */}
      <div className="absolute inset-x-0 bottom-0 h-[52%] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.85)_60%)]" />

      {noticia.categoria && (
        <span className="absolute top-[24px] left-[24px] flex h-[29px] items-center bg-rojo px-[10px] font-titulo text-[12px] font-semibold tracking-[0.02em] text-white uppercase">
          {noticia.categoria}
        </span>
      )}

      {/* Estado normal: título pegado abajo junto a la meta. Lo tapa el cuadro
          rojo al deslizarse, no hace falta apagarlo aparte. */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-[14px] p-[24px] pr-[84px]">
        <h3 className="font-texto text-[17px] leading-[1.28] font-bold text-white desk:text-[20px]">
          {noticia.titulo}
        </h3>
        <MetaNoticia noticia={noticia} className="text-white" />
      </div>

      {/* Cuadro rojo: fondo y contenido van en el mismo bloque, así que se
          mueven como una sola pieza al deslizarse desde abajo — nada queda
          desincronizado ni se superpone por separado. */}
      <div className="absolute inset-0 z-10 flex translate-y-full flex-col gap-[10px] overflow-hidden bg-rojo p-[24px] transition-transform duration-[770ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0">
        <h3 className="font-texto text-[17px] leading-[1.28] font-bold text-white desk:text-[20px]">
          {noticia.titulo}
        </h3>
        <MetaNoticia noticia={noticia} className="text-white/80" />
        <div className="mt-[4px] flex flex-col gap-[10px] pr-[60px]">
          {parrafos.map((parrafo, i) => (
            <p
              key={i}
              className="line-clamp-4 font-texto text-[14px] leading-[1.5] text-white/90 desk:text-[15px]"
            >
              {parrafo}
            </p>
          ))}
        </div>
      </div>

      {/* Enlace que cubre toda la tarjeta en ambos estados. */}
      <Link
        to={noticiaHref(noticia.slug)}
        className="absolute inset-0 z-20"
        aria-label={noticia.titulo}
      />

      <span className="pointer-events-none absolute right-[24px] bottom-[24px] z-30 flex h-[48px] w-[48px] items-center justify-center rounded-full bg-rojo text-white transition-colors duration-[770ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:bg-white group-hover:text-rojo">
        <IconoFlecha className="h-[20px] w-[20px]" />
      </span>
    </article>
  );
}

export function Destacadas({ noticias }: { noticias: Noticia[] }) {
  if (noticias.length === 0) return null;

  return (
    <section id="destacadas" className="w-full scroll-mt-[72px] bg-white desk:scroll-mt-[100px]">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-[24px] px-[20px] py-[48px] desk:gap-[34px] desk:px-[40px] desk:py-[76px]">
        <TituloSeccion
          titulo="NOTICIAS DESTACADAS"
          enlace={{ texto: "Ver más destacadas", href: "#lo-ultimo" }}
        />

        <div className="grid grid-cols-1 gap-[24px] desk:grid-cols-3 desk:gap-[32px]">
          {noticias.map((n) => (
            <TarjetaDestacada key={n.slug} noticia={n} />
          ))}
        </div>
      </div>
    </section>
  );
}
