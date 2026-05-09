The user has confirmed and wants me to proceed with the 8-fix remediation plan. Let me execute each fix systematically using TDD approach:  
  
1. Fix 6: Delete src/types/index.ts (simplest, independent)  
2. Fix 7: Remove ivory-500 dead token (independent)  
3. Fix 8: Suppress console error (independent)  
4. Fix 1: CSP (independent)  
5. Fix 5: OG meta (independent)  
6. Fix 4: Not-found route (independent, new file)  
7. Fix 3: Throttle scroll (new hook + test)  
8. Fix 2: Focus trap (most complex, requires careful testing)  
  
Let me proceed with execution using TDD approach.  

Phase 4: IMPLEMENT — TDD Execution  
  
────────────────────────────────────────────────────────────────────────────────  
  
### Fix 1.1: Delete src/types/index.ts (Dead Code  

  
$ cd /home/project/tea-culture-mvp && rm src/types/index.ts && rmdir src/types 2>/dev/null && echo "✅ Deleted src/types/index.ts" || echo "File deleted, directory may not be empty"  
  
✅ Deleted src/types/index.ts  
  
Took 0.1s  
  

Now I need to remove the types path from tsconfig.json and vite.config.ts.  

  
edit /home/project/tea-culture-mvp/tsconfig.json  
  
    ...  
 22       "@components/*": ["./src/components/*"],  
 23       "@hooks/*": ["./src/hooks/*"],  
 24       "@lib/*": ["./src/lib/*"],  
 25       "@routes/*": ["./src/routes/*"],  
-26       "@stores/*": ["./src/stores/*"],  
-27       "@types/*": ["./src/types/*"]  
+26       "@stores/*": ["./src/stores/*"]  
 28     }  
 29   },  
 30   "include": ["src"],  
 31   "references": []  
    ...  
  

  
edit /home/project/tea-culture-mvp/vite.config.ts  
  
    ...  
 16       '@components': '/src/components',  
 17       '@hooks': '/src/hooks',  
 18       '@lib': '/src/lib',  
 19       '@routes': '/src/routes',  
-20       '@stores': '/src/stores',  
-21       '@types': '/src/types'  
+20       '@stores': '/src/stores'  
 22     }  
 23   },  
 24   build: {  
 25     target: 'es2022',  
    ...  
  

  
edit /home/project/tea-culture-mvp/vitest.config.ts  
  
    ...  
 15       '@components': '/src/components',  
 16       '@hooks': '/src/hooks',  
 17       '@lib': '/src/lib',  
 18       '@routes': '/src/routes',  
-19       '@stores': '/src/stores',  
-20       '@types': '/src/types'  
+19       '@stores': '/src/stores'  
 21     }  
 22   },  
 23   test: {  
 24     environment: 'jsdom',  
    ...  
  

Good, now let me verify TypeScript still passes after removing @types path alias.  

  
$ cd /home/project/tea-culture-mvp && npx tsc --noEmit 2>&1 && echo "✅ TypeScript still passes"  
  
✅ TypeScript still passes  
  
Took 3.2s  
  

TypeScript passes. Now let me continue with Fix 1.2: Remove ivory-500 dead CSS token.  

### Fix 1.2:  

  
edit /home/project/tea-culture-mvp/src/globals.css  
  
     ...  
  19   --color-ivory-100: #FAF6EE;  
  20   --color-ivory-200: #F5F0E8;  
  21   --color-ivory-300: #EDE5D8;  
  22   --color-ivory-400: #E0D4C3;  
- 23   --color-ivory-500: #D1C1AA;  
  24  
+ 24  
  25   /* Terracotta */  
  26   --color-terra-300: #D99068;  
  27   --color-terra-400: #C4724B;  
  28   --color-terra-500: #B5613F;  
     ...  
  

I need to continue with the remaining fixes. Let me do Fix 1.3: OG Meta tags in index.html, then test console error suppression, then continue with the remaining fixes.  

  
$ cd /home/project/tea-culture-mvp && npx tsc --noEmit 2>&1 && echo "✅ TypeScript still passes after removing ivory-500" && npm run build 2>&1 | tail -3 && echo "✅ Build still succeeds"  
  
✅ TypeScript still passes after removing ivory-500  
dist/assets/react-vendor-DRTYvtHH.js      189.69 kB │ gzip: 59.69 kB │ map: 833.02 kB  
  
✓ built in 616ms  
✅ Build still succeeds  
  
Took 8.1s  
  

Build and type checking still pass. Let me continue with the remaining fixes.  
  
Fix 1.3: OG Meta tags  
Fix 1.4: CSP Meta tag  
These both go into index.html, so I'll do them together.  
  
Then Fix 1.5: ErrorBoundary console spy (suppress test console errors)  
Then Fix 1.6: Not-found route  
Then Fix 1.7: Throttled scroll hook  
Then Fix 1.8: Mobile menu focus trap  

### Fix 1.3 & 1.4: Open Graph / Twitter Card + CSP Meta Tags  

  
edit /home/project/tea-culture-mvp/index.html  
  
    ...  
  3   <head>  
  4     <meta charset="UTF-8" />  
  5     <meta name="viewport" content="width=device-width, initial-scale=1.0" />  
  6     <meta name="description" content="CHA YUAN — Premium Tea House. Where ancient tea wisdom meets modern life." />  
+ 7     <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https: data:;  
connect-src 'self';">  
+ 8     <meta property="og:title" content="CHA YUAN — Premium Tea House" />  
+ 9     <meta property="og:description" content="Where ancient tea wisdom meets modern life. Curating the world's finest teas since 1892." />  
+10     <meta property="og:type" content="website" />  
+11     <meta property="og:image" content="/og-image.jpg" />  
+12     <meta name="twitter:card" content="summary_large_image" />  
  7     <link rel="preconnect" href="https://fonts.googleapis.com" />  
  8     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />  
  9     <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Noto+Serif:wght@400;500;600&display=swap" rel="stylesheet" />  
 10     <title>CHA YUAN — Premium Tea House</title>  
    ...  
  

Good. Let me verify the build after adding CSP and OG meta tags. Then continue with the rest of the fixes.  

  
$ cd /home/project/tea-culture-mvp && npx tsc --noEmit && npm run build 2>&1 | tail -3 && echo "✅ Build succeeds after CSP and OG meta" && npx vitest run 2>&1 | tail -3 && echo "✅ All 45 tests pass after CSP and OG meta"  
  
... (3 earlier lines, ctrl+o to expand)  
✅ Build succeeds after CSP and OG meta  
   Start at  19:50:50  
   Duration  6.18s (transform 615ms, setup 876ms, import 2.80s, tests 2.47s, environment 10.09s)  
  
✅ All 45 tests pass after CSP and OG meta  
  
Took 15.4s  
  

All builds and tests passing so far. Let me continue with the remaining fixes:  
  
Fix 1.5: Suppress console.error in ErrorBoundary tests  
Fix 1.6: Add not-found route  
Fix 1.7: UseThrottledScroll hook  
Fix 1.8: Mobile menu focus trap  
  
Let me do them systematically.  

Excellent. All passing so far. Let me continue with the remaining fixes.  
  
### Fix 1  

  
read /home/project/tea-culture-mvp/src/test/components/ErrorBoundary.test.tsx  
  
import { describe, it, expect, vi } from 'vitest'  
import { render, screen } from '@testing-library/react'  
import { ErrorBoundary } from '@/components/shared/ErrorBoundary'  
  
// Component that throws  
function ThrowError({ shouldThrow }: { shouldThrow: boolean }) {  
  if (shouldThrow) throw new Error('Test error')  
  return <div>Working content</div>  
}  
  
... (49 more lines, ctrl+o to expand)  
  

Now I need to fix the consoleSpy to move it into beforeAll/afterAll hooks. Let me also suppress React's internal stderr logging.  

  
edit /home/project/tea-culture-mvp/src/test/components/ErrorBoundary.test.tsx  
  
    ...  
  7   if (shouldThrow) throw new Error('Test error')  
  8   return <div>Working content</div>  
  9 }  
 10  
-11 // Suppress console.error for these tests  
-12 const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})  
-13  
 14 describe('ErrorBoundary', () => {  
+12   let consoleSpy: ReturnType<typeof vi.spyOn>  
+13  
+14   beforeAll(() => {  
+15     consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})  
+16   })  
+17  
+18   afterAll(() => {  
+19     consoleSpy.mockRestore()  
+20   })  
 15   it('renders children when no error', () => {  
 16     render(  
 17       <ErrorBoundary>  
 18         <div>Test content</div>  
    ...  
  

Good. Now I need to remove the consoleSpy.mockRestore() at the bottom of the describe block since it's now handled in afterAll.  

  
edit /home/project/tea-culture-mvp/src/test/components/ErrorBoundary.test.tsx  
  
    ...  
 60     const tryAgainBtn = screen.getByText('Try again')  
 61     expect(tryAgainBtn).toBeInTheDocument()  
 62   })  
 63  
-64   consoleSpy.mockRestore()  
 65 })  
  

Now let me verify the test passes.  

  
$ cd /home/project/tea-culture-mvp && npx vitest run src/test/components/ErrorBoundary.test.tsx 2>&1 | tail -10  
  
... (2 earlier lines, ctrl+o to expand)  
  
 Test Files  1 passed (1)  
      Tests  4 passed (4)  
   Start at  19:51:41  
   Duration  1.42s (transform 65ms, setup 100ms, import 118ms, tests 75ms, environment 932ms)  
  
Took 2.9s  
  

The error boundary test should be cleaner now. Let me run the full suite to confirm all 45 tests still pass with the console spy fix, then proceed with the remaining fixes.  

  
$ cd /home/project/tea-culture-mvp && npx vitest run 2>&1  
  
... (2 earlier lines, ctrl+o to expand)  
  
 Test Files  9 passed (9)  
      Tests  45 passed (45)  
   Start at  19:51:52  
   Duration  6.32s (transform 601ms, setup 800ms, import 2.78s, tests 2.53s, environment 10.23s)  
  
Took 7.8s  
  

The full test suite still passes with 45/45 tests. Now I need to continue with the remaining fixes:  
  
Fix 1.6: Not-found route  
Fix 1.7: UseThrottledScroll hook  
Fix 1.8: Mobile menu focus trap  
  
Let me proceed with each.  

All 45 tests pass. Let me continue with the remaining fixes.  
  
### Fix 1.6: Not-Found Route (404 Page  

  
write /home/project/tea-culture-mvp/src/routes/not-found.tsx  
  
import { Link } from '@tanstack/react-router'  
import { Leaf, ArrowLeft } from 'lucide-react'  
  
export const Route = createFileRoute('/not-found' as any)({  
  component: NotFoundPage,  
})  
  
function NotFoundPage() {  
  return (  
    <section className="min-h-screen flex items-center justify-center bg-ivory-100 px-6">  
... (20 more lines, 30 total, ctrl+o to expand)  
  

I need to fix this route. TanStack Router uses file-based routing. For a catch-all route, I should use $404.tsx or similar. Let me check the TanStack Router docs. Actually, for a catch-all (404) route, the convention is to use a route 
with a notFoundComponent or a custom not-found route. For TanStack Router, I'd use a 404.tsx route file or configure it in the root route.  
  
Actually, let me reconsider. The proper way in TanStack Router is to either:  
1. Use a $404.tsx file that matches any path (dynamic segment)  
2. Or configure notFoundComponent on the root route  
  
Let me use option 1 - a catch-all route. The dynamic segment in TanStack Router is $.tsx or $404.tsx.  
  
Wait, looking at TanStack Router docs, for a not-found route, you can create _404.tsx or use the notFoundComponent on the root route. Let me simplify and use a standard approach.  
  
Actually, the simplest approach for a single-page app with TanStack Router is to configure it in the root route. But for file-based routing, let me just create a 404.tsx route file.  
  
Actually, let me look at how TanStack Router handles 404. According to the docs, you can set a defaultNotFoundComponent or use a catch-all route. Let me create a $404.tsx file for the catch-all.  
  
Wait, I should check the project's route structure. The project uses createFileRoute from TanStack Router. Let me check the docs for the standard way to handle 404.  
  
In TanStack Router file-based routing:  
- _404.tsx with createFileRoute('/_404') would match /404  
- For catch-all, you can use $.tsx with createFileRoute('/$') to match any unmatched path  
  
Actually, for a true 404 catch-all, I need to create a route that matches everything. The best approach in TanStack Router v1 is to create a $ route:  
  
src/routes/$.tsx with createFileRoute('/') - but this might conflict with the index.  
  
Let me just create a proper not-found route file. The simplest approach for now:  
- Create src/routes/_404.tsx which TanStack Router will handle as a fallback  
- Or configure notFoundComponent in src/routes/__root.tsx  
  
I'll take the simpler approach: just create the file and update the root route to include a notFoundComponent. But that would require modifying __root.tsx.  
  
Actually, the best approach in TanStack Router is to use the notFoundMode and notFoundComponent. Let me keep it simple and just create a proper route file that TanStack Router can use.  
  
Actually, for a simple SPA with only one real route (/), a 404 page isn't even needed because any route will just show the same content, or the router will handle it. Since this is a single-page application (landing page), the  
simplest 404 is just to show the home page for all routes.  
  
But the user wants a 404 page, so let me create one. The cleanest approach is to create a catch-all route file $.tsx.  
  
Actually, let me reconsider. Looking at the current code, the root route only has one child route (/). If someone visits a non-existent path, TanStack Router will show the root layout but no content (or throw a not-found error).  
  
For a proper 404, I should:  
1. Create a catch-all route $.tsx  
2. Configure the root route to handle not-found  
  
Actually, let me just replace the not-found route with a proper TanStack Router catch-all route and not worry too much about the file naming. The important thing is that it works and tests pass.  
  
Let me just rename the file and use the correct TanStack Router convention. For unmatched routes, I'll create _404.tsx and add a notFoundComponent or just use the dynamic segment approach.  
  
Actually最简单的方案: just delete my current not-found.tsx and create a route using the TanStack Router notFoundComponent. But that would modify existing code.  
  
For now, let me just fix my not-found.tsx to use the correct import and create a proper test for it. The routing itself can be configured. Let me focus on making the component exist and testable, then worry about the router  
integration.  

  
edit /home/project/tea-culture-mvp/src/routes/not-found.tsx  
  
- 1 import { Link } from '@tanstack/react-router'  
+ 1 import { createFileRoute, Link } from '@tanstack/react-router'  
  2 import { Leaf, ArrowLeft } from 'lucide-react'  
  3  
- 4 export const Route = createFileRoute('/not-found' as any)({  
+ 4 export const Route = createFileRoute('/not-found')({  
  5   component: NotFoundPage,  
  6 })  
  7  
  8 function NotFoundPage() {  
    ...  
  

The user said "yes, please meticulously proceed" meaning they've already approved the plan and I should continue with the execution. Let me focus on completing the remaining fixes:  
  
Completed so far:  
1. ✅ Fix 1.1: Delete src/types/index.ts  
2. ✅ Fix 1.2: Remove ivory-500 dead token  
3. ✅ Fix 1.3/1.4: CSP + OG Meta tags  
4. ✅ Fix 1.5: Suppress console errors in ErrorBoundary tests  
5. ✅ Fix 1.6: Not-found route (partially done - need to update route tree)  
  
Still to do:  
6. Fix 1.7: Throttled scroll hook  
7. Fix 1.8: Mobile menu focus trap  
8. Run final verification: tsc, build, vitest  
  
Let me continue with the throttled scroll hook and focus trap, then complete the verification.  

  
$ cd /home/project/tea-culture-mvp && npx tsc --noEmit && npm run build 2>&1 | tail -3 && npx vitest run 2>&1 | tail -5 (timeout 30s)  
  
src/test/components/ErrorBoundary.test.tsx(14,3): error TS2304: Cannot find name 'beforeAll'.  
src/test/components/ErrorBoundary.test.tsx(18,3): error TS2304: Cannot find name 'afterAll'.  
  
  
Command exited with code 2  
  
Took 3.4s  
  

There's a TypeScript error in the ErrorBoundary test. The issue is that beforeAll and afterAll are not recognized. This is because I need to import them from vitest. Let me check the current file and fix it.  

  
read /home/project/tea-culture-mvp/src/test/components/ErrorBoundary.test.tsx:1-20  
  
import { describe, it, expect, vi } from 'vitest'  
import { render, screen } from '@testing-library/react'  
import { ErrorBoundary } from '@/components/shared/ErrorBoundary'  
  
// Component that throws  
function ThrowError({ shouldThrow }: { shouldThrow: boolean }) {  
  if (shouldThrow) throw new Error('Test error')  
  return <div>Working content</div>  
}  
  
... (12 more lines, ctrl+o to expand)  
  

Right, I need to add beforeAll and afterAll imports from vitest. Let me fix that.  

  
edit /home/project/tea-culture-mvp/src/test/components/ErrorBoundary.test.tsx  
  
- 1 import { describe, it, expect, vi} from 'vitest'  
+ 1 import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'  
  2 import { render, screen } from '@testing-library/react'  
  3 import { ErrorBoundary } from '@/components/shared/ErrorBoundary'  
  4  
  5 // Component that throws  
    ...  
  

The user said "yes, please meticulously proceed" which means they want me to continue executing the remediation plan. I just fixed the TypeScript error in the ErrorBoundary test. Let me now verify that everything passes, and then  
continue with the remaining fixes.  
  
The remaining fixes I need to complete:  
1. Fix 1.6: Not-found route (already created but needs route tree generation)  
2. Fix 1.7: Throttled scroll hook (new)  
3. Fix 1.8: Mobile menu focus trap (most complex)  
  
Let me first run verification to make sure things pass after the ErrorBoundary fix, then continue.  

  
$ cd /home/project/tea-culture-mvp && npx tsc --noEmit 2>&1 && echo "✅ TypeScript passes" && npx vitest run 2>&1 | tail -5 && echo "✅ Tests pass" (timeout 30s)  
  
... (2 earlier lines, ctrl+o to expand)  
      Tests  45 passed (45)  
   Start at  19:53:55  
   Duration  6.31s (transform 671ms, setup 911ms, import 2.64s, tests 2.50s, environment 10.39s)  
  
✅ Tests pass  
  
Took 11.2s  

