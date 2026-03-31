import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getPost } from "../data";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-cream">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/blog"
            className="text-xs tracking-wide uppercase text-gold hover:text-gold-dark transition-colors"
          >
            &larr; Back to Blog
          </Link>
          <p className="text-xs tracking-[0.3em] uppercase text-gold mt-8 mb-4">
            {post.category}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight text-soft-black">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-neutral-400">{post.date}</p>
          <div className="mt-8 aspect-video relative rounded-xl overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-neutral max-w-none">
            {post.content.map((paragraph, i) => (
              <p
                key={i}
                className="text-neutral-600 leading-relaxed mb-6"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-cream">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl text-soft-black">
            Ready to Learn More?
          </h2>
          <p className="mt-4 text-neutral-500 leading-relaxed">
            Schedule a consultation with Dr. Rhee to discuss how GLP-1 therapy
            can help you achieve your weight management goals.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-gold hover:bg-gold-dark text-white text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-colors"
            >
              Book a Consultation
            </Link>
            <Link
              href="/eligibility"
              className="border border-neutral-300 text-neutral-600 hover:border-gold hover:text-gold text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-colors"
            >
              Check Eligibility
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
