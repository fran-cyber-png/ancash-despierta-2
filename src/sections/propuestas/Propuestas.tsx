import { propuestas } from "./content";

export function Propuestas() {
  return (
    <section id="propuestas" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">{propuestas.titulo}</h2>
        <p className="mt-4 text-slate-600">{propuestas.bajada}</p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {propuestas.items.map((p) => (
            <article key={p.titulo} className="rounded-2xl bg-white p-6 shadow-sm">
              <span className="text-3xl">{p.icono}</span>
              <h3 className="mt-4 font-semibold text-slate-900">{p.titulo}</h3>
              <p className="mt-2 text-sm text-slate-600">{p.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
