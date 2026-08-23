"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "/";
  const clinic =
    pathname === "/staff" ||
    pathname.startsWith("/staff/") ||
    pathname === "/app" ||
    pathname.startsWith("/app/") ||
    pathname === "/start" ||
    pathname.startsWith("/start/");

  if (clinic) {
    return (
      <main id="main-content" className="min-h-dvh bg-cream">
        {children}
      </main>
    );
  }

  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
