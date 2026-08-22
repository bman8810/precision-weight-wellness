"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ClinicNav from "@/components/clinic/ClinicNav";
import { StatusPill } from "@/components/clinic/StatusPill";
import { clinicFetch } from "@/lib/clinic/client";
import { formatDay, formatModality } from "@/lib/clinic/format";
import type { Visit } from "@/lib/clinic/types";

type Row = Visit & { patient_name?: string };

export default function StaffVisitsPage() {
  const [name, setName] = useState("");
  const [visits, setVisits] = useState<Row[]>([]);

  useEffect(() => {
    (async () => {
      const me = await clinicFetch<{ user: { name: string } }>("/api/clinic/me");
      const data = await clinicFetch<{ visits: Row[] }>("/api/clinic/visits");
      setName(me.user.name);
      setVisits(data.visits);
    })().catch(() => undefined);
  }, []);

  return (
    <div className="min-h-dvh bg-cream pb-16">
      <ClinicNav area="staff" name={name} />
      <div className="max-w-5xl mx-auto px-5 pt-10">
        <h1 className="font-serif text-[clamp(2rem,4vw,2.75rem)] tracking-[-0.02em] text-navy mb-8">
          Upcoming <em className="text-gold">visits</em>
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full text-[14px]">
            <thead className="text-[11px] uppercase tracking-[0.12em] text-light border-b border-navy/10">
              <tr>
                <th className="px-0 py-3 text-left">Date</th>
                <th className="px-5 py-3 text-left">Patient</th>
                <th className="px-5 py-3 text-left">Type</th>
                <th className="px-5 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {visits.map((v) => (
                <tr key={v.id} className="border-t border-navy/10">
                  <td className="px-0 py-4 text-navy">{formatDay(v.starts_at)}</td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/staff/patients/${v.patient_id}`}
                      className="text-navy hover:text-gold font-medium"
                    >
                      {v.patient_name || "Patient"}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-body">
                    {formatModality(v.modality)}
                  </td>
                  <td className="px-5 py-4">
                    <StatusPill value={v.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
