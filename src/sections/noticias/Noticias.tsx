import { noticias } from "./content";
import { NoticiaCard } from "./NoticiaCard";

export function Noticias() {
  return (
    <section
      id="noticias"
      className="w-full bg-white px-[8px] pt-[50px] pb-[30px] desk:px-[32px] desk:pt-[82px] desk:pb-[112px]"
    >
      <div className="mx-auto flex max-w-[416px] flex-col gap-[30px] desk:grid desk:max-w-[1302px] desk:grid-cols-3">
        {noticias.map((n) => (
          <NoticiaCard key={n.id} noticia={n} />
        ))}
      </div>
    </section>
  );
}
