import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Works from "./components/Works";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <Navigation />
      <Hero />
      <Works />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
