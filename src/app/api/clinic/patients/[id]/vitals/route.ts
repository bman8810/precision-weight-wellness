import {
  badRequest,
  canAccessPatient,
  forbidden,
  isResponse,
  json,
  notFound,
  requireSession,
} from "@/lib/clinic/http";
import { addVital, getPatient } from "@/lib/clinic/repo";
import type { VitalSource } from "@/lib/clinic/types";

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
    weightLb?: number | null;
    waistIn?: number | null;
    systolic?: number | null;
    diastolic?: number | null;
    notes?: string | null;
    source?: VitalSource;
  };
  try {
    body = await request.json();
  } catch {
    return badRequest("invalid json");
  }
  const source: VitalSource =
    body.source ?? (session.role === "patient" ? "patient" : "staff");
  const vital = await addVital({
    patientId: id,
    source,
    weightLb: body.weightLb ?? null,
    waistIn: body.waistIn ?? null,
    systolic: body.systolic ?? null,
    diastolic: body.diastolic ?? null,
    notes: body.notes ?? null,
  });
  return json({ vital }, 201);
}
