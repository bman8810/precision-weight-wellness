"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ClinicNav from "@/components/clinic/ClinicNav";
import { clinicFetch } from "@/lib/clinic/client";
import type { ClinicTask } from "@/lib/clinic/types";

export default function QueuePage() {
  const [tasks, setTasks] = useState<ClinicTask[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    clinicFetch<{ user: { name: string } }>("/api/clinic/me").then((m) =>
      setName(m.user.name)
    );
    clinicFetch<{ tasks: ClinicTask[] }>("/api/clinic/staff/queue").then((r) =>
      setTasks(r.tasks)
    );
  }, []);

  const pinned = tasks.filter((t) => t.kind === "paid_not_booked");
  const rest = tasks.filter((t) => t.kind !== "paid_not_booked");

  return (
    <div className="min-h-dvh bg-white pb-16">
      <ClinicNav area="staff" name={name} />
      <div className="max-w-5xl mx-auto px-5 pt-10">
        <p className="text-[10px] uppercase tracking-[0.18em] text-[#66707E] border-b border-navy pb-2 mb-6">
          Work queue
        </p>
        {pinned.map((t) => (
          <article key={t.id} className="bg-[#F8ECEA] border-l-[3px] border-[#A8443C] px-3 py-3 mb-3">
            <p className="font-medium">{t.title}</p>
            <p className="text-sm">{t.body}</p>
          </article>
        ))}
        {rest.map((t) => (
          <article key={t.id} className="border-b border-[#E4E6EA] py-3">
            <p>{t.title}</p>
            <p className="text-sm text-[#66707E]">{t.kind}</p>
            {t.patient_id && (
              <Link className="text-gold text-sm" href={`/staff/patients/${t.patient_id}`}>
                Open chart
              </Link>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
