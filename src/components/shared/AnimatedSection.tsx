"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type AnimatedSectionProps = {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  className?: string;
  id?: string;
  as?: "section" | "div";
};

const offsets = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
  none: {},
};

export function AnimatedSection({
  children,
  direction = "up",
  delay = 0,
  className,
  id,
  as = "section",
}: AnimatedSectionProps) {
  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      id={id}
      className={className}
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
    >
      {children}
    </Component>
  );
}
