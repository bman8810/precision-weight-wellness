import { bootClinic } from "@/lib/clinic/boot";
import { badRequest, json } from "@/lib/clinic/http";
import { windowToPlaceholderIso, type DayWindow } from "@/lib/clinic/slots";
import { createVisit, getPatient } from "@/lib/clinic/repo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  await bootClinic();
  let body: {
    patientId?: string;
    date?: string;
    window?: DayWindow;
    modality?: "in_person" | "remote";
  };
  try {
    body = await request.json();
  } catch {
    return badRequest("invalid json");
  }
  if (!body.patientId || !body.date || !body.window) {
    return badRequest("patientId, date, and window required");
  }
  const patient = await getPatient(body.patientId);
  if (!patient) return badRequest("patient not found");
  const visit = await createVisit({
    patientId: body.patientId,
    startsAt: windowToPlaceholderIso(body.date, body.window),
    modality: body.modality ?? "remote",
    status: "requested",
    notes: `Pending staff book · ${body.date} · ${body.window} · EMA write deferred`,
  });
  return json({ ok: true, visit });
}
