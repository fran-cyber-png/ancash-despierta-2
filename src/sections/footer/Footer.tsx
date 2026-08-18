import { footer } from "./content";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 320 512" aria-hidden="true" className="h-[16px] w-[16px] fill-white">
      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
    </svg>
  );
}

export function Footer() {
  const { marca, enlaces, contacto, legal } = footer;

  return (
    <footer className="w-full bg-brand-red-dark px-[32px] pt-[48px] pb-[32px] text-white desk:px-[120px] desk:pt-[64px] desk:pb-[40px]">
      <div className="mx-auto flex max-w-[430px] flex-col gap-[36px] desk:max-w-[1180px] desk:gap-[32px]">
        <div className="flex flex-col gap-[36px] desk:flex-row desk:items-start desk:justify-between desk:gap-[24px]">
          <div className="flex w-full flex-col items-center gap-[18px] desk:w-auto desk:flex-row desk:items-center desk:gap-[24px]">
            <img
              src={marca.logo}
              alt={marca.alt}
              className="h-[147px] w-[147px] shrink-0 object-contain"
            />
            <p className="text-center font-ui text-[26px] leading-[32px] desk:text-left desk:text-[38px] desk:leading-[46px]">
              {marca.linea1}
              <br />
              <span className="font-bold">{marca.linea2}</span>
            </p>
          </div>

          <nav className="flex w-full flex-col items-start gap-[16px] desk:w-auto desk:gap-[18px]">
            <p className="font-ui text-[18px] font-bold desk:text-[20px]">{enlaces.titulo}</p>
            {enlaces.items.map((item) => (
              <a key={item.href} href={item.href} className="flex items-center gap-[10px]">
                <img src="/assets/bullet.svg" alt="" className="h-[6px] w-[6px] shrink-0" />
                <span className="font-ui text-[15px] text-white/85 desk:text-[16px]">
                  {item.texto}
                </span>
              </a>
            ))}
          </nav>

          <div className="flex w-full flex-col items-start gap-[16px] desk:w-auto desk:gap-[18px]">
            <p className="font-ui text-[18px] font-bold desk:text-[20px]">{contacto.titulo}</p>
            <a
              href={`mailto:${contacto.email}`}
              className="font-ui text-[15px] text-white/85 desk:text-[16px]"
            >
              {contacto.email}
            </a>
            <a href={contacto.facebook.href} className="flex items-center gap-[10px]">
              {/* El círculo cambia de rojo en el frame desktop */}
              <span className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[16px] bg-brand-red desk:bg-[#f21818]">
                <FacebookIcon />
              </span>
              <span className="font-ui text-[15px] text-white desk:text-[16px]">
                {contacto.facebook.nombre}
              </span>
            </a>
          </div>
        </div>

        <div className="h-px w-full bg-white/15" />

        <div className="flex w-full flex-col items-center gap-[8px] text-center font-ui text-[13px] text-white/55 desk:flex-row desk:justify-between desk:gap-0 desk:text-left desk:text-[14px]">
          {legal.map((linea) => (
            <p key={linea}>{linea}</p>
          ))}
        </div>
      </div>
    </footer>
  );
}
