"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ClinicNav from "@/components/clinic/ClinicNav";
import { clinicFetch } from "@/lib/clinic/client";
import type {
  CheckIn,
  Membership,
  MembershipStatus,
  Patient,
  ProtocolState,
  Tier,
  Visit,
  Vital,
} from "@/lib/clinic/types";

const field =
  "w-full px-3 py-2 bg-cream border border-navy/10 rounded-lg text-[14px] text-navy";

type Payload = {
  patient: Patient;
  membership: Membership | null;
  protocol: ProtocolState | null;
  vitals: Vital[];
  visits: Visit[];
  checkIns: CheckIn[];
  emaConfigured: boolean;
};

export default function StaffPatientPage() {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState("");
  const [data, setData] = useState<Payload | null>(null);
  const [error, setError] = useState("");
  const [tier, setTier] = useState<Tier>("essential");
  const [status, setStatus] = useState<MembershipStatus>("lead");
  const [billingNote, setBillingNote] = useState("");
  const [weight, setWeight] = useState("180");
  const [drug, setDrug] = useState("semaglutide");
  const [dose, setDose] = useState("0.25 mg qw");
  const [nextAction, setNextAction] = useState("stay");
  const [startsAt, setStartsAt] = useState("");
  const [modality, setModality] = useState<"in_person" | "remote">("remote");
  const [videoUrl, setVideoUrl] = useState("https://zoom.us/j/123");
  const [emaId, setEmaId] = useState("");

  async function reload() {
    const me = await clinicFetch<{ user: { name: string } }>("/api/clinic/me");
    const next = await clinicFetch<Payload>(`/api/clinic/patients/${id}`);
    setName(me.user.name);
    setData(next);
    if (next.membership) {
      setTier(next.membership.tier);
      setStatus(next.membership.status);
      setBillingNote(next.membership.billing_note ?? "");
    }
    if (next.protocol) {
      setDrug(next.protocol.drug ?? "");
      setDose(next.protocol.current_dose ?? "");
      setNextAction(next.protocol.next_action ?? "stay");
    }
    setEmaId(next.patient.ema_patient_id ?? "");
  }

  useEffect(() => {
    reload().catch((err) =>
      setError(err instanceof Error ? err.message : "load failed")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!data) {
    return (
      <div className="min-h-dvh bg-cream">
        <ClinicNav area="staff" name={name} />
        <p className="p-8 text-body">{error || "Loading…"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-cream">
      <ClinicNav area="staff" name={name} />
      <div className="max-w-5xl mx-auto px-5 py-10 space-y-8">
        <div>
          <h1 className="font-serif text-3xl text-navy" data-testid="patient-name">
            {data.patient.name}
          </h1>
          <p className="text-[14px] text-body">{data.patient.email}</p>
        </div>
        {error && <p className="text-red-700 text-sm">{error}</p>}

        <section className="bg-white rounded-2xl border border-navy/5 p-6 space-y-3">
          <h2 className="font-serif text-xl text-navy">Membership</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <select
              data-testid="membership-tier"
              className={field}
              value={tier}
              onChange={(e) => setTier(e.target.value as Tier)}
            >
              <option value="essential">essential</option>
              <option value="premium">premium</option>
              <option value="concierge">concierge</option>
            </select>
            <select
              data-testid="membership-status"
              className={field}
              value={status}
              onChange={(e) => setStatus(e.target.value as MembershipStatus)}
            >
              <option value="lead">lead</option>
              <option value="active">active</option>
              <option value="paused">paused</option>
              <option value="canceled">canceled</option>
            </select>
            <input
              className={field}
              placeholder="Billing note"
              value={billingNote}
              onChange={(e) => setBillingNote(e.target.value)}
            />
          </div>
          <button
            data-testid="membership-save"
            className="btn-primary"
            onClick={async () => {
              await clinicFetch(`/api/clinic/patients/${id}/membership`, {
                method: "POST",
                body: JSON.stringify({ tier, status, billingNote }),
              });
              await reload();
            }}
          >
            Save membership
          </button>
        </section>

        <section className="bg-white rounded-2xl border border-navy/5 p-6 space-y-3">
          <h2 className="font-serif text-xl text-navy">Vitals</h2>
          <div className="flex gap-3">
            <input
              data-testid="vital-weight"
              className={field}
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <button
              data-testid="vital-save"
              className="btn-primary"
              onClick={async () => {
                await clinicFetch(`/api/clinic/patients/${id}/vitals`, {
                  method: "POST",
                  body: JSON.stringify({ weightLb: Number(weight) }),
                });
                await reload();
              }}
            >
              Add weight
            </button>
          </div>
          <ul className="text-[14px] text-body" data-testid="vitals-list">
            {data.vitals.map((v) => (
              <li key={v.id}>
                {v.weight_lb ?? "—"} lb · {v.source}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-2xl border border-navy/5 p-6 space-y-3">
          <h2 className="font-serif text-xl text-navy">Protocol</h2>
          <input
            data-testid="protocol-drug"
            className={field}
            value={drug}
            onChange={(e) => setDrug(e.target.value)}
          />
          <input
            data-testid="protocol-dose"
            className={field}
            value={dose}
            onChange={(e) => setDose(e.target.value)}
          />
          <select
            className={field}
            value={nextAction}
            onChange={(e) => setNextAction(e.target.value)}
          >
            <option value="hold">hold</option>
            <option value="stay">stay</option>
            <option value="titrate">titrate</option>
            <option value="refill_due">refill_due</option>
          </select>
          <button
            data-testid="protocol-save"
            className="btn-primary"
            onClick={async () => {
              await clinicFetch(`/api/clinic/patients/${id}/protocol`, {
                method: "POST",
                body: JSON.stringify({
                  drug,
                  currentDose: dose,
                  nextAction,
                }),
              });
              await reload();
            }}
          >
            Save protocol
          </button>
          <p data-testid="protocol-current" className="text-[14px] text-body">
            {data.protocol?.drug} {data.protocol?.current_dose}
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-navy/5 p-6 space-y-3">
          <h2 className="font-serif text-xl text-navy">Schedule visit</h2>
          <input
            data-testid="visit-starts"
            type="datetime-local"
            className={field}
            value={startsAt}
            onChange={(e) => setStartsAt(e.target.value)}
          />
          <select
            data-testid="visit-modality"
            className={field}
            value={modality}
            onChange={(e) =>
              setModality(e.target.value as "in_person" | "remote")
            }
          >
            <option value="in_person">in person</option>
            <option value="remote">remote</option>
          </select>
          <input
            data-testid="visit-video"
            className={field}
            placeholder="Video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <button
            data-testid="visit-save"
            className="btn-primary"
            onClick={async () => {
              const when = startsAt || new Date(Date.now() + 86400000).toISOString();
              await clinicFetch(`/api/clinic/patients/${id}/visits`, {
                method: "POST",
                body: JSON.stringify({
                  startsAt: when,
                  modality,
                  status: "scheduled",
                  videoUrl: modality === "remote" ? videoUrl : null,
                }),
              });
              await reload();
            }}
          >
            Schedule
          </button>
          <ul data-testid="visits-list" className="text-[14px] text-body">
            {data.visits.map((v) => (
              <li key={v.id}>
                {v.status} · {v.modality}
                {v.video_url ? ` · ${v.video_url}` : ""}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-2xl border border-navy/5 p-6 space-y-3">
          <h2 className="font-serif text-xl text-navy">EMA (Liora tenant)</h2>
          <p className="text-[13px] text-body">
            {data.emaConfigured
              ? "Session cookie present — search available."
              : "EMA not connected. Paste a chart id to link."}
          </p>
          <div className="flex gap-3">
            <input
              data-testid="ema-id"
              className={field}
              value={emaId}
              onChange={(e) => setEmaId(e.target.value)}
              placeholder="EMA patient id"
            />
            <button
              data-testid="ema-link"
              className="btn-primary"
              onClick={async () => {
                await clinicFetch(`/api/clinic/patients/${id}/ema`, {
                  method: "POST",
                  body: JSON.stringify({ emaPatientId: emaId }),
                });
                await reload();
              }}
            >
              Link
            </button>
          </div>
          <p data-testid="ema-linked" className="text-[14px]">
            Linked: {data.patient.ema_patient_id ?? "none"}
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-navy/5 p-6">
          <h2 className="font-serif text-xl text-navy mb-3">Check-ins</h2>
          <ul className="text-[14px] text-body">
            {data.checkIns.map((c) => (
              <li key={c.id}>
                {c.week_of} · feeling {c.feeling} · {c.side_effects}
              </li>
            ))}
            {data.checkIns.length === 0 && <li>None yet</li>}
          </ul>
        </section>
      </div>
    </div>
  );
}
