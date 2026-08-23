import { bootClinic } from "@/lib/clinic/boot";
import { createWeightPacket } from "@/lib/clinic/intake";
import { badRequest, json } from "@/lib/clinic/http";
import { createTask } from "@/lib/clinic/ops";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  await bootClinic();
  let body: {
    name?: string;
    email?: string;
    phone?: string;
    dob?: string;
    patientId?: string;
  };
  try {
    body = await request.json();
  } catch {
    return badRequest("invalid json");
  }
  if (!body.name) return badRequest("name required");
  const packet = await createWeightPacket({
    name: body.name,
    email: body.email,
    phone: body.phone,
    dob: body.dob,
  });
  if (body.patientId) {
    await createTask({
      kind: "intake_incomplete",
      title: "Complete Liora intake packet",
      body: packet.url,
      patientId: body.patientId,
      priority: 40,
    });
  }
  return json({ ok: true, packet });
}
