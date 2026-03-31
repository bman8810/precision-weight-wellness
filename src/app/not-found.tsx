import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[100dvh] flex items-center justify-center bg-cream pt-20">
      <div className="max-w-lg mx-auto px-6 text-center">
        <p className="font-serif text-8xl text-gold/30">404</p>
        <h1
          className="mt-6 font-serif text-3xl md:text-4xl tracking-tight text-soft-black"
          style={{ textWrap: "balance" }}
        >
          Page not found
        </h1>
        <p className="mt-4 text-neutral-500 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="bg-gold hover:bg-gold-dark text-white text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-[-1px] hover:shadow-[0_8px_24px_-8px_rgba(201,169,110,0.4)]"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="border border-neutral-300 text-neutral-600 hover:border-gold hover:text-gold text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-[-1px]"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
