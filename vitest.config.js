import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./testSetup.js"],
    include: ["./src/**/*.test.jsx"],
    globals: true,
  },
});
