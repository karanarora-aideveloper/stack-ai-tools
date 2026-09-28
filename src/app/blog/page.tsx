import { Metadata } from 'next';
import BlogView from './BlogView';
import { getPrerenderedArticles } from '@/lib/blog';
import ObsidianHeader from '@/app/components/ObsidianHeader';
import ObsidianFooter from '@/app/components/ObsidianFooter';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'AI Tools Blog & Reviews (2026) | Stack AI Tools';
  const canonicalUrl = 'https://www.stackaitools.com/blog';

  return {
    title: { absolute: title },
    description: 'Authoritative research, benchmark tests, and software showdowns comparing the top AI video generators, coding assistants, voice cloners, and autonomous agents in 2026. Independently tested and verified.',
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
      url: canonicalUrl,
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
      canonical: canonicalUrl
    }
  };
}

export default async function BlogPage() {
  const articles = await getPrerenderedArticles();

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Stack AI Tools Intelligence Chronicles',
    description: 'The authoritative research blog and benchmark directory for artificial intelligence software in 2026.',
    url: 'https://www.stackaitools.com/blog',
    author: {
      '@type': 'Organization',
      name: 'Stack AI Tools',
      url: 'https://www.stackaitools.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Stack AI Tools',
      url: 'https://www.stackaitools.com'
    }
  };

  return (
    <div data-redesign-page="true" className="min-h-screen bg-[#040406] text-[#e3e1ec] antialiased selection:bg-[#8b5cf6] selection:text-white relative flex flex-col justify-between">
      <ObsidianHeader activeNav="research" />
      <main className="flex-1 w-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        />
        <BlogView articles={articles} />
      </main>
      <ObsidianFooter />
    </div>
  );
}
