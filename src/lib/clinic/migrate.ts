import type { SqlClient } from "./db";

const STATEMENTS = [
  `alter table patients add column if not exists state text`,
  `alter table patients add column if not exists address_line text`,
  `alter table patients add column if not exists city text`,
  `alter table patients add column if not exists zip text`,
  `alter table patients add column if not exists current_meds text`,
  `alter table patients add column if not exists allergies text`,
  `alter table patients add column if not exists glp1_exposure text`,
  `alter table patients add column if not exists height_in numeric`,
  `alter table eligibility_runs add column if not exists verdict text`,
  `alter table eligibility_runs add column if not exists height_in numeric`,
  `alter table eligibility_runs add column if not exists weight_lb numeric`,
  `alter table eligibility_runs add column if not exists comorbidities jsonb`,
  `alter table eligibility_runs add column if not exists contraindications jsonb`,
  `alter table eligibility_runs add column if not exists glp1_exposure text`,
  `alter table eligibility_runs add column if not exists insurance_qualifies boolean`,
  `alter table check_ins add column if not exists nausea text`,
  `alter table check_ins add column if not exists constipation text`,
  `alter table check_ins add column if not exists fatigue text`,
  `alter table check_ins add column if not exists injection_site text`,
  `alter table check_ins add column if not exists adherence text`,
  `alter table check_ins add column if not exists hunger int`,
  `alter table check_ins add column if not exists note text`,
  `alter table protocol_state add column if not exists weeks_at_dose int`,
  `alter table protocol_state add column if not exists ladder_position text`,
  `alter table protocol_state add column if not exists suggestion jsonb`,
  `create table if not exists leads (
    id text primary key,
    email text,
    stage text not null,
    payload jsonb,
    patient_id text,
    updated_at timestamptz not null default now()
  )`,
  `create table if not exists tasks (
    id text primary key,
    kind text not null,
    priority int not null default 0,
    status text not null default 'open',
    patient_id text,
    title text not null,
    body text,
    due_at timestamptz,
    created_at timestamptz not null default now()
  )`,
  `create table if not exists lab_panels (
    id text primary key,
    patient_id text not null,
    collected_on date not null,
    status text not null default 'resulted',
    notes text
  )`,
  `create table if not exists lab_results (
    id text primary key,
    panel_id text not null,
    analyte text not null,
    value numeric,
    unit text,
    ref_low numeric,
    ref_high numeric,
    flag text
  )`,
  `create table if not exists visit_notes (
    id text primary key,
    visit_id text not null,
    body text not null,
    prefill_sources jsonb,
    signed_at timestamptz,
    signed_by text
  )`,
  `create table if not exists clinic_config (
    key text primary key,
    value jsonb not null,
    updated_at timestamptz not null default now()
  )`,
];

export async function migrateClinic(client: SqlClient): Promise<void> {
  for (const sql of STATEMENTS) {
    await client.exec(sql.endsWith(";") ? sql : `${sql};`);
  }
}
