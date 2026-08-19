import { IconoCalendario, IconoReloj } from "./Iconos";
import { etiquetaLectura, fechaCorta, fechaISO } from "../utils/formato";
import type { Noticia } from "../sections/noticias";

/**
 * "18 AGO 2026 · 3 MIN DE LECTURA". Hereda el color del contenedor: en las
 * tarjetas de DESTACADAS va en blanco sobre la foto y en el resto en gris.
 */
export function MetaNoticia({ noticia, className }: { noticia: Noticia; className?: string }) {
  const fecha = fechaCorta(noticia.publishedAt);

  return (
    <div
      className={`flex flex-wrap items-center gap-x-[16px] gap-y-[4px] font-texto text-[13px] font-medium desk:text-[14px] ${className ?? ""}`}
    >
      {fecha && (
        <span className="flex items-center gap-[6px]">
          <IconoCalendario className="h-[15px] w-[15px] shrink-0" />
          <time dateTime={fechaISO(noticia.publishedAt)}>{fecha}</time>
        </span>
      )}
      <span className="flex items-center gap-[6px]">
        <IconoReloj className="h-[15px] w-[15px] shrink-0" />
        {etiquetaLectura(noticia.bodyHtml)}
      </span>
    </div>
  );
}
