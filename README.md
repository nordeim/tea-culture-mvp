# 茶源 CHA YUAN — Premium Tea E-Commerce

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2-06B6D4?logo=tailwindcss&logoColor=white)
![Tests](https://img.shields.io/badge/Tests-15%20passing-22C55E)
![Build](https://img.shields.io/badge/Build-502ms-22C55E)

A premium tea e-commerce landing page for a Singapore-based heritage tea brand. Built with React 19, TypeScript 6, Vite 8 (Rolldown), and Tailwind CSS v4 — faithful to a hand-crafted HTML mockup with 10 distinct sections, scroll animations, and interactive product browsing.

## Overview

**What:** A single-page marketing site for CHA YUAN, a premium tea house with 130+ years of heritage.

**Why:** Eastern tea culture meets contemporary web design. The site educates visitors on tea origins, fermentation, and ceremony while driving subscription conversions.

**How:** A component-driven React app using TanStack Router for file-based routing, Zustand for toast notifications, React 19's `useActionState` for form handling, and a Tailwind v4 CSS-first theme system with custom design tokens.

## Features

| | Feature | Description |
|---|---|---|
| 🏠 | **10-Section Landing Page** | Hero, Philosophy, Collection, Tea Culture, Macro Feature, Subscription, Testimonials, CTA, Newsletter, Footer |
| 🍃 | **3-Tab Product Browser** | Browse teas by Origin, Fermentation level, or Season with smooth tab switching |
| 💳 | **3-Tier Subscription Plans** | Discovery ($29), Connoisseur ($49), Master's Reserve ($79) with toast feedback |
| 📱 | **Mobile-First Responsive** | Hamburger nav, stacked layouts, touch-optimized from 320px to 1440px |
| ✨ | **Scroll Reveal Animations** | IntersectionObserver-driven fade-in-up reveals across all sections |
| 🧊 | **Frosted Glass Navbar** | Transparent on load, transitions to backdrop-blur on scroll |
| 📧 | **Newsletter Form** | React 19 `useActionState` with inline validation and confirmation |
| 🔔 | **Toast Notifications** | Zustand-powered auto-dismissing notifications (3.5s) |
| ♿ | **Keyboard Accessible** | Focus-visible outlines, semantic HTML, ARIA labels on interactive elements |
| 🎭 | **Reduced Motion Support** | All animations respect `prefers-reduced-motion` |

## Tech Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| Framework | React | ^19.2 | Concurrent features, `useActionState` |
| Language | TypeScript | ^6.0 | Strict mode, `erasableSyntaxOnly`, no `any` |
| Build | Vite | ^8.0 | Rolldown engine, HMR, production bundling |
| Styling | Tailwind CSS | ^4.2 | CSS-first `@theme inline`, no config file |
| Router | TanStack Router | ^1.169 | File-based, type-safe routing |
| State | Zustand | ^5.0 | Lightweight toast store |
| Icons | Lucide React | ^1.14 | SVG icon set |
| Testing | Vitest | ^4.1 | Unit + behavioral tests (jsdom) |
| Testing | Testing Library | ^16.3 | React component testing |
| Styling | clsx + tailwind-merge | Latest | Conditional class composition |

## Quick Start

**Prerequisites:** Node.js ≥ 20

```bash
# 1. Clone and install
git clone <repo-url> && cd tea-culture-mvp
npm install --legacy-peer-deps

# 2. Start development server
npm run dev

# 3. Open http://localhost:5173
```

### Verify Setup

```bash
# Type check — expect zero errors
npx tsc --noEmit

# Build — expect < 1s
npm run build

# Tests — expect 15/15 passing
npx vitest run
```

## Design System

### Color Palette

| Token | Hex | Role |
|---|---|---|
| `tea-500` | `#5C8A4D` | Primary accent — nature, freshness |
| `ivory-100` | `#FAF6EE` | Background — warmth, paper texture |
| `terra-400` | `#C4724B` | Secondary accent — earthiness, fermentation |
| `bark-800` | `#3D2B1F` | Text primary — authority, heritage |
| `gold-400` | `#C5A55A` | Signature accent — luxury, ceremony |

### Typography

| Role | Font | Weights | Usage |
|---|---|---|---|
| Display | Playfair Display | 400–700 | Headlines, hero text, prices |
| Body | Inter | 300–600 | Body copy, navigation, labels |
| Serif | Noto Serif | 400–600 | Testimonials, accent text |

### Animations

| Name | Duration | Usage |
|---|---|---|
| `fade-in-up` | 800ms | Hero content stagger, section reveals |
| `fade-in` | 1000ms | Scroll indicator |
| `leaf-float` | 4s ∞ | Floating decorative leaves |
| `steam-rise` | 2.5s ∞ | Steam effect on ceremony image |

## Architecture

```
src/
├── 📂 components/
│   ├── 📂 layout/           # Navbar (fixed, frosted glass), Footer (4-column)
│   ├── 📂 sections/         # 9 page sections (Hero → Newsletter)
│   └── 📂 shared/           # ScrollReveal, Toast, BackToTop
├── 📂 routes/               # TanStack file-based routing
│   ├── __root.tsx           # Root layout (Navbar + Outlet + Footer)
│   └── index.tsx            # Home — renders all sections
├── 📂 stores/               # Zustand toast store
├── 📂 hooks/                # useScrollReveal (IntersectionObserver)
├── 📂 lib/                  # cn() helper (clsx + tailwind-merge)
├── 📂 types/                # Product, Season, Testimonial interfaces
├── 📂 test/                 # Vitest setup + component tests
├── globals.css              # Tailwind v4 @theme (colors, fonts, animations)
└── main.tsx                 # Entry — RouterProvider
```

### Key Patterns

- **CSS-first theming** — all design tokens defined in `globals.css` `@theme inline`, no `tailwind.config.js`
- **Function-form `manualChunks`** — Vite 8 / Rolldown requires function, not object
- **React 19 `useActionState`** — newsletter form with async validation
- **Zustand selector pattern** — `useToastStore(s => s.showToast)` for re-render optimization

## Testing

```bash
# Run all tests
npx vitest run

# Watch mode
npm test

# With coverage
npx vitest run --coverage
```

### Test Coverage

| Component | Tests | What's Tested |
|---|---|---|
| Navbar | 4 | Logo render, desktop links, mobile toggle, close-on-click |
| Collection | 5 | Section header, default tab, 3 tab switches |
| Newsletter | 3 | Form render, heading, submission confirmation |
| Toast | 3 | Hidden by default, visible on show, auto-dismiss (3.5s) |
| **Total** | **15** | **All passing** |

## Project Status

| Phase | Status | Deliverables |
|---|---|---|
| Phase 1: Analyze | ✅ | Design intent, color system, typography, page structure |
| Phase 2: Plan | ✅ | Project structure, implementation order, risk assessment |
| Phase 3: Validate | ✅ | Design decisions confirmed |
| Phase 4: Implement | ✅ | Full source — 29 files, ~2000 lines |
| Phase 5: Verify | ✅ | TSC clean, build 502ms, 15/15 tests |
| Phase 6: Deliver | ✅ | Production-ready build |

## Troubleshooting

| Issue | Solution |
|---|---|
| `npm install` fails with peer dep conflicts | Use `npm install --legacy-peer-deps` |
| `bottom--24` doesn't work in Tailwind v4 | Use `-bottom-24` (single hyphene — double hyphen is a literal token) |
| `manualChunks` object form fails in Vite 8 | Must use function form: `manualChunks: (id) => { ... }` |
| `enum` rejected by TypeScript | `erasableSyntaxOnly` disallows enums — use union types instead |
| `inert` prop TypeScript error | `inert` is a boolean prop, not string — use `inert={!isOpen}` |
| IntersectionObserver undefined in tests | Mock in `src/test/setup.ts` (see file for implementation) |

## License

Private — all rights reserved.
