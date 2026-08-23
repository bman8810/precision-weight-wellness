import { badRequest, isResponse, json, requireStaff } from "@/lib/clinic/http";
import { getConfig, setConfig } from "@/lib/clinic/ops";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULTS = {
  plans: {
    essential: 199,
    premium: 349,
    concierge: 599,
  },
  hoursNote: "Windows from EMA read layer. No clock times on this surface.",
};

export async function GET() {
  const session = await requireStaff();
  if (isResponse(session)) return session;
  const value = await getConfig("practice", DEFAULTS);
  return json({ config: value });
}

export async function PUT(request: Request) {
  const session = await requireStaff();
  if (isResponse(session)) return session;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest("invalid json");
  }
  await setConfig("practice", body);
  return json({ ok: true });
}
