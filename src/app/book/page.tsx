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
      <section className="pt-28 pb-14 md:pt-36 md:pb-20 bg-cream">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-6">
            Schedule Online
          </p>
          <h1
            className="font-serif text-5xl md:text-6xl leading-[1.08] tracking-[-0.02em] text-navy"
            style={{ textWrap: "balance" }}
          >
            Book Your <em className="text-gold">Appointment</em>
          </h1>
          <p className="mt-8 text-lg text-body max-w-2xl mx-auto leading-relaxed">
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
