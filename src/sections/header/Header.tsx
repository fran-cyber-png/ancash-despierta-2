import { Link } from "react-router-dom";
import { header } from "./content";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0px_5px_12.5px_rgba(0,0,0,0.1)]">
      <div className="mx-auto flex h-[72px] w-full max-w-[1600px] items-center justify-between px-[20px] desk:h-[100px] desk:px-[40px]">
        <Link to="/" className="flex shrink-0 items-center">
          <img
            src={header.logo}
            alt={header.logoAlt}
            className="h-[44px] w-auto object-contain desk:h-[95px]"
          />
        </Link>

        <nav className="flex items-center gap-[24px] desk:gap-[40px]">
          <ul className="hidden items-center gap-[24px] desk:flex desk:gap-[40px]">
            {header.menu.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-display text-[20px] text-[#2e3135] hover:text-rojo"
                >
                  {item.texto}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={header.cta.href}
            className="flex h-[40px] w-[130px] items-center justify-center rounded-[4px] bg-rojo font-display text-[16px] text-white desk:h-[47px] desk:w-[188px] desk:text-[20px]"
          >
            {header.cta.texto}
          </a>
        </nav>
      </div>
    </header>
  );
}
