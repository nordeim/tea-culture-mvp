Skill Distillation Complete  
 
Here's what the skill captures from the WOOLSTEP MVP build at `https://github.com/nordeim/woolstep-mvp`:  
 
### 15 Sections Covering the Full Lifecycle  
 
┌────┬─────────────────────────────┬────────────────────────────────────────────────────────────────────────┐  
│ #  │ Section                     │ Key Takeaways                                                          │  
├────┼─────────────────────────────┼────────────────────────────────────────────────────────────────────────┤  
│ 1  │ Bootstrap                   │ Exact npm install commands with --legacy-peer-deps for Vite 8          │  
├────┼─────────────────────────────┼────────────────────────────────────────────────────────────────────────┤  
│ 2  │ TypeScript Config           │ strict, noUnusedLocals, erasableSyntaxOnly, no baseUrl                 │  
├────┼─────────────────────────────┼────────────────────────────────────────────────────────────────────────┤  
│ 3  │ Tailwind v4 Setup           │ @theme inline, no tailwind.config.js, semantic token naming            │  
├────┼─────────────────────────────┼────────────────────────────────────────────────────────────────────────┤  
│ 4  │ Negative Value Gotcha       │ bottom--24 → -bottom-24 (double vs single hyphen)                      │  
├────┼─────────────────────────────┼────────────────────────────────────────────────────────────────────────┤  
│ 5  │ Vite 8 Config               │ Function-form manualChunks (Rolldown requirement)                      │  
├────┼─────────────────────────────┼────────────────────────────────────────────────────────────────────────┤  
│ 6  │ TanStack Router             │ File-based, npx tsr generate after every route change                  │  
├────┼─────────────────────────────┼────────────────────────────────────────────────────────────────────────┤  
│ 7  │ Zustand                     │ Selector subscriptions, partialize for persist, no UI state in storage │  
├────┼─────────────────────────────┼────────────────────────────────────────────────────────────────────────┤  
│ 8  │ React 19 Hooks              │ useActionState form handling, useOptimistic instant feedback           │  
├────┼─────────────────────────────┼────────────────────────────────────────────────────────────────────────┤  
│ 9  │ inert Boolean Prop          │ inert={!isOpen} not 'true' — TS2322 trap                               │  
├────┼─────────────────────────────┼────────────────────────────────────────────────────────────────────────┤  
│ 10 │ Testing (TDD)               │ vi.mock('@tanstack/react-router'), act() for Zustand updates           │  
├────┼─────────────────────────────┼────────────────────────────────────────────────────────────────────────┤  
│ 11 │ Component Patterns          │ Early returns, cn() helper, shadcn + Tailwind override                 │  
├────┼─────────────────────────────┼────────────────────────────────────────────────────────────────────────┤  
│ 12 │ Build & QA Pipeline         │ Commands, targets, CI/CD stages                                        │  
├────┼─────────────────────────────┼────────────────────────────────────────────────────────────────────────┤  
│ 13 │ Common Gotchas              │ 10 gotchas with one-line fixes each                                    │  
├────┼─────────────────────────────┼────────────────────────────────────────────────────────────────────────┤  
│ 14 │ File Structure              │ Complete src/ tree with annotations                                    │  
├────┼─────────────────────────────┼────────────────────────────────────────────────────────────────────────┤  
│ 15 │ Anti-Pattern Reference Card │ 10 patterns from the codebase with fixes                               │  
└────┴─────────────────────────────┴────────────────────────────────────────────────────────────────────────┘  
 
### What Makes This Skill Unique  
 
- Bootstrapped from a real MVP — not theoretical, every line tested in production  
- 3 TypeScript traps documented — erasableSyntaxOnly, baseUrl, inert as boolean  
- 2 Tailwind v4 syntax traps — double-hyphen negatives, arbitrary values vs @theme  
- 2 Zustand traps — getState() in JSX, persisting UI state  
- Testing Library gotcha — vi.mock for TanStack Router in unit tests  
- Build pipeline — actual commands that pass on a working codebase

