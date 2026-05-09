Let me start by reading the required context files.Let me read the existing config files and the skill file.Good - the project has configs but no `src/` directory and no `node_modules`. Let me read the skill file then start building.Now I have full context. Let me build the entire project. Starting with dependency installation and creating the source files.Good, dependencies installed. Now let me create the entire project structure. I'll create all files systematically.Now let me create all the files. Starting with the foundational files:Now let me create the test setup and tests:Now let me try to build and fix any issues:TypeScript compiles clean. Now let me try the build:Build succeeds. Now let me run tests:Two issues to fix: IntersectionObserver not available in jsdom, and duplicate text in Navbar. Let me fix both:There's a stray `}` in setup.ts. Let me fix it:All 15 tests pass. Let me do a final verification of all three checks:Need to fix the test setup for TypeScript strict mode.The mock needs to be a proper constructor. Let me fix it:The tests pass but there are unhandled errors from the mock. Let me fix ScrollReveal to use the ref directly instead of entry.target:All 15 tests pass with zero errors. Let me verify the build:All three verification checks pass. Here's a summary of what was built:

---

## CHA YUAN Tea E-Commerce MVP — Build Complete ✅

### Verification Results
- **`npx tsc --noEmit`** — Zero TypeScript errors ✅
- **`npm run build`** — Production build in 502ms ✅
- **`npx vitest run`** — 15/15 tests passing ✅

### Project Structure
```
src/
├── main.tsx                    # Entry with TanStack Router
├── globals.css                 # Tailwind v4 @theme inline (all design tokens)
├── vite-env.d.ts               # Vite type declarations
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Fixed nav, frosted glass on scroll, mobile hamburger
│   │   └── Footer.tsx          # 4-column footer with social SVG icons
│   ├── sections/
│   │   ├── Hero.tsx            # Full-screen with gradient overlay, floating leaves, scroll indicator
│   │   ├── Philosophy.tsx      # Split layout, 130+ badge, steam animation, 4 value icons
│   │   ├── Collection.tsx      # 3-tab interface (Origin/Fermentation/Season), product cards
│   │   ├── TeaCulture.tsx      # Dark section, 3 overlay cards, temperature guide strip
│   │   ├── MacroFeature.tsx    # Leaf macro image, terroir storytelling
│   │   ├── Subscription.tsx    # 3 pricing cards with toast feedback
│   │   ├── Testimonials.tsx    # 3 quote cards, gold star ratings
│   │   ├── CTA.tsx             # Green bg, store buttons, trust badges
│   │   └── Newsletter.tsx      # useActionState form with validation + toast
│   └── shared/
│       ├── ScrollReveal.tsx    # IntersectionObserver wrapper
│       ├── Toast.tsx           # Auto-dismissing notification (3.5s)
│       └── BackTop.tsx       # Appears after 600px scroll
├── stores/toast.ts             # Zustand toast store
├── hooks/useScrollReveal.ts    # IntersectionObserver hook
├── routes/
│   ├── __root.tsx              # Root layout (Navbar + Outlet + Footer + Toast + BackTop)
│   └── index.tsx               # Home page rendering all 9 sections
├── types/index.ts              # Product, Season, Testimonial, etc.
├── lib/utils.ts                # cn() helper (clsx + tailwind-merge)
└── test/
    ├── setup.ts                # IntersectionObserver mock for jsdom
    └── components/
        ├── Navbar.test.tsx     # 4 tests (logo, links, mobile toggle, close on click)
        ├── Collection.test.tsx # 5 tests (header, default tab, 3 tab switches)
        ├── Newsletter.test.tsx # 3 tests (form, heading, submission confirmation)
        └── Toast.test.tsx      # 3 tests (hidden, visible, auto-dismiss)
```

### Key Technical Decisions
- **Tailwind v4 CSS-first config** — all tokens in `globals.css` `@theme inline` (no tailwind.config.js)
- **Function-form manualChunks** in vite.config.ts (Roldown-compatible)
- **React 19 `useActionState`** for newsletter form
- **Lucide React icons** throughout (SVG inline for social media icons)
- **Zustand** for toast state management
- **No `any` types** — strict TypeScript 6 with `erasableSyntaxOnly`
- **Single-hyphen negative values** (e.g., `-bottom-6`)
- **All animations respect `prefers-reduced-motion`**
- **Mobile-first responsive design** matching the mockup exactly
- **Picsum.photos** with seed URLs for placeholder images (same seeds as mockup)
- **Google Fonts** loaded index.html (Playfair Display, Inter, Noto Serif)

---

README.md created at `/root/.openclaw/workspace/tea-culture-mvp/README.md`. Here's what it covers per the skill's conventions:

**Sections included:**
- **Title + Badges** — React 19, TS 6, Vite 8, Tailwind 4.2, 15 tests passing, 502ms build
- **Overview** — what/why/how in 3 sentences
- **Features** — 10 implemented features with emoji table
- **Tech Stack** — version-pinned table matching package.json
- **Quick Start** — copy-pasteable install + verify commands
- **Design System** — color tokens, typography, animation names (all from the actual globals.css)
- **Architecture** — annotated file tree + key patterns
- **Testing** — commands + per-component test breakdown
- **Project Status** — all 6 phases complete
- **Troubleshooting** — 6 real gotchas encountered during build (Tailwind v4 double-hyphen, Vite 8 manualChunks, TS erasableSyntaxOnly, etc.)

**Sections skipped** (per skill rules — no applicable content):
- Environment Variables (none needed)
- Deployment (no production config)
- Contributing (private project)
- API Reference (no API)
