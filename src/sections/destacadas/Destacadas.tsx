import { Link } from "react-router-dom";
import { TituloSeccion } from "../../components/TituloSeccion";
import { MetaNoticia } from "../../components/MetaNoticia";
import { IconoFlecha } from "../../components/Iconos";
import { noticiaHref, type Noticia } from "../noticias";

function TarjetaDestacada({ noticia }: { noticia: Noticia }) {
  return (
    <article className="relative aspect-[485/500] w-full overflow-hidden bg-tinta">
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

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-[14px] p-[24px] pr-[84px]">
        <h3 className="font-texto text-[17px] leading-[1.28] font-bold text-white desk:text-[20px]">
          <Link to={noticiaHref(noticia.slug)}>
            {/* El enlace cubre toda la tarjeta: así el área clicable es la foto
                entera y no sólo el titular. */}
            <span className="absolute inset-0" aria-hidden="true" />
            {noticia.titulo}
          </Link>
        </h3>
        <MetaNoticia noticia={noticia} className="text-white" />
      </div>

      <span className="absolute right-[24px] bottom-[24px] flex h-[48px] w-[48px] items-center justify-center rounded-full bg-rojo text-white">
        <IconoFlecha className="h-[20px] w-[20px]" />
      </span>
    </article>
  );
}

export function Destacadas({ noticias }: { noticias: Noticia[] }) {
  if (noticias.length === 0) return null;

  return (
    <section id="destacadas" className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-[24px] px-[20px] py-[48px] desk:gap-[34px] desk:px-[40px] desk:py-[76px]">
        <TituloSeccion
          titulo="DESTACADAS"
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
