import type { Noticia } from "./content";

export function NoticiaCard({ noticia }: { noticia: Noticia }) {
  return (
    <article className="w-full border border-card-border bg-card">
      <a href={noticia.href} className="block aspect-square w-full overflow-hidden">
        {noticia.imagen ? (
          <img
            src={noticia.imagen}
            alt={noticia.titulo}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-[#c4c4c4]" />
        )}
      </a>
      <div className="flex min-h-[252px] flex-col justify-center gap-[30px] px-[30px] py-[30px]">
        <h2 className="font-display text-[16px] leading-[19.2px] font-bold uppercase text-ink">
          {noticia.titulo}
        </h2>
        <p className="font-body text-[16px] leading-[24px] text-muted">
          {noticia.resumen}
        </p>
      </div>
    </article>
  );
}
