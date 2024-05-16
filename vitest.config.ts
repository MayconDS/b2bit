import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/tests/unit/**/*.spec.ts", "src/tests/unit/**/*.spec.tsx"],
  },
});
