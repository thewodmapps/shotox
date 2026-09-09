import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { Image } from '@/components/ui/image';
import { getPostBySlug, BLOG_POSTS } from '@/lib/blogPosts';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="font-body bg-[#0B0B12] text-white min-h-screen">
        <Navbar />
        <div className="max-w-2xl mx-auto px-6 py-32 text-center">
          <h1 className="font-display text-3xl font-bold">Post not found</h1>
          <Link to="/" className="mt-6 inline-flex items-center gap-2 text-white/70 hover:text-white"><ArrowLeft className="w-4 h-4" /> Back home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const idx = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const next = BLOG_POSTS[(idx + 1) % BLOG_POSTS.length];

  return (
    <div className="font-body bg-white text-[#0B0B12] min-h-screen">
      <Navbar />
      <article className="max-w-2xl mx-auto px-6 pt-32 pb-24">
        <Link to="/#blog" className="inline-flex items-center gap-2 text-sm text-[#0B0B12]/50 hover:text-[#0B0B12] transition-colors"><ArrowLeft className="w-4 h-4" /> All posts</Link>

        <div className="relative mt-8 h-44 sm:h-64 rounded-3xl overflow-hidden">
          <Image src={post.cover} alt={post.title} className="w-full h-full" fittingType="fill" />
          <span className="absolute top-4 left-4 text-[11px] font-semibold uppercase tracking-widest text-white bg-black/30 backdrop-blur px-2.5 py-1 rounded-full">{post.category}</span>
        </div>

        <header className="mt-8">
          <h1 className="font-display font-bold tracking-[-0.02em] leading-[1.05] text-4xl sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-lg text-[#0B0B12]/60 leading-relaxed">{post.excerpt}</p>
          <div className="mt-5 flex items-center gap-3 text-sm text-[#0B0B12]/45">
            <span>{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <div className="article-body mt-10">
          <ReactMarkdown>{post.body}</ReactMarkdown>
        </div>

        <div className="mt-16 pt-8 border-t border-black/10">
          <p className="text-xs uppercase tracking-widest text-[#0B0B12]/40 mb-4">Keep reading</p>
          <Link to={`/blog/${next.slug}`} className="group flex items-center justify-between rounded-2xl bg-[#0B0B12] text-white px-6 py-5 hover:bg-[#0B0B12]/90 transition-colors">
            <span className="font-heading font-semibold">{next.title}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </article>
      <Footer />
    </div>
  );
}