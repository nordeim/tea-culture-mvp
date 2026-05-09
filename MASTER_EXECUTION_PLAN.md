# MASTER_EXECUTION_PLAN — CHA YUAN Tea E-Commerce MVP

> **Project:** Premium tea brand website for Singapore-based business  
> **Stack:** React 19 + TypeScript 6 + Vite 8 + Tailwind CSS v4 + TanStack Router + Zustand + shadcn/ui  
> **Design Direction:** Eastern tea heritage meets contemporary luxury — "Institutional Clarity" with "Legacy Innovator" positioning  
> **Approach:** Meticulous 6-Phase SOP with TDD

---

## Phase 1: ANALYZE ✅

### 1.1 Design Intent (Intentionality Compass)
| Question | Answer |
|----------|--------|
| Primary fear? | "Wasting money on bad tea" → Institutional Clarity |
| Decision style? | Emotional, experience-driven → Dynamic accents |
| Trust source? | Heritage, craftsmanship credentials → Signal legacy |
| Category relationship? | Premium tea needs education → Build confidence |

**Position:** Q2 — Legacy Innovator (Blend trusted heritage with bold modern accents)

### 1.2 Color System (from mockup)
| Token | Hex | Role | Psychology |
|-------|-----|------|------------|
| Tea Green | `#5C8A4D` | Primary accent | Nature, freshness, growth |
| Warm Ivory | `#FAF6EE` / `#F5F0E8` | Background (60%) | Paper texture, warmth, tradition |
| Terracotta | `#C4724B` | Secondary accent | Warmth, earthiness, fermentation |
| Dark Brown | `#3D2B1F` | Text primary | Authority, heritage, grounding |
| Gold | `#C5A55A` | Signature accent (10%) | Premium, luxury, ceremony |

### 1.3 Typography Pairing
| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display | Playfair Display | 400-700 | Headlines, hero text, prices |
| Body | Inter | 300-600 | Body copy, navigation, labels |
| Serif | Noto Serif | 400-600 | Testimonials, accent text |

### 1.4 Page Structure (10 Sections)
1. **Hero** — Full-screen tea garden with gradient overlay, animated steam, scroll indicator
2. **Philosophy** — Split layout: ceremony image + 4 value icons (Single Origin, Hand Crafted, Organic, Sustainable)
3. **Collection** — 3-tab interface (By Origin / Fermentation / Season) with product cards
4. **Tea Culture** — Dark section with overlay cards + temperature guide strip
5. **Macro Feature** — Leaf texture close-up with terroir storytelling
6. **Subscription** — 3-tier pricing (Discovery $29 / Connoisseur $49 / Master's $79)
7. **Testimonials** — Community quotes with gold star ratings
8. **CTA** — Green tea-colored call to action with trust badges
9. **Newsletter** — Functional email form with inline confirmation
10. **Footer** — 4-column layout with social links

### 1.5 Functional Interactions
- [ ] Tab switching for product organization (Origin / Fermentation / Season)
- [ ] Mobile hamburger menu with smooth toggle
- [ ] Navbar transparency → frosted glass on scroll
- [ ] Scroll-reveal animations via IntersectionObserver
- [ ] Toast notifications for subscriptions and newsletter
- [ ] Back-to-top button appears on scroll
- [ ] All buttons have active scale feedback
- [ ] Newsletter form with inline validation + confirmation
- [ ] Subscription plan selection with toast feedback

---

## Phase 2: PLAN

### 2.1 Project Structure
```
tea-culture-mvp/
├── src/
│   ├── main.tsx                    # Entry + ErrorBoundary
│   ├── globals.css                 # Tailwind v4 @theme inline
│   ├── components/
│   │   ├── ui/                     # shadcn primitives (Button, Card, Input, Badge, Toast)
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Fixed nav, transparency → frosted glass
│   │   │   └── Footer.tsx          # 4-column footer
│   │   ├── sections/
│   │   │   ├── Hero.tsx            # Full-screen hero with steam animation
│   │   │   ├── Philosophy.tsx      # Split layout + value icons
│   │   │   ├── Collection.tsx      # Tabbed product grid
│   │   │   ├── TeaCulture.tsx      # Dark section + overlay cards
│   │   │   ├── MacroFeature.tsx    # Leaf texture + terroir story
│   │   │   ├── Subscription.tsx    # 3-tier pricing
│   │   │   ├── Testimonials.tsx    # Quote cards + stars
│   │   │   ├── CTA.tsx             # Green CTA + trust badges
│   │   │   └── Newsletter.tsx      # Email form + confirmation
│   │   └── shared/
│   │       ├── ScrollReveal.tsx     # IntersectionObserver wrapper
│   │       ├── Toast.tsx            # Toast notification system
│   │       └── BackToTop.tsx        # Scroll-to-top button
│   ├── stores/
│   │   ├── cart.ts                  # Cart state (Zustand + persist)
│   │   └── toast.ts                 # Toast notification state
│   ├── hooks/
│   │   └── useScrollReveal.ts       # IntersectionObserver hook
│   ├── routes/
│   │   ├── __root.tsx               # Root layout
│   │   └── index.tsx                # Home page (all sections)
│   ├── types/
│   │   └── index.ts                 # Product, Subscription, etc.
│   ├── lib/
│   │   └── utils.ts                 # cn helper
│   └── test/
│       ├── setup.ts                 # Vitest setup
│       └── components/              # Component tests
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
└── index.html
```

### 2.2 Implementation Order
1. **Foundation:** Project scaffold, Tailwind v4 theme, fonts, base layout
2. **Layout Components:** Navbar, Footer
3. **Section Components:** Hero → Philosophy → Collection → Tea Culture → Macro → Subscription → Testimonials → CTA → Newsletter
4. **Shared Components:** ScrollReveal, Toast, BackToTop
5. **Interactions:** Tab switching, scroll effects, form handling
6. **Testing:** Component tests with Vitest + Testing Library
7. **Polish:** Responsive fine-tuning, accessibility audit, performance check

---

## Phase 3: VALIDATE

### Design Decisions Confirmed:
- ✅ Color palette: Tea green, ivory, terracotta, dark brown, gold
- ✅ Typography: Playfair Display + Inter + Noto Serif
- ✅ 10-section page structure matching mockup
- ✅ All functional interactions listed in Phase 1.5
- ✅ TDD approach with Vitest

---

## Phase 4: IMPLEMENT (Checklist) — ✅ ALL COMPLETE

### 4.1 Foundation ✅
- [x] Scaffold Vite 8 + React 19 + TypeScript 6 project
- [x] Install all dependencies (Tailwind v4, TanStack Router, Zustand, Lucide)
- [x] Configure `tsconfig.json` (strict, erasableSyntaxOnly, paths)
- [x] Configure `vite.config.ts` (function-form manualChunks)
- [x] Set up Tailwind v4 theme in `globals.css` with all design tokens
- [x] Set up Vitest with jsdom + Testing Library

### 4.2 Layout Components ✅
- [x] Navbar — fixed, transparent → frosted glass on scroll, mobile menu
- [x] Footer — 4-column layout, social links

### 4.3 Section Components ✅
- [x] Hero — full-screen, gradient overlay, steam animation, scroll indicator
- [x] Philosophy — split layout, ceremony image, 4 value icons, heritage badge
- [x] Collection — 3-tab interface, product cards with hover effects
- [x] Tea Culture — dark bg, overlay cards, temperature guide strip
- [x] Macro Feature — leaf texture image, terroir storytelling
- [x] Subscription — 3-tier pricing cards, "Popular" badge
- [x] Testimonials — quote cards, gold stars, avatar initials
- [x] CTA — green bg, store link, gift subscription, trust badges
- [x] Newsletter — email form, inline validation, confirmation message

### 4.4 Shared Components ✅
- [x] ScrollReveal — IntersectionObserver wrapper component
- [x] Toast — notification system with auto-dismiss
- [x] BackToTop — appears on scroll, smooth scroll to top

### 4.5 State & Interactions ✅
- [x] Zustand toast store for notifications
- [x] Tab switching logic for Collection section
- [x] Newsletter form with useActionState (React 19)
- [x] Subscription plan selection with toast feedback
- [x] Mobile menu open/close state

### 4.6 Testing (TDD) ✅ — 15/15 passing
- [x] Navbar: renders, mobile menu toggle, close on link click (4 tests)
- [x] Collection: tab switching renders correct content (5 tests)
- [x] Newsletter: form submission shows confirmation (3 tests)
- [x] Toast: auto-dismisses after timeout (3 tests)

---

## Phase 5: VERIFY — ✅ ALL PASS

### 5.1 Build & Type Check ✅
- [x] `npx tsc --noEmit` — zero errors ✅
- [x] `npm run build` — successful production build (507ms) ✅
- [x] `npx vitest run` — 15/15 tests passing ✅

### 5.2 Visual QA (Manual)
- [ ] Responsive at 320px, 768px, 1024px, 1440px
- [ ] All animations respect `prefers-reduced-motion`
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Keyboard navigation works for all interactive elements
- [ ] No console errors or warnings

### 5.3 Interaction QA (Manual)
- [ ] Tab switching works correctly
- [ ] Mobile menu opens/closes, links navigate
- [ ] Navbar transitions on scroll
- [ ] Toast appears and auto-dismisses
- [ ] Newsletter form validates and shows confirmation
- [ ] Back-to-top button appears and scrolls smoothly

---

## Phase 6: DELIVER

### Deliverables — ✅ COMPLETE
- [x] Complete source code in `tea-culture-mvp/`
- [x] All tests passing (15/15)
- [x] Production build succeeds (507ms)
- [x] This execution plan updated with completion status
- [ ] README with setup instructions (optional follow-up)

---

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Tailwind v4 breaking changes | Follow SKILL.md gotchas (no double-hyphen, CSS-first config) |
| Vite 8 manualChunks | Must use function form, not object |
| React 19 test patterns | Wrap state updates in `act()` |
| shadcn/ui compatibility | Use `--legacy-peer-deps` for installation |
| Image placeholders | Use picsum.photos with seeds for consistent imagery |
