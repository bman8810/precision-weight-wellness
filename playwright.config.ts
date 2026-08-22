import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  timeout: 90_000,
  use: {
    baseURL: "http://127.0.0.1:3456",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npx next dev --port 3456",
    url: "http://127.0.0.1:3456",
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      ...process.env,
      CLINIC_PG_PATH: "./data/e2e-clinic",
      CLINIC_SESSION_SECRET: "e2e-secret",
      DATABASE_URL: "",
      EMA_SESSION_COOKIE: "",
    },
  },
});
