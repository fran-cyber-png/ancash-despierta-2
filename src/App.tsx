import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, NoticiaPage } from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* La URL pública lleva barra final (/noticia/<slug>/); react-router la ignora. */}
          <Route path="/noticia/:slug" element={<NoticiaPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
