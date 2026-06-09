# Landing Page Template: High-Converting Single-Page Format

> **Type:** Internal Reference / Playbook  
> **Created:** 2026-06-09  
> **Status:** Canonical — use for all landing page projects in this codebase  
> **Reference Implementation:** Nano Media (see `docs/prd.md`)

---

## Part 1: The Format

### The Single-Page Funnel

A high-converting landing page is a **vertical conversion funnel**, not a brochure. Every section has a psychological job. The order is deliberate — credibility comes before the offering, proof comes before the ask.

```
HOOK     →  Hero                         "Who are you and what's the promise?"
├─ CREDIBILITY LAYER 1: Stats            "Here are the receipts"
├─ CREDIBILITY LAYER 2: Testimonials     "Others vouch for them"
├─ DIFFERENTIATION: Why Choose Us        "They think differently"
├─ OFFERING: Services                    "Here's what they do"
├─ PROOF: Case Studies                   "Here's exactly what happened"
└─ ASK: Contact Form                     "I'm ready. Let's talk."

PERSISTENT: Navbar, Floating CTA, Footer
```

### The Skeleton (7 Mandatory Sections)

Every landing page built in this codebase must include these. They form the minimum viable conversion funnel:

| # | Section | Psychological Job |
|---|---------|-------------------|
| 1 | **Hero** | Stop the scroll. Answer "who are you and what's the promise" in 3 seconds. |
| 2 | **Stats / Numbers** | Credibility through scale. Numbers beat adjectives. |
| 3 | **Testimonials** | Peer validation. Real people in their own words. |
| 4 | **Why Choose Us** | Differentiation. "Here's our philosophy — not just another vendor." |
| 5 | **Services / Offering** | Now they care what you sell. List concretely. |
| 6 | **Case Studies** | Specific proof of delivery. Outcomes, not promises. |
| 7 | **Contact / Conversion** | The single ask. Pre-sold by this point. |

**Plus these always-present elements:**
- **Navbar** (transparent → solid on scroll)
- **Footer** (offices, links, social, repeat CTA)
- **Floating CTA** (persistent "Free Consultation" / "Get Started" button)

### The Optional Layers (7 Extensions)

Add these based on the project. Each strengthens a specific part of the funnel:

| # | Section | When to Add |
|---|---------|-------------|
| 8 | **Industries / Client Categories** | When the business serves distinct verticals (Fashion, FnB, SaaS...). Filterable tabs show breadth. |
| 9 | **Office / Studio / Team** | When the brand benefits from showing real people and space. Humanizes agencies, studios, consultancies. |
| 10 | **Programs / Community** | When the business runs events, workshops, publications, or community initiatives. Shows industry leadership. |
| 11 | **Clients / Logo Marquee** | When you have recognizable brand logos. Auto-scrolling marquee signals "these brands trust us." |
| 12 | **Blog / Content** | When the business publishes articles. Authority signal: "they know their craft." |
| 13 | **Promo Pop-up** | When there's a lead magnet (free report, discount, playbook). Shown once per session, delayed 3-5 seconds. |
| 14 | **Newsletter Signup** | When content marketing is part of the strategy. Can live in footer or as a standalone section. |

### Section Ordering Rules

1. **Credibility ALWAYS comes before the offering.** Stats, testimonials, and "Why Us" must appear before Services. Nobody cares what you sell until they trust you.

2. **The offering is one block.** All services in one section, not scattered. One clear picture of what the business does.

3. **Proof comes after the offering but before the ask.** Case studies and deeper testimonials sit between Services and Contact. They answer "does it actually work?" — the last objection before conversion.

4. **The ask is at the bottom.** The form lives after all evidence. Someone who scrolls that far is pre-qualified.

5. **One CTA intent, many placements.** Every CTA button across the page (nav, hero, floating, footer, pop-up) uses the same label and points to the same action. Never "Get Started" in one spot and "Contact Us" in another. Pick one.

---

## Part 2: Section Library

Each section spec follows this template:
- **Psychological Job** — what it does in the funnel
- **Content Shape** — prose description of what goes in it
- **Data Shape** — TypeScript interface (for implementation in this codebase)
- **Animation Direction** — motion pattern to use
- **Example** — concrete content from a real implementation

---

### 1. Hero

**Psychological Job:** Stop the scroll. Answer "who are you and what's the promise" in under 3 seconds. The hero is a pattern interrupt — it must be visually distinct enough that a visitor pauses.

**Content Shape:**
- **Eyebrow** (optional, max 1): Small uppercase label. Keep it factual ("Digital Marketing Agency — Indonesia"), avoid generic filler ("Grow With Us", "Innovate Together"). Maximum 1 eyebrow per 3 sections across the entire page.
- **Headline:** 6-12 words. The value proposition in one sentence. Not a tagline; a promise.
- **Subtext:** 15-25 words. One paragraph expanding the headline. No feature lists, no bullet points.
- **Primary CTA:** 1-3 words. "Get to Know Us", "Start Free Trial", "See Our Work". Never wraps to 2 lines at desktop.
- **Secondary CTA or stat line** (optional): "800+ brands growing with us", "No credit card required", "View pricing". Small text alongside the primary CTA.
- **Visual asset:** One strong image (portrait, product shot, team photo). Not abstract blobs, not gradient-only backgrounds. Real visual presence.

<details>
<summary>TypeScript Interface</summary>

```ts
interface HeroData {
  eyebrow?: string
  headline: string
  subtext: string
  ctaLabel: string
  ctaHref: string       // Anchor or URL
  secondaryText?: string
  image: {
    src: string
    alt: string
  }
}
```
</details>

**Animation Direction:** Staggered fade-up for text elements (eyebrow → headline → subtext → CTA, ~120ms stagger). Visual asset enters from the side or fades in with slight delay. No scroll cue. No infinite micro-animations.

**Example (Nano Media):**
> Eyebrow: "Digital Marketing Agency — Indonesia"  
> Headline: "Expand your brand through measurable digital strategies."  
> Subtext: "At Nano Media, we are players in the integrated digital marketing game..."  
> CTA: "Get to Know Us"  
> Secondary: "800+ brands growing with us"

---

### 2. Stats / Numbers

**Psychological Job:** Credibility through scale. Numbers are un-spinnable. They say "we're not two people in a garage" without saying it.

**Content Shape:**
- **Section heading:** Short. "We Work in Numbers", "The Numbers", "By the Numbers."
- **Sub-heading** (optional): One sentence framing the stats.
- **Stat cards** (4-6 items): Each card has a large number (with animated counter), a label, and optionally a very short description. Use organic-feeling numbers (47, 312, 8,400) — avoid fake-perfect round numbers like exactly 100 or 10,000 unless they're real.
- **Layout:** Grid. 2 columns on mobile, 3-4 on desktop. Each card is light — no heavy borders, no colored backgrounds.

<details>
<summary>TypeScript Interface</summary>

```ts
interface StatData {
  value: number          // Raw number for counter animation
  prefix?: string        // "$", "IDR ", ""
  suffix?: string        // "+", "M+", "%", " Mio+"
  label: string          // "Active Clients", "Team Members"
  description?: string   // Optional one-liner
}

interface StatsSection {
  heading: string
  subheading?: string
  stats: StatData[]      // 4-6 items
}
```
</details>

**Animation Direction:** Each counter animates from 0 to target on scroll-into-view. Cards stagger in with a ~80ms delay between them. Use spring physics for the counter. `once: true` — counters animate only the first time.

**Example (Nano Media):**
> 800+ Clients Growing · 140+ Team of Professionals · 50+ Meta & Google Certified · 400 Mio+ Online Engagement · $15 Mio+ Advertising Spend

---

### 3. Testimonials

**Psychological Job:** Peer validation. The visitor has seen the stats. Now they need to hear from someone like them. Testimonials are the most underused conversion lever — specific quotes in the customer's own language convert better than any sales copy.

**Content Shape:**
- **Section heading:** "From Our Clients", "What They Say", or skip the heading and let the quotes speak.
- **Quote cards** (3-5 items, carousel or grid): Each has a quote body (max 3 lines), attribution (name + company/role), and optionally an avatar or company logo.
- **Quotes must:** Name a real-seeming brand, use concrete language from the customer's industry, mention specific outcomes when possible. Never use generic "Great service!" filler.

<details>
<summary>TypeScript Interface</summary>

```ts
interface TestimonialData {
  quote: string          // Max 3 lines, specific language
  name: string           // Full name
  role?: string          // "CEO", "Marketing Director"
  company: string        // Real-seeming brand name
  avatar?: string        // Image URL or monogram
}

interface TestimonialsSection {
  heading: string
  testimonials: TestimonialData[]  // 3-5 items
}
```
</details>

**Animation Direction:** Carousel (Embla) with auto-advance and smooth loop. Cards fade in as a group on section enter. Active card has subtle scale emphasis. Pause auto-advance on hover.

**Example (Nano Media):**
> "Kita sudah jalan 2 tahun dengan pelayanan dari tim Nano Media dan cukup puas dengan pelayanan yang diberikan. Adanya insight setiap bulan dan performance online sale yang perlahan-lahan mulai ada peningkatan." — Lotus Archi

---

### 4. Why Choose Us

**Psychological Job:** Differentiation. The visitor now knows you're competent. But so are competitors. Why you? This section answers the unstated question: "what makes them different?"

**Content Shape:**
- **Section heading:** The core philosophy in one sentence. "It's not about how much budget you spend, but how you spend it."
- **Value cards** (3 items): Each has an icon, a short title (2-4 words), and a 1-2 sentence description. Titles are concrete values ("Meaningful Growth"), not abstract nouns ("Innovation"). Avoid the 3-equal-card layout — vary the visual treatment (different icon sizes, alternating background tints, asymmetric alignment).

<details>
<summary>TypeScript Interface</summary>

```ts
interface ValueCard {
  icon: string           // Icon name from library
  title: string          // 2-4 words
  description: string    // 1-2 sentences
}

interface WhyChooseUsSection {
  heading: string
  subheading?: string
  values: ValueCard[]    // 3 items
}
```
</details>

**Animation Direction:** Cards fade up with staggered delay (~100ms). Icons scale in slightly. Keep it restrained — this section is about substance, not spectacle.

**Example (Nano Media):**
> Meaningful Growth — Trust the process in elevating your business.  
> Collaborative Partnership — Company values meet potential augmentation.  
> Perceptive Exploration — We're not just players; we're visionaries.

---

### 5. Services / Offering

**Psychological Job:** Now they care what you sell. List everything concretely. The visitor has enough trust to evaluate the offering. Make it scannable.

**Content Shape:**
- **Section heading:** "What We Do", "Our Services", "We Offer."
- **Service cards** (5-8 items, grid): Each card has an icon or graphic, a title, a short description (10-15 words), and a "Learn More" or "See Detail" link that opens a modal with expanded copy.
- **Group related services** visually (e.g., 4-column grid on desktop, 2 on mobile). No equal-height forced cards — let content determine height.

<details>
<summary>TypeScript Interface</summary>

```ts
interface ServiceData {
  id: string
  icon: string           // Icon name from library
  title: string
  shortDesc: string      // 10-15 words for the card
  longDesc: string       // Expanded copy for the modal
}

interface ServicesSection {
  heading: string
  subheading?: string
  services: ServiceData[]  // 5-8 items
}
```
</details>

**Animation Direction:** Grid items fade up with staggered delay per row. Modal opens with scale + fade transition (Framer Motion `AnimatePresence`). Close on Escape, overlay click, or close button.

**Example (Nano Media):**
> Digital Advertising — Reach your optimum growth through actionable strategies.  
> Creative Content & Live Shopping — Performance creative driven by data and tech.  
> Web Development & Maintenance — The most suitable website for your business.  
> Search Engine Optimization — Long-term investment in organic traffic.

---

### 6. Case Studies

**Psychological Job:** Specific proof of delivery. This is the closer. Testimonials say "they liked us"; case studies say "here's exactly what happened." Name the client, show the metric, tell the story in 3 sentences.

**Content Shape:**
- **Section heading:** "Success Stories", "Our Work", "Results."
- **Case study cards** (3-6 items, carousel): Each has a category tag, a headline (the outcome), a 2-3 sentence description of the problem and result, and a "Read More" link.
- **Headlines are outcome-first:** "Generated a 3x increase in qualified leads" not "How We Helped Company X." The number is the hook.
- **Card layout:** Tag at top, headline, description, link. Optional gradient or image placeholder.

<details>
<summary>TypeScript Interface</summary>

```ts
interface CaseStudyData {
  id: string
  category: string       // "Digital Advertising", "SEO"
  headline: string       // Outcome-first: "10x ROAS sustained monthly"
  description: string    // 2-3 sentences, problem → result
  gradient?: string      // CSS gradient for card visual
  image?: string         // Optional real image
}

interface CaseStudiesSection {
  heading: string
  subheading?: string
  caseStudies: CaseStudyData[]  // 3-6 items
}
```
</details>

**Animation Direction:** Embla Carousel with dots or arrow navigation. Cards within viewport fade in as one group. No auto-advance — let the user control the pace. This is dense content.

**Example (Nano Media):**
> "Consistently crushed expectations with an average ROAS of 10x per month, soaring past our 8x target." — Logitech  
> "Generated a monthly three-fold increase in the quantity and quality of leads." — AXA Insurance  

---

### 7. Contact / Conversion

**Psychological Job:** The single ask. By this point, the visitor has scrolled through 6+ sections of evidence. They're either ready or they've left. The form exists to capture the ones who stayed.

**Content Shape:**
- **Heading:** "Want to know more?", "Let's Talk", "Start Your Project."
- **Subtext** (optional): One reassuring line. "Fill out this form and we'll get back within 24 hours."
- **Form fields** (4-6 fields): Only ask what you need to qualify the lead. Name, email/phone, one qualifying question (industry, budget range, service interested in). Never more than 6 fields.
- **Labels above inputs.** Never placeholder-as-label.
- **Submit button:** Same CTA label used everywhere. "Get Started", "Consult Now", "Send Message."
- **Success state:** Show confirmation inline (not a separate page). Checkmark animation + brief message. The user stays on the page.

<details>
<summary>TypeScript Interface</summary>

```ts
interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea'
  required: boolean
  options?: { value: string; label: string }[]  // For select fields
  placeholder?: string      // Only for helper text, never as label
}

interface ContactSection {
  heading: string
  subheading?: string
  fields: FormField[]       // 4-6 fields
  submitLabel: string       // Same as global CTA label
  successMessage: string    // Shown after submit
}
```
</details>

**Animation Direction:** Form fields fade in sequentially. Button has hover scale (`active:scale-[0.98]`). Success state: transition from form to checkmark using `AnimatePresence` with a swap animation.

---

### 8. Industries / Client Categories (Optional)

**Psychological Job:** "People like me use this." When a business serves distinct verticals, showing them by name signals relevance. A Fashion brand scrolling sees "Fashion" as a tab and feels recognized.

**Content Shape:**
- **Heading:** "Serving [X]+ businesses across industries", "Industries We Work With."
- **Filter tabs** (5-8 categories): Each tab switches the visible client set. Below the tabs, a grid of client logos or brand names with category-specific styling.
- **Animation:** Tab switch uses `AnimatePresence` with a short crossfade. Client items stagger in when a tab is selected.

<details>
<summary>TypeScript Interface</summary>

```ts
interface IndustryCategory {
  id: string
  label: string           // "Fashion", "FnB", "SaaS"
  clients: {
    name: string
    gradient?: string     // Visual placeholder
  }[]
}

interface IndustriesSection {
  heading: string
  categories: IndustryCategory[]  // 5-8 categories
}
```
</details>

---

### 9. Office / Studio / Team (Optional)

**Psychological Job:** Humanize the brand. Real photos of real spaces and real people shrink the trust gap. Especially important for agencies, studios, and service businesses where the relationship IS the product.

**Content Shape:**
- **Heading:** "Our Space", "Where We Work", "The Team."
- **2-3 visual panels:** Large photos with short captions. Office space, studio setup, team photo. Captions are factual ("Bandung HQ", "Our Live Studio"), not decorative ("Where ideas take flight").
- **Layout:** Asymmetric — one large image, one smaller offset image, a text block. Avoid left-right-left-right zigzag.

<details>
<summary>TypeScript Interface</summary>

```ts
interface SpacePanel {
  image: string          // Photo URL
  alt: string
  caption: string        // Short, factual
}

interface OfficeSection {
  heading: string
  panels: SpacePanel[]   // 2-3 panels
}
```
</details>

**Animation Direction:** Parallax reveal on desktop (image moves slower than scroll). Disable parallax on mobile — stack images normally. Fade in text captions.

---

### 10. Programs / Community (Optional)

**Psychological Job:** Authority through activity. Events, publications, and community initiatives show the business is active in its industry, not just selling. "They don't just do the work; they shape the conversation."

**Content Shape:**
- **Heading:** "More Than Services", "Our Programs", "What We're Building."
- **Program cards** (2-4 items): Each has a title, a short description, and a visual (photo or gradient). One program can have a "NEW!" badge. Links go to program detail or open a modal.

<details>
<summary>TypeScript Interface</summary>

```ts
interface ProgramData {
  id: string
  title: string
  description: string
  image?: string
  gradient?: string
  badge?: string          // "NEW!", "Monthly", etc.
}

interface ProgramsSection {
  heading: string
  programs: ProgramData[]  // 2-4 items
}
```
</details>

---

### 11. Clients / Logo Marquee (Optional)

**Psychological Job:** "These brands trust us." An auto-scrolling row of recognizable logos is a fast credibility signal. Best used when you have 10+ real brand names to show. A logo marquee is a trust shortcut — it communicates scale in 2 seconds of scrolling.

**Content Shape:**
- **A single horizontal scrolling row** of logos. The row scrolls automatically (CSS animation or Framer Motion). On hover, scrolling pauses.
- **Logos only.** No industry labels, no category tags. The logo itself is the signal.
- **Use real SVG marks** or generated monograms. Never plain text wordmarks in a row.

<details>
<summary>TypeScript Interface</summary>

```ts
interface ClientLogo {
  name: string           // For alt text
  src?: string           // SVG URL, or generated inline SVG
}

interface ClientsSection {
  heading?: string       // Optional; logos often speak alone
  logos: ClientLogo[]    // 10+ items for a good marquee
}
```
</details>

**Animation Direction:** CSS `@keyframes` infinite horizontal scroll or Framer Motion `animate={{ x: "-50%" }}` with cloned content for seamless loop. Pause on hover. Respect `prefers-reduced-motion` — show static grid when reduced.

---

### 12. Blog / Content (Optional)

**Psychological Job:** Authority through expertise. Published articles signal "they know their craft and they're generous with knowledge." Also serves SEO for the domain.

**Content Shape:**
- **Heading:** "Latest Insights", "From Our Blog", "Read."
- **Article cards** (3-6 items, grid): Each has a date, a title, an optional category tag, and a "Read More" link. A gradient or image thumbnail accompanies each card.
- **Titles are substantive:** "YouTube SEO: How to Rank Your Videos" not "Our Thoughts on Video." The title itself should demonstrate expertise.

<details>
<summary>TypeScript Interface</summary>

```ts
interface BlogPost {
  id: string
  title: string
  date: string           // "04 Jun 2026"
  category?: string
  thumbnail?: string     // Image URL or gradient class
  href: string           // Link to full article
}

interface BlogSection {
  heading: string
  posts: BlogPost[]      // 3-6 items
}
```
</details>

**Animation Direction:** Grid items fade up with staggered delay. Subtle hover lift on cards (translateY -2px). Nothing distracting — this is informational.

---

### 13. Promo Pop-up (Optional)

**Psychological Job:** Lead capture for visitors who are interested but not ready to fill the main form. The pop-up offers a low-friction entry point (free report, discount code, newsletter) in exchange for an email.

**Content Shape:**
- **Heading:** The offer in one line. "Grow smarter in 2026 — Get Our Free Report."
- **Subtext:** One sentence expanding the offer.
- **Email field + submit button.** 2 fields max. Email only is ideal.
- **Close button:** Visible X, and closes on overlay click and Escape.
- **Behavior:** Shown once per session (`sessionStorage`). Delayed 3-5 seconds after page load. Never shown on mobile or to returning visitors within 24 hours.

<details>
<summary>TypeScript Interface</summary>

```ts
interface PromoPopupData {
  heading: string
  subtext: string
  buttonLabel: string
  delayMs: number        // 3000-5000
}
```
</details>

**Animation Direction:** Scale + fade entrance. `AnimatePresence` for enter/exit. Subtle backdrop blur on the overlay.

---

### 14. Newsletter Signup (Optional)

**Psychological Job:** Long-term engagement. Not a conversion tool; a relationship tool. Best placed in the footer or as a thin banner between sections. Never competes with the primary CTA.

**Content Shape:**
- **Heading:** 3-5 words. "Stay in the loop", "Get updates from us."
- **Subtext:** One sentence. Value-first: what do they get by subscribing?
- **Email field + submit.** Simple inline layout. Submit says "Subscribe", not the primary CTA label.

<details>
<summary>TypeScript Interface</summary>

```ts
interface NewsletterData {
  heading: string
  subtext: string
  placeholder: string
  buttonLabel: string    // "Subscribe", not primary CTA
}
```
</details>

---

## Part 3: Implementation Notes

### Stack Reference

This playbook assumes the following stack, but sections are described framework-agnostically:

| Layer | Technology (this codebase) |
|-------|---------------------------|
| Framework | TanStack Start (React 19, SSR) |
| Routing | TanStack Router (file-based) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion / Motion |
| Carousels | Embla Carousel |
| Icons | Library of choice (Lucide, Phosphor, etc.) |
| Content | Local TypeScript data files in `src/data/` |
| Form validation | Zod |

### Data File Pattern

All section content lives in `src/data/`. One file per section:

```
src/data/
  site.ts          # Brand identity, socials, offices (always present)
  hero.ts          # Hero content
  stats.ts         # Stat cards
  testimonials.ts  # Client quotes
  whyChooseUs.ts   # Value cards
  services.ts      # Service cards + detail descriptions
  caseStudies.ts   # Case study cards
  contact.ts       # Form fields + success message
  industries.ts    # (Optional) Industry categories
  office.ts        # (Optional) Office panels
  programs.ts      # (Optional) Program cards
  clients.ts       # (Optional) Client logos
  blog.ts          # (Optional) Blog posts
```

Each file exports a single default object matching the section's interface. Components import and render the data — no content in JSX.

### Animation Vocabulary

Patterns used across sections, independent of animation library:

| Pattern | Use For | Notes |
|---------|---------|-------|
| **Staggered fade-up** | Hero text, service cards, blog cards, stat cards | `staggerChildren: 0.08-0.15`, each child fades up 24-40px |
| **Counter** | Stats section numbers | Spring physics, triggers once on `whileInView` |
| **Carousel** | Testimonials, case studies | Embla Carousel. Auto-advance for testimonials; manual for case studies. |
| **Parallax** | Office/studio images | Desktop only. Image translates slower than scroll. |
| **Marquee** | Client logos | CSS `@keyframes` or motion `animate: { x: "-50%" }` with cloned content. |
| **Modal** | Service detail, program detail | `AnimatePresence` + scale + fade. Close on Escape/overlay. |
| **Tab filter** | Industries | `AnimatePresence` layout animation between categories. |
| **Scale + fade (pop-up)** | Promo pop-up | Delayed entrance. Session-based show-once logic. |

### The Ease Curve

Standard project ease: `cubic-bezier(0.16, 1, 0.3, 1)`. Equivalent in Framer Motion: `ease: [0.16, 1, 0.3, 1]`. Use this for all section entrances unless a specific section calls for something different.

### Responsive Strategy

- **Mobile (< 768px):** Stack all multi-column layouts into single column. Keep fade-up animations and counters. Disable parallax, horizontal carousels (use vertical stack or reduced items). Nav becomes hamburger drawer.
- **Tablet (768-1024px):** 2-column grids. Most animations intact. Parallax disabled.
- **Desktop (1024px+):** Full layout. All animations active.
- **`prefers-reduced-motion`:** All animations collapse to static. Content renders immediately with no transitions.

### Performance Targets

- Lighthouse ≥ 90 on mobile
- Lazy-load below-fold sections with `React.lazy()` + `<Suspense>`
- Images: `loading="lazy"` except hero (use `loading="eager"`)
- Fonts: `font-display: swap`, preconnect hints
- Animation budget: `once: true` on all scroll-triggered reveals, `will-change` used sparingly

### One CTA Rule (Enforcement)

Pick ONE CTA label for the entire page. Audit before shipping:

- [ ] Navbar CTA = same label
- [ ] Hero CTA = same label
- [ ] Floating button = same label
- [ ] Footer CTA = same label
- [ ] Pop-up CTA = same label
- [ ] Contact form submit = same label

A page with "Get Started" AND "Contact Us" AND "Let's Talk" is a broken funnel. Fix it.

---

## Appendix: Section Decision Matrix

Quick reference for project planning. For a new landing page:

```
Is this an agency/studio/service business?
├─ YES → Include: Office/Studio, Programs (if they run events)
└─ NO  → Skip Office/Studio

Does the business serve distinct industries?
├─ YES → Include: Industries (tab filter)
└─ NO  → Skip

Does the brand have 10+ recognizable clients?
├─ YES → Include: Client Logo Marquee
└─ NO  → Skip

Does the business publish content regularly?
├─ YES → Include: Blog
└─ NO  → Skip

Is there a lead magnet to promote?
├─ YES → Include: Promo Pop-up
└─ NO  → Skip
```

---

**End of playbook.** Reference implementation: `docs/prd.md` (Nano Media).
