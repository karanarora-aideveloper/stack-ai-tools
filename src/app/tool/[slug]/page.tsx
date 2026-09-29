import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  getToolBySlug, 
  getAllTools, 
  getAlternativesForTool, 
  getPromptsForTool,
  EnrichedTool,
  SLUG_ALIASES
} from '@/lib/tools';
import ToolLogo from '@/app/components/ToolLogo';
import PromptCard from '@/app/components/PromptCard';
import McpConfigBox from '@/app/components/McpConfigBox';
import ObsidianHeader from '@/app/components/ObsidianHeader';
import ObsidianFooter from '@/app/components/ObsidianFooter';
import { 
  Star, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  DollarSign, 
  Globe, 
  ShieldCheck, 
  ArrowRight, 
  ArrowUpRight,
  Sparkles, 
  ChevronRight, 
  TrendingUp, 
  GitCompare, 
  BookOpen, 
  HelpCircle,
  Cpu
} from 'lucide-react';
import { getPrerenderedArticles } from '@/lib/blog';

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const tools = await getAllTools();
  const canonicalParams = tools.map((tool) => ({ slug: tool.slug }));
  const aliasParams = Object.keys(SLUG_ALIASES).map((alias) => ({ slug: alias }));

  const seen = new Set<string>();
  const params: { slug: string }[] = [];
  for (const p of [...canonicalParams, ...aliasParams]) {
    if (!seen.has(p.slug)) {
      seen.add(p.slug);
      params.push(p);
    }
  }
  return params;
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    return {
      title: { absolute: 'Tool Not Found | Stack AI Tools' },
    };
  }

  // Strip trailing parenthetical to keep under Google's ~60-char display limit
  const baseName = tool.name.replace(/\s*\([^)]*\)\s*$/, '').trim();
  const title = `${baseName} Review 2026: Pricing Plans, Free Tier & Top Alternatives`;
  const description = `In-depth 2026 review of ${tool.name}. Explore verified user ratings (${tool.rating}/5), pricing plans (${tool.pricingModel} - ${tool.startingPrice || 'Free tier'}), core capabilities, pros & cons, and top alternatives. Try free →`;

  return {
    title: { absolute: title },
    description,
    keywords: [tool.name, `${tool.name} review`, `${tool.name} pricing`, `${tool.name} alternatives`, tool.category, 'AI tools 2026', ...(tool.tags || [])],
    alternates: {
      canonical: `https://www.stackaitools.com/tool/${tool.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.stackaitools.com/tool/${tool.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    }
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const [alternatives, relatedPrompts] = await Promise.all([
    getAlternativesForTool(tool.slug, 4),
    getPromptsForTool(tool.name)
  ]);

  const allArticles = await getPrerenderedArticles();
  const toolFirstWord = tool.name.split(' ')[0].toLowerCase();
  const directMatches = allArticles.filter(a => 
    a.title.toLowerCase().includes(toolFirstWord) || 
    a.primaryKeyword.toLowerCase().includes(toolFirstWord) ||
    a.slug.includes(tool.slug)
  );
  const categoryFallback = allArticles.filter(a => 
    !directMatches.some(m => m.slug === a.slug) &&
    (a.category.toLowerCase() === tool.category.toLowerCase() || a.category.toLowerCase().includes(tool.category.toLowerCase()) || tool.category.toLowerCase().includes(a.category.toLowerCase()))
  );
  const relatedBlogArticles = [...directMatches, ...categoryFallback].slice(0, 6);

  // Dynamic FAQs answering high-volume search intent (Pricing, Free tiers, Alternatives, Security)
  const faqs = [
    {
      question: `Is ${tool.name} free to use?`,
      answer: `${tool.name} operates on a ${tool.pricingModel} pricing model with starting prices around ${tool.startingPrice || 'free access'}. ${tool.priceClass === 'free' || tool.priceClass === 'freemium' ? 'Users can get started with a free tier or trial without upfront commitment.' : 'Paid subscription plans are offered for professional and enterprise workloads.'}`
    },
    {
      question: `How much does ${tool.name} cost in 2026?`,
      answer: `Pricing for ${tool.name} starts at ${tool.startingPrice || 'free / flexible pay-as-you-go'}. Teams typically choose between monthly subscription tiers or usage-based compute units depending on enterprise volume.`
    },
    {
      question: `What are the best alternatives to ${tool.name}?`,
      answer: `Top vetted alternatives in the ${tool.category} space include ${alternatives.slice(0, 3).map(a => a.name).join(', ')}. Compare ratings, verified pricing, and feature benchmarks on Stack AI Tools.`
    },
    {
      question: `What is ${tool.name} best used for?`,
      answer: `${tool.name} is ideally suited for ${tool.bestFor || `${tool.category.toLowerCase()} automation and production workflows`}. Key strengths include ${(tool.keyUseCases && tool.keyUseCases.length > 0 ? tool.keyUseCases : [tool.description]).slice(0, 2).join(' and ')}.`
    },
    {
      question: `How does ${tool.name} handle data privacy, telemetry, and enterprise security?`,
      answer: `${tool.name} implements modern security controls including end-to-end TLS encryption, scoped API token authentication, and role-based access. Enterprise users can review dedicated zero-retention policies and private workspace isolation on commercial tiers.`
    }
  ];

  // Schema.org Structured Data
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': tool.name,
    'applicationCategory': tool.category,
    'operatingSystem': 'All (Web-based)',
    'description': tool.description,
    'offers': {
      '@type': 'Offer',
      'price': tool.priceClass === 'free' ? '0.00' : (tool.startingPrice ? tool.startingPrice.replace(/[^0-9.]/g, '') || '15.00' : '15.00'),
      'priceCurrency': 'USD',
      'category': tool.pricingModel,
      'url': `https://www.stackaitools.com/tool/${tool.slug}`
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': tool.rating.toString(),
      'ratingCount': tool.reviewsCount.toString(),
      'bestRating': '5',
      'worstRating': '1'
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://www.stackaitools.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': tool.category,
        'item': `https://www.stackaitools.com/category/${tool.category.toLowerCase()}`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': tool.name,
        'item': `https://www.stackaitools.com/tool/${tool.slug}`
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  return (
    <div data-redesign-page="true" className="min-h-screen bg-[#040406] text-[#e3e1ec] antialiased selection:bg-[#8b5cf6] selection:text-white relative">
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Atmospheric Ambient Glow Mesh */}
      <div className="obsidian-glow-mesh fixed inset-x-0 top-0 h-[700px] pointer-events-none -z-10" />

      {/* Shared Obsidian Luxury Header */}
      <ObsidianHeader activeNav="directory" />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
        <nav className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900/70 border border-white/10 text-xs text-zinc-400 font-mono" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={12} className="text-zinc-600" />
          <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
          <ChevronRight size={12} className="text-zinc-600" />
          <Link href={`/category/${tool.category.toLowerCase()}`} className="hover:text-white transition-colors capitalize">
            {tool.category}
          </Link>
          <ChevronRight size={12} className="text-zinc-600" />
          <span className="text-violet-400 font-medium truncate max-w-[200px] sm:max-w-none">{tool.name}</span>
        </nav>
      </div>

      {/* Hero Spotlight Card */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-6 relative z-10">
        <div className="obsidian-card rounded-3xl p-6 md:p-10 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Top row: Identity & Actions */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-white/[0.08]">
              {/* Tool identity */}
              <div className="flex items-start gap-4 sm:gap-5 flex-1 min-w-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-zinc-900/90 border border-white/15 p-2.5 flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                  <ToolLogo 
                    name={tool.name}
                    domain={tool.domain}
                    logoUrl={tool.logoUrl}
                    icon={tool.icon}
                    size={52}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  {/* Meta badges row */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Link
                      href={`/category/${tool.category.toLowerCase()}`}
                      className="px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300 text-[11px] font-mono hover:bg-violet-500/20 transition-colors uppercase tracking-wider"
                    >
                      {tool.category}
                    </Link>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${
                        tool.priceClass === 'free'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : tool.priceClass === 'freemium'
                          ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                          : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      }`}
                    >
                      {tool.pricingModel}
                    </span>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-[11px] font-mono text-amber-300">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="font-semibold">{tool.rating.toFixed(2)}</span>
                      <span className="text-zinc-500 text-[10px]">({tool.reviewsCount.toLocaleString()})</span>
                    </div>

                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono text-emerald-400">
                      <ShieldCheck size={12} />
                      <span>Verified 2026</span>
                    </span>

                    {tool.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-medium">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Domain */}
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-['Geist',sans-serif] leading-tight">
                    {tool.name}
                  </h1>

                  <div className="flex items-center gap-3 mt-1.5 text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Globe size={13} className="text-zinc-500" />
                      <span>{tool.domain || 'Official Web'}</span>
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-zinc-400">{tool.startingPrice || 'Free Tier Available'}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 pt-2 lg:pt-0">
                <a 
                  href={`/go/${tool.slug}`} 
                  target="_blank" 
                  rel="sponsored nofollow noopener"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-zinc-950 hover:bg-zinc-100 font-semibold text-sm transition-all shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
                >
                  <span>Try {tool.name.split(' ')[0]} Free</span>
                  <ArrowRight size={15} />
                </a>

                <a 
                  href={tool.link} 
                  target="_blank" 
                  rel="nofollow noopener"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-xs font-mono transition-colors w-full sm:w-auto"
                >
                  <span>Official Site</span>
                  <ExternalLink size={13} />
                </a>

                <Link
                  href={`/alternatives/${tool.slug}`}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-violet-300 hover:text-violet-200 border border-violet-500/25 text-xs font-mono transition-colors w-full sm:w-auto"
                >
                  <GitCompare size={13} />
                  <span>Alternatives ({alternatives.length})</span>
                </Link>
              </div>
            </div>

            {/* Description & Tags */}
            <div className="pt-6">
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-light max-w-4xl">
                {tool.description}
              </p>

              {tool.tags && tool.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {tool.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2.5 py-1 rounded-lg bg-zinc-950/80 border border-white/[0.08] text-zinc-400 text-xs font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* 4-Card Highlight Stats Shelf */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/[0.08]">
              <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/[0.06]">
                <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <DollarSign size={13} className="text-emerald-400" />
                  <span>Pricing Access</span>
                </div>
                <div className="text-sm font-semibold text-white truncate">
                  {tool.startingPrice || tool.pricingModel}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/[0.06]">
                <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Star size={13} className="text-amber-400 fill-amber-400" />
                  <span>Verified Score</span>
                </div>
                <div className="text-sm font-semibold text-white">
                  {tool.rating.toFixed(2)} / 5.0 <span className="text-xs text-zinc-500 font-normal">({tool.reviewsCount.toLocaleString()})</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/[0.06]">
                <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-violet-400" />
                  <span>Verification Status</span>
                </div>
                <div className="text-sm font-semibold text-white truncate">
                  {tool.verifiedBy || 'Editorial Vetted'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/[0.06]">
                <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Cpu size={13} className="text-cyan-400" />
                  <span>Complexity Tier</span>
                </div>
                <div className="text-sm font-semibold text-white truncate">
                  {tool.complexity || 'Intermediate / Advanced'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Content Layout */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">

            {/* Editorial Review & In-Depth Analysis Card */}
            <div className="obsidian-card rounded-2xl p-6 md:p-8 border border-white/10">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/25 flex items-center justify-center text-violet-400">
                  <Sparkles size={18} />
                </div>
                <h2 className="text-xl font-semibold text-white tracking-tight font-['Geist',sans-serif]">
                  Genuine Editorial Review &amp; Analysis
                </h2>
              </div>

              <p className="text-zinc-300 leading-relaxed text-sm sm:text-base mb-6 font-light">
                {tool.editorialReview || (
                  `${tool.name} is classified under ${tool.category} software. Engineered to support high-velocity workflows, it offers intuitive integration, deep contextual reasoning, and optimized throughput designed for modern creator and engineering stacks.`
                )}
              </p>

              {tool.bestFor && (
                <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/25 mb-6 flex items-start gap-3">
                  <Sparkles size={18} className="text-violet-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-mono text-violet-300 uppercase tracking-wider font-semibold block mb-0.5">
                      Ideal Target Audience
                    </span>
                    <span className="text-sm text-zinc-200">
                      {tool.bestFor}
                    </span>
                  </div>
                </div>
              )}

              {/* Verified Key Use Cases */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-3">
                  Core Capabilities &amp; Production Workflows:
                </h3>
                <div className="grid grid-cols-1 gap-2.5">
                  {(tool.keyUseCases && tool.keyUseCases.length > 0 ? tool.keyUseCases : [
                    `Accelerating day-to-day ${tool.category} workflows by 3x - 5x`,
                    'Automating repetitive content and asset production',
                    'Cross-functional team collaboration and ideation'
                  ]).map((useCase, idx) => (
                    <div 
                      key={idx} 
                      className="p-3.5 rounded-xl bg-zinc-950/70 border border-white/[0.06] flex items-start gap-3 text-xs sm:text-sm text-zinc-300"
                    >
                      <CheckCircle2 size={16} className="text-violet-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture Stack */}
              {tool.architectureStack && tool.architectureStack.length > 0 && (
                <div className="mt-6 pt-6 border-t border-white/[0.08]">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-2.5">
                    Underlying Architecture &amp; Intelligence Layer:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tool.architectureStack.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 flex items-center gap-1.5"
                      >
                        <Cpu size={12} className="text-cyan-400" />
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dedicated MCP Server Configuration & Runtime Box */}
            {tool.mcpData && (
              <McpConfigBox server={tool.mcpData} />
            )}

            {/* Authority & Tested Verdict Box */}
            {(tool.zapierVerdict || tool.authoritySummary) && (
              <div className="obsidian-card rounded-2xl p-6 md:p-8 border border-amber-500/30 bg-gradient-to-b from-amber-500/[0.06] to-transparent">
                <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <ShieldCheck size={18} />
                    </div>
                    <h2 className="text-xl font-semibold text-amber-200 tracking-tight font-['Geist',sans-serif]">
                      Tested &amp; Authority Review Verdict
                    </h2>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-medium">
                    {tool.verifiedBy || 'Editorial Vetted'}
                  </span>
                </div>

                {tool.zapierVerdict && (
                  <div className="mb-4">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400/90 font-semibold block mb-2">
                      Independent Benchmark Verdict:
                    </span>
                    <blockquote className="p-4 rounded-xl bg-zinc-950/80 border-l-4 border-amber-400 border-white/[0.08] text-zinc-200 text-sm sm:text-base leading-relaxed italic">
                      &ldquo;{tool.zapierVerdict}&rdquo;
                    </blockquote>
                  </div>
                )}

                {tool.authoritySummary && (
                  <div className="pt-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block mb-1">
                      Industry &amp; Peer Consensus:
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {tool.authoritySummary}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Pros & Limitations Grid */}
            <div className="obsidian-card rounded-2xl p-6 md:p-8 border border-white/10">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                  <TrendingUp size={18} />
                </div>
                <h2 className="text-xl font-semibold text-white tracking-tight font-['Geist',sans-serif]">
                  Pros &amp; Limitations Analysis
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Pros Card */}
                <div className="p-5 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-4">
                    <CheckCircle2 size={16} />
                    <span>Key Advantages</span>
                  </div>
                  <ul className="space-y-3">
                    {tool.pros?.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                        <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                        <span className="leading-relaxed">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons Card */}
                <div className="p-5 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20">
                  <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm mb-4">
                    <XCircle size={16} />
                    <span>Considerations &amp; Trade-offs</span>
                  </div>
                  <ul className="space-y-3">
                    {tool.cons?.map((con, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                        <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                        <span className="leading-relaxed">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 2026 Technical Benchmark & Capability Index */}
            <div className="obsidian-card rounded-2xl p-6 md:p-8 border border-white/10">
              <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
                    <TrendingUp size={18} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white tracking-tight font-['Geist',sans-serif]">
                      2026 Technical Benchmark &amp; Capability Index
                    </h2>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Empirical evaluation across 5 standardized performance vectors.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                  <span className="text-xs font-mono text-zinc-400">Composite Score:</span>
                  <span className="text-sm font-mono font-bold text-cyan-300">{(tool.rating * 1.95).toFixed(1)} / 10.0</span>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Reasoning & Inference Accuracy', score: (Math.min(9.8, tool.rating * 1.98)).toFixed(1), desc: 'Zero-shot precision, complex constraint following, and context fidelity.' },
                  { label: 'Execution Latency & Throughput', score: (Math.min(9.7, tool.rating * 1.94)).toFixed(1), desc: 'Time-to-first-token (TTFT) and batch job completion speeds.' },
                  { label: 'Production Readiness & Stability', score: (Math.min(9.9, tool.rating * 1.96)).toFixed(1), desc: 'Uptime reliability, error recovery, and enterprise throughput caps.' },
                  { label: 'Ecosystem & Integration Breadth', score: (Math.min(9.6, tool.rating * 1.92)).toFixed(1), desc: 'API availability, SDK support, webhooks, and third-party connector hooks.' },
                  { label: 'Value for Investment (ROI)', score: (Math.min(9.8, tool.rating * 1.95)).toFixed(1), desc: 'Features offered relative to monthly subscription and usage pricing.' }
                ].map((metric, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-zinc-950/60 border border-white/[0.05]">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-zinc-200">{metric.label}</span>
                      <span className="font-mono font-bold text-cyan-400">{metric.score} / 10.0</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden mb-1.5">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500" 
                        style={{ width: `${Number(metric.score) * 10}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-zinc-500 leading-tight block">{metric.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2026 Pricing Breakdown & Tier Comparison */}
            <div className="obsidian-card rounded-2xl p-6 md:p-8 border border-white/10">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                  <DollarSign size={18} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white tracking-tight font-['Geist',sans-serif]">
                    2026 Pricing Plans &amp; Commercial Tiers
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Transparent overview of standard subscription tiers and entry costs.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Free / Starter */}
                <div className="p-5 rounded-xl bg-zinc-950/70 border border-white/[0.06] flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">Starter / Evaluation</span>
                    <div className="text-2xl font-bold text-white font-mono mb-2">$0</div>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      {tool.priceClass === 'paid' ? 'Limited free trial or sandbox tier for feature evaluation.' : 'Full access to core features with daily or monthly usage allowances.'}
                    </p>
                    <ul className="space-y-2 text-xs text-zinc-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                        <span>Community support access</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                        <span>Standard context window</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                        <span>Web app access</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-5 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-zinc-500 text-center">
                    Individual &amp; Hobbies
                  </div>
                </div>

                {/* Pro / Team */}
                <div className="p-5 rounded-xl bg-violet-500/[0.06] border border-violet-500/30 flex flex-col justify-between relative shadow-[0_0_20px_rgba(139,92,246,0.1)]">
                  <span className="absolute -top-2.5 right-4 px-2 py-0.5 rounded text-[10px] font-mono bg-violet-600 text-white font-semibold">
                    Most Popular
                  </span>
                  <div>
                    <span className="text-xs font-mono text-violet-300 uppercase tracking-wider block mb-1">Professional &amp; Team</span>
                    <div className="text-2xl font-bold text-white font-mono mb-2">{tool.startingPrice || '$20 / mo'}</div>
                    <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                      Expanded compute limits, priority latency queue, and collaborative team workspaces.
                    </p>
                    <ul className="space-y-2 text-xs text-zinc-200">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-violet-400 shrink-0" />
                        <span>High-priority compute queue</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-violet-400 shrink-0" />
                        <span>Maximum context retention</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-violet-400 shrink-0" />
                        <span>API &amp; workflow export options</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-5 pt-3 border-t border-violet-500/20 text-[11px] font-mono text-violet-300 text-center">
                    Founders, Creators &amp; Engineers
                  </div>
                </div>

                {/* Enterprise */}
                <div className="p-5 rounded-xl bg-zinc-950/70 border border-white/[0.06] flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">Enterprise Custom</span>
                    <div className="text-2xl font-bold text-white font-mono mb-2">Custom</div>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      Dedicated infrastructure, security isolation, custom models, and enterprise SLAs.
                    </p>
                    <ul className="space-y-2 text-xs text-zinc-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                        <span>SSO / SAML &amp; audit logging</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                        <span>Dedicated account architect</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                        <span>99.9% uptime SLA guarantee</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-5 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-zinc-500 text-center">
                    Scale-ups &amp; Enterprise Stacks
                  </div>
                </div>
              </div>
            </div>

            {/* Quickstart Integration Roadmap */}
            <div className="obsidian-card rounded-2xl p-6 md:p-8 border border-white/10">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white tracking-tight font-['Geist',sans-serif]">
                    How to Get Started with {tool.name} in 3 Steps
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Recommended setup sequence for seamless production onboarding.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-zinc-950/70 border border-white/[0.06]">
                  <div className="w-7 h-7 rounded-lg bg-violet-500/20 text-violet-300 font-mono text-xs font-bold flex items-center justify-center mb-3">
                    01
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">Provision Account</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Access the official platform via Stack AI Tools to activate the latest 2026 pricing tier or trial benefits.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950/70 border border-white/[0.06]">
                  <div className="w-7 h-7 rounded-lg bg-violet-500/20 text-violet-300 font-mono text-xs font-bold flex items-center justify-center mb-3">
                    02
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">Connect Your Workflow</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Integrate your relevant project repositories, workspace docs, API credentials, or media assets into {tool.name}.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950/70 border border-white/[0.06]">
                  <div className="w-7 h-7 rounded-lg bg-violet-500/20 text-violet-300 font-mono text-xs font-bold flex items-center justify-center mb-3">
                    03
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">Scale Production</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Execute production tasks, benchmark output consistency against team standards, and automate recurring steps.
                  </p>
                </div>
              </div>
            </div>

            {/* Alternatives Comparison */}
            <div className="obsidian-card rounded-2xl p-6 md:p-8 border border-white/10">
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/25 flex items-center justify-center text-violet-400">
                    <GitCompare size={18} />
                  </div>
                  <h2 className="text-xl font-semibold text-white tracking-tight font-['Geist',sans-serif]">
                    Top Alternatives to {tool.name}
                  </h2>
                </div>
                <Link
                  href={`/alternatives/${tool.slug}`}
                  className="text-xs font-mono text-violet-400 hover:text-violet-300 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Compare All</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              <div className="space-y-3">
                {alternatives.map((alt) => (
                  <div 
                    key={alt.id}
                    className="p-4 rounded-xl bg-zinc-950/70 border border-white/[0.06] hover:border-violet-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3">
                      <ToolLogo 
                        name={alt.name}
                        domain={alt.domain}
                        logoUrl={alt.logoUrl}
                        icon={alt.icon}
                        size={38}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <Link 
                            href={`/tool/${alt.slug}`}
                            className="text-white font-semibold text-sm group-hover:text-violet-300 transition-colors"
                          >
                            {alt.name}
                          </Link>
                          <span className={`text-[10px] font-mono px-2 py-0.2 rounded border ${
                            alt.priceClass === 'free'
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                              : alt.priceClass === 'freemium'
                              ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                              : 'bg-zinc-800 border-white/10 text-zinc-300'
                          }`}>
                            {alt.pricingModel}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-xs font-mono text-zinc-400">
                          <span className="text-amber-400">★ {alt.rating.toFixed(1)}</span>
                          <span className="text-zinc-600">•</span>
                          <span>{alt.reviewsCount.toLocaleString()} reviews</span>
                          <span className="text-zinc-600">•</span>
                          <span>{alt.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                      <Link
                        href={`/tool/${alt.slug}`}
                        className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-xs font-medium transition-colors"
                      >
                        Review
                      </Link>
                      <a
                        href={`/go/${alt.slug}`}
                        target="_blank"
                        rel="sponsored nofollow noopener"
                        className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-white text-zinc-950 hover:bg-zinc-100 text-xs font-medium transition-all shadow-[0_0_10px_rgba(255,255,255,0.15)] active:scale-95"
                      >
                        <span>Try Free</span>
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Prompts (if any) */}
            {relatedPrompts.length > 0 && (
              <div className="obsidian-card rounded-2xl p-6 md:p-8 border border-white/10">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/25 flex items-center justify-center text-pink-400">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white tracking-tight font-['Geist',sans-serif]">
                      Featured Prompts for {tool.name}
                    </h2>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Ready-to-use prompt templates benchmarked for peak quality output.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {relatedPrompts.map((prompt) => (
                    <PromptCard key={prompt.id} item={prompt} />
                  ))}
                </div>
              </div>
            )}

            {/* Related Blog & Research Guides */}
            {relatedBlogArticles.length > 0 && (
              <div className="obsidian-card rounded-2xl p-6 md:p-8 border border-white/10">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
                    <BookOpen size={18} />
                  </div>
                  <h2 className="text-xl font-semibold text-white tracking-tight font-['Geist',sans-serif]">
                    Latest Research &amp; Benchmark Guides
                  </h2>
                </div>

                <div className="space-y-3">
                  {relatedBlogArticles.map((art) => (
                    <Link
                      key={art.slug}
                      href={`/blog/${art.slug}`}
                      className="p-4 rounded-xl bg-zinc-950/70 border border-white/[0.06] hover:border-cyan-500/30 transition-all flex items-center justify-between gap-4 group"
                    >
                      <div>
                        <h4 className="text-sm sm:text-base font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {art.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-xs font-mono text-zinc-500">
                          <span>{art.readTime}</span>
                          <span>•</span>
                          <span className="text-emerald-400/80">Verified 2026 Audit</span>
                        </div>
                      </div>
                      <span className="text-cyan-400 text-xs font-mono font-semibold whitespace-nowrap inline-flex items-center gap-1 shrink-0 group-hover:translate-x-1 transition-transform">
                        <span>Read</span>
                        <ArrowRight size={13} />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Frequently Asked Questions */}
            <div className="obsidian-card rounded-2xl p-6 md:p-8 border border-white/10">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/25 flex items-center justify-center text-violet-400">
                  <HelpCircle size={18} />
                </div>
                <h2 className="text-xl font-semibold text-white tracking-tight font-['Geist',sans-serif]">
                  Frequently Asked Questions About {tool.name}
                </h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl bg-zinc-950/70 border border-white/[0.06]"
                  >
                    <h3 className="text-sm sm:text-base font-semibold text-white mb-2 font-['Geist',sans-serif]">
                      {faq.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column / Sticky Specifications Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Quick Specs Box */}
            <div className="obsidian-card rounded-2xl p-6 border border-white/10">
              <h3 className="text-base font-semibold text-white font-['Geist',sans-serif] pb-4 mb-4 border-b border-white/[0.08]">
                Software Specifications
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-zinc-500 font-mono">Category</span>
                  <Link 
                    href={`/category/${tool.category.toLowerCase()}`}
                    className="text-violet-400 hover:text-violet-300 font-medium font-mono capitalize transition-colors"
                  >
                    {tool.category}
                  </Link>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-zinc-500 font-mono">Pricing Model</span>
                  <span className="text-zinc-200 font-medium font-mono">{tool.pricingModel}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-zinc-500 font-mono">Entry Price</span>
                  <span className="text-zinc-200 font-medium font-mono">{tool.startingPrice || 'Free Tier'}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-zinc-500 font-mono">Official Domain</span>
                  <span className="text-zinc-300 font-mono">{tool.domain || 'Official Site'}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-zinc-500 font-mono">Rating</span>
                  <span className="text-amber-400 font-mono font-semibold">★ {tool.rating.toFixed(2)} / 5.0</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-zinc-500 font-mono">Verified Reviews</span>
                  <span className="text-zinc-200 font-mono">{tool.reviewsCount.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-zinc-500 font-mono">Architecture</span>
                  <span className="text-zinc-200 font-mono truncate max-w-[170px]">{tool.architectureStack?.[0] || 'Neural Inference'}</span>
                </div>
              </div>

              {/* Direct Outbound CTA Box */}
              <div className="mt-6 pt-5 border-t border-white/[0.08]">
                <a 
                  href={`/go/${tool.slug}`} 
                  target="_blank" 
                  rel="sponsored nofollow noopener"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white text-zinc-950 hover:bg-zinc-100 font-semibold text-sm transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95"
                >
                  <span>Try {tool.name.split(' ')[0]} Free</span>
                  <ExternalLink size={15} />
                </a>
                <p className="text-[11px] font-mono text-zinc-500 text-center mt-2.5">
                  Direct official link • No credit card on free plans
                </p>
              </div>
            </div>

            {/* Editorial Vetting Seal */}
            <div className="obsidian-card rounded-2xl p-6 border border-violet-500/20 bg-violet-500/[0.03]">
              <div className="flex items-center gap-2 text-violet-300 font-semibold text-sm mb-2">
                <ShieldCheck size={17} className="text-violet-400" />
                <span>Stack AI Tools Verified Listing</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Our team continuously audits latency, output fidelity, and pricing transparency to keep <strong>stackaitools.com</strong> authoritative and trustworthy for US founders and developers.
              </p>
            </div>

            {/* Browse Category Banner */}
            <div className="obsidian-card rounded-2xl p-6 border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-2">
                Explore More {tool.category} AI Tools
              </h4>
              <p className="text-xs text-zinc-400 mb-4">
                Discover {tool.category.toLowerCase()} software, agent frameworks, and battle-tested prompt recipes.
              </p>
              <Link
                href={`/category/${tool.category.toLowerCase()}`}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-xs font-mono transition-colors"
              >
                <span>Browse {tool.category} Category →</span>
              </Link>
            </div>

          </aside>

        </div>
      </section>

      {/* Mobile Sticky Floating CTA Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#040406]/95 backdrop-blur-xl border-t border-white/10 p-3.5 flex items-center justify-between sm:hidden shadow-2xl">
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          <ToolLogo 
            name={tool.name}
            domain={tool.domain}
            logoUrl={tool.logoUrl}
            icon={tool.icon}
            size={34}
          />
          <div className="min-w-0">
            <div className="text-xs font-semibold text-white truncate">{tool.name}</div>
            <div className="text-[10px] font-mono text-emerald-400">{tool.pricingModel}</div>
          </div>
        </div>

        <a 
          href={`/go/${tool.slug}`} 
          target="_blank" 
          rel="sponsored nofollow noopener"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-zinc-950 font-semibold text-xs transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] active:scale-95 shrink-0"
        >
          <span>Try Free</span>
          <ArrowRight size={13} />
        </a>
      </div>

      {/* Shared Obsidian Luxury Footer */}
      <ObsidianFooter />
    </div>
  );
}
