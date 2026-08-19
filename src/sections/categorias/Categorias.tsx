import { categorias } from "./content";

export function Categorias() {
  return (
    <section className="w-full bg-rojo-banda">
      <div className="mx-auto w-full max-w-[1600px] px-[20px] desk:px-[40px]">
        {/* En mobile la fila scrollea en horizontal: ocho rótulos de 26px no
            entran en 430w y partirlos en dos líneas rompe la barra de 80px. */}
        <ul className="flex h-[56px] items-center gap-[14px] overflow-x-auto whitespace-nowrap desk:h-[80px] desk:gap-[20px] desk:overflow-visible">
          {categorias.items.map((item, i) => (
            <li key={item} className="flex items-center gap-[14px] desk:gap-[20px]">
              {i > 0 && (
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-[14px] w-[18px] shrink-0 text-white/80"
                  fill="none"
                >
                  <path
                    d="M4 12h15m0 0-5-5m5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <span className="font-nav text-[16px] font-medium text-white desk:text-[26px]">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
