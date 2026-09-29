import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getToolBySlug, getAllTools, getAlternativesForTool, SLUG_ALIASES } from '@/lib/tools';
import ToolLogo from '@/app/components/ToolLogo';
import ObsidianHeader from '@/app/components/ObsidianHeader';
import ObsidianFooter from '@/app/components/ObsidianFooter';
import { 
  GitCompare, 
  ChevronRight, 
  Star, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { getPrerenderedArticles } from '@/lib/blog';

interface AlternativePageProps {
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

export async function generateMetadata({ params }: AlternativePageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    return {
      title: { absolute: 'Alternatives Not Found | Stack AI Tools' },
    };
  }

  const baseName = tool.name.replace(/\s*\([^)]*\)\s*$/, '').trim();
  const title = `Top 5 ${baseName} Alternatives (2026): Free & Paid Competitors`;
  const description = `Compare the top 5 alternatives to ${tool.name} in 2026. Explore verified user ratings, pricing tiers (${tool.pricingModel}), free plans, and side-by-side feature comparisons.`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `https://www.stackaitools.com/alternatives/${tool.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.stackaitools.com/alternatives/${tool.slug}`,
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    }
  };
}

export default async function AlternativeDetailPage({ params }: AlternativePageProps) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const alternatives = await getAlternativesForTool(tool.slug, 5);
  const allArticles = await getPrerenderedArticles();
  const toolFirstWord = tool.name.split(' ')[0].toLowerCase();
  const altNames = alternatives.map(a => a.name.split(' ')[0].toLowerCase());

  const comparisonArticles = allArticles.filter(a => {
    const tLower = a.title.toLowerCase();
    const kLower = a.primaryKeyword.toLowerCase();
    const sLower = a.slug.toLowerCase();
    return tLower.includes(toolFirstWord) || kLower.includes(toolFirstWord) || sLower.includes(tool.slug) ||
      altNames.some(alt => tLower.includes(alt) || kLower.includes(alt));
  });

  const categoryFallback = allArticles.filter(a => 
    !comparisonArticles.some(m => m.slug === a.slug) &&
    (a.category.toLowerCase() === tool.category.toLowerCase() || a.category.toLowerCase().includes(tool.category.toLowerCase()) || tool.category.toLowerCase().includes(a.category.toLowerCase()))
  );

  const relatedArticles = [...comparisonArticles, ...categoryFallback].slice(0, 5);

  const faqs = [
    {
      question: `What is the best overall alternative to ${tool.name}?`,
      answer: `Based on verified US user reviews and feature benchmarks, the #1 alternative is ${alternatives[0]?.name || 'a leading competitor in the category'}, offering ${alternatives[0]?.pricingModel || 'competitive'} pricing and a ${alternatives[0]?.rating || 4.9}/5 rating.`
    },
    {
      question: `Are there free alternatives to ${tool.name}?`,
      answer: `Yes. Tools like ${alternatives.filter(a => a.priceClass === 'free' || a.priceClass === 'freemium').map(a => a.name.split(' ')[0]).join(', ') || 'selected peers'} provide free tiers or trials without mandatory upfront billing.`
    },
    {
      question: `Why do users switch from ${tool.name}?`,
      answer: `Common reasons US teams seek alternatives include pricing tier scalability, specialized niche workflows, API integration limits, or alternative model architectures.`
    }
  ];

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
        'name': 'Alternatives',
        'item': 'https://www.stackaitools.com/alternatives'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': `${tool.name} Alternatives`,
        'item': `https://www.stackaitools.com/alternatives/${tool.slug}`
      }
    ]
  };

  return (
    <div data-redesign-page="true" className="min-h-screen bg-[#040406] text-[#e3e1ec] antialiased selection:bg-[#8b5cf6] selection:text-white relative">
      {/* Schemas */}
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
          <Link href="/alternatives" className="hover:text-white transition-colors">Alternatives</Link>
          <ChevronRight size={12} className="text-zinc-600" />
          <span className="text-violet-400 font-medium">{tool.name} Alternatives</span>
        </nav>
      </div>

      {/* Header */}
      <header className="pt-10 pb-8 px-4 md:px-8 max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900/90 border border-violet-500/30 text-xs text-zinc-300 mb-6 shadow-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="tracking-wide uppercase font-mono text-[11px] text-zinc-400">COMPETITOR COMPARISON 2026</span>
          <span className="text-zinc-600">•</span>
          <span className="text-violet-400 font-medium">{alternatives.length} VETTED ALTERNATIVES</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-5 font-['Geist',sans-serif] leading-[1.12]">
          Best {tool.name} Alternatives &{' '}
          <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
            Competitors
          </span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light mb-8">
          While <strong className="text-zinc-200 font-medium">{tool.name}</strong> remains a market leader in {tool.category.toLowerCase()}, you may need different pricing structures, localized privacy, or specialized features. Below are the top 5 vetted replacements.
        </p>
      </header>

      {/* Comparison Matrix Table */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8 relative z-10">
        <div className="obsidian-card rounded-2xl p-6 md:p-8 border border-white/10">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/25 flex items-center justify-center text-violet-400">
              <Sparkles size={18} />
            </div>
            <h2 className="text-xl font-semibold text-white tracking-tight font-['Geist',sans-serif]">
              Head-to-Head Comparison: {tool.name} vs Top Competitors
            </h2>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4">Software</th>
                  <th className="py-3 px-4">Pricing Tier</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {/* Baseline Tool */}
                <tr className="bg-violet-500/10 font-medium">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <ToolLogo name={tool.name} domain={tool.domain} logoUrl={tool.logoUrl} icon={tool.icon} size={28} />
                      <div>
                        <span className="text-white font-semibold">{tool.name}</span>
                        <span className="ml-2 text-[10px] font-mono px-1.5 py-0.2 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">CURRENT</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-xs text-zinc-300">{tool.pricingModel}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-amber-400">
                    ★ {tool.rating.toFixed(1)} <span className="text-zinc-500 text-xs">({tool.reviewsCount.toLocaleString()})</span>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-400">{tool.category}</td>
                  <td className="py-3.5 px-4 text-right">
                    <Link href={`/tool/${tool.slug}`} className="inline-flex items-center px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-xs font-medium transition-colors">
                      View Details
                    </Link>
                  </td>
                </tr>

                {/* Alternatives */}
                {alternatives.map((alt) => (
                  <tr key={alt.id} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <ToolLogo name={alt.name} domain={alt.domain} logoUrl={alt.logoUrl} icon={alt.icon} size={28} />
                        <Link href={`/tool/${alt.slug}`} className="text-zinc-200 hover:text-violet-300 font-medium transition-colors">
                          {alt.name}
                        </Link>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        alt.priceClass === 'free' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' 
                          : alt.priceClass === 'freemium'
                          ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25'
                          : 'bg-zinc-800 text-zinc-300 border-white/10'
                      }`}>
                        {alt.pricingModel}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-amber-400">
                      ★ {alt.rating.toFixed(1)} <span className="text-zinc-500 text-xs">({alt.reviewsCount.toLocaleString()})</span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400">{alt.category}</td>
                    <td className="py-3.5 px-4 text-right">
                      <a 
                        href={`/go/${alt.slug}`} 
                        target="_blank" 
                        rel="sponsored nofollow noopener"
                        className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-white text-zinc-950 hover:bg-zinc-100 text-xs font-medium transition-all shadow-[0_0_10px_rgba(255,255,255,0.15)] active:scale-95"
                      >
                        <span>Try Free</span>
                        <ArrowRight size={12} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Deep-Dive Cards for Each Alternative */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8 relative z-10">
        <h2 className="text-2xl font-semibold text-white tracking-tight font-['Geist',sans-serif] mb-6">
          Detailed Breakdown of Each Alternative
        </h2>

        <div className="space-y-6">
          {alternatives.map((alt, index) => (
            <div key={alt.id} className="obsidian-card rounded-2xl p-6 md:p-8 border border-white/[0.08] hover:border-violet-500/40 transition-all group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06] mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 p-1 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <ToolLogo name={alt.name} domain={alt.domain} logoUrl={alt.logoUrl} icon={alt.icon} size={38} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                        #{index + 1} Alternative
                      </span>
                      <h3 className="text-lg font-semibold text-white font-['Geist',sans-serif]">
                        {alt.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-zinc-400 font-mono">{alt.category}</span>
                      <span className="text-zinc-600">•</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        alt.priceClass === 'free' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' 
                          : alt.priceClass === 'freemium'
                          ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25'
                          : 'bg-zinc-800 text-zinc-300 border-white/10'
                      }`}>
                        {alt.pricingModel}
                      </span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-xs font-mono text-amber-400 flex items-center gap-1">
                        ★ {alt.rating.toFixed(1)} <span className="text-zinc-500">({alt.reviewsCount.toLocaleString()})</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <a 
                    href={`/go/${alt.slug}`} 
                    target="_blank" 
                    rel="sponsored nofollow noopener"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white text-zinc-950 hover:bg-zinc-100 font-medium text-xs shadow-[0_0_12px_rgba(255,255,255,0.15)] active:scale-95 transition-all w-full sm:w-auto"
                  >
                    <span>Try {alt.name.split(' ')[0]} Free</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>

              <p className="text-sm text-zinc-400 font-light leading-relaxed mb-4">
                {alt.description}
              </p>

              <div>
                <Link 
                  href={`/tool/${alt.slug}`} 
                  className="text-xs text-violet-400 hover:text-violet-300 font-mono inline-flex items-center gap-1 transition-colors"
                >
                  <span>Read Full {alt.name} Review</span>
                  <ChevronRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Comparison Guides */}
      {relatedArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-8 relative z-10">
          <div className="obsidian-card rounded-2xl p-6 md:p-8 border border-white/10">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/25 flex items-center justify-center text-pink-400">
                <BookOpen size={18} />
              </div>
              <h2 className="text-xl font-semibold text-white tracking-tight font-['Geist',sans-serif]">
                Head-to-Head Comparison & Review Guides
              </h2>
            </div>

            <div className="space-y-3">
              {relatedArticles.map((art) => (
                <Link 
                  key={art.slug} 
                  href={`/blog/${art.slug}`} 
                  className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-white/[0.06] hover:border-violet-500/30 transition-all group/art"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-200 group-hover/art:text-white transition-colors">
                      {art.title}
                    </h4>
                    <span className="text-xs text-zinc-500 font-mono">{art.readTime} • Verified Comparison</span>
                  </div>
                  <span className="text-xs text-violet-400 group-hover/art:text-violet-300 font-mono flex items-center gap-1 shrink-0 ml-4">
                    <span>Read Guide</span>
                    <ArrowRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-16 relative z-10">
        <div className="obsidian-card rounded-3xl p-8 md:p-10 border border-white/10">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
              <HelpCircle size={18} />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight font-['Geist',sans-serif]">
              Frequently Asked Questions About {tool.name} Alternatives
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
