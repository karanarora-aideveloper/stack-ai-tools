import { Metadata } from 'next';
import BlogView from './BlogView';
import { getAllArticles } from '@/lib/blog';

export const metadata: Metadata = {
  title: { absolute: 'AI Tools Blog & Reviews (2026) | Stack AI Tools' },
  description: 'Authoritative research, benchmark tests, and software showdowns comparing the top AI video generators, coding assistants, voice cloners, Claude 3.7 reasoning updates, and autonomous agents in 2026. Curated by Karan Arora.',
  keywords: [
    'best ai tools 2026',
    'claude 3.7 sonnet updates',
    'claude code cli',
    'best ai video generator',
    'claude vs chatgpt coding',
    'cursor vs copilot',
    'ai workflow automation',
    'ai software benchmarks',
    'ai agents review'
  ],
  openGraph: {
    title: 'Frontier AI Blog & Research Guides (10,000+ Guides) | Stack AI Tools',
    description: '10,000+ benchmarked AI guides, Claude updates, model showdowns, and programmatic reviews for US founders and developers.',
    url: 'https://stackaitools.com/blog',
    siteName: 'Stack AI Tools',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Stack AI Tools Blog'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://stackaitools.com/blog'
  }
};

export default async function BlogPage() {
  const articles = await getAllArticles();

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Stack AI Tools Intelligence Chronicles',
    description: 'The authoritative research blog and benchmark directory for artificial intelligence software in 2026.',
    url: 'https://stackaitools.com/blog',
    author: {
      '@type': 'Person',
      name: 'Karan Arora',
      jobTitle: 'Chief AI Architect & Founder',
      url: 'https://stackaitools.com/about'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Stack AI Tools',
      url: 'https://stackaitools.com'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <BlogView articles={articles} />
    </>
  );
}
