"use client";

import { Card, CardContent } from "@repo/ui/card";
import { Icons } from "@repo/ui/icons";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { MouseEvent } from "react";

const testimonials = [
  {
    quote: "This template has dramatically improved our development workflow.",
    author: "Sarah Johnson",
    title: "CTO, TechStart",
    avatar: "/avatars/avatar-1.png",
  },
  {
    quote: "The best monorepo setup I've ever used. Simply outstanding.",
    author: "Michael Chen",
    title: "Lead Developer, DevCorp",
    avatar: "/avatars/avatar-2.png",
  },
  {
    quote: "Game-changing features and incredible developer experience.",
    author: "Emily Rodriguez",
    title: "Frontend Architect, WebFlow",
    avatar: "/avatars/avatar-3.png",
  },
];

const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
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
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onMouseMove={handleMouseMove}
    >
      <Card className="relative overflow-hidden">
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

        <CardContent className="p-6 relative">
          <Icons.Quote className="h-8 w-8 text-primary/20 mb-4" />
          <p className="text-lg text-muted-foreground mb-4">
            {testimonial.quote}
          </p>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-muted mr-3 overflow-hidden">
              {/* You can add an Image component here if you have avatars */}
            </div>
            <div>
              <p className="font-semibold text-foreground">
                {testimonial.author}
              </p>
              <p className="text-sm text-muted-foreground">
                {testimonial.title}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          What People Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
