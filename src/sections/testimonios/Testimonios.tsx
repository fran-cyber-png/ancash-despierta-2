import { testimonios } from "./content";

export function Testimonios() {
  return (
    <section id="testimonios" className="bg-slate-900 py-24 text-white">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl font-bold sm:text-4xl">{testimonios.titulo}</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {testimonios.items.map((t, i) => (
            <blockquote key={i} className="rounded-2xl bg-white/5 p-6">
              <p className="text-slate-200">“{t.texto}”</p>
              <footer className="mt-4 text-sm text-sky-400">{t.autor}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
