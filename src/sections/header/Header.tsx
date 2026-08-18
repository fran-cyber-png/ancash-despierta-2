import { Link } from "react-router-dom";
import { header } from "./content";

export function Header() {
  return (
    <header className="sticky top-0 z-50 h-[105px] w-full bg-white shadow-[0px_5px_12.5px_rgba(0,0,0,0.1)] desk:h-[113px]">
      <div className="mx-auto flex h-full max-w-[430px] items-center justify-center gap-[5px] px-4 desk:max-w-[1302px] desk:justify-start desk:px-0 desk:pl-[40px]">
        <Link to="/" className="flex items-center gap-[5px]">
          <img
            src={header.logo}
            alt={header.logoAlt}
            className="h-[41px] w-[76px] shrink-0 object-contain desk:h-[96px] desk:w-[178px]"
          />
          <p className="font-display text-[26px] font-extrabold italic whitespace-nowrap text-brand-red desk:text-[73px]">
            {header.titulo}
          </p>
        </Link>
      </div>
    </header>
  );
}
