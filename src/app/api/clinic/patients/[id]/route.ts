import { seedLabPanel, listPatientLabs } from "@/lib/clinic/ops";
import { emaConfigured } from "@/lib/clinic/ema";
import {
  canAccessPatient,
  forbidden,
  isResponse,
  json,
  notFound,
  requireSession,
} from "@/lib/clinic/http";
import {
  getMembership,
  getPatient,
  getProtocol,
  listAudit,
  listCheckIns,
  listVisits,
  listVitals,
} from "@/lib/clinic/repo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await requireSession();
  if (isResponse(session)) return session;
  const { id } = await context.params;
  if (!canAccessPatient(session, id)) return forbidden();
  const patient = await getPatient(id);
  if (!patient) return notFound("patient not found");
  const [membership, protocol, vitals, visits, checkIns, audit] =
    await Promise.all([
      getMembership(id),
      getProtocol(id),
      listVitals(id),
      listVisits(id),
      listCheckIns(id),
      session.role === "patient" ? Promise.resolve([]) : listAudit(id),
    ]);
  if (session.role !== "patient") {
    await seedLabPanel(id);
  }
  const labs = await listPatientLabs(id);
  return json({
    patient,
    membership,
    protocol,
    vitals,
    visits,
    checkIns,
    audit,
    labs,
    emaConfigured: emaConfigured(),
  });
}
