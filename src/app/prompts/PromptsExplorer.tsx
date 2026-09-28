'use client';

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Terminal, 
  Image as ImageIcon, 
  Code2, 
  FileText, 
  Search, 
  X,
  Copy,
  Check,
  User,
  SlidersHorizontal,
  Flame,
  Zap,
  Layers
} from 'lucide-react';
import StaggerGrid, { StaggerItem } from '@/app/components/motion/StaggerGrid';

export interface PromptData {
  id: string | number;
  title: string;
  targetAI: string;
  category: string;
  prompt: string;
  outputType?: 'image' | 'code' | 'text';
  outputImageUrl?: string | null;
  outputPreview?: string | null;
  author?: string | null;
  aspectRatio?: string | null;
  tags?: string[];
}

interface PromptsExplorerProps {
  initialPrompts: PromptData[];
}

const MODEL_ICONS: Record<string, string> = {
  'All Models': '✨',
  'Gmail MCP': '📧',
  'GitHub MCP': '🐙',
  'Playwright MCP': '🌐',
  'Postgres MCP': '🐘',
  'Filesystem MCP': '📁',
  'Brave Search MCP': '🔍',
  'Slack MCP': '💬',
  'Google Drive MCP': '📂',
  'Midjourney v8.1': '🎨',
  'Midjourney v7': '🔥',
  'Midjourney v6.1': '🖼️',
  'Flux.1': '⚡',
  'Cursor 3.1': '💻',
  'Claude Sonnet 5': '🧠',
  'ChatGPT (GPT-5.6)': '🤖',
  'v0.dev': '📐',
  'Lovable.dev': '🚀',
  'Suno v4': '🎵',
};

const SUGGESTED_SEARCHES = [
  'Gmail MCP',
  'GitHub MCP',
  'Playwright MCP',
  'Postgres MCP',
  'Cursor 3.1',
  'Midjourney v8.1'
];

export default function PromptsExplorer({ initialPrompts }: PromptsExplorerProps) {
  const [selectedTarget, setSelectedTarget] = useState<string>('All Models');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | number | null>(null);

  // Dynamically extract all target AI models
  const availableModels = useMemo(() => {
    const set = new Set<string>();
    initialPrompts.forEach(p => {
      if (p.targetAI) set.add(p.targetAI);
    });
    return ['All Models', ...Array.from(set)];
  }, [initialPrompts]);

  // Dynamic counts for models
  const modelCounts = useMemo(() => {
    const counts: Record<string, number> = { 'All Models': initialPrompts.length };
    initialPrompts.forEach(p => {
      if (p.targetAI) {
        counts[p.targetAI] = (counts[p.targetAI] || 0) + 1;
      }
    });
    return counts;
  }, [initialPrompts]);

  // Dynamic counts for output types + MCP count
  const typeCounts = useMemo(() => {
    const counts = { all: initialPrompts.length, mcp: 0, image: 0, code: 0, text: 0 };
    initialPrompts.forEach(p => {
      if (p.targetAI?.toLowerCase().includes('mcp') || p.tags?.some(t => t.toLowerCase().includes('mcp'))) {
        counts.mcp++;
      }
      if (p.outputType === 'image') counts.image++;
      else if (p.outputType === 'code') counts.code++;
      else if (p.outputType === 'text') counts.text++;
    });
    return counts;
  }, [initialPrompts]);

  // Filtered prompts
  const filteredPrompts = useMemo(() => {
    return initialPrompts.filter((p) => {
      // Model match
      if (selectedTarget !== 'All Models') {
        const normTarget = selectedTarget.toLowerCase();
        const pTarget = p.targetAI.toLowerCase();
        if (!pTarget.includes(normTarget) && !normTarget.includes(pTarget)) {
          return false;
        }
      }

      // Output Type match / MCP filter
      if (selectedType === 'mcp') {
        const isMcp = p.targetAI?.toLowerCase().includes('mcp') || p.tags?.some(t => t.toLowerCase().includes('mcp'));
        if (!isMcp) return false;
      } else if (selectedType !== 'all') {
        if (p.outputType !== selectedType) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchPrompt = p.prompt.toLowerCase().includes(q);
        const matchModel = p.targetAI.toLowerCase().includes(q);
        const matchTags = p.tags?.some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchPrompt && !matchModel && !matchTags) {
          return false;
        }
      }

      return true;
    });
  }, [initialPrompts, selectedTarget, selectedType, searchQuery]);

  const handleCopyPrompt = (p: PromptData) => {
    navigator.clipboard.writeText(p.prompt);
    setCopiedId(p.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      {/* 1. Raycast Command Search Bar */}
      <div className="max-w-2xl mx-auto mb-4">
        <div className="obsidian-command-bar rounded-2xl flex items-center px-4 py-3 gap-3">
          <Search size={18} className="text-zinc-400 shrink-0" />
          <input
            type="text"
            className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
            placeholder="Search prompts (e.g. 'Gmail MCP', 'GitHub PR review', 'Midjourney v8', 'Cursor 3.1')..."
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

      {/* Suggested Search Pills */}
      <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
        <span className="text-xs text-zinc-500 font-mono flex items-center gap-1.5 mr-1">
          <Sparkles size={12} className="text-violet-400" />
          <span>Popular:</span>
        </span>
        {SUGGESTED_SEARCHES.map(term => (
          <button
            key={term}
            onClick={() => { setSearchQuery(term); setSelectedTarget('All Models'); setSelectedType('all'); }}
            className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all border ${
              searchQuery === term
                ? 'bg-violet-600 text-white border-violet-400/50 shadow-[0_0_12px_rgba(139,92,246,0.4)]'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border-white/10'
            }`}
          >
            {term}
          </button>
        ))}
      </div>

      {/* 2. Target AI Model Filter Shelf */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-1 max-w-5xl mx-auto justify-start sm:justify-center mb-6">
        {availableModels.map((target) => {
          const isActive = selectedTarget === target;
          return (
            <button
              key={target}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 border flex items-center gap-1.5 ${
                isActive
                  ? 'bg-violet-600 text-white border-violet-400/50 shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border-white/10'
              }`}
              onClick={() => { setSelectedTarget(target); if (target.includes('MCP')) setSelectedType('all'); }}
            >
              <span>{MODEL_ICONS[target] || '✨'}</span>
              <span>{target}</span>
              <span className="text-[10px] opacity-70 font-mono">({modelCounts[target] || 0})</span>
            </button>
          );
        })}
      </div>

      {/* 3. Output Format Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        <button
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border ${
            selectedType === 'all'
              ? 'bg-zinc-800 text-white border-white/20'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-white border-white/10'
          }`}
          onClick={() => setSelectedType('all')}
        >
          <span>All Formats</span>
          <span className="ml-1 opacity-70 font-mono text-[10px]">({typeCounts.all})</span>
        </button>

        <button
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border flex items-center gap-1.5 ${
            selectedType === 'mcp'
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-cyan-300 border-white/10'
          }`}
          onClick={() => { setSelectedType('mcp'); setSelectedTarget('All Models'); }}
        >
          <span>🔌 MCP Configs</span>
          <span className="font-mono text-[10px]">({typeCounts.mcp})</span>
        </button>

        <button
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border flex items-center gap-1.5 ${
            selectedType === 'code'
              ? 'bg-violet-600 text-white border-violet-400/50 shadow-[0_0_12px_rgba(139,92,246,0.3)]'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-white border-white/10'
          }`}
          onClick={() => setSelectedType('code')}
        >
          <Code2 size={13} />
          <span>Coding</span>
          <span className="font-mono text-[10px]">({typeCounts.code})</span>
        </button>

        <button
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border flex items-center gap-1.5 ${
            selectedType === 'image'
              ? 'bg-pink-600 text-white border-pink-400/50 shadow-[0_0_12px_rgba(236,72,153,0.3)]'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-white border-white/10'
          }`}
          onClick={() => setSelectedType('image')}
        >
          <ImageIcon size={13} />
          <span>Visual Images</span>
          <span className="font-mono text-[10px]">({typeCounts.image})</span>
        </button>

        <button
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border flex items-center gap-1.5 ${
            selectedType === 'text'
              ? 'bg-emerald-600 text-white border-emerald-400/50 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-white border-white/10'
          }`}
          onClick={() => setSelectedType('text')}
        >
          <FileText size={13} />
          <span>Reasoning & Text</span>
          <span className="font-mono text-[10px]">({typeCounts.text})</span>
        </button>
      </div>

      {/* 4. Prompts Grid */}
      {filteredPrompts.length > 0 ? (
        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((p) => {
            const isCopied = copiedId === p.id;
            const hasImage = p.outputType === 'image' && p.outputImageUrl;

            return (
              <StaggerItem
                key={p.id}
                className="obsidian-card rounded-2xl p-6 flex flex-col justify-between border border-white/[0.08] hover:border-violet-500/40 transition-all duration-200 group"
              >
                <div>
                  {/* Visual Output Image Preview (if image prompt) */}
                  {hasImage && (
                    <div className="mb-4 rounded-xl overflow-hidden border border-white/10 relative group/img max-h-52 bg-zinc-950">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={p.outputImageUrl!} 
                        alt={`Generated result for ${p.title}`} 
                        className="w-full h-48 object-cover group-hover/img:scale-105 transition-transform duration-300"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 right-2 flex items-center gap-1.5">
                        {p.aspectRatio && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20">
                            {p.aspectRatio}
                          </span>
                        )}
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-600/80 backdrop-blur-md text-white border border-violet-400/40 flex items-center gap-1">
                          <ImageIcon size={10} /> Verified
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Header Meta Pills */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-violet-500/10 border border-violet-500/25 text-violet-300">
                      {p.targetAI}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-400">
                      {p.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-white group-hover:text-violet-300 transition-colors font-['Geist',sans-serif] mb-2 leading-tight">
                    {p.title}
                  </h3>

                  {/* Author if available */}
                  {p.author && (
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-mono mb-3">
                      <User size={11} />
                      <span>Curated by {p.author}</span>
                    </div>
                  )}

                  {/* Code/Prompt Content Box */}
                  <div className="relative mb-4 group/box">
                    <div className="bg-zinc-950/80 border border-white/[0.08] rounded-xl p-3.5 text-xs text-zinc-300 font-mono leading-relaxed line-clamp-4 max-h-28 overflow-hidden select-all">
                      {p.prompt}
                    </div>
                  </div>

                  {/* Tags */}
                  {p.tags && p.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {p.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900/80 border border-white/10 text-zinc-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Action: Copy Button */}
                <div className="pt-4 border-t border-white/[0.06]">
                  <button
                    onClick={() => handleCopyPrompt(p)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-all active:scale-95 ${
                      isCopied
                        ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                        : 'bg-white text-zinc-950 hover:bg-zinc-100 shadow-[0_0_12px_rgba(255,255,255,0.15)]'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check size={14} className="text-white" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGrid>
      ) : (
        <div className="text-center py-20 px-4 obsidian-card rounded-3xl border border-dashed border-white/10 max-w-lg mx-auto">
          <Terminal size={40} className="text-zinc-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2 font-['Geist',sans-serif]">
            No prompts matched "{searchQuery}"
          </h3>
          <p className="text-xs text-zinc-400 mb-6">
            Try searching for 'Gmail MCP', 'Midjourney', 'Cursor', or clear your filters.
          </p>
          <button 
            className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-colors"
            onClick={() => { setSearchQuery(''); setSelectedTarget('All Models'); setSelectedType('all'); }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
