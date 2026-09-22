import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import BlogCover from '@/components/blog/BlogCover';
import BlogCard from '@/components/blog/BlogCard';
import { getPostBySlug, getRelatedPosts, BLOG_POSTS } from '@/lib/blogPosts';
import { base44 } from '@/api/base44Client';
import { format, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const staticPost = getPostBySlug(slug);
  const [post, setPost] = useState(staticPost || null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let active = true;
    setChecked(false);
    base44.entities.BlogPost.filter({ slug, published: true }, '-created_date', 1)
      .then((res) => {
        if (!active) return;
        const items = Array.isArray(res) ? res : res.items || [];
        if (items.length) {
          const p = items[0];
          setPost({
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
        } else {
          setPost(staticPost || null);
        }
      })
      .catch(() => { if (active) setPost(staticPost || null); })
      .finally(() => { if (active) setChecked(true); });
    return () => { active = false; };
  }, [slug]);

  const notFound = checked && !post;

  useEffect(() => {
    if (notFound) {
      document.title = 'Post Not Found — Shotox';
      return;
    }
    if (!post) return;
    document.title = `${post.title} — Shotox Blog`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', post.excerpt);
    const kw = document.querySelector('meta[name="keywords"]');
    if (kw) kw.setAttribute('content', post.keywords);
    let ld = document.getElementById('post-jsonld');
    if (!ld) {
      ld = document.createElement('script');
      ld.id = 'post-jsonld';
      ld.type = 'application/ld+json';
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      author: { '@type': 'Organization', name: 'Shotox' },
      publisher: { '@type': 'Organization', name: 'Shotox' },
      keywords: post.keywords,
      mainEntityOfPage: { '@type': 'WebPage', '@id': window.location.href },
    });
    window.scrollTo(0, 0);
  }, [post, notFound]);

  if (notFound) {
    return (
      <div className="font-body bg-white min-h-screen">
        <Navbar />
        <div className="pt-40 pb-24 text-center px-6">
          <h1 className="text-3xl font-bold text-[#111827]">Post not found</h1>
          <Button asChild className="mt-6 rounded-xl bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white">
            <Link to="/blog">Back to blog</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) return null;
  const related = getRelatedPosts(slug, 3).filter((p) => p.slug !== post.slug).slice(0, 3);
  const relatedFallback = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const relatedPosts = related.length ? related : relatedFallback;

  return (
    <div className="font-body bg-white">
      <Navbar />
      <article className="pt-28 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => navigate('/blog')} className="inline-flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-[#7C3AED] transition-colors mb-6 selectable-text">
            <ArrowLeft className="w-4 h-4" /> All posts
          </button>

          <div className="flex items-center gap-3 text-xs text-[#6b7280] mb-3">
            <span className="font-medium text-[#7C3AED]">{post.category}</span>
            <span>·</span>
            <time>{post.date}</time>
            <span>·</span>
            <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
          </div>

          <h1 className="font-display font-bold tracking-[-0.03em] text-[#111827] text-3xl sm:text-5xl leading-tight">{post.title}</h1>
          <p className="mt-4 text-lg text-[#6b7280] leading-relaxed">{post.excerpt}</p>

          <div className="mt-8 rounded-2xl overflow-hidden border border-[#e5e7eb]">
            <BlogCover color={post.color} icon={post.icon} title={post.title} coverUrl={post.cover_url} />
          </div>

          <div className="article-body mt-10 selectable-text">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          <div className="mt-12 pt-8 border-t border-[#e5e7eb] flex items-center justify-between">
            <Button asChild className="rounded-xl bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white">
              <Link to="/projects">Try Shotox free <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
            <Link to="/blog" className="text-sm text-[#6b7280] hover:text-[#7C3AED] transition-colors">More articles →</Link>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="px-6 pb-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display font-bold text-[#111827] text-2xl mb-6">Keep reading</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((p, i) => (
                <BlogCard key={p.slug} post={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}