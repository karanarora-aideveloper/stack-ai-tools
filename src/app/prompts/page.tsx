import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPrompts } from '@/lib/tools';
import PromptsExplorer from './PromptsExplorer';
import ObsidianHeader from '@/app/components/ObsidianHeader';
import ObsidianFooter from '@/app/components/ObsidianFooter';
import { Sparkles, Terminal, ChevronRight, CheckCircle2, Zap, ShieldCheck, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'AI Prompts Library (2026) | Stack AI Tools' },
  description: 'Explore 37+ production-grade prompts for Midjourney v8 photorealism, Flux.1 Schnell, Cursor 3.1 autonomous coding, and Claude Sonnet 5 with live output previews.',
  openGraph: {
    title: 'AI Prompts Library (2026) | Stack AI Tools',
    description: 'Battle-tested prompts for Midjourney v8, Flux.1, Cursor 3.1, Claude, and GPT-5.',
    url: 'https://www.stackaitools.com/prompts',
  },
  alternates: {
    canonical: 'https://www.stackaitools.com/prompts',
  }
};

export const revalidate = 3600;

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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.stackaitools.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Prompts Library',
        item: 'https://www.stackaitools.com/prompts'
      }
    ]
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Frontier AI Prompts Library (2026)',
    description: 'Curated collection of battle-tested prompts for coding agents, image generation, and Model Context Protocol servers.',
    numberOfItems: serializedPrompts.length,
    itemListElement: serializedPrompts.map((p, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: p.title,
      description: p.prompt.slice(0, 150)
    }))
  };

  return (
    <div data-redesign-page="true" className="min-h-screen bg-[#040406] text-[#e3e1ec] antialiased selection:bg-[#8b5cf6] selection:text-white relative">
      {/* Schema.org Injections */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Atmospheric Ambient Glow Mesh */}
      <div className="obsidian-glow-mesh fixed inset-x-0 top-0 h-[700px] pointer-events-none -z-10" />

      {/* Shared Obsidian Luxury Header */}
      <ObsidianHeader activeNav="prompts" />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
        <nav className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/70 border border-white/10 text-xs text-zinc-400 font-mono" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={12} className="text-zinc-600" />
          <span className="text-violet-400 font-medium">Prompts Library</span>
        </nav>
      </div>

      {/* Hero Header Section */}
      <header className="pt-10 pb-8 px-4 md:px-8 max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900/90 border border-violet-500/30 text-xs text-zinc-300 mb-6 shadow-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
          <span className="tracking-wide uppercase font-mono text-[11px] text-zinc-400">PROMPT VAULT</span>
          <span className="text-zinc-600">•</span>
          <span className="text-pink-400 font-medium">{serializedPrompts.length}+ TESTED TEMPLATES</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-5 font-['Geist',sans-serif] leading-[1.12]">
          Curated Frontier AI{' '}
          <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
            Prompts Library
          </span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light mb-10">
          Battle-tested prompts engineered for <strong className="text-zinc-200">Gmail MCP</strong>, <strong className="text-zinc-200">GitHub MCP</strong>, <strong className="text-zinc-200">PostgreSQL</strong>, Midjourney v8, Flux.1, and Cursor 3.1 agents. Includes verified outputs, executable MCP config JSON, and one-click copy.
        </p>

        {/* 4-Stat Metric Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto p-2 rounded-xl bg-zinc-950/60 border border-white/10 backdrop-blur-md">
          <div className="text-center py-2 px-3">
            <div className="text-xl font-bold text-white font-['Geist',sans-serif]">{serializedPrompts.length}+</div>
            <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">Vetted Prompts</div>
          </div>
          <div className="text-center py-2 px-3 sm:border-l border-white/10">
            <div className="text-xl font-bold text-violet-400 font-['Geist',sans-serif]">8 Top</div>
            <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">MCP Servers</div>
          </div>
          <div className="text-center py-2 px-3 sm:border-l border-white/10">
            <div className="text-xl font-bold text-pink-400 font-['Geist',sans-serif]">100%</div>
            <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">Verified Outputs</div>
          </div>
          <div className="text-center py-2 px-3 sm:border-l border-white/10 flex flex-col items-center justify-center">
            <div className="text-xl font-bold text-emerald-400 font-['Geist',sans-serif] flex items-center gap-1">
              <Zap size={17} className="text-emerald-400" />
              <span>1-Click</span>
            </div>
            <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">Instant Copy</div>
          </div>
        </div>
      </header>

      {/* Main Interactive Prompts Explorer */}
      <main className="relative z-10">
        <PromptsExplorer initialPrompts={serializedPrompts} />
      </main>

      {/* Prompt Engineering Quickstart Guide */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-16 relative z-10">
        <div className="obsidian-card rounded-3xl p-8 md:p-10 border border-white/10">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/25 flex items-center justify-center text-pink-400">
              <Sparkles size={18} />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight font-['Geist',sans-serif]">
              Engineering Directives for Autonomous Models (2026)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-zinc-950/60 border border-white/[0.08]">
              <div className="text-xs font-mono font-bold text-pink-400 mb-2">01. CONTEXT FIRST</div>
              <h3 className="text-sm font-semibold text-zinc-200 mb-2 font-['Geist',sans-serif]">Ground with Real Data</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Give coding models exact file schemas, endpoint URLs, and interface definitions rather than abstract explanations.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-zinc-950/60 border border-white/[0.08]">
              <div className="text-xs font-mono font-bold text-violet-400 mb-2">02. TOOL BINDINGS</div>
              <h3 className="text-sm font-semibold text-zinc-200 mb-2 font-['Geist',sans-serif]">Explicit MCP Schema</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                When targeting agents with MCP servers, specify parameter types and error handling expectations in system prompts.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-zinc-950/60 border border-white/[0.08]">
              <div className="text-xs font-mono font-bold text-emerald-400 mb-2">03. REASONING LIMITS</div>
              <h3 className="text-sm font-semibold text-zinc-200 mb-2 font-['Geist',sans-serif]">Negative Constraints</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                For photorealism engines like Midjourney v8 and Flux.1, negative weighting prevents plastic skin, synthetic text, and blur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Obsidian Luxury Footer */}
      <ObsidianFooter />
    </div>
  );
}
