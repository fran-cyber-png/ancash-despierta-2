import { equipo } from "./content";

export function Equipo() {
  return (
    <section id="equipo" className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">{equipo.titulo}</h2>
        <p className="mt-4 text-slate-600">{equipo.bajada}</p>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {equipo.miembros.map((m, i) => (
            <div key={i} className="text-center">
              <img src={m.foto} alt={m.nombre} className="mx-auto h-32 w-32 rounded-full bg-slate-200 object-cover" />
              <h3 className="mt-4 font-semibold text-slate-900">{m.nombre}</h3>
              <p className="text-sm text-slate-500">{m.cargo}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
