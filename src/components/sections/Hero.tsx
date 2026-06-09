import { motion } from "framer-motion";
import { site } from "~/data/site";
import { cn } from "~/utils/cn";

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-dvh flex items-center overflow-hidden bg-surface">
      {/* Background accent — subtle gradient wash, not slop blobs */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 80% 40%, rgba(92,124,250,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 w-full max-w-350 mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left: Text content — 7 columns */}
          <motion.div
            className="lg:col-span-7 pt-24 pb-16 lg:py-0"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            <motion.p
              variants={fadeUp}
              className="text-brand-600 font-semibold text-sm tracking-[0.2em] uppercase mb-6"
            >
              Digital Marketing Agency — Indonesia
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.08] tracking-tight max-w-[16ch]"
            >
              Expand your brand through measurable digital strategies.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-gray-500 text-base md:text-lg leading-relaxed max-w-[58ch]"
            >
              {site.description}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#contact"
                className={cn(
                  "inline-flex items-center gap-2 px-8 py-3.5 rounded-xl",
                  "bg-brand-500 text-white font-semibold text-base",
                  "hover:bg-brand-600 transition-colors duration-200",
                  "shadow-sm shadow-brand-500/20",
                  "active:scale-[0.98]",
                )}
              >
                Get to Know Us
                <span aria-hidden className="text-brand-200">
                  &rarr;
                </span>
              </a>
              <span className="text-sm text-gray-400">
                800+ brands growing with us
              </span>
            </motion.div>
          </motion.div>

          {/* Right: Visual — 5 columns */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
              {/* Placeholder image via picsum — replace with real Nano Media photo */}
              <img
                src="https://picsum.photos/seed/nano-media-agency/800/1000"
                alt="Nano Media office and team collaboration"
                className="w-full h-full object-cover"
                loading="eager"
              />
              {/* Subtle overlay to keep brand feel */}
              <div className="absolute inset-0 bg-linear-to-t from-surface/30 to-transparent pointer-events-none" />
            </div>

            {/* Floating stat card */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-surface rounded-xl px-5 py-4 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p className="font-heading text-2xl font-bold text-gray-900">
                800+
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Active Clients</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
