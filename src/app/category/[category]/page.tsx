import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getToolsByCategory, getAllCategories } from '@/lib/tools';
import ToolLogo from '@/app/components/ToolLogo';
import ObsidianHeader from '@/app/components/ObsidianHeader';
import ObsidianFooter from '@/app/components/ObsidianFooter';
import { 
  Star, 
  ChevronRight, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({
    category: cat.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const capitalized = category.charAt(0).toUpperCase() + category.slice(1);
  const title = `Best AI ${capitalized} Tools (2026): Vetted & Ranked`;
  const description = `Explore top-rated AI ${capitalized.toLowerCase()} software, autonomous agents, and frontier models. Compare verified ratings, pricing tiers, pros & cons, and free access.`;

  return {
    title: { absolute: `${title} | Stack AI Tools` },
    description,
    openGraph: {
      title,
      description,
      url: `https://www.stackaitools.com/category/${category.toLowerCase()}`,
      type: 'website'
    },
    alternates: {
      canonical: `https://www.stackaitools.com/category/${category.toLowerCase()}`
    }
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const tools = await getToolsByCategory(category);
  const allCategories = await getAllCategories();

  if (!tools || tools.length === 0) {
    notFound();
  }

  const categoryName = tools[0].category;
  const freeToolsCount = tools.filter(t => t.priceClass === 'free' || t.priceClass === 'freemium').length;

  const categoryDescriptions: Record<string, string> = {
    code: 'Frontier AI coding assistants, autonomous software engineering agents, and terminal copilots benchmarked for zero-shot accuracy, latency, and full-stack repo execution.',
    writing: 'Next-generation copywriters, research summarizers, and long-form editorial agents engineered to accelerate high-volume publishing and marketing workflows.',
    design: 'Generative UI builders, vector design studios, and neural concept rendering engines designed to turn natural language into production-ready design systems.',
    video: 'AI video generators, hyper-realistic avatar actors, and automatic viral repurposing engines transforming text into studio-grade media.',
    audio: 'State-of-the-art voice synthesis, vocal stem isolation, and full-length broadcast music generation platforms for creators and developers.',
    automation: 'Self-hosted and cloud workflow automation platforms powered by autonomous agent reasoning and multi-tool orchestration.',
    marketing: 'Autonomous growth agents, SEO intelligence, and outbound campaign generators built to maximize customer acquisition and MRR.',
    business: 'Enterprise AI assistants, meeting intelligence engines, and automated contract analyzers streamlining operations.'
  };

  const faqs = [
    {
      question: `What is the best AI software for ${categoryName.toLowerCase()} in 2026?`,
      answer: `Based on verified benchmark evaluations and user reviews, ${tools[0].name} leads the ${categoryName} category with an outstanding ${tools[0].rating}/5.0 score across ${tools[0].reviewsCount.toLocaleString()} verified user reviews.`
    },
    {
      question: `Which AI ${categoryName.toLowerCase()} tools offer free tiers?`,
      answer: `There are ${freeToolsCount} tools in this category offering free tiers or free trials, including ${tools.filter(t => t.priceClass === 'free' || t.priceClass === 'freemium').map(t => t.name).slice(0, 4).join(', ')}.`
    },
    {
      question: `How are ${categoryName.toLowerCase()} tools evaluated and verified?`,
      answer: `The Stack AI Tools research team evaluates tools across 4 core criteria: model intelligence & reasoning accuracy, API/execution latency, pricing honesty (no hidden charges), and enterprise security compliance.`
    },
    {
      question: `Can I submit a new ${categoryName.toLowerCase()} AI tool to this directory?`,
      answer: `Yes! Creators and founders can submit tools via our public submission portal at /submit for editorial vetting and listing inclusion.`
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
        name: 'Categories',
        item: 'https://www.stackaitools.com/categories'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: categoryName,
        item: `https://www.stackaitools.com/category/${category.toLowerCase()}`
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
      <ObsidianHeader activeNav="categories" />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
        <nav className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/70 border border-white/10 text-xs text-zinc-400 font-mono" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={12} className="text-zinc-600" />
          <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
          <ChevronRight size={12} className="text-zinc-600" />
          <span className="text-violet-400 font-medium">{categoryName}</span>
        </nav>
      </div>

      {/* Hero Banner */}
      <header className="pt-10 pb-8 px-4 md:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900/90 border border-violet-500/30 text-xs text-zinc-300 mb-6 shadow-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="tracking-wide uppercase font-mono text-[11px] text-zinc-400">CURATED 2026 LEADERBOARD</span>
          <span className="text-zinc-600">•</span>
          <span className="text-violet-400 font-medium">{tools.length} VETTED TOOLS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-5 font-['Geist',sans-serif] leading-[1.12]">
          Top AI {categoryName} Software &{' '}
          <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
            Autonomous Agents
          </span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light mb-8">
          {categoryDescriptions[category.toLowerCase()] || `Explore ${tools.length} hand-vetted ${categoryName.toLowerCase()} solutions benchmarked for zero-shot accuracy, latency, and production integration.`}
        </p>

        {/* 3-Stat Metric Bar */}
        <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto mb-10 p-2 rounded-xl bg-zinc-950/60 border border-white/10 backdrop-blur-md">
          <div className="text-center py-2 px-3">
            <div className="text-xl font-bold text-white font-['Geist',sans-serif]">{tools.length}</div>
            <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">Vetted Tools</div>
          </div>
          <div className="text-center py-2 px-3 border-x border-white/10">
            <div className="text-xl font-bold text-emerald-400 font-['Geist',sans-serif]">{freeToolsCount}</div>
            <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">Free Tiers</div>
          </div>
          <div className="text-center py-2 px-3 flex flex-col items-center justify-center">
            <div className="text-xl font-bold text-violet-400 font-['Geist',sans-serif] flex items-center gap-1">
              <ShieldCheck size={18} className="text-emerald-400" />
              <span>100%</span>
            </div>
            <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">Audit Pass</div>
          </div>
        </div>

        {/* Quick Category Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-1 max-w-4xl mx-auto justify-start sm:justify-center">
          {allCategories.map((cat) => {
            const isActive = cat.toLowerCase() === category.toLowerCase();
            return (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase()}`}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 border ${
                  isActive
                    ? 'bg-violet-600 text-white border-violet-400/50 shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border-white/10'
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </header>

      {/* Tools Grid */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div 
              key={tool.id} 
              className="obsidian-card rounded-2xl p-6 flex flex-col justify-between border border-white/[0.08] hover:border-violet-500/40 transition-all duration-200 group"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 p-1 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <ToolLogo 
                        name={tool.name}
                        domain={tool.domain}
                        logoUrl={tool.logoUrl}
                        icon={tool.icon}
                        size={38}
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white group-hover:text-violet-300 transition-colors font-['Geist',sans-serif] leading-tight">
                        <Link href={`/tool/${tool.slug}`}>
                          {tool.name}
                        </Link>
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-400">
                          {tool.category}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          tool.priceClass === 'free' 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' 
                            : tool.priceClass === 'freemium'
                            ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25'
                            : 'bg-zinc-800 text-zinc-300 border-white/10'
                        }`}>
                          {tool.pricingModel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-900/80 border border-white/10 text-xs font-mono shrink-0">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-white font-semibold">{tool.rating.toFixed(1)}</span>
                    <span className="text-zinc-500 text-[10px]">({tool.reviewsCount.toLocaleString()})</span>
                  </div>
                </div>

                {/* Editorial / Zapier Pill if available */}
                {tool.zapierVerdict && (
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-300/90 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md mb-3">
                    <ShieldCheck size={12} className="text-amber-400" />
                    <span>Zapier & Editorial Verified</span>
                  </div>
                )}

                {/* Description */}
                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-4 font-light">
                  {tool.description}
                </p>

                {/* Tags List */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {tool.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900/80 border border-white/10 text-zinc-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <Link 
                    href={`/tool/${tool.slug}`} 
                    className="flex-1 py-2 px-3 text-center text-xs font-medium rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-colors"
                  >
                    In-depth Review
                  </Link>
                  <a 
                    href={tool.link.startsWith('http') ? `/go/${tool.slug}` : tool.link} 
                    target="_blank" 
                    rel="sponsored nofollow noopener"
                    className="flex-1 py-2 px-3 text-center text-xs font-medium rounded-lg bg-white text-zinc-950 hover:bg-zinc-100 transition-all flex items-center justify-center gap-1 shadow-[0_0_12px_rgba(255,255,255,0.15)] active:scale-95"
                  >
                    <span>Try Free</span>
                    <ArrowRight size={13} />
                  </a>
                </div>

                <div className="text-center pt-1">
                  <Link 
                    href={`/alternatives/${tool.slug}`} 
                    className="text-[11px] text-zinc-500 hover:text-violet-300 transition-colors inline-flex items-center gap-1 font-mono"
                  >
                    <span>Top Alternatives to {tool.name.split(' ')[0]}</span>
                    <ChevronRight size={11} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FAQ & Buying Guide */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        <div className="obsidian-card rounded-3xl p-8 md:p-10 border border-white/10">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
              <HelpCircle size={18} />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight font-['Geist',sans-serif]">
              Frequently Asked Questions: {categoryName} AI Software
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
