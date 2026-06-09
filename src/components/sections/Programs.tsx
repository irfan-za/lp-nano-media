"use client";

import { programs } from "~/data/programs";
import { AnimatedSection } from "~/components/shared/AnimatedSection";
import { SectionHeading } from "~/components/shared/SectionHeading";

export function Programs() {
  return (
    <AnimatedSection className="px-6 py-20 md:py-28 bg-surface" id="programs">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          heading="We offer more than meets the eye"
          description="Beyond client work, we invest in the ecosystem. Events, knowledge sharing, and community building for Indonesia's digital economy."
        />

        {/* Asymmetric layout: 1 large left + 2 stacked right */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Large featured card — Events */}
          {(() => {
            const featured = programs[0];
            const FeaturedIcon = featured.icon;
            return (
              <div className="group rounded-2xl border border-gray-100 bg-white p-8 transition-shadow duration-300 hover:shadow-md md:col-span-2 md:row-span-2">
                {featured.badge && (
                  <span className="inline-block rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white animate-pulse">
                    {featured.badge}
                  </span>
                )}
                <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
                  <FeaturedIcon
                    className="h-6 w-6 text-brand-500"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-gray-900">
                  {featured.title}
                </h3>
                <p className="mt-3 text-gray-600 leading-relaxed max-w-xl">
                  {featured.description}
                </p>
              </div>
            );
          })()}

          {/* Two smaller cards stacked */}
          {programs.slice(1).map((prog) => {
            const ProgIcon = prog.icon;
            return (
              <div
                key={prog.id}
                className="group rounded-2xl border border-gray-100 bg-white p-6 transition-shadow duration-300 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
                  <ProgIcon
                    className="h-5 w-5 text-brand-500"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="mt-4 font-heading text-base font-bold text-gray-900">
                  {prog.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  {prog.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
