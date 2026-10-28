# Shady Meadows B&B — AI-Assisted Test Plan

## 1. Application

- **Website:** https://automationintesting.online/
- **Scope:** Homepage booking controls, room options, navigation, and date-picker behavior.
- **Approach:** Browser inspection using Playwright MCP, followed by reviewed TypeScript Playwright tests.

## 2. Existing Automated Tests

| Test ID | Objective | Current Evidence |
|---|---|---|
| TC-SM-001 | Verify booking controls and room options | Passed in Chromium, Firefox, and WebKit |
| TC-SM-009 | Verify hero Book Now navigation | Passed in Chromium |
| TC-SM-010 | Verify in-page navigation targets exist | Fails: Amenities target missing |
| TC-SM-011 | Verify Check In calendar month navigation | Passed in Chromium |

## 3. Identified Defect

**Title:** Amenities navigation points to a missing target.

- **Observed link:** `/#amenities`
- **Expected target:** An element with `id="amenities"`.
- **Actual observation:** No matching element was found during browser inspection and automated testing.
- **Status:** Open — application-side investigation required.
- **Evidence:** TC-SM-010 fails with the message that the Amenities link should target an existing element with `id="amenities"`.

## 4. Test Safety

- Do not submit real bookings.
- Do not modify application data.
- Review AI-generated code before executing it.
- Preserve genuine application failures rather than weakening assertions to obtain a passing result.

## 5. Next Steps

1. Continue generating additional test scenarios through MCP browser inspection.
2. Review and approve generated TypeScript tests.
3. Execute approved tests in the configured browsers.
4. Record failures and distinguish application defects from test implementation problems.