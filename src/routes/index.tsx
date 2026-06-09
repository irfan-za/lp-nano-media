import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "~/components/layout/Navbar";
import { Hero } from "~/components/sections/Hero";
import { Industries } from "~/components/sections/Industries";
import { Stats } from "~/components/sections/Stats";
import { WhyChooseUs } from "~/components/sections/WhyChooseUs";
import { Services } from "~/components/sections/Services";
import { OfficeStudio } from "~/components/sections/OfficeStudio";
import { Programs } from "~/components/sections/Programs";
import { CaseStudies } from "~/components/sections/CaseStudies";
import { Testimonials } from "~/components/sections/Testimonials";
import { Clients } from "~/components/sections/Clients";
import { Blog } from "~/components/sections/Blog";
import { Footer } from "~/components/layout/Footer";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Industries />
        <Stats />
        <WhyChooseUs />
        <Services />
        <OfficeStudio />
        <Programs />
        <CaseStudies />
        <Testimonials />
        <Clients />
        <Blog />
      </main>
      <Footer />
    </>
  );
}
