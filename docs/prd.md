# PRD: Nano Media — Animated Landing Page

> **Status:** Ready for Implementation  
> **Created:** 2026-06-09  
> **Reference:** [bolehdicoba.com](https://bolehdicoba.com/) (Boleh Dicoba Digital)

---

## Overview

A single-page, animation-rich landing page for **Nano Media**, an Indonesian creative/digital marketing agency. Clone of BDD's structure, sections, and animation style — rebranded with Nano Media identity. Built on TanStack Start (React 19, Vite 8, Tailwind CSS v4, Nitro SSR).

**Target:** Lighthouse ≥ 90 on mobile, premium agency feel, smooth scroll animations throughout.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | TanStack Start (React 19, SSR via Nitro) |
| Routing | TanStack Router (file-based, single-page) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Carousels | Embla Carousel |
| Icons | Lucide React |
| Fonts | Google Fonts: Poppins (headings) + Inter (body) |
| Form validation | Zod (already in project) |
| Class merging | tailwind-merge (already in project) |
| Content | Local TypeScript data files in `src/data/` |

### New Dependencies

```json
"framer-motion": "^11.x",
"lucide-react": "^0.400.x",
"embla-carousel-react": "^8.x"
```

---

## Architecture

### Page Structure: Single-Page Landing

All sections live on `src/routes/index.tsx` as composed components. Navbar links scroll to named anchors (`#services`, `#case-studies`, etc.).

```
src/
├── data/                    # Content data files
│   ├── services.ts
│   ├── caseStudies.ts
│   ├── testimonials.ts
│   ├── industries.ts
│   ├── programs.ts
│   ├── blogPosts.ts
│   ├── stats.ts
│   └── site.ts              # Brand name, taglines, social links
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx        # Transparent → solid on scroll
│   │   ├── Footer.tsx
│   │   └── FloatingCTA.tsx   # "Free Consultation" button
│   ├── shared/
│   │   ├── AnimatedSection.tsx  # Reusable scroll-reveal wrapper
│   │   ├── SectionHeading.tsx   # Consistent section heading style
│   │   ├── Counter.tsx          # Animated number counter
│   │   └── Modal.tsx            # Generic modal (service detail, etc.)
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Industries.tsx
│   │   ├── Stats.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── Services.tsx
│   │   ├── OfficeStudio.tsx
│   │   ├── Programs.tsx
│   │   ├── CaseStudies.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Blog.tsx
│   │   ├── Contact.tsx
│   │   └── Clients.tsx
│   └── ui/                   # Atomic UI primitives (Button, Card, etc.)
├── routes/
│   ├── __root.tsx            # Root layout with fonts, meta, shell
│   └── index.tsx             # Single-page landing (composes all sections)
├── styles/
│   └── app.css               # Tailwind v4 config + custom theme tokens
└── utils/
    └── cn.ts                 # tailwind-merge + clsx helper
```

### `__root.tsx` Changes

- Strip existing demo nav links, replace with minimal shell
- Add Google Fonts `@import` for Poppins + Inter
- Add SEO meta for Nano Media
- Remove `TanStackRouterDevtools` from production

### `routes/index.tsx` — Composition Pattern

```tsx
export default function Landing() {
  return (
    <main>
      <Navbar />
      <FloatingCTA />
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
      <Contact />
      <Footer />
    </main>
  )
}
```

---

## Component Specs

### `AnimatedSection` (Shared)

Reusable wrapper that handles scroll-triggered reveal via Framer Motion `whileInView`.

```tsx
type AnimatedSectionProps = {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  delay?: number
  className?: string
  id?: string  // For anchor scrolling
}
```

- Uses `motion.div` with `whileInView={{ opacity: 1, x: 0, y: 0 }}`
- Initial state: `opacity: 0` + translated 40px in direction
- Transition: spring, duration 0.6s
- Plays once (`once: true`), respects `prefers-reduced-motion`

### `Counter` (Shared)

Animated number counter that counts up when scrolled into view.

- Uses `useMotionValue` + `useTransform` + spring physics
- Accepts `from`, `to`, `suffix` (e.g., "+", "Mio+", "%"), `prefix`
- Formats numbers with thousand separators during animation
- Triggers on `whileInView`

### `Navbar` (Layout)

- **Default state (hero visible):** Transparent background, light text/logo
- **Scrolled state:** White/light background with `backdrop-blur`, dark text, subtle shadow
- Transition triggered by `useScroll` from Framer Motion
- Mobile: Hamburger icon opens full-screen slide-in drawer (`motion.div` with AnimatePresence)
- Links scroll to anchors smoothly via `scrollIntoView({ behavior: 'smooth' })`

### `FloatingCTA` (Layout)

- Fixed position button: "Free Consultation!" or "Mulai Konsultasi"
- Visible on all sections below hero
- Slightly bobbing/pulse animation (subtle `motion.div` scale loop)
- Scrolls to contact form on click
- On mobile: bottom-sticky bar

### `Modal` (Shared)

- Framer Motion `AnimatePresence` + `motion.div` for enter/exit
- Backdrop blur overlay
- Close on Escape, overlay click
- Content slot for service details, case study detail, etc.
- Portal to `document.body`

---

## Section Breakdown

### 1. Hero
- **Content:** "GROW WITH US" badge → large heading "Expand your brand through measurable Digital Strategies" → subtext paragraph → "Get to Know Us!" CTA button
- **Animations:** Staggered fade-up for each element (badge, heading, paragraph, button). Subtle background gradient or abstract shape animation.
- **Visual:** Light premium background with geometric SVG accents, bold Poppins headings.

### 2. Industries (Client Categories)
- **Content:** "Over 800+ Business growing with Nano Media" → filter tabs: Fashion, FnB, Beauty, Lifestyle, Startup & Other, FMCGs & Corporations
- **Animations:** Tab switch with `AnimatePresence` layout animation. Client logos grid fades between categories.
- **Data source:** `industries.ts` — array of `{ category, clients: { name, gradient }[] }`

### 3. Stats / Numbers
- **Content:** Heading "WE ON NUMBERS" / "We Establish an Ecosystem..." → 6 stat cards with `Counter` component: 800+ Clients, 140+ Team, 50+ Certified, 400 Mio+ Engagement, $15 Mio+ Ad Spend, "+And Many More"
- **Animations:** Each counter animates independently on scroll into view. Cards stagger in with slight delay per card.
- **Data source:** `stats.ts`

### 4. Why Choose Us
- **Content:** "It's not about how much budget you spent, but how you spend them" → 3 value cards: Meaningful Growth, Collaborative Partnership, Perceptive Exploration
- **Animations:** Cards fade up with staggered delay. Lucide icons scale in. CTA below: "Grow with Us"
- **Visual:** Alternating background (darker section break)

### 5. Services
- **Content:** "We Offer a Wide Services..." → 7 service cards with gradient icon placeholder, title, short description, "See Detail Service" link
- **Animations:** Grid fade-in. On "See Detail Service" click → opens Modal with expanded copy.
- **Data source:** `services.ts` — `{ id, title, icon, shortDesc, longDesc }[]`
- **Services list:**
  1. Digital Advertising
  2. Creative Content & Live Shopping
  3. Web Development & Maintenance
  4. Search Engine Optimization
  5. Professional Services (Growth Hack)
  6. Community Program Development
  7. Digital Marketing Training by Nano Academy

### 6. Office Space / Studio
- **Content:** "Our Space - Where Ideas Take Flight" → office photo (CSS gradient placeholder) + text → "Our Live Studio – Lights, Camera, Conversion!" → studio photo (CSS gradient placeholder)
- **Animations:** Parallax image reveal (desktop only). Disabled on mobile per decision #10.

### 7. Programs
- **Content:** "We Offer More Than Meets The Eye" → 3 program cards: Events (with NEW! badge), Breakfast Club, Bulletin Report
- **Animations:** Cards stagger in. Badge has subtle pulse animation.
- **Data source:** `programs.ts`
- **Links:** "Explore More" scrolls to a dedicated detail or opens modal.

### 8. Case Studies (Carousel)
- **Content:** "Explore more about our partner success stories" → 4 case study cards in Embla Carousel. Each card: category tag, title, description, "Read The Story" link.
- **Animations:** Embla handles sliding. Cards within viewport fade in as one group.
- **Data source:** `caseStudies.ts` — `{ id, category, title, description, gradient }[]`

### 9. Testimonials (Carousel)
- **Content:** "FROM OUR NOTABLE CLIENTS" / "800+ business have experienced the result" → 3 testimonial cards in Embla Carousel. Each: initial avatar, name, company, quote (in Indonesian, adapted for Nano Media).
- **Animations:** Embla autoplay with smooth loop. Slight scale on active card.
- **Data source:** `testimonials.ts`

### 10. Clients (Logo Marquee)
- **Content:** Section before footer showing client logos/brands in a horizontal auto-scrolling marquee.
- **Animations:** CSS infinite scroll marquee (`motion.div` with `animate={{ x: "-50%" }}` clone technique). Pauses on hover.

### 11. News & Blog
- **Content:** "Your time is valuable..." → 6 article cards in grid (title, date, category, gradient thumbnail, "Read More")
- **Animations:** Grid items fade up staggered. Optional hover lift effect.
- **Data source:** `blogPosts.ts`

### 12. Contact Form
- **Content:** "Want to know more?" → Form fields: Name, Brand Name, WhatsApp Number, Industry (select), Services (multi-select), How did you know Nano Media? (select) → "Consult Now" button
- **Validation:** Zod schema for all fields
- **Submit:** No backend. Validates, shows success toast/modal with confirmation message.
- **Animations:** Form fields fade in. Button has hover scale. Success state has checkmark animation.

### 13. Footer
- **Content:** CTA "Let's grow and collaborate with us!" → "Start our Journey" button → Newsletter subscribe → Social links → Ecosystem links → Offices (Bandung HQ, Jakarta HQ, Singapore HQ, Hong Kong) → Contact info (phone, email) → Copyright
- **Animations:** Minimal — footer sections fade up. Newsletter button has subtle hover.
- **Data source:** `site.ts`

### 14. Promo Pop-up
- **Content:** "Grow smarter in 2026 with Nano Media growth playbook! [Get FREE Report]" — modal pop-up on page load (delayed 3-5 seconds, shown once per session via `localStorage` or `sessionStorage`).
- **Animations:** Framer Motion scale + fade entrance.

---

## Color Palette (Light Mode Premium)

Defined as Tailwind v4 CSS custom properties in `app.css`:

```css
@theme {
  --color-brand-50: #f0f4ff;
  --color-brand-100: #dbe4ff;
  --color-brand-200: #bac8ff;
  --color-brand-300: #91a7ff;
  --color-brand-400: #748ffc;
  --color-brand-500: #5c7cfa;   /* Primary accent */
  --color-brand-600: #4c6ef5;
  --color-brand-700: #4263eb;
  --color-brand-800: #3b5bdb;
  --color-brand-900: #364fc7;

  --color-surface: #ffffff;
  --color-surface-alt: #f8f9fa;
  --color-surface-dark: #0a0a0b;
  
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

Sections alternate between `surface` (white) and `surface-alt` (light gray) backgrounds. Dark sections use `surface-dark` with inverted text.

---

## Performance Strategy (Lighthouse ≥ 90 Mobile)

1. **Lazy loading below-fold sections:** Wrap sections 3+ in `React.lazy()` + `<Suspense>` with minimal skeleton placeholders
2. **Font optimization:** Google Fonts loaded with `display: swap`, preconnect hints
3. **Image strategy:** CSS gradients as placeholders (zero network requests for images in MVP)
4. **Animation budget:** `AnimatedSection` uses `once: true` — animations only fire once on scroll, not on every re-render
5. **Framer Motion tree-shaking:** Only import `motion`, `AnimatePresence`, `useScroll`, `useTransform`, `useMotionValue`, `useSpring`
6. **Embla Carousel:** Tree-shakeable, ~6KB gzipped
7. **SSR:** TanStack Start + Nitro pre-renders the full HTML shell, so FCP is near-instant

---

## Implementation Order (Recommended)

Each phase builds on the previous and delivers a testable milestone.

### Phase 1: Foundation (1 section)
1. Clean up `__root.tsx` — remove demo code, add fonts, SEO meta
2. Create `src/data/site.ts` with Nano Media brand info
3. Create `AnimatedSection` shared component
4. Implement **Hero** section

### Phase 2: Trust Layer (3 sections)
5. Industries
6. Stats (with `Counter` component)
7. Why Choose Us

### Phase 3: Core Content (3 sections)
8. Services (with `Modal` component)
9. Office Studio
10. Programs

### Phase 4: Social Proof (4 sections)
11. Case Studies (with Embla Carousel)
12. Testimonials (with Embla Carousel)
13. Clients (marquee)
14. Blog

### Phase 5: Conversion (3 sections + layout)
15. Contact Form
16. Footer
17. Promo Pop-up
18. Navbar + FloatingCTA (wired up to all sections)

### Phase 6: Polish
19. Performance audit (Lighthouse)
20. Mobile QA pass
21. `prefers-reduced-motion` testing
22. Accessibility pass (focus states, aria labels, semantic HTML)

---

## What's NOT in Scope (Phase 2 / Future)

- Real image assets (CSS gradients serve as placeholders)
- Backend form submission (validates + shows toast only)
- Blog post detail pages
- Case study detail pages
- Program detail pages
- CMS integration
- Analytics/tracking
- Multi-language (currently Indonesian copy adapted to Nano Media)
- Dark mode toggle

---

## Open Questions

None. All 20 decisions resolved during grilling session.
