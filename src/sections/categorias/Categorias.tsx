import { categorias } from "./content";

/** Repeticiones por tira: suficientes para cubrir monitores anchos (4K+) sin
    que se note el punto de reinicio del loop. */
const REPETICIONES = 24;

function Tira({ oculta }: { oculta?: boolean }) {
  return (
    <div
      aria-hidden={oculta}
      className="flex shrink-0 items-center gap-[24px] pr-[24px] desk:gap-[36px] desk:pr-[36px]"
    >
      {Array.from({ length: REPETICIONES }).map((_, i) => (
        <span key={i} className="flex items-center gap-[24px] desk:gap-[36px]">
          <span className="font-nav text-[16px] font-medium whitespace-nowrap text-white desk:text-[26px]">
            {categorias.texto}
          </span>
          <span aria-hidden="true" className="h-[6px] w-[6px] shrink-0 rounded-full bg-white/60 desk:h-[8px] desk:w-[8px]" />
        </span>
      ))}
    </div>
  );
}

export function Categorias() {
  return (
    <section
      id="noticia-del-dia"
      className="w-full scroll-mt-[72px] overflow-hidden bg-rojo-banda desk:scroll-mt-[100px]"
    >
      <div className="flex h-[56px] w-max items-center desk:h-[80px] animate-marquee motion-reduce:animate-none">
        <Tira />
        <Tira oculta />
      </div>
    </section>
  );
}
