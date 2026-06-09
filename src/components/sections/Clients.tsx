"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "~/components/shared/AnimatedSection";

const clientBrands = [
  "Erigo", "Kopi Kenangan", "Somethinc", "Ruangguru",
  "Tokopedia", "Gojek", "Wardah", "MS Glow",
  "Unilever", "Indofood", "Paragon Corp", "Mayora",
];

export function Clients() {
  return (
    <AnimatedSection className="py-16 md:py-20 bg-surface" id="clients">
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
        >
          {/* Double the list for seamless loop */}
          {[...clientBrands, ...clientBrands].map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="text-2xl font-heading font-bold text-gray-300 select-none md:text-3xl"
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
