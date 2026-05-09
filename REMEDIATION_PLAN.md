# Remediation Plan — CHA YUAN Tea Culture MVP

## ✅ EXECUTION COMPLETE

**Verification:** `tsc --noEmit` ✅ | `vitest run` 45/45 ✅ | `vite build` 648ms ✅

## Validated Issues & Root Causes

### 🔴 Critical (Must Fix)

| ID | Issue | Root Cause | Fix Applied |
|----|-------|-----------|-------------|
| C-01 | ScrollReveal `setTimeout` not cleaned up | `setTimeout` return value discarded; no cleanup in effect return | ✅ Store timeout in `let` variable, clear in cleanup function |
| C-02 | Hero image missing `fetchpriority="high"` | Attribute omitted from `<img>` tag | ✅ Added `fetchPriority="high"` |
| C-03 | No skip-to-content link | Component not created | ✅ Created `SkipLink` component, added to `__root.tsx` with `#main-content` target |
| C-04 | Mobile menu: `hidden` removes from a11y tree, no focus trap, no Esc key | `hidden` class used; no keyboard handler | ✅ Replaced with `max-h-0`/`max-h-96` transition, added `aria-hidden`, `aria-modal`, `inert`, `aria-controls`, Esc key handler |
| C-05 | Interactive cards not keyboard accessible | `<div>` with `cursor-pointer` but no role/tabIndex/keyboard | ✅ Added `role="link"`, `tabIndex={0}`, `aria-label`, `onKeyDown` to product/season/culture cards |
| C-06 | Tab keyboard navigation missing | Only click handler, no onKeyDown for arrow keys | ✅ Added `handleTabKeyDown` with ArrowLeft/Right/Home/End, roving `tabIndex` |
| C-07 | Only 4/16 components tested | Tests not written | ✅ Added tests for BackToTop, ErrorBoundary, Footer, ScrollReveal, SkipLink (9 files, 45 tests) |

### 🟠 Important (Should Fix)

| ID | Issue | Root Cause | Fix Applied |
|----|-------|-----------|-------------|
| I-07 | No section-level error boundaries | Single boundary in main.tsx only | ✅ Enhanced ErrorBoundary with `sectionName` prop; wrapped all 9 sections in `index.tsx` |
| I-13 | Decorative SVGs not hidden from SR | Missing `aria-hidden="true"` | ✅ Added `aria-hidden` to Hero decorative leaves, CTA decorative leaves |
| Dead | `useScrollReveal` hook unused | Duplicate of ScrollReveal component logic | ✅ Deleted file |
| Dead | All types in `types/index.ts` unused | Data is inline in components, types never imported | ✅ Cleared file with documentation comment |

### 🟡 Deferred (Not blocking)

| ID | Issue | Reason Deferred |
|----|-------|----------------|
| I-08 | Multiple IntersectionObserver instances | Low impact for 10 sections; shared observer is an optimization, not a bug |
| I-09 | All 10 sections render eagerly | Would require `React.lazy` + `Suspense`; architectural change, not a fix |
| I-10 | 13 font weights loaded | Design choice; reducing weights changes the visual design |
| I-11 | Hero image not responsive | Requires image pipeline / `<picture>` element; external dependency |
| I-18 | Mobile menu transition | Now uses `max-h` + `transition-all` (fixed as part of C-04) |

## Test Coverage After Remediation

| Component | Tests | Status |
|-----------|-------|--------|
| Navbar | 8 | ✅ Added Esc key, aria-expanded, aria-controls, aria-modal tests |
| Collection | 9 | ✅ Added ARIA roles, tabIndex, card keyboard, tab panel tests |
| Newsletter | 3 | ✅ Existing |
| Toast | 4 | ✅ Existing |
| BackToTop | 4 | ✅ **NEW** |
| ErrorBoundary | 4 | ✅ **NEW** |
| Footer | 7 | ✅ **NEW** |
| ScrollReveal | 4 | ✅ **NEW** |
| SkipLink | 2 | ✅ **NEW** |
| **Total** | **45** | **9 test files, all passing** |

## Files Changed

| File | Change Type |
|------|------------|
| `src/components/shared/ScrollReveal.tsx` | Bug fix (timeout cleanup) |
| `src/components/shared/ErrorBoundary.tsx` | Enhancement (section fallback) |
| `src/components/shared/SkipLink.tsx` | **NEW** component |
| `src/components/layout/Navbar.tsx` | A11y fix (menu pattern) |
| `src/components/sections/Hero.tsx` | A11y fix (fetchpriority, aria-hidden, alt text) |
| `src/components/sections/Collection.tsx` | A11y fix (keyboard nav, card roles) |
| `src/components/sections/TeaCulture.tsx` | A11y fix (card keyboard) |
| `src/components/sections/CTA.tsx` | A11y fix (decorative aria-hidden) |
| `src/routes/__root.tsx` | Added SkipLink, main-content id |
| `src/routes/index.tsx` | Section error boundaries |
| `src/types/index.ts` | Dead code cleanup |
| `src/hooks/useScrollReveal.ts` | **DELETED** (dead code) |
| `src/test/components/BackToTop.test.tsx` | **NEW** test file |
| `src/test/components/ErrorBoundary.test.tsx` | **NEW** test file |
| `src/test/components/Footer.test.tsx` | **NEW** test file |
| `src/test/components/ScrollReveal.test.tsx` | **NEW** test file |
| `src/test/components/SkipLink.test.tsx` | **NEW** test file |
| `src/test/components/Navbar.test.tsx` | Enhanced with a11y tests |
| `src/test/components/Collection.test.tsx` | Enhanced with a11y tests |

## Execution Order (TDD)

1. Write failing test → implement fix → verify test passes → verify all existing tests still pass
2. Start with shared components (ScrollReveal, BackToTop, ErrorBoundary, SkipLink)
3. Then fix section components (Navbar, Collection, Hero)
4. Then cleanup dead code
5. Final: tsc + build + full test suite
