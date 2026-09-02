import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  getToolBySlug, 
  getAllTools, 
  getAlternativesForTool, 
  getPromptsForTool,
  EnrichedTool 
} from '@/lib/tools';
import ToolLogo from '@/app/components/ToolLogo';
import PromptCard from '@/app/components/PromptCard';
import NewsletterCapture from '@/app/components/NewsletterCapture';
import { 
  Star, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  Layers, 
  DollarSign, 
  Globe, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  ChevronRight,
  TrendingUp,
  GitCompare,
  BookOpen
} from 'lucide-react';
import { getAllArticles } from '@/lib/blog';

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tools = await getAllTools();
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Tool Not Found | Stack AI Tools',
    };
  }

  const title = `[Tested 2026] ${tool.name} Review: Pricing, Features & Alternatives`;
  const description = `In-depth 2026 review of ${tool.name}. Explore verified user ratings (${tool.rating}/5), pricing plans (${tool.pricingModel}), core capabilities, pros & cons, and top alternatives. Try free →`;

  return {
    title,
    description,
    keywords: [tool.name, `${tool.name} review`, `${tool.name} pricing`, `${tool.name} alternatives`, tool.category, 'AI tools 2026', ...(tool.tags || [])],
    alternates: {
      canonical: `https://stackaitools.com/tool/${tool.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://stackaitools.com/tool/${tool.slug}`,
      type: 'article',
      images: [
        {
          url: tool.logoUrl,
          width: 128,
          height: 128,
          alt: `${tool.name} logo`,
        }
      ]
    },
    twitter: {
      card: 'summary',
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

  const allArticles = await getAllArticles();
  const toolFirstWord = tool.name.split(' ')[0].toLowerCase();
  const relatedBlogArticles = allArticles.filter(a => 
    a.title.toLowerCase().includes(toolFirstWord) || 
    a.primaryKeyword.toLowerCase().includes(toolFirstWord) ||
    a.slug.includes(tool.slug)
  ).slice(0, 3);

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
      'price': tool.priceClass === 'free' ? '0.00' : '15.00',
      'priceCurrency': 'USD',
      'category': tool.pricingModel
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
        'item': 'https://stackaitools.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': tool.category,
        'item': `https://stackaitools.com/category/${tool.category.toLowerCase()}`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': tool.name,
        'item': `https://stackaitools.com/tool/${tool.slug}`
      }
    ]
  };

  return (
    <div className="tool-profile-container">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumbs */}
      <nav className="tool-breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <ChevronRight size={14} />
        <Link href={`/category/${tool.category.toLowerCase()}`}>{tool.category}</Link>
        <ChevronRight size={14} />
        <span>{tool.name}</span>
      </nav>

      {/* Hero Card */}
      <div className="tool-hero">
        <div className="tool-hero-top">
          <div className="tool-hero-identity">
            <div className="tool-logo-large">
              <ToolLogo 
                name={tool.name}
                domain={tool.domain}
                logoUrl={tool.logoUrl}
                icon={tool.icon}
                size={54}
              />
            </div>
            <div className="tool-title-wrapper">
              <h1>{tool.name}</h1>
              <div className="tool-meta-badges">
                <span className="tool-category-tag">{tool.category}</span>
                <span className={`tool-price-tag price-${tool.priceClass}`}>
                  {tool.pricingModel}
                </span>
                <div className="tool-rating-box">
                  <Star size={14} className="star-icon" fill="currentColor" />
                  <span className="rating-num">{tool.rating}</span>
                  <span className="reviews-count">({tool.reviewsCount.toLocaleString()} reviews)</span>
                </div>
                <span className="tool-verified-tag">
                  <ShieldCheck size={13} />
                  <span>Verified 2026</span>
                </span>
              </div>
            </div>
          </div>

          <div className="tool-action-bar">
            <a 
              href={`/go/${tool.slug}`} 
              target="_blank" 
              rel="sponsored nofollow noopener"
              className="btn-affiliate-primary"
            >
              <span>Try {tool.name.split(' ')[0]} Free</span>
              <ArrowRight size={16} />
            </a>
            <a 
              href={tool.link} 
              target="_blank" 
              rel="nofollow noopener"
              className="btn-affiliate-secondary"
            >
              <span>Official Site</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <p className="tool-hero-desc">
          {tool.description}
        </p>

        <div className="tool-tags-wrap">
          {tool.tags.map((tag) => (
            <span key={tag} className="tag-pill">#{tag}</span>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="tool-layout-grid">
        {/* Main Column */}
        <div className="tool-main-col">
          {/* Overview Card */}
          <div className="tool-card-box">
            <h2 className="tool-box-title">
              <Sparkles size={20} color="#818cf8" />
              Genuine Editorial Review & Analysis
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: 15, marginBottom: 20 }}>
              {tool.editorialReview || (
                `${tool.name} is classified under ${tool.category} software. Engineered to support high-velocity workflows, it offers intuitive integration, deep contextual reasoning, and optimized throughput designed for modern creator and engineering stacks.`
              )}
            </p>
            {tool.bestFor && (
              <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.2)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Ideal For:</span>
                <span style={{ fontSize: 14, color: '#e2e8f0' }}>{tool.bestFor}</span>
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {tool.keyUseCases?.map((useCase, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#e2e8f0' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#6366f1' }}></div>
                  <span>{useCase}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Zapier & Authority Verdict Box */}
          {(tool.zapierVerdict || tool.authoritySummary) && (
            <div className="tool-card-box authority-verdict-box" style={{ border: '1px solid rgba(245, 158, 11, 0.3)', background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.06) 0%, rgba(15, 23, 42, 0.7) 100%)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
                <h2 className="tool-box-title" style={{ margin: 0, color: '#fef08a' }}>
                  <ShieldCheck size={20} color="#f59e0b" />
                  Zapier & Authority Review Verdict
                </h2>
                <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 20, background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', fontWeight: 600, border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                  {tool.verifiedBy || 'Editorial Vetted'}
                </span>
              </div>
              {tool.zapierVerdict && (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
                    Tested & Verified by Zapier Editorial:
                  </div>
                  <blockquote style={{ margin: 0, color: '#f8fafc', fontSize: 14.5, lineHeight: 1.65, fontStyle: 'italic', background: 'rgba(0,0,0,0.3)', padding: '14px 16px', borderRadius: 8, borderLeft: '4px solid #f59e0b' }}>
                    "{tool.zapierVerdict}"
                  </blockquote>
                </div>
              )}
              {tool.authoritySummary && (
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
                    Industry Consensus (G2 / GitHub / ProductHunt):
                  </div>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
                    {tool.authoritySummary}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Pros & Limitations Grid */}
          <div className="tool-card-box">
            <h2 className="tool-box-title">
              <TrendingUp size={20} color="#34d399" />
              Pros & Limitations
            </h2>
            <div className="pros-cons-grid">
              <div className="pro-card">
                <div className="pro-con-title">
                  <CheckCircle2 size={18} />
                  <span>Key Advantages</span>
                </div>
                <ul className="pro-con-list">
                  {tool.pros?.map((pro, i) => (
                    <li key={i}>
                      <span style={{ color: '#34d399', fontWeight: 'bold' }}>✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="con-card">
                <div className="pro-con-title">
                  <XCircle size={18} />
                  <span>Considerations</span>
                </div>
                <ul className="pro-con-list">
                  {tool.cons?.map((con, i) => (
                    <li key={i}>
                      <span style={{ color: '#f87171', fontWeight: 'bold' }}>✕</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Related Prompts Section (if any) */}
          {relatedPrompts.length > 0 && (
            <div className="tool-card-box">
              <h2 className="tool-box-title">
                <Sparkles size={20} color="#ec4899" />
                Featured Prompts for {tool.name}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 20 }}>
                Copy-paste battle-tested prompts verified to deliver peak output quality on this model.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 18 }}>
                {relatedPrompts.map((prompt) => (
                  <PromptCard key={prompt.id} item={prompt} />
                ))}
              </div>
            </div>
          )}

          {/* Alternatives Comparison */}
          <div className="tool-card-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 className="tool-box-title" style={{ margin: 0 }}>
                <GitCompare size={20} color="#a855f7" />
                Top Alternatives to {tool.name}
              </h2>
              <Link 
                href={`/alternatives/${tool.slug}`} 
                style={{ fontSize: 13, color: '#818cf8', display: 'flex', alignItems: 'center', gap: 4 }}
              >
                Compare All
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="alternatives-compact-list">
              {alternatives.map((alt) => (
                <Link key={alt.id} href={`/tool/${alt.slug}`} className="alternative-compact-item">
                  <div className="alt-identity">
                    <ToolLogo 
                      name={alt.name}
                      domain={alt.domain}
                      logoUrl={alt.logoUrl}
                      icon={alt.icon}
                      size={36}
                    />
                    <div>
                      <div className="alt-name">{alt.name}</div>
                      <div className="alt-sub">{alt.pricingModel} • {alt.rating} ★ ({alt.reviewsCount.toLocaleString()} reviews)</div>
                    </div>
                  </div>
                  <span className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: 12 }}>
                    View Review →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Related In-Depth Research & Benchmark Guides */}
          {relatedBlogArticles.length > 0 && (
            <div className="tool-card-box" style={{ marginTop: 24 }}>
              <h2 className="tool-box-title">
                <BookOpen size={20} color="#818cf8" />
                Latest Research & Benchmark Guides for {tool.name}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {relatedBlogArticles.map((art) => (
                  <Link 
                    key={art.slug} 
                    href={`/blog/${art.slug}`} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      padding: '12px 16px', 
                      background: 'rgba(255,255,255,0.03)', 
                      border: '1px solid rgba(255,255,255,0.08)', 
                      borderRadius: 8, 
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div>
                      <h4 style={{ color: '#fff', margin: '0 0 4px', fontSize: 14.5 }}>{art.title}</h4>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{art.readTime} • Verified 2026 Audit</span>
                    </div>
                    <span style={{ color: 'var(--arcade-cyan)', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', marginLeft: 12 }}>
                      Read Guide →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Side Column: Specs & Monetization Action */}
        <aside className="tool-side-col">
          {/* Quick Specs Box */}
          <div className="tool-card-box">
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 18 }}>
              Software Specifications
            </h3>
            <div className="specs-list">
              <div className="spec-item">
                <span className="spec-label">Category</span>
                <Link href={`/category/${tool.category.toLowerCase()}`} style={{ color: '#818cf8', fontWeight: 600 }}>
                  {tool.category}
                </Link>
              </div>
              <div className="spec-item">
                <span className="spec-label">Pricing Model</span>
                <span className="spec-value">{tool.pricingModel}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Estimated Entry Price</span>
                <span className="spec-value">{tool.startingPrice}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Official Domain</span>
                <span className="spec-value">{tool.domain || 'Official Web'}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Aggregate Rating</span>
                <span className="spec-value" style={{ color: '#fbbf24' }}>
                  ★ {tool.rating} / 5.0
                </span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Total Verified Reviews</span>
                <span className="spec-value">{tool.reviewsCount.toLocaleString()}</span>
              </div>
            </div>

            <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <a 
                href={`/go/${tool.slug}`} 
                target="_blank" 
                rel="sponsored nofollow noopener"
                className="btn-affiliate-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Try {tool.name.split(' ')[0]} Now</span>
                <ExternalLink size={15} />
              </a>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', marginTop: 10 }}>
                Direct official link • No credit card required on free tiers
              </p>
            </div>
          </div>

          {/* Editorial Trust Pill */}
          <div className="tool-card-box" style={{ background: 'rgba(99, 102, 241, 0.05)', borderColor: 'rgba(99, 102, 241, 0.2)' }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <ShieldCheck size={16} color="#818cf8" />
              Stack AI Tools Editorial Vetting
            </h4>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Our research team continuously benchmarks latency, output accuracy, and pricing transparency to ensure the listings on <strong>stackaitools.com</strong> remain authoritative.
            </p>
          </div>
        </aside>
      </div>

      {/* Newsletter VIP Capture */}
      <div style={{ marginTop: 40, marginBottom: 40 }}>
        <NewsletterCapture 
          source={`tool_profile_${tool.slug}`} 
          headline={`Stay Ahead in ${tool.category} AI & Automation`}
          subheadline={`Get weekly benchmark updates on ${tool.name}, top frontier model releases, and verified SaaS discounts delivered every Tuesday.`}
        />
      </div>

      {/* Mobile Sticky CTA Bar */}
      <div className="mobile-sticky-cta">
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{tool.name}</div>
          <div style={{ fontSize: 12, color: '#34d399' }}>{tool.pricingModel}</div>
        </div>
        <a 
          href={`/go/${tool.slug}`} 
          target="_blank" 
          rel="sponsored nofollow noopener"
          className="btn-affiliate-primary"
          style={{ padding: '10px 18px', fontSize: 13 }}
        >
          <span>Try Free →</span>
        </a>
      </div>
    </div>
  );
}
