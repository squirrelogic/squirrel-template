"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { motion } from "framer-motion";
import { fadeInUp, staggerChildren, scaleOnHover } from "../utils/animations";

const projects = [
  {
    title: "SquirreLogic Inventory",
    description:
      "AI-driven inventory management system for craft businesses to enterprise",
    image: "/social.png",
    tech: "React, Node.js, Supabase",
  },
  {
    title: "EcoTrack",
    description: "Mobile app for tracking personal carbon footprint",
    image: "/placeholder.svg?height=200&width=300",
    tech: "React Native, Firebase",
  },
  {
    title: "VirtualLearn LMS",
    description: "E-learning platform for remote education",
    image: "/placeholder.svg?height=200&width=300",
    tech: "Vue.js, Django, PostgreSQL",
  },
];

const MotionCard = motion(Card);

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="py-20 px-4 md:px-6 lg:px-8 bg-background"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Portfolio</h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {projects.map((project, index) => (
            <MotionCard
              key={index}
              className="overflow-hidden"
              variants={fadeInUp}
              whileHover="hover"
              initial="initial"
              animate="animate"
            >
              <motion.div variants={scaleOnHover}>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.tech}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{project.description}</p>
                </CardContent>
              </motion.div>
            </MotionCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
