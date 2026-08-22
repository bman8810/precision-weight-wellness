"use client";

import { useEffect, useMemo, useState } from "react";
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
  "w-full bg-transparent border-0 border-b border-navy/20 rounded-none px-0 py-1.5 text-[15px] text-navy focus:outline-none focus:border-gold";

const quiet =
  "text-[13px] font-medium text-gold hover:text-gold-light disabled:text-light bg-transparent p-0 min-h-0 border-0";

type Payload = {
  patient: Patient;
  membership: Membership | null;
  protocol: ProtocolState | null;
  vitals: Vital[];
  visits: Visit[];
  checkIns: CheckIn[];
  emaConfigured: boolean;
};

function sameDay(a: string, b: string): boolean {
  return formatDay(a) === formatDay(b);
}

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
  const [addingVisit, setAddingVisit] = useState(false);

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

  const rows = useMemo(() => {
    if (!data) return [];
    return [...data.visits]
      .sort((a, b) => +new Date(b.starts_at) - +new Date(a.starts_at))
      .map((v) => {
        const vitals = data.vitals.filter((x) =>
          sameDay(x.recorded_at, v.starts_at)
        );
        const checks = data.checkIns.filter((c) => {
          const day = formatDay(c.week_of);
          return day === formatDay(v.starts_at);
        });
        return { visit: v, vitals, checks };
      });
  }, [data]);

  if (!data) {
    return (
      <div className="min-h-dvh bg-cream">
        <ClinicNav area="staff" name={name} />
        <p className="p-8 text-body">{error || "Loading…"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-cream pb-24">
      <ClinicNav area="staff" name={name} />

      <div className="max-w-[780px] mx-auto px-5">
        <header className="pt-10 pb-8">
          <h1
            className="font-serif text-[clamp(2.25rem,5vw,3.25rem)] tracking-[-0.025em] text-navy leading-[1.08]"
            data-testid="patient-name"
          >
            {data.patient.name}
          </h1>
          <p className="mt-2 text-[15px] text-body">
            {[data.patient.email, data.patient.phone].filter(Boolean).join(" · ")}
          </p>
          <p
            className="mt-4 font-serif text-[22px] text-navy"
            data-testid="protocol-current"
          >
            {data.protocol?.drug
              ? `${data.protocol.drug} ${data.protocol.current_dose}`
              : "No protocol yet"}
            <span className="mx-3 text-navy/20">·</span>
            <StatusPill value={data.membership?.status} />
            {data.membership?.tier && (
              <span className="ml-2 text-[14px] font-sans text-body capitalize">
                {data.membership.tier}
              </span>
            )}
          </p>
        </header>

        {error && (
          <p className="text-red-700 text-sm mb-6" role="alert">
            {error}
          </p>
        )}
      </div>

      <section className="bg-[#F3EEE6] border-y border-navy/10">
        <div className="max-w-[780px] mx-auto px-5 py-9">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-serif text-[26px] text-navy">Appointments</h2>
            <button
              type="button"
              data-testid="visit-add"
              className={quiet}
              onClick={() => setAddingVisit((v) => !v)}
            >
              {addingVisit ? "Cancel" : "Add"}
            </button>
          </div>

          <ol className="space-y-0" data-testid="visits-list">
            {rows.map(({ visit: v, vitals, checks }) => (
              <li
                key={v.id}
                className="grid grid-cols-[14px_1fr] gap-4 py-5 border-t border-navy/10 first:border-t-0 first:pt-0"
              >
                <span
                  className={`mt-1.5 h-2.5 w-2.5 rounded-full ${
                    v.status === "completed"
                      ? "bg-sage"
                      : v.status === "scheduled"
                        ? "bg-navy"
                        : v.status === "requested"
                          ? "bg-gold"
                          : "bg-navy/20"
                  }`}
                />
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <StatusPill value={v.status} />
                    <span className="text-[15px] text-navy">
                      {formatModality(v.modality)}
                    </span>
                    {v.notes && (
                      <span className="text-[14px] text-body">{v.notes}</span>
                    )}
                    {v.video_url && (
                      <a className="text-[13px] text-gold" href={v.video_url}>
                        Join
                      </a>
                    )}
                  </div>
                  <dl className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 text-[13px]">
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.12em] text-light">
                        Weight
                      </dt>
                      <dd className="text-navy tabular-nums mt-0.5">
                        {vitals[0]?.weight_lb != null
                          ? `${vitals[0].weight_lb} lb`
                          : "Not captured"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.12em] text-light">
                        Check-in
                      </dt>
                      <dd className="text-navy mt-0.5">
                        {checks[0]
                          ? `${checks[0].feeling ?? "—"}/5${checks[0].side_effects ? ` · ${checks[0].side_effects}` : ""}`
                          : "Not captured"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.12em] text-light">
                        Day
                      </dt>
                      <dd className="text-navy mt-0.5">
                        {v.status === "requested"
                          ? "TBD"
                          : formatDay(v.starts_at)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
            {rows.length === 0 && (
              <li className="text-[14px] text-light">No appointments</li>
            )}
          </ol>

          {addingVisit && (
            <div className="mt-6 pt-6 border-t border-navy/10 grid sm:grid-cols-3 gap-5">
              <label className="text-[12px] text-light">
                Date
                <input
                  data-testid="visit-starts"
                  type="date"
                  className={`${field} mt-1`}
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                />
              </label>
              <label className="text-[12px] text-light">
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
              <label className="text-[12px] text-light">
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
              {modality === "remote" && (
                <label className="text-[12px] text-light sm:col-span-2">
                  Video
                  <input
                    data-testid="visit-video"
                    className={`${field} mt-1`}
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                </label>
              )}
              <div className="flex items-end">
                <button
                  data-testid="visit-save"
                  className={quiet}
                  onClick={async () => {
                    const when = visitDate
                      ? new Date(`${visitDate}T16:00:00.000Z`).toISOString()
                      : new Date(Date.now() + 86400000).toISOString();
                    await clinicFetch(`/api/clinic/patients/${id}/visits`, {
                      method: "POST",
                      body: JSON.stringify({
                        startsAt: when,
                        modality,
                        status: visitDate ? "scheduled" : "requested",
                        videoUrl: modality === "remote" ? videoUrl : null,
                        notes:
                          visitWindow !== "anytime" ? visitWindow : null,
                      }),
                    });
                    setAddingVisit(false);
                    await reload();
                  }}
                >
                  Save appointment
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="max-w-[780px] mx-auto px-5 py-9">
        <h2 className="font-serif text-[26px] text-navy mb-6">Protocol</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <label className="text-[12px] text-light">
            Medication
            <input
              data-testid="protocol-drug"
              className={`${field} mt-1`}
              value={drug}
              onChange={(e) => setDrug(e.target.value)}
            />
          </label>
          <label className="text-[12px] text-light">
            Dose
            <input
              data-testid="protocol-dose"
              className={`${field} mt-1`}
              value={dose}
              onChange={(e) => setDose(e.target.value)}
            />
          </label>
          <label className="text-[12px] text-light">
            Next
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
          className={`${quiet} mt-4`}
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

      <section className="bg-[#F3EEE6] border-y border-navy/10">
        <div className="max-w-[780px] mx-auto px-5 py-9">
          <h2 className="font-serif text-[26px] text-navy mb-6">Weight</h2>
          <div className="flex items-end gap-5 max-w-xs">
            <label className="text-[12px] text-light flex-1">
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
              className={`${quiet} mb-1`}
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
            className="mt-5 text-[14px] text-navy space-y-1.5"
            data-testid="vitals-list"
          >
            {data.vitals.map((v) => (
              <li key={v.id}>
                {v.weight_lb ?? "—"} lb
                <span className="text-light"> · {formatDay(v.recorded_at)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-[780px] mx-auto px-5 py-9">
        <h2 className="font-serif text-[26px] text-navy mb-6">Membership</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <label className="text-[12px] text-light">
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
          <label className="text-[12px] text-light">
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
          <label className="text-[12px] text-light">
            Note
            <input
              className={`${field} mt-1`}
              value={billingNote}
              onChange={(e) => setBillingNote(e.target.value)}
            />
          </label>
        </div>
        <button
          data-testid="membership-save"
          className={`${quiet} mt-4`}
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

      <section className="bg-[#F3EEE6] border-y border-navy/10">
        <div className="max-w-[780px] mx-auto px-5 py-9">
          <h2 className="font-serif text-[26px] text-navy mb-4">EMA</h2>
          <div className="flex items-end gap-5 max-w-md">
            <label className="text-[12px] text-light flex-1">
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
              className={`${quiet} mb-1`}
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
          <p className="sr-only" data-testid="ema-linked">
            {data.patient.ema_patient_id ?? "—"}
          </p>
        </div>
      </section>
    </div>
  );
}
