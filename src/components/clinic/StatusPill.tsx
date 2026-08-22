"use client";

export function StatusPill({
  value,
  label,
}: {
  value: string | null | undefined;
  label?: string;
}) {
  const text = label ?? (value ? value.replaceAll("_", " ") : "—");
  const cls = (() => {
    switch (value) {
      case "active":
      case "scheduled":
        return "bg-sage/12 text-teal";
      case "lead":
      case "requested":
        return "bg-gold/15 text-[#8a5a12]";
      case "paused":
        return "bg-[#f6ead2] text-[#8a5a12]";
      case "canceled":
      case "no_show":
        return "bg-[#f8e8e4] text-[#9b2c2c]";
      default:
        return "bg-navy/5 text-body";
    }
  })();
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${cls}`}
    >
      {text}
    </span>
  );
}
