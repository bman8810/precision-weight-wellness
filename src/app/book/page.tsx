import type { Metadata } from "next";

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
            Book Your <span className="text-gold">Consultation</span>
          </h1>
          <p className="mt-8 text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Select an appointment type and time that works for you. Your first
            visit is a comprehensive consultation with Dr. Rhee.
          </p>
        </div>
      </section>

      {/* Healthie Embed */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="rounded-2xl overflow-hidden shadow-[0_16px_40px_-12px_rgba(0,0,0,0.06)] bg-white">
            <iframe
              src="https://secure.gethealthie.com/appointments/embed_appt?dietitian_id=14666692&provider_ids=%5B14666692%5D&appt_type_ids=%5B520045,520046,520047%5D&primary_color=c7a96f"
              style={{ width: "100%", height: "100%", minHeight: "600px", border: "0px" }}
              title="Book an appointment with Dr. Rhee"
            />
          </div>
          <p className="mt-6 text-center text-xs text-neutral-400">
            Booking provided by{" "}
            <a
              href="https://gethealthie.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-dark transition-colors duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              Healthie
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
