import { NextResponse } from "next/server";
import { clinicSession, isStaff, json, unauthorized } from "@/lib/clinic/http";
import { addCheckInV2, createTask, listTasks, markDemoPaid, pauseMembership } from "@/lib/clinic/ops";
import { createLead, listRoster, setProtocol } from "@/lib/clinic/repo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type McpReq = { method?: string; params?: Record<string, unknown>; id?: string | number };

export async function POST(request: Request) {
  const session = await clinicSession();
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const allowed =
    (session && isStaff(session)) ||
    (token && process.env.CLINIC_MCP_TOKEN && token === process.env.CLINIC_MCP_TOKEN);
  if (!allowed) return unauthorized();

  let body: McpReq;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid json" }, 400);
  }

  try {
    const result = await dispatch(String(body.method || ""), body.params || {});
    return json({ id: body.id ?? null, result });
  } catch (err) {
    return json(
      { id: body.id ?? null, error: err instanceof Error ? err.message : "mcp error" },
      400
    );
  }
}

async function dispatch(method: string, p: Record<string, unknown>) {
  switch (method) {
    case "tools/list":
      return {
        tools: [
          "roster.list",
          "tasks.list",
          "tasks.create",
          "membership.demo_paid",
          "membership.pause",
          "protocol.set",
          "checkin.submit",
          "lead.create",
        ],
      };
    case "roster.list":
      return listRoster();
    case "tasks.list":
      return listTasks();
    case "tasks.create":
      return createTask({
        kind: String(p.kind || "other"),
        title: String(p.title || "task"),
        body: p.body ? String(p.body) : null,
        patientId: p.patientId ? String(p.patientId) : null,
      });
    case "membership.demo_paid":
      await markDemoPaid(String(p.patientId), p.tier as "essential");
      return { ok: true };
    case "membership.pause":
      await pauseMembership(String(p.patientId), String(p.duration || "unspecified"));
      return { ok: true };
    case "protocol.set":
      return setProtocol({
        patientId: String(p.patientId),
        drug: p.drug ? String(p.drug) : null,
        currentDose: p.dose ? String(p.dose) : null,
      });
    case "checkin.submit":
      return addCheckInV2({
        patientId: String(p.patientId),
        weekOf: String(p.weekOf || new Date().toISOString().slice(0, 10)),
        nausea: String(p.nausea || "none"),
        constipation: String(p.constipation || "none"),
        fatigue: String(p.fatigue || "none"),
        injectionSite: String(p.injectionSite || "none"),
        adherence: String(p.adherence || "all"),
        hunger: Number(p.hunger || 3),
        note: p.note ? String(p.note) : null,
      });
    case "lead.create":
      return createLead({
        name: String(p.name),
        email: String(p.email),
        password: String(p.password || "portal-pass-1"),
        tier: (p.tier as "essential") || "essential",
        modality: "remote",
      });
    default:
      throw new Error(`unknown method ${method}`);
  }
}

export async function GET() {
  return NextResponse.json({
    name: "pww-clinic",
    transport: "http",
    note: "POST JSON { method, params }. Staff session or CLINIC_MCP_TOKEN.",
  });
}
