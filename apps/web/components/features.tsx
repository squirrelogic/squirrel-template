"use client";

import Link from "next/link";
import { Icons } from "@repo/ui/icons";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { MouseEvent } from "react";

const features = [
  {
    icon: <Icons.Zap className="h-6 w-6" />,
    title: "Turborepo",
    description:
      "Efficient monorepo management for faster builds and easier code sharing.",
    url: "https://turbo.build/repo",
  },
  {
    icon: <Icons.Layout className="h-6 w-6" />,
    title: "Next.js",
    description:
      "React framework for building performant web applications with ease.",
    url: "https://nextjs.org/",
  },
  {
    icon: <Icons.Database className="h-6 w-6" />,
    title: "Supabase",
    description:
      "Open source Firebase alternative for robust backend functionality.",
    url: "https://supabase.com/",
  },
  {
    icon: <Icons.Package className="h-6 w-6" />,
    title: "shadcn/ui",
    description:
      "Beautiful and customizable UI components for rapid development.",
    url: "https://ui.shadcn.com/",
  },
  {
    icon: <Icons.Cog className="h-6 w-6" />,
    title: "Trigger.dev",
    description: "Powerful background job processing for your applications.",
    url: "https://trigger.dev/",
  },
  {
    icon: <Icons.Mail className="h-6 w-6" />,
    title: "React Email",
    description: "Effortless email template management for your projects.",
    url: "https://react.email/",
  },
];

const FeatureCard = ({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      key={index}
      className="group relative bg-background p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100"
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

      <div className="relative flex items-center mb-4">
        <div className="bg-primary/10 p-2 rounded-md mr-4">{feature.icon}</div>
        <h3 className="text-xl font-semibold text-foreground">
          {feature.title}
        </h3>
      </div>
      <p className="text-muted-foreground flex-grow relative">
        {feature.description}
      </p>
      <Link
        href={feature.url}
        className="mt-4 text-primary hover:underline inline-flex items-center relative"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn more
        <Icons.ChevronRight className="h-4 w-4 ml-1" />
      </Link>
    </motion.div>
  );
};

export default function Features() {
  return (
    <section id="features" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Powerful Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
