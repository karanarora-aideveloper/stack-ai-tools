'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  X, 
  ArrowRight, 
  GitCompare, 
  Sparkles, 
  Layers, 
  Star,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import ToolLogo from '@/app/components/ToolLogo';
import StaggerGrid, { StaggerItem } from '@/app/components/motion/StaggerGrid';

export interface AlternativeItem {
  id: string | number;
  name: string;
  slug: string;
  category: string;
  domain: string;
  logoUrl?: string;
  icon?: string;
  pricingModel: string;
  priceClass: string;
  rating: number;
}

export interface AlternativeCardData {
  tool: {
    id: string | number;
    name: string;
    slug: string;
    category: string;
    domain: string;
    logoUrl?: string;
    icon?: string;
    pricingModel: string;
    priceClass: string;
    rating: number;
    reviewsCount: number;
    description: string;
  };
  alts: AlternativeItem[];
}

interface AlternativesExplorerProps {
  items: AlternativeCardData[];
}

export default function AlternativesExplorer({ items }: AlternativesExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredItems = useMemo(() => {
    return items.filter(({ tool, alts }) => {
      // Category filter
      if (selectedFilter !== 'all') {
        const cat = tool.category.toLowerCase();
        if (selectedFilter === 'code' && !cat.includes('code') && !cat.includes('dev')) return false;
        if (selectedFilter === 'media' && !cat.includes('video') && !cat.includes('design') && !cat.includes('3d')) return false;
        if (selectedFilter === 'voice' && !cat.includes('audio') && !cat.includes('voice')) return false;
        if (selectedFilter === 'writing' && !cat.includes('writing') && !cat.includes('reasoning')) return false;
        if (selectedFilter === 'automation' && !cat.includes('automation') && !cat.includes('ops') && !cat.includes('agent')) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchToolName = tool.name.toLowerCase().includes(q);
        const matchCategory = tool.category.toLowerCase().includes(q);
        const matchAlts = alts.some(a => a.name.toLowerCase().includes(q));
        if (!matchToolName && !matchCategory && !matchAlts) {
          return false;
        }
      }

      return true;
    });
  }, [items, searchQuery, selectedFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      {/* 1. Raycast Command Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="obsidian-command-bar rounded-2xl flex items-center px-4 py-3 gap-3">
          <Search size={18} className="text-zinc-400 shrink-0" />
          <input
            type="text"
            className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
            placeholder="Search software comparisons (e.g. 'Cursor', 'Midjourney', 'ElevenLabs', 'Claude')..."
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

      {/* 2. Category Filter Pills */}
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
          <span>All Comparisons</span>
          <span className="opacity-70 font-mono text-[10px]">({items.length})</span>
        </button>

        <button
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 border ${
            selectedFilter === 'code'
              ? 'bg-violet-600 text-white border-violet-400/50 shadow-[0_0_15px_rgba(139,92,246,0.4)]'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border-white/10'
          }`}
          onClick={() => setSelectedFilter('code')}
        >
          <span>💻 Developer & Code</span>
        </button>

        <button
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 border ${
            selectedFilter === 'media'
              ? 'bg-violet-600 text-white border-violet-400/50 shadow-[0_0_15px_rgba(139,92,246,0.4)]'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border-white/10'
          }`}
          onClick={() => setSelectedFilter('media')}
        >
          <span>🎨 Design & Video</span>
        </button>

        <button
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 border ${
            selectedFilter === 'writing'
              ? 'bg-violet-600 text-white border-violet-400/50 shadow-[0_0_15px_rgba(139,92,246,0.4)]'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border-white/10'
          }`}
          onClick={() => setSelectedFilter('writing')}
        >
          <span>✍️ Writing & Reasoning</span>
        </button>

        <button
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 border ${
            selectedFilter === 'voice'
              ? 'bg-violet-600 text-white border-violet-400/50 shadow-[0_0_15px_rgba(139,92,246,0.4)]'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border-white/10'
          }`}
          onClick={() => setSelectedFilter('voice')}
        >
          <span>🎙️ Voice & Audio</span>
        </button>

        <button
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 border ${
            selectedFilter === 'automation'
              ? 'bg-violet-600 text-white border-violet-400/50 shadow-[0_0_15px_rgba(139,92,246,0.4)]'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border-white/10'
          }`}
          onClick={() => setSelectedFilter('automation')}
        >
          <span>⚡ Automation & Ops</span>
        </button>
      </div>

      {/* 3. Comparisons Grid Showcase */}
      {filteredItems.length > 0 ? (
        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(({ tool, alts }) => (
            <StaggerItem
              key={tool.id}
              className="obsidian-card rounded-2xl p-6 flex flex-col justify-between border border-white/[0.08] hover:border-violet-500/40 transition-all duration-200 group"
            >
              <div>
                {/* Baseline Tool Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 p-1 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                      <ToolLogo 
                        name={tool.name} 
                        domain={tool.domain} 
                        logoUrl={tool.logoUrl} 
                        icon={tool.icon} 
                        size={38} 
                      />
                    </div>
                    <div>
                      <h2 className="text-base font-semibold text-white group-hover:text-violet-300 transition-colors font-['Geist',sans-serif] leading-tight">
                        <Link href={`/alternatives/${tool.slug}`}>
                          {tool.name}
                        </Link>
                      </h2>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-400">
                          {tool.category}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          tool.priceClass === 'free' 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' 
                            : tool.priceClass === 'freemium'
                            ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25'
                            : 'bg-zinc-800 text-zinc-300 border-white/10'
                        }`}>
                          {tool.pricingModel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-900/80 border border-white/10 text-xs font-mono shrink-0">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-white font-semibold">{tool.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Subtitle Prompt */}
                <p className="text-xs text-zinc-400 font-light mb-4 leading-relaxed">
                  Looking for cheaper, faster, or open replacements for <strong className="text-zinc-200 font-medium">{tool.name.split(' ')[0]}</strong>? Top vetted alternatives:
                </p>

                {/* Alternative Replacements List */}
                <div className="space-y-2 mb-6">
                  {alts.map(alt => (
                    <Link
                      key={alt.id}
                      href={`/tool/${alt.slug}`}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-white/[0.06] hover:border-violet-500/30 transition-all group/alt"
                    >
                      <div className="flex items-center gap-2.5">
                        <ToolLogo 
                          name={alt.name} 
                          domain={alt.domain} 
                          logoUrl={alt.logoUrl} 
                          icon={alt.icon} 
                          size={22} 
                        />
                        <span className="text-xs font-medium text-zinc-200 group-hover/alt:text-white transition-colors">
                          {alt.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                          alt.priceClass === 'free' 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' 
                            : alt.priceClass === 'freemium'
                            ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25'
                            : 'bg-zinc-800 text-zinc-300 border-white/10'
                        }`}>
                          {alt.pricingModel}
                        </span>
                        <span className="text-[11px] font-mono text-amber-400 flex items-center gap-0.5">
                          ★ {alt.rating.toFixed(1)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-white/[0.06]">
                <Link 
                  href={`/alternatives/${tool.slug}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-white text-zinc-950 hover:bg-zinc-100 font-medium text-xs flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(255,255,255,0.15)] active:scale-95 transition-all"
                >
                  <span>Compare All {tool.name.split(' ')[0]} Alternatives</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      ) : (
        <div className="text-center py-20 px-4 obsidian-card rounded-3xl border border-dashed border-white/10 max-w-lg mx-auto">
          <GitCompare size={40} className="text-zinc-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2 font-['Geist',sans-serif]">
            No comparisons matched "{searchQuery}"
          </h3>
          <p className="text-xs text-zinc-400 mb-6">
            Try searching for 'Cursor', 'Midjourney', 'ElevenLabs', or reset your filters.
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
