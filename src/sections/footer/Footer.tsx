import { IconoFacebook } from "../../components/Iconos";
import { footer } from "./content";

export function Footer() {
  const { marca, enlaces, contacto, legal } = footer;

  return (
    <footer id="unete" className="w-full scroll-mt-[72px] bg-negro text-white desk:scroll-mt-[100px]">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-[32px] px-[20px] py-[40px] desk:gap-[40px] desk:px-[40px] desk:py-[56px]">
        <div className="flex flex-col gap-[32px] desk:flex-row desk:items-start desk:justify-between desk:gap-[40px]">
          <div className="flex items-center gap-[16px] desk:gap-[20px]">
            <img
              src={marca.logo}
              alt={marca.alt}
              className="h-[96px] w-[96px] shrink-0 rounded-full object-contain desk:h-[148px] desk:w-[148px]"
            />
            <p className="font-ui text-[24px] leading-[1.1] desk:text-[37px]">
              {marca.linea1}
              <br />
              <span className="font-extrabold text-amarillo desk:text-[44px]">{marca.linea2}</span>
            </p>
          </div>

          <nav className="flex flex-col gap-[12px] desk:gap-[16px]">
            <p className="font-ui text-[16px] font-bold text-amarillo-titulo desk:text-[18px]">
              {enlaces.titulo}
            </p>
            <ul className="flex flex-col gap-[10px] desk:gap-[16px]">
              {enlaces.items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex items-center gap-[10px] transition-colors duration-300 ease-in-out hover:text-amarillo-titulo"
                  >
                    <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-white" />
                    <span className="font-ui text-[15px] desk:text-[16px]">{item.texto}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-[12px] desk:gap-[16px]">
            <p className="font-ui text-[16px] font-bold text-amarillo-titulo desk:text-[18px]">
              {contacto.titulo}
            </p>
            <a
              href={`mailto:${contacto.email}`}
              className="font-ui text-[15px] transition-colors duration-300 ease-in-out hover:text-amarillo-titulo desk:text-[16px]"
            >
              {contacto.email}
            </a>
            <a
              href={contacto.facebook.href}
              className="flex items-center gap-[10px] transition-colors duration-300 ease-in-out hover:text-amarillo-titulo"
            >
              <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-white text-negro">
                <IconoFacebook className="h-[16px] w-[16px]" />
              </span>
              <span className="font-ui text-[15px] desk:text-[20px]">{contacto.facebook.nombre}</span>
            </a>
          </div>
        </div>

        <div className="h-px w-full bg-white/20" />

        <div className="flex flex-col gap-[8px] font-ui text-[14px] desk:flex-row desk:justify-between desk:text-[16px]">
          <p>{legal.izquierda}</p>
          <p>{legal.derecha}</p>
        </div>
      </div>
    </footer>
  );
}
