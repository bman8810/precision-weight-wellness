import {
  badRequest,
  isResponse,
  json,
  notFound,
  requireStaff,
} from "@/lib/clinic/http";
import { getPatient, setMembership } from "@/lib/clinic/repo";
import type { MembershipStatus, Tier } from "@/lib/clinic/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const tiers: Tier[] = ["essential", "premium", "concierge"];
const statuses: MembershipStatus[] = ["lead", "active", "paused", "canceled"];

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
    tier?: Tier;
    status?: MembershipStatus;
    billingNote?: string | null;
  };
  try {
    body = await request.json();
  } catch {
    return badRequest("invalid json");
  }
  if (!body.tier || !tiers.includes(body.tier)) return badRequest("invalid tier");
  if (!body.status || !statuses.includes(body.status)) {
    return badRequest("invalid status");
  }
  const membership = await setMembership({
    patientId: id,
    tier: body.tier,
    status: body.status,
    billingNote: body.billingNote ?? null,
    actorId: session.uid,
  });
  return json({ membership });
}
