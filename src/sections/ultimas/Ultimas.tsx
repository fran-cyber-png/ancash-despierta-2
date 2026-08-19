import { Link } from "react-router-dom";
import { TituloSeccion } from "../../components/TituloSeccion";
import { etiquetaLectura, fechaCorta, fechaISO } from "../../utils/formato";
import { noticiaHref, type Noticia } from "../noticias";

function FilaUltima({ noticia }: { noticia: Noticia }) {
  const fecha = fechaCorta(noticia.publishedAt);

  return (
    <article className="flex items-start gap-[14px]">
      <Link
        to={noticiaHref(noticia.slug)}
        className="block h-[100px] w-[150px] shrink-0 overflow-hidden bg-white desk:h-[150px] desk:w-[226px]"
      >
        {noticia.imagen && (
          <img
            src={noticia.imagen}
            alt={noticia.titulo}
            className="h-full w-full object-cover"
          />
        )}
      </Link>

      <div className="flex flex-col gap-[8px] desk:gap-[12px]">
        <h3 className="font-texto text-[17px] leading-[1.25] font-bold text-tinta desk:text-[21px]">
          <Link to={noticiaHref(noticia.slug)}>{noticia.titulo}</Link>
        </h3>
        <p className="font-texto text-[13px] font-medium text-meta desk:text-[15px]">
          {fecha && <time dateTime={fechaISO(noticia.publishedAt)}>{fecha}</time>}
          {fecha && " - "}
          {etiquetaLectura(noticia.bodyHtml).toLowerCase()}
        </p>
      </div>
    </article>
  );
}

export function Ultimas({ noticias }: { noticias: Noticia[] }) {
  if (noticias.length === 0) return null;

  return (
    <section id="lo-ultimo" className="w-full bg-panel">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-[24px] px-[20px] py-[40px] desk:gap-[34px] desk:px-[40px] desk:py-[56px]">
        <TituloSeccion
          titulo="LO ÚLTIMO"
          enlace={{ texto: "Ver todas las noticias", href: "#destacadas" }}
        />

        <div className="grid grid-cols-1 gap-[24px] desk:grid-cols-3 desk:gap-[32px]">
          {noticias.map((n) => (
            <FilaUltima key={n.slug} noticia={n} />
          ))}
        </div>
      </div>
    </section>
  );
}
