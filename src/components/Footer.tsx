import Link from "next/link";

const programLinks = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Why Us", href: "/why-us" },
  { label: "The Science", href: "/science" },
  { label: "Pricing", href: "/pricing" },
  { label: "Eligibility", href: "/eligibility" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "HIPAA Notice", href: "/hipaa" },
];

export default function Footer() {
  return (
    <footer className="bg-[#163D3A]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-6 py-14 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <p className="text-[20px] tracking-[-0.02em]">
              <span className="font-serif text-white">Precision </span>
              <span className="font-serif text-gold">W+W</span>
            </p>
            <p className="text-[15px] text-white/50 leading-[1.65] mt-3 max-w-xs">
              Clinical-grade weight management, led by board-certified physicians.
            </p>
            <p className="text-[15px] mt-4">
              <a
                href="mailto:hello@precisionww.com"
                className="text-white/50 hover:text-gold transition-colors"
              >
                hello@precisionww.com
              </a>
            </p>
          </div>

          {/* Program */}
          <div className="md:col-span-2 md:col-start-6">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-gold mb-4">
              Program
            </p>
            <div className="space-y-2.5">
              {programLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-[15px] text-white/50 hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-gold mb-4">
              Company
            </p>
            <div className="space-y-2.5">
              {companyLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-[15px] text-white/50 hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-gold mb-4">
              Legal
            </p>
            <div className="space-y-2.5">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-[15px] text-white/50 hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-6 border-t border-white/10">
          <p className="text-[12px] text-white/35 leading-relaxed max-w-3xl">
            &copy; {new Date().getFullYear()} Precision Weight + Wellness. All rights reserved.
            Results may vary. Medications prescribed only when medically appropriate.
            This site does not provide medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
