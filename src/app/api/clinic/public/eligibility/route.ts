import { bootClinic } from "@/lib/clinic/boot";
import { badRequest, json } from "@/lib/clinic/http";
import { saveEligibility } from "@/lib/clinic/repo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  await bootClinic();
  let body: {
    patientId?: string | null;
    bmi?: number;
    conditions?: unknown;
    insurer?: string;
    qualifies?: boolean;
  };
  try {
    body = await request.json();
  } catch {
    return badRequest("invalid json");
  }
  const bmi = Number(body.bmi);
  if (!Number.isFinite(bmi)) return badRequest("bmi required");
  const id = await saveEligibility({
    patientId: body.patientId ?? null,
    bmi,
    conditions: body.conditions ?? [],
    insurer: body.insurer ?? "unknown",
    qualifies: Boolean(body.qualifies),
  });
  return json({ ok: true, id }, 201);
}
