import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Header, Articulo, Marca, Valores, Footer, getNoticia, noticias } from "../sections";

export function NoticiaPage() {
  const { slug } = useParams();
  const noticia = getNoticia(slug);
  const otras = noticias.filter((n) => n.slug !== slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <>
      <Header />
      {noticia ? (
        <Articulo noticia={noticia} otras={otras} />
      ) : (
        // Antes acá había un <Navigate to="/" replace />: con datos asíncronos eso
        // mandaba al home en el primer render y la nota nunca llegaba a verse.
        <section className="w-full bg-panel px-[20px] pt-[80px] pb-[120px] desk:pt-[120px] desk:pb-[200px]">
          <div className="mx-auto flex max-w-[780px] flex-col gap-[20px]">
            <h1 className="font-titulo text-[32px] leading-[1.2] font-bold text-tinta desk:text-[40px]">
              Noticia no encontrada
            </h1>
            <p className="font-texto text-[16px] leading-[24px] text-meta">
              La nota que buscas no existe o fue retirada de portada.
            </p>
            <Link to="/" className="font-texto text-[16px] font-bold text-rojo underline">
              Volver al inicio
            </Link>
          </div>
        </section>
      )}
      <Marca />
      <Valores />
      <Footer />
    </>
  );
}
