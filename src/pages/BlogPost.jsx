import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { getPost, POSTS } from '@/lib/blogPosts';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);

  if (!post) {
    return (
      <div className="font-body min-h-screen bg-white">
        <Navbar />
        <div className="max-w-2xl mx-auto px-6 pt-40 pb-24 text-center">
          <h1 className="font-display text-3xl font-bold text-[#0B0B12]">Post not found</h1>
          <Link to="/" className="mt-6 inline-flex items-center gap-2 text-violet-600 font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="font-body bg-white">
      <Navbar />
      <article className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <Link to="/#blog" className="inline-flex items-center gap-2 text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors">
          <ArrowLeft className="w-4 h-4" /> All guides
        </Link>
        <span className="mt-6 inline-block px-3 py-1 rounded-full bg-violet-500/10 text-[11px] font-semibold text-violet-600">{post.tag}</span>
        <h1 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B0B12] leading-tight">{post.title}</h1>
        <div className="mt-4 flex items-center gap-4 text-xs text-[#0B0B12]/45">
          <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.read} read</span>
          <span>Updated {new Date(post.updated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>

        <div className="mt-8 h-56 sm:h-72 rounded-3xl overflow-hidden relative">
          <Image src={post.image} alt={post.title} className="w-full h-full" fittingType="fill" />
        </div>

        <div className="article-body max-w-none mt-10">
          <ReactMarkdown>{post.body}</ReactMarkdown>
        </div>

        <div className="mt-16 pt-10 border-t border-black/5">
          <h2 className="font-display text-xl font-bold text-[#0B0B12] mb-5">Keep reading</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link key={r.slug} to={`/blog/${r.slug}`} className="group rounded-2xl border border-black/5 overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                <div className="h-24 overflow-hidden relative">
                  <Image src={r.image} alt={r.title} className="w-full h-full" fittingType="fill" />
                </div>
                <div className="p-4">
                  <p className="font-display font-semibold text-sm text-[#0B0B12] leading-snug group-hover:text-violet-600 transition-colors">{r.title}</p>
                  <p className="mt-2 text-[11px] text-[#0B0B12]/45">{r.read} read</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
}