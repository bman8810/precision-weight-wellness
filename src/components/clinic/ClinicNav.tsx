"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { clinicFetch } from "@/lib/clinic/client";

export default function ClinicNav({
  area,
  name,
}: {
  area: "staff" | "patient";
  name?: string;
}) {
  const router = useRouter();
  const home = area === "staff" ? "/staff" : "/app";
  const login = area === "staff" ? "/staff/login" : "/app/login";

  async function logout() {
    await clinicFetch("/api/clinic/auth/logout", { method: "POST" });
    router.push(login);
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 px-4 md:px-6 pt-4">
      <div className="mx-auto max-w-[900px] bg-white/90 backdrop-blur-[20px] shadow-[0_2px_20px_rgba(27,42,74,0.06)] ring-1 ring-[rgba(27,42,74,0.04)] rounded-full">
        <div className="px-5 md:px-6 h-14 flex items-center justify-between gap-3">
          <Link href={home} className="flex flex-col leading-none">
            <span className="font-serif text-[18px] tracking-[-0.02em] text-navy">
              Precision <span className="text-gold">W+W</span>
            </span>
            <span className="font-serif text-[10px] uppercase tracking-[0.1em] text-light">
              {area === "staff" ? "Clinic" : "Patient portal"}
            </span>
          </Link>
          <nav className="flex items-center gap-5 text-[13px]">
            {area === "staff" && (
              <>
                <Link href="/staff" className="text-body hover:text-navy">
                  Today
                </Link>
                <Link href="/staff/patients" className="text-body hover:text-navy">
                  Roster
                </Link>
                <Link href="/staff/queue" className="text-body hover:text-navy">
                  Queue
                </Link>
                <Link href="/staff/inbox" className="text-body hover:text-navy">
                  Labs
                </Link>
                <Link href="/staff/config" className="text-body hover:text-navy">
                  Config
                </Link>
              </>
            )}
            {area === "patient" && (
              <>
                <Link href="/app" className="text-body hover:text-navy">
                  Home
                </Link>
                <Link href="/app/check-in" className="text-body hover:text-navy">
                  Check-in
                </Link>
                <Link href="/app/billing" className="text-body hover:text-navy">
                  Billing
                </Link>
              </>
            )}
            {name && (
              <span className="text-light hidden sm:inline">{name}</span>
            )}
            <button
              type="button"
              onClick={logout}
              className="text-gold hover:text-gold-light font-medium"
            >
              Log out
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
