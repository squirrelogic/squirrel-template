"use client";

import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import Image from "next/image";
import { animate } from "motion/react";

export default function Header() {
  const scrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = element.offsetTop - 100; // Subtract header height + some padding
      animate(window.scrollY, offset, {
        duration: 0.8,
        onUpdate: (value) => window.scrollTo(0, value),
        ease: [0.32, 0.72, 0, 1], // Custom easing
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border/40 transition-all">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-black/50 rounded-lg p-2">
            <Image src="/logo.png" alt="logo" width={40} height={40} />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-[#33F9FA] via-[#8F6DFE] to-[#FE87FF] text-transparent bg-clip-text">
            Squirrel
          </span>
        </Link>
        <nav className="flex items-center space-x-4">
          <ul className="hidden md:flex space-x-6">
            <li>
              <a
                href="#features"
                onClick={scrollToSection("features")}
                className="text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#portfolio"
                onClick={scrollToSection("portfolio")}
                className="text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
              >
                Portfolio
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                onClick={scrollToSection("testimonials")}
                className="text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
              >
                Testimonials
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={scrollToSection("about")}
                className="text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={scrollToSection("contact")}
                className="text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
              >
                Contact
              </a>
            </li>
          </ul>
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  );
}
