import {
  badRequest,
  isResponse,
  json,
  notFound,
  requireStaff,
  resolveEmaAppointmentId,
} from "@/lib/clinic/http";
import { getVisit, updateVisit } from "@/lib/clinic/repo";
import type { VisitModality, VisitStatus } from "@/lib/clinic/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await requireStaff();
  if (isResponse(session)) return session;
  const { id } = await context.params;
  const existing = await getVisit(id);
  if (!existing) return notFound("visit not found");
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
  const emaAppointmentId =
    body.emaAppointmentId === undefined
      ? undefined
      : await resolveEmaAppointmentId(body.emaAppointmentId);
  const visit = await updateVisit(id, {
    startsAt: body.startsAt,
    modality: body.modality,
    status: body.status,
    videoUrl: body.videoUrl,
    notes: body.notes,
    emaAppointmentId,
  });
  return json({ visit });
}
