import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BlogCover from './BlogCover';

export default function BlogCard({ post, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.08 }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group block bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300"
      >
        <BlogCover color={post.color} icon={post.icon} title={post.title} />
        <div className="p-5">
          <div className="flex items-center justify-between text-xs text-[#6b7280]">
            <span className="font-medium">{post.category}</span>
            <time>{post.date}</time>
          </div>
          <h3 className="mt-2.5 text-[#111827] font-bold text-lg leading-snug group-hover:text-[#7C3AED] transition-colors">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-[#4b5563] leading-relaxed line-clamp-3">{post.excerpt}</p>
          <div className="mt-4 flex items-center justify-between text-xs text-[#6b7280]">
            <span>{post.readTime}</span>
            <span className="font-semibold text-[#7C3AED] group-hover:translate-x-1 transition-transform">Read →</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}