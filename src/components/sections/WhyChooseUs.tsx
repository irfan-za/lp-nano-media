"use client";

import { TrendingUp, Users, Lightbulb } from "lucide-react";
import { AnimatedSection } from "~/components/shared/AnimatedSection";
import { SectionHeading } from "~/components/shared/SectionHeading";

const values = [
  {
    icon: TrendingUp,
    title: "Meaningful Growth",
    description:
      "We don't chase vanity metrics. Every campaign is engineered for sustainable revenue impact that compounds over time, not just a spike on a dashboard.",
  },
  {
    icon: Users,
    title: "Collaborative Partnership",
    description:
      "Your brand isn't another ticket in our queue. We embed ourselves in your team, aligning incentives so your win is genuinely our win.",
  },
  {
    icon: Lightbulb,
    title: "Perceptive Exploration",
    description:
      "Growth lives in the gaps competitors overlook. We pressure-test assumptions, uncover hidden audiences, and find levers others miss entirely.",
  },
];

const ThirdIcon = values[2].icon;

export function WhyChooseUs() {
  return (
    <AnimatedSection className="px-6 py-20 md:py-28 bg-surface-alt" id="why-us">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          heading="It's not about how much budget you spent, but how you spend them"
          description="Three principles that separate campaigns that perform from campaigns that transform."
        />

        {/* Asymmetric 2 + 1 layout to avoid 3-equal-cards trap */}
        <div className="grid gap-6 md:grid-cols-2">
          {values.slice(0, 2).map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="group rounded-2xl border border-gray-100 bg-white p-8 transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
                  <Icon className="h-6 w-6 text-brand-500" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 font-heading text-xl font-bold text-gray-900">
                  {v.title}
                </h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Third card spans full width below */}
        <div className="mt-6">
          <div className="group rounded-2xl border border-gray-100 bg-white p-8 transition-shadow duration-300 hover:shadow-lg md:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
              <ThirdIcon className="h-6 w-6 text-brand-500" strokeWidth={1.5} />
            </div>
            <h3 className="mt-6 font-heading text-xl font-bold text-gray-900">
              {values[2].title}
            </h3>
            <p className="mt-3 max-w-2xl text-gray-600 leading-relaxed">
              {values[2].description}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-600 active:scale-[0.98]"
          >
            Grow with Us
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}
