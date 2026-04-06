import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[100dvh] flex items-center justify-center bg-cream pt-20">
      <div className="max-w-lg mx-auto px-6 text-center">
        <p className="font-serif text-8xl text-gold/30">404</p>
        <h1
          className="mt-6 font-serif text-3xl md:text-4xl tracking-[-0.02em] text-navy"
          style={{ textWrap: "balance" }}
        >
          Page not found
        </h1>
        <p className="mt-4 text-body leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="btn-gold"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="btn-secondary"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
