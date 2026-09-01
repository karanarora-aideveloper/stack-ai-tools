import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import VisualToolList from '@/app/components/VisualToolList';
import { 
  getArticleBySlug, 
  getAllArticles, 
  getRelatedArticles, 
  generateArticleContent,
  getVisualToolsForArticle
} from '@/lib/blog';
import { 
  Clock, 
  Calendar, 
  ArrowLeft, 
  Share2, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink,
  HelpCircle,
  TrendingUp,
  Bookmark
} from 'lucide-react';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  const articles = getAllArticles();
  // Pre-render the top 50 jackpot articles at build time, remaining resolve via ISR
  return articles.slice(0, 50).map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found | Stack AI Tools',
    };
  }

  const title = `${article.title} | Stack AI Tools`;
  const description = article.excerpt;

  return {
    title,
    description,
    keywords: [article.primaryKeyword, article.category, 'AI tools 2026', 'review', 'guide'],
    openGraph: {
      title,
      description,
      url: `https://stackaitools.com/blog/${article.slug}`,
      siteName: 'Stack AI Tools',
      images: [
        {
          url: article.imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: ['https://stackaitools.com/about'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [article.imageUrl],
    },
    alternates: {
      canonical: `https://stackaitools.com/blog/${article.slug}`,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const content = generateArticleContent(article);
  const relatedArticles = getRelatedArticles(article.slug, article.category, 3);
  const visualTools = getVisualToolsForArticle(article);

  // Schema.org Article & FAQ JSON-LD
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.excerpt,
    image: [article.imageUrl],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: 'Karan Arora',
      jobTitle: 'Founder & Chief AI Architect',
      url: 'https://stackaitools.com/about'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Stack AI Tools',
      url: 'https://stackaitools.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://stackaitools.com/icon.svg'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://stackaitools.com/blog/${article.slug}`
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <div className="article-post-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Back to Blog Breadcrumb */}
      <nav className="article-breadcrumb-bar">
        <Link href="/blog" className="breadcrumb-back-link">
          <ArrowLeft size={14} />
          <span>Back to All Guides</span>
        </Link>
        <span className="breadcrumb-separator">/</span>
        <Link href="/blog" style={{ textTransform: 'capitalize', color: 'var(--text-secondary)' }}>
          {article.category}
        </Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{article.primaryKeyword}</span>
      </nav>

      {/* Article Header */}
      <header className="article-post-header">
        <div className="article-header-meta">
          <span className="arcade-crt-badge" style={{ color: 'var(--arcade-cyan)', background: 'rgba(0, 240, 255, 0.12)' }}>
            {article.category.toUpperCase()}
          </span>
          <span className="article-stat-pill">
            <Clock size={13} />
            {article.readTime}
          </span>
          <span className="article-stat-pill">
            <Calendar size={13} />
            Updated {article.updatedAt}
          </span>
          <span className="article-stat-pill" style={{ color: 'var(--arcade-gold)' }}>
            <TrendingUp size={13} />
            {article.searchVolume.toLocaleString()} US Searches/mo
          </span>
        </div>

        <h1 className="article-post-title">
          {article.title}
        </h1>

        <p className="article-post-subtitle">
          {article.excerpt}
        </p>

        {/* Author Bio Bar */}
        <div className="article-author-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="author-avatar-md">KA</div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Link href="/about" className="author-name-link">
                  Karan Arora
                </Link>
                <span className="verified-check">✓</span>
              </div>
              <span className="author-role-sub">Founder & Chief AI Architect • Stack AI Tools</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link href="/submit" className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: 12 }}>
              Submit Tool
            </Link>
            <Link href="/" className="btn btn-primary" style={{ padding: '6px 14px', fontSize: 12 }}>
              Explore 85+ Tools
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Unsplash Visual */}
      <div className="article-hero-media">
        <img 
          src={article.imageUrl} 
          alt={article.title}
          className="article-hero-image"
        />
        <div className="article-media-caption">
          <span>Curated Photo via Unsplash • Tested & Benchmarked on <strong>stackaitools.com</strong></span>
        </div>
      </div>

      {/* Article Content Layout */}
      <div className="article-content-grid">
        {/* Main Content Body */}
        <article className="article-main-body">
          {/* Key Takeaways Box */}
          <div className="article-takeaways-box">
            <div className="takeaways-header">
              <Sparkles size={18} color="var(--arcade-gold)" />
              <h3>Key Takeaways & Executive Summary</h3>
            </div>
            <ul className="takeaways-list">
              {content.takeaways.map((point, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={16} color="var(--arcade-cyan)" className="takeaway-check" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 1: Intro */}
          <section className="article-section">
            <p className="article-intro-text">
              {content.intro}
            </p>
          </section>

          {/* The World's Cleanest Visual Tool List with Use Case Match Probability */}
          <VisualToolList 
            tools={visualTools}
            title={`Top Rated Candidates for "${article.primaryKeyword}"`}
            subtitle="Verified against real-world benchmark metrics, enterprise latency, and use case match probability."
          />

          {/* Section 2: Paradigm Shift */}
          <section className="article-section">
            <h2>{content.sections[0].heading}</h2>
            <p>{content.sections[0].content}</p>
          </section>

          {/* Callout Box */}
          <div className="article-callout-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Bookmark size={18} color="var(--arcade-magenta)" />
              <h4 style={{ margin: 0, color: '#fff' }}>Recommended Tool of the Month</h4>
            </div>
            <p style={{ margin: '0 0 14px', color: '#cbd5e1', fontSize: 14 }}>
              Ready to deploy production-grade intelligence? Compare full feature breakdowns and pricing on our live directory.
            </p>
            <Link href={`/category/${article.category}`} className="btn btn-primary" style={{ display: 'inline-flex', padding: '8px 16px', fontSize: 13 }}>
              <span>View Top {article.category.toUpperCase()} Tools →</span>
            </Link>
          </div>

          {/* Section 3: Verified Benchmarks */}
          <section className="article-section">
            <h2>{content.sections[1].heading}</h2>
            <p>{content.sections[1].content}</p>
            
            {/* Dynamic Comparison Matrix */}
            <div className="comparison-table-wrapper">
              <table className="retro-benchmark-table">
                <thead>
                  <tr>
                    <th>Feature Dimension</th>
                    <th>Frontier Standard</th>
                    <th>Legacy Incumbents</th>
                    <th>Verdict</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Latency & TTFT</strong></td>
                    <td>&lt; 350ms (Ultra-Fast)</td>
                    <td>1.2s - 2.8s</td>
                    <td><span className="badge-win">WINNER</span></td>
                  </tr>
                  <tr>
                    <td><strong>Multi-Modal Capabilities</strong></td>
                    <td>Native Audio/Video/Code</td>
                    <td>Add-on Plugins</td>
                    <td><span className="badge-win">WINNER</span></td>
                  </tr>
                  <tr>
                    <td><strong>Autonomous Agency</strong></td>
                    <td>Self-Correcting Plan Loops</td>
                    <td>Static Generation</td>
                    <td><span className="badge-win">WINNER</span></td>
                  </tr>
                  <tr>
                    <td><strong>US Enterprise Security</strong></td>
                    <td>SOC2, HIPAA, Zero-Retention</td>
                    <td>Variable</td>
                    <td><span className="badge-win">WINNER</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Implementation */}
          <section className="article-section">
            <h2>{content.sections[2].heading}</h2>
            <p>{content.sections[2].content}</p>
          </section>

          {/* Section 5: Pricing */}
          <section className="article-section">
            <h2>{content.sections[3].heading}</h2>
            <p>{content.sections[3].content}</p>
          </section>

          {/* FAQ Section */}
          <section className="article-faqs-section">
            <div className="faqs-header">
              <HelpCircle size={22} color="var(--arcade-cyan)" />
              <h2>Frequently Asked Questions</h2>
            </div>

            <div className="faqs-list">
              {content.faqs.map((faq, idx) => (
                <div key={idx} className="faq-accordion-item">
                  <h3 className="faq-question">{faq.question}</h3>
                  <p className="faq-answer">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Author Box */}
          <div className="author-bio-footer">
            <div className="author-avatar-lg">KA</div>
            <div>
              <h3 style={{ margin: '0 0 6px', color: '#fff', fontSize: 18 }}>
                Written by Karan Arora
              </h3>
              <p style={{ margin: '0 0 10px', color: '#94a3b8', fontSize: 13.5, lineHeight: 1.6 }}>
                Karan Arora is the Founder and Chief AI Architect behind <strong>Stack AI Tools</strong>. He evaluates autonomous agents, multi-modal generative engines, and developer infrastructure to help founders and engineering teams deploy verified artificial intelligence.
              </p>
              <Link href="/about" className="article-read-link" style={{ fontSize: 13 }}>
                <span>Read Karan&apos;s Full Bio & Background →</span>
              </Link>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="article-sidebar">
          {/* Quick Directory CTA */}
          <div className="sidebar-card">
            <span className="retro-arcade-badge" style={{ marginBottom: 12, display: 'inline-block' }}>ARCADE DIRECTORY</span>
            <h4 style={{ color: '#fff', margin: '0 0 8px', fontSize: 16 }}>Explore 85+ Tested Tools</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, margin: '0 0 16px', lineHeight: 1.5 }}>
              Browse hand-vetted tools with verified pricing tiers, alternatives, and prompt spellbooks.
            </p>
            <Link href="/" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <span>Enter Game Lobby</span>
            </Link>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="sidebar-card">
              <h4 style={{ color: '#fff', margin: '0 0 14px', fontSize: 15 }}>Related {article.category} Guides</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {relatedArticles.map((rel) => (
                  <Link key={rel.slug} href={`/blog/${rel.slug}`} className="sidebar-related-item">
                    <img src={rel.imageUrl} alt={rel.title} className="sidebar-rel-thumb" />
                    <div>
                      <h5 className="sidebar-rel-title">{rel.title}</h5>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{rel.readTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
