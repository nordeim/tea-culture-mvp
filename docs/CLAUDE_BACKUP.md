---
IMPORTANT: File is read fresh for every conversation. Be brief and practical.
---

# 茶源 CHA YUAN — Premium Tea E-Commerce

A premium tea e-commerce single-page application for a Singapore-based heritage tea brand. Built with React 19, TypeScript 6, Vite 8 (Rolldown), and Tailwind CSS v4.

**Tech Stack**: React 19 + TypeScript 6 + Vite 8 (Rolldown) + Tailwind CSS v4 + TanStack Router + Zustand + Lucide React + Vitest

---

## Core Identity & Purpose

This is a marketing landing page for CHA YUAN, a premium tea house with 130+ years of heritage. The site educates visitors on tea origins, fermentation, and ceremony while driving subscription conversions through a 10-section immersive experience with scroll animations and interactive product browsing.

The codebase emphasizes **aesthetic precision**, **TypeScript strictness**, **CSS-first design tokens**, and **performance-conscious bundling**. Every implementation decision must align with the brand's luxury positioning and the Anti-Generic design philosophy.

---

## Foundational Principles

### Meticulous Approach (Six-Phase Workflow)

Follow this six-phase workflow for all implementation tasks:

1. **ANALYZE** — Deep, multi-dimensional requirement mining
   - Never make surface-level assumptions
   - Identify explicit requirements, implicit needs, and potential ambiguities
   - Explore multiple solution approaches; evaluate against technical feasibility and project goals
   - Perform risk assessment with mitigation strategies

2. **PLAN** — Structured execution roadmap
   - Create a detailed plan with sequential phases, integrated checklists, and validation checkpoints
   - Present the plan for explicit user confirmation before writing any code
   - Never proceed to implementation without validation

3. **VALIDATE** — Explicit confirmation checkpoint
   - Obtain explicit user approval of the plan before implementation
   - Address any concerns or requested modifications

4. **IMPLEMENT** — Modular, tested, documented builds
   - Set up proper environment, dependencies, and configurations
   - Implement in logical, testable components; practice continuous testing
   - Create clear, comprehensive documentation alongside code

5. **VERIFY** — Rigorous QA against success criteria
   - Execute comprehensive testing; fix all test failures
   - Review code for best practices, security, and performance
   - Confirm solution meets all requirements and success criteria

6. **DELIVER** — Complete handoff with knowledge transfer
   - Provide complete solution with clear usage instructions
   - Document challenges encountered and solutions implemented
   - Suggest potential improvements, next steps, and maintenance considerations

### Anti-Generic Design Philosophy

- **Rejection of Safety**: No predictable Bootstrap-style grids; no safe font pairings without distinct typographical hierarchy
- **Intentional Minimalism**: Use whitespace as a structural element, not just empty space
- **Deep Reasoning**: Analyze psychological impact, rendering performance, and codebase scalability before writing code

---

## Implementation Standards

### General Coding Practices
- **Early Returns**: Prefer early returns over deeply nested conditionals
- **Composition over Inheritance**: Favor composition patterns
- **Self-Documenting Code**: Clear naming and structure; minimal comments
- **Test-Driven Development**: Follow Red-Green-Refactor cycle when implementing logic

### TypeScript 6 — Strict Constraints

`tsconfig.json` enforces the following. The build **will fail** if these are violated:

| Rule | Constraint | What to use instead |
|---|---|---|
| `strict` | `true` | Full strict mode |
| `erasableSyntaxOnly` | Enabled | Only erasable syntax allowed (no `enum`, no `namespace`, no `private` fields) |
| `verbatimModuleSyntax` | Enabled | Use `import type` for type-only imports |
| `noUnusedLocals` | `true` | Remove or prefix with `_` |
| `noUnusedParameters` | `true` | Remove or prefix with `_` |
| `noFallthroughCasesInSwitch` | `true` | Explicit handling |

**NEVER use `any`** — use `unknown` or proper types. **NEVER use `enum`** — use union types instead (`'idle' | 'success' | 'error'`).

### React 19 Specifics
- **Server/Client distinction**: This is a SPA; all components are client-side by default
- **`useActionState` for forms**: Newsletter form uses `useActionState` (not `useState` + `onSubmit`)
- **Handle all UI states**: loading, error, empty, success on every data-dependent component
- **Show loading state ONLY when no data exists**
- **Disable buttons during async operations** and show loading indicators
- **Always implement `onError` handler** with user feedback
- **Reduced motion**: All animations respect `prefers-reduced-motion`

### Tailwind CSS v4 — CSS-First Configuration

- **NO `tailwind.config.js`** — all design tokens live in `src/globals.css` inside `@theme inline`
- **No arbitrary Tailwind values** like `bg-[#FAF8F5]` — extend `@theme inline` instead
- **Negative utilities**: use single hyphen `-bottom-24`, NOT `bottom--24` (double hyphen is a literal token, silently ignored)
- Custom animations defined in `@theme inline` with `@keyframes`
- Custom utilities in `@layer utilities` (`.paper-texture`, `.gold-line`, `.reveal`, `.steam`)

### Vite 8 / Rolldown Bundling
- **`manualChunks` must be a function**, not an object:
  ```ts
  // ✅ Correct
  manualChunks: (id: string) => {
    if (id.includes('react')) return 'react-vendor'
  }
  // ❌ Wrong — silently fails
  manualChunks: { 'react-vendor': ['react', 'react-dom'] }
  ```
- Target: `es2022`
- Source maps enabled in production

### Path Aliases
Use `@/` prefix in **all** imports:

| Alias | Maps to |
|---|---|
| `@/*` | `./src/*` |
| `@components/*` | `./src/components/*` |
| `@hooks/*` | `./src/hooks/*` |
| `@lib/*` | `./src/lib/*` |
| `@routes/*` | `./src/routes/*` |
| `@stores/*` | `./src/stores/*` |

Example: `import { cn } from '@/lib/utils'`

### Component Architecture
```
components/
├── layout/     # Navbar (frosted glass on scroll), Footer (4-column)
├── sections/   # 10 landing page sections (Hero → Newsletter)
└── shared/     # ScrollReveal, Toast, BackToTop, ErrorBoundary
```

- **ScrollReveal**: Wraps content with `reveal` class, adds `active` on IntersectionObserver intersection
- **Toast**: Zustand-powered, auto-dismisses after 3.5s
- **Navbar**: Transparent on load → `bg-ivory-50/95 backdrop-blur-xl` when scroll > 80px
- **Social icons**: Inline SVG (Lucide lacks brand icons)

---

## Development Workflow

### Environment Setup
```bash
npm install --legacy-peer-deps    # Peer dependency conflicts require this flag
```

### Build & Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server at `localhost:5173` |
| `npm run build` | TypeScript check + Vite production build |
| `npm run preview` | Preview production build locally |
| `npm test` | Vitest in watch mode |
| `npx tsc --noEmit` | TypeScript type check only |
| `npx vitest run` | Run all tests once (15 tests) |
| `npx tsr generate` | Regenerate `src/routeTree.gen.ts` after route file changes |

**Required verification order**: `npx tsc --noEmit` → `npm run build` → `npx vitest run`

### TanStack Router
- File-based routing in `src/routes/`
- **Run `npx tsr generate` after every route file change** — do NOT edit `src/routeTree.gen.ts` manually
- Root layout: `src/routes/__root.tsx`
- Home page: `src/routes/index.tsx`
- Route tree is auto-generated

---

## Testing Strategy

### Test Stack
- **Vitest** with `jsdom` environment and `globals: true`
- **Testing Library** (`@testing-library/react`, `jest-dom` matchers)
- **Setup file**: `src/test/setup.ts` — mocks `IntersectionObserver` and `window.scrollTo`
- **Test files**: `src/test/components/*.test.tsx`

### Test Coverage (15 tests across 4 files)

| Component | Tests | What's Tested |
|---|---|---|
| Navbar | 4 | Logo render, desktop links, mobile toggle, close-on-click |
| Collection | 5 | Section header, default tab, 3 tab switches |
| Newsletter | 3 | Form render, heading, submission confirmation |
| Toast | 3 | Hidden by default, visible on show, auto-dismiss (3.5s) |

### Mocking Conventions
- Mock TanStack Router in tests: `vi.mock('@tanstack/react-router', ...)`
- Wrap Zustand state updates in `act()` in tests
- `IntersectionObserver` and `window.scrollTo` are pre-mocked in `src/test/setup.ts`

### Test Commands
```bash
npx vitest run          # Run once
npm test                # Watch mode
npx vitest run --coverage  # With coverage
```

---

## Code Quality Standards

### Linting & Formatting
- ESLint with `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- Tailwind CSS IntelliSense / valid class checking via `@tailwindcss/vite`
- TypeScript strict mode enforces correctness at the compiler level

### Pre-Commit Verification
Before committing or claiming completion, run:
```bash
npx tsc --noEmit && npx vitest run && npm run build
```
All three must pass. Zero TypeScript errors, zero test failures, zero build warnings.

---

## Git & Version Control

### Branching Strategy
- Feature branches: `feature/description`
- Bug fixes: `fix/description`
- Keep branches short-lived (merge within 1–3 days)

### Commit Standards
- Follow Conventional Commits format
- Atomic commits (one logical change per commit)

---

## Error Handling & Debugging

### Error Handling Approach
- **`ErrorBoundary`** (src/components/shared/ErrorBoundary.tsx) wraps the entire app in `main.tsx`
- All async operations must have `try/catch` or `.catch()` with user-facing feedback
- Toast notifications provide non-blocking user feedback via Zustand store
- Anticipate failures; graceful recovery; user-friendly messages

### Debugging Tools
- Vite HMR for instant feedback during development
- React DevTools for component inspection
- Vitest `--reporter=verbose` for detailed test output
- `npx tsc --noEmit` for fast type-level bug detection

### Common Gotchas
- **`bottom--24` silently fails** → use `-bottom-24`
- **`manualChunks` object silently fails** → must be a function
- **`enum` is a build error** → use union types
- **`inert` prop TS error** → pass boolean `inert={!isOpen}` not string
- **Route tree out of sync** → run `npx tsr generate`

---

## Communication & Documentation

### Documentation Standards
- Explain "why", not just "what"
- Document assumptions and constraints
- Keep AGENTS.md and CLAUDE.md in sync when any convention changes

### When to Update AGENTS.md / CLAUDE.md
- Adding new path aliases
- Changing build scripts or commands
- Adding new framework-specific rules
- Modifying design tokens or Tailwind patterns
- Changing testing conventions

---

## Project-Specific Standards

### State Management
- **Zustand** for global toast notifications (`src/stores/toast.ts`)
- **Selector pattern**: `useToastStore(s => s.showToast)` — never `.getState()` in JSX
- **React 19 `useActionState`** for newsletter form state (not `useState` + `onSubmit`)

### Design Tokens (Reference)

| Token | Hex | Role |
|---|---|---|
| `tea-500` | `#5C8A4D` | Primary accent — nature, freshness |
| `ivory-100` | `#FAF6EE` | Background — warmth, paper texture |
| `terra-400` | `#C4724B` | Secondary accent — earthiness |
| `bark-800` | `#3D2B1F` | Text primary — authority, heritage |
| `gold-400` | `#C5A55A` | Signature accent — luxury, ceremony |

### Typography
- **Display**: Playfair Display (headlines, hero, prices)
- **Body**: Inter (body copy, navigation, labels)
- **Serif**: Noto Serif (testimonials, accent)
- Fonts loaded in `index.html`

### Animations
- `fade-in-up` (800ms): Hero content stagger, section reveals
- `fade-in` (1000ms): Scroll indicator
- `leaf-float` (4s ∞): Floating decorative leaves
- `steam-rise` (2.5s ∞): Steam effect
- All animations respect `prefers-reduced-motion`

### File Organization
```
src/
├── components/
│   ├── layout/      # Navbar, Footer
│   ├── sections/    # Hero, Philosophy, Collection, TeaCulture,
│   │              #   MacroFeature, Subscription, Testimonials,
│   │              #   CTA, Newsletter (10 sections total)
│   └── shared/      # ScrollReveal, Toast, BackToTop, ErrorBoundary
├── routes/          # __root.tsx, index.tsx
├── stores/          # Zustand toast store
├── hooks/           # useScrollReveal (IntersectionObserver)
├── lib/             # cn() helper (clsx + tailwind-merge)
├── types/           # Product, Season, Testimonial interfaces
├── test/            # Vitest setup + component tests
├── globals.css      # Tailwind v4 @theme (colors, fonts, animations)
└── main.tsx         # Entry with RouterProvider + ErrorBoundary
```

---

## Success Metrics

You are successful when:
- `npx tsc --noEmit` reports **zero errors**
- `npx vitest run` reports **15/15 tests passing**
- `npm run build` completes in **< 1s** with zero warnings
- Design tokens remain consistent across all components
- All scroll animations and toast interactions work correctly
- Mobile responsive from 320px to 1440px

---

## System Integration

### Available Tools
- **bash**: Terminal operations, npm commands
- **read**: File reading, image inspection
- **edit**: Exact string replacements
- **write**: File creation/overwriting

### Key Paths
- Entry: `src/main.tsx`
- Routes: `src/routes/`
- Components: `src/components/`
- Tests: `src/test/`
- Styles: `src/globals.css`
- Types: `src/types/index.ts`

---

## Anti-Patterns to Avoid

| Anti-Pattern | Why | Correct Approach |
|---|---|---|
| `any` in TypeScript | Breaks strict mode, erodes type safety | Use `unknown` or proper types |
| `enum` | `erasableSyntaxOnly` rejects it | Union types: `'idle' \| 'success'` |
| Manual `tailwind.config.js` | Tailwind v4 is CSS-first | Use `@theme inline` in `globals.css` |
| Arbitrary Tailwind values `bg-[#FAF8F5]` | Bypasses design system | Extend `@theme inline` tokens |
| `manualChunks` as object | Silently fails in Vite 8 / Rolldown | Function form only |
| `bottom--24` (double hyphen) | Literal token, ignored | `-bottom-24` (single hyphen) |
| `.getState()` in JSX | Bypasses React reactivity | Zustand selector pattern |
| `useState` + `onSubmit` for forms | Not leveraging React 19 | `useActionState` |
| Editing `routeTree.gen.ts` | Auto-generated, will be overwritten | Run `npx tsr generate` |
| Skipping verification order | Type/build/test can diverge | Always `tsc` → `build` → `vitest` |

---

## Continuous Improvement

After each task:
1. Reflect on what worked and what could improve
2. Identify new patterns that could be applied to future tasks
3. Consider further optimization
4. Update this CLAUDE.md if conventions evolve

### When Frameworks Update
- React 19 → future versions: Update `useActionState` / `useFormStatus` patterns
- Vite 8 → future versions: Verify `manualChunks` behavior
- Tailwind v4 → future versions: CSS-first config remains; tokens may expand
- TypeScript 6 → future versions: Evaluate new strict flags
