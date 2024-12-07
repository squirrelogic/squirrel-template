"use client";

import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Textarea } from "@repo/ui/textarea";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerChildren } from "../utils/animations";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      await fetch("https://formsubmit.co/9bbc53ea3ba79f795809c7b45f128385", {
        method: "POST",
        body: formData,
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      id="contact"
      className="py-20 px-4 md:px-6 lg:px-8"
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={staggerChildren}
    >
      <div className="container mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-8"
          variants={fadeInUp}
        >
          Contact Us
        </motion.h2>
        <div className="max-w-md mx-auto">
          {submitted ? (
            <motion.div
              className="text-center p-4 rounded-lg bg-primary/10 text-primary"
              variants={fadeInUp}
            >
              <p>Thank you for your message! We'll get back to you soon.</p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4"
              variants={fadeInUp}
            >
              <input
                type="hidden"
                name="_subject"
                value="New contact form submission from SquirrelSoft"
              />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </motion.form>
          )}
        </div>
      </div>
    </motion.section>
  );
}
