"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { MouseEvent } from "react";

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onMouseMove={handleMouseMove}
      className="group relative"
    >
      <Card className="overflow-hidden relative">
        {/* Spotlight overlay */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 z-10"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                250px circle at ${mouseX}px ${mouseY}px,
                rgba(14, 165, 233, 0.15),
                transparent 80%
              )
            `,
          }}
        />

        <Image
          src={project.image}
          alt={project.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover relative"
        />
        <CardHeader className="relative">
          <CardTitle>{project.title}</CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Portfolio() {
  const projects = [
    {
      title: "Project 1",
      image: "/placeholder.svg",
      description: "A brief description of Project 1",
    },
    {
      title: "Project 2",
      image: "/placeholder.svg",
      description: "A brief description of Project 2",
    },
    {
      title: "Project 3",
      image: "/placeholder.svg",
      description: "A brief description of Project 3",
    },
    {
      title: "Project 4",
      image: "/placeholder.svg",
      description: "A brief description of Project 4",
    },
  ];

  return (
    <section
      id="portfolio"
      className="py-20 bg-secondary/10 dark:bg-secondary/5"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Our Portfolio
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
