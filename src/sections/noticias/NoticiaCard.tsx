import { Link } from "react-router-dom";
import { noticiaHref, type Noticia } from "./content";

export function NoticiaCard({ noticia }: { noticia: Noticia }) {
  return (
    <article className="w-full border border-card-border bg-card">
      <Link to={noticiaHref(noticia.slug)} className="block aspect-square w-full overflow-hidden">
        {noticia.imagen ? (
          <img
            src={noticia.imagen}
            alt={noticia.titulo}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-[#c4c4c4]" />
        )}
      </Link>
      <div className="flex min-h-[252px] flex-col justify-center gap-[30px] px-[30px] py-[30px]">
        <h2 className="font-display text-[16px] leading-[19.2px] font-bold uppercase text-ink">
          <Link to={noticiaHref(noticia.slug)}>{noticia.titulo}</Link>
        </h2>
        <p className="font-body text-[16px] leading-[24px] text-muted">
          {noticia.resumen}
        </p>
        <Link
          to={noticiaHref(noticia.slug)}
          className="inline-flex w-fit items-center gap-[10px] bg-brand-red-dark p-[10px] font-display text-[16px] font-bold text-white"
        >
          Leer Artículo
          <svg
            aria-hidden="true"
            viewBox="0 0 320 512"
            className="h-[16px] w-[10px] shrink-0 fill-current"
          >
            <path d="M285.476 272.971 91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
