import {
  Header,
  Hero,
  Categorias,
  Destacada,
  Destacadas,
  Ultimas,
  Marca,
  Valores,
  Footer,
  noticias,
} from "../sections";

/**
 * Reparto de la portada según el XD "02-ANCASH DESPIERTA":
 * la más reciente va a "Noticia del día", las tres siguientes a DESTACADAS y
 * las tres que siguen a LO ÚLTIMO. Las secciones sin material no se pintan
 * (con la semilla sola, la portada queda con la nota del día y nada más).
 */
export function Home() {
  const [principal, ...resto] = noticias;

  return (
    <>
      <Header />
      <Hero />
      <Categorias />
      {principal && <Destacada noticia={principal} />}
      <Destacadas noticias={resto.slice(0, 3)} />
      <Ultimas noticias={resto.slice(3, 6)} />
      <Marca />
      <Valores />
      <Footer />
    </>
  );
}
