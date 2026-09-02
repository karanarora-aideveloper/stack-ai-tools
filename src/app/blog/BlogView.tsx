'use client';

import React, { useState, useMemo } from 'react';
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

export default function BlogView({ articles }: BlogViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const articlesPerPage = 12;

  const categories = ['all', 'video', 'code', 'audio', 'design', 'automation', 'writing'];

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

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="blog-hub-container">
      {/* Blog Hero */}
      <header className="blog-hero">
        <div className="modern-hero-badge" style={{ margin: '0 auto 16px' }}>
          <span className="badge-sparkle">✨</span>
          <span>FRONTIER AI RESEARCH • 1,800+ BENCHMARKED GUIDES</span>
        </div>
        <h1 className="blog-hero-title">
          Frontier AI <span className="modern-hero-gradient">Research & Guides</span>
        </h1>
        <p className="blog-hero-desc">
          Deep-dive benchmark audits, model showdowns, and architectural playbooks curated by <strong>Karan Arora</strong> to help founders and engineering leaders deploy production intelligence.
        </p>

        {/* Search Bar */}
        <div className="modern-search-wrapper" style={{ maxWidth: 640, margin: '24px auto 20px' }}>
          <div className="modern-search-bar">
            <Search size={18} className="search-icon-svg" />
            <input 
              type="text"
              className="modern-search-input"
              placeholder="Search 1,800+ AI guides, Claude updates, and tutorials..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
            {searchQuery && (
              <button className="search-clear-btn" onClick={() => setSearchQuery('')}>
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="modern-categories-scroll">
          <div className="modern-categories-list">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategorySelect(cat)}
              >
                {CATEGORY_ICONS[cat]}
                <span style={{ textTransform: 'capitalize' }}>{cat === 'all' ? 'All Guides' : cat}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Featured Headline Article (Only when on page 1 & no search) */}
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
                  <div className="author-avatar-sm">KA</div>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#fff', display: 'block' }}>Karan Arora</span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Chief AI Architect</span>
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
            Showing <strong>{filteredArticles.length}</strong> guides & benchmarks
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
                      <span>Karan Arora</span>
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

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="blog-pagination">
            <button 
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>

            <div className="pagination-pages">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                let pageNum = currentPage <= 3 ? i + 1 : currentPage + i - 2;
                if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                if (pageNum < 1) pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    className={`pagination-num ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button 
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
