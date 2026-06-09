"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { testimonials } from "~/data/testimonials";
import { AnimatedSection } from "~/components/shared/AnimatedSection";
import { PlaceholderImage } from "~/components/shared/PlaceholderImage";
import { SectionHeading } from "~/components/shared/SectionHeading";

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <AnimatedSection
      className="px-6 py-20 md:py-28 bg-surface-alt"
      id="testimonials"
    >
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading
          eyebrow="From Our Notable Clients"
          heading="800+ businesses have experienced the result"
          align="center"
        />

        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="min-w-0 shrink-0 grow-0 basis-full px-4"
              >
                <blockquote className="text-lg text-gray-700 leading-relaxed md:text-xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-8 flex items-center justify-center gap-4">
                  <PlaceholderImage
                    seed={t.avatar}
                    width={80}
                    height={80}
                    alt={t.name}
                    className="h-12 w-12 shrink-0 overflow-hidden rounded-full"
                  />
                  <div className="text-left">
                    <p className="font-heading text-sm font-bold text-gray-900">
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === selectedIndex
                  ? "w-8 bg-brand-500"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
