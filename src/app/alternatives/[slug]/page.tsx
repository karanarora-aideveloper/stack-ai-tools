import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getToolBySlug, getAllTools, getAlternativesForTool } from '@/lib/tools';
import ToolLogo from '@/app/components/ToolLogo';
import { 
  GitCompare, 
  ChevronRight, 
  Star, 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

interface AlternativePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tools = await getAllTools();
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: AlternativePageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Alternatives Not Found | Stack AI Tools',
    };
  }

  const title = `Top 5 Best ${tool.name} Alternatives in 2026 (Tested & Ranked)`;
  const description = `Looking for the best alternatives to ${tool.name}? Explore vetted competitors, compare pricing, free tier options, and performance benchmarks.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://stackaitools.com/alternatives/${tool.slug}`,
      type: 'article'
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
        'item': 'https://stackaitools.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Alternatives',
        'item': 'https://stackaitools.com/alternatives'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': `${tool.name} Alternatives`,
        'item': `https://stackaitools.com/alternatives/${tool.slug}`
      }
    ]
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumbs */}
      <nav className="tool-breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <ChevronRight size={14} />
        <Link href="/alternatives">Alternatives</Link>
        <ChevronRight size={14} />
        <span>{tool.name} Alternatives</span>
      </nav>

      {/* Header */}
      <div className="page-header" style={{ textAlign: 'left', marginBottom: 36 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#818cf8', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
          <GitCompare size={15} />
          <span>Competitor Comparison 2026</span>
        </div>
        <h1 className="page-title" style={{ fontSize: 36 }}>
          Best {tool.name} Alternatives & Competitors
        </h1>
        <p className="page-subtitle" style={{ maxWidth: 850 }}>
          While <strong>{tool.name}</strong> remains a market leader in {tool.category.toLowerCase()}, you may need different pricing structures, localized data privacy, or specialized features. Below are the top 5 vetted alternatives.
        </p>
      </div>

      {/* Comparison Matrix Table */}
      <div className="tool-card-box" style={{ marginBottom: 48 }}>
        <h2 className="tool-box-title">
          <Sparkles size={20} color="#818cf8" />
          Head-to-Head Comparison: {tool.name} vs Top Competitors
        </h2>
        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Software</th>
                <th>Pricing Tier</th>
                <th>Rating</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Baseline Tool */}
              <tr style={{ background: 'rgba(99, 102, 241, 0.08)' }}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <ToolLogo name={tool.name} domain={tool.domain} logoUrl={tool.logoUrl} icon={tool.icon} size={28} />
                    <strong>{tool.name} (Current)</strong>
                  </div>
                </td>
                <td><span className={`tool-price-tag price-${tool.priceClass}`}>{tool.pricingModel}</span></td>
                <td><span style={{ color: '#fbbf24' }}>★ {tool.rating}</span> ({tool.reviewsCount})</td>
                <td>{tool.category}</td>
                <td>
                  <Link href={`/tool/${tool.slug}`} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: 12 }}>
                    View Details
                  </Link>
                </td>
              </tr>

              {/* Alternatives */}
              {alternatives.map((alt) => (
                <tr key={alt.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <ToolLogo name={alt.name} domain={alt.domain} logoUrl={alt.logoUrl} icon={alt.icon} size={28} />
                      <Link href={`/tool/${alt.slug}`} style={{ color: '#fff', fontWeight: 600 }}>
                        {alt.name}
                      </Link>
                    </div>
                  </td>
                  <td><span className={`tool-price-tag price-${alt.priceClass}`}>{alt.pricingModel}</span></td>
                  <td><span style={{ color: '#fbbf24' }}>★ {alt.rating}</span> ({alt.reviewsCount})</td>
                  <td>{alt.category}</td>
                  <td>
                    <a 
                      href={`/go/${alt.slug}`} 
                      target="_blank" 
                      rel="sponsored nofollow noopener"
                      className="btn btn-primary"
                      style={{ padding: '6px 14px', fontSize: 12 }}
                    >
                      Try Free →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deep-Dive Cards for Each Alternative */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginBottom: 48 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>
          Detailed Breakdown of Each Alternative
        </h2>

        {alternatives.map((alt, index) => (
          <div key={alt.id} className="tool-hero" style={{ padding: 32 }}>
            <div className="tool-hero-top">
              <div className="tool-hero-identity">
                <div className="tool-logo-large">
                  <ToolLogo name={alt.name} domain={alt.domain} logoUrl={alt.logoUrl} icon={alt.icon} size={50} />
                </div>
                <div className="tool-title-wrapper">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ background: '#4f46e5', color: '#fff', fontSize: 12, fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>
                      #{index + 1} Alternative
                    </span>
                    <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: 0 }}>
                      {alt.name}
                    </h3>
                  </div>
                  <div className="tool-meta-badges" style={{ marginTop: 8 }}>
                    <span className={`tool-price-tag price-${alt.priceClass}`}>{alt.pricingModel}</span>
                    <div className="tool-rating-box">
                      <Star size={13} className="star-icon" fill="currentColor" />
                      <span className="rating-num">{alt.rating}</span>
                      <span className="reviews-count">({alt.reviewsCount.toLocaleString()} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tool-action-bar">
                <a 
                  href={`/go/${alt.slug}`} 
                  target="_blank" 
                  rel="sponsored nofollow noopener"
                  className="btn-affiliate-primary"
                >
                  <span>Try {alt.name.split(' ')[0]} Free</span>
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>
              {alt.description}
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href={`/tool/${alt.slug}`} style={{ color: '#818cf8', fontSize: 13, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <span>Read Full {alt.name} Review</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="tool-card-box" style={{ marginBottom: 48 }}>
        <h2 className="tool-box-title">
          <HelpCircle size={20} color="#818cf8" />
          Frequently Asked Questions About {tool.name} Alternatives
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {faqs.map((faq, idx) => (
            <div key={idx} style={{ borderBottom: idx !== faqs.length - 1 ? '1px solid rgba(255, 255, 255, 0.06)' : 'none', paddingBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 6 }}>
                {faq.question}
              </h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
