"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { caseStudies } from "~/data/caseStudies";
import { AnimatedSection } from "~/components/shared/AnimatedSection";
import { SectionHeading } from "~/components/shared/SectionHeading";

export function CaseStudies() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <AnimatedSection
      className="px-6 py-20 md:py-28 bg-surface"
      id="case-studies"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          heading="Explore more about our partner success stories"
          description="Real campaigns, real results. Every case study represents a partnership where strategy met execution."
        />

        <div className="relative">
          {/* Carousel */}
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-6">
              {caseStudies.map((cs) => (
                <div
                  key={cs.id}
                  className="min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-[45%] lg:basis-[30%]"
                >
                  <div className="group rounded-2xl border border-gray-100 bg-white transition-shadow duration-300 hover:shadow-md">
                    {/* Gradient header */}
                    <div
                      className={`h-40 rounded-t-2xl bg-gradient-to-br ${cs.gradient}`}
                    />
                    <div className="p-6">
                      <span className="text-xs font-medium text-brand-500">
                        {cs.category}
                      </span>
                      <h3 className="mt-2 font-heading text-base font-bold text-gray-900">
                        {cs.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-3">
                        {cs.description}
                      </p>
                      <span className="mt-4 inline-block text-sm font-medium text-brand-500">
                        Read The Story
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute -left-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-xl border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:text-gray-900 md:flex"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute -right-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-xl border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:text-gray-900 md:flex"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </AnimatedSection>
  );
}
