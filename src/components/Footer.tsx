import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-soft-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          {/* Brand */}
          <div>
            <p className="font-serif text-2xl tracking-wide">LIORA</p>
            <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 mt-1">
              Precision Weight + Wellness
            </p>
            <p className="text-sm text-neutral-400 mt-6 leading-relaxed max-w-xs">
              Medically supervised weight management at Liora. Science-based,
              medication-enabled programs led by Dr. Libby Rhee.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-gold mb-5">
              Quick links
            </p>
            <nav className="space-y-3">
              {[
                { label: "About", href: "/about" },
                { label: "Why Us", href: "/why-us" },
                { label: "How It Works", href: "/how-it-works" },
                { label: "Eligibility Check", href: "/eligibility" },
                { label: "Pricing", href: "/pricing" },
                { label: "The Science", href: "/science" },
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
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-gold mb-5">
              Contact
            </p>
            <div className="space-y-3 text-sm text-neutral-400">
              <a
                href="mailto:hello@precisionww.com"
                className="block hover:text-white transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                hello@precisionww.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} Precision Weight + Wellness at
            Liora. All rights reserved.
          </p>
          <p className="text-xs text-neutral-500 max-w-2xl text-center md:text-right leading-relaxed">
            This program is not a substitute for emergency medical care.
            Results vary by individual. All treatments are provided under the
            care of a licensed physician.
          </p>
        </div>
      </div>
    </footer>
  );
}
