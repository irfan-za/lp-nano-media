# PRD: Codebase Architecture Improvements

> **Type:** Refactor / Technical Debt  
> **Created:** 2026-06-12  
> **Status:** Ready for Implementation  
> **Scope:** `src/data/`, `src/components/`, `src/utils/`

---

## Overview

A series of five deepening refactors across the Nano Media landing page codebase. Each candidate replaces shallow, fragmented modules with deeper ones — fewer interfaces with more behaviour behind them. The goal is locality (changes happen in one place), leverage (callers get more from less), and a codebase that AI and humans can navigate without bouncing between many thin files.

None of these changes alter visible behaviour. All are independently deliverable.

---

## Candidates

| # | Opportunity | Files Affected | Priority |
|---|-------------|---------------|----------|
| 1 | Fragmented data modules → unified `content` module | `src/data/*.ts` (8 files) | High |
| 2 | Duplicated animation config → `theme/animations.ts` module | ~15 component files | High |
| 3 | Parallel scroll-lock implementations → `useScrollLock` hook | `Navbar.tsx`, `Modal.tsx` | Medium |
| 4 | Carousel duplication → `<Carousel>` module | `CaseStudies.tsx`, `Testimonials.tsx` | Medium |
| 5 | Unused server utilities → deletion | `utils/posts.tsx`, `utils/users.tsx`, `utils/loggingMiddleware.tsx` | Low |

---

## Candidate 1: Unified Content Module

### Problem

Eight thin data files, each exporting a single array with no validation, no shared schema, and no single point of entry:

```
src/data/
  services.ts        → ServicesSection components
  caseStudies.ts     → CaseStudies component
  testimonials.ts    → Testimonials component
  industries.ts      → Industries component
  programs.ts        → Programs component
  blogPosts.ts       → Blog component
  stats.ts           → Stats component
  site.ts            → Navbar, Footer
```

Deletion test: delete any one file and complexity reappears in the section that imported it — the module never had any depth. Each is a shallow wrapper over a typed array.

Consequences today:
- 8 separate import paths for content with no shared contract
- No validation or content-shape enforcement
- Swapping to a CMS or API requires touching 8 files individually
- Content search ("which section references this client name?") requires grepping 8 files

### Solution

Merge into a single `src/content/index.ts` module that exports a typed `SiteContent` object. Sections import from one seam.

**Proposed structure:**

```
src/content/
  index.ts           # Public interface — exports { content } and all types
  schema.ts          # Zod schemas for each section's content shape
  sections/
    services.ts
    caseStudies.ts
    testimonials.ts
    industries.ts
    programs.ts
    blogPosts.ts
    stats.ts
    site.ts
```

**Public interface (`src/content/index.ts`):**

```ts
import { siteData } from './sections/site'
import { servicesData } from './sections/services'
import { caseStudiesData } from './sections/caseStudies'
import { testimonialsData } from './sections/testimonials'
import { industriesData } from './sections/industries'
import { programsData } from './sections/programs'
import { blogPostsData } from './sections/blogPosts'
import { statsData } from './sections/stats'

export const content = {
  site: siteData,
  services: servicesData,
  caseStudies: caseStudiesData,
  testimonials: testimonialsData,
  industries: industriesData,
  programs: programsData,
  blog: blogPostsData,
  stats: statsData,
} as const

export type SiteContent = typeof content

// Re-export all types for callers that need them
export type * from './schema'
```

**Component usage (before):**
```ts
import { services } from '~/data/services'
import { stats } from '~/data/stats'
```

**Component usage (after):**
```ts
import { content } from '~/content'
// content.services, content.stats, etc.
```

### Benefits

- **Leverage:** One import path. Callers don't need to know which file owns which data.
- **Locality:** When data eventually comes from a CMS or API, there is exactly one seam to cut — the `content/index.ts` export — not eight.
- **Testability:** A single `content` object can be validated, mocked, or replaced in tests without patching 8 import paths.
- **Searchability:** Any AI or human exploring "what data does this page use?" reads one file.

### Implementation Steps

1. Create `src/content/` directory
2. Move each `src/data/*.ts` file into `src/content/sections/` with no logic changes
3. Create `src/content/index.ts` that re-exports everything under the `content` object
4. Update all component imports (search-replace `~/data/` → `~/content`)
5. (Optional) Add Zod schemas in `src/content/schema.ts` to validate each section's shape at build time
6. Delete `src/data/` directory

---

## Candidate 2: Animation Constants Module

### Problem

The easing curve `[0.16, 1, 0.3, 1]` is hardcoded in at least 15 files. Duration and stagger values are scattered with no names. Changing the brand's animation feel requires a grep-and-replace across the codebase.

**Files with duplicated animation config (partial list):**
- `src/components/shared/AnimatedSection.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/Services.tsx`
- `src/components/sections/Industries.tsx`
- `src/components/sections/Testimonials.tsx`
- `src/components/sections/CaseStudies.tsx`
- `src/components/sections/Stats.tsx`
- `src/components/sections/Clients.tsx`
- `src/components/sections/Programs.tsx`
- `src/components/sections/WhyChooseUs.tsx`
- `src/components/layout/Navbar.tsx`

Deletion test: delete a single animation config — the numbers reappear across all those call sites. Classic shallow module; no depth, no leverage.

### Solution

Extract a `src/theme/animations.ts` module that exports named animation presets. Components import by name, not by magic numbers.

**Proposed `src/theme/animations.ts`:**

```ts
export const ease = {
  default: [0.16, 1, 0.3, 1] as const,
  snappy: [0.4, 0, 0.2, 1] as const,
  gentle: [0.25, 0.46, 0.45, 0.94] as const,
}

export const duration = {
  fast: 0.3,
  default: 0.6,
  slow: 0.9,
}

export const stagger = {
  tight: 0.06,
  default: 0.1,
  loose: 0.15,
}

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
  staggerContainer: {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger.default },
    },
  },
}
```

**Component usage (before):**
```ts
transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
```

**Component usage (after):**
```ts
import { ease, duration } from '~/theme/animations'
transition={{ ease: ease.default, duration: duration.default }}
```

### Benefits

- **Locality:** The brand's motion feel lives in one file. Tuning the easing changes the entire site.
- **Leverage:** All 15 consumers share one interface. Swapping Framer Motion for another library requires editing `animations.ts`, not 15 files.
- **Readability:** `ease.default` reads better than `[0.16, 1, 0.3, 1]` — the name carries intent.

### Implementation Steps

1. Create `src/theme/animations.ts` with the constants above
2. Find all usages of `[0.16, 1, 0.3, 1]` and replace with `ease.default`
3. Find hardcoded `duration`, `delay`, `staggerChildren` values and replace with named constants where sensible
4. Update `AnimatedSection.tsx` to use `variants.fadeUp` / `variants.staggerContainer`

---

## Candidate 3: Scroll-Lock Hook

### Problem

Both `Navbar.tsx` and `Modal.tsx` independently set `document.body.style.overflow = 'hidden'` to prevent background scroll when their overlay is open.

- `Navbar.tsx` — sets on mobile drawer open/close
- `Modal.tsx` — sets on modal open/close

Two shallow modules over the same DOM mutation. If both are active simultaneously (a modal opens while the mobile nav is open), they race to write `body.overflow` and whichever closes first clears the lock the other still needs. There is no stacking counter, no cleanup guarantee, and no test surface because the mutation is buried inside component logic.

### Solution

A `useScrollLock` hook that ref-counts active locks. The hook owns the only place in the codebase where `body.overflow` is written.

**Proposed `src/hooks/useScrollLock.ts`:**

```ts
import { useEffect, useRef } from 'react'

let lockCount = 0

export function useScrollLock(active: boolean) {
  const wasActive = useRef(false)

  useEffect(() => {
    if (active && !wasActive.current) {
      lockCount++
      wasActive.current = true
      if (lockCount === 1) {
        document.body.style.overflow = 'hidden'
      }
    } else if (!active && wasActive.current) {
      lockCount--
      wasActive.current = false
      if (lockCount === 0) {
        document.body.style.overflow = ''
      }
    }

    return () => {
      if (wasActive.current) {
        lockCount--
        wasActive.current = false
        if (lockCount === 0) {
          document.body.style.overflow = ''
        }
      }
    }
  }, [active])
}
```

**Component usage (before — Navbar.tsx):**
```ts
useEffect(() => {
  document.body.style.overflow = mobileOpen ? 'hidden' : ''
}, [mobileOpen])
```

**Component usage (after):**
```ts
import { useScrollLock } from '~/hooks/useScrollLock'
useScrollLock(mobileOpen)
```

### Benefits

- **Locality:** `document.body.style.overflow` is written in exactly one place. Every overlay in the project uses the same seam.
- **Correctness:** Ref-counting means two concurrent overlays don't fight. Scroll only unlocks when both close.
- **Testability:** The hook's behaviour (lock, unlock, ref-count) can be tested independently of Navbar and Modal rendering.

### Implementation Steps

1. Create `src/hooks/useScrollLock.ts`
2. Replace `document.body.style.overflow` mutations in `Navbar.tsx` with `useScrollLock(mobileOpen)`
3. Replace `document.body.style.overflow` mutations in `Modal.tsx` with `useScrollLock(isOpen)`
4. Delete the now-redundant `useEffect` blocks

---

## Candidate 4: Carousel Module

### Problem

`CaseStudies.tsx` and `Testimonials.tsx` each independently wire up Embla Carousel. The implementations differ in surface details only:

- `CaseStudies.tsx` — prev/next arrow buttons
- `Testimonials.tsx` — autoplay plugin + dot buttons

A third carousel (team members, gallery, client logos) would be a third copy. Each section is a shallow wrapper over Embla — the interface (a scrollable carousel of content) is nearly as complex as the implementation.

**Files:**
- `src/components/sections/CaseStudies.tsx`
- `src/components/sections/Testimonials.tsx`

### Solution

A `<Carousel>` component that accepts `autoplay`, `arrows`, and `dots` as props. Sections declare what they need; Embla wiring lives behind the seam.

**Proposed `src/components/shared/Carousel.tsx`:**

```tsx
type CarouselProps = {
  children: React.ReactNode
  autoplay?: boolean
  arrows?: boolean
  dots?: boolean
  loop?: boolean
  className?: string
}

export function Carousel({ children, autoplay, arrows, dots, loop, className }: CarouselProps) {
  // Embla setup lives here — sections don't need to know about it
}

export function CarouselSlide({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('embla__slide', className)}>{children}</div>
}
```

**Section usage (before):**
```tsx
// 40+ lines of Embla setup in CaseStudies.tsx
const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
// ...
```

**Section usage (after):**
```tsx
<Carousel arrows loop>
  {caseStudies.map(cs => (
    <CarouselSlide key={cs.id}>
      <CaseStudyCard {...cs} />
    </CarouselSlide>
  ))}
</Carousel>
```

### Benefits

- **Leverage:** Embla configuration and plugin wiring happen once. Adding a third carousel is one `<Carousel>` call.
- **Locality:** Switching from Embla to another library (Swiper, Keen Slider) means editing `Carousel.tsx` only.
- **Testability:** Carousel behaviour (autoplay, navigation, loop) is testable through the `<Carousel>` interface without mounting the full section.

### Implementation Steps

1. Create `src/components/shared/Carousel.tsx` with `<Carousel>` and `<CarouselSlide>`
2. Migrate `CaseStudies.tsx` to use `<Carousel arrows loop>`
3. Migrate `Testimonials.tsx` to use `<Carousel autoplay dots loop>`
4. Delete the Embla setup code from both section components

---

## Candidate 5: Delete Unused Server Utilities

### Problem

Three files exist in `src/utils/` but are never imported anywhere in the codebase:

- `src/utils/posts.tsx` — `fetchPost` and `fetchPosts` server functions (TanStack Start starter artifact)
- `src/utils/users.tsx` — `User` type definition, no consumers
- `src/utils/loggingMiddleware.tsx` — request timing middleware, never registered

These are starter-template artifacts. They imply a server-data pattern that does not yet exist. For any reader (human or AI) exploring the codebase, they create noise: "Should I be using these? Are they deprecated? Is this the pattern for fetching dynamic content?"

Deletion test: delete all three. No complexity reappears elsewhere in the codebase — they contribute nothing.

### Solution

Delete the files.

```
src/utils/posts.tsx          → DELETE
src/utils/users.tsx          → DELETE
src/utils/loggingMiddleware.tsx → DELETE
```

When server functions are introduced in a future phase (CMS integration, form submission, analytics), they should be created with a real interface at that time.

### Benefits

- The `src/utils/` directory contains only `cn.ts` and `seo.ts` — both actively used.
- Codebase exploration gives an accurate picture of the architecture.
- No implied contract with a pattern that doesn't exist.

### Implementation Steps

1. Confirm no imports of these files exist (`grep -r "posts\|users\|loggingMiddleware" src/`)
2. Delete the three files

---

## Implementation Order

Each candidate is independently deliverable. Recommended sequencing by risk and payoff:

| Phase | Candidate | Effort | Risk |
|-------|-----------|--------|------|
| 1 | Delete unused utils (Candidate 5) | 5 min | None |
| 2 | Animation constants (Candidate 2) | 1-2 hr | Low (no behaviour change) |
| 3 | Scroll-lock hook (Candidate 3) | 30 min | Low (behaviour-preserving) |
| 4 | Carousel module (Candidate 4) | 1-2 hr | Low (UI unchanged) |
| 5 | Unified content module (Candidate 1) | 2-3 hr | Low (import paths only) |

Start with Candidate 5 (deletion) to reduce noise before the larger refactors.

---

## What's NOT in Scope

- Changing any visible UI or animations
- Introducing state management (Zustand, Jotai, etc.) — not needed at this scale
- CMS integration — deferred; Candidate 1 creates the seam for it
- Testing infrastructure — a separate initiative; these refactors improve testability but don't add tests
- Server-side data fetching — deferred to a future phase when dynamic content is needed

---

## Open Questions

None. All five candidates are scoped to internal restructuring with no external dependencies or visible behaviour changes.
