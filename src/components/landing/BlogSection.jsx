import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { BLOG_POSTS } from '@/lib/blogPosts';

export default function BlogSection() {
  return (
    <section id="blog" className="relative bg-[#FAFAFC] text-[#0B0B12] py-28 px-6 overflow-hidden">
      <div className="absolute -top-24 right-0 w-[460px] h-[460px] rounded-full bg-violet-400/15 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-10 w-[420px] h-[420px] rounded-full bg-pink-400/15 blur-[120px] pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-14">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold">From the blog</span>
            <h2 className="font-display font-bold tracking-[-0.02em] leading-[1.05] text-4xl sm:text-5xl mt-5 text-[#0B0B12]">Guides to ship better<br /><span className="shotox-gradient-text">app screenshots</span></h2>
          </div>
          <p className="text-sm text-[#0B0B12]/55 max-w-sm">Conversion tips, store specs, and design playbooks — written for makers shipping to the App Store &amp; Google Play.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BLOG_POSTS.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={`/blog/${post.slug}`} className="group block h-full rounded-2xl overflow-hidden bg-white border border-black/[0.06] hover:border-violet-300 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_24px_70px_-24px_rgba(124,58,237,0.35)]">
                <div className="relative h-44 overflow-hidden">
                  <Image src={post.cover} alt={post.title} className="w-full h-full" fittingType="fill" />
                  <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-widest text-white bg-black/30 backdrop-blur px-2 py-1 rounded-full">{post.category}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-semibold leading-snug text-[#0B0B12] line-clamp-2">{post.title}</h3>
                  <p className="mt-2 text-xs text-[#0B0B12]/55 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-[11px] text-[#0B0B12]/40">
                    <span>{post.readTime}</span>
                    <span className="inline-flex items-center gap-1 text-violet-600 group-hover:translate-x-0.5 transition-transform">Read <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}