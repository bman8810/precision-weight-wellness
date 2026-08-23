"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ClinicNav from "@/components/clinic/ClinicNav";
import { clinicFetch } from "@/lib/clinic/client";
import { formatDay } from "@/lib/clinic/format";

type DayItem = {
  visit: { id: string; starts_at: string; status: string; notes: string | null; patient_id: string };
  patient: { id: string; name: string; email: string | null } | null;
  brief: string;
  flags: string[];
};

export default function StaffTodayPage() {
  const [name, setName] = useState("");
  const [day, setDay] = useState<DayItem[]>([]);
  const [stats, setStats] = useState<{ activeMembers: number; checkInsThisWeek: number; openLeads: number } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    clinicFetch<{ day: DayItem[]; stats: typeof stats; name: string }>("/api/clinic/staff/today")
      .then((r) => {
        setDay(r.day);
        setStats(r.stats);
        setName(r.name);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "load failed"));
  }, []);

  return (
    <div className="min-h-dvh bg-white pb-16">
      <ClinicNav area="staff" name={name} />
      <div className="max-w-5xl mx-auto px-5 pt-10">
        <p className="text-[10px] uppercase tracking-[0.18em] text-[#66707E] border-b border-navy pb-2 mb-6">
          Today
        </p>
        <h1 className="font-serif text-4xl text-navy mb-8">Schedule</h1>
        {error && <p className="text-[#A8443C]">{error}</p>}
        {stats && (
          <p className="font-mono text-sm mb-8">
            {stats.activeMembers} active · {stats.checkInsThisWeek} check-ins this week · {stats.openLeads} leads
          </p>
        )}
        <div className="space-y-6">
          {day.map((item) => (
            <article key={item.visit.id} className="border-b border-[#E4E6EA] pb-5">
              <Link href={`/staff/patients/${item.visit.patient_id}`} className="font-serif text-2xl text-navy">
                {item.patient?.name ?? "Patient"}
              </Link>
              <p className="text-sm text-[#66707E]">
                {formatDay(item.visit.starts_at)} · {item.visit.status}
              </p>
              <p className="mt-2">{item.brief}</p>
              {item.flags.length > 0 && (
                <p className="text-[#A8443C] text-sm mt-1">{item.flags.join(" · ")}</p>
              )}
            </article>
          ))}
          {day.length === 0 && <p className="text-[#66707E]">No pending visits.</p>}
        </div>
      </div>
    </div>
  );
}
