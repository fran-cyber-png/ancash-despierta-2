import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, type MouseEvent } from "react";
import { header } from "./content";

/**
 * El salto nativo del navegador a `#id` no es confiable acá (a veces no
 * mueve el scroll), así que el header lo hace a mano: scrollIntoView respeta
 * el scroll-margin-top de cada sección, que es lo que evita que el header
 * fijo la tape.
 */
function irASeccion(e: MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith("#")) return;
  const destino = document.querySelector(href);
  if (!destino) return;
  e.preventDefault();
  destino.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", href);
}

/** Logo: si ya estamos en el home, no navega, solo sube al tope con la misma
 *  animación suave de los anclajes del menú (en vez del salto seco de scrollTo). */
function irAlTope(e: MouseEvent<HTMLAnchorElement>, enHome: boolean) {
  if (!enHome) return;
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
  history.replaceState(null, "", "/");
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const enHome = useLocation().pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // El fondo negro/25 + texto blanco solo tiene sentido flotando sobre el
  // Hero del home. En páginas internas (nota, etc.) no hay foto oscura debajo,
  // así que el header va siempre con el estilo "scrolleado": fondo blanco y
  // texto oscuro, sin esperar a que el usuario baje.
  const claro = scrolled || !enHome;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-colors duration-300 ${
        claro ? "bg-white shadow-[0px_5px_12.5px_rgba(0,0,0,0.1)]" : "bg-black/25"
      }`}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1600px] items-center justify-between px-[20px] desk:h-[100px] desk:px-[40px]">
        <Link
          to="/"
          onClick={(e) => irAlTope(e, enHome)}
          className="flex shrink-0 items-center transition-opacity duration-300 ease-in-out hover:opacity-80"
        >
          <img
            src={header.logo}
            alt={header.logoAlt}
            className="h-[44px] w-auto object-contain desk:h-[95px]"
          />
        </Link>

        <nav className="flex items-center gap-[24px] desk:gap-[40px]">
          <ul className="hidden items-center gap-[24px] desk:flex desk:gap-[40px]">
            {header.menu.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => irASeccion(e, item.href)}
                  className={`font-display text-[20px] transition-colors duration-300 ease-in-out ${
                    claro ? "text-[#2e3135] hover:text-rojo" : "text-white hover:text-white/70"
                  }`}
                >
                  {item.texto}
                </a>
              </li>
            ))}
          </ul>

          {/* border-2 se mantiene siempre (solo cambia de color) para que el
              cruce con bg-rojo anime parejo con el resto del header, sin el
              salto que daba perder el borde de golpe al dejar de estar scrolleado. */}
          <a
            href={header.cta.href}
            onClick={(e) => irASeccion(e, header.cta.href)}
            className={`flex h-[40px] w-[130px] items-center justify-center rounded-[4px] border-2 font-display text-[16px] transition-colors duration-300 ease-in-out desk:h-[47px] desk:w-[188px] desk:text-[20px] ${
              claro
                ? "border-rojo bg-rojo text-white hover:border-rojo-banda hover:bg-rojo-banda"
                : "border-white bg-transparent text-white hover:bg-white/15"
            }`}
          >
            {header.cta.texto}
          </a>
        </nav>
      </div>
    </header>
  );
}
