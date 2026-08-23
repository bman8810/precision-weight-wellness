import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import path from "node:path";

const out = path.join(process.cwd(), "tmp-shots");
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const base = process.env.BASE_URL || "http://127.0.0.1:3460";

async function shot(name) {
  const file = path.join(out, name);
  await page.screenshot({ path: file, fullPage: true });
  console.log(file);
}

await page.goto(base + "/start", { waitUntil: "networkidle" });
await shot("01-start-state.png");
await page.getByTestId("start-state").selectOption("NY");
await page.getByTestId("start-continue").click();
await shot("02-start-about.png");

await page.goto(base + "/staff/login");
await page.getByTestId("login-email").fill("libby@precisionww.com");
await page.getByTestId("login-password").fill("clinic-dev-libby");
await page.getByTestId("login-submit").click();
await page.getByRole("heading", { name: "Schedule" }).waitFor();
await shot("03-staff-today.png");
await page.goto(base + "/staff/queue");
await shot("04-staff-queue.png");
await page.goto(base + "/staff/inbox");
await shot("05-staff-inbox.png");
await page.goto(base + "/app/login");
await shot("06-patient-login.png");

await browser.close();
