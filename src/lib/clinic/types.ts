export type Role = "patient" | "staff" | "doctor";
export type Tier = "essential" | "premium" | "concierge";
export type MembershipStatus = "lead" | "active" | "paused" | "canceled";
export type VitalSource = "patient" | "staff" | "device";
export type ProtocolAction = "hold" | "stay" | "titrate" | "refill_due";
export type VisitModality = "in_person" | "remote";
export type VisitStatus =
  | "requested"
  | "scheduled"
  | "completed"
  | "canceled"
  | "no_show";

export type Patient = {
  id: string;
  email: string | null;
  phone: string | null;
  name: string;
  dob: string | null;
  ema_patient_id: string | null;
  created_at: string;
};

export type User = {
  id: string;
  email: string;
  role: Role;
  patient_id: string | null;
  name: string;
};

export type Membership = {
  id: string;
  patient_id: string;
  tier: Tier;
  status: MembershipStatus;
  started_on: string | null;
  cycle_anchor: string | null;
  billing_note: string | null;
  provider: string | null;
  provider_customer_id: string | null;
  provider_subscription_id: string | null;
};

export type Vital = {
  id: string;
  patient_id: string;
  recorded_at: string;
  source: VitalSource;
  weight_lb: number | null;
  waist_in: number | null;
  systolic: number | null;
  diastolic: number | null;
  notes: string | null;
};

export type ProtocolState = {
  patient_id: string;
  drug: string | null;
  current_dose: string | null;
  next_action: ProtocolAction | null;
  next_action_on: string | null;
  updated_by: string | null;
  updated_at: string;
};

export type CheckIn = {
  id: string;
  patient_id: string;
  week_of: string;
  feeling: number | null;
  meds_taken: string | null;
  side_effects: string | null;
  diet: number | null;
  exercise_days: number | null;
  sleep: number | null;
  energy: number | null;
  challenge: string | null;
  went_well: string | null;
  questions: string | null;
};

export type Visit = {
  id: string;
  patient_id: string;
  starts_at: string;
  modality: VisitModality;
  status: VisitStatus;
  video_url: string | null;
  ema_appointment_id: string | null;
  notes: string | null;
};

export type Session = {
  uid: string;
  role: Role;
  patientId: string | null;
  name: string;
  email: string;
  exp: number;
};

export type RosterRow = Patient & {
  tier: Tier | null;
  membership_status: MembershipStatus | null;
  last_weight_lb: number | null;
  current_dose: string | null;
  next_visit: string | null;
};
