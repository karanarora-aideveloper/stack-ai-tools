'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import ToolLogo from './ToolLogo';
import PromptCard, { PromptData } from './PromptCard';
import ArcadeMarquee from './ArcadeMarquee';
import InteractiveGameBg from './InteractiveGameBg';
import AiEvolutionShowcase from './AiEvolutionShowcase';
import { playCoinSound, playLaserSound, playLevelUpSound } from '@/lib/arcadeSound';
import { getToolSlug } from '@/lib/tools';
import { 
  Search, 
  Sparkles, 
  Star, 
  ExternalLink, 
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
  Filter,
  Gamepad2,
  Trophy,
  Swords,
  Rocket
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
  All: <Gamepad2 size={14} />,
  Writing: <PenTool size={14} />,
  Code: <Code2 size={14} />,
  Design: <Palette size={14} />,
  Video: <Video size={14} />,
  Audio: <Mic size={14} />,
  Automation: <Bot size={14} />,
  Marketing: <Rocket size={14} />,
  Business: <Trophy size={14} />
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

  const getGamifiedRarity = (tool: ToolItem) => {
    if (tool.featured) return { label: 'BOSS TIER 👑', class: 'rarity-boss' };
    if ((tool.rating || 0) >= 4.9) return { label: 'GOD MODE ⚡', class: 'rarity-god' };
    if ((tool.reviewsCount || 0) > 1000) return { label: 'LEGENDARY 🔥', class: 'rarity-legend' };
    return { label: 'LVL 99 👾', class: 'rarity-vetted' };
  };

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
      {/* Scroll-Reactive 90s Game Background & 3D Perspective Grid */}
      <InteractiveGameBg />

      {/* 90s Retro Arcade Breaking News Ticker */}
      <ArcadeMarquee />

      {/* Dramatic 90s Arcade Hero Section */}
      <header className="arcade-hero">
        <div className="arcade-grid-bg"></div>
        
        <div className="arcade-hero-layout">
          <div className="arcade-hero-content">
            <div className="arcade-status-tag">
              <span className="arcade-blink-dot"></span>
              <span>LEVEL 2026: EXPONENTIAL REVOLUTION · PLAYER 1 READY</span>
            </div>

            <h1 className="arcade-hero-title">
              <span className="arcade-title-eyebrow">👾 MISSION OBJECTIVE: UNLOCK THE FUTURE</span>
              AI IS CHANGING <span className="arcade-glow-gradient">THE WORLD</span>
            </h1>

            <p className="arcade-hero-desc">
              Don&apos;t build like it&apos;s 1996. Equip yourself with <strong>85+ autonomous coding agents</strong>, neural video studios, voice synthesis copilots, and visual prompt spellbooks curated by <strong>Karan Arora</strong>.
            </p>

            {/* Arcade HUD Stats Cards */}
            <div className="arcade-hud-grid">
              <div className="arcade-hud-pill">
                <span className="arcade-hud-digit">85+</span>
                <span className="arcade-hud-label">🕹️ BOSS WEAPONS</span>
              </div>
              <div className="arcade-hud-pill">
                <span className="arcade-hud-digit">37</span>
                <span className="arcade-hud-label">⚡ SECRET PROMPTS</span>
              </div>
              <div className="arcade-hud-pill">
                <span className="arcade-hud-digit">186</span>
                <span className="arcade-hud-label">👾 DUNGEON RUNS</span>
              </div>
              <div className="arcade-hud-pill">
                <span className="arcade-hud-digit">100%</span>
                <span className="arcade-hud-label">⭐ FREE ACCESS</span>
              </div>
            </div>
          </div>

          {/* Dramatic Cartoon 90s Arcade Visual Frame */}
          <div className="arcade-hero-visual-card">
            <div className="arcade-crt-screen">
              <div className="arcade-crt-header">
                <div className="arcade-crt-buttons">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="arcade-crt-title">ARCADE_OS_v2.6 // CYBER_MATRIX</span>
                <span className="arcade-crt-badge">60 FPS</span>
              </div>

              <div className="arcade-artwork-container">
                <img 
                  src="/hero-arcade-ai.jpg" 
                  alt="Dramatic 90s AI Arcade Visual - AI Is Changing The World" 
                  className="arcade-artwork-image"
                />
                
                {/* Floating Retro Robot Mascot */}
                <div className="arcade-mascot-badge">
                  <img 
                    src="/arcade-mascot.jpg" 
                    alt="Stack AI Robot Companion" 
                    className="arcade-mascot-thumb"
                  />
                  <div className="arcade-speech-bubble">
                    <span>AI IS CHANGING THE WORLD! ⚡</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View Toggle (Tools vs Prompts) */}
        <div className="arcade-view-toggle">
          <button 
            className={`arcade-toggle-btn ${activeTab === 'tools' ? 'active' : ''}`}
            onClick={() => { setActiveTab('tools'); setSelectedCategory('All'); playLaserSound(); }}
          >
            <Zap size={16} />
            <span>🕹️ Frontier AI Weapons ({initialTools.length})</span>
          </button>
          <button 
            className={`arcade-toggle-btn ${activeTab === 'prompts' ? 'active' : ''}`}
            onClick={() => { setActiveTab('prompts'); setSelectedCategory('All'); playLaserSound(); }}
          >
            <Sparkles size={16} />
            <span>🎨 Visual Prompt Spellbook ({initialPrompts.length})</span>
          </button>
        </div>

        {/* Arcade Search Bar */}
        <div className="arcade-search-box">
          <Search size={20} className="arcade-search-icon" />
          <input 
            type="text" 
            className="arcade-search-input" 
            placeholder={`INSERT QUERY: ${activeTab === 'tools' ? 'Search 85+ AI tools by name, tag, or superpower...' : 'Search 37 prompts by Midjourney, Cursor, Claude...'}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>

        {/* Responsive Horizontal Scroll Category Bar */}
        <div className="filter-pills-scroll-wrapper">
          <div className="filter-pills-carousel">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-pill-arcade ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => { setSelectedCategory(cat); playCoinSound(); }}
              >
                {CATEGORY_ICONS[cat]}
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Dramatic Artistic Showcase: AI Is Changing The World Completely */}
      <AiEvolutionShowcase />

      {/* Sub-Filters Bar (Pricing & Sorting for Tools) */}
      {activeTab === 'tools' && (
        <div className="sub-filters-bar">
          <div className="pricing-filters">
            {['All', 'Free', 'Freemium', 'Paid'].map((p) => (
              <button
                key={p}
                className={`pricing-pill ${selectedPricing === p ? 'active' : ''}`}
                onClick={() => { setSelectedPricing(p); playCoinSound(); }}
              >
                {p === 'All' ? '🎮 All Pricing' : p}
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
              <option value="featured">⭐ Most Popular & Boss Tier</option>
              <option value="rating">★ Highest Rated (God Mode)</option>
              <option value="name">🔤 Alphabetical (A-Z)</option>
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
              <span>Target Engine:</span>
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
              ? (selectedCategory === 'All' ? '👾 Verified Frontier AI Software Inventory' : `${selectedCategory} AI Arsenal`)
              : (selectedCategory === 'All' ? '🎨 Curated Visual Prompts with Real Output Previews' : `${selectedCategory} Prompt Recipes`)
            }
          </h2>
          {(selectedCategory !== 'All' || selectedPricing !== 'All' || selectedTargetAI !== 'All Models') && (
            <button className="reset-filter-link" onClick={() => { setSelectedCategory('All'); setSelectedPricing('All'); setSelectedTargetAI('All Models'); }}>
              Reset Filters
            </button>
          )}
        </div>
        <span className="tools-count">
          {activeTab === 'tools' ? `${filteredTools.length} weapons loaded` : `${filteredPrompts.length} spells ready`}
        </span>
      </div>

      {/* TOOLS GRID */}
      <div className="tools-grid" style={{ display: activeTab === 'tools' ? 'grid' : 'none' }}>
        {filteredTools.length === 0 ? (
          <div className="empty-state">
            <p>No AI tools matched your mission parameters.</p>
            <button className="btn btn-secondary" onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedPricing('All'); }}>
              Reset Arsenal
            </button>
          </div>
        ) : (
          filteredTools.map((tool, index) => {
            const delay = (index % 12) * 0.025;
            const rarity = getGamifiedRarity(tool);

            return (
              <div 
                key={tool.id} 
                className={`tool-card ${tool.featured ? 'tool-featured' : ''}`}
                style={{ animation: `fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) both ${delay}s` }}
              >
                <div className="card-top-bar">
                  <span className="tool-category-badge">{tool.category}</span>
                  <span className={`card-rarity-badge ${rarity.class}`}>
                    {rarity.label}
                  </span>
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

                {/* Card Footer / Gamified CTA */}
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
                      Inspect
                    </Link>
                    <a 
                      href={`/go/${getToolSlug(tool)}`} 
                      target="_blank" 
                      rel="sponsored nofollow noopener" 
                      className="tool-affiliate-cta arcade-cta-press"
                      onClick={() => playLevelUpSound()}
                    >
                      <span>Equip Tool</span>
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
