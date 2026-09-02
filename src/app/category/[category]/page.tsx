import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getToolsByCategory, getAllCategories } from '@/lib/tools';
import ToolLogo from '@/app/components/ToolLogo';
import { 
  Star, 
  ExternalLink, 
  ChevronRight, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({
    category: cat.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const capitalized = category.charAt(0).toUpperCase() + category.slice(1);
  const title = `Best AI ${capitalized} Tools (2026) | Vetted Software & Agents`;
  const description = `Discover the top-rated AI ${capitalized.toLowerCase()} software, autonomous agents, and models tested for US professionals. Compare pricing, reviews, and free tiers.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://stackaitools.com/category/${category.toLowerCase()}`,
      type: 'website'
    }
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const tools = await getToolsByCategory(category);

  if (!tools || tools.length === 0) {
    notFound();
  }

  const categoryName = tools[0].category;

  const faqs = [
    {
      question: `What is the best AI tool for ${categoryName.toLowerCase()} in 2026?`,
      answer: `The top-rated tool based on US user reviews and latency benchmarks is ${tools[0].name}, currently holding a ${tools[0].rating}/5.0 score with over ${tools[0].reviewsCount.toLocaleString()} verified reviews.`
    },
    {
      question: `Are there free AI ${categoryName.toLowerCase()} tools available?`,
      answer: `Yes, multiple tools in this directory feature generous free tiers or free trials, including ${tools.filter(t => t.priceClass === 'free' || t.priceClass === 'freemium').map(t => t.name.split(' ')[0]).slice(0, 3).join(', ')}.`
    },
    {
      question: `How does Stack AI Tools verify ${categoryName.toLowerCase()} software?`,
      answer: `Every tool listed on stackaitools.com undergoes continuous evaluation for model accuracy, latency, pricing honesty, and data security compliance.`
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
        'name': 'Categories',
        'item': 'https://stackaitools.com/categories'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': categoryName,
        'item': `https://stackaitools.com/category/${category.toLowerCase()}`
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
        <Link href="/categories">Categories</Link>
        <ChevronRight size={14} />
        <span>{categoryName}</span>
      </nav>

      {/* Category Header */}
      <div className="page-header" style={{ textAlign: 'left', marginBottom: 40 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#818cf8', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
          <Layers size={15} />
          <span>Curated Software Category</span>
        </div>
        <h1 className="page-title" style={{ fontSize: 36 }}>
          Top AI {categoryName} Tools & Agents (2026)
        </h1>
        <p className="page-subtitle" style={{ maxWidth: 800 }}>
          Explore {tools.length} hand-vetted {categoryName.toLowerCase()} solutions. Benchmarked for accuracy, pricing transparency, and high-velocity workflow integration.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="tools-grid">
        {tools.map((tool, index) => (
          <div key={tool.id} className="tool-card" style={{ animationDelay: `${index * 0.05}s` }}>
            <div className="tool-card-header">
              <div className="tool-header-left">
                <ToolLogo 
                  name={tool.name}
                  domain={tool.domain}
                  logoUrl={tool.logoUrl}
                  icon={tool.icon}
                  size={44}
                />
                <div>
                  <h3 className="tool-name">
                    <Link href={`/tool/${tool.slug}`} style={{ color: 'inherit' }}>
                      {tool.name}
                    </Link>
                  </h3>
                  <div className="tool-meta">
                    <span className="tool-category-tag">{tool.category}</span>
                    <span className={`tool-price-tag price-${tool.priceClass}`}>
                      {tool.pricingModel}
                    </span>
                  </div>
                </div>
              </div>
              <div className="tool-rating-box">
                <Star size={13} className="star-icon" fill="currentColor" />
                <span className="rating-num">{tool.rating}</span>
                <span className="reviews-count">({tool.reviewsCount.toLocaleString()})</span>
              </div>
            </div>

            {tool.zapierVerdict && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#fbbf24', background: 'rgba(251, 191, 36, 0.1)', padding: '2px 8px', borderRadius: 6, marginBottom: 8, border: '1px solid rgba(251, 191, 36, 0.2)' }}>
                <ShieldCheck size={11} />
                <span>Zapier & Editorial Reviewed</span>
              </div>
            )}

            <p className="tool-desc">{tool.description}</p>

            <div className="tool-tags">
              {tool.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="tag-pill">#{tag}</span>
              ))}
            </div>

            <div className="tool-card-footer">
              <Link href={`/tool/${tool.slug}`} className="btn btn-secondary" style={{ padding: '8px 14px', fontSize: 13 }}>
                <span>In-depth Review</span>
              </Link>
              <a 
                href={`/go/${tool.slug}`} 
                target="_blank" 
                rel="sponsored nofollow noopener"
                className="btn btn-primary"
                style={{ padding: '8px 16px', fontSize: 13 }}
              >
                <span>Try Free</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ & Buying Guide */}
      <div style={{ marginTop: 60, display: 'grid', gridTemplateColumns: '1fr', gap: 32 }}>
        <div className="tool-card-box">
          <h2 className="tool-box-title">
            <HelpCircle size={20} color="#818cf8" />
            Frequently Asked Questions: {categoryName} AI Software
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
    </div>
  );
}
