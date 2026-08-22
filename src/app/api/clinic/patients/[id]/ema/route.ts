import { emaConfigured, searchEmaPatients } from "@/lib/clinic/ema";
import {
  badRequest,
  isResponse,
  json,
  notFound,
  requireStaff,
} from "@/lib/clinic/http";
import { getPatient, linkEmaPatient } from "@/lib/clinic/repo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await requireStaff();
  if (isResponse(session)) return session;
  const { id } = await context.params;
  const patient = await getPatient(id);
  if (!patient) return notFound("patient not found");
  let body: { emaPatientId?: string; search?: string };
  try {
    body = await request.json();
  } catch {
    return badRequest("invalid json");
  }

  if (body.search) {
    if (!emaConfigured()) {
      return json({
        ok: false,
        reason: "not_configured",
        message: "EMA not connected",
      });
    }
    const result = await searchEmaPatients(body.search);
    return json(result);
  }

  const emaPatientId = body.emaPatientId?.trim();
  if (!emaPatientId) return badRequest("emaPatientId required");
  const linked = await linkEmaPatient(id, emaPatientId, session.uid);
  return json({ ok: true, patient: linked, source: "manual" });
}
