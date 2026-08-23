import { bootClinic } from "@/lib/clinic/boot";
import { json } from "@/lib/clinic/http";
import { listOfferedSlots } from "@/lib/clinic/slots";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  await bootClinic();
  const state = new URL(request.url).searchParams.get("state") || "NY";
  const offered = await listOfferedSlots({ state });
  return json(offered);
}
