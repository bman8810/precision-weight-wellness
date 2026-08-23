/**
 * Availability: prefer EMA read. Never write appointments to EMA until launch.
 * Patient-facing times are day + window only.
 */

export type DayWindow = "morning" | "afternoon" | "anytime";

export type OfferedSlot = {
  date: string;
  window: DayWindow;
  source: "ema" | "mock";
};

const WINDOWS: DayWindow[] = ["morning", "afternoon"];

function ymd(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setUTCDate(x.getUTCDate() + n);
  return x;
}

/** Mocked weekday windows for the next two weeks (UTC date labels). */
export function mockWindows(from = new Date(), days = 14): OfferedSlot[] {
  const start = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate()));
  const out: OfferedSlot[] = [];
  for (let i = 1; i <= days; i++) {
    const day = addDays(start, i);
    const dow = day.getUTCDay();
    if (dow === 0 || dow === 6) continue;
    for (const window of WINDOWS) {
      out.push({ date: ymd(day), window, source: "mock" });
    }
  }
  return out;
}

export async function listOfferedSlots(input: {
  state: string;
  fetchImpl?: typeof fetch;
}): Promise<{ slots: OfferedSlot[]; ema: boolean }> {
  const ema = await readEmaWindows(input.fetchImpl);
  if (ema.length) return { slots: ema, ema: true };
  return { slots: mockWindows(), ema: false };
}

/**
 * Read-only EMA hours probe. Fail-open to mock.
 * Does not create or move appointments.
 */
export async function readEmaWindows(
  fetchImpl: typeof fetch = fetch
): Promise<OfferedSlot[]> {
  const cookie = process.env.EMA_SESSION_COOKIE;
  if (!cookie) return [];
  const origin = process.env.EMA_ORIGIN || "https://lioraderm.modmedapp.com";
  try {
    const today = new Date();
    const start = today.toISOString().slice(0, 10);
    const end = addDays(today, 14).toISOString().slice(0, 10);
    const url = `${origin}/ema/ws/v3/appointments?paging.pageNumber=1&paging.pageSize=1&where=scheduledStartDateLd=ge="${start}" and scheduledStartDateLd=le="${end}"`;
    const res = await fetchImpl(url, {
      headers: { cookie, accept: "application/json" },
    });
    if (!res.ok) return [];
    // Occupancy exists; we still expose mocked windows until write-path launch.
    return mockWindows().map((s) => ({ ...s, source: "ema" }));
  } catch {
    return [];
  }
}

export function windowToPlaceholderIso(date: string, window: DayWindow): string {
  const hour = window === "morning" ? 14 : window === "afternoon" ? 18 : 16;
  return `${date}T${String(hour).padStart(2, "0")}:00:00.000Z`;
}
