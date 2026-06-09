export interface StatItem {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
}

export const stats: StatItem[] = [
  {
    value: 800,
    suffix: "+",
    label: "Clients",
  },
  {
    value: 140,
    suffix: "+",
    label: "Team Members",
  },
  {
    value: 50,
    suffix: "+",
    label: "Certified Specialists",
  },
  {
    value: 400,
    suffix: " Mio+",
    label: "Engagement Reach",
  },
  {
    prefix: "$",
    value: 15,
    suffix: " Mio+",
    label: "Ad Spend Managed",
  },
  {
    value: 0,
    suffix: "",
    label: "+And Many More",
  },
];
