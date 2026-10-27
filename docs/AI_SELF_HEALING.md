# AI-assisted locator self-healing design

## Isolated failing examples
`features/broken-locators.feature` has three **intentionally broken** locators in `step-definitions/broken.steps.js`. These scenarios are marked `@intentional-failure`, excluded from the standard suite, and should **fail** when run using `npm run test:broken`. Do not claim that intentional failures are production defects.

## Detection
1. Capture Playwright timeout/errors, current URL, page DOM snapshot, and screenshot on failure.
2. Identify which selector was not found and compare it with current accessible labels, roles, and test IDs.
3. Check whether the failure is truly selector drift, not a missing navigation step, loading issue, or application defect.

## Suggested AI prompt
"The Playwright locator `#submitEMI_legacy` timed out. Use only the attached accessibility snapshot/DOM and failing-step context. Suggest up to three durable role/label/data-testid alternatives. Explain uniqueness and stability. Do not invent DOM attributes. Do not modify files until I approve."

## Validation before applying
- Confirm the chosen locator uniquely resolves to one element in the relevant page state.
- Verify role, label, text, or test-id exists in actual DOM (no hallucinated selector).
- Re-run the single failed scenario, plus standard regression suite.
- Keep logs/screenshots and manually review code diff before merge.
- Require human approval; no silent self-healing in CI.

## Candidate resolutions (do NOT apply to the broken exercises)
- `#submitEMI_legacy` -> `getByRole('button', {name:'Calculate EMI'})`
- `getByTestId('emi-output-old')` -> `getByTestId('emi-result')`
- `.pie-chart-deprecated` -> `getByTestId('repayment-chart')`

This repository documents a self-healing workflow; it does **not** claim an automatically implemented AI self-healing engine.
