"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ClinicNav from "@/components/clinic/ClinicNav";
import { StatusPill } from "@/components/clinic/StatusPill";
import { clinicFetch } from "@/lib/clinic/client";
import { formatModality, formatWhen } from "@/lib/clinic/format";
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
  "w-full px-5 py-3 bg-cream/50 border border-navy/[0.06] rounded-2xl text-[15px] text-navy focus:outline-none focus:border-gold";

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
  const [startsAt, setStartsAt] = useState("");
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

  const nextVisit = data.visits.find(
    (v) => v.status === "scheduled" || v.status === "requested"
  );

  return (
    <div className="min-h-dvh bg-cream pb-16">
      <ClinicNav area="staff" name={name} />
      <div className="max-w-5xl mx-auto px-5 pt-10 space-y-6">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
              Chart
            </p>
            <h1
              className="font-serif text-[clamp(2rem,4vw,2.75rem)] tracking-[-0.02em] text-navy"
              data-testid="patient-name"
            >
              {data.patient.name}
            </h1>
            <p className="text-[14px] text-body mt-1">{data.patient.email}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill value={data.membership?.status} />
            {data.membership?.tier && (
              <span className="text-[13px] text-light capitalize">
                {data.membership.tier}
              </span>
            )}
          </div>
        </header>
        {error && (
          <p className="text-red-700 text-sm" role="alert">
            {error}
          </p>
        )}

        <div className="grid md:grid-cols-3 gap-4">
          <div className="doppelrand doppelrand-light">
            <div className="bg-white rounded-[18px] p-5">
              <p className="text-[11px] uppercase tracking-[0.12em] text-light mb-2">
                Protocol
              </p>
              <p className="font-serif text-xl text-navy" data-testid="protocol-current">
                {data.protocol?.drug
                  ? `${data.protocol.drug} ${data.protocol.current_dose}`
                  : "Not set"}
              </p>
            </div>
          </div>
          <div className="doppelrand doppelrand-light">
            <div className="bg-white rounded-[18px] p-5">
              <p className="text-[11px] uppercase tracking-[0.12em] text-light mb-2">
                Last weight
              </p>
              <p className="font-serif text-xl text-navy tabular-nums">
                {data.vitals[0]?.weight_lb != null
                  ? `${data.vitals[0].weight_lb} lb`
                  : "—"}
              </p>
            </div>
          </div>
          <div className="doppelrand doppelrand-light">
            <div className="bg-white rounded-[18px] p-5">
              <p className="text-[11px] uppercase tracking-[0.12em] text-light mb-2">
                Next visit
              </p>
              <p className="font-serif text-xl text-navy">
                {nextVisit
                  ? formatWhen(nextVisit.starts_at)
                  : "None scheduled"}
              </p>
            </div>
          </div>
        </div>

        <div className="doppelrand doppelrand-light">
          <section className="bg-white rounded-[18px] p-6 md:p-8 space-y-4">
            <h2 className="font-serif text-xl text-navy">Membership</h2>
            <div className="grid md:grid-cols-3 gap-3">
              <label className="text-[13px] text-navy">
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
              <label className="text-[13px] text-navy">
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
              <label className="text-[13px] text-navy">
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
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="doppelrand doppelrand-light">
            <section className="bg-white rounded-[18px] p-6 md:p-8 space-y-3">
              <h2 className="font-serif text-xl text-navy">Vitals</h2>
              <label className="text-[13px] text-navy block">
                Weight (lb)
                <div className="flex gap-3 mt-1">
                  <input
                    data-testid="vital-weight"
                    className={field}
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
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
              </label>
              <ul className="text-[14px] text-body space-y-1" data-testid="vitals-list">
                {data.vitals.map((v) => (
                  <li key={v.id}>
                    {v.weight_lb ?? "—"} lb · {formatWhen(v.recorded_at)} · {v.source}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="doppelrand doppelrand-light">
            <section className="bg-white rounded-[18px] p-6 md:p-8 space-y-3">
              <h2 className="font-serif text-xl text-navy">Protocol</h2>
              <label className="text-[13px] text-navy block">
                Medication
                <input
                  data-testid="protocol-drug"
                  className={`${field} mt-1`}
                  value={drug}
                  onChange={(e) => setDrug(e.target.value)}
                />
              </label>
              <label className="text-[13px] text-navy block">
                Current dose
                <input
                  data-testid="protocol-dose"
                  className={`${field} mt-1`}
                  value={dose}
                  onChange={(e) => setDose(e.target.value)}
                />
              </label>
              <label className="text-[13px] text-navy block">
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
          </div>
        </div>

        <div className="doppelrand doppelrand-light">
          <section className="bg-white rounded-[18px] p-6 md:p-8 space-y-4">
            <h2 className="font-serif text-xl text-navy">Schedule visit</h2>
            <div className="grid md:grid-cols-3 gap-3">
              <label className="text-[13px] text-navy">
                When
                <input
                  data-testid="visit-starts"
                  type="datetime-local"
                  className={`${field} mt-1`}
                  value={startsAt}
                  onChange={(e) => setStartsAt(e.target.value)}
                />
              </label>
              <label className="text-[13px] text-navy">
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
              <label className="text-[13px] text-navy">
                Video link (remote)
                <input
                  data-testid="visit-video"
                  className={`${field} mt-1`}
                  placeholder="https://"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </label>
            </div>
            <button
              data-testid="visit-save"
              className="btn-primary"
              onClick={async () => {
                const when =
                  startsAt || new Date(Date.now() + 86400000).toISOString();
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
            <ul data-testid="visits-list" className="text-[14px] text-body space-y-2">
              {data.visits.map((v) => (
                <li key={v.id} className="flex flex-wrap items-center gap-2">
                  <StatusPill value={v.status} />
                  <span>{formatWhen(v.starts_at)}</span>
                  <span>· {formatModality(v.modality)}</span>
                  {v.video_url && (
                    <a className="text-gold" href={v.video_url}>
                      join
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="doppelrand doppelrand-light">
            <section className="bg-white rounded-[18px] p-6 md:p-8 space-y-3">
              <h2 className="font-serif text-xl text-navy">EMA chart</h2>
              <p className="text-[13px] text-body">
                Same Liora tenant. Staff REST when we wire it — paste an id for
                now.
              </p>
              <label className="text-[13px] text-navy block">
                EMA patient id
                <div className="flex gap-3 mt-1">
                  <input
                    data-testid="ema-id"
                    className={field}
                    value={emaId}
                    onChange={(e) => setEmaId(e.target.value)}
                  />
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
              </label>
              <p data-testid="ema-linked" className="text-[14px] text-body">
                Linked: {data.patient.ema_patient_id ?? "none"}
              </p>
            </section>
          </div>

          <div className="doppelrand doppelrand-light">
            <section className="bg-white rounded-[18px] p-6 md:p-8">
              <h2 className="font-serif text-xl text-navy mb-3">Check-ins</h2>
              <ul className="text-[14px] text-body space-y-2">
                {data.checkIns.map((c) => (
                  <li key={c.id}>
                    {c.week_of} · feeling {c.feeling}
                    {c.side_effects ? ` · ${c.side_effects}` : ""}
                  </li>
                ))}
                {data.checkIns.length === 0 && (
                  <li className="text-light">None yet</li>
                )}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
