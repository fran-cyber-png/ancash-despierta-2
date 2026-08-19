import { useEffect, useState } from "react";
import { hero } from "./content";

/** Cuánto se queda cada foto en pantalla antes de cruzar a la siguiente. */
const INTERVALO_MS = 10_000;

export function Hero() {
  const [activa, setActiva] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiva((i) => (i + 1) % hero.imagenes.length);
    }, INTERVALO_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      {/* El Header flota fijo encima (no ocupa espacio propio) y la barra
          "Último momento" (Categorías) va justo debajo del Hero en el flujo
          normal: restándole su alto (56/80px) al 100vh, el banner + la barra
          llenan exactos la primera pantalla y la barra queda visible sin
          scroll. Las fotos van apiladas y sólo cambia su opacidad: así el
          crossfade es suave y no hay salto de layout entre una y otra.
          `object-cover` recorta la imagen para llenar el alto sin deformarla. */}
      <div className="relative h-[calc(100vh-56px)] min-h-[420px] w-full desk:h-[calc(100vh-80px)]">
        {hero.imagenes.map((imagen, i) => (
          <img
            key={imagen.src}
            src={imagen.src}
            alt={imagen.alt}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
              i === activa ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Degradado del frame: opaco a la izquierda, transparente al 71% del ancho.
          En mobile (430w del Figma) va más suave: la foto ocupa toda la franja
          angosta y con la fuerza del desktop se veía demasiado oscura. */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.3)_40%,rgba(0,0,0,0)_71%)] desk:bg-[linear-gradient(90deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.55)_40%,rgba(0,0,0,0)_71%)]" />

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
                className={`flex h-[48px] items-center justify-center px-[28px] font-titulo text-[15px] font-bold whitespace-nowrap text-white transition-colors duration-300 ease-in-out desk:h-[64px] desk:px-[40px] desk:text-[21px] ${
                  accion.tono === "rojo"
                    ? "bg-rojo hover:bg-rojo-banda"
                    : "border-2 border-white bg-transparent hover:bg-white/15"
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
