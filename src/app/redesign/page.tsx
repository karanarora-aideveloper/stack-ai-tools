import { Metadata } from 'next';
import { getAllTools, getAllPrompts } from '@/lib/tools';
import RedesignView from './RedesignView';

export const metadata: Metadata = {
  title: 'Stack AI Tools Redesign (2026) | Frontier AI Directory',
  description: 'Explore the modern Obsidian AI Index design system for Stack AI Tools. Hand-vetted frontier models, autonomous agents, and curated prompts.',
  robots: {
    index: false,
    follow: false
  }
};

export default async function RedesignPage() {
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
    featured: t.featured,
    slug: t.slug,
    primaryUseCase: t.primaryUseCase,
    useCases: t.useCases,
    startingPrice: t.startingPrice
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
    <RedesignView 
      initialTools={serializedTools} 
      initialPrompts={serializedPrompts} 
    />
  );
}
