import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { resetSqlForTests } from "./db";
import { createPatient } from "./repo";
import { addCheckInV2, listTasks } from "./ops";

describe("check-in v2", () => {
  let dir: string;
  beforeEach(async () => {
    dir = mkdtempSync(path.join(tmpdir(), "pww-ops-"));
    process.env.CLINIC_PG_PATH = dir;
    delete process.env.DATABASE_URL;
    await resetSqlForTests();
  });
  afterEach(() => {
    resetSqlForTests();
    rmSync(dir, { recursive: true, force: true });
  });

  it("creates a triage task before returning on severe", async () => {
    const p = await createPatient({ name: "Severe Case", email: "sev@example.com" });
    const r = await addCheckInV2({
      patientId: p.id,
      weekOf: "2026-08-23",
      nausea: "severe",
      constipation: "none",
      fatigue: "none",
      injectionSite: "none",
      adherence: "all",
      hunger: 4,
    });
    expect(r.triage).toBe(true);
    const tasks = await listTasks();
    expect(tasks.some((t) => t.kind === "triage_severe")).toBe(true);
  });
});
