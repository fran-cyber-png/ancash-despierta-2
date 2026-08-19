import { IconoFlecha } from "./Iconos";

/** Título de sección del XD: rótulo, subrayado rojo de 66×8 y enlace a la derecha. */
export function TituloSeccion({
  titulo,
  enlace,
}: {
  titulo: string;
  enlace?: { texto: string; href: string };
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-[12px]">
      <div className="flex flex-col gap-[14px]">
        <h2 className="font-titulo text-[26px] font-bold text-tinta desk:text-[40px]">{titulo}</h2>
        <span className="block h-[6px] w-[48px] bg-rojo desk:h-[8px] desk:w-[66px]" />
      </div>

      {enlace && (
        <a
          href={enlace.href}
          className="group flex items-center gap-[8px] pt-[6px] font-texto text-[16px] font-bold text-rojo transition-colors duration-300 ease-in-out hover:text-rojo-banda desk:text-[22px]"
        >
          {enlace.texto}
          <IconoFlecha className="h-[18px] w-[18px] shrink-0 transition-transform duration-300 ease-in-out group-hover:translate-x-[3px]" />
        </a>
      )}
    </div>
  );
}
