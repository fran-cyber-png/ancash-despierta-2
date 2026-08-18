import { Header, Hero, Noticias, Footer, noticias } from "../sections";

export function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Noticias noticias={noticias} />
      <Footer />
    </>
  );
}
