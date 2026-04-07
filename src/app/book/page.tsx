import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import BookingFlow from "./BookingFlow";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Schedule your medical weight loss consultation with Dr. Libby Rhee. Book online through our secure scheduling portal.",
};

export default function BookPage() {
  return (
    <>
      {/* Hero — teal-to-navy */}
      <section className="relative pt-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #1D5C4D 0%, #1B2A4A 100%)" }}>
        <div className="absolute inset-0 opacity-[0.08]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/headers/book-header.jpg" alt="" className="w-full h-full object-cover" aria-hidden="true" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-5 md:px-6 pt-14 pb-14 md:pt-24 md:pb-20">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <p
                className="animate-fade-up flex items-center justify-center gap-2 text-sage text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-6"
                style={{ animationDelay: "0.1s" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                Schedule Online
              </p>
              <h1
                className="animate-fade-up font-serif text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.08] tracking-[-0.02em] text-white"
                style={{ animationDelay: "0.2s" }}
              >
                Book Your <em className="text-gold">Appointment</em>
              </h1>
              <p
                className="animate-fade-up text-[16px] text-white/60 leading-[1.7] mt-5 max-w-lg mx-auto"
                style={{ animationDelay: "0.35s" }}
              >
                New patients can select a plan and schedule their first visit.
                Returning patients can book a follow-up or group session.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Booking Flow */}
      <BookingFlow />
    </>
  );
}
