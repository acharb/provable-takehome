// @ts-check
import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("has correct title", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await expect(page).toHaveTitle("EthDash");
  });

  test("loads and displays stats grid", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    await expect(page.locator('[data-testid="stats-grid"]')).toBeVisible();
  });

  test("loads and displays transaction sections", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    await expect(
      page.locator('[data-testid="transaction-sections"]')
    ).toBeVisible();
  });
});

test.describe("Wallet Page", () => {
  test("loads and displays wallet page", async ({ page }) => {
    await page.goto(
      "http://localhost:3000/wallet/0xfd9238dcd679316c6a95c08490e049fcaa9c979e"
    );
    await expect(page.locator('[data-testid="account-id"]')).toBeVisible();

    await expect(page.locator('[data-testid="account-id"]')).toHaveText(
      "0xfd9238dcd679316c6a95c08490e049fcaa9c979e"
    );

    await expect(page.locator('[data-testid="total-balance"]')).toBeVisible();
    await expect(page.locator('[data-testid="total-balance"]')).not.toBeEmpty();
  });
});

test.describe("Transaction Page", () => {
  test("loads and displays wallet page", async ({ page }) => {
    await page.goto(
      "http://localhost:3000/transaction/0x4dbc58087dedcfda29282d2639a8a9d4ab08598ea6aa8a6c67fd0a0841570de1"
    );
    await expect(
      page.locator('[data-testid="transaction-hash"]')
    ).toBeVisible();

    await expect(page.locator('[data-testid="transaction-hash"]')).toHaveText(
      "0x4dbc58087dedcfda29282d2639a8a9d4ab08598ea6aa8a6c67fd0a0841570de1"
    );

    await expect(
      page.locator('[data-testid="transaction-from"]')
    ).toBeVisible();
    await expect(page.locator('[data-testid="transaction-to"]')).toBeVisible();
    await expect(
      page.locator('[data-testid="transaction-value"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="transaction-value"]')
    ).not.toBeEmpty();
  });
});
