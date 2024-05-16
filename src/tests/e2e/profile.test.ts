import { test, expect } from "@playwright/test";
import { chromium } from "playwright";

test.describe("Profile", () => {
  test("should be redirected if credentials its not valid", async ({}) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();

    await context.addInitScript(() => {
      localStorage.removeItem("tokens");
    });

    const page = await context.newPage();
    await page.goto("/profile");
    await expect(page).toHaveURL("/login");
    await browser.close();
  });

  test("should be load the profile page if credentials its valid", async ({}) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();

    await context.addInitScript(() => {
      localStorage.setItem("tokens", "any_token");
    });

    const page = await context.newPage();
    await page.goto("/profile");
    await expect(page).toHaveURL("/profile");
    await browser.close();
  });

  test("should be redirect to login if button logout was clicked", async ({}) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();

    await context.addInitScript(() => {
      localStorage.setItem("tokens", "any__token");
    });
    const page = await context.newPage();
    await page.goto("/profile");
    await page.click("button[id=logout]");
    await expect(page).toHaveURL("/login");
    await browser.close();
  });
});
