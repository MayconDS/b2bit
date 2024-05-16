import { defineConfig } from "playwright/test";

export default defineConfig({
  use: {
    baseURL: "http://localhost:5173", // Altere para a URL base do seu aplicativo
    headless: false,
  },
  testDir: "src/tests/e2e",
});
