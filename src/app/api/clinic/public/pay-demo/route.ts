import { bootClinic } from "@/lib/clinic/boot";
import { badRequest, json } from "@/lib/clinic/http";
import { createTask, markDemoPaid } from "@/lib/clinic/ops";
import { getPatient } from "@/lib/clinic/repo";
import type { Tier } from "@/lib/clinic/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const tiers: Tier[] = ["essential", "premium", "concierge"];

export async function POST(request: Request) {
  await bootClinic();
  let body: { patientId?: string; tier?: Tier; booked?: boolean };
  try {
    body = await request.json();
  } catch {
    return badRequest("invalid json");
  }
  if (!body.patientId || !body.tier || !tiers.includes(body.tier)) {
    return badRequest("patientId and tier required");
  }
  const patient = await getPatient(body.patientId);
  if (!patient) return badRequest("patient not found");
  await markDemoPaid(body.patientId, body.tier);
  if (!body.booked) {
    await createTask({
      kind: "paid_not_booked",
      title: `Paid, not booked — ${patient.name}`,
      body: "Demo payment recorded. First visit still pending staff book.",
      patientId: body.patientId,
      priority: 100,
    });
  }
  await createTask({
    kind: "lab_order",
    title: `Order baseline labs — ${patient.name}`,
    body: "Fasting CMP/A1c. Draw before first visit.",
    patientId: body.patientId,
    priority: 50,
  });
  return json({ ok: true, demo: true });
}
