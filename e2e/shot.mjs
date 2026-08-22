import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import path from "node:path";

const out = path.join(process.cwd(), "tmp-shots");
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const base = process.env.BASE_URL || "http://127.0.0.1:3456";

async function shot(name) {
  const file = path.join(out, name);
  await page.screenshot({ path: file, fullPage: true });
  console.log(file);
}

await page.goto(base + "/book", { waitUntil: "networkidle" });
await shot("01-book.png");
await page.getByTestId("tier-premium").click();
await page.getByTestId("lead-form").waitFor();
await shot("02-book-lead.png");

const email = `shot.${Date.now()}@example.com`;
await page.getByTestId("lead-name").fill("Screenshot Patient");
await page.getByTestId("lead-email").fill(email);
await page.getByTestId("lead-password").fill("portal-pass-1");
await page.getByTestId("lead-modality").selectOption("remote");
await page.getByTestId("lead-submit").click();
await page.getByTestId("lead-success").waitFor();
await shot("03-book-success.png");

await page.goto(base + "/staff/login");
await page.getByTestId("login-email").fill("libby@precisionww.com");
await page.getByTestId("login-password").fill("clinic-dev-libby");
await page.getByTestId("login-submit").click();
await page.getByRole("heading", { name: "Patient roster" }).waitFor();
await shot("04-staff-roster.png");

await page.getByTestId(`patient-${email}`).click();
await page.getByTestId("patient-name").waitFor();
await page.getByTestId("protocol-save").click();
await shot("05-staff-chart.png");

await page.goto(base + "/app/login");
await page.getByTestId("login-email").fill(email);
await page.getByTestId("login-password").fill("portal-pass-1");
await page.getByTestId("login-submit").click();
await page.getByTestId("patient-dose").waitFor();
await shot("06-patient-app.png");

await page.goto(base + "/");
await page.waitForTimeout(800);
await shot("07-home.png");

await browser.close();
