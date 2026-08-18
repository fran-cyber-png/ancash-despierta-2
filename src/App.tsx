import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, NoticiaPage } from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/noticia/:id" element={<NoticiaPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
