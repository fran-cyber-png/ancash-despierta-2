import { IconoEquipo, IconoInformar, IconoMegafono } from "../../components/Iconos";
import { valores } from "./content";

const ICONOS = {
  conectar: IconoMegafono,
  informar: IconoInformar,
  despertar: IconoEquipo,
} as const;

export function Valores() {
  return (
    <section id="defendemos" className="w-full scroll-mt-[72px] bg-white desk:scroll-mt-[100px]">
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-[28px] px-[20px] py-[40px] desk:grid-cols-3 desk:gap-0 desk:px-[40px] desk:py-[64px]">
        {valores.map((valor, i) => {
          const Icono = ICONOS[valor.id];
          return (
            <div
              key={valor.id}
              // Las líneas divisorias del XD sólo van entre columnas.
              className={`flex items-center gap-[16px] ${
                i > 0 ? "desk:border-l desk:border-black/12 desk:pl-[32px]" : ""
              } ${i < 2 ? "desk:pr-[32px]" : ""}`}
            >
              <span className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full bg-amarillo text-black desk:h-[100px] desk:w-[100px]">
                <Icono className="h-[32px] w-[32px] desk:h-[52px] desk:w-[52px]" />
              </span>
              <div className="flex flex-col gap-[6px]">
                <h3 className="font-titulo text-[20px] font-bold text-tinta desk:text-[32px]">
                  {valor.titulo}
                </h3>
                <p className="font-texto text-[15px] leading-[1.35] text-cuerpo desk:text-[23px]">
                  {valor.texto}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
