import { contacto } from "./content";

export function Contacto() {
  return (
    <section id="contacto" className="bg-white py-24">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">{contacto.titulo}</h2>
        <p className="mt-4 text-slate-600">{contacto.bajada}</p>
        <form className="mt-10 space-y-4" action={contacto.endpoint} method="post">
          {contacto.campos.map((c) => (
            <label key={c.name} className="block">
              <span className="text-sm font-medium text-slate-700">{c.label}</span>
              <input
                name={c.name}
                type={c.type}
                required
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-sky-500"
              />
            </label>
          ))}
          <button type="submit" className="w-full rounded-full bg-sky-500 px-6 py-3 font-semibold text-white hover:bg-sky-400">
            {contacto.boton}
          </button>
        </form>
        <div className="mt-8 flex justify-center gap-6 text-sm text-slate-500">
          {contacto.redes.map((r) => (
            <a key={r.nombre} href={r.href} className="hover:text-sky-600">
              {r.nombre}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
