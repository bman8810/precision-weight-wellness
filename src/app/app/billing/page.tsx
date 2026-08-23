"use client";

import { useEffect, useState } from "react";
import ClinicNav from "@/components/clinic/ClinicNav";
import { clinicFetch } from "@/lib/clinic/client";
import { PHARMACY_COST_LINE } from "@/lib/clinic/eligibility";
import type { Membership } from "@/lib/clinic/types";

export default function BillingPage() {
  const [name, setName] = useState("");
  const [patientId, setPatientId] = useState<string | null>(null);
  const [membership, setMembership] = useState<Membership | null>(null);
  const [duration, setDuration] = useState("1 month");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      const me = await clinicFetch<{ user: { name: string; patientId: string | null } }>(
        "/api/clinic/me"
      );
      setName(me.user.name);
      if (!me.user.patientId) return;
      setPatientId(me.user.patientId);
      const data = await clinicFetch<{ membership: Membership | null }>(
        `/api/clinic/patients/${me.user.patientId}`
      );
      setMembership(data.membership);
    })();
  }, []);

  return (
    <div className="min-h-dvh bg-[#F7F5F0] pb-16">
      <ClinicNav area="patient" name={name} />
      <div className="max-w-xl mx-auto px-5 pt-10">
        <h1 className="font-serif text-4xl text-navy mb-6">Billing</h1>
        <p className="font-serif text-2xl capitalize">
          {membership?.tier} · {membership?.status}
        </p>
        <p className="mt-2">{PHARMACY_COST_LINE}</p>
        <p className="mt-6 text-[10px] uppercase tracking-[0.16em]">Pause</p>
        <select
          className="w-full bg-[#FAFAF8] border-l-2 border-navy/15 px-3 py-3 my-3"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        >
          <option>1 month</option>
          <option>2 months</option>
          <option>3 months</option>
        </select>
        <button
          className="text-gold"
          data-testid="pause-membership"
          onClick={async () => {
            if (!patientId) return;
            await clinicFetch(`/api/clinic/patients/${patientId}/pause`, {
              method: "POST",
              body: JSON.stringify({ duration }),
            });
            setMsg("Paused");
          }}
        >
          Pause membership
        </button>
        <p className="text-sm text-[#66707E] mt-6">
          To cancel, message the practice. Pause is offered first.
        </p>
        {msg && <p className="text-gold mt-3">{msg}</p>}
      </div>
    </div>
  );
}
