"use client";

import { AnimatedSection } from "~/components/shared/AnimatedSection";
import { SectionHeading } from "~/components/shared/SectionHeading";
import { Counter } from "~/components/shared/Counter";
import { stats } from "~/data/stats";

export function Stats() {
  return (
    <AnimatedSection className="px-6 py-20 md:py-28 bg-surface-alt" id="stats">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          heading="We establish an ecosystem that drives sustainable growth"
          description="Results that speak for themselves. Every number represents a partnership built on trust and measurable outcomes."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, i) =>
            stat.label === "+And Many More" ? (
              <div
                key={stat.label}
                className="flex flex-col items-start rounded-2xl border border-gray-100 bg-white p-8"
              >
                <span className="font-heading text-4xl font-bold text-brand-500 md:text-5xl">
                  +And Many More
                </span>
              </div>
            ) : (
              <div
                key={stat.label}
                className="flex flex-col items-start rounded-2xl border border-gray-100 bg-white p-8"
              >
                <Counter
                  to={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  className="font-heading text-4xl font-bold tracking-tight text-gray-900 md:text-5xl"
                />
                <span className="mt-2 text-sm font-medium text-gray-500">
                  {stat.label}
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}
