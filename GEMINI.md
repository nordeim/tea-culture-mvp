# 茶源 CHA YUAN — Premium Tea E-Commerce

## Project Overview
茶源 (CHA YUAN) is a premium tea e-commerce landing page designed for a Singapore-based heritage tea brand with over 130 years of history. The project is a high-performance, visually immersive single-page application (SPA) that combines traditional Eastern tea culture with contemporary web design.

### Tech Stack
- **Framework:** React 19 (Concurrent features, `useActionState`)
- **Language:** TypeScript 6 (Strict mode, `erasableSyntaxOnly`)
- **Build Tool:** Vite 8 (Rolldown engine)
- **Styling:** Tailwind CSS v4 (CSS-first theming, no `tailwind.config.js`)
- **Routing:** TanStack Router (File-based, type-safe)
- **State Management:** Zustand (Toast notifications)
- **Testing:** Vitest + Testing Library
- **Icons:** Lucide React

### Architecture
The project follows a component-driven architecture:
- **`src/components/sections/`:** 10 distinct landing page sections (Hero, Philosophy, Collection, Tea Culture, Macro Feature, Subscription, Testimonials, CTA, Newsletter).
- **`src/components/layout/`:** Persistent layout components (Navbar with frosted glass effect, Footer).
- **`src/components/shared/`:** Reusable UI utilities (ScrollReveal, Toast, BackToTop, ErrorBoundary).
- **`src/routes/`:** File-based routing logic using TanStack Router.
- **`src/stores/`:** Lightweight state management for global UI elements.

---

## Building and Running

### Prerequisites
- Node.js ≥ 20
- npm (Install with `--legacy-peer-deps` to handle React 19 peer dependencies)

### Key Commands
| Command | Action |
|---------|--------|
| `npm install --legacy-peer-deps` | Install dependencies |
| `npm run dev` | Start development server at `localhost:5173` |
| `npm run build` | Run type check and generate production build |
| `npm run preview` | Preview production build locally |
| `npm test` | Run Vitest in watch mode |
| `npx tsc --noEmit` | Run TypeScript type check |
| `npx vitest run` | Execute all tests once |
| `npx tsr generate` | Regenerate route tree (run after modifying `src/routes/`) |

---

## Development Conventions

### TypeScript & Coding Style
- **Strict TypeScript:** `tsconfig.json` enforces strict rules. Avoid `any` (use `unknown`) and `enum` (use union types).
- **Path Aliases:** Always use `@/` prefix for imports (e.g., `import { cn } from '@/lib/utils'`).
- **Functional Components:** Use functional components with hooks. Prefer early returns and composition over inheritance.
- **React 19 Patterns:** Use `useActionState` for form handling (e.g., Newsletter form) and ensure all async operations provide user feedback.

### Styling & Design System
- **Tailwind v4:** All design tokens (colors, fonts, animations) are defined in `src/globals.css` using `@theme inline`.
- **Negative Utilities:** Use single hyphen syntax (e.g., `-bottom-24`).
- **Aesthetic Direction:** Follow the "Anti-Generic" philosophy—distinctive typography, intentional whitespace, and luxury aesthetic.
- **Animations:** IntersectionObserver-driven reveal animations using the `ScrollReveal` component. Respect `prefers-reduced-motion`.

### Testing Practices
- **Vitest:** Primary testing framework.
- **Verification order:** Always run `tsc` → `build` → `vitest` before claiming a task complete.
- **Mocks:** Common browser APIs like `IntersectionObserver` and `window.scrollTo` are mocked in `src/test/setup.ts`.

### Routing
- **TanStack Router:** File-based routing in `src/routes/`.
- **Route Generation:** The `src/routeTree.gen.ts` file is auto-generated. Do not edit it manually; run `npx tsr generate` or keep the dev server running.

---

## Key Files
- `src/main.tsx`: App entry point.
- `src/globals.css`: Design tokens and global styles.
- `src/routes/__root.tsx`: Main layout wrapper.
- `src/routes/index.tsx`: Home page entry rendering all sections.
- `CLAUDE.md`: Detailed technical implementation standards and troubleshooting.
