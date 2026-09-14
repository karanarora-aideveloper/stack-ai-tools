import DirectoryView from './components/DirectoryView';
import VibeCoderQuiz from './components/VibeCoderQuiz';
import { Metadata } from 'next';
import { getAllTools, getAllPrompts } from '@/lib/tools';
import { Zap, Cpu } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: { absolute: 'Stack AI Tools | 200+ AI Tools & Prompts Directory (2026)' },
  description: 'Discover the world\'s best artificial intelligence software, autonomous coding agents, generative media models, and tested prompt templates. Updated September 2026.',
  openGraph: {
    title: 'Stack AI Tools | 200+ AI Tools & Prompts Directory (2026)',
    description: 'Explore the definitive expert-curated directory of 2026 AI tools, coding agents, and prompt libraries.',
    url: 'https://www.stackaitools.com',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.stackaitools.com',
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
    featured: t.featured,
    primaryUseCase: t.primaryUseCase,
    useCases: t.useCases,
    complexity: t.complexity,
    idealFor: t.idealFor,
    architectureStack: t.architectureStack
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
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-[0.03] grayscale"></div>
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-7xl">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 text-sm font-medium text-zinc-300">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              Updated for {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Discover & Compare <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                Frontier AI Tools
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              The internet's most trusted directory for AI software, autonomous coding agents, and system prompts. Hand-vetted for founders, engineers, and creators.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a href="#directory" className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
                Explore Directory <Zap className="w-5 h-5" />
              </a>
              <Link href="/antigravity-mcp" className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white font-semibold rounded-full hover:bg-zinc-800 border border-zinc-800 transition-colors flex items-center justify-center gap-2">
                View MCP Servers <Cpu className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center text-zinc-500 border-t border-zinc-900/50 mt-12">
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl font-bold text-white">200+</span>
                <span className="text-sm font-medium uppercase tracking-wider">Vetted Tools</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl font-bold text-white">45+</span>
                <span className="text-sm font-medium uppercase tracking-wider">Pro Prompts</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl font-bold text-white">30+</span>
                <span className="text-sm font-medium uppercase tracking-wider">MCP Servers</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl font-bold text-white">10k+</span>
                <span className="text-sm font-medium uppercase tracking-wider">Engineers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container px-4 md:px-6 mx-auto max-w-7xl py-12">
        <VibeCoderQuiz />
      </div>

      {/* Directory Section */}
      <section id="directory" className="py-16 md:py-24 border-t border-zinc-900 bg-zinc-950/50">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <DirectoryView 
            initialTools={serializedTools} 
            initialPrompts={serializedPrompts} 
          />
        </div>
      </section>
    </div>
  );
}
