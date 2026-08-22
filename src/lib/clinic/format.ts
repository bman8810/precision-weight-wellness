export function formatWhen(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}

export function formatModality(value: string | null | undefined): string {
  if (value === "in_person") return "In person";
  if (value === "remote") return "Remote";
  return value ?? "—";
}

export function formatStatus(value: string | null | undefined): string {
  if (!value) return "—";
  return value.replaceAll("_", " ");
}

export function statusClass(status: string | null | undefined): string {
  switch (status) {
    case "active":
    case "scheduled":
    case "confirmed":
      return "bg-sage/12 text-teal";
    case "lead":
    case "requested":
      return "bg-gold/15 text-gold-dark";
    case "paused":
    case "hold":
      return "bg-[#f6ead2] text-[#8a5a12]";
    case "canceled":
    case "no_show":
      return "bg-[#f8e8e4] text-[#9b2c2c]";
    default:
      return "bg-navy/5 text-body";
  }
}
