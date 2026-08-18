import { hero } from "./content";

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center bg-slate-900 text-white">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">{hero.eyebrow}</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-7xl">{hero.titulo}</h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-300">{hero.subtitulo}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href={hero.cta.href} className="rounded-full bg-sky-500 px-6 py-3 font-semibold hover:bg-sky-400">
            {hero.cta.texto}
          </a>
          <a href={hero.ctaSecundario.href} className="rounded-full border border-white/30 px-6 py-3 font-semibold hover:bg-white/10">
            {hero.ctaSecundario.texto}
          </a>
        </div>
      </div>
    </section>
  );
}
