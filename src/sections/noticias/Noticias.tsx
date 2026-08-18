import { noticias } from "./content";
import { NoticiaCard } from "./NoticiaCard";

export function Noticias() {
  return (
    <section id="noticias" className="w-full bg-white px-[8px] pt-[50px] pb-[30px]">
      <div className="mx-auto flex max-w-[416px] flex-col gap-[30px]">
        {noticias.map((n) => (
          <NoticiaCard key={n.id} noticia={n} />
        ))}
      </div>
    </section>
  );
}
