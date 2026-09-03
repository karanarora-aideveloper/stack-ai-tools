import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllTools, EnrichedTool } from '@/lib/tools';
import { TOP_SEARCH_HUBS, getSearchHubBySlug, getAllSearchHubs } from '@/data/search-hubs';
import ToolLogo from '@/app/components/ToolLogo';
import { 
  Search, 
  Sparkles, 
  Star, 
  ExternalLink, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Zap
} from 'lucide-react';

interface SearchHubPageProps {
  params: Promise<{ query: string }>;
}

export async function generateStaticParams() {
  const hubs = getAllSearchHubs();
  return hubs.map((h) => ({
    query: h.slug,
  }));
}

function formatQueryTitle(queryStr: string): string {
  // Normalize common typo queries for display
  const typos: Record<string, string> = {
    chathpt: 'ChatGPT (Chathpt)',
    chatgpy: 'ChatGPT (Chatgpy)',
    chatgt: 'ChatGPT (Chatgt)',
    chartgpt: 'ChatGPT (Chartgpt)',
    chagot: 'ChatGPT (Chagot)',
    chathot: 'ChatGPT (Chathot)',
    caht: 'ChatGPT (Caht)',
    chaf: 'ChatGPT (Chaf)',
    cloude: 'Claude AI (Cloude)',
    'ourdream-ia': 'OurDream AI'
  };
  if (typos[queryStr.toLowerCase()]) {
    return typos[queryStr.toLowerCase()];
  }

  return queryStr
    .split(/[-_]+/)
    .map((word) => {
      if (word.toLowerCase() === 'ai') return 'AI';
      if (word.toLowerCase() === 'gpt') return 'GPT';
      if (word.toLowerCase() === 'llm') return 'LLM';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

export async function generateMetadata({ params }: SearchHubPageProps): Promise<Metadata> {
  const { query } = await params;
  const hub = getSearchHubBySlug(query);
  const formattedTitle = formatQueryTitle(hub ? hub.query : query);

  const title = `Best ${formattedTitle} AI Tools (2026)`;
  const description = `Compare top-rated ${formattedTitle} AI tools in 2026. Explore verified user ratings, transparent pricing plans, free tiers, and tested alternatives.`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      hub ? hub.query : query,
      `${formattedTitle} ai tools`,
      `${formattedTitle} alternatives`,
      `best ${formattedTitle}`,
      `free ${formattedTitle}`,
      'ai tools directory 2026'
    ],
    alternates: {
      canonical: `https://stackaitools.com/s/${query}`,
    },
    openGraph: {
      title,
      description,
      url: `https://stackaitools.com/s/${query}`,
      type: 'website',
      siteName: 'Stack AI Tools'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  };
}

export default async function SearchHubPage({ params }: SearchHubPageProps) {
  const { query } = await params;
  const hub = getSearchHubBySlug(query);
  const allTools = await getAllTools();

  const formattedTitle = formatQueryTitle(hub ? hub.query : query);
  const searchTokens = (hub ? hub.query : query.replace(/-/g, ' '))
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length >= 2);

  // Search matching tools
  const matchedTools: { tool: EnrichedTool; score: number }[] = [];

  for (const tool of allTools) {
    let score = 0;
    const nameLower = tool.name.toLowerCase();
    const descLower = tool.description.toLowerCase();
    const catLower = tool.category.toLowerCase();
    const tagsLower = (tool.tags || []).map((t) => t.toLowerCase());

    for (const token of searchTokens) {
      if (nameLower.includes(token)) score += 40;
      if (tagsLower.some((t) => t.includes(token))) score += 25;
      if (descLower.includes(token)) score += 15;
      if (catLower.includes(token)) score += 10;
    }

    // Direct typo matches for ChatGPT
    if (searchTokens.some((t) => ['chathpt', 'chatgpy', 'chatgt', 'chartgpt', 'chagot', 'caht', 'chaf'].includes(t))) {
      if (tool.slug === 'chatgpt' || tool.name.toLowerCase().includes('chatgpt')) {
        score += 100;
      }
    }

    // Direct typo matches for Claude
    if (searchTokens.some((t) => ['cloude'].includes(t))) {
      if (tool.slug.includes('claude') || tool.name.toLowerCase().includes('claude') || tool.slug.includes('anthropic')) {
        score += 100;
      }
    }

    if (score > 0) {
      matchedTools.push({ tool, score });
    }
  }

  matchedTools.sort((a, b) => b.score - a.score || b.tool.rating - a.tool.rating);

  let finalTools: EnrichedTool[] = matchedTools.map((m) => m.tool);

  // If fewer than 6 tools matched, backfill with top tools
  if (finalTools.length < 6) {
    const existingIds = new Set(finalTools.map((t) => t.id));
    const fillTools = allTools
      .filter((t) => !existingIds.has(t.id))
      .sort((a, b) => b.reviewsCount - a.reviewsCount)
      .slice(0, 6 - finalTools.length);
    finalTools = [...finalTools, ...fillTools];
  }

  // Get other related hubs for internal linking
  const relatedHubs = TOP_SEARCH_HUBS
    .filter((h) => h.slug !== query)
    .slice(0, 16);

  // Schema.org Structured Data
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Best ${formattedTitle} AI Tools (2026)`,
    description: `Curated directory of top-rated ${formattedTitle} AI tools, vetted by Stack AI Tools.`,
    numberOfItems: finalTools.length,
    itemListElement: finalTools.map((tool, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: tool.name,
        applicationCategory: tool.category,
        url: `https://stackaitools.com/tool/${tool.slug}`,
        description: tool.description,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: tool.rating,
          reviewCount: tool.reviewsCount || 100
        }
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
        item: 'https://stackaitools.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Search Directory',
        item: 'https://stackaitools.com/categories'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: formattedTitle,
        item: `https://stackaitools.com/s/${query}`
      }
    ]
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingBottom: 80 }}>
      {/* Schema.org Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 20px 0' }}>
        {/* Breadcrumb Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)', marginBottom: 28 }}>
          <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={14} />
          <Link href="/categories" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Directory</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--arcade-cyan)', fontWeight: 600 }}>{formattedTitle}</span>
        </nav>

        {/* Hero Header */}
        <header style={{ textAlign: 'center', marginBottom: 42 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            padding: '5px 14px',
            borderRadius: 20,
            background: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            color: 'var(--arcade-cyan)',
            fontSize: 12.5,
            fontWeight: 700,
            letterSpacing: '0.04em',
            marginBottom: 14
          }}>
            <Search size={13} />
            <span>AI SOFTWARE DIRECTORY • 2026 INDEX</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--text-strong)',
            margin: '0 0 14px',
            lineHeight: 1.2
          }}>
            Best <span style={{
              background: 'linear-gradient(135deg, #38bdf8 0%, #a855f7 50%, #f43f5e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>{formattedTitle}</span> AI Tools & Software
          </h1>

          <p style={{
            color: 'var(--text-muted)',
            fontSize: '1.05rem',
            lineHeight: 1.65,
            maxWidth: 760,
            margin: '0 auto 20px'
          }}>
            Compare top-ranked artificial intelligence software and tools for <strong>{formattedTitle}</strong>. All listings feature verified user reviews, pricing breakdown, pros & cons, and vetted free trial tiers.
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 12.5,
            color: 'var(--text-secondary)',
            background: 'rgba(var(--ink-tint-rgb), 0.03)',
            border: '1px solid rgba(var(--ink-tint-rgb), 0.08)',
            padding: '8px 20px',
            borderRadius: 24
          }}>
            <span>Showing <strong>{finalTools.length} curated options</strong></span>
            <span>•</span>
            <span>Tested for US Market</span>
            <span>•</span>
            <span style={{ color: 'var(--color-success)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <ShieldCheck size={13} /> Verified Sept 2026
            </span>
          </div>
        </header>

        {/* Tools Results Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: 22,
          marginBottom: 60
        }}>
          {finalTools.map((tool) => {
            const priceClassColor = 
              tool.priceClass === 'free' ? '#34d399' : 
              tool.priceClass === 'paid' ? '#f43f5e' : '#38bdf8';

            return (
              <div
                key={tool.id}
                style={{
                  background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.6) 0%, rgba(var(--ink-tint-rgb), 0.8) 100%)',
                  border: '1px solid rgba(var(--ink-tint-rgb), 0.08)',
                  borderRadius: 16,
                  padding: 22,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s ease, border-color 0.2s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <ToolLogo 
                        name={tool.name}
                        domain={tool.domain}
                        logoUrl={tool.logoUrl}
                        icon={tool.icon}
                        size={44}
                      />
                      <div>
                        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: 'var(--text-strong)' }}>
                          <Link href={`/tool/${tool.slug}`} style={{ color: 'var(--text-strong)', textDecoration: 'none' }}>
                            {tool.name}
                          </Link>
                        </h3>
                        <span style={{ fontSize: 12, color: 'var(--arcade-cyan)', fontWeight: 600 }}>
                          {tool.category}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                      <span style={{
                        fontSize: 11,
                        padding: '2px 8px',
                        borderRadius: 10,
                        background: 'rgba(var(--ink-tint-rgb), 0.06)',
                        border: `1px solid ${priceClassColor}40`,
                        color: priceClassColor,
                        fontWeight: 700
                      }}>
                        {tool.pricingModel}
                      </span>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 12, color: 'var(--color-warning)', fontWeight: 600 }}>
                        <Star size={11} fill="#fbbf24" />
                        <span>{tool.rating.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.6, margin: '0 0 16px', minHeight: 60 }}>
                    {tool.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
                    {(tool.tags || []).slice(0, 4).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontSize: 11,
                          padding: '2px 8px',
                          background: 'rgba(var(--ink-tint-rgb), 0.04)',
                          border: '1px solid rgba(var(--ink-tint-rgb), 0.07)',
                          borderRadius: 6,
                          color: 'var(--text-muted)'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 14, borderTop: '1px solid rgba(var(--ink-tint-rgb), 0.08)' }}>
                  <a
                    href={`/go/${tool.slug}`}
                    target="_blank"
                    rel="sponsored nofollow noopener"
                    style={{
                      flex: 1,
                      padding: '9px 14px',
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 700,
                      background: 'var(--arcade-cyan)',
                      color: '#000',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6
                    }}
                  >
                    <span>Try {tool.name.split(' ')[0]} Free</span>
                    <ArrowRight size={14} />
                  </a>

                  <Link
                    href={`/tool/${tool.slug}`}
                    style={{
                      padding: '9px 14px',
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 600,
                      background: 'rgba(var(--ink-tint-rgb), 0.04)',
                      border: '1px solid rgba(var(--ink-tint-rgb), 0.12)',
                      color: 'var(--text-strong)',
                      textDecoration: 'none'
                    }}
                  >
                    Review
                  </Link>

                  <Link
                    href={`/alternatives/${tool.slug}`}
                    style={{
                      padding: '9px 14px',
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 600,
                      background: 'rgba(var(--ink-tint-rgb), 0.04)',
                      border: '1px solid rgba(var(--ink-tint-rgb), 0.12)',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none'
                    }}
                    title={`Compare ${tool.name} alternatives`}
                  >
                    Vs
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Related Searches Link Silo */}
        <section style={{
          background: 'var(--bg-glass)',
          border: '1px solid rgba(var(--ink-tint-rgb), 0.08)',
          borderRadius: 20,
          padding: 32
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <TrendingUp size={18} color="var(--arcade-cyan)" />
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--text-strong)' }}>
              Explore Related AI Search Categories
            </h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: 13.5, margin: '0 0 20px' }}>
            Discover more high-volume tools and categories benchmarked in the 2026 directory:
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {relatedHubs.map((h) => (
              <Link
                key={h.slug}
                href={`/s/${h.slug}`}
                style={{
                  padding: '8px 16px',
                  borderRadius: 20,
                  fontSize: 12.5,
                  fontWeight: 600,
                  background: 'rgba(var(--ink-tint-rgb), 0.03)',
                  border: '1px solid rgba(var(--ink-tint-rgb), 0.08)',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{formatQueryTitle(h.query)}</span>
                <span style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>
                  ({(h.volume / 1000).toFixed(0)}k/mo)
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
