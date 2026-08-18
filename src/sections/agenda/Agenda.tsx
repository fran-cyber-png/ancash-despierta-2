import { agenda } from "./content";

export function Agenda() {
  return (
    <section id="agenda" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">{agenda.titulo}</h2>
        <p className="mt-4 text-slate-600">{agenda.bajada}</p>
        <ul className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
          {agenda.eventos.map((e) => (
            <li key={e.fecha} className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-5">
              <time className="w-28 font-mono text-sm text-sky-600">{e.fecha}</time>
              <span className="font-semibold text-slate-900">{e.titulo}</span>
              <span className="text-sm text-slate-500">
                {e.hora} · {e.lugar}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
