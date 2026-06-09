# Nano Media — Animated Landing Page

An animation-rich single-page landing page for **Nano Media**, an Indonesian creative/digital marketing agency. Built on TanStack Start (React 19, Vite 8, Tailwind CSS v4, Nitro SSR).

## Tech Stack

| Layer           | Technology                               |
| --------------- | ---------------------------------------- |
| Framework       | TanStack Start (React 19, SSR via Nitro) |
| Routing         | TanStack Router                          |
| Styling         | Tailwind CSS v4                          |
| Animations      | Framer Motion                            |
| Carousels       | Embla Carousel                           |
| Icons           | Lucide React                             |
| Fonts           | Google Fonts (Poppins + Inter)           |
| Validation      | Zod                                      |
| Package Manager | pnpm                                     |

## Project Structure

```
src/
├── components/
│   ├── shared/          # Reusable primitives (AnimatedSection, SectionHeading, etc.)
│   └── sections/        # Landing page sections (Hero, Industries, Stats, etc.)
├── data/                # Content data files (site.ts, services.ts, etc.)
├── routes/
│   ├── __root.tsx       # Root layout, SEO meta, fonts
│   └── index.tsx        # Single-page landing composition
├── styles/
│   └── app.css          # Tailwind v4 theme config, brand palette
└── utils/
    └── cn.ts            # tailwind-merge + clsx helper
```

## Getting Started

```sh
pnpm install
pnpm dev
```

## Build

```sh
pnpm build
```

## Sections

1. **Hero** — Agency value prop, CTA, asymmetric layout
2. **Industries** — Client categories with tab filter
3. **Stats** — Animated counters (clients, team, ad spend)
4. **Why Choose Us** — Value proposition cards
5. **Services** — Service cards with modal detail
6. **Office Studio** — Company space showcase
7. **Programs** — Events, Breakfast Club, Bulletin Report
8. **Case Studies** — Embla carousel
9. **Testimonials** — Client quotes carousel
10. **Clients** — Logo marquee
11. **Blog** — Article grid
12. **Contact** — Zod-validated form

## Reference

Design and structure inspired by [bolehdicoba.com](https://bolehdicoba.com/). Full PRD at `docs/prd.md`.
