import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BlogCard from '@/components/blog/BlogCard';
import { BLOG_POSTS } from '@/lib/blogPosts';
import SectionHeading from './SectionHeading';

export default function BlogSection() {
  const posts = BLOG_POSTS.slice(0, 3);
  return (
    <section id="blog" className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <SectionHeading eyebrow="Blog" title="From the blog" subtitle="ASO insights, screenshot strategies, and growth guides for app makers." />
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7C3AED] hover:gap-2.5 transition-all">
            View all articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}