import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { resetSqlForTests } from "@/lib/clinic/db";
import {
  addCheckIn,
  addVital,
  authenticate,
  createLead,
  createPatient,
  ensureStaffSeeds,
  getPatient,
  getProtocol,
  linkEmaPatient,
  listRoster,
  saveEligibility,
  setMembership,
  setProtocol,
  updateVisit,
} from "@/lib/clinic/repo";
import { makeSession, readSession, signSession } from "@/lib/clinic/auth";
import {
  canStoreEmaAppointmentId,
  emaConfigured,
  searchEmaPatients,
} from "@/lib/clinic/ema";
import { getBillingProvider } from "@/lib/clinic/billing";

describe("clinic repo", () => {
  let dir: string;

  beforeEach(async () => {
    dir = mkdtempSync(path.join(tmpdir(), "pww-clinic-"));
    process.env.CLINIC_PG_PATH = dir;
    delete process.env.DATABASE_URL;
    await resetSqlForTests();
  });

  afterEach(() => {
    resetSqlForTests();
    rmSync(dir, { recursive: true, force: true });
  });

  it("records a weight without an EMA chart", async () => {
    const p = await createPatient({ name: "Ada Rhee", email: "ada@example.com" });
    expect(p.ema_patient_id).toBeNull();
    const v = await addVital({
      patientId: p.id,
      source: "patient",
      weightLb: 180,
    });
    expect(v.weight_lb).toBe(180);
  });

  it("adds another requested visit when the email already exists", async () => {
    const first = await createLead({
      name: "Dup",
      email: "dup@example.com",
      tier: "essential",
      modality: "in_person",
      password: "secret1",
      preferredWindow: "mornings",
    });
    const second = await createLead({
      name: "Dup",
      email: "dup@example.com",
      tier: "premium",
      modality: "remote",
      password: "ignored",
      preferredWindow: "next_week",
    });
    expect(second.patient.id).toBe(first.patient.id);
    expect(second.visit.id).not.toBe(first.visit.id);
    expect(second.visit.notes).toContain("next_week");
  });

  it("creates a book lead as membership lead + requested visit + portal user", async () => {
    const { patient, visit, user } = await createLead({
      name: "Casey Lead",
      email: "casey@example.com",
      phone: "2125550100",
      tier: "premium",
      modality: "remote",
      password: "portal-pass-1",
    });
    expect(user.role).toBe("patient");
    expect(visit.status).toBe("requested");
    expect(visit.modality).toBe("remote");
    const roster = await listRoster();
    expect(roster[0].id).toBe(patient.id);
    expect(roster[0].tier).toBe("premium");
    expect(roster[0].membership_status).toBe("lead");
    const authed = await authenticate("casey@example.com", "portal-pass-1");
    expect(authed?.patient_id).toBe(patient.id);
  });

  it("lets staff activate membership and set protocol without calling billing", async () => {
    const { patient } = await createLead({
      name: "Pat",
      email: "pat@example.com",
      tier: "essential",
      modality: "in_person",
      password: "x",
    });
    const m = await setMembership({
      patientId: patient.id,
      tier: "essential",
      status: "active",
      billingNote: "cash at visit",
    });
    expect(m.status).toBe("active");
    expect(m.provider).toBeNull();
    expect(getBillingProvider().name).toBe("manual");
    await setProtocol({
      patientId: patient.id,
      drug: "semaglutide",
      currentDose: "0.25 mg qw",
      nextAction: "stay",
    });
    const proto = await getProtocol(patient.id);
    expect(proto?.current_dose).toContain("0.25");
  });

  it("stores weekly check-in fields", async () => {
    const p = await createPatient({ name: "Chk", email: "chk@example.com" });
    const c = await addCheckIn({
      patient_id: p.id,
      week_of: "2026-08-17",
      feeling: 4,
      meds_taken: "Yes",
      side_effects: "mild nausea",
      diet: 3,
      exercise_days: 2,
      sleep: 3,
      energy: 3,
      challenge: "travel",
      went_well: "protein",
      questions: "dose?",
    });
    expect(c.feeling).toBe(4);
  });

  it("schedules a remote visit with a paste video url", async () => {
    const { visit } = await createLead({
      name: "Vid",
      email: "vid@example.com",
      tier: "concierge",
      modality: "remote",
      password: "x",
    });
    const updated = await updateVisit(visit.id, {
      status: "scheduled",
      videoUrl: "https://zoom.us/j/123",
      startsAt: "2026-09-01T15:00:00.000Z",
    });
    expect(updated.status).toBe("scheduled");
    expect(updated.video_url).toContain("zoom");
    expect(updated.ema_appointment_id).toBeNull();
  });

  it("links an EMA id only when staff sets it", async () => {
    const p = await createPatient({ name: "Link", email: "link@example.com" });
    const linked = await linkEmaPatient(p.id, "17481164");
    expect(linked.ema_patient_id).toBe("17481164");
    expect((await getPatient(p.id))?.ema_patient_id).toBe("17481164");
  });

  it("persists eligibility without a patient", async () => {
    const eid = await saveEligibility({
      bmi: 32.1,
      conditions: ["Hypertension"],
      insurer: "Aetna",
      qualifies: true,
    });
    expect(eid).toBeTruthy();
  });

  it("seeds doctor and staff logins", async () => {
    await ensureStaffSeeds();
    const doc = await authenticate("libby@precisionww.com", "clinic-dev-libby");
    expect(doc?.role).toBe("doctor");
    const staff = await authenticate(
      "jenny@precisionww.com",
      "clinic-dev-jenny"
    );
    expect(staff?.role).toBe("staff");
  });
});

describe("session", () => {
  it("round-trips a signed session and rejects tampering", () => {
    const s = makeSession({
      uid: "u1",
      role: "doctor",
      patientId: null,
      name: "Libby",
      email: "libby@precisionww.com",
    });
    const token = signSession(s);
    expect(readSession(token)?.uid).toBe("u1");
    expect(readSession(token.slice(0, -2) + "xx")).toBeNull();
  });
});

describe("ema helpers", () => {
  it("does not treat scheduled as bookable without pending/confirmed", () => {
    expect(canStoreEmaAppointmentId("PENDING")).toBe(true);
    expect(canStoreEmaAppointmentId("CONFIRMED")).toBe(true);
    expect(canStoreEmaAppointmentId("CANCELLED")).toBe(false);
  });

  it("search is fail-open when EMA cookie is missing", async () => {
    delete process.env.EMA_SESSION_COOKIE;
    expect(emaConfigured()).toBe(false);
    const res = await searchEmaPatients("Rhee");
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.reason).toBe("not_configured");
  });
});
