"use client";

import { motion } from "motion/react";

export default function About() {
  return (
    <section id="about" className="py-20 bg-secondary/30 dark:bg-secondary/15">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl font-bold mb-6 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            About Squirrel
          </motion.h2>
          <motion.p
            className="text-xl mb-8 text-foreground/80 dark:text-foreground/90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Squirrel is a cutting-edge monorepo template designed to streamline
            your development process. By combining the power of Turborepo,
            Next.js, Supabase, and other modern tools, we provide a robust
            foundation for building scalable web applications.
          </motion.p>
          <motion.p
            className="text-xl text-foreground/80 dark:text-foreground/90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Our mission is to empower developers and teams to focus on creating
            amazing products, rather than spending time on setup and
            configuration. With Squirrel, you can hit the ground running and
            bring your ideas to life faster than ever before.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
