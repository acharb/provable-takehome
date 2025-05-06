# Test info

- Name: Home Page >> loads and displays transaction sections
- Location: /Users/aleccharbonneau/Desktop/web3-dashboardportfolio-grgltx/tests/example.spec.js:16:7

# Error details

```
Error: browserType.launch: Target page, context or browser has been closed
Browser logs:

<launching> /Users/aleccharbonneau/Library/Caches/ms-playwright/webkit-2158/pw_run.sh --inspector-pipe --headless --no-startup-window
<launched> pid=11375
[pid=11375][err] /Users/aleccharbonneau/Library/Caches/ms-playwright/webkit-2158/pw_run.sh: line 7: 11381 Bus error: 10           DYLD_FRAMEWORK_PATH="$DYLIB_PATH" DYLD_LIBRARY_PATH="$DYLIB_PATH" "$PLAYWRIGHT" "$@"
Call log:
  - <launching> /Users/aleccharbonneau/Library/Caches/ms-playwright/webkit-2158/pw_run.sh --inspector-pipe --headless --no-startup-window
  - <launched> pid=11375
  - [pid=11375][err] /Users/aleccharbonneau/Library/Caches/ms-playwright/webkit-2158/pw_run.sh: line 7: 11381 Bus error: 10           DYLD_FRAMEWORK_PATH="$DYLIB_PATH" DYLD_LIBRARY_PATH="$DYLIB_PATH" "$PLAYWRIGHT" "$@"

```

# Test source

```ts
   1 | // @ts-check
   2 | import { test, expect } from "@playwright/test";
   3 |
   4 | test.describe("Home Page", () => {
   5 |   test("has correct title", async ({ page }) => {
   6 |     await page.goto("http://localhost:3000/");
   7 |     await expect(page).toHaveTitle("EthDash");
   8 |   });
   9 |
  10 |   test("loads and displays stats grid", async ({ page }) => {
  11 |     await page.goto("http://localhost:3000/");
  12 |
  13 |     await expect(page.locator('[data-testid="stats-grid"]')).toBeVisible();
  14 |   });
  15 |
> 16 |   test("loads and displays transaction sections", async ({ page }) => {
     |       ^ Error: browserType.launch: Target page, context or browser has been closed
  17 |     await page.goto("http://localhost:3000/");
  18 |
  19 |     await expect(
  20 |       page.locator('[data-testid="transaction-sections"]')
  21 |     ).toBeVisible();
  22 |   });
  23 | });
  24 |
  25 | test.describe("Wallet Page", () => {
  26 |   test("loads and displays wallet page", async ({ page }) => {
  27 |     await page.goto(
  28 |       "http://localhost:3000/wallet/0xfd9238dcd679316c6a95c08490e049fcaa9c979e"
  29 |     );
  30 |     await expect(page.locator('[data-testid="account-id"]')).toBeVisible();
  31 |
  32 |     await expect(page.locator('[data-testid="account-id"]')).toHaveText(
  33 |       "0xfd9238dcd679316c6a95c08490e049fcaa9c979e"
  34 |     );
  35 |
  36 |     await expect(page.locator('[data-testid="total-balance"]')).toBeVisible();
  37 |     await expect(page.locator('[data-testid="total-balance"]')).not.toBeEmpty();
  38 |   });
  39 | });
  40 |
  41 | test.describe("Transaction Page", () => {
  42 |   test("loads and displays wallet page", async ({ page }) => {
  43 |     await page.goto(
  44 |       "http://localhost:3000/transaction/0x4dbc58087dedcfda29282d2639a8a9d4ab08598ea6aa8a6c67fd0a0841570de1"
  45 |     );
  46 |     await expect(
  47 |       page.locator('[data-testid="transaction-hash"]')
  48 |     ).toBeVisible();
  49 |
  50 |     await expect(page.locator('[data-testid="transaction-hash"]')).toHaveText(
  51 |       "0x4dbc58087dedcfda29282d2639a8a9d4ab08598ea6aa8a6c67fd0a0841570de1"
  52 |     );
  53 |
  54 |     await expect(
  55 |       page.locator('[data-testid="transaction-from"]')
  56 |     ).toBeVisible();
  57 |     await expect(page.locator('[data-testid="transaction-to"]')).toBeVisible();
  58 |     await expect(
  59 |       page.locator('[data-testid="transaction-value"]')
  60 |     ).toBeVisible();
  61 |     await expect(
  62 |       page.locator('[data-testid="transaction-value"]')
  63 |     ).not.toBeEmpty();
  64 |   });
  65 | });
  66 |
```