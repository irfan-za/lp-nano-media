export interface IndustryCategory {
  category: string;
  clients: { name: string; gradient: string }[];
}

export const industries: IndustryCategory[] = [
  {
    category: "Fashion",
    clients: [
      { name: "Erigo", gradient: "from-amber-400 to-orange-500" },
      { name: "This Is April", gradient: "from-rose-400 to-pink-500" },
      { name: "Cotton Ink", gradient: "from-sky-400 to-cyan-500" },
      { name: "Berrybenka", gradient: "from-violet-400 to-purple-500" },
      { name: "Les Catino", gradient: "from-emerald-400 to-teal-500" },
      { name: "Kami Idea", gradient: "from-red-400 to-rose-500" },
      { name: "Call The Shopper", gradient: "from-blue-400 to-indigo-500" },
      { name: "Roughneck 1991", gradient: "from-yellow-400 to-amber-500" },
    ],
  },
  {
    category: "FnB",
    clients: [
      { name: "Kopi Kenangan", gradient: "from-brown-400 to-amber-600" },
      { name: "Haus Indonesia", gradient: "from-teal-400 to-green-500" },
      { name: "Mie Gacoan", gradient: "from-red-500 to-orange-500" },
      { name: "Fore Coffee", gradient: "from-emerald-400 to-teal-500" },
      { name: "Mixue Indonesia", gradient: "from-red-400 to-pink-400" },
      { name: "Bittersweet by Najla", gradient: "from-purple-400 to-pink-500" },
      { name: "Jambuluwuk", gradient: "from-amber-500 to-yellow-500" },
      { name: "Excelso", gradient: "from-stone-400 to-stone-600" },
    ],
  },
  {
    category: "Beauty",
    clients: [
      { name: "Somethinc", gradient: "from-fuchsia-400 to-purple-500" },
      { name: "Avoskin", gradient: "from-emerald-400 to-green-500" },
      { name: "Scarlett", gradient: "from-pink-400 to-rose-500" },
      { name: "MS Glow", gradient: "from-amber-400 to-yellow-500" },
      { name: "Implora", gradient: "from-sky-400 to-blue-500" },
      { name: "Azarine", gradient: "from-teal-400 to-cyan-500" },
      { name: "Wardah", gradient: "from-blue-400 to-indigo-500" },
      { name: "True to Skin", gradient: "from-violet-400 to-purple-500" },
    ],
  },
  {
    category: "Lifestyle",
    clients: [
      { name: "Sociolla", gradient: "from-pink-400 to-rose-500" },
      { name: "Tokopedia", gradient: "from-green-400 to-emerald-500" },
      { name: "Gojek", gradient: "from-green-500 to-teal-500" },
      { name: "Traveloka", gradient: "from-blue-400 to-sky-500" },
      { name: "Blibli", gradient: "from-indigo-400 to-blue-500" },
      { name: "JD.ID", gradient: "from-red-400 to-orange-500" },
      { name: "Zalora", gradient: "from-slate-400 to-slate-600" },
      { name: "Sayurbox", gradient: "from-lime-400 to-green-500" },
    ],
  },
  {
    category: "Startup & Other",
    clients: [
      { name: "Ruangguru", gradient: "from-blue-400 to-indigo-500" },
      { name: "Ajaib", gradient: "from-yellow-400 to-amber-500" },
      { name: "Xendit", gradient: "from-indigo-400 to-violet-500" },
      { name: "Efishery", gradient: "from-cyan-400 to-teal-500" },
      { name: "TaniHub", gradient: "from-emerald-400 to-green-500" },
      { name: "StickEarn", gradient: "from-orange-400 to-red-500" },
      { name: "Evermos", gradient: "from-teal-400 to-cyan-500" },
      { name: "Bobobox", gradient: "from-purple-400 to-indigo-500" },
    ],
  },
  {
    category: "FMCGs & Corporations",
    clients: [
      { name: "Unilever", gradient: "from-blue-500 to-blue-700" },
      { name: "Wings Group", gradient: "from-red-400 to-orange-500" },
      { name: "Indofood", gradient: "from-red-500 to-rose-600" },
      { name: "Mayora", gradient: "from-yellow-400 to-amber-500" },
      { name: "Paragon Corp", gradient: "from-purple-400 to-violet-500" },
      { name: "Sari Roti", gradient: "from-amber-400 to-orange-500" },
      { name: "Gudang Garam", gradient: "from-red-600 to-red-800" },
      { name: "Siantar Top", gradient: "from-green-400 to-emerald-500" },
    ],
  },
];
