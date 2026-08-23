import {
  badRequest,
  canAccessPatient,
  forbidden,
  isResponse,
  json,
  notFound,
  requireSession,
} from "@/lib/clinic/http";
import { addCheckInV2 } from "@/lib/clinic/ops";
import { addVital, getPatient } from "@/lib/clinic/repo";

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
    weekOf?: string;
    weightLb?: number;
    nausea?: string;
    constipation?: string;
    fatigue?: string;
    injectionSite?: string;
    adherence?: string;
    hunger?: number;
    note?: string;
  };
  try {
    body = await request.json();
  } catch {
    return badRequest("invalid json");
  }
  if (body.weightLb) {
    await addVital({
      patientId: id,
      source: "patient",
      weightLb: body.weightLb,
    });
  }
  if (body.nausea && body.adherence != null && body.hunger != null) {
    const result = await addCheckInV2({
      patientId: id,
      weekOf: body.weekOf || new Date().toISOString().slice(0, 10),
      weightLb: body.weightLb,
      nausea: body.nausea,
      constipation: body.constipation || "none",
      fatigue: body.fatigue || "none",
      injectionSite: body.injectionSite || "none",
      adherence: body.adherence,
      hunger: Number(body.hunger),
      note: body.note,
    });
    return json(result, 201);
  }
  return badRequest("check-in fields required");
}
