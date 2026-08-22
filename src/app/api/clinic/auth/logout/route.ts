import { clearCookieHeader } from "@/lib/clinic/auth";
import { json } from "@/lib/clinic/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  return json({ ok: true }, 200, { "Set-Cookie": clearCookieHeader() });
}
