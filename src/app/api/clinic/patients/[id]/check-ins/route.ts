import {
  badRequest,
  canAccessPatient,
  forbidden,
  isResponse,
  json,
  notFound,
  requireSession,
} from "@/lib/clinic/http";
import { addCheckIn, getPatient } from "@/lib/clinic/repo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await requireSession();
  if (isResponse(session)) return session;
  const { id } = await context.params;
  if (!canAccessPatient(session, id)) return forbidden();
  const patient = await getPatient(id);
  if (!patient) return notFound("patient not found");
  let body: {
    week_of?: string;
    weekOf?: string;
    feeling?: number | null;
    meds_taken?: string | null;
    medsTaken?: string | null;
    side_effects?: string | null;
    sideEffects?: string | null;
    diet?: number | null;
    exercise_days?: number | null;
    sleep?: number | null;
    energy?: number | null;
    challenge?: string | null;
    went_well?: string | null;
    questions?: string | null;
  };
  try {
    body = await request.json();
  } catch {
    return badRequest("invalid json");
  }
  const weekOf =
    body.weekOf || body.week_of || new Date().toISOString().slice(0, 10);
  const checkIn = await addCheckIn({
    patient_id: id,
    week_of: weekOf,
    feeling: body.feeling ?? null,
    meds_taken: body.medsTaken ?? body.meds_taken ?? null,
    side_effects: body.sideEffects ?? body.side_effects ?? null,
    diet: body.diet ?? null,
    exercise_days: body.exercise_days ?? null,
    sleep: body.sleep ?? null,
    energy: body.energy ?? null,
    challenge: body.challenge ?? null,
    went_well: body.went_well ?? null,
    questions: body.questions ?? null,
  });
  return json({ checkIn }, 201);
}
