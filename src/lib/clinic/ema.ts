/**
 * Liora ModMed tenant (same as derm). Fail-open.
 * Never POST Observation or MedicationRequest.
 */

export const EMA_ORIGIN =
  process.env.EMA_ORIGIN || "https://lioraderm.modmedapp.com";

export type EmaSearchHit = {
  id: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
};

export type EmaLinkResult =
  | { ok: true; emaPatientId: string; source: "search" | "manual" | "create" }
  | { ok: false; reason: "not_configured" | "not_found" | "http"; detail?: string };

export function emaConfigured(): boolean {
  return Boolean(process.env.EMA_SESSION_COOKIE);
}

export async function searchEmaPatients(
  query: string,
  fetchImpl: typeof fetch = fetch
): Promise<{ ok: true; hits: EmaSearchHit[] } | EmaLinkResult> {
  const cookie = process.env.EMA_SESSION_COOKIE;
  if (!cookie) return { ok: false, reason: "not_configured" };
  const last = query.trim();
  const url = `${EMA_ORIGIN}/ema/ws/v3/patients?where=lastName=="${encodeURIComponent(last)}"&paging.pageNumber=1&paging.pageSize=20`;
  try {
    const res = await fetchImpl(url, {
      headers: { cookie, accept: "application/json" },
    });
    if (!res.ok) {
      return { ok: false, reason: "http", detail: `status ${res.status}` };
    }
    const data = (await res.json()) as { results?: EmaSearchHit[] } | EmaSearchHit[];
    const hits = Array.isArray(data) ? data : data.results ?? [];
    return { ok: true, hits };
  } catch (err) {
    return { ok: false, reason: "http", detail: String(err) };
  }
}

export async function verifyEmaAppointment(
  appointmentId: string,
  fetchImpl: typeof fetch = fetch
): Promise<{ ok: true; status: string } | EmaLinkResult> {
  const cookie = process.env.EMA_SESSION_COOKIE;
  if (!cookie) return { ok: false, reason: "not_configured" };
  const url = `${EMA_ORIGIN}/ema/ws/v3/appointments/${appointmentId}`;
  try {
    const res = await fetchImpl(url, {
      headers: { cookie, accept: "application/json" },
    });
    if (!res.ok) {
      return { ok: false, reason: "http", detail: `status ${res.status}` };
    }
    const data = (await res.json()) as { status?: string };
    return { ok: true, status: data.status ?? "UNKNOWN" };
  } catch (err) {
    return { ok: false, reason: "http", detail: String(err) };
  }
}

export function canStoreEmaAppointmentId(status: string): boolean {
  return status === "PENDING" || status === "CONFIRMED";
}
