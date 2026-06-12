# Landing Page Template v2: Conversion-Optimized Animated UI

> **Type:** Template PRD — use this to bootstrap every new TanStack Start landing page project  
> **Created:** 2026-06-12  
> **Status:** Canonical — supersedes `docs/landing-page-template.md`  
> **Reference Implementation:** Nano Media (`docs/prd.md` + this codebase)

---

## Part 0: Evaluation of v1 Template

What `landing-page-template.md` gets right — keep it:

- Funnel psychology order (credibility before offering)
- One CTA rule across the entire page
- TypeScript interface per section
- Section decision matrix (when to include optional sections)
- Section ordering rules (trust → offering → proof → ask)
- Concrete "avoid this" examples per section

What v1 is missing — addressed in this document:

| Gap | Impact |
|-----|--------|
| No form handling pattern | Contact section is the conversion goal; v1 says "validates + shows toast only" |
| No floating CTA | A sticky persistent CTA is one of the highest-ROI conversion elements |
| No analytics/event tracking | You can't improve conversion without measuring it |
| No SEO beyond title/description | Missing OG image, JSON-LD, canonical URL kills organic traffic |
| No font loading strategy | Google Fonts CDN adds 200-600ms on cold load; hurts Lighthouse |
| No image strategy | "Use picsum.photos" is a dev placeholder, not a production plan |
| Animation config is scattered | Easing `[0.16, 1, 0.3, 1]` repeated in 15+ files; no central token |
| No lazy loading implementation | All sections load eagerly; below-fold JS delays interactivity |
| No mobile conversion patterns | WhatsApp, click-to-call, sticky bottom bar — critical for mobile-first markets |
| No trust signal patterns | No guarantee badges, no risk reversal copy, no security indicators |
| No promo pop-up implementation spec | Exists as a section description but no timing, session, or dismiss logic |

---

## Part 1: Tech Stack

### Core (non-negotiable)

| Package | Version | Role | Why |
|---------|---------|------|-----|
| `@tanstack/react-start` | `^1.x` | Framework | SSR, file-based routing, server functions in the same codebase |
| `tailwindcss` | `^4.x` | Styling | v4 brings native CSS `@theme`, no config file, faster HMR |
| `framer-motion` | `^12.x` | Animations | Best-in-class scroll-triggered animations, layout animations, exit animations |

### Essential additions

| Package | Version | Role | Why |
|---------|---------|------|-----|
| `embla-carousel-react` | `^8.x` | Carousels | ~6KB gzipped, touch-native, no opinions about styling |
| `lucide-react` | `^0.400+` | Icons | Tree-shakeable; 1 import = 1 icon; perfect TypeScript types |
| `tailwind-merge` | `^2.x` | Class merging | Prevents Tailwind class conflicts in reusable components |
| `clsx` | `^2.x` | Class conditionals | Tiny; combine with `tailwind-merge` into a `cn()` utility |
| `zod` | `^3.x` | Schema validation | Validates form input AND data files at runtime; single validation model |
| `react-hook-form` | `^7.x` | Form state | Uncontrolled inputs = zero re-renders per keystroke; plays perfectly with Zod |
| `sonner` | `^1.x` | Toasts | ~8KB; ships beautiful defaults; works with TanStack Router's SSR model |

### Recommended additions

| Package | Version | Role | Why |
|---------|---------|------|-----|
| `@fontsource/poppins` | `^5.x` | Self-hosted headings font | Eliminates Google Fonts CDN request; ~200ms faster FCP on cold load |
| `@fontsource/inter` | `^5.x` | Self-hosted body font | Same reason; fonts are bundled with Vite, not fetched at runtime |
| `@hookform/resolvers` | `^3.x` | Zod ↔ RHF bridge | One import wires Zod schema into react-hook-form |

### What NOT to add

| Package | Why not |
|---------|---------|
| `shadcn/ui` or any UI library | Override fights with Tailwind; adds ~50KB+ for components you'll replace anyway |
| `zustand`, `jotai`, `redux` | Landing pages don't need cross-component state |
| `axios` | Native `fetch` + TanStack Start server functions cover all data needs |
| `date-fns`, `dayjs` | Overkill; format dates in data files at write time |
| `react-spring` | Redundant with Framer Motion |

### Final `package.json` additions (new project bootstrap)

```json
{
  "dependencies": {
    "@tanstack/react-start": "^1.x",
    "@tanstack/react-router": "^1.x",
    "framer-motion": "^12.x",
    "tailwindcss": "^4.x",
    "embla-carousel-react": "^8.x",
    "lucide-react": "latest",
    "tailwind-merge": "^2.x",
    "clsx": "^2.x",
    "zod": "^3.x",
    "react-hook-form": "^7.x",
    "@hookform/resolvers": "^3.x",
    "sonner": "^1.x",
    "@fontsource/poppins": "^5.x",
    "@fontsource/inter": "^5.x",
    "react": "^19.x",
    "react-dom": "^19.x"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.x",
    "typescript": "^5.x",
    "vite": "^8.x",
    "@types/react": "^19.x",
    "@types/react-dom": "^19.x"
  }
}
```

---

## Part 2: Conversion Framework

Before building any section, understand WHY each section converts.

### The Psychological Funnel

```
ATTENTION   Hero                    Stop the scroll in <3 seconds
            ↓
TRUST L1    Stats                   Numbers don't lie ("800+ brands")
            ↓
TRUST L2    Client logos marquee    "These companies use them"
            ↓
TRUST L3    Testimonials            "Someone like me vouches for them"
            ↓
TRUST L4    Why Choose Us           "They think differently — not just another vendor"
            ↓
DESIRE      Services                "Here's exactly what they can do for me"
            ↓
PROOF       Case Studies            "Here's what actually happened for a real client"
            ↓
FRICTION    FAQ                     "Let me remove my last hesitation"
REMOVAL     ↓
ACTION      Contact form            "I'm ready — make it easy to say yes"
```

### The Five Conversion Killers (avoid these)

1. **Vague value proposition** — "We help businesses grow" says nothing. "800+ Indonesian brands grew 3x in 12 months" says everything.
2. **CTA before trust** — Asking for the form before providing evidence loses 60%+ of visitors. Follow the funnel order.
3. **Too many CTAs** — "Get Started" vs "Contact Us" vs "Learn More" vs "See Pricing" = paralysis. One CTA label, everywhere.
4. **Slow load on mobile** — Every 100ms delay reduces conversion ~1%. Self-hosted fonts, lazy-loaded sections, SSR.
5. **No floating CTA** — 40% of conversions happen mid-scroll. If there's no visible CTA at that moment, you lose them.

### Trust Signal Hierarchy

The strength of social proof, weakest to strongest:

```
★ Claim without proof  ("We're the best")                  — worth nothing
★★ Numbers            ("800+ clients")                     — credible if specific
★★★ Logos             (recognizable brand names/logos)     — strong shortcut
★★★★ Testimonials     (real quote + real person + company) — high trust
★★★★★ Case studies    (named client + specific outcome)    — closes deals
```

Build toward the strongest. Don't start with testimonials before you've established numbers.

---

## Part 3: Project Structure

```
src/
├── routes/
│   ├── __root.tsx              # SEO, fonts, Sonner Toaster, error + 404 components
│   └── index.tsx               # Section composition (no logic here)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           # Scroll-aware, mobile drawer, anchor links
│   │   ├── Footer.tsx           # Offices, social links, newsletter, repeat CTA
│   │   └── FloatingCTA.tsx      # Sticky "Consult Now" visible below hero
│   │
│   ├── sections/                # One file per section — data-driven, no hardcoded copy
│   │   ├── Hero.tsx
│   │   ├── Stats.tsx
│   │   ├── Clients.tsx          # Logo marquee
│   │   ├── Testimonials.tsx     # Embla carousel
│   │   ├── WhyChooseUs.tsx
│   │   ├── Services.tsx         # Grid + modal detail
│   │   ├── Industries.tsx       # Tab-filtered grid (optional)
│   │   ├── CaseStudies.tsx      # Embla carousel
│   │   ├── FAQ.tsx              # Accordion
│   │   ├── Contact.tsx          # react-hook-form + Zod + server function
│   │   ├── Blog.tsx             # Optional
│   │   ├── Programs.tsx         # Optional
│   │   └── OfficeStudio.tsx     # Optional
│   │
│   └── shared/
│       ├── AnimatedSection.tsx  # Scroll-triggered reveal wrapper
│       ├── Carousel.tsx         # Embla wrapper (arrows, dots, autoplay)
│       ├── Counter.tsx          # Animated number on scroll
│       ├── Modal.tsx            # Portal modal (escape + backdrop close)
│       ├── SectionHeading.tsx   # Eyebrow + h2 + description
│       └── Accordion.tsx        # FAQ expand/collapse
│
├── content/                     # All page copy in one place
│   ├── index.ts                 # exports { content } — single import for all data
│   └── sections/
│       ├── site.ts
│       ├── hero.ts
│       ├── stats.ts
│       ├── testimonials.ts
│       ├── services.ts
│       ├── caseStudies.ts
│       ├── faq.ts
│       ├── contact.ts
│       ├── industries.ts        # optional
│       ├── programs.ts          # optional
│       ├── blogPosts.ts         # optional
│       └── clients.ts           # optional
│
├── theme/
│   └── animations.ts            # ALL easing curves, durations, variants — one source of truth
│
├── hooks/
│   ├── useScrollLock.ts         # ref-counted body.overflow lock (Modal + Navbar share this)
│   └── useScrollProgress.ts     # scroll depth tracking (analytics)
│
├── server/
│   └── contact.ts               # TanStack Start server function: validates + sends email
│
├── styles/
│   └── app.css                  # @theme tokens, global resets, form control styles
│
└── utils/
    ├── cn.ts                    # tailwind-merge + clsx
    └── seo.ts                   # head meta builder
```

---

## Part 4: Animation System

**All animation config lives in `src/theme/animations.ts`. Never hardcode easing values in components.**

```ts
// src/theme/animations.ts

export const ease = {
  default: [0.16, 1, 0.3, 1] as const,   // snappy ease-out — use for most entrances
  gentle: [0.25, 0.46, 0.45, 0.94] as const,  // subtle slide — use for page-level elements
  spring: { type: 'spring', stiffness: 300, damping: 30 } as const,
} as const

export const duration = {
  fast: 0.25,
  default: 0.6,
  slow: 0.9,
} as const

export const stagger = {
  tight: 0.06,
  default: 0.1,
  loose: 0.18,
} as const

// Reusable Framer Motion variant sets
export const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { ease: ease.default, duration: duration.default, delay },
    }),
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: (delay = 0) => ({
      opacity: 1,
      transition: { ease: ease.default, duration: duration.default, delay },
    }),
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (delay = 0) => ({
      opacity: 1,
      scale: 1,
      transition: { ease: ease.default, duration: duration.fast, delay },
    }),
  },
  staggerContainer: (staggerDelay = stagger.default) => ({
    hidden: {},
    visible: {
      transition: { staggerChildren: staggerDelay, delayChildren: 0.1 },
    },
  }),
} as const
```

### Animation patterns per section

| Pattern | Sections | Config |
|---------|----------|--------|
| Staggered fade-up | Hero text, Services grid, FAQ items | `stagger.default`, `variants.fadeUp` |
| Fade in as group | Stats cards, Blog cards, Case study cards | `variants.fadeIn`, `once: true` |
| Carousel slide | Testimonials, Case Studies | Embla handles — no Framer Motion on slides |
| Infinite marquee | Client logos | `animate={{ x: "-50%" }}`, `duration: 30`, linear |
| Modal scale | Service detail, Program detail | scale 0.95→1, opacity 0→1, `duration.fast` |
| Tab crossfade | Industries | `AnimatePresence` mode="wait", `variants.fadeIn` |
| Counter spring | Stats numbers | `useMotionValue` + `useSpring`, triggers on view |
| Accordion height | FAQ | `motion.div` `animate={{ height: "auto" / 0 }}` |

### Reduced motion rule

Every scroll-triggered animation MUST respect `prefers-reduced-motion`:

```ts
// AnimatedSection.tsx — check this before animating
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
// If true: render final state immediately, no transition
```

---

## Part 5: Section Library

### REQUIRED SECTIONS (every landing page)

---

#### 1. Hero

**Psychological job:** Stop the scroll. Communicate the value proposition in under 3 seconds.

**Above-the-fold rule:** Everything visible before scrolling (at 1280px wide, 800px tall) must include: headline, subtext, and the primary CTA button. No exceptions.

**Content shape:**
- Eyebrow (optional): factual, max 1 per 3 sections page-wide. "Digital Marketing Agency — Indonesia". Not "Innovate Your Future."
- Headline: 6–12 words. The promise, not a tagline. "Expand your brand through measurable digital strategies."
- Subtext: 15–25 words. One sentence expanding the headline. No bullet lists.
- Primary CTA: 1–3 words. Same label used everywhere on the page.
- Social proof hook (optional): "800+ brands growing with us" — small text beside the CTA button.
- Visual: One strong image — portrait, product shot, real photography. Not abstract blobs.

<details>
<summary>TypeScript interface</summary>

```ts
interface HeroContent {
  eyebrow?: string
  headline: string
  subtext: string
  ctaLabel: string
  ctaHref: string
  socialProofText?: string
  image: { src: string; alt: string }
}
```

</details>

**Animation:** Stagger fade-up — eyebrow → headline → subtext → CTA, 120ms delay between each. Image fades in after 0.4s.

---

#### 2. Stats / Numbers

**Psychological job:** Credibility through scale. Numbers beat adjectives. This section earns the right to show the offering.

**Rules:**
- 4–6 stat cards. No more — it starts to feel like a spreadsheet.
- Use organic numbers (847, not 800. 23M, not 20M). Round numbers feel made up.
- Each card: large animated number, short label, optional descriptor.
- Counter animates from 0 → target when scrolled into view. Fires once only.

<details>
<summary>TypeScript interface</summary>

```ts
interface StatItem {
  value: number
  prefix?: string   // "$", "IDR "
  suffix?: string   // "+", "M+", "%"
  label: string
  description?: string
}

interface StatsContent {
  heading: string
  subheading?: string
  stats: StatItem[]  // 4–6 items
}
```

</details>

---

#### 3. Testimonials

**Psychological job:** Peer validation. Real people in their own words.

**Rules:**
- Specific quotes only. "They helped us 3x our leads in 60 days" > "Great agency!"
- Attribution must include: full name + company. Role is optional.
- 3–5 items in a carousel. Auto-advance with 5s delay, pause on hover.
- Avatar: real photo preferred; generated monogram as fallback.

<details>
<summary>TypeScript interface</summary>

```ts
interface TestimonialItem {
  quote: string
  name: string
  company: string
  role?: string
  avatar?: string
}

interface TestimonialsContent {
  heading: string
  items: TestimonialItem[]  // 3–5 items
}
```

</details>

---

#### 4. Why Choose Us

**Psychological job:** Differentiation. Why this business and not a competitor?

**Rules:**
- 3 value cards only. More dilutes the message.
- Heading is the core philosophy, not a category label. "It's not about how much you spend, but how you spend it." Not "Our Values."
- Card titles are concrete values (2–4 words), not abstract nouns. "Meaningful Growth" not "Innovation."
- Vary the visual treatment — don't use 3 identical-height equal-weight cards.

<details>
<summary>TypeScript interface</summary>

```ts
interface ValueCard {
  icon: string
  title: string
  description: string
}

interface WhyChooseUsContent {
  heading: string
  subheading?: string
  values: ValueCard[]  // exactly 3
}
```

</details>

---

#### 5. Services

**Psychological job:** Now they care what you sell. Credibility is established — show the menu.

**Rules:**
- 5–8 service cards in a grid.
- Short description on the card (10–15 words). Full description in a modal, not on the page.
- "See Detail" links open a Modal — never navigate away from the page.
- One card can be featured (larger, different background) for the flagship service.

<details>
<summary>TypeScript interface</summary>

```ts
interface ServiceItem {
  id: string
  icon: string
  title: string
  shortDesc: string   // 10–15 words, for the card
  longDesc: string    // 3–5 sentences, for the modal
}

interface ServicesContent {
  heading: string
  subheading?: string
  items: ServiceItem[]  // 5–8 items
}
```

</details>

---

#### 6. Case Studies

**Psychological job:** Specific proof. This section closes deals — not testimonials, not stats. A named client with a specific number is the strongest trust signal.

**Rules:**
- Headline is outcome-first: "Generated 3x leads in 60 days" not "How We Helped Company X."
- Name the client. Anonymous case studies feel fabricated.
- 3–6 items in a carousel. Manual navigation (let the user control pace — this is dense content).

<details>
<summary>TypeScript interface</summary>

```ts
interface CaseStudyItem {
  id: string
  category: string       // "Digital Advertising", "SEO"
  client: string         // Named client
  headline: string       // Outcome-first
  description: string    // 2–3 sentences: problem → result
  gradient?: string      // CSS gradient for visual placeholder
  image?: string         // Real photo URL when available
}

interface CaseStudiesContent {
  heading: string
  subheading?: string
  items: CaseStudyItem[]  // 3–6 items
}
```

</details>

---

#### 7. FAQ

**Psychological job:** Remove last-minute friction before the ask. Answer the unspoken objections.

**Rules:**
- 5–8 questions. More reads like documentation.
- Questions are the visitor's actual concerns, phrased naturally. "What does pricing look like?" not "About Pricing."
- Answers are honest and specific. "It depends" with no qualifier is worse than no FAQ.
- Accordion layout — one open at a time. Compact, scannable.
- FAQ comes AFTER case studies, BEFORE the contact form.

<details>
<summary>TypeScript interface</summary>

```ts
interface FAQItem {
  question: string
  answer: string  // 2–4 sentences, honest and specific
}

interface FAQContent {
  heading: string
  items: FAQItem[]  // 5–8 items
}
```

</details>

**Implementation:** `motion.div` with `animate={{ height: "auto" }}` and `AnimatePresence` for the answer panel. No hardcoded pixel heights.

---

#### 8. Contact / Conversion

**Psychological job:** The single ask. Every prior section has been building trust for this moment.

**Rules:**
- 4–6 fields maximum. Every extra field reduces conversion ~10%.
- Labels above inputs. Never placeholder-as-label.
- Qualifying fields tell you something useful: industry, service interest, budget range.
- Success state is inline — a checkmark + message replaces the form. No redirect.
- Submit button uses the same CTA label as everywhere else on the page.
- Wire to a real backend. Form submission must go somewhere. See `src/server/contact.ts` below.

<details>
<summary>TypeScript interface</summary>

```ts
interface ContactFormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea'
  required: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
}

interface ContactContent {
  heading: string
  subheading?: string
  fields: ContactFormField[]   // 4–6 fields
  submitLabel: string          // Same as global CTA label
  successHeading: string
  successMessage: string
}
```

</details>

**Form implementation pattern:**

```tsx
// Contact.tsx — react-hook-form + Zod + TanStack Start server function

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormData } from '~/server/contact'

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    await submitContact({ data })  // TanStack Start server function
    setSubmitted(true)
  }

  return (
    <AnimatedSection id="contact">
      <AnimatePresence mode="wait">
        {submitted ? <SuccessState /> : <FormState onSubmit={handleSubmit(onSubmit)} ... />}
      </AnimatePresence>
    </AnimatedSection>
  )
}
```

**Server function (`src/server/contact.ts`):**

```ts
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2),
  brand: z.string().min(1),
  whatsapp: z.string().min(8),
  industry: z.string(),
  service: z.string(),
})

export type ContactFormData = z.infer<typeof contactSchema>

export const submitContact = createServerFn({ method: 'POST' })
  .validator(contactSchema)
  .handler(async ({ data }) => {
    // Send via Resend, SendGrid, or any email API
    // await resend.emails.send({ from: '...', to: '...', subject: '...', html: '...' })
    return { success: true }
  })
```

---

#### 9. Navbar

**Psychological job:** Persistent trust signal + conversion anchor. The Navbar CTA must always be visible.

**Behaviour:**
- Default (top of page): transparent background, light text
- Scrolled (>40px): white/80 background, `backdrop-blur`, dark text, subtle shadow
- Mobile: hamburger → full-screen slide-in drawer
- CTA button: same label as page CTA → scrolls to `#contact`

**Implementation notes:**
- `useScrollLock(mobileOpen)` for body overflow management (not inline `document.body.style.overflow`)
- `useScroll()` from Framer Motion for scroll detection
- Links: anchor scroll via `scrollIntoView({ behavior: 'smooth' })`, not `<Link>` navigation

---

#### 10. Footer

**Psychological job:** Final touch. Repeat the CTA, confirm legitimacy (address, phone, email).

**Content:**
- One repeat CTA (same label, same `#contact` target)
- Office addresses (real addresses build trust)
- Phone/email/WhatsApp (click-to-call and click-to-chat)
- Social media links
- Copyright line

---

#### 11. FloatingCTA

**Psychological job:** Capture mid-scroll intent. 40% of conversions happen on sections that don't have their own CTA button.

**Behaviour:**
- Hidden until hero exits viewport (below ~100vh scroll)
- Fixed position: bottom-right desktop, bottom-center mobile strip on small screens
- Disappears when `#contact` section enters viewport (the form is now visible)
- Same CTA label as every other button on the page
- Subtle attention animation: scale pulse every 3 seconds (one pulse, then idle)

**Implementation:**

```tsx
// FloatingCTA.tsx
const { scrollY } = useScroll()
const [visible, setVisible] = useState(false)

useMotionValueEvent(scrollY, 'change', (y) => {
  const heroHeight = document.getElementById('hero')?.offsetHeight ?? 600
  const contactTop = document.getElementById('contact')?.offsetTop ?? Infinity
  setVisible(y > heroHeight && y + window.innerHeight < contactTop)
})
```

---

### OPTIONAL SECTIONS

Include these based on the project type. The decision matrix from v1 still applies.

#### Industries / Client Categories (optional)

Use when: the business serves 4+ distinct verticals with recognizable client names per vertical.

- Tab filter: `AnimatePresence` mode="wait" between categories
- Client grid: name cards or logo tiles
- 5–8 industry tabs, 6–12 clients per tab

#### Office / Studio (optional)

Use when: the brand benefits from humanization (agencies, studios, consultancies).

- Asymmetric layout: one large image + one smaller image + text
- Short, factual captions ("Bandung HQ", "Our Live Studio")
- Parallax on desktop only — disable with `@media (prefers-reduced-motion)` or `md:` check

#### Programs / Community (optional)

Use when: the business runs events, workshops, or community initiatives.

- 2–4 cards, asymmetric sizing
- One card can carry a "NEW!" badge with a subtle pulse animation

#### Client Logo Marquee (optional)

Use when: 10+ recognizable brand names are available.

- Single horizontal infinite scroll (CSS or Framer Motion)
- Pause on hover
- Duplicate the array for a seamless visual loop

#### Blog (optional)

Use when: the business publishes content regularly and authority is a goal.

- 3–6 cards in a grid, staggered fade-up
- Card: date, category tag, title, thumbnail (gradient or real image), "Read More" link

#### Promo Pop-up (optional)

Use when: there is a lead magnet (free guide, discount code).

- Show after 4 seconds, once per session (`sessionStorage`)
- Scale + fade entrance via `AnimatePresence`
- Close: X button, Escape key, backdrop click
- Never show to returning visitors within 24h (`localStorage` timestamp check)

---

## Part 6: SEO Setup

Every project must ship with complete SEO. The `__root.tsx` is the only place SEO meta lives.

### Head meta (complete spec)

```tsx
// src/routes/__root.tsx
import { seo } from '~/utils/seo'

const meta = seo({
  title: 'Agency Name — Short Value Proposition | City',
  description: '155 characters max. Lead with the benefit, not the feature.',
  ogImage: '/og-image.png',         // 1200×630px static or generated
  canonical: 'https://yourdomain.com',
  locale: 'en_US',                   // or 'id_ID' for Indonesian
})
```

### JSON-LD structured data (for agencies + service businesses)

```tsx
// Inside __root.tsx <head>
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Agency Name',
  description: 'Short description',
  url: 'https://yourdomain.com',
  telephone: '+62-xxx-xxxx-xxxx',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jl. Example No. 1',
    addressLocality: 'Bandung',
    addressCountry: 'ID',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '847',
  },
}
```

### Required static files

| File | Purpose |
|------|---------|
| `public/og-image.png` | 1200×630px — appears in link previews on WhatsApp, Slack, Facebook |
| `public/favicon.ico` | Browser tab icon |
| `public/apple-touch-icon.png` | 180×180px — iOS home screen |
| `public/robots.txt` | `User-agent: *\nAllow: /` |
| `public/sitemap.xml` | Single-page sitemap; regenerate when routes change |

---

## Part 7: Font Strategy

**Do not use Google Fonts CDN in production.** It adds a blocking cross-origin DNS lookup on cold loads.

Use `@fontsource` instead — fonts are bundled by Vite, zero external requests:

```ts
// src/routes/__root.tsx (or main entry)
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/poppins/800.css'
import '@fontsource/poppins/900.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
```

Then in `app.css`:

```css
@theme {
  --font-heading: 'Poppins', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
}
```

---

## Part 8: Image Strategy

Placeholder images (`picsum.photos`) are for development only. Before launch:

### Image spec per section

| Section | Recommended dimensions | Format |
|---------|----------------------|--------|
| Hero image | 800×1000px (4:5) | WebP, `loading="eager"` |
| OG image | 1200×630px | PNG or JPG |
| Team / office | 1200×800px | WebP, `loading="lazy"` |
| Testimonial avatar | 80×80px | WebP, circular |
| Blog thumbnail | 600×400px | WebP, `loading="lazy"` |
| Client logos | SVG preferred | SVG inline or `<img>` |

### `PlaceholderImage` component (dev-only pattern)

```tsx
// Only use this during development. Replace with <img> or Next/Vercel Image before launch.
// The seed prop locks a specific picsum image for design consistency.
<PlaceholderImage seed="hero-main" width={800} height={1000} />
```

### Production image component

```tsx
// Replace PlaceholderImage with a simple responsive <img>
<img
  src="/images/hero-main.webp"
  alt="Descriptive alt text"
  width={800}
  height={1000}
  loading="eager"        // Hero only; all others: loading="lazy"
  decoding="async"
  className="w-full h-full object-cover rounded-2xl"
/>
```

---

## Part 9: Analytics & Conversion Tracking

Without measurement, there is no optimization.

### Minimum viable analytics

```tsx
// src/routes/__root.tsx
// Google Analytics 4 via gtag — add to <head>
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
/>
<script dangerouslySetInnerHTML={{ __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
` }} />
```

### Key events to track

```ts
// src/utils/analytics.ts
export const track = {
  ctaClick: (location: 'navbar' | 'hero' | 'floating' | 'footer') =>
    gtag('event', 'cta_click', { location }),

  sectionView: (section: string) =>
    gtag('event', 'section_view', { section }),

  formStart: () =>
    gtag('event', 'form_start', { form: 'contact' }),

  formSubmit: () =>
    gtag('event', 'form_submit', { form: 'contact' }),

  formError: (field: string) =>
    gtag('event', 'form_error', { field }),

  serviceDetailView: (serviceId: string) =>
    gtag('event', 'service_detail_view', { service_id: serviceId }),
}
```

Fire `track.ctaClick('hero')` on every CTA button, `track.formSubmit()` on successful contact submission.

---

## Part 10: Mobile Conversion

Mobile traffic often exceeds desktop in emerging markets. Mobile-specific conversion patterns:

### WhatsApp integration (high-value for Indonesian market)

```tsx
// A WhatsApp CTA converts better than a form for mobile-first markets
const WHATSAPP_NUMBER = '6281234567890'
const WHATSAPP_MESSAGE = encodeURIComponent('Halo, saya tertarik dengan layanan Nano Media')
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`

// Add to Navbar CTA, floating button, and footer — alongside the form CTA
<a href={whatsappUrl} target="_blank" rel="noopener">
  <WhatsappIcon /> Chat on WhatsApp
</a>
```

### Mobile floating bar (sticky bottom strip)

On screens narrower than `md` (768px), replace the bottom-right FloatingCTA with a full-width sticky bottom bar:

```tsx
// FloatingCTA.tsx
<div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur md:hidden z-50">
  <a href="#contact" className="block w-full btn-primary text-center">
    {ctaLabel}
  </a>
</div>
```

### Carousel on mobile

Disable Embla on mobile for case studies — show 1 card + horizontal scroll instead:

```tsx
<div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-4">
  {items.map(item => <Card key={item.id} className="snap-start shrink-0 w-80" />)}
</div>
<div className="hidden md:block">
  <Carousel>{items.map(...)}</Carousel>
</div>
```

---

## Part 11: Performance Targets

| Metric | Target | How |
|--------|--------|-----|
| Lighthouse Mobile | ≥ 90 | SSR, self-hosted fonts, lazy sections, WebP images |
| LCP | < 2.5s | Hero image `loading="eager"`, no render-blocking fonts |
| CLS | < 0.1 | Fixed image dimensions, no layout shifts from fonts |
| FID / INP | < 200ms | No heavy JS on main thread; animations are GPU-composited |
| Bundle size | < 200KB JS (gzipped) | Tree-shaken deps, no UI library, no heavy polyfills |

### Lazy loading sections below fold

```tsx
// src/routes/index.tsx
import { lazy, Suspense } from 'react'
import { Hero, Stats, Testimonials } from '~/components/sections'

// Above fold: load immediately (≤3 sections)
// Below fold: lazy
const WhyChooseUs = lazy(() => import('~/components/sections/WhyChooseUs'))
const Services = lazy(() => import('~/components/sections/Services'))
const CaseStudies = lazy(() => import('~/components/sections/CaseStudies'))
const FAQ = lazy(() => import('~/components/sections/FAQ'))
const Contact = lazy(() => import('~/components/sections/Contact'))

export default function Landing() {
  return (
    <>
      <Navbar />
      <FloatingCTA />
      <Hero />
      <Stats />
      <Testimonials />
      <Suspense>
        <WhyChooseUs />
        <Services />
        <CaseStudies />
        <FAQ />
        <Contact />
      </Suspense>
      <Footer />
    </>
  )
}
```

---

## Part 12: Section Ordering (Canonical)

The mandatory funnel order. Do not reorder without a specific reason:

```
1.  Navbar            (persistent)
2.  FloatingCTA       (persistent, appears below hero)
3.  Hero              ← ATTENTION
4.  Stats             ← TRUST L1: numbers
5.  Clients           ← TRUST L2: logos (optional — only with 10+ recognizable brands)
6.  Testimonials      ← TRUST L3: peer quotes
7.  Why Choose Us     ← TRUST L4: differentiation
8.  Services          ← DESIRE: the offering
9.  Industries        ← RELEVANCE (optional — only with 4+ clear verticals)
10. Case Studies      ← PROOF: named outcomes
11. FAQ               ← FRICTION REMOVAL
12. Contact           ← ACTION
13. Footer            (persistent)

Optional extras (position-flexible):
- OfficeStudio        — place after Services, before Case Studies
- Programs            — place after Services or after Why Choose Us
- Blog                — place after Case Studies, before FAQ
```

**Non-negotiable rule:** Trust signals (Stats, Testimonials, Why Choose Us) ALWAYS come before the offering (Services). Nobody evaluates what you sell before they trust you.

---

## Part 13: Implementation Checklist

Use this before marking any landing page project done.

### Core sections
- [ ] Hero with above-fold CTA
- [ ] Stats (4–6 animated counters)
- [ ] Testimonials (3–5 in carousel)
- [ ] Why Choose Us (3 value cards)
- [ ] Services (5–8 cards + modal detail)
- [ ] Case Studies (3–6 in carousel)
- [ ] FAQ (5–8 accordion items)
- [ ] Contact form (4–6 fields, Zod validation, server function)

### Layout
- [ ] Navbar (scroll-aware, mobile drawer)
- [ ] Footer (address, phone, social, repeat CTA)
- [ ] FloatingCTA (appears below hero, hides at contact)

### Conversion
- [ ] Single CTA label used everywhere — audit all buttons
- [ ] Form wired to a real backend (not "shows toast only")
- [ ] WhatsApp link in Navbar or FloatingCTA (mobile market)
- [ ] Success state replaces form inline after submit
- [ ] Analytics events on CTA click, form start, form submit

### SEO
- [ ] Title + description (unique per project)
- [ ] OG image (1200×630px)
- [ ] JSON-LD structured data
- [ ] robots.txt
- [ ] sitemap.xml
- [ ] Canonical URL

### Performance
- [ ] Self-hosted fonts (`@fontsource`) — no Google Fonts CDN
- [ ] Hero image: WebP, `loading="eager"`, real dimensions set
- [ ] Below-fold images: `loading="lazy"`
- [ ] Below-fold sections: `React.lazy()` + `<Suspense>`
- [ ] `prefers-reduced-motion` respected in AnimatedSection

### Quality
- [ ] Lighthouse ≥ 90 on mobile
- [ ] All placeholder images replaced with real assets
- [ ] All CTA buttons link to `#contact` anchor
- [ ] Keyboard: Escape closes modals, Tab navigates form
- [ ] Mobile QA: iOS Safari + Android Chrome

---

## Part 14: What NOT to Include

Things that look like good ideas but kill conversion or performance:

| Pattern | Why not |
|---------|---------|
| Auto-play video hero | Blocks LCP, kills mobile data, fails `prefers-reduced-motion` |
| Pop-up within 1 second of page load | Destroys first impression, triggers spam classifiers |
| Infinite scroll instead of sections | Removes anchor targets, breaks back button, kills analytics |
| "Enter your email to see the page" gates | Kills 95% of visitors before they see the offer |
| Cursor follower / custom cursor | 200KB of JS to annoy users. No. |
| Parallax on mobile | Causes performance issues and motion sickness |
| Multiple CTA labels | Splits intent. One label, everywhere. |
| Form with 7+ fields | Every field above 4 reduces submission rate ~10% |
| Loading spinner on page load | Use SSR skeleton or instant render. Spinners kill perceived performance. |
| Cookie banner covering content | Design it as a thin bottom bar, not a full-screen modal |

---

## Appendix A: `cn()` utility

```ts
// src/utils/cn.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Appendix B: `seo()` utility

```ts
// src/utils/seo.ts
export function seo({
  title,
  description,
  ogImage,
  canonical,
  locale = 'en_US',
}: {
  title: string
  description: string
  ogImage?: string
  canonical?: string
  locale?: string
}) {
  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: locale },
    ...(ogImage ? [{ property: 'og:image', content: ogImage }] : []),
    ...(canonical ? [{ rel: 'canonical', href: canonical }] : []),
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    ...(ogImage ? [{ name: 'twitter:image', content: ogImage }] : []),
  ]
}
```

## Appendix C: `useScrollLock` hook

```ts
// src/hooks/useScrollLock.ts
import { useEffect, useRef } from 'react'

let lockCount = 0

export function useScrollLock(active: boolean) {
  const wasActive = useRef(false)

  useEffect(() => {
    if (active && !wasActive.current) {
      lockCount++
      wasActive.current = true
      if (lockCount === 1) document.body.style.overflow = 'hidden'
    } else if (!active && wasActive.current) {
      lockCount--
      wasActive.current = false
      if (lockCount === 0) document.body.style.overflow = ''
    }
    return () => {
      if (wasActive.current) {
        lockCount--
        wasActive.current = false
        if (lockCount === 0) document.body.style.overflow = ''
      }
    }
  }, [active])
}
```

---

**End of template.** Reference implementation: this Nano Media codebase. Evaluate against the checklist in Part 13 before shipping.
