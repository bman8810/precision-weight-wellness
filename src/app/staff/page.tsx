"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ClinicNav from "@/components/clinic/ClinicNav";
import { StatusPill } from "@/components/clinic/StatusPill";
import { clinicFetch } from "@/lib/clinic/client";
import { formatWhen } from "@/lib/clinic/format";
import type { RosterRow } from "@/lib/clinic/types";

export default function StaffRosterPage() {
  const [name, setName] = useState("");
  const [patients, setPatients] = useState<RosterRow[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const me = await clinicFetch<{ user: { name: string } }>(
          "/api/clinic/me"
        );
        const roster = await clinicFetch<{ patients: RosterRow[] }>(
          "/api/clinic/patients"
        );
        if (cancelled) return;
        setName(me.user.name);
        setPatients(roster.patients);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-dvh bg-cream pb-16">
      <ClinicNav area="staff" name={name} />
      <div className="max-w-5xl mx-auto px-5 pt-10">
        <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
          Care team
        </p>
        <h1 className="font-serif text-[clamp(2rem,4vw,2.75rem)] tracking-[-0.02em] text-navy mb-2">
          Patient <em className="text-gold">roster</em>
        </h1>
        <p className="text-[15px] text-body mb-8 max-w-xl">
          Who needs a visit, a dose decision, or a follow-up — scannable in a
          glance.
        </p>
        {error && (
          <p className="text-red-700 text-sm mb-4" role="alert">
            {error}
          </p>
        )}
        <div className="doppelrand doppelrand-light">
          <div className="overflow-x-auto bg-white rounded-[18px] border border-[rgba(27,42,74,0.04)]">
            <table className="w-full text-left text-[14px]">
              <thead className="text-[11px] uppercase tracking-[0.12em] text-light border-b border-navy/5">
                <tr>
                  <th className="px-5 py-3">Patient</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Dose</th>
                  <th className="px-5 py-3">Weight</th>
                  <th className="px-5 py-3">Next visit</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p) => (
                  <tr key={p.id} className="border-t border-navy/5">
                    <td className="px-5 py-4">
                      <Link
                        href={`/staff/patients/${p.id}`}
                        className="text-navy font-medium hover:text-gold"
                        data-testid={`patient-${p.email ?? p.id}`}
                      >
                        {p.name}
                      </Link>
                      <p className="text-[12px] text-light mt-0.5">{p.email}</p>
                    </td>
                    <td className="px-5 py-4">
                      <StatusPill value={p.membership_status} />
                      {p.tier && (
                        <p className="text-[12px] text-light mt-1 capitalize">
                          {p.tier}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-4 text-navy">
                      {p.current_dose ?? "—"}
                    </td>
                    <td className="px-5 py-4 text-body tabular-nums">
                      {p.last_weight_lb != null ? `${p.last_weight_lb} lb` : "—"}
                    </td>
                    <td className="px-5 py-4 text-body">
                      {formatWhen(p.next_visit)}
                    </td>
                  </tr>
                ))}
                {patients.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-light">
                      No patients yet. New requests land here from /book.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
