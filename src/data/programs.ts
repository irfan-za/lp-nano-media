import type { LucideIcon } from "lucide-react";
import { CalendarDays, Coffee, FileText } from "lucide-react";

export interface ProgramItem {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  badge?: string;
}

export const programs: ProgramItem[] = [
  {
    id: "events",
    title: "Events",
    icon: CalendarDays,
    description:
      "Quarterly workshops, industry mixers, and our annual Digital Growth Summit, bringing together 500+ brand leaders and marketers across Indonesia.",
    badge: "NEW!",
  },
  {
    id: "breakfast-club",
    title: "Breakfast Club",
    icon: Coffee,
    description:
      "An intimate monthly roundtable for CMOs and marketing directors. No pitches, no slides. Candid conversations over coffee about what's actually working in the market right now.",
  },
  {
    id: "bulletin-report",
    title: "Bulletin Report",
    icon: FileText,
    description:
      "A bi-weekly deep-dive into Indonesian digital marketing trends, platform algorithm changes, and campaign performance benchmarks, delivered straight to your inbox.",
  },
];
