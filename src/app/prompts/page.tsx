import { Metadata } from 'next';
import { getAllPrompts } from '@/lib/tools';
import PromptsExplorer from './PromptsExplorer';
import { BookOpen, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Curated AI Prompts Library (2026) | Midjourney, Claude & GPT-5',
  description: 'Explore the definitive prompt engineering library. Battle-tested prompts for Midjourney v8 photorealism, Cursor 3.0 coding agents, Claude Sonnet 5, and ChatGPT.',
  openGraph: {
    title: 'Curated AI Prompts Library (2026) | Stack AI Tools',
    description: 'Battle-tested prompts for Midjourney, Cursor, Claude, and GPT-5.',
    url: 'https://stackaitools.com/prompts',
  }
};

export default async function PromptsPage() {
  const prompts = await getAllPrompts();

  const serializedPrompts = prompts.map(p => ({
    id: p.id,
    title: p.title,
    targetAI: p.targetAI,
    category: p.category,
    prompt: p.prompt,
    outputType: p.outputType,
    outputImageUrl: p.outputImageUrl,
    outputPreview: p.outputPreview,
    author: p.author,
    aspectRatio: p.aspectRatio,
    tags: p.tags || []
  }));

  return (
    <div>
      <div className="page-header" style={{ marginBottom: 40 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#ec4899', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
          <Sparkles size={16} />
          <span>Interactive Prompt Engineering Vault</span>
        </div>
        <h1 className="page-title">
          Curated Frontier AI Prompts Library
        </h1>
        <p className="page-subtitle">
          Copy-paste production-ready prompts tested across Midjourney v8.2, Cursor 3.0, Claude Sonnet 5, and GPT-5.6 with real live output previews.
        </p>
      </div>

      <PromptsExplorer initialPrompts={serializedPrompts} />
    </div>
  );
}
