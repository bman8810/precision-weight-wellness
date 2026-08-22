import { emaConfigured } from "@/lib/clinic/ema";
import {
  isResponse,
  json,
  requireSession,
} from "@/lib/clinic/http";
import {
  getMembership,
  getPatient,
  getProtocol,
  listCheckIns,
  listVisits,
  listVitals,
} from "@/lib/clinic/repo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await requireSession();
  if (isResponse(session)) return session;
  const user = {
    id: session.uid,
    email: session.email,
    role: session.role,
    name: session.name,
    patientId: session.patientId,
  };
  if (session.role !== "patient" || !session.patientId) {
    return json({ user, emaConfigured: emaConfigured() });
  }
  const patientId = session.patientId;
  const [patient, membership, protocol, vitals, visits, checkIns] =
    await Promise.all([
      getPatient(patientId),
      getMembership(patientId),
      getProtocol(patientId),
      listVitals(patientId),
      listVisits(patientId),
      listCheckIns(patientId),
    ]);
  return json({
    user,
    patient,
    membership,
    protocol,
    vitals,
    visits,
    checkIns,
    emaConfigured: emaConfigured(),
  });
}
