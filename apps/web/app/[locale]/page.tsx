import Hero from "@/components/hero";
import Services from "@/components/services";
import Portfolio from "@/components/portfolio";
import Testimonials from "@/components/testimonials";
import About from "@/components/about";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Testimonials />
        <About />
        <Contact />
      </main>
    </div>
  );
}
