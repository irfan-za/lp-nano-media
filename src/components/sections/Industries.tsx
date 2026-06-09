"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedSection } from "~/components/shared/AnimatedSection";
import { SectionHeading } from "~/components/shared/SectionHeading";
import { industries } from "~/data/industries";

export function Industries() {
  const [activeTab, setActiveTab] = useState(0);
  const category = industries[activeTab];

  return (
    <AnimatedSection className="px-6 py-20 md:py-28 bg-surface" id="industries">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Our Clients"
          heading="Over 800+ businesses growing with Nano Media"
          description="From fashion to FMCGs, startups to corporations — we drive measurable growth across every industry."
        />

        {/* Tab filter */}
        <div className="mb-10 flex flex-wrap gap-2">
          {industries.map((ind, i) => (
            <button
              key={ind.category}
              onClick={() => setActiveTab(i)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-[0.98] ${
                i === activeTab
                  ? "bg-brand-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {ind.category}
            </button>
          ))}
        </div>

        {/* Client grid with AnimatePresence */}
        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
            >
              {category.clients.map((client) => (
                <div
                  key={client.name}
                  className={`flex h-20 items-center justify-center rounded-2xl bg-gradient-to-br ${client.gradient} p-4`}
                >
                  <span className="text-center text-sm font-semibold text-white drop-shadow-sm">
                    {client.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </AnimatedSection>
  );
}
