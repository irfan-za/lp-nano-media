"use client";

import { useState } from "react";
import { services } from "~/data/services";
import { AnimatedSection } from "~/components/shared/AnimatedSection";
import { SectionHeading } from "~/components/shared/SectionHeading";
import { Modal } from "~/components/shared/Modal";

export function Services() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = services.find((s) => s.id === selectedId);

  return (
    <AnimatedSection className="px-6 py-20 md:py-28 bg-surface" id="services">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          heading="We offer a wide range of services to grow your brand"
          description="Seven integrated capabilities, one unified strategy. Every service feeds into the next, creating compounding returns."
        />

        {/* 3-col grid: 2 rows of 3, last item spans 2 cols with brand accent */}
        <div className="grid gap-4 md:grid-cols-3">
          {services.slice(0, 6).map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                className="group rounded-2xl border border-gray-100 bg-white p-6 transition-shadow duration-300 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50">
                  <Icon className="h-5 w-5 text-brand-500" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 font-heading text-base font-bold text-gray-900">
                  {svc.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  {svc.shortDesc}
                </p>
                <button
                  onClick={() => setSelectedId(svc.id)}
                  className="mt-4 text-sm font-medium text-brand-500 hover:text-brand-600 transition-colors"
                >
                  See Detail Service
                </button>
              </div>
            );
          })}

          {/* Featured last card — Nano Academy */}
          {(() => {
            const academy = services[6];
            const AcademyIcon = academy.icon;
            return (
              <div className="group rounded-2xl border-2 border-brand-100 bg-gradient-to-br from-brand-50/50 to-white p-6 transition-shadow duration-300 hover:shadow-md md:col-span-2">
                <div className="flex items-start gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500">
                    <AcademyIcon className="h-5 w-5 text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-gray-900">
                      {academy.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 leading-relaxed max-w-2xl">
                      {academy.shortDesc}
                    </p>
                    <button
                      onClick={() => setSelectedId(academy.id)}
                      className="mt-4 text-sm font-medium text-brand-500 hover:text-brand-600 transition-colors"
                    >
                      See Detail Service
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Service detail modal */}
      <Modal open={!!selected} onClose={() => setSelectedId(null)}>
        {selected && (
          <div>
            {(() => {
              const Icon = selected.icon;
              return (
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
                  <Icon className="h-6 w-6 text-brand-500" strokeWidth={1.5} />
                </div>
              );
            })()}
            <h2 className="mt-5 font-heading text-xl font-bold text-gray-900">
              {selected.title}
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              {selected.longDesc}
            </p>
          </div>
        )}
      </Modal>
    </AnimatedSection>
  );
}
