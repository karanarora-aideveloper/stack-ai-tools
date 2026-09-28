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

  // Sync state from URL search params on client mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category');
      const page = parseInt(params.get('page') || '', 10);
      const q = params.get('q');
      if (cat) setSelectedCategory(cat);
      if (page && !isNaN(page)) setCurrentPage(page);
      if (q) setSearchQuery(q);
    }
  }, []);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Blog Hero */}
      <header className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-white/10 text-xs text-zinc-300 mb-6 shadow-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="tracking-wide uppercase font-mono text-[11px] text-zinc-400">FRONTIER AI RESEARCH</span>
          <span className="text-zinc-600">•</span>
          <span className="text-violet-400 font-medium">10,000+ BENCHMARKED GUIDES</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-4 leading-[1.1] font-['Geist',sans-serif]">
          Frontier AI{' '}
          <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
            Research &amp; Guides
          </span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed font-light">
          Deep-dive benchmark audits, model showdowns, and architectural playbooks to help founders and engineering leaders deploy production intelligence.
        </p>

        {/* Search Bar (Obsidian Command Bar) */}
        <div className="max-w-2xl mx-auto relative mb-6">
          <div className="obsidian-command-bar rounded-2xl p-2.5 flex items-center gap-3 border border-white/[0.09]">
            <div className="pl-3 text-zinc-400 flex items-center">
              <Search size={18} className="text-zinc-400" />
            </div>
            <input 
              type="text"
              className="w-full bg-transparent border-none text-white placeholder:text-zinc-500 text-sm sm:text-base focus:ring-0 focus:outline-none"
              placeholder="Search 10,000+ AI guides, Claude updates, and tutorials..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
            {searchQuery && (
              <button 
                className="p-1 rounded text-zinc-500 hover:text-white transition-colors" 
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills (Crawlable HTML Links) */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-2 max-w-4xl mx-auto">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <Link
                key={cat}
                href={getPageUrl(1, cat, searchQuery)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 shrink-0 border ${
                  isActive
                    ? 'bg-violet-600 text-white border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.35)]'
                    : 'bg-zinc-900/80 border-white/10 text-zinc-400 hover:text-white hover:border-white/20 hover:bg-zinc-800/60'
                }`}
                onClick={() => handleCategorySelect(cat)}
              >
                {CATEGORY_ICONS[cat]}
                <span className="capitalize">{cat === 'all' ? 'All Guides' : cat}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* Featured Headline Article (Only on page 1 with no search filter) */}
      {currentPage === 1 && !searchQuery && selectedCategory === 'all' && featuredArticle && (
        <section className="relative rounded-3xl bg-gradient-to-b from-zinc-900/80 to-zinc-950/90 border border-white/[0.1] hover:border-violet-500/40 p-6 sm:p-8 backdrop-blur-xl shadow-2xl mb-12 sm:mb-16 transition-all duration-300 group overflow-hidden" aria-label="Featured Story">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
            {/* Image */}
            <div className="lg:col-span-5 relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shrink-0">
              <img 
                src={featuredArticle.imageUrl} 
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <span className="absolute top-3 left-3 bg-zinc-950/85 border border-amber-500/40 text-amber-300 text-[11px] font-mono font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-sm">
                ★ TOP BENCHMARK
              </span>
            </div>

            {/* Body */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-3">
                  <span className="px-2.5 py-0.5 rounded-md bg-violet-500/15 border border-violet-500/30 text-violet-300 text-[11px] font-mono uppercase tracking-wider font-semibold">
                    {featuredArticle.category}
                  </span>
                  <span className="text-xs text-zinc-400 inline-flex items-center gap-1.5 font-mono">
                    <Clock size={13} className="text-zinc-500" />
                    {featuredArticle.readTime}
                  </span>
                  <span className="text-xs text-amber-400 font-mono inline-flex items-center gap-1.5">
                    <TrendingUp size={13} />
                    {featuredArticle.searchVolume.toLocaleString()} US Vol/mo
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white group-hover:text-violet-300 transition-colors leading-tight font-['Geist',sans-serif] mb-3">
                  <Link href={`/blog/${featuredArticle.slug}`}>
                    {featuredArticle.title}
                  </Link>
                </h2>

                <p className="text-sm sm:text-base text-zinc-400 line-clamp-3 leading-relaxed mb-6 font-light">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-600/30 border border-violet-500/40 flex items-center justify-center text-violet-300">
                    <Sparkles size={14} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Stack AI Tools</span>
                    <span className="text-[11px] text-zinc-500 font-mono">Independently Verified</span>
                  </div>
                </div>

                <Link 
                  href={`/blog/${featuredArticle.slug}`} 
                  className="inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.45)] group/btn self-start sm:self-auto"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid of Articles */}
      <section aria-label="Articles Feed">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-8">
          <span className="text-sm text-zinc-400">
            Showing <strong className="text-white font-semibold">{filteredArticles.length}</strong> guides &amp; benchmarks
          </span>
          <span className="text-xs font-mono text-zinc-500">
            Page {currentPage} of {totalPages || 1}
          </span>
        </div>

        {displayedArticles.length === 0 ? (
          <div className="rounded-2xl bg-zinc-950/60 border border-white/[0.08] p-12 text-center max-w-lg mx-auto">
            <p className="text-zinc-400 text-sm mb-4">No articles found matching &ldquo;{searchQuery}&rdquo;.</p>
            <button 
              className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors shadow-sm"
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {displayedArticles.map((article) => (
              <article 
                key={article.slug} 
                className="bg-zinc-950/60 border border-white/[0.08] hover:border-violet-500/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col group hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(139,92,246,0.12)] backdrop-blur-sm"
              >
                {/* Media */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900 border-b border-white/[0.06]">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-zinc-950/85 border border-white/10 text-violet-300 text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md backdrop-blur-md">
                    {article.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between text-xs text-zinc-500 mb-2.5 font-mono">
                    <span className="inline-flex items-center gap-1.5 text-zinc-400">
                      <Clock size={12} className="text-zinc-500" />
                      {article.readTime}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-[10px] text-zinc-400">
                      KD {article.difficulty}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-violet-300 transition-colors line-clamp-2 mb-2 leading-snug font-['Geist',sans-serif]">
                    <Link href={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 mb-5 leading-relaxed flex-1 font-light">
                    {article.excerpt}
                  </p>

                  <div className="pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-xs mt-auto">
                    <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Stack AI Tools</span>
                    </div>

                    <Link 
                      href={`/blog/${article.slug}`} 
                      className="text-violet-400 group-hover:text-violet-300 font-medium inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-all text-xs"
                    >
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
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-12 mb-8 flex-wrap">
            {currentPage > 1 ? (
              <Link 
                href={getPageUrl(currentPage - 1)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white hover:border-white/20 transition-colors"
                onClick={() => handlePageChange(currentPage - 1)}
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
                <span>Prev</span>
              </Link>
            ) : (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/40 border border-white/5 text-xs font-mono text-zinc-600 cursor-not-allowed">
                <ChevronLeft size={14} />
                <span>Prev</span>
              </span>
            )}

            <div className="flex items-center gap-1 flex-wrap justify-center">
              {paginationItems.map((item, idx) => {
                if (item === 'ellipsis') {
                  return (
                    <span key={`ellipsis-${idx}`} className="px-2 text-zinc-600 font-mono text-xs">
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
                    className={`min-w-8 h-8 flex items-center justify-center px-2 rounded-xl text-xs font-mono transition-colors border ${
                      isCurrent
                        ? 'bg-violet-600 text-white border-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.3)] font-semibold'
                        : 'bg-zinc-900/80 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                    }`}
                    onClick={() => handlePageChange(pageNum)}
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
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white hover:border-white/20 transition-colors"
                onClick={() => handlePageChange(currentPage + 1)}
                aria-label="Next page"
              >
                <span>Next</span>
                <ChevronRight size={14} />
              </Link>
            ) : (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/40 border border-white/5 text-xs font-mono text-zinc-600 cursor-not-allowed">
                <span>Next</span>
                <ChevronRight size={14} />
              </span>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
