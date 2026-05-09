Here's the precise plan for each fix:

---

## Fix Plan — 5 Issues

### Fix 1: Delete Dead Code

**Files to delete:**
- `src/types/index.ts` — all 6 interfaces are never imported
- `src/hooks/useScrollReveal.ts` — never imported, ScrollReveal has its own observer

**Also remove from `globals.css`:**
- `--animate-slide-in-left` declaration (defined but never used in any component)
- `@keyframes slide-in-left` block (only referenced by the unused animation token)

**Verification:** `npx tsc --noEmit` must still pass (confirming nothing imports these).

---

### Fix 2: Toast Timeout Stacking

**File:** `src/stores/toast.ts`

**Change:** Add a module-level `timeoutId` variable. In `showToast`, clear the previous timeout before setting a new one.

```ts
let timeoutId: ReturnType<typeof setTimeout> | null = null

showToast: (message, icon = 'check-circle') => {
  if (timeoutId) clearTimeout(timeoutId)
  set({ message, icon, isVisible: true })
  timeoutId = setTimeout(() => {
    set({ isVisible: false })
    timeoutId = null
  }, 3500)
}
```

**Also update test:** `src/test/components/Toast.test.tsx` — add a test case for rapid successive calls to verify only the last toast persists.

**Verification:** `npx vitest run` — existing 15 tests + 1 new test pass.

---

### Fix 3: Collection Tab ARIA Accessibility

**File:** `src/components/sections/Collection.tsx`

**Changes:**
1. Add `role="tablist"` to the tab container div
2. Add `id` to each tab button (e.g., `id="tab-by-origin"`)
3. Add `aria-controls` linking each tab to its panel
4. Wrap each tab content block in a `<div role="tabpanel" aria-labelledby="tab-{id}" id="panel-{id}" tabindex="0">`

**Verification:** `npx tsc --noEmit` passes, tests still pass (Collection.test.tsx doesn't query by role so no test changes needed).

---

### Fix 4: ErrorBoundary Component

**New file:** `src/components/shared/ErrorBoundary.tsx`

A React class component (ErrorBoundary requires `componentDidCatch` — can't use hooks). Renders a fallback UI with a "Try Again" button that calls `resetState` to re-render children.

**Modify:** `src/main.tsx` — wrap `<RouterProvider>` with `<ErrorBoundary>`.

**Why class component:** React's `componentDidCatch` / `getDerivedStateFromError` lifecycle methods are only available on class components. This is the one case where a class component is correct.

**Verification:** `npx tsc --noEmit` passes, `npm run build` succeeds.

---

### Fix 5: README Typo

**File:** `README.md`

**Change:** "single hyphene" → "single hyphen" in the Troubleshooting table.

**Verification:** Visual check.

---

### Execution Order

1. Fix 1 (dead code deletion) — do first, reduces codebase surface
2. Fix 2 (toast timeout) — isolated store change
3. Fix 3 (ARIA tabs) — isolated component change
4. Fix 4 (ErrorBoundary) — new file + one import change
5. Fix 5 (typo) — trivial

### Final Verification (after all 5)

```bash
npx tsc --noEmit          # Zero errors
npm run build              # Build succeeds
npx vitest run             # All tests pass (16 tests)
```

---

Executing all 5 fixes.

**Fix 1: Delete dead code**Fix 2: Toast timeout stacking**Fix 3: Collection Tab ARIA accessibility**Fix 4: ErrorBoundary component**Fix 5: README typo**Final Verification:**Need to fix the ScrollReveal wrapper — `role` and `aria-label` need to be on the inner div. Let me update ScrollReveal to forward HTML attributes:All 5 fixes applied and verified.

## Summary

| # | Issue | Fix | Status |
|---|---|
| 1 | Dead code (`types/index.ts`, `hooks/useScrollReveal.ts`, unused animation) | Deleted 2 files, removed `--animate-slide-in-left` and `@keyframes slide-in-left` from globals.css | ✅ |
| 2 | Toast timeout stacking | Added module-level `timeoutId` with `clearTimeout` before new `setTimeout` | ✅ |
| 3 | Collection tabs missing ARIA | Added `role="tablist"`, `aria-controls`, `id` on tabs; `role="tabpanel"`, `aria-labelledby`, `tabIndex` on panels | ✅ |
| 4 | No ErrorBoundary | Created `ErrorBoundary.tsx` (class component with fallback UI), wrapped `RouterProvider` in `main.tsx` | ✅ |
| 5 | README typo | "single hyphene" → "single hyphen" | ✅ |

### Final Verification

``
npx tsc --noEmit     ✅ Zero errors
npm run build         ✅ 468ms
npx vitest run        ✅ 16/16 tests passing
```

### Changes also made
- `ScrollReveal` now extends `HTMLAttributes<HTMLDivElement>` so it can accept `role`, `aria-label`, and other standard HTML props — needed for Fix 3 and improves composability generally.
- New test: "cancels previous timeout on rapid successive calls" — validates Fix 2 behavior.
