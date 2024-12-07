"use client";

import Link from "next/link";
import { Icons } from "@repo/ui/icons";
import { Button } from "@repo/ui/button";
import { motion, animate } from "motion/react";

const Hero = () => {
  const scrollToFeatures = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("features");
    if (element) {
      const offset = element.offsetTop - 100; // Subtract header height + padding
      animate(window.scrollY, offset, {
        duration: 0.8,
        onUpdate: (value) => window.scrollTo(0, value),
        ease: [0.32, 0.72, 0, 1],
      });
    }
  };

  return (
    <section className="bg-background min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Build Faster with{" "}
            <span className="bg-gradient-to-r from-[#33F9FA] via-[#8F6DFE] to-[#FE87FF] text-transparent bg-clip-text">
              Squirrel
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            A powerful monorepo template for modern web development, combining
            Turborepo, Next.js, Supabase, and more.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button asChild size="lg">
              <a href="#features" onClick={scrollToFeatures}>
                Explore Features
                <Icons.ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link
                href="https://github.com/your-repo/squirrel"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
                <Icons.Github className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
