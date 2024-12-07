"use client";

import Link from "next/link";
import { Button } from "@repo/ui/button";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { fadeInUp, staggerChildren } from "../utils/animations";

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

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
    <motion.section
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={staggerChildren}
      className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-background to-background/90"
    >
      <div className="container mx-auto text-center">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          variants={fadeInUp}
        >
          Innovative Software Solutions for Your Business
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8 text-muted-foreground"
          variants={fadeInUp}
        >
          SquirrelSoft specializes in SaaS, Web, CRM, Mobile, and Game
          Development
        </motion.p>
        <motion.div
          className="flex justify-center space-x-4"
          variants={fadeInUp}
        >
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="#services">Our Services</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Link href="#contact">Contact Us</Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
