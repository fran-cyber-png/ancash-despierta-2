import { marca } from "./content";

/** Banda roja de 600px: la firma del medio con la cordillera cortada en diagonal. */
export function Marca() {
  return (
    <section className="relative w-full overflow-hidden bg-rojo-banda">
      <div className="relative flex min-h-[320px] w-full flex-col justify-center desk:min-h-[600px]">
        {/* La foto entra por la derecha; el corte diagonal amarillo del XD se
            resuelve con clip-path para no depender de un PNG con la diagonal
            quemada (que se rompería a otros anchos). */}
        <div
          className="absolute inset-y-0 right-0 hidden w-[58%] desk:block"
          style={{ clipPath: "polygon(26% 0, 100% 0, 100% 100%, 0 100%)" }}
        >
          <img src={marca.imagen} alt={marca.alt} className="h-full w-full object-cover" />
        </div>
        <div
          className="absolute inset-y-0 right-0 hidden w-[58%] bg-amarillo desk:block"
          style={{ clipPath: "polygon(26% 0, 30% 0, 4% 100%, 0 100%)" }}
        />

        <div className="relative mx-auto w-full max-w-[1600px] px-[20px] py-[40px] desk:px-[40px] desk:py-0">
          <p className="font-titulo text-[46px] leading-[1] font-bold italic text-white desk:text-[123px]">
            {marca.linea1}
            <br />
            <span className="text-amarillo">{marca.linea2}</span>
          </p>
          <p className="mt-[16px] max-w-[420px] font-texto text-[16px] leading-[1.3] font-normal italic text-white uppercase desk:mt-[28px] desk:max-w-[760px] desk:text-[38px]">
            {marca.lema}
          </p>
        </div>
      </div>
    </section>
  );
}
