import { hero } from "./content";

export function Hero() {
  return (
    <section className="w-full">
      <img
        src={hero.imagen}
        alt={hero.alt}
        className="h-[240px] w-full object-cover"
      />
    </section>
  );
}
