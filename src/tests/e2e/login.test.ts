import { test, expect } from "@playwright/test";

test.describe("Login", () => {
  test("should load the login page", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveTitle("B2BIT - Maycon :)");
  });

  test("should accept user inputs", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "cliente@youdrive.com");
    await page.fill('input[name="password"]', "password");
  });

  test("should display toast error if invalid credentials is provided", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "wronguser");
    await page.fill('input[name="password"]', "wrongpassword");
    await page.click('button[type="submit"]');
    await expect(page.locator(".toastify-error-msg")).toBeTruthy();
  });
  test("should display an error message if the password does not meet the requirements", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.fill('input[name="password"]', "123");
    await page.click('button[type="submit"]');
    await expect(page.locator(".error-password")).toHaveText(
      "Password must be between 4-16 characters!"
    );
  });
  test("should display an error message if the email does not meet the requirements", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "wrongmail.com");
    await page.click('button[type="submit"]');
    await expect(page.locator(".error-email")).toHaveText("Invalid Email!");
  });
  test("should navigate to profile page on successful login", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "cliente@youdrive.com");
    await page.fill('input[name="password"]', "password");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL("/profile");
  });
});
