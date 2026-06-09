export interface CaseStudyItem {
  id: string;
  category: string;
  title: string;
  description: string;
  gradient: string;
}

export const caseStudies: CaseStudyItem[] = [
  {
    id: "erigo",
    category: "Fashion",
    title: "Erigo: Scaling from local brand to NYFW runway",
    description:
      "How we grew Erigo's digital presence from 500K to 4M+ followers across platforms, drove 340% revenue growth, and supported their New York Fashion Week debut.",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    id: "kopi-kenangan",
    category: "FnB",
    title: "Kopi Kenangan: Building a digital-first F&B brand",
    description:
      "Full-funnel digital strategy that reduced CPA by 42% while scaling order volume 5x across 800+ outlets nationwide. From app installs to repeat purchase loops.",
    gradient: "from-brown-400 to-amber-600",
  },
  {
    id: "somethinc",
    category: "Beauty",
    title: "Somethinc: Dominating the skincare conversation",
    description:
      "Content and influencer strategy that positioned Somethinc as the most talked-about local beauty brand on TikTok, generating 1.2B+ organic views in 12 months.",
    gradient: "from-fuchsia-400 to-purple-500",
  },
  {
    id: "ruangguru",
    category: "Startup & Other",
    title: "Ruangguru: Performance marketing at national scale",
    description:
      "Managed $2M+ monthly ad spend across 6 platforms during back-to-school season, achieving 28% lower CPL than internal benchmarks while maintaining brand safety.",
    gradient: "from-blue-400 to-indigo-500",
  },
];
