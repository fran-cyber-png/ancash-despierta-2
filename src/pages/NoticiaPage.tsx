import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Header, Articulo, Footer, getNoticia } from "../sections";

export function NoticiaPage() {
  const { id } = useParams();
  const noticia = getNoticia(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!noticia) return <Navigate to="/" replace />;

  return (
    <>
      <Header />
      <Articulo noticia={noticia} />
      <Footer />
    </>
  );
}
