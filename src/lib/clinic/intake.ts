export type IntakePacket = {
  url: string;
  packetId?: string;
  source: "liora" | "stub";
};

export async function createWeightPacket(input: {
  name: string;
  email?: string;
  phone?: string;
  dob?: string;
  emaPatientId?: string;
}): Promise<IntakePacket> {
  const base = process.env.INTAKE_BASE_URL || "https://liora-intake.vercel.app";
  const token = process.env.INTAKE_ADMIN_TOKEN;
  if (!token) {
    return {
      url: `${base.replace(/\/$/, "")}/admin`,
      source: "stub",
    };
  }
  const res = await fetch(`${base.replace(/\/$/, "")}/api/admin/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      packetType: "weight-mgmt",
      patientName: input.name,
      patientEmail: input.email || undefined,
      patientPhone: input.phone || undefined,
      patientDob: input.dob || undefined,
      emaPatientId: input.emaPatientId || undefined,
    }),
  });
  if (!res.ok) {
    return { url: `${base.replace(/\/$/, "")}/admin`, source: "stub" };
  }
  const data = (await res.json()) as {
    url?: string;
    token?: string;
    id?: string;
    packetId?: string;
  };
  const url =
    data.url ||
    (data.token ? `${base.replace(/\/$/, "")}/f/${data.token}` : `${base}/admin`);
  return { url, packetId: data.packetId || data.id, source: "liora" };
}
