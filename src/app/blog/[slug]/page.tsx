import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  getArticleBySlug, 
  getAllArticles, 
  generateArticleContent, 
  getRelatedArticles,
  getVisualToolsForArticle
} from '@/lib/blog';
import VisualToolList from '@/app/components/VisualToolList';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  TrendingUp, 
  ArrowLeft, 
  Sparkles, 
  Share2, 
  Bookmark, 
  HelpCircle,
  Code2,
  Terminal,
  ShieldCheck,
  Zap,
  Award,
  BookOpen
} from 'lucide-react';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  const articles = await getAllArticles();
  // Pre-render the top 50 articles at build time, remaining resolve via ISR
  return articles.slice(0, 50).map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: { absolute: 'Article Not Found | Stack AI Tools' },
    };
  }

  const title = article.title;
  const description = article.excerpt;

  return {
    // Long-tail article titles already carry the full keyword phrase and average ~50 chars;
    // bypass the root layout's " | Stack AI Tools" template (absolute) so they stay under
    // Google's ~60-char display limit instead of averaging ~67 chars with the suffix appended.
    title: { absolute: title },
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
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const [content, relatedArticles, visualTools] = await Promise.all([
    generateArticleContent(article),
    getRelatedArticles(article.slug, article.category, 4),
    getVisualToolsForArticle(article)
  ]);

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
      '@type': 'Organization',
      name: 'Stack AI Tools',
      url: 'https://stackaitools.com'
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
          <span>Back to 10,000+ Research Guides</span>
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
          <span className="modern-cat-tag">
            {article.category.toUpperCase()}
          </span>
          <span className="article-stat-pill" style={{ borderColor: 'rgba(56, 189, 248, 0.4)', color: 'var(--color-info)' }}>
            <Zap size={13} />
            {content.telemetryDate}
          </span>
          <span className="article-stat-pill">
            <Clock size={13} />
            {article.readTime}
          </span>
          <span className="article-stat-pill">
            <Calendar size={13} />
            Updated {article.updatedAt}
          </span>
          <span className="article-stat-pill" style={{ color: 'var(--accent-amber)' }}>
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
            <div className="author-avatar-md">
              <Sparkles size={18} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Link href="/about" className="author-name-link">
                  Stack AI Tools
                </Link>
                <span className="verified-check">✓</span>
              </div>
              <span className="author-role-sub">Independently Tested & Verified</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link href="/submit" className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: 12 }}>
              Submit Tool
            </Link>
            <Link href="/" className="btn btn-primary" style={{ padding: '6px 14px', fontSize: 12 }}>
              Explore 222+ Frontier Tools
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
          <span>High-Resolution Visual via Unsplash • Audited & Benchmarked on <strong>stackaitools.com</strong></span>
        </div>
      </div>

      {/* Article Content Layout */}
      <div className="article-content-grid">
        {/* Main Content Body */}
        <article className="article-main-body">
          {/* Key Takeaways Box */}
          <div className="article-takeaways-box">
            <div className="takeaways-header">
              <Sparkles size={18} color="var(--accent-amber)" />
              <h3>Key Takeaways ({content.telemetryDate})</h3>
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

          {/* Intro Section */}
          <section className="article-section">
            <p className="article-intro-text">
              {content.intro}
            </p>
          </section>

          {/* Visual Tool Leaderboard */}
          <VisualToolList 
            tools={visualTools}
            title={`Audited Frontier Candidates for "${article.primaryKeyword}"`}
            subtitle="Benchmarked on real-world latency, context retention %, and US enterprise compliance."
          />

          {/* Bidirectional Internal Linking Hub */}
          {content.matchedTool && (
            <div style={{ margin: '28px 0', padding: '16px 20px', background: 'rgba(2, 132, 199, 0.06)', border: '1px solid rgba(2, 132, 199, 0.22)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <span style={{ fontSize: 11, color: 'var(--color-info)', fontWeight: 700, textTransform: 'uppercase' }}>VERIFIED DIRECTORY HUB</span>
                <h4 style={{ margin: '3px 0 0', color: 'var(--text-strong)', fontSize: 15 }}>{content.matchedTool.name} In-Depth Benchmark Profile</h4>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Link href={`/tool/${content.matchedTool.slug}`} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: 12 }}>
                  Tool Profile →
                </Link>
                <Link href={`/alternatives/${content.matchedTool.slug}`} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: 12 }}>
                  Top Alternatives →
                </Link>
                <Link href={`/category/${article.category}`} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: 12 }}>
                  All {article.category.toUpperCase()} Tools →
                </Link>
              </div>
            </div>
          )}

          {/* Render Deep Content Sections */}
          {content.sections.map((sec, idx) => (
            <section key={idx} id={`section-${idx + 1}`} className="article-section" style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--text-strong)', marginBottom: 14 }}>
                {sec.heading}
              </h2>

              {/* Direct Answer Box for Google AI Overviews & Featured Snippets */}
              {sec.directAnswer && (
                <div style={{ background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(99, 102, 241, 0.05))', borderLeft: '3px solid var(--arcade-cyan)', padding: '12px 16px', borderRadius: '0 8px 8px 0', margin: '0 0 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, fontSize: 11, color: 'var(--color-info)', fontWeight: 700, textTransform: 'uppercase' }}>
                    <Zap size={12} />
                    <span>Quick Summary & Direct Answer</span>
                  </div>
                  <p style={{ margin: 0, color: 'var(--text-strong)', fontSize: '0.96rem', fontWeight: 500, lineHeight: 1.6 }}>
                    {sec.directAnswer}
                  </p>
                </div>
              )}

              <p style={{ color: 'var(--text-primary)', lineHeight: 1.75, fontSize: '1.02rem', marginBottom: 16 }}>
                {sec.content}
              </p>

              {/* Subsections if present */}
              {sec.subsections && sec.subsections.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
                  {sec.subsections.map((sub, sIdx) => (
                    <div key={sIdx} style={{ background: 'rgba(2, 132, 199, 0.05)', borderLeft: '3px solid var(--arcade-cyan)', padding: '14px 18px', borderRadius: '0 8px 8px 0' }}>
                      <h4 style={{ color: 'var(--text-strong)', margin: '0 0 6px', fontSize: '1.05rem', fontWeight: 600 }}>
                        {sub.title}
                      </h4>
                      <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.94rem', lineHeight: 1.65 }}>
                        {sub.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Inline Thematic Visual */}
              {sec.visualImageUrl && (
                <div style={{ margin: '24px 0', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(var(--ink-tint-rgb), 0.1)' }}>
                  <img 
                    src={sec.visualImageUrl} 
                    alt={sec.visualCaption || sec.heading} 
                    style={{ width: '100%', height: 'auto', maxHeight: 420, objectFit: 'cover', display: 'block' }} 
                  />
                  {sec.visualCaption && (
                    <div style={{ background: 'rgba(0, 0, 0, 0.6)', padding: '8px 14px', fontSize: 12, color: '#94a3b8' }}>
                      {sec.visualCaption}
                    </div>
                  )}
                </div>
              )}

              {/* Section 4: Production Code Snippet */}
              {idx === 3 && content.codeSnippet && (
                <div style={{ marginTop: 20, background: '#0a0f1d', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: 10, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: 'rgba(var(--ink-tint-rgb), 0.8)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Terminal size={15} color="#38bdf8" />
                      <span style={{ fontSize: 13, fontFamily: 'monospace', color: '#e2e8f0', fontWeight: 600 }}>{content.codeSnippet.filename}</span>
                    </div>
                    <span style={{ fontSize: 11, background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '2px 8px', borderRadius: 4, textTransform: 'uppercase', fontWeight: 600 }}>
                      {content.codeSnippet.language}
                    </span>
                  </div>
                  <pre style={{ margin: 0, padding: 18, overflowX: 'auto', fontSize: 13, lineHeight: 1.6, color: '#f1f5f9', fontFamily: 'monospace' }}>
                    <code>{content.codeSnippet.code}</code>
                  </pre>
                  <div style={{ padding: '8px 16px', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: 12, color: '#94a3b8' }}>
                    {content.codeSnippet.description}
                  </div>
                </div>
              )}

              {/* Section 5: Visual Prompt Template */}
              {idx === 4 && content.promptTemplate && (
                <div style={{ marginTop: 20, background: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: 10, padding: 18 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Sparkles size={16} color="#a855f7" />
                      <h4 style={{ margin: 0, color: 'var(--text-strong)', fontSize: '0.98rem' }}>{content.promptTemplate.title}</h4>
                    </div>
                    <span style={{ fontSize: 11, background: 'rgba(168, 85, 247, 0.15)', color: '#7e22ce', padding: '2px 8px', borderRadius: 4 }}>
                      {content.promptTemplate.model}
                    </span>
                  </div>
                  <pre style={{ background: '#090d16', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 6, padding: 14, overflowX: 'auto', fontSize: 12.5, color: '#c4b5fd', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.55 }}>
                    {content.promptTemplate.prompt}
                  </pre>
                  <div style={{ marginTop: 10, fontSize: 11.5, color: '#7c3aed' }}>
                    ⚙️ <strong>Parameters:</strong> {content.promptTemplate.parameters}
                  </div>
                </div>
              )}

              {/* Section 6: Audited Comparison Matrix Table */}
              {idx === 5 && content.comparisonMatrix && (
                <div className="comparison-table-wrapper" style={{ marginTop: 20 }}>
                  <table className="retro-benchmark-table">
                    <thead>
                      <tr>
                        {content.comparisonMatrix.headers.map((h, hIdx) => (
                          <th key={hIdx}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {content.comparisonMatrix.rows.map((r, rIdx) => (
                        <tr key={rIdx}>
                          <td><strong>{r.dimension}</strong></td>
                          <td style={{ color: 'var(--arcade-cyan)' }}>{r.frontier}</td>
                          <td style={{ color: 'var(--text-muted)' }}>{r.legacy}</td>
                          <td><span className="badge-win">{r.verdict}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}

          {/* Editorial Verdict Callout Box */}
          <div style={{ margin: '36px 0', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.07), rgba(255, 255, 255, 0.4))', border: '1px solid rgba(217, 119, 6, 0.3)', borderRadius: 12, padding: 24, position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Award size={22} color="#f59e0b" />
                <h3 style={{ margin: 0, color: 'var(--text-strong)', fontSize: '1.2rem', fontWeight: 700 }}>
                  Editorial Verdict & Verification Index
                </h3>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ background: 'rgba(245, 158, 11, 0.18)', color: '#b45309', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700 }}>
                  SCORE: {content.editorialVerdict.score}
                </span>
                <span style={{ background: 'rgba(16, 185, 129, 0.18)', color: 'var(--color-success)', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700 }}>
                  {content.editorialVerdict.recommendation}
                </span>
              </div>
            </div>
            <p style={{ fontStyle: 'italic', color: 'var(--text-primary)', margin: '0 0 14px', fontSize: '1.02rem', lineHeight: 1.65 }}>
              {content.editorialVerdict.quote}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-muted)' }}>
              <ShieldCheck size={14} color="#10b981" />
              <span>Independently audited & benchmarked by <strong>Stack AI Tools</strong> • No sponsored manipulation</span>
            </div>
          </div>

          {/* Interactive FAQ Section */}
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
            <div className="author-avatar-lg">
              <Sparkles size={22} />
            </div>
            <div>
              <h3 style={{ margin: '0 0 6px', color: 'var(--text-strong)', fontSize: 18 }}>
                Written & Verified by Stack AI Tools
              </h3>
              <p style={{ margin: '0 0 10px', color: 'var(--text-muted)', fontSize: 13.5, lineHeight: 1.6 }}>
                Stack AI Tools independently evaluates frontier models, autonomous coding agents, multi-modal generative engines, and developer infrastructure to help founders and engineering teams deploy verified artificial intelligence.
              </p>
              <Link href="/about" className="article-read-link" style={{ fontSize: 13 }}>
                <span>Read Our Editorial Standards →</span>
              </Link>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="article-sidebar">
          {/* Table of Contents */}
          <div className="sidebar-card" style={{ position: 'sticky', top: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <BookOpen size={16} color="var(--arcade-cyan)" />
              <h4 style={{ color: 'var(--text-strong)', margin: 0, fontSize: 15 }}>Table of Contents</h4>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12.5 }}>
              {content.sections.map((s, idx) => (
                <a 
                  key={idx} 
                  href={`#section-${idx + 1}`}
                  style={{ color: 'var(--text-muted)', textDecoration: 'none', padding: '4px 6px', borderRadius: 4, transition: 'all 0.15s ease' }}
                  className="toc-link"
                >
                  {s.heading.split(':')[0]}
                </a>
              ))}
            </nav>

            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(15,23,42,0.08)' }}>
              <span className="modern-badge-pill" style={{ marginBottom: 10, display: 'inline-flex' }}>FRONTIER DIRECTORY</span>
              <h5 style={{ color: 'var(--text-strong)', margin: '0 0 6px', fontSize: 14 }}>222+ Vetted AI Tools</h5>
              <p style={{ color: 'var(--text-secondary)', fontSize: 12, margin: '0 0 12px', lineHeight: 1.5 }}>
                Browse hand-vetted frontier models with verified pricing tiers, capability benchmarks, and alternatives.
              </p>
              <Link href="/" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 12.5 }}>
                <span>Explore Directory →</span>
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="sidebar-card" style={{ marginTop: 20 }}>
              <h4 style={{ color: 'var(--text-strong)', margin: '0 0 14px', fontSize: 15 }}>Related {article.category} Guides</h4>
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
