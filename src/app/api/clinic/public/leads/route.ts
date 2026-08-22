import { bootClinic } from "@/lib/clinic/boot";
import { badRequest, json } from "@/lib/clinic/http";
import { createLead } from "@/lib/clinic/repo";
import type { Tier, VisitModality } from "@/lib/clinic/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const tiers: Tier[] = ["essential", "premium", "concierge"];
const modalities: VisitModality[] = ["in_person", "remote"];

export async function POST(request: Request) {
  await bootClinic();
  let body: {
    name?: string;
    email?: string;
    phone?: string;
    tier?: string;
    modality?: string;
    preferredAt?: string;
    password?: string;
    notes?: string;
  };
  try {
    body = await request.json();
  } catch {
    return badRequest("invalid json");
  }
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const password = body.password ?? "";
  const tier = body.tier as Tier | undefined;
  const modality = body.modality as VisitModality | undefined;
  if (!name || !email || !password) {
    return badRequest("name, email, and password required");
  }
  if (!tier || !tiers.includes(tier)) return badRequest("invalid tier");
  if (!modality || !modalities.includes(modality)) {
    return badRequest("invalid modality");
  }
  if (password.length < 6) return badRequest("password too short");
  try {
    const { patient, visit, user } = await createLead({
      name,
      email,
      phone: body.phone?.trim() || undefined,
      tier,
      modality,
      preferredAt: body.preferredAt || undefined,
      password,
      notes: body.notes,
    });
    return json(
      {
        ok: true,
        patientId: patient.id,
        visitId: visit.id,
        email: user.email,
      },
      201
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "lead failed";
    if (message.includes("already")) {
      return json({ error: message }, 409);
    }
    return json({ error: message }, 500);
  }
}
