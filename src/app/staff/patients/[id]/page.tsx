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

const save =
  "text-[12px] font-medium text-gold hover:text-gold-light disabled:text-light bg-transparent p-0 border-0 cursor-pointer";

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

function dateParts(iso: string) {
  const d = new Date(iso);
  return {
    num: d.getUTCDate(),
    mon: d.toLocaleString("en-US", { month: "short", timeZone: "UTC" }),
  };
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mb-7">
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-light whitespace-nowrap font-sans">
        {label}
      </span>
      <div className="flex-1 h-px bg-navy/10" />
    </div>
  );
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

      {/* ── HEADER ── */}
      <div className="max-w-[780px] mx-auto px-5">
        <header className="pt-10 pb-9 border-b border-navy/10">
          <h1
            className="font-serif text-[clamp(2.25rem,5vw,3.25rem)] tracking-[-0.025em] text-navy leading-[1.08]"
            data-testid="patient-name"
          >
            {data.patient.name}
          </h1>
          <p className="mt-2 text-[14px] text-light">
            {[data.patient.email, data.patient.phone].filter(Boolean).join(" · ")}
          </p>
          <div
            className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2"
            data-testid="protocol-current"
          >
            {data.protocol?.drug ? (
              <span className="font-sans text-[15px] text-navy">
                {data.protocol.drug}
                <span className="text-light ml-1.5">{data.protocol.current_dose}</span>
              </span>
            ) : (
              <span className="text-[14px] text-light italic">No protocol yet</span>
            )}
            <span className="text-navy/20 select-none">·</span>
            <StatusPill value={data.membership?.status} />
            {data.membership?.tier && (
              <span className="text-[13px] font-sans text-light capitalize">
                {data.membership.tier}
              </span>
            )}
          </div>
        </header>

        {error && (
          <p className="text-red-700 text-sm mt-4" role="alert">
            {error}
          </p>
        )}
      </div>

      {/* ── APPOINTMENTS ── */}
      <div className="max-w-[780px] mx-auto px-5 pt-10">
        <div className="flex items-center gap-4 mb-7">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-light whitespace-nowrap font-sans">
            Appointments
          </span>
          <div className="flex-1 h-px bg-navy/10" />
          <button
            type="button"
            data-testid="visit-add"
            className={save}
            onClick={() => setAddingVisit((v) => !v)}
          >
            {addingVisit ? "Cancel" : "+ Add"}
          </button>
        </div>

        {/* Timeline */}
        <ol data-testid="visits-list" className="relative">
          {/* vertical spine */}
          <div className="absolute left-[40px] top-0 bottom-0 w-px bg-navy/10 pointer-events-none" />

          {rows.map(({ visit: v, vitals: vs, checks: cs }) => {
            const isRequested = v.status === "requested";
            const parts = isRequested ? null : dateParts(v.starts_at);
            const weightVal = vs[0]?.weight_lb;
            const check = cs[0];
            const timeNote =
              v.notes && ["morning", "afternoon"].includes(v.notes)
                ? v.notes
                : null;

            return (
              <li
                key={v.id}
                className="grid grid-cols-[40px_1fr] border-b border-navy/8 last:border-b-0"
              >
                {/* date column */}
                <div className="flex flex-col items-end pr-4 pt-5 pb-5">
                  {isRequested ? (
                    <span className="text-[10px] font-medium text-gold/70 leading-none mt-1 font-sans">
                      TBD
                    </span>
                  ) : parts ? (
                    <>
                      <span className="font-serif text-[22px] leading-none text-navy">
                        {parts.num}
                      </span>
                      <span className="text-[8px] uppercase tracking-[0.1em] text-light mt-0.5 font-sans">
                        {parts.mon}
                      </span>
                    </>
                  ) : null}
                </div>

                {/* content column */}
                <div className="pl-7 pt-5 pb-5">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <StatusPill value={v.status} />
                    <span className="text-[13px] text-body">
                      {formatModality(v.modality)}
                    </span>
                    {timeNote && (
                      <span className="text-[12px] text-light capitalize">
                        {timeNote}
                      </span>
                    )}
                    {v.video_url && (
                      <a className="text-[12px] text-gold" href={v.video_url}>
                        Join
                      </a>
                    )}
                  </div>

                  <div className="mt-3.5 flex gap-8">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.12em] text-light mb-1.5 font-sans">
                        Weight
                      </p>
                      {weightVal != null ? (
                        <p className="text-[18px] font-medium tabular-nums text-navy leading-none">
                          {weightVal}
                          <span className="text-[11px] font-normal text-light ml-1">
                            lb
                          </span>
                        </p>
                      ) : (
                        <p className="text-[13px] text-light/50 italic leading-none">—</p>
                      )}
                    </div>

                    <div>
                      <p className="text-[9px] uppercase tracking-[0.12em] text-light mb-1.5 font-sans">
                        Check-in
                      </p>
                      {check ? (
                        <>
                          <p className="text-[18px] font-medium tabular-nums text-navy leading-none">
                            {check.feeling ?? "—"}
                            <span className="text-[11px] font-normal text-light">
                              /5
                            </span>
                          </p>
                          {check.side_effects && (
                            <p className="text-[11px] text-body mt-1">
                              {check.side_effects}
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-[13px] text-light/50 italic leading-none">—</p>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}

          {rows.length === 0 && (
            <li className="pl-[67px] py-5 text-[13px] text-light">
              No appointments yet
            </li>
          )}
        </ol>

        {/* Add visit form */}
        {addingVisit && (
          <div className="mt-6 pt-6 border-t border-navy/10 pl-[67px]">
            <div className="grid sm:grid-cols-3 gap-5">
              <label className="text-[11px] text-light">
                Date
                <input
                  data-testid="visit-starts"
                  type="date"
                  className={`${field} mt-1`}
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                />
              </label>
              <label className="text-[11px] text-light">
                Time of day
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
              <label className="text-[11px] text-light">
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
                <label className="text-[11px] text-light sm:col-span-2">
                  Video URL
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
                  className={save}
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
                        notes: visitWindow !== "anytime" ? visitWindow : null,
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
          </div>
        )}
      </div>

      {/* ── PROTOCOL ── */}
      <div className="max-w-[780px] mx-auto px-5 pt-12">
        <SectionLabel label="Protocol" />
        <div className="grid sm:grid-cols-3 gap-6">
          <label className="text-[11px] text-light">
            Medication
            <input
              data-testid="protocol-drug"
              className={`${field} mt-1`}
              value={drug}
              onChange={(e) => setDrug(e.target.value)}
            />
          </label>
          <label className="text-[11px] text-light">
            Dose
            <input
              data-testid="protocol-dose"
              className={`${field} mt-1`}
              value={dose}
              onChange={(e) => setDose(e.target.value)}
            />
          </label>
          <label className="text-[11px] text-light">
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
          className={`${save} mt-5`}
          onClick={async () => {
            await clinicFetch(`/api/clinic/patients/${id}/protocol`, {
              method: "POST",
              body: JSON.stringify({ drug, currentDose: dose, nextAction }),
            });
            await reload();
          }}
        >
          Save protocol
        </button>
      </div>

      {/* ── WEIGHT ── */}
      <div className="max-w-[780px] mx-auto px-5 pt-12">
        <SectionLabel label="Weight" />
        <div className="flex items-end gap-5 max-w-xs">
          <label className="text-[11px] text-light flex-1">
            Add reading (lb)
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
            className={`${save} mb-1.5`}
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
        <ul className="mt-5 space-y-1.5" data-testid="vitals-list">
          {data.vitals.map((v) => (
            <li key={v.id} className="text-[13px] text-navy tabular-nums">
              {v.weight_lb ?? "—"} lb
              <span className="text-light ml-2">{formatDay(v.recorded_at)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── MEMBERSHIP ── */}
      <div className="max-w-[780px] mx-auto px-5 pt-12">
        <SectionLabel label="Membership" />
        <div className="grid sm:grid-cols-3 gap-6">
          <label className="text-[11px] text-light">
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
          <label className="text-[11px] text-light">
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
          <label className="text-[11px] text-light">
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
          className={`${save} mt-5`}
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
      </div>

      {/* ── EMA ── */}
      <div className="max-w-[780px] mx-auto px-5 pt-12 pb-16">
        <SectionLabel label="EMA" />
        <div className="flex items-end gap-5 max-w-md">
          <label className="text-[11px] text-light flex-1">
            Patient ID
            <input
              data-testid="ema-id"
              className={`${field} mt-1`}
              value={emaId}
              onChange={(e) => setEmaId(e.target.value)}
            />
          </label>
          <button
            data-testid="ema-link"
            className={`${save} mb-1.5`}
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
    </div>
  );
}
