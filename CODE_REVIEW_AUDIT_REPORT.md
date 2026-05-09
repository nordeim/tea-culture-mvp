# CHA YUAN Tea Culture MVP — Comprehensive Code Review & Audit Report

**Date:** 2026-05-09  
**Codebase:** `tea-culture-mvp` (29 source files, ~2000 lines)  
**Stack:** React 19 + TypeScript 6 + Vite 8 (Rolldown) + Tailwind CSS v4 + TanStack Router + Zustand  
**Verification:** `tsc --noEmit` ✅ | `vitest run` 16/16 ✅ | `vite build` 627ms ✅

---

## Executive Summary

The CHA YUAN MVP is a well-crafted premium tea landing page that demonstrates strong design sensibility and solid foundational architecture. The codebase passes all type checks, builds in under 1 second, and has 16 passing tests. However, a thorough multi-axis audit reveals **7 critical issues, 18 important issues, and 25+ suggestions** spanning accessibility compliance, testing coverage, performance optimization, and UX completeness. The most pressing concerns are WCAG 2.1 AA violations (keyboard traps, missing ARIA patterns), low test coverage (~25% of components), and eager loading of all 10 sections without code splitting or lazy loading.

**Risk Rating:** 🟢 Low-Medium — Critical accessibility and correctness issues resolved. Remaining items are optimization and feature gaps.

---

## Remediation Status (Applied 2026-05-09)

All critical (C-01 through C-07) and important (I-07, I-13) findings have been remediated. See `REMEDIATION_PLAN.md` for detailed change log.

| Category | Before | After |
|----------|--------|-------|
| Test files | 4 | 9 |
| Test count | 16 | 45 |
| Components tested | 4/16 (25%) | 9/16 (56%) |
| WCAG keyboard issues | 4 critical | 0 critical |
| Error boundaries | 1 (root only) | 10 (root + 9 sections) |
| Dead code files | 2 | 0 |

**Post-remediation verification:** `tsc --noEmit` ✅ | `vitest run` 45/45 ✅ | `vite build` 648ms ✅

---

## Audit Methodology

This audit was conducted using four skill frameworks:

| Skill | Focus Area |
|-------|-----------|
| `react19-typescript6-vite8-mvp` | Stack-specific patterns, TypeScript strictness, Vite 8 config |
| `super-frontend-design` | Anti-generic design quality, visual hierarchy, UX psychology |
| `frontend-ui-engineering` | Component architecture, accessibility, responsive design, state management |
| `code-review-and-quality` | Five-axis review: Correctness, Readability, Architecture, Security, Performance |

Findings are categorized by severity:
- **🔴 Critical** — Must fix before production (blocks users or violates standards)
- **🟠 Important** — Should fix soon (degrades quality or maintainability)
- **🟡 Suggestion** — Nice to have (improves polish or future-proofs)

---

## 1. Correctness

### 🔴 C-01: ScrollReveal `delay` Timeout Not Cleaned Up

**File:** `src/components/shared/ScrollReveal.tsx:16-20`

```tsx
setTimeout(() => {
  if (el) {
    el.classList.add('active')
  }
}, delay)
```

The `setTimeout` created when `delay > 0` is never cleared on unmount. If the component unmounts before the timeout fires, it will attempt to access a potentially unmounted DOM element and call `classList.add` on it. This is a React anti-pattern that can cause memory leaks and stale closure bugs.

**Fix:** Store the timeout ID in a ref and clear it in the cleanup function:
```tsx
useEffect(() => {
  const el = ref.current
  if (!el) return
  let timeoutId: ReturnType<typeof setTimeout>

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          timeoutId = setTimeout(() => el.classList.add('active'), delay)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )

  observer.observe(el)
  return () => {
    clearTimeout(timeoutId)
    observer.disconnect()
  }
}, [delay])
```

### 🟠 I-01: Mobile Menu Uses `hidden` Instead of Accessible Toggle

**File:** `src/components/layout/Navbar.tsx:72`

```tsx
isMobileMenuOpen ? 'block' : 'hidden'
```

The `hidden` HTML attribute removes the element from the accessibility tree entirely. Screen readers cannot announce menu state transitions. Combined with the lack of `aria-hidden` and focus management, this creates a broken experience for assistive technology users.

**Fix:** Use `max-h-0 overflow-hidden` with transitions, add `aria-hidden={!isMobileMenuOpen}`, and manage focus when the menu opens/closes.

### 🟠 I-02: Collection Tab Keyboard Navigation Missing

**File:** `src/components/sections/Collection.tsx`

The tab list correctly uses `role="tablist"`, `role="tab"`, and `aria-selected`, but **arrow key navigation** between tabs is not implemented. WAI-ARIA Tabs pattern requires:
- `Left/Right` arrow keys to move between tabs
- `Home/End` to jump to first/last tab
- Focus should move to the newly activated tab

Without this, keyboard users must tab through every tab individually.

### 🟠 I-03: Interactive Cards Lack Keyboard Accessibility

**Files:** `Collection.tsx` (product cards, season cards), `TeaCulture.tsx` (culture cards)

Product cards, season cards, and culture cards use `<div>` with `cursor-pointer` but no `role="button"`, `tabIndex={0}`, or keyboard event handlers. They are completely inaccessible to keyboard-only users.

**Fix:** Either:
- Wrap cards in `<a>` or `<button>` elements, or
- Add `role="link"`, `tabIndex={0}`, `onKeyDown` handlers for Enter/Space

### 🟡 S-01: Footer Copyright Year Hardcoded

**File:** `src/components/layout/Footer.tsx:127`

```tsx
<p className="text-xs text-ivory-600">&copy; 2024 Cha Yuan Tea House.</p>
```

Hardcoded to 2024. Should use `new Date().getFullYear()` or at minimum be noted as needing update.

### 🟡 S-02: `ToastMessage` Interface Defined but Unused

**File:** `src/types/index.ts:46-50`

```tsx
export interface ToastMessage {
  id: string
  message: string
  icon: string
}
```

This interface is defined in the types file but never imported anywhere. The toast store defines its own inline state interface. Dead type.

### 🟡 S-03: `useScrollReveal` Hook Is Dead Code

**File:** `src/hooks/useScrollReveal.ts`

The hook is exported but never imported or used by any component. The `ScrollReveal` component implements its own IntersectionObserver logic independently. This is dead code that should be removed or consolidated.

---

## 2. Readability & Simplicity

### 🟠 I-04: Collection.tsx Is ~300 Lines With Mixed Concerns

**File:** `src/components/sections/Collection.tsx`

This file contains:
- Tab state management
- Three large data arrays (`originProducts`, `fermentTypes`, `seasons`)
- Three separate tab panel render functions
- All in a single component

**Suggestion:** Extract data arrays to a separate `data/` file or `constants/` module. Consider extracting each tab panel into its own component (`OriginPanel`, `FermentPanel`, `SeasonPanel`).

### 🟠 I-05: Dynamic Tailwind Classes Won't Be Detected by JIT

**Files:** `Philosophy.tsx`, `Collection.tsx`, `TeaCulture.tsx`, `Subscription.tsx`, `Testimonials.tsx`

Multiple components build class names from data arrays using string interpolation:

```tsx
// Philosophy.tsx
className={`w-10 h-10 rounded-xl ${value.bg} flex items-center justify-center`}

// Collection.tsx - fermentTypes
gradientFrom: 'from-tea-200', gradientTo: 'to-tea-400'
// Used as: `bg-gradient-to-b ${type.gradientFrom} ${type.gradientTo}`

// Collection.tsx - originProducts  
dotColor: 'bg-bark-800'
// Used as: `${product.dotColor}`
```

While Tailwind v4's JIT is more lenient than v3 with detection, dynamically constructed classes from variables are **not guaranteed to be included** in the CSS output. If the JIT scanner doesn't see the literal string `bg-bark-800` in a class attribute context, it won't generate the utility.

**Risk:** These classes work today because Tailwind v4 scans the full source file and sees the string literals in the data arrays. However, if the data is moved to an external file (JSON, API), these classes will silently break.

**Fix:** Use complete CSS custom properties or ensure all dynamic class strings appear as literals in scanned files.

### 🟡 S-04: `FermentationType` Mixes Data With UI Concerns

**File:** `src/types/index.ts:21-30`

```tsx
export interface FermentationType {
  // ...data fields...
  delay: number  // UI animation delay
}
```

The `delay` field is a presentation concern (animation timing) embedded in a data type. Consider separating data models from animation configuration.

### 🟡 S-05: Consistent Naming Could Be Improved

- `oxidization` in types vs `oxidization` in Collection data — consistent but the word is technically "oxidation" (oxidization is acceptable but less common)
- `gradientFrom`/`gradientTo` — Tailwind class fragments, not semantic names
- `dotColor` — describes visual representation, not meaning

---

## 3. Architecture

### 🟠 I-06: No Route-Level Code Splitting

**File:** `src/routes/index.tsx`

All 10 sections are imported eagerly in the index route:

```tsx
import { Hero } from '@/components/sections/Hero'
import { Philosophy } from '@/components/sections/Philosophy'
// ...8 more imports
```

The TanStack Router plugin has `autoCodeSplitting: true` enabled, but since there's only one route (`/`), all components are bundled together. The `routes-*.js` chunk is 33.9KB (8.5KB gzipped), which is reasonable for an MVP but won't scale.

**Fix:** Use `React.lazy()` for below-the-fold sections:
```tsx
const Philosophy = lazy(() => import('@/components/sections/Philosophy'))
const Collection = lazy(() => import('@/components/sections/Collection'))
// etc.
```

### 🟠 I-07: No Section-Level Error Boundaries

**File:** `src/main.tsx`

A single `ErrorBoundary` wraps the entire app. If any single section component throws, the entire page is replaced with the error UI. There's no graceful degradation.

**Fix:** Wrap each section in its own `ErrorBoundary` with a fallback that preserves the rest of the page:
```tsx
<ErrorBoundary fallback={<SectionError name="Philosophy" />}>
  <Philosophy />
</ErrorBoundary>
```

### 🟠 I-08: Multiple IntersectionObserver Instances

**File:** `src/components/shared/ScrollReveal.tsx`

Each `ScrollReveal` component creates its own `IntersectionObserver`. With 10+ sections, each potentially containing multiple `ScrollReveal` wrappers, this creates many observer instances.

**Fix:** Create a shared observer via a context or singleton hook that batches observations.

### 🟡 S-06: Zustand Store Module-Level Timeout Variable

**File:** `src/stores/toast.ts:3`

```tsx
let timeoutId: ReturnType<typeof setTimeout> | null = null
```

The timeout ID is stored at module scope rather than inside the store state. This works correctly but is unconventional. Consider moving it into the store's closure or using a ref-based pattern if this were a component.

### 🟡 S-07: Path Alias `@types/*` Defined but Unused

**File:** `tsconfig.json`

```json
"@types/*": ["./src/types/*"]
```

No import in the codebase uses `@types/`. All type imports use `@/types/index` or relative paths. Minor dead config.

---

## 4. Security

### 🟡 S-08: No Content Security Policy Headers

The `index.html` has no CSP meta tag. While this is a static SPA, adding a basic CSP would prevent XSS from injected scripts:

```html
<meta http-equiv="Content-Security-Policy" 
  content="default-src 'self'; img-src 'self' https://picsum.photos https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com;">
```

### 🟡 S-09: External Image Dependencies

All images load from `picsum.photos`, a third-party service. In production:
- Images could go down or change
- No control over image content
- Privacy concern (IP addresses leaked to third party)

**Fix:** Self-host images or use a CDN you control.

### ✅ Positive Security Notes

- No `any` types used — strict TypeScript throughout
- No `eval()` or `dangerouslySetInnerHTML`
- No user data sent to external services (newsletter is mocked)
- Toast store uses proper Zustand patterns (no `.getState()` in JSX)
- `useActionState` handles form submission correctly

---

## 5. Performance

### 🔴 C-02: Hero Image Missing `fetchpriority="high"` and Preload

**File:** `src/components/sections/Hero.tsx:11-15`

```tsx
<img
  src="https://picsum.photos/seed/teagarden-misty/1920/1080.jpg"
  alt="Tea Garden"
  className="w-full h-full object-cover"
  loading="eager"
/>
```

The hero image is the LCP (Largest Contentful Paint) element. While `loading="eager"` is correct, it's missing:
- `fetchpriority="high"` — tells the browser to prioritize this request
- A `<link rel="preload">` in `index.html` — starts the download before HTML parsing reaches the `<img>` tag

The image is also served from an external CDN (picsum.photos), adding DNS lookup + connection overhead.

**Fix in `index.html`:**
```html
<link rel="preload" as="image" href="https://picsum.photos/seed/teagarden-misty/1920/1080.jpg" fetchpriority="high" />
```

**Fix in Hero.tsx:**
```tsx
<img fetchpriority="high" ... />
```

### 🟠 I-09: All 10 Sections Render Eagerly

The home page renders all 10 sections synchronously. Below-the-fold sections (Subscription, Testimonials, CTA, Newsletter) don't need to be in the initial render.

**Fix:** Use `React.lazy()` + `<Suspense>` for below-the-fold sections to reduce initial JS execution time.

### 🟠 I-10: Google Fonts Load Without `font-display: swap`

**File:** `index.html`

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Noto+Serif:wght@400;500;600&display=swap" rel="stylesheet" />
```

The `display=swap` parameter IS present ✅. However, loading **3 font families with 13 weights** from a single request is heavy. Consider:
- Subsetting to only the weights actually used (400, 500, 600 for Inter; 400, 500, 600, 700 for Playfair)
- Using `font-display: optional` for Noto Serif (used only in testimonials)
- Self-hosting fonts for better caching control

### 🟠 I-11: Large Hero Image Without Responsive Sizes

The hero image is always 1920×1080 regardless of viewport. On mobile (320px), this wastes ~80% of downloaded pixels.

**Fix:** Use `<picture>` with `srcset` or a responsive image service to serve appropriate sizes.

### 🟠 I-12: Paper Texture SVG Filter on Every Frame

**File:** `src/globals.css:69-75`

```css
.paper-texture {
  background-image: url("data:image/svg+xml,...feTurbulence...");
}
```

The `feTurbulence` SVG filter is computationally expensive. While it's used as a static background (not animated), it can cause jank on low-end devices during scrolling because the browser must re-rasterize the filter.

**Fix:** Pre-render the texture as a small PNG tile and use it as a repeating background.

### 🟡 S-10: No Image Lazy Loading Consolidation

Most images use `loading="lazy"` ✅, but there's no consistent pattern. The hero correctly uses `loading="eager"`, but the Philosophy section's large image also loads eagerly (it's above the fold on most viewports, so this is acceptable but should be verified with Lighthouse).

### 🟡 S-11: Bundle Size Analysis

| Chunk | Size | Gzipped |
|-------|------|---------|
| `react-vendor` | 189.69 KB | 59.69 KB |
| `router-vendor` | 82.63 KB | 26.84 KB |
| `routes` | 33.92 KB | 8.54 KB |
| `ui-vendor` | 33.39 KB | 11.56 KB |
| `index` | 14.52 KB | 4.63 KB |
| CSS | 92.52 KB | 15.77 KB |
| **Total** | **446.67 KB** | **127.03 KB** |

The total gzipped size is reasonable for a modern SPA, but the CSS chunk (92.52 KB) suggests Tailwind is generating many unused utilities. Consider purging more aggressively if the CSS grows.

---

## 6. Accessibility (WCAG 2.1 AA)

### 🔴 C-03: No Skip-to-Content Link

There is no skip navigation link for keyboard users. Users must tab through all navigation links to reach the main content. This is a **WCAG 2.4.1 (Bypass Blocks)** Level A failure.

**Fix:** Add a visually-hidden-until-focused link at the top of the page:
```tsx
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 ...">
  Skip to main content
</a>
```

### 🔴 C-04: Mobile Menu Has No Focus Trap

**File:** `src/components/layout/Navbar.tsx`

When the mobile menu is open:
- Focus is not moved into the menu
- Tab can escape the menu and reach elements behind it
- No `aria-hidden` on the menu when closed
- No `Esc` key handler to close the menu

This violates **WCAG 2.4.3 (Focus Order)** and **2.1.2 (No Keyboard Trap)**.

**Fix:** Implement a focus trap using `inert` on the main content when menu is open, or use a dialog pattern.

### 🔴 C-05: Interactive Elements Not Keyboard Accessible

Multiple interactive-looking elements cannot be operated by keyboard:

| Element | File | Issue |
|---------|------|-------|
| Product cards | `Collection.tsx` | `cursor-pointer` div, no `role`/`tabIndex` |
| Season cards | `Collection.tsx` | Same |
| Fermentation cards | `Collection.tsx` | Same |
| Culture cards | `TeaCulture.tsx` | Same |
| Testimonial cards | `Testimonials.tsx` | Hover effect only |

These fail **WCAG 2.1.1 (Keyboard)** Level A.

### 🔴 C-06: Tab Panel Keyboard Navigation Missing

**File:** `src/components/sections/Collection.tsx`

The tab list uses ARIA roles correctly but lacks the required keyboard interaction pattern:
- Arrow keys don't move between tabs
- `Home`/`End` keys don't jump to first/last tab
- Focus doesn't follow selection

This fails **WCAG 4.1.2 (Name, Role, Value)** for the expected WAI-ARIA Tabs pattern.

### 🟠 I-13: Decorative Images Not Hidden from Screen Readers

**File:** `src/components/sections/Hero.tsx:18-23`

```tsx
<Leaf className="w-16 h-16 text-tea-300 leaf-float" />
```

The floating decorative leaves in the Hero section are not marked with `aria-hidden="true"`. Screen readers will announce "leaf" for each SVG, which is confusing noise.

**Fix:** Add `aria-hidden="true"` to all decorative elements.

### 🟠 I-14: Scroll Indicator Text Too Small

**File:** `src/components/sections/Hero.tsx:66`

```tsx
<span className="text-ivory-400 text-[10px] tracking-[0.2em] uppercase rotate-90 mb-8">
  Scroll
</span>
```

`text-[10px]` (10px) is below the WCAG AA minimum of 12px for text. While this is decorative, it fails contrast and size requirements.

### 🟠 I-15: Focus Indicator May Be Invisible on Dark Backgrounds

**File:** `src/globals.css:58`

```css
:focus-visible {
  outline: 2px solid var(--color-gold-400);
  outline-offset: 2px;
}
```

Gold (`#C5A55A`) on the dark bark footer (`#2A1D14`) has a contrast ratio of ~4.6:1, which passes for large text but may be hard to see for smaller interactive elements. Consider using a lighter outline color on dark sections.

### 🟠 I-16: No Reduced Motion Test Coverage

The CSS correctly includes `@media (prefers-reduced-motion: reduce)` ✅, but there are no tests verifying that animations are actually disabled. The ScrollReveal component adds classes unconditionally — it doesn't check `prefers-reduced-motion`.

**Fix:** In the `IntersectionObserver` callback, check `window.matchMedia('(prefers-reduced-motion: reduce)')` and skip the animation delay if true.

### 🟡 S-12: Image Alt Text Could Be More Descriptive

| Current Alt | Better Alt |
|-------------|-----------|
| `"Tea Garden"` | `"Misty morning at a Yunnan tea garden with rows of tea bushes"` |
| `"Tea Ceremony"` | `"Traditional Chinese gongfu tea ceremony with clay teapot and cups"` |
| `"Tea Leaf Macro"` | `"Close-up of hand-rolled oolong tea leaves showing silver tips"` |
| `"Tea Box"` | `"Monthly tea subscription box with curated selections and tasting journal"` |

---

## 7. UI/UX Aesthetics & Design Quality

### ✅ Design Strengths

The design system is **intentional and distinctive** — not generic AI aesthetic:

- **Color palette** is well-chosen: tea green, warm ivory, terracotta, bark brown, gold accent — all thematically coherent
- **Typography hierarchy** is strong: Playfair Display for headlines creates luxury feel, Inter for body is highly readable
- **Spacing rhythm** is consistent with `py-24 md:py-32` section padding
- **Gold decorative lines** between sections create visual continuity
- **Paper texture** adds tactile quality that reinforces the tea/heritage theme
- **Scroll animations** are tasteful (fade-in-up, not flashy)
- **Frosted glass navbar** is modern and on-brand

### 🟠 I-17: No Skeleton/Loading States for External Images

All images load from `picsum.photos`. While loading, users see:
- Broken layout (image containers collapse or show alt text)
- No skeleton placeholders
- No blur-up previews

**Fix:** Add skeleton loaders or use `placeholder="blur"` with low-res base64 images.

### 🟠 I-18: Mobile Menu Transition Is Instant

**File:** `src/components/layout/Navbar.tsx:72`

```tsx
isMobileMenuOpen ? 'block' : 'hidden'
```

The menu appears/disappears instantly with no transition. This feels jarring compared to the smooth scroll animations elsewhere.

**Fix:** Use `max-h-0 overflow-hidden transition-all duration-300` with `max-h-96` when open.

### 🟠 I-19: Subscription Buttons Have No Loading State

**File:** `src/components/sections/Subscription.tsx:44-49`

```tsx
const handleSubscribe = (planId: string) => {
  const plan = plans.find((p) => p.id === planId)
  if (plan) {
    showToast(`Selected: ${plan.name} — $${plan.price}/mo. Redirecting to checkout...`, 'package')
  }
}
```

Clicking "Subscribe Now" shows a toast but the button remains fully active. There's no visual feedback that something is happening (no disabled state, no spinner, no animation). Users may click multiple times.

### 🟡 S-13: Newsletter Success State Could Be Richer

After subscribing, the only feedback is a text message and toast. Consider:
- Replacing the form with a success illustration
- Showing a "You're in!" animation
- Disabling the form to prevent re-submission

### 🟡 S-14: Testimonials Section Feels Sparse on Desktop

Only 3 testimonials in a 3-column grid. On wide screens, each card is very wide with lots of empty space. Consider:
- Adding 2-3 more testimonials
- Using a carousel/marquee for more content
- Making cards narrower with a max-width

### 🟡 S-15: No Hover/Focus States on Subscription Cards

The subscription cards have `hover:border-gold-400/40` but no focus styles. Keyboard users can't tell which plan they're focused on.

---

## 8. React 19 & TypeScript 6 Patterns

### ✅ Correct Usage

- `useActionState` is properly used for the newsletter form ✅
- `StrictMode` wraps the app ✅
- No `any` types anywhere ✅
- No `enum` or `namespace` usage ✅
- `erasableSyntaxOnly` and `verbatimModuleSyntax` are enabled ✅
- All imports use `@/` prefix ✅
- `import type` used where appropriate (e.g., `type RefObject`) ✅

### 🟠 I-20: Missing `useOptimistic` Opportunities

The subscription buttons could use `useOptimistic` for instant visual feedback before the toast appears. This is a React 19 feature that would enhance perceived responsiveness.

### 🟡 S-16: ErrorBoundary Uses Class Component

**File:** `src/components/shared/ErrorBoundary.tsx`

Class components are still valid for error boundaries (React 19 doesn't have a hook equivalent), but the `handleReset` arrow function property requires `useDefineForClassFields: true` ✅ (which is present). No issue, just noting it.

---

## 9. Tailwind CSS v4 Patterns

### ✅ Correct Usage

- No `tailwind.config.js` — all tokens in `@theme inline` ✅
- Custom `@keyframes` inside `@theme inline` ✅
- Custom utilities in `@layer utilities` ✅
- No double-hyphen negative values (`bottom--24`) ✅
- `@layer base` for global styles ✅
- Reduced motion media query present ✅

### 🟠 I-21: Some Arbitrary Values Still Present

```tsx
// Hero.tsx
className="text-[10px]"  // Should be a design token

// Collection.tsx  
className="text-[10px]"  // Same
```

While these aren't color arbitrary values (which are explicitly banned), font-size arbitrary values bypass the design system. Consider adding a `--text-2xs: 10px` token if 10px is needed.

### 🟡 S-17: Custom Scrollbar Only Targets WebKit

**File:** `src/globals.css:122-134`

The `::-webkit-scrollbar` styles only work in Chrome/Safari. Firefox uses `scrollbar-color` and `scrollbar-width`. Consider adding:

```css
* {
  scrollbar-width: thin;
  scrollbar-color: #C5A55A #FAF6EE;
}
```

---

## 10. Vite 8 / Rolldown Configuration

### ✅ Correct Usage

- `manualChunks` is a function (not object) ✅
- `target: 'es2022'` ✅
- `sourcemap: true` for production ✅
- TanStack Router plugin with `autoCodeSplitting: true` ✅

### 🟡 S-18: `manualChunks` Could Be More Granular

The current chunking strategy groups all of `lucide-react`, `class-variance-authority`, `clsx`, and `tailwind-merge` into `ui-vendor`. If only a few Lucide icons are used, this wastes bundle space. Consider tree-shaking verification.

---

## 11. Testing Coverage

### 🔴 C-07: Only 4 of 16 Components Have Tests

| Component | Has Tests | Tests |
|-----------|-----------|-------|
| Navbar | ✅ | 4 |
| Collection | ✅ | 5 |
| Newsletter | ✅ | 3 |
| Toast | ✅ | 4 |
| Hero | ❌ | 0 |
| Philosophy | ❌ | 0 |
| TeaCulture | ❌ | 0 |
| MacroFeature | ❌ | 0 |
| Subscription | ❌ | 0 |
| Testimonials | ❌ | 0 |
| CTA | ❌ | 0 |
| Footer | ❌ | 0 |
| ScrollReveal | ❌ | 0 |
| BackToTop | ❌ | 0 |
| ErrorBoundary | ❌ | 0 |
| useScrollReveal | ❌ | 0 |

**Coverage: 16/16 tests pass, but only 4/16 components (25%) are tested.**

### 🟠 I-22: No Accessibility Tests

No tests use `@testing-library/jest-dom`'s accessibility matchers or `axe-core` to verify:
- ARIA attributes
- Keyboard navigation
- Focus management
- Color contrast

### 🟠 I-23: No Integration Tests

All tests are unit-level. There are no tests for:
- Navigation flow between sections
- Scroll reveal activation across multiple sections
- Toast appearing after subscription click
- Form submission → toast notification flow

### 🟡 S-19: Tests Mock Router Instead of Testing Integration

All test files mock `@tanstack/react-router`. While this is necessary for unit tests, there should be at least one integration test that renders the full app with the actual router.

### 🟡 S-20: No Visual Regression Testing

No screenshot comparison tests exist. Design changes could break visual consistency without detection.

---

## 12. Missing Features & Gaps

| Category | Missing Feature | Priority |
|----------|----------------|----------|
| E-commerce | Cart, checkout, product detail pages | High (core feature) |
| Search | Tea search/filter functionality | Medium |
| Dark mode | No dark theme tokens | Low |
| i18n | English only (SG brand, no Chinese) | Medium |
| PWA | No service worker, manifest, offline | Low |
| Analytics | No tracking integration | Medium |
| SEO | No OG tags, structured data, sitemap | Medium |
| Forms | No validation library (Zod, React Hook Form) | Low |
| Error handling | No section-level error boundaries | High |
| Loading | No skeleton screens, progress indicators | Medium |
| Images | No responsive `srcset`/`<picture>` | Medium |
| Routing | Only 1 route (no product/about/cart pages) | High |

---

## 13. Summary of Findings

### By Severity

| Severity | Count | Key Items |
|----------|-------|-----------|
| 🔴 Critical | 7 | ScrollReveal leak, skip link, keyboard traps, focus management, test coverage |
| 🟠 Important | 18 | Tab navigation, dynamic Tailwind classes, lazy loading, font loading, error boundaries |
| 🟡 Suggestion | 20+ | Dead code cleanup, alt text, dark mode, responsive images, i18n |

### By Axis

| Axis | Score | Notes |
|------|-------|-------|
| **Correctness** | 7/10 | ScrollReveal timeout leak, mobile menu hidden pattern |
| **Readability** | 8/10 | Clean code, consistent naming, minor complexity in Collection.tsx |
| **Architecture** | 7/10 | Good patterns but no code splitting, single error boundary, dead code |
| **Security** | 9/10 | No vulnerabilities found, proper TypeScript strictness |
| **Performance** | 6/10 | LCP optimization missing, eager loading, no responsive images |
| **Accessibility** | 4/10 | Multiple WCAG 2.1 AA failures: keyboard, focus, ARIA |
| **UI/UX** | 8/10 | Strong design system, tasteful animations, minor polish gaps |
| **Testing** | 4/10 | 25% component coverage, no a11y or integration tests |

### Recommended Priority Order

1. **Fix accessibility issues** (C-03 through C-06) — legal risk + user exclusion
2. **Add section-level error boundaries** (I-07) — resilience
3. **Increase test coverage to 60%+** (C-07) — confidence for changes
4. **Optimize LCP** (C-02) — Core Web Vitals / SEO
5. **Add lazy loading for below-fold sections** (I-09) — perceived performance
6. **Fix ScrollReveal cleanup** (C-01) — correctness
7. **Polish mobile menu transitions** (I-18) — mobile UX
8. **Clean up dead code** (S-02, S-03) — maintainability

---

*Audit conducted using react19-typescript6-vite8-mvp, super-frontend-design, frontend-ui-engineering, and code-review-and-quality skills.*
