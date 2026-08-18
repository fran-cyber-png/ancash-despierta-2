import { header } from "./content";

export function Header() {
  return (
    <header className="sticky top-0 z-50 h-[105px] w-full bg-white shadow-[0px_5px_12.5px_rgba(0,0,0,0.1)]">
      <div className="mx-auto flex h-full max-w-[430px] items-center justify-center gap-[5px] px-4">
        <img
          src={header.logo}
          alt={header.logoAlt}
          className="h-[41px] w-[76px] shrink-0 object-contain"
        />
        <p className="font-display text-[26px] font-extrabold italic whitespace-nowrap text-brand-red">
          {header.titulo}
        </p>
      </div>
    </header>
  );
}
