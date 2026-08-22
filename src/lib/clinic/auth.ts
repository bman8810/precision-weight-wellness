import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import type { Role, Session } from "./types";

const COOKIE = "pww_session";

export function sessionCookieName(): string {
  return COOKIE;
}

export function sessionSecret(): string {
  return (
    process.env.CLINIC_SESSION_SECRET ||
    "dev-clinic-secret-change-me-not-for-prod"
  );
}

export function hashPassword(password: string, salt?: string): string {
  const s = salt ?? randomBytes(16).toString("hex");
  const hash = scryptSync(password, s, 32).toString("hex");
  return `${s}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const next = scryptSync(password, salt, 32);
  const prev = Buffer.from(hash, "hex");
  if (next.length !== prev.length) return false;
  return timingSafeEqual(next, prev);
}

export function signSession(session: Session): string {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  const mac = createHmac("sha256", sessionSecret())
    .update(payload)
    .digest("base64url");
  return `${payload}.${mac}`;
}

export function readSession(token: string | undefined | null): Session | null {
  if (!token) return null;
  const [payload, mac] = token.split(".");
  if (!payload || !mac) return null;
  const expected = createHmac("sha256", sessionSecret())
    .update(payload)
    .digest("base64url");
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    ) as Session;
    if (session.exp < Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}

export function makeSession(input: {
  uid: string;
  role: Role;
  patientId: string | null;
  name: string;
  email: string;
  ttlMs?: number;
}): Session {
  return {
    uid: input.uid,
    role: input.role,
    patientId: input.patientId,
    name: input.name,
    email: input.email,
    exp: Date.now() + (input.ttlMs ?? 1000 * 60 * 60 * 12),
  };
}

export function cookieHeader(token: string, maxAgeSec = 60 * 60 * 12): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSec}${secure}`;
}

export function clearCookieHeader(): string {
  return `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}
