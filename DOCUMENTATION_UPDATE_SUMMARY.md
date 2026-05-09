# Documentation Update Summary — CHA YUAN Tea E-Commerce

> **Date:** 2026-05-09
> **Action:** Updated README.md, AGENTS.md, and CLAUDE.md with recent remediation changes, new anti-patterns, and comprehensive troubleshooting guide.
> **Verification:** All 49 tests pass, TypeScript clean, build succeeds

---

## Files Updated

| File | Before (Lines) | After (Lines) | Change |
|---|---|---|---|
| `README.md` | 200 | 255 | +55 lines (new sections: Remediation History, expanded Testing, Troubleshooting) |
| `AGENTS.md` | 200 | 230 | +30 lines (new: hooks section, test inventory, dead code, gotchas) |
| `CLAUDE.md` | 386 | 560 | +174 lines (new: Anti-Patterns, Troubleshooting & Pitfalls Guide, Remediation History, Custom Hooks) |

---

## Summary of Changes by File

### README.md

| Section | Changes |
|---|---|
| **Badges** | Test count 15 → 49, build time 502ms → 630ms |
| **Features** | Added: 🛡️ CSP, 📢 Social Sharing, 🔄 Scroll Throttling, 🧩 404 Page |
| **Test Coverage** | Updated from 15/4 tests to **49/10 files** with full table |
| **Architecture tree** | Added `not-found.tsx`, removed `types/`, added `hooks/`, updated `shared/` |
| **Key Patterns** | Added: ErrorBoundary, SkipLink, throttled scroll, focus trap, ARIA tabs |
| **Remediation History** | NEW section: Phase 1 (original) + Phase 2 (8 fixes applied) |
| **Troubleshooting** | NEW: rAF mocking, throttled scroll errors, ErrorBoundary stderr |

### AGENTS.md

| Section | Changes |
|---|---|
| **Commands** | `npx vitest run` — test count 15 → 49 |
| **Component Architecture** | Added: ErrorBoundary, SkipLink, focus trap, throttled scroll |
| **Custom Hooks** | NEW section: `useThrottledScroll`, `useFocusTrap` |
| **Testing section** | Full inventory: 49 tests across 10 files with descriptions |
| **Newly Removed** | NEW: dead code cleanup tracking (`types/`, `ivory-500`, `slide-in-left`) |
| **Gotchas** | NEW: 5-point checklist for adding hooks (testing, mocking, timers) |

### CLAUDE.md

| Section | Changes |
|---|---|
| **Component Architecture** | Added SkipLink, ErrorBoundary, not-found route |
| **Testing Strategy** | Test counts: 15 → 49, files: 4 → 10 |
| **Mocking Conventions** | NEW: rAF mocking, cancelAnimationFrame, fake timer config |
| **Custom Hooks** | NEW section with table: `useThrottledScroll`, `useFocusTrap` |
| **Recently Removed** | NEW: dead code cleanup tracking |
| **Success Metrics** | Added: focus trap, keyboard nav, scroll throttling |
| **Anti-Patterns** | Added: skipping verification order |
| **Troubleshooting & Pitfalls Guide** | NEW section with browser, test, build issues |
| **Remediation History** | NEW: Phase 1 (original) + Phase 2 (2026-05-09) + Phase 3 (docs update) |
| **When to Update AGENTS.md/CLAUDE.md** | Extended: now includes hooks, anti-patterns |

---

## New Anti-Patterns Documented

| Anti-Pattern | Why | Correct Approach | Introduced |
|---|---|---|---|
| Unthrottled `addEventListener('scroll')` | 60fps re-renders, poor performance | `useThrottledScroll` hook | Remediation Phase 2 |
| Missing `width`/`height` on `<img>` | Layout shift, poor LCP | Add intrinsic sizing | Audit discovery |
| Raw `rgba(...)` with alpha in Tailwind | Hard to maintain, non-token | Use `bg-bark-800/60` | Code review |
| `consoleSpy` at module scope | Leaks between tests, timing issues | `beforeAll`/`afterAll` | Remediation Phase 2 |
| Skipping verification order | tsc/build/test may diverge | Always `tsc` → `build` → `vitest` | CLAUDE.md update |

## New Gotchas Documented

| Gotcha | Context | Fix |
|---|---|---|
| `requestAnimationFrame` not defined in jsdom | Tests with `useThrottledScroll` | `vi.stubGlobal('requestAnimationFrame', cb => setTimeout(cb, 16))` |
| Throttled scroll tests need extra timer delay | rAF + setTimeout double delay | `vi.advanceTimersByTime(rAF_delay + throttle_delay)` |
| ErrorBoundary `stderr` in tests | `componentDidCatch` logs to `stderr` | Expected — use `beforeAll`/`afterAll` spy |
| `inert` prop TypeScript | Boolean, not string | `inert={!isOpen}` not `inert="true"` |
| `bottom--24` vs `-bottom-24` | Double hyphen is literal token | Always single hyphen prefix for negatives |

## New Troubleshooting Entries

| Symptom | Root Cause | Fix | Location |
|---|---|---|---|
| Scroll animations stutter | Unthrottled `addEventListener('scroll')` | Use `useThrottledScroll` hook | Browser runtime |
| Mobile menu focus escapes | `Tab` cycles out of menu | Use `useFocusTrap` hook | Accessibility |
| Layout shift on image load | No `width`/`height` on `<img>` | Add intrinsic sizing | Performance |
| `rAF` not firing in tests | jsdom doesn't implement rAF | `vi.stubGlobal('requestAnimationFrame', ...)` | Test |
| Throttled scroll tests timeout | Not advancing timers far enough | `vi.advanceTimersByTime(120)` | Test |
| Console errors in ErrorBoundary tests | `componentDidCatch` logs to `stderr` | Expected behavior | Test |
| `TS6133` unused import | Import present but unused | Remove unused imports | Build |
| `TS2304` cannot find `beforeAll` | Missing vitest import | Add to import statement | Build |
| Route tree doesn't include new route | Forgot to regenerate | Run `npx tsr generate` | Build |

---

## Verification Results

| Gate | Result |
|---|---|
| TypeScript (`npx tsc --noEmit`) | ✅ Zero errors |
| Vite Build (`npm run build`) | ✅ 630ms, zero warnings |
| Tests (`npx vitest run`) | ✅ 49/49 passing, 10 files |

---

## Alignment with Living Documents Principle

All three files are now synchronized with the codebase state as of 2026-05-09:

1. **README.md** — Updated for new contributors and stakeholders
2. **AGENTS.md** — Updated for future AI coding agents
3. **CLAUDE.md** — Updated for future Claude sessions

All files maintain a consistent set of truths:
- 49 tests across 10 files (not 15 across 4)
- Two custom hooks (`useThrottledScroll`, `useFocusTrap`)
- New components: `ErrorBoundary`, `SkipLink`, `not-found` route
- Dead code removed: `types/index.ts`, `ivory-500`, `slide-in-left`
- Build pipeline: `tsc` → `build` → `vitest` (still unchanged)

---

*Documentation updated following the Meticulous Approach framework.*
*All changes tracked and verified against the current codebase.*
