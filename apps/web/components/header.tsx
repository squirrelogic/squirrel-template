"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@repo/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { motion } from "framer-motion";
import { fadeInUp, staggerChildren } from "../utils/animations";
import { useEffect } from "react";

export default function Header() {
  useEffect(() => {
    const handleScroll = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const targetId = target.getAttribute("href")?.substring(1);
      const targetElement = document.getElementById(targetId || "");
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", handleScroll);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleScroll);
      });
    };
  }, []);

  return (
    <header className="py-2 px-4 md:px-6 lg:px-8 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b border-border/40">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/Squirrel.svg"
            alt="SquirrelSoft Logo"
            width={40}
            height={40}
          />
          <span className="font-bold text-xl">SquirrelSoft</span>
        </Link>
        <motion.nav
          className="hidden md:flex space-x-4"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          <Link
            href="#services"
            className="text-foreground/60 hover:text-foreground"
            variants={fadeInUp}
          >
            Services
          </Link>
          <Link
            href="#about"
            className="text-foreground/60 hover:text-foreground"
            variants={fadeInUp}
          >
            About
          </Link>
          <Link
            href="#contact"
            className="text-foreground/60 hover:text-foreground"
            variants={fadeInUp}
          >
            Contact
          </Link>
        </motion.nav>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button asChild>
            <Link href="#contact">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
