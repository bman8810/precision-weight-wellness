import { canAccessPatient, forbidden, isResponse, json, requireSession } from "@/lib/clinic/http";
import { pauseMembership } from "@/lib/clinic/ops";

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
  const body = (await request.json()) as { duration?: string };
  await pauseMembership(id, body.duration || "unspecified", session.uid);
  return json({ ok: true });
}
