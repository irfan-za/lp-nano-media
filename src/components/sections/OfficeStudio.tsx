"use client";

import { AnimatedSection } from "~/components/shared/AnimatedSection";
import { SectionHeading } from "~/components/shared/SectionHeading";
import { PlaceholderImage } from "~/components/shared/PlaceholderImage";

export function OfficeStudio() {
  return (
    <AnimatedSection className="px-6 py-20 md:py-28 bg-surface-alt" id="office">
      <div className="mx-auto max-w-7xl">
        {/* Part 1: Office space — image left, text right */}
        <div className="grid items-center gap-10 md:grid-cols-2">
          <PlaceholderImage
            seed="nano-media-office"
            width={800}
            height={600}
            alt="Nano Media office workspace"
            aspectRatio="aspect-4/3"
          />
          <div>
            <h3 className="font-heading text-2xl font-bold text-gray-900 md:text-3xl">
              Our Space
            </h3>
            <p className="mt-4 text-gray-600 leading-relaxed max-w-[55ch]">
              Where ideas take flight. Our Bandung HQ is designed for
              collaboration: open-plan workspaces, soundproofed meeting pods,
              and a content creation studio under one roof. Every corner is
              built to move fast and make things happen.
            </p>
            <p className="mt-3 text-sm text-gray-400">
              Bandung - Jakarta - Singapore
            </p>
          </div>
        </div>

        {/* Part 2: Studio — text left, image right */}
        <div className="mt-20 grid items-center gap-10 md:grid-cols-2">
          <div className="md:order-1 order-2">
            <h3 className="font-heading text-2xl font-bold text-gray-900 md:text-3xl">
              Our Live Studio
            </h3>
            <p className="mt-4 text-gray-600 leading-relaxed max-w-[55ch]">
              Lights, camera, conversion. Our in-house live studio is equipped
              for professional broadcasts, product showcases, and live shopping
              Multi-cam setup, pro lighting rig, and real-time switching.
              Everything needed to produce broadcast-grade live commerce.
            </p>
            <p className="mt-3 text-sm text-gray-400">
              Multi-cam - Pro lighting - Real-time switching
            </p>
          </div>
          <div className="md:order-2 order-1">
            <PlaceholderImage
              seed="nano-media-studio"
              width={800}
              height={600}
              alt="Nano Media live production studio"
              aspectRatio="aspect-4/3"
            />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
