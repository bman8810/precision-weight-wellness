import { isResponse, json, requireStaff } from "@/lib/clinic/http";
import { listTasks, previsitBrief, insights } from "@/lib/clinic/ops";
import { listRoster, listVisits, listVitals, listCheckIns, getProtocol } from "@/lib/clinic/repo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await requireStaff();
  if (isResponse(session)) return session;
  const visits = (await listVisits()).filter(
    (v) => v.status === "requested" || v.status === "scheduled"
  );
  const roster = await listRoster();
  const day = await Promise.all(
    visits.slice(0, 20).map(async (v) => {
      const patient = roster.find((p) => p.id === v.patient_id);
      const vitals = await listVitals(v.patient_id);
      const checkIns = await listCheckIns(v.patient_id);
      const protocol = await getProtocol(v.patient_id);
      const start = [...vitals].reverse()[0];
      return {
        visit: v,
        patient,
        brief: previsitBrief({
          name: patient?.name || "",
          lastWeight: vitals[0]?.weight_lb,
          startWeight: start?.weight_lb,
          dose: protocol?.current_dose,
          lastCheckIn: checkIns[0] ?? null,
        }),
        flags: [
          !checkIns[0] ? "no check-in" : null,
          !patient?.ema_patient_id ? "no EMA chart" : null,
        ].filter(Boolean),
      };
    })
  );
  const queue = await listTasks();
  const stats = await insights();
  return json({ day, queue, stats, name: session.name });
}
