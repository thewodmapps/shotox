import React, { useState, useEffect } from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import BlogCard from '@/components/blog/BlogCard';
import BlogPagination from '@/components/blog/BlogPagination';
import PullToRefresh from '@/components/PullToRefresh';
import { BLOG_POSTS } from '@/lib/blogPosts';
import { base44 } from '@/api/base44Client';
import { format, parseISO } from 'date-fns';

const PER_PAGE = 9;

// Normalize an entity record into the same shape the static posts use.
const fromEntity = (p) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt || '',
  category: p.category || 'App Marketing',
  date: p.created_date ? format(parseISO(p.created_date), 'MMM d, yyyy') : '',
  readTime: p.read_time || '8 minute read',
  color: p.color || '#7C3AED',
  keywords: p.keywords || '',
  content: p.content || '',
  cover_url: p.cover_url || '',
});

export default function Blog() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState(BLOG_POSTS);

  useEffect(() => {
    document.title = 'Shotox Blog — App Screenshot & ASO Guides';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Explore the Shotox blog for app marketing tips, App Store & Google Play screenshot strategies, ASO insights, UI inspiration, and growth guides.');
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let active = true;
    base44.entities.BlogPost.filter({ published: true }, '-created_date', 200)
      .then((res) => {
        if (!active) return;
        const items = Array.isArray(res) ? res : res.items || [];
        const dynamic = items.map(fromEntity);
        // Merge dynamic posts first (newest), then static; drop any slug collisions.
        const seen = new Set(dynamic.map((p) => p.slug));
        const staticUnique = BLOG_POSTS.filter((p) => !seen.has(p.slug));
        setPosts([...dynamic, ...staticUnique]);
      })
      .catch(() => { /* entity read optional — static posts still render */ });
    return () => { active = false; };
  }, []);

  const totalPages = Math.ceil(posts.length / PER_PAGE);
  const visible = posts.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const refresh = async () => {
    setPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    await new Promise((r) => setTimeout(r, 500));
  };

  return (
    <div className="font-body bg-white">
      <PullToRefresh onRefresh={refresh} tone="light" />
      <Navbar />
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display font-bold tracking-[-0.03em] text-[#111827] text-4xl sm:text-5xl">Shotox Blog</h1>
          <p className="mt-5 text-[#6b7280] text-lg leading-relaxed">
            Explore the Shotox blog for app marketing tips, App Store & Google Play screenshot strategies, ASO insights, UI inspiration, and growth guides.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="sr-only">All articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
          <BlogPagination page={page} totalPages={totalPages} onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
        </div>
      </section>

      <Footer />
    </div>
  );
}