import { cookieHeader, makeSession, signSession } from "@/lib/clinic/auth";
import { bootClinic } from "@/lib/clinic/boot";
import { badRequest, json } from "@/lib/clinic/http";
import { authenticate } from "@/lib/clinic/repo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  await bootClinic();
  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return badRequest("invalid json");
  }
  const email = body.email?.trim() ?? "";
  const password = body.password ?? "";
  if (!email || !password) return badRequest("email and password required");
  const user = await authenticate(email, password);
  if (!user) return json({ error: "invalid credentials" }, 401);
  const token = signSession(
    makeSession({
      uid: user.id,
      role: user.role,
      patientId: user.patient_id,
      name: user.name,
      email: user.email,
    })
  );
  return json(
    {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        patientId: user.patient_id,
      },
    },
    200,
    { "Set-Cookie": cookieHeader(token) }
  );
}
