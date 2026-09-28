import { Metadata } from 'next';
import Link from 'next/link';
import { getAllTools, getAlternativesForTool } from '@/lib/tools';
import ObsidianHeader from '@/app/components/ObsidianHeader';
import ObsidianFooter from '@/app/components/ObsidianFooter';
import AlternativesExplorer, { AlternativeCardData } from './AlternativesExplorer';
import { 
  GitCompare, 
  ChevronRight, 
  ShieldCheck, 
  HelpCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Top AI Tool Alternatives & Competitor Comparisons (2026)',
  description: 'Explore side-by-side comparisons of the world\'s top AI tools. Find cheaper, faster, and open-source alternatives to Midjourney, Cursor, ChatGPT, ElevenLabs, and more.',
  openGraph: {
    title: 'Top AI Tool Alternatives (2026) | Stack AI Tools',
    description: 'Find top-rated alternatives to popular AI tools, autonomous agents, and software.',
    url: 'https://www.stackaitools.com/alternatives',
    type: 'website'
  },
  alternates: {
    canonical: 'https://www.stackaitools.com/alternatives',
  }
};

export const revalidate = 3600;

export default async function AlternativesHub() {
  const tools = await getAllTools();
  
  // High-intent tools that users frequently search alternatives for
  const prioritySlugs = [
    'cursor',
    'windsurf',
    'github-copilot',
    'devin',
    'aider',
    'midjourney',
    'flux-1',
    'stable-diffusion-4',
    'chatgpt',
    'claude-3-7-sonnet',
    'deepseek-r1',
    'elevenlabs',
    'suno',
    'udio',
    'jasper-ai',
    'copy-ai',
    'descript',
    'heygen',
    'synthesia',
    'notion-ai',
    'make',
    'runway',
    'pika',
    'luma-dream-machine',
    'lovable',
    'bolt-new',
    'v0-by-vercel',
    'replit-agent',
    'perplexity-ai',
    'fireflies-ai'
  ];

  // Match priority tools first, then sort by review count
  const priorityTools = tools.filter(t => prioritySlugs.includes(t.slug));
  const remainingTools = tools
    .filter(t => !prioritySlugs.includes(t.slug))
    .sort((a, b) => b.reviewsCount - a.reviewsCount);

  const selectedTools = [...priorityTools, ...remainingTools].slice(0, 24);

  const toolWithAlts: AlternativeCardData[] = await Promise.all(
    selectedTools.map(async (tool) => {
      const alts = await getAlternativesForTool(tool.slug, 3);
      return {
        tool: {
          id: tool.id,
          name: tool.name,
          slug: tool.slug,
          category: tool.category,
          domain: tool.domain,
          logoUrl: tool.logoUrl,
          icon: tool.icon,
          pricingModel: tool.pricingModel,
          priceClass: tool.priceClass,
          rating: tool.rating,
          reviewsCount: tool.reviewsCount,
          description: tool.description
        },
        alts: alts.map(alt => ({
          id: alt.id,
          name: alt.name,
          slug: alt.slug,
          category: alt.category,
          domain: alt.domain,
          logoUrl: alt.logoUrl,
          icon: alt.icon,
          pricingModel: alt.pricingModel,
          priceClass: alt.priceClass,
          rating: alt.rating
        }))
      };
    })
  );

  const faqs = [
    {
      question: 'How are alternative AI tools evaluated and ranked?',
      answer: 'Our research team evaluates alternatives based on core workflow overlap, benchmark accuracy (e.g. SWE-bench for coding assistants, photorealism fidelity for image engines), pricing honesty, and active community review sentiment.'
    },
    {
      question: 'Can I find open-source or self-hosted alternatives?',
      answer: 'Yes! Many alternatives in our index—such as Aider, n8n, Stable Diffusion, and DeepSeek-R1—offer open-source licenses or self-hostable deployments that eliminate vendor lock-in.'
    },
    {
      question: 'Are free tiers or trials available for these competitors?',
      answer: 'Over 85% of featured alternatives offer generous free access tiers or credit-based trials so engineering and creative teams can benchmark performance before committing to a paid subscription.'
    },
    {
      question: 'How often are pricing tiers and benchmark scores updated?',
      answer: 'Our automated crawler and editorial staff verify pricing structures, model upgrades, and user review counts weekly across all listed software.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

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
        name: 'Alternatives',
        item: 'https://www.stackaitools.com/alternatives'
      }
    ]
  };

  return (
    <div data-redesign-page="true" className="min-h-screen bg-[#040406] text-[#e3e1ec] antialiased selection:bg-[#8b5cf6] selection:text-white relative">
      {/* Schema.org Injections */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Atmospheric Ambient Glow Mesh */}
      <div className="obsidian-glow-mesh fixed inset-x-0 top-0 h-[700px] pointer-events-none -z-10" />

      {/* Shared Obsidian Luxury Header */}
      <ObsidianHeader activeNav="alternatives" />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
        <nav className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/70 border border-white/10 text-xs text-zinc-400 font-mono" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={12} className="text-zinc-600" />
          <span className="text-violet-400 font-medium">Alternatives & Competitors</span>
        </nav>
      </div>

      {/* Hero Header Section */}
      <header className="pt-10 pb-8 px-4 md:px-8 max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900/90 border border-violet-500/30 text-xs text-zinc-300 mb-6 shadow-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="tracking-wide uppercase font-mono text-[11px] text-zinc-400">HEAD-TO-HEAD BENCHMARKS</span>
          <span className="text-zinc-600">•</span>
          <span className="text-violet-400 font-medium">{toolWithAlts.length}+ VETTED COMPARISONS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-5 font-['Geist',sans-serif] leading-[1.12]">
          Top AI Tool Alternatives &{' '}
          <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
            Competitor Guide
          </span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light mb-10">
          Compare pricing tiers, zero-shot benchmarks, and free tier limitations across leading frontier AI software. Find the exact replacement matching your budget and workflow.
        </p>

        {/* 4-Stat Metric Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto p-2 rounded-xl bg-zinc-950/60 border border-white/10 backdrop-blur-md">
          <div className="text-center py-2 px-3">
            <div className="text-xl font-bold text-white font-['Geist',sans-serif]">{toolWithAlts.length}+</div>
            <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">Comparison Hubs</div>
          </div>
          <div className="text-center py-2 px-3 sm:border-l border-white/10">
            <div className="text-xl font-bold text-violet-400 font-['Geist',sans-serif]">100%</div>
            <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">Vetted Replacements</div>
          </div>
          <div className="text-center py-2 px-3 sm:border-l border-white/10">
            <div className="text-xl font-bold text-emerald-400 font-['Geist',sans-serif]">0%</div>
            <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">Pay-to-Rank Bias</div>
          </div>
          <div className="text-center py-2 px-3 sm:border-l border-white/10 flex flex-col items-center justify-center">
            <div className="text-xl font-bold text-cyan-400 font-['Geist',sans-serif] flex items-center gap-1">
              <ShieldCheck size={18} className="text-emerald-400" />
              <span>2026</span>
            </div>
            <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">Audit Verified</div>
          </div>
        </div>
      </header>

      {/* Main Interactive Alternatives Explorer */}
      <main className="relative z-10">
        <AlternativesExplorer items={toolWithAlts} />
      </main>

      {/* FAQ & Buying Guide */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-16 relative z-10">
        <div className="obsidian-card rounded-3xl p-8 md:p-10 border border-white/10">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
              <HelpCircle size={18} />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight font-['Geist',sans-serif]">
              Frequently Asked Questions: AI Competitor Benchmarks
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-zinc-950/60 border border-white/[0.08]">
                <h3 className="text-sm sm:text-base font-semibold text-zinc-200 mb-2 font-['Geist',sans-serif]">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shared Obsidian Luxury Footer */}
      <ObsidianFooter />
    </div>
  );
}
