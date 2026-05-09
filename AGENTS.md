# AGENTS.md — CHA YUAN Tea E-Commerce

## Commands

```bash
npm install --legacy-peer-deps     # Install (peer dep conflicts require flag)
npm run dev                        # Dev server at localhost:5173
npm run build                      # tsc + vite build (< 1s via Rolldown)
npx tsc --noEmit                   # Type check only
npx vitest run                     # Run tests once (15 tests)
npm test                           # Vitest watch mode
npx tsr generate                   # Regenerate route tree after route file changes
```

**Required verification order:** `npx tsc --noEmit` → `npm run build` → `npx vitest run`

## Stack

React 19 + TypeScript 6 + Vite 8 (Rolldown) + Tailwind CSS v4 + TanStack Router + Zustand + Lucide React

## TypeScript — Strict Constraints

| Rule | What to use instead |
|---|---|
| No `any` | `unknown` or proper types |
| No `enum` | Union types (`'idle' \| 'success' \| 'error'`) |
| No `namespace` | ES modules |
| No `private` keyword in test files | Use `_` prefix or public properties |
| `erasableSyntaxOnly` enabled | Only erasable syntax allowed |
| `verbatimModuleSyntax` enabled | Use `import type` for type-only imports |
| `noUnusedLocals` / `noUnusedParameters` | Remove or prefix with `_` |

## Tailwind v4 — CSS-First Config

- **No `tailwind.config.js`** — all tokens in `src/globals.css` `@theme inline`
- **No arbitrary values** like `bg-[#FAF8F5]` — extend `@theme` instead
- **Negative values:** use single hyphen `-bottom-24`, NOT `bottom--24` (double hyphen is a literal token, silently ignored)
- Custom animations defined in `@theme inline` with `@keyframes`
- Custom utilities in `@layer utilities` (`.paper-texture`, `.gold-line`, `.reveal`, `.steam`)

## Vite 8 / Rolldown Gotcha

`manualChunks` in `vite.config.ts` **must be a function**, not an object:

```ts
// ✅ Correct
manualChunks: (id: string) => { if (id.includes('react')) return 'react-vendor' }

// ❌ Wrong — silently fails
manualChunks: { 'react-vendor': ['react', 'react-dom'] }
```

## TanStack Router

- File-based routing in `src/routes/`
- **Run `npx tsr generate` after every route file change** — regenerates `src/routeTree.gen.ts`
- Root layout in `__root.tsx`, home page in `index.tsx`
- Route tree is auto-generated — do not edit `routeTree.gen.ts`

## Path Aliases

| Alias | Maps to |
|---|---|
| `@/*` | `./src/*` |
| `@components/*` | `./src/components/*` |
| `@hooks/*` | `./src/hooks/*` |
| `@lib/*` | `./src/lib/*` |
| `@routes/*` | `./src/routes/*` |
| `@stores/*` | `./src/stores/*` |

Use `@/` prefix in all imports: `import { cn } from '@/lib/utils'`

## State Management

- **Zustand** for toast store (`src/stores/toast.ts`)
- **React 19 `useActionState`** for newsletter form (not `useState` + `onSubmit`)
- Use selector pattern: `useToastStore(s => s.showToast)` — never `.getState()` in JSX

## Component Architecture

```
components/
├── layout/     Navbar (frosted glass on scroll), Footer (4-column)
├── sections/   9 landing page sections (Hero → Newsletter)
└── shared/     ScrollReveal (IntersectionObserver), Toast, BackToTop
```

- **ScrollReveal** wraps content with `reveal` class, adds `active` on intersection
- **Toast** auto-dismisses after 3.5s via Zustand store
- **Navbar** transitions from transparent → `bg-ivory-50/95 backdrop-blur-xl` at scroll > 80px
- Social media icons use inline SVG (Lucide doesn't have brand icons)

## Testing

- **Vitest** with jsdom environment, globals enabled
- Setup file: `src/test/setup.ts` — mocks `IntersectionObserver` and `window.scrollTo`
- Test files in `src/test/components/`
- Mock TanStack Router in tests: `vi.mock('@tanstack/react-router', ...)`
- Wrap Zustand state updates in `act()` in tests

## Design Tokens (for reference)

| Token | Hex | Role |
|---|---|---|
| `tea-500` | `#5C8A4D` | Primary accent |
| `ivory-100` | `#FAF6EE` | Background |
| `terra-400` | `#C4724B` | Secondary accent |
| `bark-800` | `#3D2B1F` | Text primary |
| `gold-400` | `#C5A55A` | Signature accent |

Fonts: `Playfair Display` (display), `Inter` (body), `Noto Serif` (serif) — loaded in `index.html`
