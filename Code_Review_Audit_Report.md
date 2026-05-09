Now let me conduct the systematic review. I'll read every source file and evaluate across all five axes.I've read every file. Now let me compile the systematic review.

---

# Code Review: CHA YUAN Tea E-Commerce MVP

## Context
Full landing page implementation — 29 source files, ~200 lines. React 19 + TS 6 + Vite 8 + Tailwind v4. Reviewing the complete codebase for correctness, readability, architecture, security, and performance.

---

## 1. Correctness

### Critical

**(none)**

### Required

**[C1] Dead code: unused type interfaces**
`src/types/index.ts` exports `Product`, `Season`, `FermentationType`, `SubscriptionPlan`, `Testimonial`, `ToastMessage` — none are imported anywhere. All data is defined inline in components. These interfaces are dead code that will confuse future readers into thinking there's a data layer that uses them.

**[C2] Dead code: `useScrollReveal` hook**
`src/hooks/useScrollReveal.ts` is never imported by any component. `ScrollReveal` has its own inline IntersectionObserver. This file is orphaned.

**[C3] `Toast` timeout stacking — no clearTimeout**
`src/stores/toast.ts` — calling `showToast` multiple times in quick succession creates multiple independent `setTimeout` calls. The second call won't cancel the first. If a user triggers two toasts rapidly, the first timeout will hide the toast while the second is still displaying.

```ts
// Current — no cleanup
showToast: (message, icon = 'check-circle') => {
  set({ message, icon, isVisible: true })
  setTimeout(() => { set({ isVisible: false }) }, 3500)
}
```

Fix: store the timeout ID and clear it before setting a new one.

**[C4] Collection tab ARIA pattern incomplete**
`src/components/sections/Collection.tsx` — buttons have `role="tab"` and `aria-selected` but tab panels lack `role="tabpanel"` and `aria-labelledby`. The tabs also lack `role="tablist"` on the container. Screen readers won't understand the tab-panel relationship.

**[C5] `Newsletter` email validation is weaker than `type="email"`**
`src/components/sections/Newsletter.tsx` — the `useActionState` handler checks `email?.includes('@')` but the input already has `type="email"` and `required`. The `formData.get('email')` will return the raw string even if the browser's email validation is bypassed (e.g., programatic form submission). The check should be more robust or rely solely on the browser's native validation.

### Nit

**[C6] README typo** — "single hyphene" should be "single hyphen" in the Troubleshooting table.

**[C7] `globals.css` mixed hex casing** — `--color-tea-500: #5c8A4d` uses inconsistent casing. Harmless but untidy.

---

## 2. Readability & Simplicity

### Required

**[R1] Philosophy values use string interpolation for Tailwind classes**
`src/components/sections/Philosophy.tsx` — `${value.bg}` and `${value.color}` work at runtime but break Tailwind's static class scanning. If Tailwind v4 ever switches to build-time purging (like v3 did), these classes would be tree-shaken. More importantly, it's inconsistent with the rest of the codebase which uses full class strings.

**[R2] `Collection.tsx` is 270 lines with inline data**
The file mixes data definitions with component logic. The `originProducts`, `fermentTypes`, and `seasons` arrays are 130+ lines of pure data. Extracting them to a `data/collection.ts` file would make the component file focused on behavior and layout.

### Nit

**[R3] `Footer.tsx` social icons are 40 lines of inline SVG**
These could live in a `components/icons/SocialIcons.tsx` file if they're ever reused. Low priority since they're only in Footer.

---

## 3. Architecture

### Required

**[A1] No error boundary**
`src/main.tsx` — the app has no `ErrorBoundary` wrapping the `RouterProvider`. A runtime error in any section will white-screen the entire page with no recovery path. React 19's error boundary pattern should wrap the app root.

### Consider

**[A2] All section data is hardcoded inline**
Product data, subscription plans, testimonials, temperature guides — all defined as const arrays inside their component files. This is fine for a static landing page (no API), but if the data ever needs to come from a CMS or API, every component would need refactoring. A central `data/` directory would make that migration easier.

**[A3] `ScrollReveal` vs `useScrollReveal` — duplicated functionality**
Two different implementations of the same IntersectionObserver pattern exist. The hook (`useScrollReveal`) is unused; the component (`ScrollReveal`) is used everywhere. Clean architecture requires one implementation.

---

## 4. Security

### Verdict: ✅ Clean

- No user data sent to external services
- No secrets in code
- React's JSX escaping prevents XSS on all rendered content
- `picsum.photos` is a trusted public image service
- No `dangerouslySetInnerHTML`
- No API calls with token/auth concerns
- Newsletter form uses React 19's `action` prop (server-action pattern), not raw `onSubmit` with fetch

---

## 5. Performance

### Consider

**[P1] Three separate scroll listeners**
`Navbar`, `BackToTop`, and the root layout each attach independent `scroll` event listeners. Each fires on every scroll pixel. A single shared listener with `requestAnimationFrame` throttling would reduce handler invocations by ~66%.

**[P2] Multiple `IntersectionObserver` instances**
Each `ScrollReveal` instance creates its own `IntersectionObserver`. With ~8 ScrollReveal wrappers on the page, that's 8 observers. A single observer shared across all reveal elements would be more efficient. (Note: browsers optimize observers internally, so the real-world impact is small.)

**[P3] Hero image has `loading="eager"` — correct**
The hero uses `loading="eager"` which is appropriate for the LCP element. All other images use `loading="lazy"`. ✅

**[P4] Build output is well-chunked**
`react-vendor` (190KB), `router-vendor` (83KB), `ui-vendor` (3KB), route chunks (33KB). Function-form `manualChunks` works correctly with Rolldown. ✅

**[P5] All CSS animations use `transform`/`opacity`**
No layout-triggering properties in animations. `will-change` isn't needed since the compositor handles these natively. ✅

---

## Dead Code Inventory

| File | Status | Recommendation |
|---|---|
| `src/types/index.ts` | **All 6 interfaces unused** | Delete file or keep only if future plans require it |
| `src/hooks/useScrollReveal.ts` | **Never imported** | Delete file |
| `globals.css` `--animate-slide-in-left` | **Defined but unused** | Remove or use |

---

## Test Coverage Gaps

| Component | Has Tests | Missing Coverage |
|---|---|
| Navbar | ✅ 4 tests | Scroll-triggered frosted glass (requires scroll simulation) |
| Collection | ✅ 5 tests | Keyboard navigation between tabs |
| Newsletter | ✅ 3 tests | Invalid email rejection path |
| Toast | ✅ 3 tests | Rapid successive calls (timeout stacking) |
| BackToTop | ❌ | Appears after 600px scroll, smooth scroll top |
| Philosophy | ❌ | Not critical — static content |
| Subscription | ❌ | Plan selection triggers toast |
| Hero | ❌ | Not critical — static content |
| Footer | ❌ | Not critical — static links |

---

## Verdict

**Request changes** — 5 required issues to address before this is production-ready:

1. **Delete dead code** — `types/index.ts` (all interfaces), `hooks/useScrollReveal.ts`
2. **Fix Toast timeout stacking** — add `clearTimeout` before new `setTimeout`
3. **Add `role="tablist"` and `role="tabpanel"`** to Collection tabs for accessibility
4. **Add an ErrorBoundary** wrapping the app root
5. **Fix README typo** — "single hyphene" → "single hyphen"

All 5 are low-risk, quick fixes. The codebase is otherwise clean, well-structured, and faithful to the mockup. Security is solid. Performance is appropriate for a landing page. The design system is properly implemented in Tailwind v4.

---

Want me to fix these 5 issues now?
