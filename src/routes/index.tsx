import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "~/components/sections/Hero";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <main>
      <Hero />
    </main>
  );
}
