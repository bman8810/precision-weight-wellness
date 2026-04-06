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

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-14 md:pt-36 md:pb-20 bg-cream">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-6">
            Insights & Education
          </p>
          <h1
            className="font-serif text-5xl md:text-6xl leading-[1.08] tracking-[-0.02em] text-navy"
            style={{ textWrap: "balance" }}
          >
            The <em className="text-gold">blog</em>
          </h1>
          <p className="mt-8 text-lg text-body max-w-2xl mx-auto leading-relaxed">
            Expert insights on weight loss medications, weight management science,
            and living your healthiest life.
          </p>
        </div>
      </section>

      {/* Featured + Posts */}
      <section className="py-14 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Featured post */}
          <ScrollReveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="group block bg-white rounded-[18px] overflow-hidden mb-12 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] card-hover"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-video lg:aspect-auto bg-warm overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                </div>
                <div className="p-10 lg:p-14 flex flex-col justify-center">
                  <p className="text-xs text-gold mb-3">{featured.date}</p>
                  <h2 className="font-serif text-2xl md:text-3xl tracking-[-0.02em] text-navy group-hover:text-gold transition-colors">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-body leading-relaxed">
                    {featured.excerpt}
                  </p>
                  <p className="mt-6 text-sm tracking-wide uppercase text-gold">
                    Read more &rarr;
                  </p>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* Other posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rest.map((post) => (
              <ScrollReveal key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block bg-white rounded-[18px] overflow-hidden transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] card-hover"
                >
                  <div className="aspect-video bg-warm overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8">
                    <p className="text-xs text-gold mb-2">{post.date}</p>
                    <h2 className="font-serif text-xl tracking-[-0.02em] text-navy group-hover:text-gold transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-sm text-body leading-relaxed">
                      {post.excerpt}
                    </p>
                    <p className="mt-4 text-xs tracking-wide uppercase text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                      Read more &rarr;
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
