"use client";

import { useMemo, useState } from "react";
import { clinicFetch } from "@/lib/clinic/client";
import {
  BOOKABLE_STATES,
  COMORBIDITIES,
  CONTRAINDICATIONS,
  PHARMACY_COST_LINE,
  bmiFromImperial,
  type Glp1Exposure,
} from "@/lib/clinic/eligibility";
import type { DayWindow, OfferedSlot } from "@/lib/clinic/slots";
import type { Tier } from "@/lib/clinic/types";

const field =
  "w-full min-h-12 px-4 py-3 bg-cream border border-navy/10 rounded-xl text-[15px] text-navy placeholder:text-navy/35 focus:outline-none focus:border-gold";
const labelCls = "block text-[13px] text-navy mb-1.5";
const btn = "inline-flex items-center justify-center min-h-12 bg-navy text-white px-5 py-2.5 text-[14px] rounded-full font-medium";
const ghost = "text-[14px] text-navy/60";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block mb-4">
      <span className={labelCls}>{label}</span>
      {children}
    </label>
  );
}

function formatSlotDay(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function windowLabel(window: string): string {
  if (window === "morning") return "Morning";
  if (window === "afternoon") return "Afternoon";
  return "Anytime";
}

const PLANS: Array<{
  key: Tier;
  name: string;
  price: string;
  blurb: string;
}> = [
  {
    key: "essential",
    name: "Essential",
    price: "$199 /mo",
    blurb: "Monthly check-in, medication management, and baseline labs.",
  },
  {
    key: "premium",
    name: "Premium",
    price: "$349 /mo",
    blurb: "Twice-monthly visits, B12 injections, and nutritional counseling.",
  },
  {
    key: "concierge",
    name: "Concierge",
    price: "$599 /mo",
    blurb: "Unlimited check-ins, priority scheduling, and direct access to Dr. Rhee.",
  },
];

type Step =
  | "state"
  | "waitlist"
  | "about"
  | "comorbid"
  | "contra"
  | "glp1"
  | "verdict"
  | "plan"
  | "account"
  | "intake"
  | "pay"
  | "book"
  | "confirm"
  | "ineligible";

export default function StartFlow() {
  const [step, setStep] = useState<Step>("state");
  const [state, setState] = useState("NY");
  const [waitEmail, setWaitEmail] = useState("");
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(6);
  const [weight, setWeight] = useState(180);
  const [email, setEmail] = useState("");
  const [comorbid, setComorbid] = useState<string[]>([]);
  const [contra, setContra] = useState<string[]>([]);
  const [glp1, setGlp1] = useState<Glp1Exposure>("never");
  const [verdict, setVerdict] = useState<string>("");
  const [insuranceOk, setInsuranceOk] = useState(false);
  const [tier, setTier] = useState<Tier>("premium");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [meds, setMeds] = useState("");
  const [allergies, setAllergies] = useState("");
  const [patientId, setPatientId] = useState<string | null>(null);
  const [packetUrl, setPacketUrl] = useState<string | null>(null);
  const [slots, setSlots] = useState<OfferedSlot[]>([]);
  const [pick, setPick] = useState<OfferedSlot | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const heightIn = feet * 12 + inches;
  const bmi = useMemo(
    () => Math.round(bmiFromImperial(heightIn, weight) * 10) / 10,
    [heightIn, weight]
  );

  async function runEligibility() {
    setBusy(true);
    setError("");
    try {
      const r = await clinicFetch<{ verdict: string; insuranceQualifies?: boolean }>(
        "/api/clinic/public/eligibility",
        {
          method: "POST",
          body: JSON.stringify({
            state,
            heightIn,
            weightLb: weight,
            comorbidityIds: comorbid,
            contraindicationIds: contra,
            glp1Exposure: glp1,
            email: email || undefined,
          }),
        }
      );
      setVerdict(r.verdict);
      setInsuranceOk(Boolean(r.insuranceQualifies));
      if (r.verdict === "ineligible") setStep("ineligible");
      else if (r.verdict === "waitlist") setStep("waitlist");
      else setStep("verdict");
    } catch (err) {
      setError(err instanceof Error ? err.message : "eligibility failed");
    } finally {
      setBusy(false);
    }
  }

  async function createAccount() {
    setBusy(true);
    setError("");
    try {
      const r = await clinicFetch<{ patientId: string }>(
        "/api/clinic/public/leads",
        {
          method: "POST",
          body: JSON.stringify({
            name,
            email,
            phone,
            password,
            tier,
            modality: "remote",
            preferredWindow: "first_visit",
            notes: `meds:${meds || "none"} allergies:${allergies || "nkda"} dob:${dob} state:${state}`,
          }),
        }
      );
      setPatientId(r.patientId);
      const packet = await clinicFetch<{ packet: { url: string } }>(
        "/api/clinic/public/intake",
        {
          method: "POST",
          body: JSON.stringify({
            name,
            email,
            phone,
            dob,
            patientId: r.patientId,
          }),
        }
      );
      setPacketUrl(packet.packet.url);
      setStep("intake");
    } catch (err) {
      setError(err instanceof Error ? err.message : "account failed");
    } finally {
      setBusy(false);
    }
  }

  async function pay() {
    if (!patientId) return;
    setBusy(true);
    setError("");
    try {
      await clinicFetch("/api/clinic/public/pay-demo", {
        method: "POST",
        body: JSON.stringify({ patientId, tier, booked: false }),
      });
      const offered = await clinicFetch<{ slots: OfferedSlot[] }>(
        `/api/clinic/public/slots?state=${state}`
      );
      setSlots(offered.slots);
      setStep("book");
    } catch (err) {
      setError(err instanceof Error ? err.message : "pay failed");
    } finally {
      setBusy(false);
    }
  }

  async function book() {
    if (!patientId || !pick) return;
    setBusy(true);
    setError("");
    try {
      await clinicFetch("/api/clinic/public/book-first", {
        method: "POST",
        body: JSON.stringify({
          patientId,
          date: pick.date,
          window: pick.window as DayWindow,
          modality: "remote",
        }),
      });
      setStep("confirm");
    } catch (err) {
      setError(err instanceof Error ? err.message : "book failed");
    } finally {
      setBusy(false);
    }
  }

  function toggle(list: string[], id: string, noneId?: string) {
    if (noneId && id === noneId) return [];
    const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
    return next.filter((x) => x !== noneId);
  }

  return (
    <div className="max-w-[720px] mx-auto px-5 pt-28 pb-16 md:pt-32">
      <p className="text-[10px] uppercase tracking-[0.18em] text-[#66707E] border-b border-navy pb-2 mb-8">
        Start
      </p>
      {error && (
        <p className="text-[#A8443C] text-sm mb-4" role="alert">
          {error}
        </p>
      )}

      {step === "state" && (
        <>
          <h1 className="font-serif text-4xl text-navy mb-6">
            Where do you <em className="text-gold">live</em>?
          </h1>
          <select
            data-testid="start-state"
            className={field}
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="CT">Connecticut</option>
            <option value="NY">New York</option>
            <option value="MI">Michigan</option>
            <option value="NJ">New Jersey</option>
            <option value="TX">Texas</option>
            <option value="CA">California</option>
          </select>
          <button
            className={`${btn} mt-6`}
            data-testid="start-continue"
            onClick={() =>
              setStep(
                (BOOKABLE_STATES as readonly string[]).includes(state)
                  ? "about"
                  : "waitlist"
              )
            }
          >
            Continue
          </button>
        </>
      )}

      {step === "waitlist" && (
        <>
          <h1 className="font-serif text-4xl text-navy mb-4">
            We&apos;re not in your state yet
          </h1>
          <p className="mb-4">Leave your email and we&apos;ll write when we are.</p>
          <input
            className={field}
            data-testid="waitlist-email"
            placeholder="Email"
            value={waitEmail}
            onChange={(e) => setWaitEmail(e.target.value)}
          />
          <button
            className={`${btn} mt-6`}
            data-testid="waitlist-submit"
            onClick={async () => {
              await clinicFetch("/api/clinic/public/eligibility", {
                method: "POST",
                body: JSON.stringify({
                  state,
                  heightIn: 66,
                  weightLb: 180,
                  comorbidityIds: [],
                  contraindicationIds: [],
                  glp1Exposure: "never",
                  email: waitEmail,
                }),
              });
              setVerdict("waitlist");
              setStep("confirm");
            }}
          >
            Join the waitlist
          </button>
        </>
      )}

      {step === "about" && (
        <>
          <h1 className="font-serif text-4xl text-navy mb-4">Tell us about you</h1>
          <div className="grid grid-cols-2 gap-3">
            <label>
              Feet
              <input
                className={field}
                type="number"
                value={feet}
                onChange={(e) => setFeet(Number(e.target.value))}
              />
            </label>
            <label>
              Inches
              <input
                className={field}
                type="number"
                value={inches}
                onChange={(e) => setInches(Number(e.target.value))}
              />
            </label>
          </div>
          <label className="block mt-4">
            Weight (lb)
            <input
              className={field}
              type="number"
              data-testid="start-weight"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
            />
          </label>
          <p className="font-mono mt-3" data-testid="start-bmi">
            BMI {Number.isFinite(bmi) ? bmi : "—"}
          </p>
          <label className="block mt-4">
            Email
            <input
              className={field}
              data-testid="start-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button className={`${btn} mt-6`} onClick={() => setStep("comorbid")}>
            Continue
          </button>
        </>
      )}

      {step === "comorbid" && (
        <>
          <h1 className="font-serif text-4xl text-navy mb-4">Any of these?</h1>
          {COMORBIDITIES.map((c) => (
            <label key={c.id} className="flex gap-2 py-2">
              <input
                type="checkbox"
                checked={comorbid.includes(c.id)}
                onChange={() => setComorbid(toggle(comorbid, c.id))}
              />
              {c.label}
            </label>
          ))}
          <button className={`${btn} mt-6`} onClick={() => setStep("contra")}>
            Continue
          </button>
        </>
      )}

      {step === "contra" && (
        <>
          <h1 className="font-serif text-4xl text-navy mb-4">
            A few safety questions
          </h1>
          {CONTRAINDICATIONS.map((c) => (
            <label key={c.id} className="flex gap-2 py-2">
              <input
                type="checkbox"
                data-testid={`contra-${c.id}`}
                checked={contra.includes(c.id)}
                onChange={() => setContra(toggle(contra, c.id))}
              />
              {c.label}
            </label>
          ))}
          <button className={`${btn} mt-6`} onClick={() => setStep("glp1")}>
            Continue
          </button>
        </>
      )}

      {step === "glp1" && (
        <>
          <h1 className="font-serif text-4xl text-navy mb-4">
            Have you taken these before?
          </h1>
          {(
            [
              ["never", "Never taken one"],
              ["current", "Taking one now"],
              ["past", "Took one in the past, stopped"],
            ] as const
          ).map(([id, label]) => (
            <label key={id} className="flex gap-2 py-2">
              <input
                type="radio"
                name="glp1"
                checked={glp1 === id}
                onChange={() => setGlp1(id)}
              />
              {label}
            </label>
          ))}
          <button
            className={`${btn} mt-6`}
            data-testid="start-see-results"
            disabled={busy}
            onClick={runEligibility}
          >
            See my results
          </button>
        </>
      )}

      {step === "verdict" && (
        <>
          <h1 className="font-serif text-4xl text-navy mb-4">
            You&apos;re a candidate
          </h1>
          <p className="mb-3">BMI {bmi}.</p>
          {insuranceOk ? (
            <p className="mb-6">You may also meet common insurance BMI criteria. Next, select your plan.</p>
          ) : (
            <p className="mb-6" data-testid="start-not-insurance">
              Not a candidate for insurance at this BMI. The program is cash-pay.
              Next, select your plan.
            </p>
          )}
          <button className={btn} onClick={() => setStep("plan")}>
            Choose your plan →
          </button>
        </>
      )}

      {step === "ineligible" && (
        <h1 className="font-serif text-4xl text-navy">
          This program is not the right fit
        </h1>
      )}

      {step === "plan" && (
        <>
          <h1 className="font-serif text-4xl text-navy mb-6">
            Select your <em className="text-gold">plan</em>
          </h1>
          <div className="space-y-4">
            {PLANS.map((p) => (
              <button
                key={p.key}
                data-testid={`tier-${p.key}`}
                onClick={() => setTier(p.key)}
                className={`w-full text-left py-4 border-b border-[#E4E6EA] ${
                  tier === p.key ? "border-l-[3px] border-l-gold pl-3" : ""
                }`}
              >
                {p.key === "premium" && (
                  <p className="text-[10px] uppercase tracking-[0.16em] text-gold">
                    Recommended
                  </p>
                )}
                <p className="font-serif text-2xl text-navy">
                  {p.name} {p.price}
                </p>
                <p>{p.blurb}</p>
                <p className="text-sm mt-1">{PHARMACY_COST_LINE}</p>
              </button>
            ))}
          </div>
          <button
            className={`${btn} mt-6`}
            data-testid="plan-continue"
            onClick={() => setStep("account")}
          >
            Continue with {PLANS.find((p) => p.key === tier)?.name}
          </button>
        </>
      )}

      {step === "account" && (
        <>
          <h1 className="font-serif text-4xl text-navy mb-6">
            Create your account
          </h1>
          <Field label="Full name">
            <input
              className={field}
              autoComplete="name"
              name="name"
              data-testid="lead-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Field label="Date of birth">
            <input
              className={field}
              type="date"
              autoComplete="bday"
              name="bday"
              data-testid="lead-dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </Field>
          <Field label="Email">
            <input
              className={field}
              type="email"
              inputMode="email"
              autoComplete="email"
              name="email"
              data-testid="lead-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field label="Mobile">
            <input
              className={field}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              name="tel"
              data-testid="lead-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Field>
          <Field label="Password">
            <input
              className={field}
              type="password"
              autoComplete="new-password"
              name="password"
              data-testid="lead-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          <Field label="Current medications">
            <input
              className={field}
              name="medications"
              value={meds}
              onChange={(e) => setMeds(e.target.value)}
            />
          </Field>
          <Field label="Drug allergies">
            <input
              className={field}
              name="allergies"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
            />
          </Field>
          <button className={`${btn} mt-2`} data-testid="lead-submit" disabled={busy} onClick={createAccount}>
            Continue
          </button>
        </>
      )}

      {step === "intake" && (
        <>
          <h1 className="font-serif text-4xl text-navy mb-4">
            Sign your <em className="text-gold">forms</em>
          </h1>
          <p className="mb-6 text-[15px] leading-relaxed">
            Review and sign when you can. You can keep going and finish later.
          </p>
          {packetUrl ? (
            <a
              className={`${btn} mb-4`}
              href={packetUrl}
              target="_blank"
              rel="noreferrer"
            >
              Sign my forms
            </a>
          ) : (
            <p className="mb-6 text-[15px]">
              We&apos;ll send your forms to the email on your account.
            </p>
          )}
          <div>
            <button className={`${btn} mt-4`} onClick={() => setStep("pay")}>
              Continue to payment
            </button>
          </div>
        </>
      )}

      {step === "pay" && (
        <>
          <h1 className="font-serif text-4xl text-navy mb-4">Confirm and pay</h1>
          <p className="font-serif text-2xl">{PLANS.find((p) => p.key === tier)?.price}</p>
          <p className="mb-4">{PHARMACY_COST_LINE}</p>
          <p className="text-sm mb-4">Demo payment — you will not be charged.</p>
          <button className={btn} data-testid="pay-demo" disabled={busy} onClick={pay}>
            Pay and continue
          </button>
        </>
      )}

      {step === "book" && (
        <>
          <h1 className="font-serif text-4xl text-navy mb-3">
            Book your first <em className="text-gold">visit</em>
          </h1>
          <p className="mb-8 text-[15px] leading-relaxed">
            Pick a day and time of day. We&apos;ll confirm shortly.
          </p>
          <div className="space-y-6">
            {Array.from(new Map(slots.map((s) => [s.date, true])).keys())
              .slice(0, 8)
              .map((date) => (
                <div key={date}>
                  <p className="font-serif text-[20px] text-navy mb-3">
                    {formatSlotDay(date)}
                  </p>
                  <div className="flex gap-3">
                    {slots
                      .filter((s) => s.date === date)
                      .map((s) => {
                        const on = pick?.date === s.date && pick.window === s.window;
                        return (
                          <button
                            key={`${s.date}-${s.window}`}
                            type="button"
                            data-testid={`slot-${s.date}-${s.window}`}
                            onClick={() => setPick(s)}
                            className={`flex-1 min-h-12 rounded-full text-[14px] font-medium border ${
                              on
                                ? "bg-navy text-white border-navy"
                                : "bg-white text-navy border-navy/15"
                            }`}
                          >
                            {windowLabel(s.window)}
                          </button>
                        );
                      })}
                  </div>
                </div>
              ))}
          </div>
          <button className={`${btn} mt-8`} disabled={!pick || busy} onClick={book}>
            Continue
          </button>
        </>
      )}

      {step === "confirm" && (
        <div data-testid="lead-success">
          <h1 className="font-serif text-4xl text-navy mb-4">
            Here&apos;s what happens next
          </h1>
          {verdict === "waitlist" ? (
            <p>You&apos;re on the waitlist.</p>
          ) : (
            <ol className="list-decimal pl-5 space-y-2 text-[15px] leading-relaxed">
              <li>You&apos;re in. Your membership is active.</li>
              <li>We&apos;ll confirm your first visit shortly.</li>
              <li>Baseline labs come next — fasting draw before that visit.</li>
              <li>Finish your forms if you haven&apos;t already.</li>
            </ol>
          )}
        </div>
      )}

      {step !== "state" && step !== "confirm" && (
        <button className={`${ghost} block mt-6`} onClick={() => setStep("state")}>
          ← Start over
        </button>
      )}
    </div>
  );
}
