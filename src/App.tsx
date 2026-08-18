import { Header, Hero, Noticias, Footer } from "./sections";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Noticias />
      <Footer />
    </div>
  );
}
