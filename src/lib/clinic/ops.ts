import { randomUUID } from "node:crypto";
import { getSql } from "./db";
import { audit } from "./repo";
import type { ClinicTask, LabPanel, LabResult, CheckIn, Tier } from "./types";

function id(): string {
  return randomUUID();
}

export async function upsertLead(input: {
  email?: string | null;
  stage: string;
  payload: unknown;
  patientId?: string | null;
}): Promise<string> {
  const sql = await getSql();
  const lid = id();
  await sql.query(
    `insert into leads (id, email, stage, payload, patient_id, updated_at)
     values ($1,$2,$3,$4::jsonb,$5,now())`,
    [
      lid,
      input.email ?? null,
      input.stage,
      JSON.stringify(input.payload ?? {}),
      input.patientId ?? null,
    ]
  );
  return lid;
}

export async function createTask(input: {
  kind: string;
  title: string;
  body?: string | null;
  patientId?: string | null;
  priority?: number;
}): Promise<ClinicTask> {
  const sql = await getSql();
  const row: ClinicTask = {
    id: id(),
    kind: input.kind,
    priority: input.priority ?? (input.kind === "paid_not_booked" ? 100 : 10),
    status: "open",
    patient_id: input.patientId ?? null,
    title: input.title,
    body: input.body ?? null,
    due_at: null,
    created_at: new Date().toISOString(),
  };
  await sql.query(
    `insert into tasks (id, kind, priority, status, patient_id, title, body, created_at)
     values ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [
      row.id,
      row.kind,
      row.priority,
      row.status,
      row.patient_id,
      row.title,
      row.body,
      row.created_at,
    ]
  );
  await audit(null, input.patientId ?? null, "task.create", {
    kind: input.kind,
    title: input.title,
  });
  return row;
}

export async function listTasks(status = "open"): Promise<ClinicTask[]> {
  const sql = await getSql();
  const { rows } = await sql.query<ClinicTask>(
    `select * from tasks where status = $1 order by priority desc, created_at asc`,
    [status]
  );
  return rows;
}

export async function addCheckInV2(input: {
  patientId: string;
  weekOf: string;
  weightLb?: number | null;
  nausea: string;
  constipation: string;
  fatigue: string;
  injectionSite: string;
  adherence: string;
  hunger: number;
  note?: string | null;
}): Promise<{ checkIn: CheckIn; triage: boolean }> {
  const sql = await getSql();
  const grades = [
    input.nausea,
    input.constipation,
    input.fatigue,
    input.injectionSite,
  ];
  const triage = grades.includes("severe");
  const rowId = id();
  await sql.query(
    `insert into check_ins (
      id, patient_id, week_of, feeling, meds_taken, side_effects,
      nausea, constipation, fatigue, injection_site, adherence, hunger, note
    ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
    [
      rowId,
      input.patientId,
      input.weekOf,
      input.hunger,
      input.adherence,
      grades.filter((g) => g !== "none").join(", "),
      input.nausea,
      input.constipation,
      input.fatigue,
      input.injectionSite,
      input.adherence,
      input.hunger,
      input.note ?? null,
    ]
  );
  if (triage) {
    await createTask({
      kind: "triage_severe",
      title: "Severe symptom on weekly check-in",
      body: `nausea=${input.nausea} constipation=${input.constipation} fatigue=${input.fatigue} site=${input.injectionSite}`,
      patientId: input.patientId,
      priority: 90,
    });
  }
  const { rows } = await sql.query<CheckIn>(
    `select * from check_ins where id = $1`,
    [rowId]
  );
  return { checkIn: rows[0], triage };
}

export async function seedLabPanel(patientId: string): Promise<LabPanel> {
  const sql = await getSql();
  const existing = await sql.query<LabPanel>(
    `select * from lab_panels where patient_id = $1 limit 1`,
    [patientId]
  );
  if (existing.rows[0]) return existing.rows[0];
  const panel: LabPanel = {
    id: id(),
    patient_id: patientId,
    collected_on: new Date().toISOString().slice(0, 10),
    status: "resulted",
    notes: "Synthetic baseline panel for console demo",
  };
  await sql.query(
    `insert into lab_panels (id, patient_id, collected_on, status, notes)
     values ($1,$2,$3,$4,$5)`,
    [panel.id, panel.patient_id, panel.collected_on, panel.status, panel.notes]
  );
  const rows: Array<[string, number, string, number, number, string | null]> = [
    ["ALT", 28, "U/L", 7, 56, null],
    ["AST", 24, "U/L", 10, 40, null],
    ["A1c", 5.6, "%", 4, 5.6, null],
    ["LDL", 118, "mg/dL", 0, 100, "high"],
  ];
  for (const [analyte, value, unit, low, high, flag] of rows) {
    await sql.query(
      `insert into lab_results (id, panel_id, analyte, value, unit, ref_low, ref_high, flag)
       values ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [id(), panel.id, analyte, value, unit, low, high, flag]
    );
  }
  return panel;
}

export async function listLabInbox(): Promise<
  Array<LabResult & { patient_id: string; patient_name: string; collected_on: string }>
> {
  const sql = await getSql();
  const { rows } = await sql.query<
    LabResult & { patient_id: string; patient_name: string; collected_on: string }
  >(
    `select r.*, p.id as patient_id, p.name as patient_name, lp.collected_on
     from lab_results r
     join lab_panels lp on lp.id = r.panel_id
     join patients p on p.id = lp.patient_id
     order by lp.collected_on desc`
  );
  return rows;
}

export async function listPatientLabs(patientId: string): Promise<{
  panels: LabPanel[];
  results: LabResult[];
}> {
  const sql = await getSql();
  const panels = await sql.query<LabPanel>(
    `select * from lab_panels where patient_id = $1 order by collected_on desc`,
    [patientId]
  );
  const results = await sql.query<LabResult>(
    `select r.* from lab_results r
     join lab_panels lp on lp.id = r.panel_id
     where lp.patient_id = $1
     order by r.analyte`,
    [patientId]
  );
  return { panels: panels.rows, results: results.rows };
}

export async function pauseMembership(
  patientId: string,
  durationNote: string,
  actorId?: string | null
): Promise<void> {
  const sql = await getSql();
  await sql.query(
    `update memberships set status = 'paused', billing_note = $2 where patient_id = $1`,
    [patientId, durationNote]
  );
  await audit(actorId ?? null, patientId, "membership.pause", { durationNote });
}

export async function markDemoPaid(patientId: string, tier: Tier): Promise<void> {
  const sql = await getSql();
  await sql.query(
    `update memberships set status = 'active', tier = $2, started_on = coalesce(started_on, $3)
     where patient_id = $1`,
    [patientId, tier, new Date().toISOString().slice(0, 10)]
  );
  await audit(null, patientId, "membership.demo_paid", { tier });
}

export async function getConfig<T>(key: string, fallback: T): Promise<T> {
  const sql = await getSql();
  const { rows } = await sql.query<{ value: T }>(
    `select value from clinic_config where key = $1`,
    [key]
  );
  return rows[0]?.value ?? fallback;
}

export async function setConfig(key: string, value: unknown): Promise<void> {
  const sql = await getSql();
  await sql.query(
    `insert into clinic_config (key, value, updated_at)
     values ($1,$2::jsonb,now())
     on conflict (key) do update set value = excluded.value, updated_at = now()`,
    [key, JSON.stringify(value)]
  );
}

export async function saveVisitNote(input: {
  visitId: string;
  body: string;
  prefillSources?: unknown;
  sign?: boolean;
  actorId?: string | null;
}): Promise<void> {
  const sql = await getSql();
  await sql.query(
    `insert into visit_notes (id, visit_id, body, prefill_sources, signed_at, signed_by)
     values ($1,$2,$3,$4::jsonb,$5,$6)`,
    [
      id(),
      input.visitId,
      input.body,
      JSON.stringify(input.prefillSources ?? []),
      input.sign ? new Date().toISOString() : null,
      input.sign ? input.actorId ?? null : null,
    ]
  );
}

export function previsitBrief(input: {
  name: string;
  lastWeight?: number | null;
  startWeight?: number | null;
  dose?: string | null;
  lastCheckIn?: CheckIn | null;
}): string {
  const change =
    input.lastWeight != null && input.startWeight != null
      ? `${(input.startWeight - input.lastWeight).toFixed(1)} lb since start`
      : "no weight pair yet";
  const se = input.lastCheckIn?.side_effects || "none noted";
  const adh = input.lastCheckIn?.adherence || input.lastCheckIn?.meds_taken || "unknown";
  return [
    `Change: ${change}.`,
    `Side effects: ${se}.`,
    `Adherence: ${adh}.`,
    `Dose: ${input.dose ?? "not set"}.`,
    `Decision: review titration and side-effect grade.`,
  ].join(" ");
}

export async function insights() {
  const sql = await getSql();
  const members = await sql.query<{ n: number }>(
    `select count(*)::int as n from memberships where status = 'active'`
  );
  const checkins = await sql.query<{ n: number }>(
    `select count(*)::int as n from check_ins where week_of >= (current_date - interval '7 days')`
  );
  const leads = await sql.query<{ n: number }>(
    `select count(*)::int as n from memberships where status = 'lead'`
  );
  return {
    activeMembers: members.rows[0]?.n ?? 0,
    checkInsThisWeek: checkins.rows[0]?.n ?? 0,
    openLeads: leads.rows[0]?.n ?? 0,
  };
}
