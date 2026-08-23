import { test, expect } from "@playwright/test";

const email = `casey.e2e.${Date.now()}@example.com`;
const password = "portal-pass-1";

test("purchase waitlist for MI", async ({ page }) => {
  await page.goto("/start");
  await page.getByTestId("start-state").selectOption("MI");
  await page.getByTestId("start-continue").click();
  await page.getByTestId("waitlist-email").fill("wait@example.com");
  await page.getByTestId("waitlist-submit").click();
  await expect(page.getByText(/waitlist/i)).toBeVisible();
});

test("three surfaces: start → portal check-in → console queue", async ({ page }) => {
  await page.goto("/book");
  await expect(page).toHaveURL(/\/start/);
  await expect(page.locator("iframe")).toHaveCount(0);

  await page.getByTestId("start-state").selectOption("NY");
  await page.getByTestId("start-continue").click();
  await page.getByTestId("start-weight").fill("180");
  await page.getByTestId("start-email").fill(email);
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByTestId("start-see-results").click();
  await expect(page.getByText(/candidate/i)).toBeVisible();
  await page.getByRole("button", { name: /Choose your plan/ }).click();
  await expect(page.getByText(/Pharmacy bills separately/).first()).toBeVisible();
  await page.getByTestId("tier-premium").click();
  await page.getByTestId("plan-continue").click();

  await page.getByTestId("lead-name").fill("Casey E2E");
  await page.getByTestId("lead-email").fill(email);
  await page.getByTestId("lead-phone").fill("2125550199");
  await page.getByTestId("lead-password").fill(password);
  await page.getByTestId("lead-submit").click();
  await expect(page.getByText(/Sign my forms|send your forms/i)).toBeVisible();
  await page.getByRole("button", { name: /Continue to payment/ }).click();
  await page.getByTestId("pay-demo").click();
  await page.locator('[data-testid^="slot-"]').first().click();
  await page.getByRole("button", { name: /^Continue$/ }).click();
  await expect(page.getByTestId("lead-success")).toBeVisible();

  await page.goto("/staff/login");
  await page.getByTestId("login-email").fill("libby@precisionww.com");
  await page.getByTestId("login-password").fill("clinic-dev-libby");
  await page.getByTestId("login-submit").click();
  await expect(page.getByRole("heading", { name: "Schedule" })).toBeVisible();
  await page.goto("/staff/patients");
  await expect(page.getByRole("heading", { name: /roster/i })).toBeVisible();
  await page.getByTestId(`patient-${email}`).click();
  await expect(page.getByTestId("patient-name")).toHaveText("Casey E2E");

  await page.getByTestId("membership-status").selectOption("active");
  await page.getByTestId("membership-save").click();
  await page.getByTestId("vital-weight").fill("180");
  await page.getByTestId("vital-save").click();
  await page.getByTestId("protocol-drug").fill("semaglutide");
  await page.getByTestId("protocol-dose").fill("0.25 mg qw");
  await page.getByTestId("protocol-save").click();
  await expect(page.getByTestId("protocol-current")).toContainText("0.25");

  await page.goto("/app/login");
  await page.getByTestId("login-email").fill(email);
  await page.getByTestId("login-password").fill(password);
  await page.getByTestId("login-submit").click();
  await expect(page.getByTestId("patient-dose")).toContainText("semaglutide");

  await page.goto("/app/check-in");
  await page.getByTestId("patient-weight").fill("179");
  await page.getByTestId("nausea-severe").check();
  await page.getByTestId("checkin-save").click();
  await expect(page.getByTestId("checkin-done")).toContainText(/touch|received/i);

  await page.goto("/staff/login");
  await page.getByTestId("login-email").fill("libby@precisionww.com");
  await page.getByTestId("login-password").fill("clinic-dev-libby");
  await page.getByTestId("login-submit").click();
  await expect(page.getByRole("heading", { name: "Schedule" })).toBeVisible();
  await page.goto("/staff/queue");
  await expect(page.locator("body")).toContainText(/Severe symptom|Paid, not booked/i);

  await page.goto("/hipaa");
  await expect(page.locator("body")).not.toContainText("Healthie");
});
