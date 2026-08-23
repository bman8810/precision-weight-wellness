"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ClinicNav from "@/components/clinic/ClinicNav";
import { clinicFetch } from "@/lib/clinic/client";

type Row = {
  id: string;
  analyte: string;
  value: number | null;
  unit: string | null;
  ref_low: number | null;
  ref_high: number | null;
  flag: string | null;
  patient_id: string;
  patient_name: string;
  collected_on: string;
};

export default function InboxPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    clinicFetch<{ user: { name: string } }>("/api/clinic/me").then((m) =>
      setName(m.user.name)
    );
    clinicFetch<{ results: Row[] }>("/api/clinic/staff/inbox").then((r) =>
      setRows(r.results)
    );
  }, []);

  return (
    <div className="min-h-dvh bg-white pb-16">
      <ClinicNav area="staff" name={name} />
      <div className="max-w-5xl mx-auto px-5 pt-10">
        <p className="text-[10px] uppercase tracking-[0.18em] text-[#66707E] border-b border-navy pb-2 mb-6">
          Lab results
        </p>
        <p className="text-sm text-[#66707E] mb-4">Triage only. No patient detail on this screen.</p>
        <table className="w-full text-left text-sm">
          <thead className="font-mono text-[11px] uppercase tracking-wider">
            <tr>
              <th className="py-2">Patient</th>
              <th>Analyte</th>
              <th>Value</th>
              <th>Range</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className="border-t border-[#F0F1F3] cursor-pointer"
                onClick={() => router.push(`/staff/patients/${r.patient_id}?labs=1`)}
              >
                <td className="py-2">{r.patient_name}</td>
                <td className="font-mono">{r.analyte}</td>
                <td className={r.flag ? "text-[#A8443C]" : ""}>
                  {r.value} {r.unit}
                </td>
                <td className="font-mono text-[#66707E]">
                  {r.ref_low}–{r.ref_high}
                </td>
                <td className="font-mono">{r.collected_on}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
