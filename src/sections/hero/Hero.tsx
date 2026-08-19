import { hero } from "./content";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* 750px de alto en el XD (1920w). En mobile baja a 480 para que el
          titular de 3 líneas siga entrando sin comerse la foto. */}
      <img
        src={hero.imagen}
        alt={hero.alt}
        className="h-[480px] w-full object-cover desk:h-[750px]"
      />

      {/* Degradado del frame: opaco a la izquierda, transparente al 71% del ancho. */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.55)_40%,rgba(0,0,0,0)_71%)]" />

      <div className="absolute inset-0">
        <div className="mx-auto flex h-full w-full max-w-[1600px] flex-col justify-center gap-[20px] px-[20px] desk:gap-[28px] desk:px-[40px]">
          <h1 className="max-w-[560px] font-titulo text-[34px] leading-[1.12] font-bold uppercase text-white desk:max-w-[920px] desk:text-[76px]">
            {hero.titulo}
          </h1>

          <p className="max-w-[420px] font-texto text-[15px] leading-[1.5] text-white desk:max-w-[760px] desk:text-[20px]">
            {hero.bajada}
          </p>

          <div className="flex flex-wrap items-center gap-[14px] desk:gap-[28px]">
            {hero.acciones.map((accion) => (
              <a
                key={accion.href}
                href={accion.href}
                className={`flex h-[48px] items-center justify-center px-[24px] font-titulo text-[15px] font-bold whitespace-nowrap text-white desk:h-[64px] desk:px-0 desk:text-[21px] ${accion.ancho} ${
                  accion.tono === "rojo" ? "bg-rojo" : "border-2 border-white bg-transparent"
                }`}
              >
                {accion.texto}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
