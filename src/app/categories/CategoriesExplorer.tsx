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
  Star
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
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* 1. Frosted Raycast-Style Command Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="obsidian-command-bar rounded-2xl flex items-center px-4 py-3 gap-3">
          <Search size={18} className="text-zinc-400 shrink-0" />
          <input
            type="text"
            className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
            placeholder="Search categories, sub-specialties, or tools (e.g. 'code', 'video', 'voice', 'mcp', 'seo')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              onClick={() => setSearchQuery('')}
              title="Clear search"
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* 2. Quick Ecosystem Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        <button
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 border flex items-center gap-1.5 ${
            selectedFilter === 'all'
              ? 'bg-violet-600 text-white border-violet-400/50 shadow-[0_0_15px_rgba(139,92,246,0.4)]'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border-white/10'
          }`}
          onClick={() => setSelectedFilter('all')}
        >
          <Sparkles size={13} className="text-violet-300" />
          <span>All Ecosystems</span>
          <span className="opacity-70 font-mono text-[10px]">({categories.length})</span>
        </button>

        <button
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 border ${
            selectedFilter === 'dev'
              ? 'bg-violet-600 text-white border-violet-400/50 shadow-[0_0_15px_rgba(139,92,246,0.4)]'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border-white/10'
          }`}
          onClick={() => setSelectedFilter('dev')}
        >
          <span>💻 Engineering & Automation</span>
        </button>

        <button
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 border ${
            selectedFilter === 'media'
              ? 'bg-violet-600 text-white border-violet-400/50 shadow-[0_0_15px_rgba(139,92,246,0.4)]'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border-white/10'
          }`}
          onClick={() => setSelectedFilter('media')}
        >
          <span>🎨 Generative Media & Studio</span>
        </button>

        <button
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 border ${
            selectedFilter === 'business'
              ? 'bg-violet-600 text-white border-violet-400/50 shadow-[0_0_15px_rgba(139,92,246,0.4)]'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border-white/10'
          }`}
          onClick={() => setSelectedFilter('business')}
        >
          <span>📈 Business & Growth</span>
        </button>
      </div>

      {/* 3. Categories Grid Showcase */}
      {filteredCategories.length > 0 ? (
        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <StaggerItem
              key={cat.slug}
              className="obsidian-card rounded-2xl p-6 flex flex-col justify-between border border-white/[0.08] hover:border-violet-500/40 transition-all duration-200 group"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shadow-sm">
                    <span>{cat.icon}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-zinc-900/80 border border-white/10 text-zinc-300">
                      {cat.toolCount} Tools
                    </span>
                    {cat.promptCount > 0 && (
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-pink-500/10 border border-pink-500/25 text-pink-300">
                        {cat.promptCount} Prompts
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Tagline */}
                <h2 className="text-xl font-semibold text-white group-hover:text-violet-300 transition-colors font-['Geist',sans-serif] mb-2">
                  <Link href={`/category/${cat.slug}`}>
                    {cat.name}
                  </Link>
                </h2>
                <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4 line-clamp-2">
                  {cat.tagline}
                </p>

                {/* Sub-specialties pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cat.subtags.slice(0, 4).map(tag => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900/80 border border-white/10 text-zinc-400">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Featured Flagship Tools preview */}
                {cat.topTools && cat.topTools.length > 0 && (
                  <div className="mb-6 pt-4 border-t border-white/[0.06]">
                    <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2.5">
                      Top Verified Software:
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {cat.topTools.slice(0, 4).map(t => (
                        <Link 
                          key={t.slug} 
                          href={`/tool/${t.slug}`} 
                          className="flex items-center gap-2 p-2 rounded-lg bg-zinc-900/60 hover:bg-zinc-800/80 border border-white/[0.06] transition-colors"
                          title={`${t.name} (${t.rating}★)`}
                        >
                          <ToolLogo 
                            name={t.name} 
                            domain={t.domain} 
                            logoUrl={t.logoUrl} 
                            size={16} 
                          />
                          <span className="text-xs font-medium text-zinc-200 truncate">{t.name.split(' ')[0]}</span>
                          <span className="ml-auto text-[10px] font-mono text-amber-400 flex items-center gap-0.5">
                            ★ {t.rating.toFixed(1)}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer & CTAs */}
              <div className="flex items-center gap-2 pt-4 border-t border-white/[0.06]">
                <Link 
                  href={`/category/${cat.slug}`}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-white text-zinc-950 hover:bg-zinc-100 font-medium text-xs flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(255,255,255,0.15)] active:scale-95 transition-all"
                >
                  <span>Explore {cat.name.split(' ')[0]}</span>
                  <ArrowRight size={13} />
                </Link>

                {cat.promptCount > 0 && (
                  <Link 
                    href="/prompts"
                    className="py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-xs font-medium flex items-center gap-1.5 transition-colors"
                    title={`View ${cat.promptCount} prompt templates`}
                  >
                    <BookOpen size={13} className="text-pink-400" />
                    <span>Prompts</span>
                  </Link>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      ) : (
        <div className="text-center py-20 px-4 obsidian-card rounded-3xl border border-dashed border-white/10 max-w-lg mx-auto">
          <Layers size={40} className="text-zinc-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2 font-['Geist',sans-serif]">
            No categories matched "{searchQuery}"
          </h3>
          <p className="text-xs text-zinc-400 mb-6">
            Try searching for 'code', 'video', 'audio', 'mcp', or reset your filters.
          </p>
          <button 
            className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-colors"
            onClick={() => { setSearchQuery(''); setSelectedFilter('all'); }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
