# Streamhub QA Automation Assessment — Section A

A JavaScript-based EMI Calculator web application with UI and API automation, SQL exercises, and an AI-assisted locator self-healing design. The project uses Playwright, Cucumber, Page Object Model (POM), environment-based configuration, and independently calculated test expectations.

## Scope

- **A1 — Web application:** Local EMI calculator with loan inputs, repayment summary, and a principal-versus-interest doughnut chart.
- **A2 — UI automation:** Playwright + Cucumber scenarios for dashboard loading, EMI calculations, and chart validation.
- **A3 — API tests:** Boundary probes for `POST https://jsonplaceholder.typicode.com/posts` using Playwright's API client.
- **A4 — SQL:** SQLite schema, sample data, reciprocal bank transfers, and 2024 IPL-style performance streaks.
- **AI self-healing:** Three deliberately broken locators, isolated from the normal suite, with a documented repair-validation process.

## Prerequisites

- Node.js 22 or later and npm
- Python 3.9 or later for SQL fixtures
- Internet connection to install packages and test JSONPlaceholder

## Setup and execution

In the project directory, open a terminal:

```powershell
npm install
npx playwright install chromium
Copy-Item .env.example .env
npm start
```

Open `http://127.0.0.1:3000`. Keep the server running and use a second terminal:

```powershell
npm test
npm run test:ui
npm run test:api
npm run sql:run
```

Run deliberately failing locator scenarios separately:

```powershell
npm run test:broken
```

This command is **expected to return a failure status**, because it tests intentionally broken locators.

Generate HTML reports:

```powershell
npx cucumber-js --tags "not @intentional-failure" --format progress --format "html:reports/cucumber-report.html"
npx cucumber-js features/broken-locators.feature --format "html:reports/intentional-failures.html"
```

## Framework architecture

| Directory | Purpose |
| --- | --- |
| `app/` | EMI Calculator application and repayment chart |
| `server/` | Express server for local application |
| `features/` | Business-readable Gherkin scenarios |
| `step-definitions/` | Playwright steps and assertions |
| `pages/` | Page Object Model and resilient locators |
| `support/` | Browser lifecycle, Cucumber World, failure screenshots |
| `sql/` | Schema, fixtures, and SQL queries |
| `docs/` | AI self-healing design and other notes |
| `reports/` | HTML reports, logs, screenshots, and SQL outputs |

Variables such as `BASE_URL`, `API_BASE_URL`, `PORT`, and `HEADLESS` are configured via `.env`. Localhost is a development fallback.

## Test execution results

The following were observed locally on Windows on **27 October 2026**.

### Standard Playwright + Cucumber suite

| Metric | Observed result |
| --- | --- |
| Scenarios | 7 |
| Passed | 7 |
| Failed | 0 |
| Steps | 21 |
| Passed steps | 21 |
| Execution duration | 6.515 seconds |

**Evidence:** `reports/cucumber-report.html` and `reports/screenshots/normal-tests-passed.png`.

The suite exercises dashboard navigation, independently validated EMI calculations, repayment chart checks, and JSONPlaceholder API boundary probes.

### Intentional locator failures

Three broken locator scenarios were executed separately. Each produced the expected *element not found* failure:

| Intentionally broken locator | Observed result |
| --- | --- |
| `#submitEMI_legacy` | Locator not found |
| `getByTestId('emi-output-old')` | Locator not found |
| `.pie-chart-deprecated` | Locator not found |

**Result:** 3 scenarios, 3 expected failures. These are demonstration cases, not regressions in the normal suite.

**Evidence:** `reports/intentional-failures.html`, `docs/AI_SELF_HEALING.md`, and `reports/screenshots/intentional-locator-failures.png`.

### API boundary findings

Three POST requests to JSONPlaceholder tested an excessively long title, special characters, and a missing `userId`. All returned **HTTP 201** during the observed execution.

JSONPlaceholder is a mock API that accepted these payloads; this is **not proof that invalid-input rejection works**. The automated probes document response handling and check for server-side failures. A production API with a defined schema should additionally assert the appropriate 4xx responses and error payloads.

## SQL results

The SQL examples use **synthetic fixture data**. The IPL-style player names and matches are not verified real IPL 2024 records.

### Scenario 1 — Round-trip transfers

Find A → B followed by B → A within 24 hours where the return amount differs from the outgoing amount by no more than 10%.

| Account A | Account B | Sent | Returned | Time gap |
| --- | --- | ---: | ---: | --- |
| A | B | 1,000 | 950 | 3 hours |
| G | H | 1,250 | 1,300 | 23 hours |

**Query:** `sql/02_round_trip.sql`.

### Scenario 2 — IPL-style scoring streaks

Find players who score at least 30 runs in at least three consecutive matches in each player's chronological match sequence.

| Player | Streak start | Consecutive matches |
| --- | --- | ---: |
| Aarav | 2024-04-01 | 3 |
| Bharat | 2024-04-09 | 3 |

**Query:** `sql/03_ipl_streaks.sql`. **Fixture:** `sql/01_schema_and_data.sql`.

**Evidence:** `reports/screenshots/sql-round-trip.png` and `reports/screenshots/sql-ipl-streaks.png`. Running `npm run sql:run` can generate additional results for inclusion.

## AI-assisted locator self-healing

The project deliberately retains three incorrect locators in isolated scenarios. `docs/AI_SELF_HEALING.md` explains how to capture failures, inspect the actual DOM/accessibility tree, request grounded AI suggestions, validate locator uniqueness and semantics, rerun affected tests, and review a proposed change before applying it.

This is a **documented design and failure demonstration**, not an implemented automatic self-healing engine.

## AI-assisted development reflection

### How I used AI

I used ChatGPT to assist with the project structure, Playwright and Cucumber configuration, framework organization, and debugging during this assessment.

### What worked well

AI assistance helped explain how feature files, step definitions, and Page Object Model classes work together. It also supported troubleshooting a Windows command-quoting issue and a missing Playwright Chromium executable.

### What needed correction

Two EMI scenarios initially failed even though the EMI formula was correct. The HTML loan amount field used `min="1"` with `step="1000"`, which prevented some valid whole-rupee amounts from submitting. Changing `step` to `1` resolved the problem, and the scenarios passed on rerun. This illustrated why failed assertions should be investigated rather than assuming the business calculation is wrong.

### Manual verification

I executed the normal suite locally and verified **7 passing scenarios and 21 passing steps**. I ran the three intentionally broken locator scenarios separately and confirmed they failed with missing-element errors. I also ran both SQL queries using SQLite and reviewed the results.

### Key learning

AI speeds up setup and debugging, but its suggestions still require manual review. Maintainable automation depends on stable locators, independent expected-value calculations, and transparent reporting of observed behavior.

## Evidence and submission checklist

- [x] Run standard suite and inspect passing HTML report.
- [x] Execute intentionally failing locator scenarios separately.
- [x] Execute both SQL queries using fixture data.
- [x] Capture test/SQL output evidence.
- [x] Complete AI development reflection based on actual work.
- [ ] Confirm `npm run sql:run` executes successfully and commit generated SQL outputs if applicable.
- [ ] Verify `.gitignore` excludes `node_modules/`, `.env`, and private local files while preserving required evidence.
- [ ] Commit source, README, HTML reports, screenshots, and relevant logs to GitHub.
- [ ] Verify repository contents and send its URL to Streamhub.

**Note:** These are locally observed results; publication to GitHub is not yet claimed. Review this README against the actual repository files before submission.
