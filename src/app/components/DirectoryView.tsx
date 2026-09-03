'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import ToolLogo from './ToolLogo';
import PromptCard, { PromptData } from './PromptCard';
import ModernBackground from './ModernBackground';
import { getToolSlug } from '@/lib/tools';
import { 
  COMPLEX_USE_CASE_PRESETS, 
  matchToolsByUseCase, 
  UseCaseMatchResult,
  ComplexUseCasePreset 
} from '@/lib/usecases';
import { 
  Search, 
  Sparkles, 
  Star, 
  ExternalLink, 
  BadgeCheck, 
  Zap, 
  Code2, 
  PenTool, 
  Palette, 
  Video, 
  Mic, 
  Bot, 
  ArrowRight, 
  X, 
  Wand2,
  CheckCircle2,
  Cpu
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
  primaryUseCase?: string;
  useCases?: string[];
  complexity?: 'Intermediate' | 'Advanced' | 'Frontier Engineering';
  idealFor?: string;
  architectureStack?: string[];
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

  // Use Case Solver state
  const [useCaseQuery, setUseCaseQuery] = useState('');
  const [activePreset, setActivePreset] = useState<ComplexUseCasePreset | null>(null);

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

  // Active query for usecase solver
  const activeUseCaseQuery = useMemo(() => {
    if (activePreset) return activePreset.query;
    return useCaseQuery.trim();
  }, [activePreset, useCaseQuery]);

  // Computed use case matches
  const useCaseMatches = useMemo(() => {
    if (!activeUseCaseQuery) return null;
    return matchToolsByUseCase(activeUseCaseQuery, initialTools);
  }, [activeUseCaseQuery, initialTools]);

  const isUseCaseActive = Boolean(activeUseCaseQuery && useCaseMatches && useCaseMatches.length > 0);

  // Filtered Tools (when NOT in use case mode)
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
          (t.primaryUseCase && t.primaryUseCase.toLowerCase().includes(q)) ||
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

  const handleSelectPreset = (preset: ComplexUseCasePreset) => {
    if (activePreset?.id === preset.id) {
      setActivePreset(null);
      setUseCaseQuery('');
    } else {
      setActivePreset(preset);
      setUseCaseQuery(preset.title);
      setActiveTab('tools');
    }
  };

  const handleClearUseCase = () => {
    setActivePreset(null);
    setUseCaseQuery('');
  };

  return (
    <div className="directory-view-wrapper">
      {/* Sleek Modern Ambient Background */}
      <ModernBackground />

      {/* Modern Hero Section */}
      <header className="modern-hero">
        <div className="modern-hero-badge">
          <span className="badge-sparkle">✨</span>
          <span>CURATED FRONTIER AI • SPECIALIZED & COMPLEX SYSTEMS (2026)</span>
        </div>

        <h1 className="modern-hero-title">
          Discover & Deploy the World&apos;s <span className="modern-hero-gradient">Specialized AI Systems</span>
        </h1>

        <p className="modern-hero-subtitle">
          Bypass generic chatbots. Find autonomous coding agents, node-based diffusion workflows, real-time voice streaming engines, and enterprise AI orchestration — independently tested and verified.
        </p>

        {/* Clean Metrics Grid */}
        <div className="modern-metrics-row">
          <div className="modern-metric-item">
            <span className="metric-val">{initialTools.length}+</span>
            <span className="metric-lbl">Audited Frontier Tools</span>
          </div>
          <div className="modern-metric-divider" />
          <div className="modern-metric-item">
            <span className="metric-val">10</span>
            <span className="metric-lbl">Complex Use Cases</span>
          </div>
          <div className="modern-metric-divider" />
          <div className="modern-metric-item">
            <span className="metric-val">1,000+</span>
            <span className="metric-lbl">Research Benchmarks</span>
          </div>
          <div className="modern-metric-divider" />
          <div className="modern-metric-item">
            <span className="metric-val">100%</span>
            <span className="metric-lbl">Verified Independent</span>
          </div>
        </div>

        {/* USE CASE INTELLIGENCE SOLVER CONSOLE */}
        <div className="usecase-solver-card">
          <div className="usecase-solver-top">
            <div className="usecase-solver-title-group">
              <span className="usecase-solver-badge">
                <Wand2 size={13} />
                <span>USE CASE SOLVER</span>
              </span>
              <h2 className="usecase-solver-heading">Match Specialized Tools by Your Exact Use Case</h2>
            </div>
            {isUseCaseActive && (
              <button className="usecase-reset-btn" onClick={handleClearUseCase}>
                <X size={14} />
                <span>Reset to All Tools</span>
              </button>
            )}
          </div>

          <p className="usecase-solver-desc">
            Type your specific technical challenge (e.g. <em>&ldquo;sub-100ms voice for phone agents&rdquo;</em>, <em>&ldquo;autonomous agent for GitHub PRs&rdquo;</em>, <em>&ldquo;generate 3D game meshes&rdquo;</em>) or click any preset below to find the most capable tools.
          </p>

          {/* Natural Language Use Case Input */}
          <div className="usecase-input-container">
            <Search size={17} style={{ color: 'var(--text-muted)', marginRight: 10, flexShrink: 0 }} />
            <input 
              type="text"
              className="usecase-input-field"
              placeholder="Describe what you want to build or automate..."
              value={useCaseQuery}
              onChange={(e) => {
                setUseCaseQuery(e.target.value);
                setActivePreset(null);
                if (e.target.value) setActiveTab('tools');
              }}
            />
            {useCaseQuery && (
              <button 
                onClick={handleClearUseCase}
                style={{ color: 'var(--text-muted)', padding: 4 }}
                aria-label="Clear use case query"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Curated Complex Presets Chips */}
          <div>
            <span className="usecase-presets-label">⚡ High-Impact Complex Use Cases:</span>
            <div className="usecase-presets-grid">
              {COMPLEX_USE_CASE_PRESETS.map((preset) => {
                const isSelected = activePreset?.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    className={`usecase-preset-btn ${isSelected ? 'active' : ''}`}
                    onClick={() => handleSelectPreset(preset)}
                  >
                    <span>{preset.icon}</span>
                    <span>{preset.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modern Segmented Tab Switcher */}
        <div className="modern-tab-switcher">
          <button 
            className={`tab-switch-btn ${activeTab === 'tools' ? 'active' : ''}`}
            onClick={() => { setActiveTab('tools'); setSelectedCategory('All'); }}
          >
            <Zap size={16} />
            <span>Specialized Tools ({initialTools.length})</span>
          </button>
          <button 
            className={`tab-switch-btn ${activeTab === 'prompts' ? 'active' : ''}`}
            onClick={() => { setActiveTab('prompts'); setSelectedCategory('All'); }}
          >
            <Sparkles size={16} />
            <span>Visual Prompt Library ({initialPrompts.length})</span>
          </button>
        </div>

        {/* Global Keyword Search (Only shown if usecase is NOT active) */}
        {!isUseCaseActive && (
          <div className="modern-search-wrapper">
            <div className="modern-search-bar">
              <Search size={19} className="search-icon-svg" />
              <input 
                type="text" 
                className="modern-search-input"
                placeholder={
                  activeTab === 'tools'
                    ? "Keyword search (e.g. Cursor, LoRA, WebContainers, PagedAttention)..."
                    : "Search prompts (e.g. Midjourney, Claude, Architecture)..."
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
        )}

        {/* Category Pills (Only shown when not in use case mode) */}
        {!isUseCaseActive && (
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
        )}

        {/* Sub-Filters: Pricing */}
        {!isUseCaseActive && activeTab === 'tools' && (
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
        )}
      </header>

      {/* ACTIVE USE CASE BANNER */}
      {isUseCaseActive && (
        <div className="usecase-active-banner">
          <div className="usecase-banner-info">
            <CheckCircle2 size={18} color="#10b981" />
            <div className="usecase-banner-text">
              Matching use case: <strong>&ldquo;{activePreset ? activePreset.title : useCaseQuery}&rdquo;</strong> — 
              {' '}{useCaseMatches?.length} specialized tools ranked by capability match
            </div>
          </div>
          <button className="usecase-reset-btn" onClick={handleClearUseCase}>
            <span>View All Tools →</span>
          </button>
        </div>
      )}

      {/* Directory Results Counter (When use case is not active) */}
      {!isUseCaseActive && (
        <div className="modern-results-bar">
          <span className="results-count-text">
            Showing <strong>{activeTab === 'tools' ? filteredTools.length : filteredPrompts.length}</strong> {activeTab === 'tools' ? 'specialized tools' : 'prompts'}
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
      )}

      {/* TOOLS GRID: USE CASE MATCHED MODE */}
      {isUseCaseActive && activeTab === 'tools' && (
        <div className="modern-tools-grid">
          {useCaseMatches!.map(({ tool, matchScore, matchedUseCase, whyThisTool, complexity }) => {
            const slug = getToolSlug(tool);
            const complexityClass = complexity === 'Frontier Engineering' ? 'frontier' : complexity === 'Advanced' ? 'advanced' : 'intermediate';

            return (
              <div 
                key={tool.id} 
                className={`modern-tool-card ${tool.featured ? 'featured' : ''}`}
                style={{ borderColor: matchScore >= 95 ? 'rgba(99, 102, 241, 0.45)' : undefined }}
              >
                {/* Top Row: Match Score & Complexity */}
                <div className="card-top-row">
                  <span className="usecase-match-pill">
                    <span>🎯</span>
                    <span>{matchScore}% Match</span>
                  </span>
                  <span className={`usecase-complexity-tag ${complexityClass}`}>
                    {complexity}
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

                {/* Why this tool fits this use case */}
                <div className="usecase-why-card">
                  <span className="usecase-why-label">Capability:</span>
                  <span>{whyThisTool}</span>
                </div>

                {/* Description */}
                <p className="card-tool-desc">{tool.description}</p>

                {/* Tags */}
                {tool.tags && tool.tags.length > 0 && (
                  <div className="card-tags-list">
                    {tool.tags.slice(0, 3).map((tag: string) => (
                      <span key={tag} className="card-tag-item">{tag}</span>
                    ))}
                  </div>
                )}

                {/* Footer Actions */}
                <div className="card-bottom-actions">
                  <Link 
                    href={`/tool/${slug}`} 
                    className="card-link-profile"
                  >
                    <span>Architecture</span>
                    <ArrowRight size={13} />
                  </Link>

                  <a 
                    href={`/go/${slug}`} 
                    target="_blank" 
                    rel="sponsored nofollow noopener" 
                    className="card-btn-visit"
                  >
                    <span>Deploy Tool</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TOOLS GRID: STANDARD BROWSE MODE */}
      {!isUseCaseActive && (
        <div className="modern-tools-grid" style={{ display: activeTab === 'tools' ? 'grid' : 'none' }}>
          {filteredTools.length === 0 ? (
            <div className="modern-empty-state">
              <p>No specialized tools matched your criteria.</p>
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

                  {/* Primary Use Case Tag if present */}
                  {tool.primaryUseCase && (
                    <div style={{ fontSize: 12, color: '#a5b4fc', marginBottom: 10, display: 'flex', alignItems: 'flex-start', gap: 5 }}>
                      <span style={{ flexShrink: 0 }}>🎯</span>
                      <span style={{ fontWeight: 500, lineHeight: 1.4 }}>{tool.primaryUseCase}</span>
                    </div>
                  )}

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
                      <span>Explore Tool</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

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
