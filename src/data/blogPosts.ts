export interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  gradient: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "TikTok Shop vs. Live Shopping: Which Channel Actually Converts in 2026?",
    date: "May 28, 2026",
    category: "Social Commerce",
    summary:
      "We analyzed 200+ live shopping sessions across TikTok, Shopee, and Instagram to find where the real conversion is happening.",
    gradient: "from-violet-400 to-purple-500",
  },
  {
    id: "b2",
    title: "The Death of Third-Party Cookies: What It Means for Indonesian Advertisers",
    date: "May 15, 2026",
    category: "Digital Advertising",
    summary:
      "First-party data strategies that are already working for brands in Indonesia as cookie deprecation accelerates.",
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    id: "b3",
    title: "How We Scaled a Local Fashion Brand to 4M Followers (Without Burning Budget)",
    date: "April 30, 2026",
    category: "Case Study Deep Dive",
    summary:
      "The organic content playbook, influencer tiering strategy, and paid amplification model behind the numbers.",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    id: "b4",
    title: "Meta Ads in 2026: Advantage+ vs Manual Targeting. The Data Is In.",
    date: "April 12, 2026",
    category: "Performance Marketing",
    summary:
      "We ran a 60-day split test across 15 client accounts. The results challenge what most marketers assume about AI-driven targeting.",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    id: "b5",
    title: "Building Brand Communities That Actually Drive Revenue",
    date: "March 25, 2026",
    category: "Community",
    summary:
      "Most brand communities are cost centers disguised as engagement. Here's how to build one that contributes to the bottom line.",
    gradient: "from-rose-400 to-pink-500",
  },
  {
    id: "b6",
    title: "Indonesia Digital Marketing Salary Report 2026",
    date: "March 8, 2026",
    category: "Industry Report",
    summary:
      "Compensation data from 500+ marketers across Jakarta, Bandung, and Surabaya. Plus hiring trends every agency needs to know.",
    gradient: "from-cyan-400 to-sky-500",
  },
];
