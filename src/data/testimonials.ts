export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
}

export const testimonials: TestimonialItem[] = [
  {
    id: "t1",
    name: "Rizky Pratama",
    role: "CMO",
    company: "Erigo",
    avatar: "nano-testimonial-1",
    quote:
      "Nano Media bukan sekadar agency. Mereka benar-benar menyelami brand kami, memahami audiens, dan mengeksekusi strategi yang hasilnya terukur. Revenue kami naik 340% dalam 18 bulan pertama kerja sama.",
  },
  {
    id: "t2",
    name: "Dewi Lestari",
    role: "Head of Digital",
    company: "Kopi Kenangan",
    avatar: "nano-testimonial-2",
    quote:
      "Yang membedakan Nano Media adalah transparansi data. Setiap rupiah ad spend bisa kami lacak dampaknya. CPA turun 42% tanpa mengorbankan volume. It's rare to find an agency that treats your budget like their own.",
  },
  {
    id: "t3",
    name: "Andre Sumual",
    role: "VP Growth",
    company: "Ruangguru",
    avatar: "nano-testimonial-3",
    quote:
      "Kami meng-handle 6 platform ads bersamaan dengan budget besar. Nano Media tidak hanya menjaga performa tetap stabil, tapi berhasil menurunkan CPL 28% di bawah benchmark internal. They deliver under pressure.",
  },
];
