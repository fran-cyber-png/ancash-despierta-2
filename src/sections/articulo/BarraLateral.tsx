import { Link } from "react-router-dom";
import { articulo } from "./content";
import { etiquetaLectura, fechaCorta, fechaISO } from "../../utils/formato";
import { noticiaHref, type Noticia } from "../noticias";

function ItemReciente({ noticia }: { noticia: Noticia }) {
  const fecha = fechaCorta(noticia.publishedAt);

  return (
    <article className="flex items-start gap-[16px]">
      <Link
        to={noticiaHref(noticia.slug)}
        className="block h-[100px] w-[110px] shrink-0 overflow-hidden bg-panel"
      >
        {noticia.imagen && (
          <img src={noticia.imagen} alt={noticia.titulo} className="h-full w-full object-cover" />
        )}
      </Link>

      <div className="flex min-w-0 flex-col gap-[6px]">
        <h3 className="font-texto text-[14px] leading-[1.3] font-bold uppercase text-tinta">
          <Link to={noticiaHref(noticia.slug)}>{noticia.titulo}</Link>
        </h3>
        <p className="font-texto text-[13px] text-meta">
          {fecha && <time dateTime={fechaISO(noticia.publishedAt)}>{fecha}</time>}
          {fecha && " - "}
          {etiquetaLectura(noticia.bodyHtml)}
        </p>
      </div>
    </article>
  );
}

/**
 * Columna derecha del artículo. Todo sale de la misma lista de noticias que
 * consume la portada: no hay endpoint aparte de "relacionadas" en Bravo.
 */
export function BarraLateral({ actual, otras }: { actual: Noticia; otras: Noticia[] }) {
  const recientes = otras.slice(0, 3);

  // Las categorías se deducen de lo publicado; la de la nota abierta no se repite.
  const categorias = [
    ...new Set(
      otras
        .map((n) => n.categoria)
        .filter((c): c is string => Boolean(c) && c !== actual.categoria),
    ),
  ].slice(0, 6);

  if (recientes.length === 0 && categorias.length === 0) return null;

  return (
    <aside className="w-full shrink-0 desk:w-[433px] desk:border-l desk:border-black/12 desk:pl-[40px]">
      {recientes.length > 0 && (
        <section>
          <h2 className="font-titulo text-[22px] font-normal text-tinta desk:text-[26px]">
            {articulo.recientes}
          </h2>
          <div className="mt-[20px] flex flex-col">
            {recientes.map((n, i) => (
              <div
                key={n.slug}
                className={i > 0 ? "border-t border-black/12 pt-[22px] mt-[22px]" : ""}
              >
                <ItemReciente noticia={n} />
              </div>
            ))}
          </div>
        </section>
      )}

      {categorias.length > 0 && (
        <section className="mt-[38px]">
          <h2 className="font-titulo text-[22px] font-normal text-tinta desk:text-[26px]">
            {articulo.otrasCategorias}
          </h2>
          <ul className="mt-[18px] flex flex-col gap-[14px]">
            {categorias.map((c) => (
              // Sin enlace: /categoria/<slug>/ no existe como archivo físico en el
              // docroot y daría 404 duro por deep-link (el vhost no tiene try_files).
              <li key={c} className="font-texto text-[17px] text-tinta">
                {c}
              </li>
            ))}
          </ul>
        </section>
      )}
    </aside>
  );
}
