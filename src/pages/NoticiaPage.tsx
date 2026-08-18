import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Header, Articulo, Footer, getNoticia } from "../sections";

export function NoticiaPage() {
  const { slug } = useParams();
  const noticia = getNoticia(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <>
      <Header />
      {noticia ? (
        <Articulo noticia={noticia} />
      ) : (
        // Antes acá había un <Navigate to="/" replace />: con datos asíncronos eso
        // mandaba al home en el primer render y la nota nunca llegaba a verse.
        <section className="w-full bg-paper px-[20px] pt-[80px] pb-[120px] desk:bg-white desk:pt-[120px] desk:pb-[200px]">
          <div className="mx-auto flex max-w-[390px] flex-col gap-[20px] desk:max-w-[780px]">
            <h1 className="font-ui text-[32px] leading-[38px] font-bold uppercase text-black desk:font-display desk:text-[40px] desk:leading-[48px]">
              Noticia no encontrada
            </h1>
            <p className="font-display text-[16px] leading-[24px] text-black/75">
              La nota que buscas no existe o fue retirada de portada.
            </p>
            <Link
              to="/"
              className="font-ui text-[16px] leading-[24px] font-bold text-brand-red underline"
            >
              Volver al inicio
            </Link>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}
