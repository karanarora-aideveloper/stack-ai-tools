'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import ToolLogo from './ToolLogo';
import PromptCard, { PromptData } from './PromptCard';
import { getToolSlug } from '@/lib/tools';
import { 
  Search, 
  Sparkles, 
  Star, 
  ExternalLink, 
  Check, 
  Copy, 
  Flame, 
  SlidersHorizontal,
  BadgeCheck,
  Zap,
  Code2,
  PenTool,
  Palette,
  Video,
  Mic,
  Bot,
  Filter
} from 'lucide-react';

interface ToolItem {
  id: string | number;
  name: string;
  category: string;
  icon?: string | null;
  domain?: string | null;
  logoUrl?: string | null;
  description: string;
  pricingModel: string;
  priceClass: string;
  link: string;
  rating?: number | null;
  reviewsCount?: number | null;
  tags?: string[];
  badge?: string | null;
  featured?: boolean | null;
}

interface DirectoryViewProps {
  initialTools: ToolItem[];
  initialPrompts: PromptData[];
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Writing: <PenTool size={14} />,
  Code: <Code2 size={14} />,
  Design: <Palette size={14} />,
  Video: <Video size={14} />,
  Audio: <Mic size={14} />,
  Automation: <Bot size={14} />,
};

const TARGET_AI_FILTERS = [
  'All Models',
  'Midjourney',
  'Cursor',
  'Claude',
  'ChatGPT'
];

export default function DirectoryView({
  initialTools,
  initialPrompts
}: DirectoryViewProps) {
  const [activeTab, setActiveTab] = useState<'tools' | 'prompts'>('tools');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPricing, setSelectedPricing] = useState('All');
  const [selectedTargetAI, setSelectedTargetAI] = useState('All Models');
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'name'>('featured');

  const categories = useMemo(() => {
    const list = activeTab === 'tools'
      ? ['All', 'Writing', 'Code', 'Design', 'Video', 'Audio', 'Automation']
      : ['All', 'Design', 'Code', 'Marketing', 'Business'];
    return list;
  }, [activeTab]);

  // Filtered and Sorted Tools
  const filteredTools = useMemo(() => {
    let result = [...initialTools];

    if (selectedCategory !== 'All') {
      result = result.filter(t => t.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (selectedPricing !== 'All') {
      result = result.filter(t => t.priceClass.toLowerCase() === selectedPricing.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        (t.tags && t.tags.some(tag => tag.toLowerCase().includes(q)))
      );
    }

    if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      result.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      });
    }

    return result;
  }, [initialTools, selectedCategory, selectedPricing, searchQuery, sortBy]);

  // Filtered Prompts (with Tool/TargetAI support)
  const filteredPrompts = useMemo(() => {
    let result = [...initialPrompts];

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (selectedTargetAI !== 'All Models') {
      result = result.filter(p => p.targetAI.toLowerCase().includes(selectedTargetAI.toLowerCase()));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.prompt.toLowerCase().includes(q) ||
        p.targetAI.toLowerCase().includes(q) ||
        (p.author && p.author.toLowerCase().includes(q)) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    return result;
  }, [initialPrompts, selectedCategory, selectedTargetAI, searchQuery]);

  return (
    <div className="directory-view-wrapper">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-glow"></div>
        <div className="hero-badge">
          <Sparkles size={14} className="sparkle-icon" />
          <span>Verified Frontier Index · Updated September 1, 2026</span>
        </div>
        <h1 className="hero-title">
          Explore the Best <span className="gradient-text">AI Tools & Prompts</span>
        </h1>
        <p className="hero-subtitle">
          Real-time curated directory of autonomous AI agents, coding copilots, and tested prompt recipes with real outputs.
        </p>

        {/* View Toggle */}
        <div className="view-toggle">
          <button 
            className={`toggle-btn ${activeTab === 'tools' ? 'active' : ''}`}
            onClick={() => { setActiveTab('tools'); setSelectedCategory('All'); }}
          >
            <Zap size={16} />
            <span>AI Tools ({initialTools.length})</span>
          </button>
          <button 
            className={`toggle-btn ${activeTab === 'prompts' ? 'active' : ''}`}
            onClick={() => { setActiveTab('prompts'); setSelectedCategory('All'); }}
          >
            <Sparkles size={16} />
            <span>Prompt Library with Outputs ({initialPrompts.length})</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <Search size={20} className="search-icon-inside" />
          <input 
            type="text" 
            className="search-input" 
            placeholder={`Search ${activeTab === 'tools' ? '40+ tools by name, tag, or feature...' : 'prompts by keyword, Midjourney, Cursor, Claude...'}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>

        {/* Category Pills */}
        <div className="filter-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {CATEGORY_ICONS[cat]}
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Sub-Filters Bar (Pricing & Sorting for Tools) */}
      {activeTab === 'tools' && (
        <div className="sub-filters-bar">
          <div className="pricing-filters">
            {['All', 'Free', 'Freemium', 'Paid'].map((p) => (
              <button
                key={p}
                className={`pricing-pill ${selectedPricing === p ? 'active' : ''}`}
                onClick={() => setSelectedPricing(p)}
              >
                {p === 'All' ? 'All Pricing' : p}
              </button>
            ))}
          </div>

          <div className="sort-box">
            <SlidersHorizontal size={14} />
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as any)}
              className="sort-select"
            >
              <option value="featured">Most Popular & Featured</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>
      )}

      {/* Sub-Filters Bar for Prompts (Filter by Model) */}
      {activeTab === 'prompts' && (
        <div className="sub-filters-bar">
          <div className="pricing-filters">
            <span style={{ fontSize: 13, color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: 5, marginRight: 6 }}>
              <Filter size={13} />
              <span>Target Model:</span>
            </span>
            {TARGET_AI_FILTERS.map((ai) => (
              <button
                key={ai}
                className={`pricing-pill ${selectedTargetAI === ai ? 'active' : ''}`}
                onClick={() => setSelectedTargetAI(ai)}
              >
                {ai}
              </button>
            ))}
          </div>
          <span className="tools-count">
            Showing tested outputs for {selectedTargetAI}
          </span>
        </div>
      )}

      {/* Results Header */}
      <div className="section-header">
        <div className="section-title-wrap">
          <h2 className="section-title">
            {activeTab === 'tools' 
              ? (selectedCategory === 'All' ? 'All Verified AI Tools' : `${selectedCategory} AI Tools`)
              : (selectedCategory === 'All' ? 'Curated Prompts with Real Outputs' : `${selectedCategory} Prompts`)
            }
          </h2>
          {(selectedCategory !== 'All' || selectedPricing !== 'All' || selectedTargetAI !== 'All Models') && (
            <button className="reset-filter-link" onClick={() => { setSelectedCategory('All'); setSelectedPricing('All'); setSelectedTargetAI('All Models'); }}>
              Reset Filters
            </button>
          )}
        </div>
        <span className="tools-count">
          {activeTab === 'tools' ? `${filteredTools.length} tools found` : `${filteredPrompts.length} prompts with outputs`}
        </span>
      </div>

      {/* TOOLS GRID */}
      <div className="tools-grid" style={{ display: activeTab === 'tools' ? 'grid' : 'none' }}>
        {filteredTools.length === 0 ? (
          <div className="empty-state">
            <p>No AI tools matched your search criteria.</p>
            <button className="btn btn-secondary" onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedPricing('All'); }}>
              Clear Filters
            </button>
          </div>
        ) : (
          filteredTools.map((tool, index) => {
            const delay = (index % 12) * 0.03;
            return (
              <div 
                key={tool.id} 
                className={`tool-card ${tool.featured ? 'tool-featured' : ''}`}
                style={{ animation: `fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both ${delay}s` }}
              >
                <div className="card-top-bar">
                  <span className="tool-category-badge">{tool.category}</span>
                  {tool.badge && (
                    <div className="card-badge">
                      <Flame size={12} />
                      <span>{tool.badge}</span>
                    </div>
                  )}
                </div>

                <div className="tool-header">
                  <ToolLogo 
                    name={tool.name} 
                    domain={tool.domain} 
                    logoUrl={tool.logoUrl} 
                    icon={tool.icon} 
                    size={48} 
                  />
                  <div className="tool-header-info">
                    <div className="tool-title-row">
                      <h3 className="tool-title">
                        <Link href={`/tool/${getToolSlug(tool)}`} style={{ color: 'inherit' }}>
                          {tool.name}
                        </Link>
                      </h3>
                      <BadgeCheck size={16} className="verified-check" />
                    </div>
                    <div className="tool-meta-row">
                      {tool.rating && (
                        <div className="tool-rating">
                          <Star size={13} fill="#f59e0b" color="#f59e0b" />
                          <span className="rating-score">{tool.rating.toFixed(1)}</span>
                          {tool.reviewsCount && (
                            <span className="rating-count">({tool.reviewsCount.toLocaleString()})</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <p className="tool-desc">{tool.description}</p>

                {/* Tags */}
                {tool.tags && tool.tags.length > 0 && (
                  <div className="tool-tags">
                    {tool.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="tool-tag">{tag}</span>
                    ))}
                  </div>
                )}

                {/* Card Footer / Affiliate CTA */}
                <div className="tool-footer">
                  <span className={`tool-price ${tool.priceClass}`}>
                    {tool.priceClass === 'freemium' ? '✨ ' : tool.priceClass === 'free' ? '🎁 ' : '💎 '}
                    {tool.pricingModel}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Link 
                      href={`/tool/${getToolSlug(tool)}`} 
                      className="btn btn-secondary" 
                      style={{ padding: '6px 12px', fontSize: 12 }}
                    >
                      Review
                    </Link>
                    <a 
                      href={`/go/${getToolSlug(tool)}`} 
                      target="_blank" 
                      rel="sponsored nofollow noopener" 
                      className="tool-affiliate-cta"
                    >
                      <span>Try Free</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* PROMPTS GRID WITH OUTPUT PREVIEWS */}
      <div className="prompts-grid" style={{ display: activeTab === 'prompts' ? 'grid' : 'none' }}>
        {filteredPrompts.length === 0 ? (
          <div className="empty-state">
            <p>No prompts matched your search.</p>
            <button className="btn btn-secondary" onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedTargetAI('All Models'); }}>
              Clear Filters
            </button>
          </div>
        ) : (
          filteredPrompts.map((item) => (
            <PromptCard key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
}
