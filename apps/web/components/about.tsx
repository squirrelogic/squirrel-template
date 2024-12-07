"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInLeft, fadeInRight } from "../utils/animations";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      id="about"
      className="py-20 px-4 md:px-6 lg:px-8 bg-[#e0e0e0] text-gray-800"
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
    >
      <div className="container mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-8 text-gray-900"
          variants={fadeInLeft}
        >
          About SquirrelSoft
        </motion.h2>
        <div className="max-w-3xl mx-auto text-center">
          <motion.p className="mb-6 text-gray-700" variants={fadeInRight}>
            SquirrelSoft is a leading software development company specializing
            in creating innovative solutions for businesses of all sizes. With
            our expertise in SaaS applications, website development, CRM
            solutions, mobile applications, and game development, we help our
            clients transform their ideas into reality.
          </motion.p>
          <motion.p className="text-gray-700" variants={fadeInLeft}>
            Our team of skilled developers, designers, and project managers work
            collaboratively to deliver high-quality, scalable, and user-friendly
            software solutions. We pride ourselves on staying at the forefront
            of technology trends and best practices to ensure that our clients
            receive cutting-edge products that drive their business forward.
          </motion.p>
        </div>
      </div>
    </motion.section>
  );
}
