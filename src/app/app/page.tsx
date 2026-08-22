"use client";

import { useEffect, useState } from "react";
import ClinicNav from "@/components/clinic/ClinicNav";
import { StatusPill } from "@/components/clinic/StatusPill";
import { clinicFetch } from "@/lib/clinic/client";
import { formatDay, formatModality } from "@/lib/clinic/format";
import type {
  CheckIn,
  Membership,
  Patient,
  ProtocolState,
  Visit,
  Vital,
} from "@/lib/clinic/types";

const field =
  "w-full px-5 py-4 bg-cream/50 border border-navy/[0.06] rounded-2xl text-[15px] text-navy focus:outline-none focus:border-gold";

type Payload = {
  patient: Patient;
  membership: Membership | null;
  protocol: ProtocolState | null;
  vitals: Vital[];
  visits: Visit[];
  checkIns: CheckIn[];
};

export default function PatientHomePage() {
  const [meName, setMeName] = useState("");
  const [patientId, setPatientId] = useState<string | null>(null);
  const [data, setData] = useState<Payload | null>(null);
  const [weight, setWeight] = useState("");
  const [feeling, setFeeling] = useState("4");
  const [meds, setMeds] = useState("Yes");
  const [side, setSide] = useState("");
  const [error, setError] = useState("");

  async function load(pid: string) {
    const next = await clinicFetch<Payload>(`/api/clinic/patients/${pid}`);
    setData(next);
  }

  useEffect(() => {
    (async () => {
      const me = await clinicFetch<{
        user: { name: string; patientId: string | null };
      }>("/api/clinic/me");
      setMeName(me.user.name);
      if (!me.user.patientId) {
        setError("No patient record on this login");
        return;
      }
      setPatientId(me.user.patientId);
      await load(me.user.patientId);
    })().catch((err) =>
      setError(err instanceof Error ? err.message : "load failed")
    );
  }, []);

  const nextVisit = data?.visits.find(
    (v) => v.status === "scheduled" || v.status === "requested"
  );

  return (
    <div className="min-h-dvh bg-cream pb-16">
      <ClinicNav area="patient" name={meName} />
      <div className="max-w-3xl mx-auto px-5 pt-10 space-y-6">
        <div>
          <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
            Your care
          </p>
          <h1 className="font-serif text-[clamp(2rem,4vw,2.75rem)] tracking-[-0.02em] text-navy">
            Welcome back{meName ? `, ${meName.split(" ")[0]}` : ""}
          </h1>
        </div>
        {error && (
          <p className="text-red-700 text-sm" role="alert">
            {error}
          </p>
        )}

        <div className="doppelrand doppelrand-light">
          <section className="bg-white rounded-[18px] p-6 md:p-8">
            <p className="text-[11px] uppercase tracking-[0.12em] text-light mb-2">
              Next visit
            </p>
            <p
              data-testid="patient-visit"
              className="font-serif text-2xl text-navy"
            >
              {nextVisit
                ? `${formatDay(nextVisit.starts_at)} · ${formatModality(nextVisit.modality)}`
                : "None scheduled yet"}
            </p>
            {nextVisit && (
              <p className="mt-2">
                <StatusPill value={nextVisit.status} />
              </p>
            )}
            {nextVisit?.video_url && (
              <a
                className="inline-flex mt-4 text-gold font-medium"
                href={nextVisit.video_url}
              >
                Join video visit →
              </a>
            )}
          </section>
        </div>

        <div className="doppelrand doppelrand-light">
          <section className="bg-white rounded-[18px] p-6 md:p-8">
            <p className="text-[11px] uppercase tracking-[0.12em] text-light mb-2">
              Current protocol
            </p>
            <p data-testid="patient-dose" className="font-serif text-2xl text-navy">
              {data?.protocol?.drug
                ? `${data.protocol.drug} ${data.protocol.current_dose}`
                : "Your clinician will set this after your first visit"}
            </p>
            {data?.membership && (
              <p className="mt-3 flex items-center gap-2 text-[14px] text-body">
                <StatusPill value={data.membership.status} />
                <span className="capitalize">{data.membership.tier}</span>
              </p>
            )}
          </section>
        </div>

        <div className="doppelrand doppelrand-light">
          <section className="bg-white rounded-[18px] p-6 md:p-8 space-y-3">
            <h2 className="font-serif text-xl text-navy">Log weight</h2>
            <label className="block text-[13px] text-navy">
              Weight (lb)
              <input
                data-testid="patient-weight"
                className={`${field} mt-1`}
                type="number"
                inputMode="decimal"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </label>
            <button
              data-testid="patient-weight-save"
              className="btn-primary"
              disabled={!patientId || !weight}
              onClick={async () => {
                if (!patientId) return;
                await clinicFetch(`/api/clinic/patients/${patientId}/vitals`, {
                  method: "POST",
                  body: JSON.stringify({ weightLb: Number(weight) }),
                });
                await load(patientId);
              }}
            >
              Save weight
            </button>
            <p data-testid="patient-last-weight" className="text-[14px] text-body">
              Last recorded: {data?.vitals[0]?.weight_lb ?? "—"} lb
            </p>
          </section>
        </div>

        <div className="doppelrand doppelrand-light">
          <section className="bg-white rounded-[18px] p-6 md:p-8 space-y-3">
            <h2 className="font-serif text-xl text-navy">Weekly check-in</h2>
            <label className="block text-[13px] text-navy">
              How are you feeling? (1–5)
              <input
                data-testid="checkin-feeling"
                className={`${field} mt-1`}
                type="number"
                min={1}
                max={5}
                value={feeling}
                onChange={(e) => setFeeling(e.target.value)}
              />
            </label>
            <label className="block text-[13px] text-navy">
              Taking medication as prescribed?
              <input
                className={`${field} mt-1`}
                value={meds}
                onChange={(e) => setMeds(e.target.value)}
              />
            </label>
            <label className="block text-[13px] text-navy">
              Side effects
              <input
                data-testid="checkin-side"
                className={`${field} mt-1`}
                value={side}
                onChange={(e) => setSide(e.target.value)}
              />
            </label>
            <button
              data-testid="checkin-save"
              className="btn-primary"
              disabled={!patientId}
              onClick={async () => {
                if (!patientId) return;
                await clinicFetch(`/api/clinic/patients/${patientId}/check-ins`, {
                  method: "POST",
                  body: JSON.stringify({
                    weekOf: new Date().toISOString().slice(0, 10),
                    feeling: Number(feeling),
                    medsTaken: meds,
                    sideEffects: side,
                  }),
                });
                await load(patientId);
              }}
            >
              Submit check-in
            </button>
            <p data-testid="checkin-count" className="text-[14px] text-body">
              {data?.checkIns.length ?? 0} check-in(s) on file
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
