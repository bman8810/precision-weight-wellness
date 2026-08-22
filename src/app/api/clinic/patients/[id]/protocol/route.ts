import {
  badRequest,
  isResponse,
  json,
  notFound,
  requireStaff,
} from "@/lib/clinic/http";
import { getPatient, setProtocol } from "@/lib/clinic/repo";
import type { ProtocolAction } from "@/lib/clinic/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const actions: ProtocolAction[] = ["hold", "stay", "titrate", "refill_due"];

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await requireStaff();
  if (isResponse(session)) return session;
  const { id } = await context.params;
  const patient = await getPatient(id);
  if (!patient) return notFound("patient not found");
  let body: {
    drug?: string | null;
    currentDose?: string | null;
    nextAction?: ProtocolAction | null;
    nextActionOn?: string | null;
  };
  try {
    body = await request.json();
  } catch {
    return badRequest("invalid json");
  }
  if (body.nextAction && !actions.includes(body.nextAction)) {
    return badRequest("invalid nextAction");
  }
  const protocol = await setProtocol({
    patientId: id,
    drug: body.drug ?? null,
    currentDose: body.currentDose ?? null,
    nextAction: body.nextAction ?? null,
    nextActionOn: body.nextActionOn ?? null,
    actorId: session.uid,
  });
  return json({ protocol });
}
