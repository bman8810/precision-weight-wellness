"use client";

import { useEffect, useState } from "react";
import ClinicNav from "@/components/clinic/ClinicNav";
import { clinicFetch } from "@/lib/clinic/client";

const grades = ["none", "mild", "moderate", "severe"] as const;

function Grade({
  label,
  test,
  value,
  onChange,
}: {
  label: string;
  test: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="mb-4">
      <legend>{label}</legend>
      {grades.map((g) => (
        <label key={g} className="mr-3">
          <input
            type="radio"
            name={test}
            data-testid={`${test}-${g}`}
            checked={value === g}
            onChange={() => onChange(g)}
          />{" "}
          {g}
        </label>
      ))}
    </fieldset>
  );
}

export default function CheckInPage() {
  const [patientId, setPatientId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [nausea, setNausea] = useState("none");
  const [constipation, setConstipation] = useState("none");
  const [fatigue, setFatigue] = useState("none");
  const [site, setSite] = useState("none");
  const [adherence, setAdherence] = useState("all");
  const [hunger, setHunger] = useState(3);
  const [note, setNote] = useState("");
  const [done, setDone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    clinicFetch<{ user: { name: string; patientId: string | null } }>("/api/clinic/me").then(
      (m) => {
        setName(m.user.name);
        setPatientId(m.user.patientId);
      }
    );
  }, []);

  async function submit() {
    if (!patientId) return;
    setError("");
    try {
      const r = await clinicFetch<{ triage: boolean }>(
        `/api/clinic/patients/${patientId}/check-ins`,
        {
          method: "POST",
          body: JSON.stringify({
            weightLb: weight ? Number(weight) : undefined,
            nausea,
            constipation,
            fatigue,
            injectionSite: site,
            adherence,
            hunger,
            note,
          }),
        }
      );
      setDone(r.triage ? "Received. We'll be in touch." : "Check-in received.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "failed");
    }
  }

  return (
    <div className="min-h-dvh bg-[#F7F5F0] pb-16">
      <ClinicNav area="patient" name={name} />
      <div className="max-w-xl mx-auto px-5 pt-10">
        <h1 className="font-serif text-4xl text-navy mb-6">Your weekly check-in</h1>
        <label className="block mb-4">
          How&apos;s your weight this week?
          <input
            className="w-full bg-[#FAFAF8] border-l-2 border-navy/15 px-3 py-3"
            data-testid="patient-weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>
        <Grade label="Nausea" test="nausea" value={nausea} onChange={setNausea} />
        <Grade label="Constipation" test="constipation" value={constipation} onChange={setConstipation} />
        <Grade label="Fatigue" test="fatigue" value={fatigue} onChange={setFatigue} />
        <Grade label="Injection site" test="site" value={site} onChange={setSite} />
        <label className="block mb-4">
          Adherence
          <select
            className="w-full bg-[#FAFAF8] border-l-2 border-navy/15 px-3 py-3"
            value={adherence}
            onChange={(e) => setAdherence(e.target.value)}
          >
            <option value="all">All doses</option>
            <option value="missed_one">Missed one</option>
            <option value="missed_more">Missed more</option>
          </select>
        </label>
        <label className="block mb-4">
          Hunger 1–5
          <input
            type="number"
            min={1}
            max={5}
            className="w-full bg-[#FAFAF8] border-l-2 border-navy/15 px-3 py-3"
            value={hunger}
            onChange={(e) => setHunger(Number(e.target.value))}
          />
        </label>
        <textarea
          className="w-full bg-[#FAFAF8] border-l-2 border-navy/15 px-3 py-3 mb-4"
          placeholder="Optional note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button className="bg-navy text-white px-4 py-2" data-testid="checkin-save" onClick={submit}>
          Submit check-in
        </button>
        {done && (
          <p className="mt-4" data-testid="checkin-done">
            {done}
          </p>
        )}
        {error && <p className="text-[#A8443C] mt-3">{error}</p>}
      </div>
    </div>
  );
}
