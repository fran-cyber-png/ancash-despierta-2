/**
 * Iconos del XD "02-ANCASH DESPIERTA", en línea.
 * Van como SVG y no como archivos en /assets porque cambian de color según el
 * fondo (la meta de las tarjetas es blanca sobre la foto y gris sobre el panel):
 * con `fill-current` heredan el color del contenedor.
 */

type Props = { className?: string };

export function IconoCalendario({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconoFlecha({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M4 12h15m0 0-6-6m6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconoMegafono({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      {/* El trazo real queda descentrado dentro del viewBox (bbox x:3–18.85,
          centro en 10.93 en vez de 12): se corrige con un translate en vez de
          tocar las coordenadas de cada trazo. */}
      <g transform="translate(1.07 0)">
        <path
          d="M3 10v4a1 1 0 0 0 1 1h3l7 4V5L7 9H4a1 1 0 0 0-1 1Z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        <path
          d="M17.5 9a4 4 0 0 1 0 6M7 15v4h3v-3"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function IconoInformar({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      {/* Bbox real x:4–19/y:4–21, centro en (11.5, 12.5) en vez de (12, 12). */}
      <g transform="translate(0.5 -0.5)">
        <path
          d="M5 4h9l5 5v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        <path
          d="M14 4v5h5M8 13h8M8 17h5"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function IconoEquipo({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.35" />
      <circle cx="17" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.35" />
      <path
        d="M3 19c0-3 2.7-4.8 6-4.8s6 1.8 6 4.8M16.2 14.6c2.7.3 4.8 1.9 4.8 4.4"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Cuadro con renglones: acompaña la firma de la redacción. */
export function IconoFirma({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path
        d="M7 9h10M7 13h10M7 17h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Flecha curva de "Volver". */
export function IconoVolver({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M9 5 4 10l5 5M4 10h9a6 6 0 0 1 0 12h-1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconoFacebook({ className }: Props) {
  return (
    <svg viewBox="0 0 320 512" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
      />
    </svg>
  );
}

export function IconoInstagram({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function IconoWhatsapp({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 3a9 9 0 0 0-7.75 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M8.7 8.4c.2-.5.4-.5.6-.5h.5c.15 0 .35 0 .5.4.2.5.6 1.5.7 1.6.1.15.15.3.03.5-.5.8-1 .75-.6 1.4.9 1.4 1.6 1.8 2.9 2.4.2.1.35.1.5-.05.15-.15.6-.7.8-.95.2-.25.35-.2.6-.1.25.1 1.6.75 1.9.9.25.1.4.15.45.25.05.15.05.85-.25 1.35-.3.5-1.4 1-1.9 1.05-.5.05-1.05.1-3.4-.9-2.85-1.2-4.6-4.05-4.75-4.25-.15-.2-1.1-1.45-1.1-2.8s.7-2 1-2.3Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Clip para "copiar enlace": no hay intent de compartir por URL para Instagram. */
export function IconoClip({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M8 12.5 15 5.5a3 3 0 0 1 4.24 4.24l-8.2 8.2a5 5 0 0 1-7.07-7.07l7.5-7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
