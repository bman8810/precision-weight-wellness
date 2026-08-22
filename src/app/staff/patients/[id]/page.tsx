"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ClinicNav from "@/components/clinic/ClinicNav";
import { StatusPill } from "@/components/clinic/StatusPill";
import { clinicFetch } from "@/lib/clinic/client";
import { formatDay, formatModality } from "@/lib/clinic/format";
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
  "w-full bg-transparent border-0 border-b border-navy/15 rounded-none px-0 py-2 text-[15px] text-navy focus:outline-none focus:border-gold";

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
  const [weight, setWeight] = useState("");
  const [drug, setDrug] = useState("");
  const [dose, setDose] = useState("");
  const [nextAction, setNextAction] = useState("stay");
  const [visitDate, setVisitDate] = useState("");
  const [visitWindow, setVisitWindow] = useState("anytime");
  const [modality, setModality] = useState<"in_person" | "remote">("in_person");
  const [videoUrl, setVideoUrl] = useState("");
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
    <div className="min-h-dvh bg-cream pb-20">
      <ClinicNav area="staff" name={name} />
      <article className="max-w-[720px] mx-auto px-5 pt-12">
        <header className="pb-8 border-b border-navy/10">
          <h1
            className="font-serif text-[clamp(2.25rem,5vw,3.25rem)] tracking-[-0.02em] text-navy leading-[1.1]"
            data-testid="patient-name"
          >
            {data.patient.name}
          </h1>
          <p className="mt-2 text-[15px] text-body">{data.patient.email}</p>
          <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 text-[14px]">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.12em] text-light">
                Status
              </dt>
              <dd className="mt-1">
                <StatusPill value={data.membership?.status} />
                {data.membership?.tier && (
                  <span className="ml-2 capitalize text-body">
                    {data.membership.tier}
                  </span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.12em] text-light">
                Protocol
              </dt>
              <dd
                className="mt-1 font-serif text-[20px] text-navy"
                data-testid="protocol-current"
              >
                {data.protocol?.drug
                  ? `${data.protocol.drug} ${data.protocol.current_dose}`
                  : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.12em] text-light">
                Last weight
              </dt>
              <dd className="mt-1 tabular-nums text-navy">
                {data.vitals[0]?.weight_lb != null
                  ? `${data.vitals[0].weight_lb} lb`
                  : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.12em] text-light">
                EMA
              </dt>
              <dd className="mt-1" data-testid="ema-linked">
                {data.patient.ema_patient_id ?? "—"}
              </dd>
            </div>
          </dl>
        </header>

        {error && (
          <p className="text-red-700 text-sm mt-6" role="alert">
            {error}
          </p>
        )}

        <section className="py-8 border-b border-navy/10 space-y-4">
          <h2 className="font-serif text-[22px] text-navy">Membership</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <label className="text-[13px] text-light">
              Plan
              <select
                data-testid="membership-tier"
                className={`${field} mt-1`}
                value={tier}
                onChange={(e) => setTier(e.target.value as Tier)}
              >
                <option value="essential">Essential</option>
                <option value="premium">Premium</option>
                <option value="concierge">Concierge</option>
              </select>
            </label>
            <label className="text-[13px] text-light">
              Status
              <select
                data-testid="membership-status"
                className={`${field} mt-1`}
                value={status}
                onChange={(e) => setStatus(e.target.value as MembershipStatus)}
              >
                <option value="lead">Lead</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="canceled">Canceled</option>
              </select>
            </label>
            <label className="text-[13px] text-light">
              Billing note
              <input
                className={`${field} mt-1`}
                value={billingNote}
                onChange={(e) => setBillingNote(e.target.value)}
              />
            </label>
          </div>
          <button
            data-testid="membership-save"
            className="btn-primary mt-2"
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

        <section className="py-8 border-b border-navy/10 space-y-4">
          <h2 className="font-serif text-[22px] text-navy">Protocol</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <label className="text-[13px] text-light">
              Medication
              <input
                data-testid="protocol-drug"
                className={`${field} mt-1`}
                value={drug}
                onChange={(e) => setDrug(e.target.value)}
              />
            </label>
            <label className="text-[13px] text-light">
              Current dose
              <input
                data-testid="protocol-dose"
                className={`${field} mt-1`}
                value={dose}
                onChange={(e) => setDose(e.target.value)}
              />
            </label>
            <label className="text-[13px] text-light">
              Next action
              <select
                className={`${field} mt-1`}
                value={nextAction}
                onChange={(e) => setNextAction(e.target.value)}
              >
                <option value="hold">Hold</option>
                <option value="stay">Stay</option>
                <option value="titrate">Titrate</option>
                <option value="refill_due">Refill due</option>
              </select>
            </label>
          </div>
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
        </section>

        <section className="py-8 border-b border-navy/10 space-y-4">
          <h2 className="font-serif text-[22px] text-navy">Weight</h2>
          <div className="flex items-end gap-4 max-w-sm">
            <label className="text-[13px] text-light flex-1">
              lb
              <input
                data-testid="vital-weight"
                className={`${field} mt-1`}
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </label>
            <button
              data-testid="vital-save"
              className="btn-primary shrink-0"
              onClick={async () => {
                await clinicFetch(`/api/clinic/patients/${id}/vitals`, {
                  method: "POST",
                  body: JSON.stringify({ weightLb: Number(weight) }),
                });
                await reload();
              }}
            >
              Add
            </button>
          </div>
          <ul
            className="text-[14px] text-body space-y-1.5 pt-2"
            data-testid="vitals-list"
          >
            {data.vitals.map((v) => (
              <li key={v.id}>
                {v.weight_lb ?? "—"} lb
                <span className="text-light"> · {formatDay(v.recorded_at)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="py-8 border-b border-navy/10 space-y-4">
          <h2 className="font-serif text-[22px] text-navy">Visits</h2>
          <ul
            data-testid="visits-list"
            className="text-[15px] text-navy space-y-3"
          >
            {data.visits.map((v) => (
              <li key={v.id} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <StatusPill value={v.status} />
                <span>{formatModality(v.modality)}</span>
                {v.notes && (
                  <span className="text-body text-[14px]">{v.notes}</span>
                )}
                {v.video_url && (
                  <a className="text-gold" href={v.video_url}>
                    Join
                  </a>
                )}
              </li>
            ))}
          </ul>
          <div className="grid sm:grid-cols-3 gap-6 pt-2">
            <label className="text-[13px] text-light">
              Date
              <input
                data-testid="visit-starts"
                type="date"
                className={`${field} mt-1`}
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
              />
            </label>
            <label className="text-[13px] text-light">
              Window
              <select
                className={`${field} mt-1`}
                value={visitWindow}
                onChange={(e) => setVisitWindow(e.target.value)}
              >
                <option value="anytime">Anytime</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
              </select>
            </label>
            <label className="text-[13px] text-light">
              Type
              <select
                data-testid="visit-modality"
                className={`${field} mt-1`}
                value={modality}
                onChange={(e) =>
                  setModality(e.target.value as "in_person" | "remote")
                }
              >
                <option value="in_person">In person</option>
                <option value="remote">Remote</option>
              </select>
            </label>
          </div>
          {modality === "remote" && (
            <label className="text-[13px] text-light block max-w-md">
              Video link
              <input
                data-testid="visit-video"
                className={`${field} mt-1`}
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </label>
          )}
          <button
            data-testid="visit-save"
            className="btn-primary"
            onClick={async () => {
              const when = visitDate
                ? new Date(`${visitDate}T16:00:00.000Z`).toISOString()
                : new Date(Date.now() + 86400000).toISOString();
              await clinicFetch(`/api/clinic/patients/${id}/visits`, {
                method: "POST",
                body: JSON.stringify({
                  startsAt: when,
                  modality,
                  status: "scheduled",
                  videoUrl: modality === "remote" ? videoUrl : null,
                  notes: visitWindow !== "anytime" ? visitWindow : null,
                }),
              });
              await reload();
            }}
          >
            Schedule
          </button>
        </section>

        <section className="py-8 border-b border-navy/10 space-y-4">
          <h2 className="font-serif text-[22px] text-navy">Check-ins</h2>
          <ul className="text-[14px] text-body space-y-2">
            {data.checkIns.map((c) => (
              <li key={c.id}>
                {c.week_of}
                {c.feeling != null ? ` · ${c.feeling}/5` : ""}
                {c.side_effects ? ` · ${c.side_effects}` : ""}
              </li>
            ))}
            {data.checkIns.length === 0 && (
              <li className="text-light">None</li>
            )}
          </ul>
        </section>

        <section className="py-8 space-y-4">
          <h2 className="font-serif text-[22px] text-navy">EMA</h2>
          <div className="flex items-end gap-4 max-w-md">
            <label className="text-[13px] text-light flex-1">
              Patient id
              <input
                data-testid="ema-id"
                className={`${field} mt-1`}
                value={emaId}
                onChange={(e) => setEmaId(e.target.value)}
              />
            </label>
            <button
              data-testid="ema-link"
              className="btn-primary shrink-0"
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
        </section>
      </article>
    </div>
  );
}
