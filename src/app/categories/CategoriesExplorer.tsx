'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  X, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  BookOpen, 
  Star,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import ToolLogo from '@/app/components/ToolLogo';
import StaggerGrid, { StaggerItem } from '@/app/components/motion/StaggerGrid';

export interface CategoryCardData {
  name: string;
  slug: string;
  icon: string;
  tagline: string;
  themeColor: string;
  gradient: string;
  glowBg: string;
  borderGlow: string;
  accentText: string;
  subtags: string[];
  toolCount: number;
  promptCount: number;
  topTools: {
    name: string;
    slug: string;
    logoUrl?: string;
    domain: string;
    priceClass: string;
    rating: number;
  }[];
}

interface CategoriesExplorerProps {
  categories: CategoryCardData[];
  totalTools: number;
  totalPrompts: number;
}

export default function CategoriesExplorer({
  categories,
  totalTools,
  totalPrompts
}: CategoriesExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredCategories = useMemo(() => {
    return categories.filter(cat => {
      // Filter tab
      if (selectedFilter !== 'all') {
        if (selectedFilter === 'dev' && cat.slug !== 'code' && cat.slug !== 'automation') return false;
        if (selectedFilter === 'media' && cat.slug !== 'video' && cat.slug !== 'design' && cat.slug !== 'audio') return false;
        if (selectedFilter === 'business' && cat.slug !== 'marketing' && cat.slug !== 'business' && cat.slug !== 'writing') return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = cat.name.toLowerCase().includes(q);
        const matchTagline = cat.tagline.toLowerCase().includes(q);
        const matchSubtags = cat.subtags.some(t => t.toLowerCase().includes(q));
        const matchTools = cat.topTools.some(t => t.name.toLowerCase().includes(q));
        if (!matchName && !matchTagline && !matchSubtags && !matchTools) {
          return false;
        }
      }

      return true;
    });
  }, [categories, searchQuery, selectedFilter]);

  return (
    <div className="categories-container">
      {/* 1. Frosted Search Capsule */}
      <div className="categories-search-box">
        <Search size={20} className="categories-search-icon" />
        <input
          type="text"
          className="categories-search-input"
          placeholder="Search categories, sub-specialties, or tools (e.g. 'code', 'video', 'voice', 'mcp', 'seo')..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className="categories-search-clear"
            onClick={() => setSearchQuery('')}
            title="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* 2. Quick Ecosystem Filter Pills */}
      <div className="categories-filter-row">
        <button
          className={`category-filter-pill ${selectedFilter === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('all')}
        >
          <span>✨ All Ecosystems</span>
          <span style={{ opacity: 0.75, fontSize: 11 }}>({categories.length})</span>
        </button>
        <button
          className={`category-filter-pill ${selectedFilter === 'dev' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('dev')}
        >
          <span>💻 Engineering & Automation</span>
        </button>
        <button
          className={`category-filter-pill ${selectedFilter === 'media' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('media')}
        >
          <span>🎨 Generative Media & Studio</span>
        </button>
        <button
          className={`category-filter-pill ${selectedFilter === 'business' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('business')}
        >
          <span>📈 Business & Growth</span>
        </button>
      </div>

      {/* 3. Categories Grid Showcase */}
      {filteredCategories.length > 0 ? (
        <StaggerGrid className="categories-showcase-grid">
          {filteredCategories.map((cat) => (
            <StaggerItem
              key={cat.slug}
              className="category-premium-card"
              style={{
                ['--card-border-glow' as any]: cat.borderGlow,
                ['--card-shadow-glow' as any]: `${cat.themeColor}22`,
                ['--card-glow-bg' as any]: cat.glowBg,
                ['--card-accent-text' as any]: cat.accentText,
              }}
            >
              {/* Top ambient radial glow */}
              <div className="category-card-ambient-glow" />

              {/* Card Header */}
              <div className="category-card-top">
                <div 
                  className="category-icon-wrapper"
                  style={{
                    background: `${cat.themeColor}18`,
                    borderColor: `${cat.themeColor}40`
                  }}
                >
                  <span>{cat.icon}</span>
                </div>
                <div className="category-count-badges">
                  <span className="category-badge-tools">
                    {cat.toolCount} Verified Tools
                  </span>
                  {cat.promptCount > 0 && (
                    <span className="category-badge-prompts">
                      {cat.promptCount} Prompts
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Tagline */}
              <h2 className="category-card-title">
                <span>{cat.name}</span>
              </h2>
              <p className="category-card-desc">
                {cat.tagline}
              </p>

              {/* Sub-specialties pills */}
              <div className="category-subtags-row">
                {cat.subtags.map(tag => (
                  <span key={tag} className="category-subtag-pill">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Featured Flagship Tools preview */}
              {cat.topTools && cat.topTools.length > 0 && (
                <div style={{ marginTop: 'auto', marginBottom: 18 }}>
                  <div className="category-tools-preview-label">
                    Featured Frontier Software:
                  </div>
                  <div className="category-tools-preview-grid">
                    {cat.topTools.slice(0, 4).map(t => (
                      <Link 
                        key={t.slug} 
                        href={`/tool/${t.slug}`} 
                        className="category-tool-chip"
                        title={`${t.name} (${t.rating}★)`}
                      >
                        <ToolLogo 
                          name={t.name} 
                          domain={t.domain} 
                          logoUrl={t.logoUrl} 
                          size={16} 
                        />
                        <span style={{ fontWeight: 600 }}>{t.name.split(' ')[0]}</span>
                        <span style={{ fontSize: 11, color: 'var(--color-warning)', display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                          ★ {t.rating.toFixed(1)}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Card Footer & CTAs */}
              <div className="category-card-footer">
                <Link 
                  href={`/category/${cat.slug}`}
                  className="category-explore-cta"
                >
                  <span>Explore {cat.name}</span>
                  <ArrowRight size={15} />
                </Link>

                {cat.promptCount > 0 && (
                  <Link 
                    href="/prompts"
                    className="category-prompts-link"
                    title={`View ${cat.promptCount} prompt templates`}
                  >
                    <BookOpen size={13} color="#818cf8" />
                    <span>Prompts ({cat.promptCount})</span>
                  </Link>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px', 
          background: 'rgba(var(--ink-tint-rgb), 0.02)', 
          border: '1px dashed rgba(var(--ink-tint-rgb), 0.1)', 
          borderRadius: 20 
        }}>
          <Layers size={36} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 6 }}>No categories matched "{searchQuery}"</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>Try searching for 'code', 'video', 'audio', 'mcp', or clear your filters.</p>
          <button 
            className="btn btn-secondary"
            onClick={() => { setSearchQuery(''); setSelectedFilter('all'); }}
            style={{ padding: '8px 16px', fontSize: 13 }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
