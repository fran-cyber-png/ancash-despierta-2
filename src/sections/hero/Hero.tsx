import { hero } from "./content";

export function Hero() {
  return (
    <section className="w-full">
      {/* Mobile: alto fijo 240. Desktop: banner a pantalla completa 16:9
          (804px a 1366w y 1080px a 1920w, como los frames del Figma). */}
      <img
        src={hero.imagen}
        alt={hero.alt}
        className="h-[240px] w-full object-cover desk:aspect-video desk:h-auto"
      />
    </section>
  );
}
