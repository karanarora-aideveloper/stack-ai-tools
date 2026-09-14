'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/blog';
import { 
  Search, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  TrendingUp,
  Video,
  Code2,
  Mic,
  Palette,
  Bot,
  PenTool,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

interface BlogViewProps {
  articles: Article[];
  initialPage?: number;
  initialCategory?: string;
  initialQuery?: string;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  all: <Sparkles size={14} />,
  video: <Video size={14} />,
  code: <Code2 size={14} />,
  audio: <Mic size={14} />,
  design: <Palette size={14} />,
  automation: <Bot size={14} />,
  writing: <PenTool size={14} />
};

export default function BlogView({ 
  articles, 
  initialPage = 1, 
  initialCategory = 'all', 
  initialQuery = '' 
}: BlogViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const articlesPerPage = 12;

  const categories = ['all', 'video', 'code', 'audio', 'design', 'automation', 'writing'];

  // Sync state if initial props change (e.g. browser navigation)
  useEffect(() => {
    if (initialPage) setCurrentPage(initialPage);
  }, [initialPage]);

  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchCat = selectedCategory === 'all' || a.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchQuery = !searchQuery || 
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.primaryKeyword.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [articles, selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const displayedArticles = useMemo(() => {
    const start = (currentPage - 1) * articlesPerPage;
    return filteredArticles.slice(start, start + articlesPerPage);
  }, [filteredArticles, currentPage]);

  const featuredArticle = articles.find((a) => a.featured) || articles[0];

  const getPageUrl = (page: number, cat = selectedCategory, q = searchQuery) => {
    const params = new URLSearchParams();
    if (cat && cat !== 'all') params.set('category', cat);
    if (page > 1) params.set('page', String(page));
    if (q) params.set('q', q);
    const qs = params.toString();
    return qs ? `/blog?${qs}` : '/blog';
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Generate clean pagination items with smart jump links for Googlebot crawl efficiency
  const paginationItems = useMemo(() => {
    if (totalPages <= 1) return [];

    const pageSet = new Set<number>();
    
    // Always include first 2 pages
    pageSet.add(1);
    if (totalPages >= 2) pageSet.add(2);

    // Current neighborhood
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      pageSet.add(i);
    }

    // High-value jump hops so Googlebot can traverse 10k articles in <= 3 clicks
    const jumpCheckpoints = [10, 25, 50, 100, 250, 500];
    jumpCheckpoints.forEach((jump) => {
      if (jump < totalPages && jump > 1) {
        pageSet.add(jump);
      }
    });

    // Always include last page
    pageSet.add(totalPages);

    const sorted = Array.from(pageSet).sort((a, b) => a - b);
    const result: (number | 'ellipsis')[] = [];

    for (let i = 0; i < sorted.length; i++) {
      if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
        result.push('ellipsis');
      }
      result.push(sorted[i]);
    }

    return result;
  }, [totalPages, currentPage]);

  return (
    <div className="blog-hub-container">
      {/* Blog Hero */}
      <header className="blog-hero">
        <div className="modern-hero-badge" style={{ margin: '0 auto 16px' }}>
          <span className="badge-sparkle">✨</span>
          <span>FRONTIER AI RESEARCH • 10,000+ BENCHMARKED GUIDES</span>
        </div>
        <h1 className="blog-hero-title">
          Frontier AI <span className="modern-hero-gradient">Research & Guides</span>
        </h1>
        <p className="blog-hero-desc">
          Deep-dive benchmark audits, model showdowns, and architectural playbooks to help founders and engineering leaders deploy production intelligence.
        </p>

        {/* Search Bar */}
        <div className="modern-search-wrapper" style={{ maxWidth: 640, margin: '24px auto 20px' }}>
          <div className="modern-search-bar">
            <Search size={18} className="search-icon-svg" />
            <input 
              type="text"
              className="modern-search-input"
              placeholder="Search 10,000+ AI guides, Claude updates, and tutorials..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
            {searchQuery && (
              <button 
                className="search-clear-btn" 
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills (Crawlable HTML Links) */}
        <div className="modern-categories-scroll">
          <div className="modern-categories-list">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <Link
                  key={cat}
                  href={getPageUrl(1, cat, searchQuery)}
                  className={`category-pill-btn ${isActive ? 'active' : ''}`}
                  onClick={() => handleCategorySelect(cat)}
                  style={{ textDecoration: 'none' }}
                >
                  {CATEGORY_ICONS[cat]}
                  <span style={{ textTransform: 'capitalize' }}>{cat === 'all' ? 'All Guides' : cat}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Featured Headline Article (Only on page 1 with no search filter) */}
      {currentPage === 1 && !searchQuery && selectedCategory === 'all' && featuredArticle && (
        <section className="featured-article-card" aria-label="Featured Story">
          <div className="featured-article-grid">
            <div className="featured-img-container">
              <img 
                src={featuredArticle.imageUrl} 
                alt={featuredArticle.title}
                className="featured-article-img"
              />
              <span className="featured-badge-pill">★ TOP BENCHMARK</span>
            </div>

            <div className="featured-article-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span className="modern-cat-tag">
                  {featuredArticle.category.toUpperCase()}
                </span>
                <span style={{ fontSize: 13, color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={13} />
                  {featuredArticle.readTime}
                </span>
                <span style={{ fontSize: 13, color: 'var(--accent-amber)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <TrendingUp size={13} />
                  {featuredArticle.searchVolume.toLocaleString()} US Vol/mo
                </span>
              </div>

              <h2 className="featured-article-title">
                <Link href={`/blog/${featuredArticle.slug}`}>
                  {featuredArticle.title}
                </Link>
              </h2>

              <p className="featured-article-excerpt">
                {featuredArticle.excerpt}
              </p>

              <div className="featured-article-footer">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="author-avatar-sm" style={{ color: '#fff' }}>
                    <Sparkles size={14} />
                  </div>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-strong)', display: 'block' }}>Stack AI Tools</span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Independently Verified</span>
                  </div>
                </div>

                <Link href={`/blog/${featuredArticle.slug}`} className="btn btn-primary" style={{ padding: '8px 18px', fontSize: 13 }}>
                  <span>Read Full Guide</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid of Articles */}
      <section className="blog-articles-grid" aria-label="Articles Feed">
        <div className="blog-results-header">
          <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            Showing <strong>{filteredArticles.length}</strong> guides &amp; benchmarks
          </span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Page {currentPage} of {totalPages || 1}
          </span>
        </div>

        {displayedArticles.length === 0 ? (
          <div className="modern-empty-state">
            <p>No articles found matching &ldquo;{searchQuery}&rdquo;.</p>
            <button className="btn btn-secondary" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="articles-cards-layout">
            {displayedArticles.map((article) => (
              <article key={article.slug} className="article-card-retro">
                <div className="article-card-media">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="article-card-thumb"
                    loading="lazy"
                  />
                  <span className="article-category-chip">
                    {article.category}
                  </span>
                </div>

                <div className="article-card-content">
                  <div className="article-meta-row">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={12} />
                      {article.readTime}
                    </span>
                    <span className="article-kd-badge">
                      KD {article.difficulty}
                    </span>
                  </div>

                  <h3 className="article-card-title">
                    <Link href={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="article-card-desc">
                    {article.excerpt}
                  </p>

                  <div className="article-card-bottom">
                    <div className="article-author-row">
                      <span className="author-dot"></span>
                      <span>Stack AI Tools</span>
                    </div>

                    <Link href={`/blog/${article.slug}`} className="article-read-link">
                      <span>Read Guide</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Crawlable Pagination Bar with Real Next.js HTML Links */}
        {totalPages > 1 && (
          <div className="blog-pagination">
            {currentPage > 1 ? (
              <Link 
                href={getPageUrl(currentPage - 1)}
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                style={{ textDecoration: 'none' }}
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </Link>
            ) : (
              <span className="pagination-btn" style={{ opacity: 0.35, cursor: 'not-allowed' }}>
                <ChevronLeft size={16} />
                <span>Previous</span>
              </span>
            )}

            <div className="pagination-pages" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
              {paginationItems.map((item, idx) => {
                if (item === 'ellipsis') {
                  return (
                    <span key={`ellipsis-${idx}`} style={{ padding: '0 4px', color: 'var(--text-muted)' }}>
                      …
                    </span>
                  );
                }

                const pageNum = item;
                const isCurrent = currentPage === pageNum;

                return (
                  <Link
                    key={pageNum}
                    href={getPageUrl(pageNum)}
                    className={`pagination-num ${isCurrent ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNum)}
                    style={{ textDecoration: 'none' }}
                    aria-current={isCurrent ? 'page' : undefined}
                  >
                    {pageNum}
                  </Link>
                );
              })}
            </div>

            {currentPage < totalPages ? (
              <Link 
                href={getPageUrl(currentPage + 1)}
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                style={{ textDecoration: 'none' }}
                aria-label="Next page"
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </Link>
            ) : (
              <span className="pagination-btn" style={{ opacity: 0.35, cursor: 'not-allowed' }}>
                <span>Next</span>
                <ChevronRight size={16} />
              </span>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
