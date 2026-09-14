import { Metadata } from 'next';
import BlogView from './BlogView';
import { getAllArticles } from '@/lib/blog';

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    q?: string;
  }>;
}

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const { page, category } = (await searchParams) || {};
  const pageNum = parseInt(page || '1', 10) || 1;
  const catParam = category && category !== 'all' ? category.toLowerCase() : null;

  let title = 'AI Tools Blog & Reviews (2026) | Stack AI Tools';
  if (catParam) {
    const formattedCat = catParam.charAt(0).toUpperCase() + catParam.slice(1);
    title = `${formattedCat} AI Guides & Reviews (2026) | Stack AI Tools`;
  }
  if (pageNum > 1) {
    title = `${title} - Page ${pageNum}`;
  }

  const queryParams = new URLSearchParams();
  if (catParam) queryParams.set('category', catParam);
  if (pageNum > 1) queryParams.set('page', String(pageNum));
  const queryString = queryParams.toString();

  const canonicalUrl = queryString
    ? `https://www.stackaitools.com/blog?${queryString}`
    : 'https://www.stackaitools.com/blog';

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

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page, category, q } = (await searchParams) || {};
  const initialPage = Math.max(1, parseInt(page || '1', 10) || 1);
  const initialCategory = category || 'all';
  const initialQuery = q || '';

  const articles = await getAllArticles();

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <BlogView 
        articles={articles} 
        initialPage={initialPage}
        initialCategory={initialCategory}
        initialQuery={initialQuery}
      />
    </>
  );
}
