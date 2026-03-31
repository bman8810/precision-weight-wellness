import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-soft-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14">
          {/* Brand */}
          <div>
            <p className="font-serif text-2xl tracking-wide">PRECISION</p>
            <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 mt-1">
              Weight & Wellness
            </p>
            <p className="text-sm text-neutral-400 mt-6 leading-relaxed">
              Medically supervised weight management at Liora. Science-based
              GLP-1 programs led by Dr. Libby Rhee.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-gold mb-5">
              Quick Links
            </p>
            <div className="space-y-3">
              {[
                { label: "About", href: "/about" },
                { label: "How It Works", href: "/how-it-works" },
                { label: "Eligibility Check", href: "/eligibility" },
                { label: "Pricing", href: "/pricing" },
                { label: "Blog", href: "/blog" },
                { label: "Testimonials", href: "/testimonials" },
              ].map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="block text-sm text-neutral-400 hover:text-white transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-gold mb-5">
              Contact
            </p>
            <div className="space-y-3 text-sm text-neutral-400">
              <p>110 E 60th Street, Suite 800</p>
              <p>New York, NY 10022</p>
              <a
                href="tel:+12124334569"
                className="block hover:text-white transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                212.433.4569
              </a>
              <a
                href="mailto:hello@lioradermatology.com"
                className="block hover:text-white transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                hello@lioradermatology.com
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-gold mb-5">
              Important Notice
            </p>
            <p className="text-xs text-neutral-500 leading-relaxed">
              This program is not a substitute for emergency medical care.
              Results vary by individual. GLP-1 medications require a
              prescription and medical supervision. All treatments are provided
              under the care of a licensed physician.
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} Precision Weight & Wellness at
            Liora. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/contact"
              className="text-xs text-neutral-500 hover:text-white transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
