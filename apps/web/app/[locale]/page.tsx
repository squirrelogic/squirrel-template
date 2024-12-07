import Hero from "@/components/hero";
import Portfolio from "@/components/portfolio";
import Testimonials from "@/components/testimonials";
import About from "@/components/about";
import Contact from "@/components/contact";
import Features from "@/components/features";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <Features />
        <Portfolio />
        <Testimonials />
        <About />
        <Contact />
      </main>
    </div>
  );
}
