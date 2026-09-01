'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import ToolLogo from './ToolLogo';
import PromptCard, { PromptData } from './PromptCard';
import ModernBackground from './ModernBackground';
import { getToolSlug } from '@/lib/tools';
import { 
  Search, 
  Sparkles, 
  Star, 
  ExternalLink, 
  SlidersHorizontal,
  BadgeCheck,
  Zap,
  Code2,
  PenTool,
  Palette,
  Video,
  Mic,
  Bot,
  Layers,
  ArrowRight,
  TrendingUp,
  X
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
  All: <Sparkles size={15} />,
  Code: <Code2 size={15} />,
  Writing: <PenTool size={15} />,
  Design: <Palette size={15} />,
  Video: <Video size={15} />,
  Audio: <Mic size={15} />,
  Automation: <Bot size={15} />,
};

export default function DirectoryView({ initialTools, initialPrompts }: DirectoryViewProps) {
  const [activeTab, setActiveTab] = useState<'tools' | 'prompts'>('tools');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPricing, setSelectedPricing] = useState('All');
  const [selectedTargetAI, setSelectedTargetAI] = useState('All Models');

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialTools.forEach((t) => set.add(t.category));
    return ['All', ...Array.from(set)];
  }, [initialTools]);

  // Target AI list for Prompts
  const targetAIs = useMemo(() => {
    const set = new Set<string>();
    initialPrompts.forEach((p) => set.add(p.targetAI));
    return ['All Models', ...Array.from(set)];
  }, [initialPrompts]);

  // Filtered Tools
  const filteredTools = useMemo(() => {
    let result = initialTools;

    if (selectedCategory !== 'All') {
      result = result.filter(
        (t) => t.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedPricing !== 'All') {
      result = result.filter(
        (t) => t.priceClass.toLowerCase() === selectedPricing.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          (t.tags && t.tags.some((tag) => tag.toLowerCase().includes(q))) ||
          (t.badge && t.badge.toLowerCase().includes(q))
      );
    }

    return result;
  }, [initialTools, selectedCategory, selectedPricing, searchQuery]);

  // Filtered Prompts
  const filteredPrompts = useMemo(() => {
    let result = initialPrompts;

    if (selectedCategory !== 'All') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedTargetAI !== 'All Models') {
      result = result.filter(
        (p) => p.targetAI.toLowerCase() === selectedTargetAI.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.prompt.toLowerCase().includes(q) ||
          p.targetAI.toLowerCase().includes(q) ||
          (p.author && p.author.toLowerCase().includes(q)) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    return result;
  }, [initialPrompts, selectedCategory, selectedTargetAI, searchQuery]);

  return (
    <div className="directory-view-wrapper">
      {/* Sleek Modern Ambient Background */}
      <ModernBackground />

      {/* Modern Hero Section */}
      <header className="modern-hero">
        <div className="modern-hero-badge">
          <span className="badge-sparkle">✨</span>
          <span>CURATED 2026 DIRECTORY • 85+ AUDITED FRONTIER TOOLS</span>
        </div>

        <h1 className="modern-hero-title">
          Discover & Deploy the World&apos;s <span className="modern-hero-gradient">Best AI Software</span>
        </h1>

        <p className="modern-hero-subtitle">
          The authoritative ecosystem of hand-vetted artificial intelligence platforms, autonomous coding agents, generative media models, and prompt libraries. Curated and benchmarked by <strong>Karan Arora</strong>.
        </p>

        {/* Clean Metrics Grid */}
        <div className="modern-metrics-row">
          <div className="modern-metric-item">
            <span className="metric-val">{initialTools.length}+</span>
            <span className="metric-lbl">Audited Tools</span>
          </div>
          <div className="modern-metric-divider" />
          <div className="modern-metric-item">
            <span className="metric-val">1,000+</span>
            <span className="metric-lbl">Research Guides</span>
          </div>
          <div className="modern-metric-divider" />
          <div className="modern-metric-item">
            <span className="metric-val">{initialPrompts.length}</span>
            <span className="metric-lbl">Curated Prompts</span>
          </div>
          <div className="modern-metric-divider" />
          <div className="modern-metric-item">
            <span className="metric-val">100%</span>
            <span className="metric-lbl">Verified Free Index</span>
          </div>
        </div>

        {/* Modern Segmented Tab Switcher (Apple / Google Style) */}
        <div className="modern-tab-switcher">
          <button 
            className={`tab-switch-btn ${activeTab === 'tools' ? 'active' : ''}`}
            onClick={() => { setActiveTab('tools'); setSelectedCategory('All'); }}
          >
            <Zap size={16} />
            <span>AI Tools Directory ({initialTools.length})</span>
          </button>
          <button 
            className={`tab-switch-btn ${activeTab === 'prompts' ? 'active' : ''}`}
            onClick={() => { setActiveTab('prompts'); setSelectedCategory('All'); }}
          >
            <Sparkles size={16} />
            <span>Visual Prompt Library ({initialPrompts.length})</span>
          </button>
        </div>

        {/* Modern Search Input Container */}
        <div className="modern-search-wrapper">
          <div className="modern-search-bar">
            <Search size={19} className="search-icon-svg" />
            <input 
              type="text" 
              className="modern-search-input"
              placeholder={
                activeTab === 'tools'
                  ? "Search 85+ frontier tools, categories, or use cases (e.g. Cursor, Voice, Video)..."
                  : "Search 37+ prompts, visual styles, or AI targets (e.g. Midjourney, Claude)..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="search-clear-btn" 
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
            <div className="search-shortcut-hint">
              <span>⌘K</span>
            </div>
          </div>
        </div>

        {/* Category Pills Carousel */}
        <div className="modern-categories-scroll">
          <div className="modern-categories-list">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {CATEGORY_ICONS[cat] || <Sparkles size={15} />}
                <span>{cat === 'All' ? 'All Categories' : cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sub-Filters: Pricing (for tools) or Target AI (for prompts) */}
        {activeTab === 'tools' ? (
          <div className="modern-subfilters-row">
            <span className="subfilter-label">Pricing:</span>
            <div className="subfilter-pills">
              {['All', 'Free', 'Freemium', 'Paid'].map((p) => (
                <button
                  key={p}
                  className={`subfilter-pill ${selectedPricing === p ? 'active' : ''}`}
                  onClick={() => setSelectedPricing(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="modern-subfilters-row">
            <span className="subfilter-label">Model Target:</span>
            <div className="subfilter-pills">
              {targetAIs.map((target) => (
                <button
                  key={target}
                  className={`subfilter-pill ${selectedTargetAI === target ? 'active' : ''}`}
                  onClick={() => setSelectedTargetAI(target)}
                >
                  {target}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Directory Results Counter */}
      <div className="modern-results-bar">
        <span className="results-count-text">
          Showing <strong>{activeTab === 'tools' ? filteredTools.length : filteredPrompts.length}</strong> {activeTab === 'tools' ? 'verified tools' : 'curated prompts'}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>

        {(selectedCategory !== 'All' || selectedPricing !== 'All' || searchQuery) && (
          <button 
            className="reset-filters-link"
            onClick={() => { setSelectedCategory('All'); setSelectedPricing('All'); setSearchQuery(''); }}
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* TOOLS GRID */}
      <div className="modern-tools-grid" style={{ display: activeTab === 'tools' ? 'grid' : 'none' }}>
        {filteredTools.length === 0 ? (
          <div className="modern-empty-state">
            <p>No AI tools matched your filter criteria.</p>
            <button 
              className="btn btn-secondary" 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedPricing('All'); }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredTools.map((tool) => {
            const slug = getToolSlug(tool);

            return (
              <div 
                key={tool.id} 
                className={`modern-tool-card ${tool.featured ? 'featured' : ''}`}
              >
                {/* Card Top Row: Category & Pricing */}
                <div className="card-top-row">
                  <span className="modern-cat-tag">{tool.category}</span>
                  <span className={`modern-price-tag ${tool.priceClass}`}>
                    {tool.pricingModel}
                  </span>
                </div>

                {/* Card Main: Logo & Title */}
                <div className="card-main-header">
                  <div className="card-logo-box">
                    <ToolLogo 
                      name={tool.name} 
                      domain={tool.domain} 
                      logoUrl={tool.logoUrl} 
                      icon={tool.icon} 
                      size={46} 
                    />
                  </div>
                  <div className="card-header-details">
                    <div className="card-title-group">
                      <h3 className="card-tool-name">
                        <Link href={`/tool/${slug}`}>
                          {tool.name}
                        </Link>
                      </h3>
                      <BadgeCheck size={16} className="card-verified-icon" />
                    </div>

                    {/* Rating row */}
                    {tool.rating && (
                      <div className="card-rating-row">
                        <div className="card-stars">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />
                          ))}
                        </div>
                        <span className="card-rating-val">{tool.rating.toFixed(1)}</span>
                        {tool.reviewsCount && (
                          <span className="card-rating-reviews">({tool.reviewsCount.toLocaleString()})</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="card-tool-desc">{tool.description}</p>

                {/* Tags */}
                {tool.tags && tool.tags.length > 0 && (
                  <div className="card-tags-list">
                    {tool.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="card-tag-item">{tag}</span>
                    ))}
                  </div>
                )}

                {/* Card Footer Actions */}
                <div className="card-bottom-actions">
                  <Link 
                    href={`/tool/${slug}`} 
                    className="card-link-profile"
                  >
                    <span>Details</span>
                    <ArrowRight size={13} />
                  </Link>

                  <a 
                    href={`/go/${slug}`} 
                    target="_blank" 
                    rel="sponsored nofollow noopener" 
                    className="card-btn-visit"
                  >
                    <span>Try Free</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* PROMPTS GRID */}
      <div className="modern-prompts-grid" style={{ display: activeTab === 'prompts' ? 'grid' : 'none' }}>
        {filteredPrompts.length === 0 ? (
          <div className="modern-empty-state">
            <p>No prompts matched your search query.</p>
            <button 
              className="btn btn-secondary" 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedTargetAI('All Models'); }}
            >
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
