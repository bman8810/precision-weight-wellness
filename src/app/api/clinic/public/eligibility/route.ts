import { bootClinic } from "@/lib/clinic/boot";
import { evaluateEligibility } from "@/lib/clinic/eligibility";
import { badRequest, json } from "@/lib/clinic/http";
import { upsertLead } from "@/lib/clinic/ops";
import { saveEligibility } from "@/lib/clinic/repo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  await bootClinic();
  let body: {
    state?: string;
    heightIn?: number;
    weightLb?: number;
    comorbidityIds?: string[];
    contraindicationIds?: string[];
    glp1Exposure?: "never" | "current" | "past";
    email?: string;
  };
  try {
    body = await request.json();
  } catch {
    return badRequest("invalid json");
  }
  if (!body.state || !body.heightIn || !body.weightLb || !body.glp1Exposure) {
    return badRequest("state, height, weight, and prior GLP-1 required");
  }
  const result = evaluateEligibility({
    state: body.state,
    heightIn: Number(body.heightIn),
    weightLb: Number(body.weightLb),
    comorbidityIds: body.comorbidityIds ?? [],
    contraindicationIds: body.contraindicationIds ?? [],
    glp1Exposure: body.glp1Exposure,
  });
  await saveEligibility({
    bmi: result.bmi,
    conditions: {
      comorbidities: body.comorbidityIds ?? [],
      contraindications: body.contraindicationIds ?? [],
      glp1: body.glp1Exposure,
    },
    insurer: "cash",
    qualifies: result.verdict === "qualified",
  });
  if (body.email) {
    await upsertLead({
      email: body.email,
      stage: result.verdict,
      payload: { ...result, state: body.state },
    });
  }
  return json({ ok: true, ...result });
}
