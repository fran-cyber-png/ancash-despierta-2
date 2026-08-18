import { articulo } from "./content";
import type { Noticia } from "../noticias";

export function Articulo({ noticia }: { noticia: Noticia }) {
  const { compartir, etiquetas } = articulo;

  return (
    <article className="w-full bg-paper px-[20px] pt-[50px] pb-[70px]">
      <div className="mx-auto flex max-w-[390px] flex-col gap-[70px]">
        <div className="flex flex-col gap-[50px]">
          <div className="flex flex-col gap-[15px]">
            <h1 className="font-ui text-[40px] leading-[38px] font-bold uppercase text-black">
              {noticia.titulo}
            </h1>
            {noticia.imagen && (
              <img
                src={noticia.imagen}
                alt={noticia.titulo}
                className="aspect-[345/258.75] w-full object-cover"
              />
            )}
          </div>

          <div className="flex flex-col gap-[15px] font-display text-[14px] leading-[22px] text-black/75">
            {noticia.contenido.map((bloque, i) => (
              <div key={i} className="flex flex-col">
                {bloque.map((linea, j) => (
                  <p key={j}>{linea}</p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex w-[190px] flex-col gap-[10px]">
            <p className="font-ui text-[16px] leading-[24px] font-bold text-brand-ink">
              {compartir.titulo}
            </p>
            <div className="flex items-center gap-[10px]">
              {compartir.redes.map((red) => (
                <a
                  key={red.nombre}
                  href={red.href}
                  aria-label={`Compartir en ${red.nombre}`}
                  className={`flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full ${
                    red.claro ? "bg-white" : "bg-brand-ink"
                  }`}
                >
                  {/* Los SVG se exportan invertidos; el Figma los voltea en Y */}
                  <img src={red.icono} alt="" className="h-[16px] w-[16px] -scale-y-100" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-[10px] text-brand-ink">
            <p className="font-ui text-[16px] leading-[24px] font-bold">{etiquetas.titulo}</p>
            {noticia.etiquetas.map((etiqueta) => (
              <p key={etiqueta} className="font-ui text-[14px] leading-[21px] font-medium">
                {etiqueta}
              </p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
