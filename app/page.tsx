import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Greetings from "./components/Greetings";
import FeaturedWork from "./components/FeaturedWork";
import About from "./components/About";
import Services from "./components/Services";
import Process from "./components/Process";
import Tools from "./components/Tools";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import RevealObserver from "./components/RevealObserver";

export default function Home() {
  return (
    <main className="relative">
      {/* Grain Texture Global Overlay */}
      <div className="fixed inset-0 grain-overlay z-[100]" />
      <RevealObserver />
      <Navigation />
      <Hero />
      <Marquee />
      <Greetings />
      <FeaturedWork />
      <About />
      <Services />
      <Process />
      <Tools />
      <Contact />
      <Footer />
    </main>
  );
}
