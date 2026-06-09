import type { LucideIcon } from "lucide-react";
import {
  Target,
  Video,
  Code,
  Search,
  Zap,
  HeartHandshake,
  GraduationCap,
} from "lucide-react";

export interface ServiceItem {
  id: string;
  title: string;
  icon: LucideIcon;
  shortDesc: string;
  longDesc: string;
}

export const services: ServiceItem[] = [
  {
    id: "digital-advertising",
    title: "Digital Advertising",
    icon: Target,
    shortDesc:
      "Performance-driven ad campaigns across Meta, Google, TikTok, and programmatic networks.",
    longDesc:
      "We build and manage multi-platform advertising strategies that target the right audience at the right moment. From creative development to bid optimization and A/B testing, every campaign is engineered for measurable ROAS. We manage over $15 Mio+ in annual ad spend across Meta, Google Ads, TikTok, and programmatic display networks.",
  },
  {
    id: "creative-content",
    title: "Creative Content & Live Shopping",
    icon: Video,
    shortDesc:
      "Scroll-stopping content and live commerce experiences that convert viewers into buyers.",
    longDesc:
      "Our in-house creative team produces platform-native content optimized for each channel's algorithm. From short-form vertical video to live shopping broadcasts, we handle the full production pipeline: concepting, scripting, shooting, editing, and performance analysis. Live shopping sessions are integrated with real-time inventory and checkout.",
  },
  {
    id: "web-development",
    title: "Web Development & Maintenance",
    icon: Code,
    shortDesc:
      "Custom websites, landing pages, and e-commerce builds with ongoing support.",
    longDesc:
      "We design and develop high-performance websites using modern stacks optimized for speed, SEO, and conversion. Whether it's a brand site, a campaign landing page, or a full e-commerce rebuild, we handle architecture, development, QA, and long-term maintenance. All builds include analytics instrumentation and A/B testing infrastructure from day one.",
  },
  {
    id: "seo",
    title: "Search Engine Optimization",
    icon: Search,
    shortDesc:
      "Technical and content SEO strategies that build sustainable organic visibility.",
    longDesc:
      "SEO is a long game, and we play it with discipline. Our approach combines technical audits, keyword strategy, content optimization, and authority building. We track rankings, crawl health, and organic conversion rates monthly. Clients typically see measurable organic traffic growth within 3-6 months of consistent execution.",
  },
  {
    id: "growth-hack",
    title: "Professional Services (Growth Hack)",
    icon: Zap,
    shortDesc:
      "Unconventional growth experiments and rapid testing cycles to find breakout channels.",
    longDesc:
      "When standard channels plateau, we deploy a structured growth hacking process: hypothesis generation, rapid experimentation, data analysis, and scaling what works. This covers referral programs, viral loops, community-led growth, partnership activations, and emerging platform arbitrage. Every experiment is documented with clear success metrics.",
  },
  {
    id: "community-program",
    title: "Community Program Development",
    icon: HeartHandshake,
    shortDesc:
      "Build and nurture brand communities that drive loyalty and word-of-mouth growth.",
    longDesc:
      "Communities are the moat that paid media cannot replicate. We design and operationalize community programs from scratch: platform selection, content calendars, ambassador programs, offline events, and engagement frameworks. The goal is turning customers into advocates who bring others into the fold organically.",
  },
  {
    id: "nano-academy",
    title: "Digital Marketing Training by Nano Academy",
    icon: GraduationCap,
    shortDesc:
      "Workshops and training programs to upskill your internal marketing team.",
    longDesc:
      "Nano Academy delivers structured digital marketing training for corporate teams, SMEs, and individuals. Curriculum covers social media strategy, performance marketing, content creation, analytics, and AI tools for marketing. Available in workshop, bootcamp, and ongoing mentorship formats, online and in-person across Indonesia.",
  },
];
