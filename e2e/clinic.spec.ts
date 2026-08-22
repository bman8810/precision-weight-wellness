import { test, expect } from "@playwright/test";

const email = `casey.e2e.${Date.now()}@example.com`;
const password = "portal-pass-1";

test("clinic replaces Healthie end to end", async ({ page }) => {
  await page.goto("/book");
  await expect(page.locator("iframe")).toHaveCount(0);
  await expect(page.locator("body")).not.toContainText("gethealthie");

  await page.getByTestId("tier-premium").click();
  await expect(page.getByTestId("lead-form")).toBeVisible();
  await page.getByTestId("lead-name").fill("Casey E2E");
  await page.getByTestId("lead-email").fill(email);
  await page.getByTestId("lead-phone").fill("2125550199");
  await page.getByTestId("lead-password").fill(password);
  await page.getByTestId("lead-modality").selectOption("remote");
  await page.getByTestId("lead-submit").click();
  await expect(page.getByTestId("lead-success")).toBeVisible();

  await page.goto("/staff/login");
  await page.getByTestId("login-email").fill("libby@precisionww.com");
  await page.getByTestId("login-password").fill("clinic-dev-libby");
  await page.getByTestId("login-submit").click();
  await expect(page.getByRole("heading", { name: "Patient roster" })).toBeVisible();
  await page.getByTestId(`patient-${email}`).click();
  await expect(page.getByTestId("patient-name")).toHaveText("Casey E2E");

  await page.getByTestId("membership-status").selectOption("active");
  await page.getByTestId("membership-save").click();

  await page.getByTestId("vital-weight").fill("180");
  await page.getByTestId("vital-save").click();
  await expect(page.getByTestId("vitals-list")).toContainText("180");

  await page.getByTestId("protocol-drug").fill("semaglutide");
  await page.getByTestId("protocol-dose").fill("0.25 mg qw");
  await page.getByTestId("protocol-save").click();
  await expect(page.getByTestId("protocol-current")).toContainText("0.25");

  await page.getByTestId("visit-modality").selectOption("remote");
  await page.getByTestId("visit-video").fill("https://zoom.us/j/123");
  await page.getByTestId("visit-save").click();
  await expect(page.getByTestId("visits-list")).toContainText("remote");
  await expect(page.getByTestId("visits-list")).toContainText("zoom.us");

  await page.goto("/app/login");
  await page.getByTestId("login-email").fill(email);
  await page.getByTestId("login-password").fill(password);
  await page.getByTestId("login-submit").click();
  await expect(page.getByTestId("patient-dose")).toContainText("semaglutide");
  await expect(page.getByTestId("patient-visit")).toContainText(/remote/i);

  await page.getByTestId("patient-weight").fill("179");
  await page.getByTestId("patient-weight-save").click();
  await expect(page.getByTestId("patient-last-weight")).toContainText("179");

  await page.getByTestId("checkin-feeling").fill("4");
  await page.getByTestId("checkin-side").fill("mild nausea");
  await page.getByTestId("checkin-save").click();
  await expect(page.getByTestId("checkin-count")).toContainText("1 check-in");

  await page.goto("/hipaa");
  await expect(page.locator("body")).not.toContainText("Healthie");
  await expect(page.locator("body")).toContainText("ModMed EMA");
});
