import { randomUUID } from "node:crypto";
import { getSql } from "./db";
import { hashPassword, verifyPassword } from "./auth";
import type {
  CheckIn,
  Membership,
  MembershipStatus,
  Patient,
  ProtocolAction,
  ProtocolState,
  Role,
  RosterRow,
  Tier,
  User,
  Visit,
  VisitModality,
  VisitStatus,
  Vital,
  VitalSource,
} from "./types";

function id(): string {
  return randomUUID();
}

function lower(email: string): string {
  return email.trim().toLowerCase();
}

export async function createPatient(input: {
  name: string;
  email?: string | null;
  phone?: string | null;
  dob?: string | null;
}): Promise<Patient> {
  const sql = await getSql();
  const row: Patient = {
    id: id(),
    name: input.name.trim(),
    email: input.email ? lower(input.email) : null,
    phone: input.phone ?? null,
    dob: input.dob ?? null,
    ema_patient_id: null,
    created_at: new Date().toISOString(),
  };
  await sql.query(
    `insert into patients (id, email, phone, name, dob, ema_patient_id, created_at)
     values ($1,$2,$3,$4,$5,$6,$7)`,
    [row.id, row.email, row.phone, row.name, row.dob, null, row.created_at]
  );
  return row;
}

export async function getPatient(patientId: string): Promise<Patient | null> {
  const sql = await getSql();
  const { rows } = await sql.query<Patient>(
    `select * from patients where id = $1`,
    [patientId]
  );
  return rows[0] ?? null;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const sql = await getSql();
  const { rows } = await sql.query<User>(
    `select id, email, role, patient_id, name from users where email = $1`,
    [lower(email)]
  );
  return rows[0] ?? null;
}

export async function getMembership(
  patientId: string
): Promise<Membership | null> {
  const sql = await getSql();
  const { rows } = await sql.query<Membership>(
    `select * from memberships where patient_id = $1`,
    [patientId]
  );
  return rows[0] ?? null;
}

export async function getVisit(visitId: string): Promise<Visit | null> {
  const sql = await getSql();
  const { rows } = await sql.query<Visit>(
    `select * from visits where id = $1`,
    [visitId]
  );
  return rows[0] ?? null;
}

export async function listRoster(): Promise<RosterRow[]> {
  const sql = await getSql();
  const { rows } = await sql.query<RosterRow>(
    `select p.*,
            m.tier,
            m.status as membership_status,
            (select v.weight_lb from vitals v where v.patient_id = p.id and v.weight_lb is not null
              order by v.recorded_at desc limit 1) as last_weight_lb,
            pr.current_dose,
            (select vis.starts_at from visits vis
              where vis.patient_id = p.id and vis.status in ('requested','scheduled')
              order by vis.starts_at asc limit 1) as next_visit
     from patients p
     left join memberships m on m.patient_id = p.id
     left join protocol_state pr on pr.patient_id = p.id
     order by p.created_at desc`
  );
  return rows;
}

export async function createUser(input: {
  email: string;
  password: string;
  role: Role;
  name: string;
  patientId?: string | null;
}): Promise<User> {
  const sql = await getSql();
  const row = {
    id: id(),
    email: lower(input.email),
    password_hash: hashPassword(input.password),
    role: input.role,
    patient_id: input.patientId ?? null,
    name: input.name,
  };
  await sql.query(
    `insert into users (id, email, password_hash, role, patient_id, name)
     values ($1,$2,$3,$4,$5,$6)`,
    [row.id, row.email, row.password_hash, row.role, row.patient_id, row.name]
  );
  return {
    id: row.id,
    email: row.email,
    role: row.role,
    patient_id: row.patient_id,
    name: row.name,
  };
}

export async function authenticate(
  email: string,
  password: string
): Promise<User | null> {
  const sql = await getSql();
  const { rows } = await sql.query<User & { password_hash: string }>(
    `select id, email, role, patient_id, name, password_hash from users where email = $1`,
    [lower(email)]
  );
  const user = rows[0];
  if (!user) return null;
  if (!verifyPassword(password, user.password_hash)) return null;
  const { password_hash: _, ...rest } = user;
  return rest;
}

export async function ensureStaffSeeds(): Promise<void> {
  const sql = await getSql();
  const doctorEmail = lower(
    process.env.CLINIC_DOCTOR_EMAIL || "libby@precisionww.com"
  );
  const staffEmail = lower(
    process.env.CLINIC_STAFF_EMAIL || "jenny@precisionww.com"
  );
  const doctorPass = process.env.CLINIC_DOCTOR_PASSWORD || "clinic-dev-libby";
  const staffPass = process.env.CLINIC_STAFF_PASSWORD || "clinic-dev-jenny";
  const { rows: existing } = await sql.query<{ email: string }>(
    `select email from users where email = $1 or email = $2`,
    [doctorEmail, staffEmail]
  );
  const have = new Set(existing.map((r) => r.email));
  if (!have.has(doctorEmail)) {
    await createUser({
      email: doctorEmail,
      password: doctorPass,
      role: "doctor",
      name: "Dr. Libby Rhee",
    });
  }
  if (!have.has(staffEmail)) {
    await createUser({
      email: staffEmail,
      password: staffPass,
      role: "staff",
      name: "Jenny Huertas",
    });
  }
}

export async function setMembership(input: {
  patientId: string;
  tier: Tier;
  status: MembershipStatus;
  billingNote?: string | null;
  actorId?: string | null;
}): Promise<Membership> {
  const sql = await getSql();
  const { rows: existing } = await sql.query<Membership>(
    `select * from memberships where patient_id = $1`,
    [input.patientId]
  );
  const started =
    input.status === "active" ? new Date().toISOString().slice(0, 10) : null;
  if (existing[0]) {
    await sql.query(
      `update memberships set tier=$2, status=$3, billing_note=$4, started_on=coalesce(started_on,$5)
       where patient_id=$1`,
      [input.patientId, input.tier, input.status, input.billingNote ?? existing[0].billing_note, started]
    );
  } else {
    await sql.query(
      `insert into memberships (id, patient_id, tier, status, started_on, billing_note)
       values ($1,$2,$3,$4,$5,$6)`,
      [id(), input.patientId, input.tier, input.status, started, input.billingNote ?? null]
    );
  }
  await audit(input.actorId ?? null, input.patientId, "membership.update", {
    tier: input.tier,
    status: input.status,
  });
  const { rows } = await sql.query<Membership>(
    `select * from memberships where patient_id = $1`,
    [input.patientId]
  );
  return rows[0];
}

export async function createLead(input: {
  name: string;
  email: string;
  phone?: string;
  tier: Tier;
  modality: VisitModality;
  preferredAt?: string;
  password: string;
  notes?: string;
}): Promise<{ patient: Patient; visit: Visit; user: User }> {
  const existing = await findUserByEmail(input.email);
  if (existing) {
    throw new Error("email already registered");
  }
  const patient = await createPatient({
    name: input.name,
    email: input.email,
    phone: input.phone,
  });
  const user = await createUser({
    email: input.email,
    password: input.password,
    role: "patient",
    name: input.name,
    patientId: patient.id,
  });
  await setMembership({
    patientId: patient.id,
    tier: input.tier,
    status: "lead",
  });
  const starts = input.preferredAt
    ? new Date(input.preferredAt).toISOString()
    : new Date(Date.now() + 7 * 86400000).toISOString();
  const visit = await createVisit({
    patientId: patient.id,
    startsAt: starts,
    modality: input.modality,
    status: "requested",
    notes: input.notes ?? null,
  });
  return { patient, visit, user };
}

export async function addVital(input: {
  patientId: string;
  source: VitalSource;
  weightLb?: number | null;
  waistIn?: number | null;
  systolic?: number | null;
  diastolic?: number | null;
  notes?: string | null;
}): Promise<Vital> {
  const sql = await getSql();
  const row: Vital = {
    id: id(),
    patient_id: input.patientId,
    recorded_at: new Date().toISOString(),
    source: input.source,
    weight_lb: input.weightLb ?? null,
    waist_in: input.waistIn ?? null,
    systolic: input.systolic ?? null,
    diastolic: input.diastolic ?? null,
    notes: input.notes ?? null,
  };
  await sql.query(
    `insert into vitals (id, patient_id, recorded_at, source, weight_lb, waist_in, systolic, diastolic, notes)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
    [
      row.id,
      row.patient_id,
      row.recorded_at,
      row.source,
      row.weight_lb,
      row.waist_in,
      row.systolic,
      row.diastolic,
      row.notes,
    ]
  );
  return row;
}

export async function listVitals(patientId: string): Promise<Vital[]> {
  const sql = await getSql();
  const { rows } = await sql.query<Vital>(
    `select * from vitals where patient_id = $1 order by recorded_at desc`,
    [patientId]
  );
  return rows;
}

export async function setProtocol(input: {
  patientId: string;
  drug?: string | null;
  currentDose?: string | null;
  nextAction?: ProtocolAction | null;
  nextActionOn?: string | null;
  actorId?: string | null;
}): Promise<ProtocolState> {
  const sql = await getSql();
  await sql.query(
    `insert into protocol_state (patient_id, drug, current_dose, next_action, next_action_on, updated_by, updated_at)
     values ($1,$2,$3,$4,$5,$6,now())
     on conflict (patient_id) do update set
       drug = excluded.drug,
       current_dose = excluded.current_dose,
       next_action = excluded.next_action,
       next_action_on = excluded.next_action_on,
       updated_by = excluded.updated_by,
       updated_at = now()`,
    [
      input.patientId,
      input.drug ?? null,
      input.currentDose ?? null,
      input.nextAction ?? null,
      input.nextActionOn ?? null,
      input.actorId ?? null,
    ]
  );
  await audit(input.actorId ?? null, input.patientId, "protocol.update", {
    drug: input.drug,
    dose: input.currentDose,
    next: input.nextAction,
  });
  const { rows } = await sql.query<ProtocolState>(
    `select * from protocol_state where patient_id = $1`,
    [input.patientId]
  );
  return rows[0];
}

export async function getProtocol(
  patientId: string
): Promise<ProtocolState | null> {
  const sql = await getSql();
  const { rows } = await sql.query<ProtocolState>(
    `select * from protocol_state where patient_id = $1`,
    [patientId]
  );
  return rows[0] ?? null;
}

export async function addCheckIn(
  input: Omit<CheckIn, "id"> & { id?: string }
): Promise<CheckIn> {
  const sql = await getSql();
  const row: CheckIn = { ...input, id: input.id ?? id() };
  await sql.query(
    `insert into check_ins (id, patient_id, week_of, feeling, meds_taken, side_effects, diet, exercise_days, sleep, energy, challenge, went_well, questions)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
    [
      row.id,
      row.patient_id,
      row.week_of,
      row.feeling,
      row.meds_taken,
      row.side_effects,
      row.diet,
      row.exercise_days,
      row.sleep,
      row.energy,
      row.challenge,
      row.went_well,
      row.questions,
    ]
  );
  return row;
}

export async function listCheckIns(patientId: string): Promise<CheckIn[]> {
  const sql = await getSql();
  const { rows } = await sql.query<CheckIn>(
    `select * from check_ins where patient_id = $1 order by week_of desc`,
    [patientId]
  );
  return rows;
}

export async function createVisit(input: {
  patientId: string;
  startsAt: string;
  modality: VisitModality;
  status: VisitStatus;
  videoUrl?: string | null;
  notes?: string | null;
  emaAppointmentId?: string | null;
}): Promise<Visit> {
  const sql = await getSql();
  const row: Visit = {
    id: id(),
    patient_id: input.patientId,
    starts_at: new Date(input.startsAt).toISOString(),
    modality: input.modality,
    status: input.status,
    video_url: input.videoUrl ?? null,
    ema_appointment_id: input.emaAppointmentId ?? null,
    notes: input.notes ?? null,
  };
  await sql.query(
    `insert into visits (id, patient_id, starts_at, modality, status, video_url, ema_appointment_id, notes)
     values ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [
      row.id,
      row.patient_id,
      row.starts_at,
      row.modality,
      row.status,
      row.video_url,
      row.ema_appointment_id,
      row.notes,
    ]
  );
  return row;
}

export async function updateVisit(
  visitId: string,
  patch: Partial<{
    startsAt: string;
    modality: VisitModality;
    status: VisitStatus;
    videoUrl: string | null;
    notes: string | null;
    emaAppointmentId: string | null;
  }>
): Promise<Visit> {
  const sql = await getSql();
  const { rows: cur } = await sql.query<Visit>(
    `select * from visits where id = $1`,
    [visitId]
  );
  if (!cur[0]) throw new Error("visit not found");
  const next: Visit = {
    ...cur[0],
    starts_at: patch.startsAt
      ? new Date(patch.startsAt).toISOString()
      : cur[0].starts_at,
    modality: patch.modality ?? cur[0].modality,
    status: patch.status ?? cur[0].status,
    video_url: patch.videoUrl === undefined ? cur[0].video_url : patch.videoUrl,
    notes: patch.notes === undefined ? cur[0].notes : patch.notes,
    ema_appointment_id:
      patch.emaAppointmentId === undefined
        ? cur[0].ema_appointment_id
        : patch.emaAppointmentId,
  };
  await sql.query(
    `update visits set starts_at=$2, modality=$3, status=$4, video_url=$5, ema_appointment_id=$6, notes=$7
     where id=$1`,
    [
      visitId,
      next.starts_at,
      next.modality,
      next.status,
      next.video_url,
      next.ema_appointment_id,
      next.notes,
    ]
  );
  return next;
}

export async function listVisits(patientId?: string): Promise<Visit[]> {
  const sql = await getSql();
  if (patientId) {
    const { rows } = await sql.query<Visit>(
      `select * from visits where patient_id = $1 order by starts_at desc`,
      [patientId]
    );
    return rows;
  }
  const { rows } = await sql.query<Visit & { patient_name?: string }>(
    `select v.*, p.name as patient_name
     from visits v
     left join patients p on p.id = v.patient_id
     order by v.starts_at desc`
  );
  return rows;
}

export async function linkEmaPatient(
  patientId: string,
  emaPatientId: string,
  actorId?: string | null
): Promise<Patient> {
  const sql = await getSql();
  await sql.query(`update patients set ema_patient_id = $2 where id = $1`, [
    patientId,
    emaPatientId,
  ]);
  await audit(actorId ?? null, patientId, "ema.link", { emaPatientId });
  const p = await getPatient(patientId);
  if (!p) throw new Error("patient missing");
  return p;
}

export async function saveEligibility(input: {
  patientId?: string | null;
  bmi: number;
  conditions: unknown;
  insurer: string;
  qualifies: boolean;
}): Promise<string> {
  const sql = await getSql();
  const eid = id();
  await sql.query(
    `insert into eligibility_runs (id, patient_id, bmi, conditions, insurer, qualifies)
     values ($1,$2,$3,$4::jsonb,$5,$6)`,
    [
      eid,
      input.patientId ?? null,
      input.bmi,
      JSON.stringify(input.conditions),
      input.insurer,
      input.qualifies,
    ]
  );
  return eid;
}

export async function audit(
  actorId: string | null,
  patientId: string | null,
  action: string,
  payload: unknown
): Promise<void> {
  const sql = await getSql();
  await sql.query(
    `insert into audit_events (actor_id, patient_id, action, payload)
     values ($1,$2,$3,$4::jsonb)`,
    [actorId, patientId, action, JSON.stringify(payload)]
  );
}

export async function listAudit(patientId: string) {
  const sql = await getSql();
  const { rows } = await sql.query(
    `select * from audit_events where patient_id = $1 order by created_at desc limit 50`,
    [patientId]
  );
  return rows;
}
