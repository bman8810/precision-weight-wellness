import { isResponse, json, requireStaff } from "@/lib/clinic/http";
import { listRoster } from "@/lib/clinic/repo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await requireStaff();
  if (isResponse(session)) return session;
  const roster = await listRoster();
  return json({ patients: roster });
}
