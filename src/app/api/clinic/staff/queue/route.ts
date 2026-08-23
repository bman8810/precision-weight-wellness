import { isResponse, json, requireStaff } from "@/lib/clinic/http";
import { listTasks } from "@/lib/clinic/ops";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await requireStaff();
  if (isResponse(session)) return session;
  return json({ tasks: await listTasks() });
}
