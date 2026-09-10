import { Layout, CheckCircle } from 'lucide-react';

// Lightweight metadata-only preview of the three most recent posts, used by
// the landing page's blog section. Keeping this free of article `content`
// (markdown) ensures the heavy blog bundles (blogPostsExtra/More/More2) are
// only loaded on the lazy /blog and /blog/:slug routes.
export const BLOG_FEATURED = [
  {
    slug: 'best-mobbin-alternatives-2026',
    title: 'Best Mobbin Alternatives to Try in 2026',
    excerpt: 'Mobbin is a design tool widely used by UI/UX designers and product developers to find inspiration for designing apps and websites. However, its curated library has limits. Here are the best alternatives for app design inspiration and screenshot creation.',
    category: 'Design Tools',
    date: 'Sep 8, 2026',
    readTime: '12 minute read',
    color: '#7C3AED',
    icon: Layout,
    keywords: 'mobbin alternatives, app design inspiration, ui design tools 2026',
  },
  {
    slug: 'best-ipad-mockup-generator-tools-2026',
    title: 'Best iPad Mockup Generator Tools in 2026',
    excerpt: 'The best iPad mockup generator tools are AppLaunchpad and Shotox because they offer high-quality iPad mockups, they are easy to use, provide watermark-free exports, and support exact App Store iPad screenshot sizes.',
    category: 'Mockups',
    date: 'Aug 28, 2026',
    readTime: '16 minute read',
    color: '#10B981',
    icon: Layout,
    keywords: 'ipad mockup generator, ipad screenshot tool, app store ipad size',
  },
  {
    slug: 'apple-app-store-rejection-reasons',
    title: 'Apple App Store Rejection Reasons and How to Prevent Them',
    excerpt: 'The most common Apple App Store rejection reasons are app crashes and bugs, privacy violations, metadata violations, and apps lacking minimum functionality. Here is how to prevent each one before you submit.',
    category: 'App Store',
    date: 'Aug 25, 2026',
    readTime: '18 minute read',
    color: '#2563EB',
    icon: CheckCircle,
    keywords: 'app store rejection, apple review guidelines, app rejected',
  },
];