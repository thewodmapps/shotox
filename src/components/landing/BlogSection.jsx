import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blogPosts';

export default function BlogSection() {
  return (
    <section id="blog" className="bg-[#0B0B12] text-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">From the blog</p>
            <h2 className="font-display font-bold tracking-[-0.03em] text-4xl sm:text-5xl mt-3">Guides to ship better<br /><span className="shotox-gradient-text">app screenshots</span></h2>
          </div>
          <p className="text-sm text-white/50 max-w-sm">Conversion tips, store specs, and design playbooks — written for makers shipping to the App Store & Google Play.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {BLOG_POSTS.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link to={`/blog/${post.slug}`} className="group block h-full rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors">
                <div className={`relative h-36 bg-gradient-to-br ${post.accent} flex items-end p-4`}>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-white/90 bg-black/25 backdrop-blur px-2 py-1 rounded-full">{post.category}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-semibold leading-snug text-white group-hover:text-white/90 line-clamp-2">{post.title}</h3>
                  <p className="mt-2 text-xs text-white/50 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-[11px] text-white/40">
                    <span>{post.readTime}</span>
                    <span className="inline-flex items-center gap-1 text-white/70 group-hover:translate-x-0.5 transition-transform">Read <ArrowRight className="w-3 h-3" /></span>
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