"use client";

import { useEffect, useState } from "react";
import ClinicNav from "@/components/clinic/ClinicNav";
import { clinicFetch } from "@/lib/clinic/client";

export default function ConfigPage() {
  const [raw, setRaw] = useState("");
  const [name, setName] = useState("");
  const [saved, setSaved] = useState("");

  useEffect(() => {
    clinicFetch<{ user: { name: string } }>("/api/clinic/me").then((m) =>
      setName(m.user.name)
    );
    clinicFetch<{ config: unknown }>("/api/clinic/staff/config").then((r) =>
      setRaw(JSON.stringify(r.config, null, 2))
    );
  }, []);

  return (
    <div className="min-h-dvh bg-white pb-16">
      <ClinicNav area="staff" name={name} />
      <div className="max-w-5xl mx-auto px-5 pt-10">
        <p className="text-[10px] uppercase tracking-[0.18em] text-[#66707E] border-b border-navy pb-2 mb-6">
          Configuration
        </p>
        <p className="text-sm mb-4">
          Hours come from the EMA read layer. Changing plan prices here does not require a deploy.
        </p>
        <textarea
          className="w-full min-h-[240px] font-mono text-sm bg-[#FAFAF8] border-l-2 border-navy/15 p-3"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
        />
        <button
          className="mt-4 text-gold"
          onClick={async () => {
            await clinicFetch("/api/clinic/staff/config", {
              method: "PUT",
              body: raw,
            });
            setSaved("Saved");
          }}
        >
          Save
        </button>
        {saved && <p className="text-gold text-sm mt-2">{saved}</p>}
      </div>
    </div>
  );
}
