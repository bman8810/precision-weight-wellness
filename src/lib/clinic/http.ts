import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { readSession, sessionCookieName } from "./auth";
import { bootClinic } from "./boot";
import {
  canStoreEmaAppointmentId,
  verifyEmaAppointment,
} from "./ema";
import type { Role, Session } from "./types";

export async function clinicSession(): Promise<Session | null> {
  await bootClinic();
  const jar = await cookies();
  return readSession(jar.get(sessionCookieName())?.value);
}

export function json(data: unknown, status = 200, headers?: HeadersInit) {
  return NextResponse.json(data, { status, headers });
}

export function unauthorized() {
  return json({ error: "unauthorized" }, 401);
}

export function forbidden() {
  return json({ error: "forbidden" }, 403);
}

export function notFound(message = "not found") {
  return json({ error: message }, 404);
}

export function badRequest(message: string) {
  return json({ error: message }, 400);
}

export function isStaff(session: Session): boolean {
  return session.role === "staff" || session.role === "doctor";
}

export function canAccessPatient(session: Session, patientId: string): boolean {
  if (isStaff(session)) return true;
  return session.role === "patient" && session.patientId === patientId;
}

export async function requireSession(): Promise<Session | NextResponse> {
  const session = await clinicSession();
  if (!session) return unauthorized();
  return session;
}

export async function requireStaff(): Promise<Session | NextResponse> {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;
  if (!isStaff(session)) return forbidden();
  return session;
}

export function isResponse(value: Session | NextResponse): value is NextResponse {
  return value instanceof NextResponse;
}

export async function resolveEmaAppointmentId(
  appointmentId: string | null | undefined
): Promise<string | null> {
  if (!appointmentId) return null;
  const verified = await verifyEmaAppointment(appointmentId);
  if (
    verified.ok &&
    "status" in verified &&
    canStoreEmaAppointmentId(verified.status)
  ) {
    return appointmentId;
  }
  return null;
}

export function asNumber(value: unknown): number | null {
  if (value == null || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}
