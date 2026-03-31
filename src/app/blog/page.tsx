import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "./data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Expert insights on GLP-1 medications, medical weight management, and sustainable weight loss from Dr. Libby Rhee.",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-24 bg-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
            Insights & Education
          </p>
          <h1
            className="font-serif text-5xl md:text-6xl leading-[1.08] tracking-tight text-soft-black"
            style={{ textWrap: "balance" }}
          >
            The <span className="text-gold">blog</span>
          </h1>
          <p className="mt-8 text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Expert insights on GLP-1 medications, weight management science,
            and living your healthiest life.
          </p>
        </div>
      </section>

      {/* Featured + Posts */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Featured post */}
          <Link
            href={`/blog/${featured.slug}`}
            className="group block bg-cream rounded-2xl overflow-hidden mb-12 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_16px_40px_-12px_rgba(201,169,110,0.08)]"
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
                <h2 className="font-serif text-2xl md:text-3xl text-soft-black group-hover:text-gold transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-4 text-neutral-500 leading-relaxed">
                  {featured.excerpt}
                </p>
                <p className="mt-6 text-sm tracking-wide uppercase text-gold">
                  Read more &rarr;
                </p>
              </div>
            </div>
          </Link>

          {/* Other posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-cream rounded-2xl overflow-hidden transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_16px_40px_-12px_rgba(201,169,110,0.08)]"
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
                  <h2 className="font-serif text-xl text-soft-black group-hover:text-gold transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <p className="mt-4 text-xs tracking-wide uppercase text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                    Read more &rarr;
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
