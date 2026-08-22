import {
  badRequest,
  isResponse,
  json,
  notFound,
  requireStaff,
  resolveEmaAppointmentId,
} from "@/lib/clinic/http";
import { createVisit, getPatient } from "@/lib/clinic/repo";
import type { VisitModality, VisitStatus } from "@/lib/clinic/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const modalities: VisitModality[] = ["in_person", "remote"];
const statuses: VisitStatus[] = [
  "requested",
  "scheduled",
  "completed",
  "canceled",
  "no_show",
];

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await requireStaff();
  if (isResponse(session)) return session;
  const { id } = await context.params;
  const patient = await getPatient(id);
  if (!patient) return notFound("patient not found");
  let body: {
    startsAt?: string;
    modality?: VisitModality;
    status?: VisitStatus;
    videoUrl?: string | null;
    notes?: string | null;
    emaAppointmentId?: string | null;
  };
  try {
    body = await request.json();
  } catch {
    return badRequest("invalid json");
  }
  if (!body.startsAt) return badRequest("startsAt required");
  if (!body.modality || !modalities.includes(body.modality)) {
    return badRequest("invalid modality");
  }
  const status = body.status ?? "scheduled";
  if (!statuses.includes(status)) return badRequest("invalid status");
  const emaAppointmentId = await resolveEmaAppointmentId(
    body.emaAppointmentId
  );
  const visit = await createVisit({
    patientId: id,
    startsAt: body.startsAt,
    modality: body.modality,
    status,
    videoUrl: body.videoUrl ?? null,
    notes: body.notes ?? null,
    emaAppointmentId,
  });
  return json({ visit }, 201);
}
