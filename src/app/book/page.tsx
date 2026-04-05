import type { Metadata } from "next";
import BookingFlow from "./BookingFlow";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Schedule your medical weight loss consultation with Dr. Libby Rhee. Book online through our secure scheduling portal.",
};

export default function BookPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 bg-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
            Schedule Online
          </p>
          <h1
            className="font-serif text-5xl md:text-6xl leading-[1.08] tracking-tight text-soft-black"
            style={{ textWrap: "balance" }}
          >
            Book Your <span className="text-gold">Appointment</span>
          </h1>
          <p className="mt-8 text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            New patients can select a plan and schedule their first visit.
            Returning patients can book a follow-up or group session.
          </p>
        </div>
      </section>

      {/* Booking Flow */}
      <BookingFlow />
    </>
  );
}
