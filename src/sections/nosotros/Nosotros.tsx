import { nosotros } from "./content";

export function Nosotros() {
  return (
    <section id="nosotros" className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">{nosotros.titulo}</h2>
        <p className="mt-4 max-w-2xl text-slate-600">{nosotros.descripcion}</p>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {nosotros.valores.map((v) => (
            <div key={v.titulo} className="rounded-2xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900">{v.titulo}</h3>
              <p className="mt-2 text-sm text-slate-600">{v.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
