import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "./data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Expert insights on GLP-1 medications, medical weight management, and sustainable weight loss from Dr. Libby Rhee.",
};

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
            Insights & Education
          </p>
          <h1 className="font-serif text-5xl md:text-6xl leading-tight text-soft-black">
            The <span className="text-gold">Blog</span>
          </h1>
          <p className="mt-6 text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Expert insights on GLP-1 medications, weight management science,
            and living your healthiest life.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-cream rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-warm flex items-center justify-center">
                  <p className="text-neutral-400 text-xs tracking-wide uppercase">
                    {post.category}
                  </p>
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
                    Read More &rarr;
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
