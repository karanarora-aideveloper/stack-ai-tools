import DirectoryView from './components/DirectoryView';
import { Metadata } from 'next';
import { getAllTools, getAllPrompts } from '@/lib/tools';

export const metadata: Metadata = {
  title: 'Stack AI Tools | Curated Directory of 40+ Frontier AI Software & Agents (2026)',
  description: 'Discover the world\'s best artificial intelligence software, autonomous coding agents, generative media models, and tested prompt templates. Updated September 2026.',
  openGraph: {
    title: 'Stack AI Tools | Curated Directory of 40+ Frontier AI Software & Agents (2026)',
    description: 'Explore the definitive expert-curated directory of 2026 AI tools, coding agents, and prompt libraries.',
    url: 'https://stackaitools.com',
    type: 'website',
  }
};

export default async function Home() {
  const [tools, prompts] = await Promise.all([
    getAllTools(),
    getAllPrompts()
  ]);

  const serializedTools = tools.map(t => ({
    id: t.id,
    name: t.name,
    category: t.category,
    icon: t.icon,
    domain: t.domain,
    logoUrl: t.logoUrl,
    description: t.description,
    pricingModel: t.pricingModel,
    priceClass: t.priceClass,
    link: t.link,
    rating: t.rating,
    reviewsCount: t.reviewsCount,
    tags: t.tags || [],
    badge: t.badge,
    featured: t.featured
  }));

  const serializedPrompts = prompts.map(p => ({
    id: p.id,
    title: p.title,
    targetAI: p.targetAI,
    category: p.category,
    prompt: p.prompt,
    outputType: (p.outputType as 'image' | 'code' | 'text') || 'text',
    outputImageUrl: p.outputImageUrl,
    outputPreview: p.outputPreview,
    author: p.author,
    aspectRatio: p.aspectRatio,
    tags: p.tags || []
  }));

  return (
    <main>
      <DirectoryView 
        initialTools={serializedTools} 
        initialPrompts={serializedPrompts} 
      />
    </main>
  );
}

