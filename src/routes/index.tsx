import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "~/components/sections/Hero";
import { Industries } from "~/components/sections/Industries";
import { Stats } from "~/components/sections/Stats";
import { WhyChooseUs } from "~/components/sections/WhyChooseUs";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <main>
      <Hero />
      <Industries />
      <Stats />
      <WhyChooseUs />
    </main>
  );
}
