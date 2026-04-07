import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "./data";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Expert insights on weight loss medications, medical weight management, and sustainable weight loss from Dr. Libby Rhee.",
};

/* Reusable trailing arrow for CTAs */
function ArrowIcon({ className = "text-current" }: { className?: string }) {
  return (
    <span className={`ml-2 w-7 h-7 rounded-full bg-current/15 flex items-center justify-center ${className}`}>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M3.5 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      {/* ── Hero — navy ── */}
      <section className="relative bg-navy pt-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/headers/blog-header.jpg" alt="" className="w-full h-full object-cover" aria-hidden="true" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-5 md:px-6 pt-14 pb-14 md:pt-28 md:pb-28">
          <div className="text-center max-w-2xl mx-auto">
            <p
              className="animate-fade-up flex items-center justify-center gap-2 text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-5"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              Insights &amp; Education
            </p>
            <h1
              className="animate-fade-up font-serif text-[clamp(2.75rem,5.5vw,4.25rem)] leading-[1.08] tracking-[-0.02em] text-white"
              style={{ animationDelay: "0.2s", textWrap: "balance" }}
            >
              The <em className="text-gold">blog</em>
            </h1>
            <p
              className="animate-fade-up text-[16px] text-white/65 leading-[1.7] mt-6 max-w-xl mx-auto"
              style={{ animationDelay: "0.35s" }}
            >
              Expert insights on weight loss medications, weight management science,
              and living your healthiest life.
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured Post — cream ── */}
      <section className="py-14 md:py-28 bg-cream">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="doppelrand doppelrand-light">
              <Link
                href={`/blog/${featured.slug}`}
                className="group block bg-white rounded-[18px] overflow-hidden border border-[rgba(27,42,74,0.04)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(27,42,74,0.1)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative aspect-video lg:aspect-auto lg:min-h-[400px] overflow-hidden">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                      priority
                    />
                  </div>
                  <div className="p-10 lg:p-14 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] bg-gold/10 text-gold px-2.5 py-1 rounded-full">
                        {featured.category}
                      </span>
                      <span className="text-[13px] text-light">{featured.date}</span>
                    </div>
                    <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] tracking-[-0.02em] leading-[1.15] text-navy group-hover:text-gold transition-colors duration-500">
                      {featured.title}
                    </h2>
                    <p className="mt-4 text-[15px] text-body leading-[1.7]">
                      {featured.excerpt}
                    </p>
                    <p className="mt-6 inline-flex items-center text-[14px] font-semibold uppercase tracking-[0.08em] text-gold">
                      Read article
                      <ArrowIcon className="text-gold" />
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Blog Grid — white ── */}
      <section className="py-14 md:py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                Latest articles
              </p>
              <h2 className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-navy">
                More from the <em className="text-gold">journal</em>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150} stagger={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rest.map((post) => (
                <div key={post.slug} className="doppelrand doppelrand-light">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block bg-white rounded-[18px] overflow-hidden border border-[rgba(27,42,74,0.04)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(27,42,74,0.1)] h-full"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                      />
                      <span className="absolute top-4 left-4 text-[10px] font-semibold uppercase tracking-[0.12em] bg-white/90 backdrop-blur-sm text-navy px-2.5 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-8">
                      <p className="text-[13px] text-light mb-2">{post.date}</p>
                      <h2 className="font-serif text-[20px] tracking-[-0.02em] leading-[1.2] text-navy group-hover:text-gold transition-colors duration-500">
                        {post.title}
                      </h2>
                      <p className="mt-3 text-[15px] text-body leading-[1.65]">
                        {post.excerpt}
                      </p>
                      <p className="mt-5 inline-flex items-center text-[13px] font-semibold uppercase tracking-[0.08em] text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        Read article
                        <ArrowIcon className="text-gold" />
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA — navy-deep ── */}
      <section className="py-14 md:py-28 bg-navy-deep">
        <ScrollReveal>
          <div className="max-w-[680px] mx-auto px-5 md:px-6 text-center">
            <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-5">
              Your next step
            </p>
            <h2
              className="font-serif text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.08] tracking-[-0.02em] text-white"
              style={{ textWrap: "balance" }}
            >
              Ready to start your <em className="text-gold">journey?</em>
            </h2>
            <p className="text-[16px] text-white/60 leading-[1.7] mt-4 max-w-md mx-auto">
              Schedule a consultation with Dr. Rhee. Real medicine. Real results.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/book" className="btn-gold group w-full sm:w-auto justify-center">
                Book your consultation
                <ArrowIcon className="text-navy-deep transition-transform duration-500 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/eligibility"
                className="inline-flex items-center justify-center text-[15px] font-medium text-white/70 border border-white/25 rounded-full px-8 py-[15px] min-h-[48px] hover:bg-white/10 hover:text-white active:scale-[0.98] w-full sm:w-auto"
              >
                Check eligibility
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
