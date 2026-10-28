# AI Test Generator — Input

## Application Details

- **Application URL:** https://automationintesting.online/
- **Feature:** Header navigation
- **Scope:** Verify navigation links, destination URLs, and matching section targets.

## Generation Requirements

- **Test framework:** Playwright
- **Language:** TypeScript
- **Test style:** `@playwright/test`
- **Browser inspection:** Playwright MCP
- **Output:** Test plan and proposed TypeScript test code

## Constraints

1. Inspect the application before generating tests.
2. Use browser-observed evidence; do not invent selectors or behavior.
3. Reuse existing tests where appropriate instead of duplicating coverage.
4. Identify potential application defects separately from automation errors.
5. Do not submit bookings or modify application data.
6. Do not edit project files or execute generated tests without approval.
7. Keep generated code concise and maintainable.

## Required Output

1. Feature summary
2. Test scenarios with unique IDs
3. Evidence and assumptions
4. Potential defects
5. Proposed TypeScript test code
6. Recommended test filename
7. Known limitations and unverified behavior