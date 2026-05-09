npx vitest run 2>&1 | grep -E "Test Files|Tests" && npx tsc --noEmit && echo "TypeScript: clean" && npm run build 2>&1 | grep -E "built in|error" 
