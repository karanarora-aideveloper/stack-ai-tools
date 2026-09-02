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
  HelpCircle,
  CheckCircle2,
  Zap,
  TrendingUp
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
  const title = `Top AI ${capitalized} Tools & Autonomous Agents (2026) | Stack AI Tools`;
  const description = `Explore the top-rated AI ${capitalized.toLowerCase()} software, autonomous coding agents, and frontier models. Compare verified ratings, pricing tiers, pros & cons, and free access.`;

  return {
    title,
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
    <div className="category-page-container">
      {/* Schema.org Injections */}
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
        <span style={{ color: 'var(--arcade-cyan)', fontWeight: 600 }}>{categoryName}</span>
      </nav>

      {/* Hero Banner */}
      <header className="category-hero-header">
        <div className="category-hero-pill">
          <Sparkles size={14} color="#00f0ff" />
          <span>Curated Category Leaderboard</span>
        </div>

        <h1 className="category-hero-title">
          Top AI {categoryName} Software & Agents (2026)
        </h1>

        <p className="category-hero-subtitle">
          {categoryDescriptions[category.toLowerCase()] || `Explore ${tools.length} hand-vetted ${categoryName.toLowerCase()} solutions benchmarked for accuracy, speed, and production integration.`}
        </p>

        {/* Stats Pill Row */}
        <div className="category-stats-bar">
          <div className="cat-stat-chip">
            <span className="stat-highlight">{tools.length}</span>
            <span>Vetted Tools</span>
          </div>
          <span className="stat-separator">•</span>
          <div className="cat-stat-chip">
            <span className="stat-highlight" style={{ color: '#34d399' }}>{freeToolsCount}</span>
            <span>Free Tiers Available</span>
          </div>
          <span className="stat-separator">•</span>
          <div className="cat-stat-chip" style={{ color: '#34d399' }}>
            <ShieldCheck size={14} />
            <span>Verified 2026 Audit</span>
          </div>
        </div>

        {/* Quick Category Switcher Tabs */}
        <div className="category-switcher-scroll">
          {allCategories.map((cat) => {
            const isActive = cat.toLowerCase() === category.toLowerCase();
            return (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase()}`}
                className={`category-switch-tab ${isActive ? 'active' : ''}`}
              >
                <span>{cat}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* Tools Grid */}
      <main className="category-tools-grid">
        {tools.map((tool) => (
          <div key={tool.id} className="category-tool-card">
            {/* Card Header */}
            <div className="cat-card-header">
              <div className="cat-card-identity">
                <ToolLogo 
                  name={tool.name}
                  domain={tool.domain}
                  logoUrl={tool.logoUrl}
                  icon={tool.icon}
                  size={46}
                />
                <div className="cat-card-titles">
                  <h3 className="cat-card-name">
                    <Link href={`/tool/${tool.slug}`}>
                      {tool.name}
                    </Link>
                  </h3>
                  <div className="cat-card-badges">
                    <span className="tool-category-tag">{tool.category}</span>
                    <span className={`tool-price-tag price-${tool.priceClass}`}>
                      {tool.pricingModel}
                    </span>
                  </div>
                </div>
              </div>

              <div className="cat-card-rating">
                <Star size={13} className="star-icon" fill="currentColor" />
                <span className="rating-val">{tool.rating.toFixed(1)}</span>
                <span className="review-val">({tool.reviewsCount.toLocaleString()})</span>
              </div>
            </div>

            {/* Editorial / Zapier Pill if available */}
            {tool.zapierVerdict && (
              <div className="cat-card-verdict">
                <ShieldCheck size={12} color="#fbbf24" />
                <span>Zapier & Editorial Verified</span>
              </div>
            )}

            {/* Description */}
            <p className="cat-card-desc">
              {tool.description}
            </p>

            {/* Tags List */}
            <div className="cat-card-tags">
              {tool.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="tag-pill">#{tag}</span>
              ))}
            </div>

            {/* Card Footer Actions */}
            <div className="cat-card-footer">
              <Link href={`/tool/${tool.slug}`} className="cat-btn-review">
                <span>In-depth Review</span>
              </Link>
              <a 
                href={`/go/${tool.slug}`} 
                target="_blank" 
                rel="sponsored nofollow noopener"
                className="cat-btn-try"
              >
                <span>Try Free</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        ))}
      </main>

      {/* FAQ & Buying Guide */}
      <section className="category-faq-section">
        <div className="tool-card-box">
          <h2 className="tool-box-title">
            <HelpCircle size={20} color="#00f0ff" />
            Frequently Asked Questions: {categoryName} AI Software
          </h2>
          <div className="category-faq-list">
            {faqs.map((faq, idx) => (
              <div key={idx} className="category-faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

