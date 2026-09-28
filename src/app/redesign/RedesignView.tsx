'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import ToolLogo from '@/app/components/ToolLogo';
import {
  Search,
  Sparkles,
  Zap,
  Terminal,
  Cpu,
  Layers,
  Star,
  ExternalLink,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  BookmarkCheck,
  Check,
  Copy,
  SlidersHorizontal,
  X,
  Code2,
  PenTool,
  Video,
  Music,
  Workflow,
  Briefcase,
  ShieldCheck,
  Plus,
  Flame,
  TrendingUp,
  Filter,
  CheckCircle2,
  Radio,
  FileCode2,
  Bot
} from 'lucide-react';

export interface RedesignTool {
  id: string | number;
  name: string;
  category: string;
  icon?: string | null;
  domain?: string | null;
  logoUrl?: string | null;
  description: string;
  pricingModel: string;
  priceClass: 'free' | 'freemium' | 'paid';
  link: string;
  rating: number;
  reviewsCount: number;
  tags: string[];
  badge?: string;
  featured?: boolean;
  slug?: string;
  primaryUseCase?: string;
  useCases?: string[];
  startingPrice?: string;
}

export interface RedesignPrompt {
  id: string | number;
  title: string;
  targetAI: string;
  category: string;
  prompt: string;
  outputType: 'image' | 'code' | 'text';
  outputImageUrl?: string;
  outputPreview?: string;
  author: string;
  aspectRatio?: string;
  tags?: string[];
}

interface RedesignViewProps {
  initialTools: RedesignTool[];
  initialPrompts: RedesignPrompt[];
}

const CATEGORIES = [
  { id: 'all', label: 'All Tools', icon: Layers },
  { id: 'code', label: 'Developer & Code', icon: Code2 },
  { id: 'writing', label: 'Writing & Reasoning', icon: PenTool },
  { id: 'design', label: 'Design & 3D', icon: Sparkles },
  { id: 'video', label: 'Video & Media', icon: Video },
  { id: 'audio', label: 'Voice & Music', icon: Music },
  { id: 'automation', label: 'Workflow & Ops', icon: Workflow },
  { id: 'productivity', label: 'Productivity', icon: Briefcase },
];

const TRENDING_QUERIES = [
  'SWE-bench > 70%',
  'Claude 3.7',
  'Cursor',
  'Autonomous Agents',
  'Voice AI',
  'Flux.1'
];

export default function RedesignView({ initialTools, initialPrompts }: RedesignViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState<'all' | 'free' | 'freemium' | 'paid'>('all');
  const [sortBy, setSortBy] = useState<'trending' | 'rating' | 'reviews' | 'name'>('trending');
  const [activeTab, setActiveTab] = useState<'tools' | 'prompts'>('tools');
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string | number>>(new Set());
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [copiedPromptId, setCopiedPromptId] = useState<string | number | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load bookmarks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('stack_bookmarks');
      if (saved) {
        setBookmarkedIds(new Set(JSON.parse(saved)));
      }
    } catch (e) {
      // Ignore storage errors
    }
  }, []);

  // Save bookmarks
  const toggleBookmark = (id: string | number) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem('stack_bookmarks', JSON.stringify(Array.from(next)));
      } catch (e) {}
      return next;
    });
  };

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter tools
  const filteredTools = useMemo(() => {
    return initialTools.filter(tool => {
      // Bookmarks filter
      if (showBookmarksOnly && !bookmarkedIds.has(tool.id)) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all') {
        const cat = tool.category.toLowerCase();
        const sel = selectedCategory.toLowerCase();
        const matchesCategory = 
          cat.includes(sel) || 
          tool.tags.some(t => t.toLowerCase().includes(sel)) ||
          (sel === 'code' && (cat.includes('developer') || cat.includes('code'))) ||
          (sel === 'video' && (cat.includes('video') || cat.includes('media'))) ||
          (sel === 'automation' && (cat.includes('automation') || cat.includes('ops') || cat.includes('agent')));
        if (!matchesCategory) return false;
      }

      // Price filter
      if (selectedPrice !== 'all' && tool.priceClass !== selectedPrice) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches = 
          tool.name.toLowerCase().includes(q) ||
          tool.description.toLowerCase().includes(q) ||
          (tool.domain && tool.domain.toLowerCase().includes(q)) ||
          tool.tags.some(t => t.toLowerCase().includes(q)) ||
          (tool.primaryUseCase && tool.primaryUseCase.toLowerCase().includes(q));
        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'trending') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.reviewsCount - a.reviewsCount;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'reviews') {
        return b.reviewsCount - a.reviewsCount;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [initialTools, selectedCategory, selectedPrice, searchQuery, sortBy, showBookmarksOnly, bookmarkedIds]);

  // Filter prompts
  const filteredPrompts = useMemo(() => {
    return initialPrompts.filter(prompt => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          prompt.title.toLowerCase().includes(q) ||
          prompt.targetAI.toLowerCase().includes(q) ||
          prompt.category.toLowerCase().includes(q) ||
          prompt.prompt.toLowerCase().includes(q) ||
          (prompt.tags && prompt.tags.some(t => t.toLowerCase().includes(q)))
        );
      }
      return true;
    });
  }, [initialPrompts, searchQuery]);

  // Copy prompt helper
  const handleCopyPrompt = (prompt: RedesignPrompt) => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopiedPromptId(prompt.id);
    setTimeout(() => setCopiedPromptId(null), 2500);
  };

  // Newsletter handler
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <div id="redesign-root" data-redesign-page="true" className="min-h-screen bg-[#040406] text-[#e3e1ec] antialiased selection:bg-[#8b5cf6] selection:text-white">
      {/* Ambient Decorative Glow Mesh */}
      <div className="obsidian-glow-mesh absolute inset-x-0 top-0 h-[700px] pointer-events-none z-0"></div>

      {/* Top Floating Glass Header */}
      <header className="sticky top-0 z-50 w-full bg-[#040406]/85 backdrop-blur-xl border-b border-white/[0.07]">
        <div className="flex justify-between items-center h-16 px-4 md:px-8 max-w-7xl mx-auto">
          {/* Brand Logo & Version Chip */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-violet-500/30 flex items-center justify-center text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.3)] group-hover:scale-105 transition-transform">
                <Layers size={18} strokeWidth={2.2} />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-semibold text-lg tracking-tight text-white font-['Geist',sans-serif]">Stack AI</span>
                <span className="text-xs text-zinc-400 font-medium">Tools</span>
              </div>
            </Link>

            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-[10px] font-mono text-violet-300 uppercase tracking-wider">
              2026 Directory
            </span>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm text-zinc-400">
            <a href="#spotlight" className="hover:text-white transition-colors">Spotlight</a>
            <a href="#directory" className="hover:text-white transition-colors">Directory</a>
            <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
            <Link href="/prompts" className="hover:text-white transition-colors">Prompts</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Research</Link>
            <Link href="/antigravity-mcp" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              <span>MCP Servers</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono">NEW</span>
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Quick Find Trigger */}
            <button
              onClick={() => {
                searchInputRef.current?.focus();
                searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className="hidden sm:flex items-center gap-2 bg-zinc-900/80 border border-white/10 hover:border-violet-500/40 rounded-lg px-3 py-1.5 text-xs text-zinc-400 transition-all hover:text-white"
            >
              <Search size={14} className="text-zinc-500" />
              <span>Search...</span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-white/10 text-[10px] font-mono text-zinc-300">⌘K</kbd>
            </button>

            {/* Saved Bookmarks Button */}
            <button
              onClick={() => {
                setShowBookmarksOnly(!showBookmarksOnly);
                setActiveTab('tools');
              }}
              className={`relative p-2 rounded-lg border transition-all ${
                showBookmarksOnly
                  ? 'bg-violet-500/20 border-violet-500/50 text-violet-300'
                  : 'bg-zinc-900/60 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
              }`}
              title="View Saved Bookmarks"
              aria-label="Saved Bookmarks"
            >
              <Bookmark size={16} />
              {bookmarkedIds.size > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-violet-600 text-white text-[9px] font-bold flex items-center justify-center shadow-[0_0_8px_rgba(139,92,246,0.5)]">
                  {bookmarkedIds.size}
                </span>
              )}
            </button>

            {/* Submit Tool Action */}
            <Link
              href="/submit"
              className="inline-flex items-center gap-1.5 bg-white text-zinc-950 hover:bg-zinc-100 font-medium text-xs sm:text-sm px-3.5 py-1.5 rounded-lg transition-all duration-150 shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95"
            >
              <Plus size={15} strokeWidth={2.5} />
              <span>Submit Tool</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <section id="hero" className="pt-16 pb-12 px-4 md:px-8 max-w-5xl mx-auto text-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-white/10 text-xs text-zinc-300 mb-6 shadow-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="tracking-wide uppercase font-mono text-[11px] text-zinc-400">THE 2026 FRONTIER DIRECTORY</span>
            <span className="text-zinc-600">•</span>
            <span className="text-violet-400 font-medium">220+ HAND-VETTED AI TOOLS</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white mb-6 leading-[1.08] font-['Geist',sans-serif]">
            Discover tools shaping the <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              intelligence age.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Curated benchmarks, verified reviews, and real pricing for frontier models, autonomous agents, and AI developer workflows.
          </p>

          {/* Raycast / Linear Command Search Hub */}
          <div className="max-w-2xl mx-auto relative mb-6">
            <div className="obsidian-command-bar rounded-2xl p-2 flex items-center gap-3">
              <div className="pl-3 text-zinc-400 flex items-center">
                <Search size={20} className="text-zinc-400" />
              </div>
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search tools, agent frameworks, models... (Press ⌘K)"
                className="w-full bg-transparent border-none text-white placeholder:text-zinc-500 text-sm md:text-base focus:ring-0 focus:outline-none"
                type="text"
              />
              <div className="flex items-center gap-2 pr-2">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1 rounded text-zinc-500 hover:text-white transition-colors"
                    title="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
                <kbd className="hidden sm:inline-block px-2 py-1 rounded bg-zinc-800/80 border border-white/10 text-[11px] font-mono text-zinc-300 shadow-sm">
                  ⌘K
                </kbd>
                <button
                  onClick={() => {
                    const el = document.getElementById('directory');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-violet-600 hover:bg-violet-500 text-white font-medium px-3.5 py-1.5 rounded-lg text-xs transition-colors shadow-sm"
                >
                  Explore
                </button>
              </div>
            </div>

            {/* Quick Trending Queries */}
            <div className="flex items-center justify-center gap-2 mt-4 text-xs font-mono text-zinc-500 flex-wrap">
              <span className="text-zinc-400 flex items-center gap-1">
                <Flame size={13} className="text-amber-400" /> Trending:
              </span>
              {TRENDING_QUERIES.map((query, idx) => (
                <React.Fragment key={query}>
                  <button
                    onClick={() => setSearchQuery(query)}
                    className="hover:text-violet-400 transition-colors underline-offset-4 hover:underline cursor-pointer"
                  >
                    {query}
                  </button>
                  {idx < TRENDING_QUERIES.length - 1 && <span className="text-zinc-700">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Quick Stats Ticker Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-white/[0.08] mt-10">
            <div className="p-3 text-center">
              <div className="text-2xl md:text-3xl font-semibold text-white tracking-tight">350K+</div>
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mt-1">Monthly Explorers</div>
            </div>
            <div className="p-3 text-center border-l border-white/[0.08]">
              <div className="text-2xl md:text-3xl font-semibold text-white tracking-tight">220+</div>
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mt-1">Verified AI Tools</div>
            </div>
            <div className="p-3 text-center border-l border-white/[0.08]">
              <div className="text-2xl md:text-3xl font-semibold text-emerald-400 tracking-tight">48hr</div>
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mt-1">Review Cycle</div>
            </div>
            <div className="p-3 text-center border-l border-white/[0.08]">
              <div className="text-2xl md:text-3xl font-semibold text-cyan-400 tracking-tight">$12M+</div>
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mt-1">Saved via Perks</div>
            </div>
          </div>
        </section>

        {/* Editor's Choice: Frontier Spotlight Section */}
        <section id="spotlight" className="px-4 md:px-8 max-w-7xl mx-auto py-12 border-t border-white/[0.08]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-violet-400" />
                <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight font-['Geist',sans-serif]">
                  Editor's Choice: Frontier Spotlight
                </h2>
              </div>
              <p className="text-sm text-zinc-400 mt-1">
                Rigorous benchmark winners setting the industry standard for 2026 workflows.
              </p>
            </div>
            <a
              href="#directory"
              className="hidden sm:flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 font-medium transition-colors"
            >
              <span>Explore all vetted tools</span>
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Spotlight Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Spotlight Card 1: Claude 3.7 Sonnet */}
            <div className="obsidian-card rounded-2xl p-6 flex flex-col justify-between relative group hover:border-violet-500/50">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Bot size={26} />
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-[11px] font-mono uppercase tracking-wider">
                    <CheckCircle2 size={12} className="text-violet-400" /> Editor's Choice
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-1.5">
                  <h3 className="text-xl font-semibold text-white group-hover:text-violet-300 transition-colors">
                    Claude 3.7 Sonnet
                  </h3>
                  <span className="text-xs font-mono text-zinc-500">Anthropic</span>
                </div>

                <p className="text-sm text-zinc-400 mb-5 leading-relaxed">
                  State-of-the-art hybrid reasoning engine with dynamic test-time thinking allocation and frontier coding synthesis.
                </p>

                {/* Metrics Cluster */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-zinc-950/80 border border-white/[0.08] mb-5 font-mono text-xs">
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase">SWE-bench Verified</span>
                    <span className="text-emerald-400 font-semibold">70.3% Score</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase">Thinking Tokens</span>
                    <span className="text-zinc-200 font-semibold">Dynamic / 64k</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                <span className="text-xs font-mono text-violet-400">Freemium • Pro $20/mo</span>
                <a
                  href="/go/claude-code"
                  target="_blank"
                  rel="sponsored nofollow noopener"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium transition-colors"
                >
                  <span>Try Tool</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* Spotlight Card 2: Cursor IDE */}
            <div className="obsidian-card obsidian-card-cyan rounded-2xl p-6 flex flex-col justify-between relative group hover:border-cyan-500/50">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Terminal size={26} />
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono uppercase tracking-wider">
                    <Zap size={12} className="text-cyan-400" /> Fastest Workflow
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-1.5">
                  <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    Cursor IDE
                  </h3>
                  <span className="text-xs font-mono text-zinc-500">Anysphere</span>
                </div>

                <p className="text-sm text-zinc-400 mb-5 leading-relaxed">
                  AI-native fork of VS Code equipped with deep multi-file codebase indexing, Composer background agents, and instant Tab prediction.
                </p>

                {/* Metrics Cluster */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-zinc-950/80 border border-white/[0.08] mb-5 font-mono text-xs">
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase">Acceptance Rate</span>
                    <span className="text-cyan-400 font-semibold">41.2% Tab Infill</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase">Codebase Index</span>
                    <span className="text-zinc-200 font-semibold">Vector + AST</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                <span className="text-xs font-mono text-cyan-400">Freemium • Pro $20/mo</span>
                <a
                  href="/go/cursor"
                  target="_blank"
                  rel="sponsored nofollow noopener"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium transition-colors"
                >
                  <span>Try Tool</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* Spotlight Card 3: OpenAI o3 & o3-mini */}
            <div className="obsidian-card obsidian-card-emerald rounded-2xl p-6 flex flex-col justify-between relative group hover:border-emerald-500/50">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Cpu size={26} />
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono uppercase tracking-wider">
                    <Star size={12} className="text-emerald-400" /> Deep Reasoning
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-1.5">
                  <h3 className="text-xl font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    OpenAI o3 & o3-mini
                  </h3>
                  <span className="text-xs font-mono text-zinc-500">OpenAI</span>
                </div>

                <p className="text-sm text-zinc-400 mb-5 leading-relaxed">
                  Breakthrough STEM and competitive math reasoning model with Structured Outputs and adaptive thought calibration.
                </p>

                {/* Metrics Cluster */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-zinc-950/80 border border-white/[0.08] mb-5 font-mono text-xs">
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase">Frontier Math</span>
                    <span className="text-emerald-400 font-semibold">92.4% Score</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase">Fast Latency</span>
                    <span className="text-zinc-200 font-semibold">&lt; 1.8s Fast-Mode</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                <span className="text-xs font-mono text-emerald-400">Freemium • Plus $20/mo</span>
                <a
                  href="/go/openai-o3"
                  target="_blank"
                  rel="sponsored nofollow noopener"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium transition-colors"
                >
                  <span>Try Tool</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Category & Directory Shelf */}
        <section id="directory" className="sticky top-16 z-30 bg-[#040406]/95 backdrop-blur-xl border-y border-white/[0.08] py-3">
          <div className="px-4 md:px-8 max-w-7xl mx-auto space-y-3">
            {/* Top Row: Mode Switcher, Pricing Chips & Sort */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* View Switcher: Tools vs Prompts */}
              <div className="flex items-center bg-zinc-900/90 border border-white/10 rounded-xl p-1 shrink-0">
                <button
                  onClick={() => setActiveTab('tools')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeTab === 'tools'
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Layers size={14} />
                  <span>Tools ({filteredTools.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('prompts')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeTab === 'prompts'
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <FileCode2 size={14} />
                  <span>Prompts ({filteredPrompts.length})</span>
                </button>
              </div>

              {/* Controls: Pricing Pills & Sort */}
              {activeTab === 'tools' && (
                <div className="flex items-center gap-3 justify-between sm:justify-end shrink-0">
                  {/* Pricing Filter */}
                  <div className="flex items-center gap-1 bg-zinc-900/90 border border-white/10 rounded-xl p-1 text-xs font-mono text-zinc-400">
                    {(['all', 'free', 'freemium', 'paid'] as const).map(p => (
                      <button
                        key={p}
                        onClick={() => setSelectedPrice(p)}
                        className={`px-3 py-1.5 rounded-lg capitalize transition-colors text-xs ${
                          selectedPrice === p
                            ? 'bg-white text-zinc-950 font-semibold shadow-sm'
                            : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 bg-zinc-900/90 border border-white/10 rounded-xl px-3 py-1.5">
                    <span className="text-zinc-500">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value as any)}
                      aria-label="Sort tools"
                      className="bg-transparent border-none text-white text-xs p-0 focus:ring-0 cursor-pointer"
                    >
                      <option value="trending" className="bg-zinc-900 text-white">Trending</option>
                      <option value="rating" className="bg-zinc-900 text-white">Highest Rated</option>
                      <option value="reviews" className="bg-zinc-900 text-white">Most Reviews</option>
                      <option value="name" className="bg-zinc-900 text-white">A — Z</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Row: Category Pills (Horizontal Scroll Tray) */}
            {activeTab === 'tools' && (
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {CATEGORIES.map(cat => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                        isSelected
                          ? 'bg-white text-zinc-950 border-white shadow-[0_0_12px_rgba(255,255,255,0.25)]'
                          : 'bg-zinc-900/70 hover:bg-zinc-800 text-zinc-400 hover:text-white border-white/[0.08]'
                      }`}
                    >
                      <Icon size={13} className={isSelected ? 'text-zinc-950' : 'text-zinc-500'} />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto py-12">
          {activeTab === 'tools' ? (
            /* Tools Grid */
            filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map(tool => {
                  const isBookmarked = bookmarkedIds.has(tool.id);
                  const toolSlug = tool.slug || String(tool.id);

                  return (
                    <div
                      key={tool.id}
                      className="obsidian-card rounded-2xl p-5 flex flex-col justify-between group hover:border-white/20 relative"
                    >
                      <div>
                        {/* Header: Logo, Name, Domain & Bookmark */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <Link href={`/tool/${toolSlug}`} className="flex items-center gap-3 group/title">
                            <ToolLogo
                              name={tool.name}
                              domain={tool.domain}
                              logoUrl={tool.logoUrl}
                              icon={tool.icon}
                              size={44}
                            />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h4 className="text-base font-semibold text-white group-hover/title:text-violet-300 transition-colors line-clamp-1">
                                  {tool.name}
                                </h4>
                                <CheckCircle2 size={14} className="text-violet-400 shrink-0" />
                              </div>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[11px] font-mono text-zinc-500">
                                  {tool.domain || tool.category}
                                </span>
                                {tool.badge && (
                                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-violet-500/10 border border-violet-500/30 text-violet-300 font-mono">
                                    {tool.badge}
                                  </span>
                                )}
                              </div>
                            </div>
                          </Link>

                          <button
                            onClick={() => toggleBookmark(tool.id)}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              isBookmarked
                                ? 'bg-violet-500/20 border-violet-500/40 text-violet-300'
                                : 'text-zinc-500 border-transparent hover:text-white hover:border-white/10'
                            }`}
                            title={isBookmarked ? 'Remove bookmark' : 'Save bookmark'}
                            aria-label={isBookmarked ? 'Remove bookmark' : 'Save bookmark'}
                          >
                            <Bookmark size={15} fill={isBookmarked ? 'currentColor' : 'none'} />
                          </button>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
                          {tool.description}
                        </p>

                        {/* Tags */}
                        {tool.tags && tool.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {tool.tags.slice(0, 3).map(tag => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 rounded-md bg-zinc-900 border border-white/[0.08] text-[10px] font-mono text-zinc-400"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Footer: Pricing, Rating & Action */}
                      <div className="flex items-center justify-between pt-3.5 border-t border-white/[0.08]">
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono capitalize border ${
                              tool.priceClass === 'free'
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                                : tool.priceClass === 'freemium'
                                ? 'bg-violet-500/10 border-violet-500/30 text-violet-300'
                                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                            }`}
                          >
                            {tool.pricingModel || tool.priceClass}
                          </span>

                          <div className="flex items-center gap-1 text-xs font-mono text-zinc-300">
                            <Star size={12} className="text-amber-400 fill-amber-400" />
                            <span className="font-semibold">{tool.rating.toFixed(1)}</span>
                            <span className="text-zinc-600 text-[10px]">
                              ({tool.reviewsCount > 1000 ? `${(tool.reviewsCount / 1000).toFixed(1)}k` : tool.reviewsCount})
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/tool/${toolSlug}`}
                            prefetch={false}
                            className="text-xs text-zinc-400 hover:text-white px-2 py-1 transition-colors"
                          >
                            Details
                          </Link>
                          <a
                            href={tool.link.startsWith('http') ? `/go/${toolSlug}` : tool.link}
                            target="_blank"
                            rel="sponsored nofollow noopener"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium transition-colors"
                          >
                            <span>Try</span>
                            <ArrowUpRight size={13} />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="obsidian-card rounded-2xl p-12 text-center max-w-lg mx-auto">
                <Search size={36} className="text-zinc-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No matching AI tools found</h3>
                <p className="text-sm text-zinc-400 mb-6">
                  Try tweaking your search keywords, switching categories, or clearing active filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedPrice('all');
                    setShowBookmarksOnly(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )
          ) : (
            /* Prompts Grid */
            filteredPrompts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrompts.map(prompt => {
                  const isCopied = copiedPromptId === prompt.id;
                  return (
                    <div
                      key={prompt.id}
                      className="obsidian-card rounded-2xl p-5 flex flex-col justify-between group hover:border-violet-500/40"
                    >
                      <div>
                        {/* Header: Target AI & Category */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-mono">
                            {prompt.targetAI}
                          </span>
                          <span className="text-[11px] font-mono text-zinc-500">
                            {prompt.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-base font-semibold text-white mb-3 line-clamp-1">
                          {prompt.title}
                        </h4>

                        {/* Prompt Body Box */}
                        <div className="p-3.5 rounded-xl bg-zinc-950/90 border border-white/[0.08] font-mono text-xs text-zinc-300 leading-relaxed max-h-36 overflow-y-auto mb-4 relative">
                          <p className="whitespace-pre-wrap">{prompt.prompt}</p>
                        </div>
                      </div>

                      {/* Footer: Aspect Ratio & Copy Button */}
                      <div className="flex items-center justify-between pt-3 border-t border-white/[0.08]">
                        <span className="text-[11px] font-mono text-zinc-500">
                          {prompt.aspectRatio ? `Ratio: ${prompt.aspectRatio}` : 'Text / System'}
                        </span>

                        <button
                          onClick={() => handleCopyPrompt(prompt)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            isCopied
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                          }`}
                        >
                          {isCopied ? (
                            <>
                              <Check size={14} className="text-emerald-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={14} />
                              <span>Copy Prompt</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="obsidian-card rounded-2xl p-12 text-center max-w-lg mx-auto">
                <Search size={36} className="text-zinc-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No matching prompts found</h3>
                <p className="text-sm text-zinc-400 mb-6">
                  Try searching for different models like "Midjourney", "Claude", or "Cursor".
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )
          )}
        </section>

        {/* High-Conversion Perks & Weekly Radar Section */}
        <section className="px-4 md:px-8 max-w-5xl mx-auto py-16">
          <div className="obsidian-card rounded-3xl p-8 md:p-12 relative overflow-hidden border border-white/10 text-center">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-mono uppercase tracking-wider mb-4">
                <Sparkles size={13} className="text-violet-400" /> Frontier Perks & Radar
              </span>

              <h3 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight mb-4 font-['Geist',sans-serif]">
                Get $10,000+ in AI tool credits & weekly frontier breakdowns
              </h3>

              <p className="text-sm sm:text-base text-zinc-400 mb-8 leading-relaxed font-light">
                Every Friday, receive independent benchmark results on new releases, autonomous agent breakdowns, and exclusive discounts for modern engineering teams.
              </p>

              {subscribed ? (
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm font-medium">
                  <CheckCircle2 size={18} className="text-emerald-400" />
                  <span>You're on the list! Welcome to the Frontier Radar.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}
                    placeholder="Enter your work email..."
                    className="w-full bg-zinc-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-zinc-950 font-medium text-sm hover:bg-zinc-100 transition-all shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.2)] active:scale-95"
                  >
                    Get Radar
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Obsidian Refined Footer */}
        <footer className="border-t border-white/[0.08] bg-[#020204] py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Status Indicator */}
            <div className="flex flex-col sm:flex-row items-center justify-between pb-10 border-b border-white/[0.08] gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>All AI benchmark feeds operational • Sub-50ms Global Anycast</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>Independently Tested & Verified Directory</span>
              </div>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/[0.08] text-xs">
              <div>
                <h5 className="font-semibold text-white mb-4 uppercase tracking-wider text-[11px] font-mono">
                  Categories
                </h5>
                <ul className="space-y-2.5 text-zinc-400">
                  <li><Link href="/category/code" className="hover:text-white transition-colors">Developer & Code Agents</Link></li>
                  <li><Link href="/category/video" className="hover:text-white transition-colors">AI Video & Avatars</Link></li>
                  <li><Link href="/category/writing" className="hover:text-white transition-colors">Writing & Reasoning</Link></li>
                  <li><Link href="/category/design" className="hover:text-white transition-colors">Generative Design & 3D</Link></li>
                  <li><Link href="/category/audio" className="hover:text-white transition-colors">Voice & Studio Audio</Link></li>
                  <li><Link href="/category/automation" className="hover:text-white transition-colors">Workflow Automation</Link></li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-white mb-4 uppercase tracking-wider text-[11px] font-mono">
                  Alternatives
                </h5>
                <ul className="space-y-2.5 text-zinc-400">
                  <li><Link href="/alternatives/cursor" className="hover:text-white transition-colors">Cursor AI Alternatives</Link></li>
                  <li><Link href="/alternatives/midjourney" className="hover:text-white transition-colors">Midjourney Alternatives</Link></li>
                  <li><Link href="/alternatives/chatgpt" className="hover:text-white transition-colors">ChatGPT Alternatives</Link></li>
                  <li><Link href="/alternatives/elevenlabs" className="hover:text-white transition-colors">ElevenLabs Alternatives</Link></li>
                  <li><Link href="/alternatives/jasper-ai" className="hover:text-white transition-colors">Jasper AI Alternatives</Link></li>
                  <li><Link href="/alternatives" className="hover:text-white transition-colors">All 40+ Alternatives →</Link></li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-white mb-4 uppercase tracking-wider text-[11px] font-mono">
                  Frontier Resources
                </h5>
                <ul className="space-y-2.5 text-zinc-400">
                  <li><Link href="/antigravity-mcp" className="hover:text-white transition-colors">Antigravity MCP Tools</Link></li>
                  <li><Link href="/claude-connectors" className="hover:text-white transition-colors">Claude Connectors</Link></li>
                  <li><Link href="/blog" className="hover:text-white transition-colors">Frontier AI Research Blog</Link></li>
                  <li><Link href="/prompts" className="hover:text-white transition-colors">Curated Prompt Library</Link></li>
                  <li><Link href="/submit" className="hover:text-white transition-colors">Submit Tool for Review</Link></li>
                  <li><a href="/llms.txt" target="_blank" className="hover:text-white transition-colors">LLM Context (llms.txt)</a></li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-white mb-4 uppercase tracking-wider text-[11px] font-mono">
                  Stack AI
                </h5>
                <ul className="space-y-2.5 text-zinc-400">
                  <li><Link href="/about" className="hover:text-white transition-colors">About & Editorial Team</Link></li>
                  <li><a href="https://github.com/karanarora-aideveloper/stack-ai-tools" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Open Source GitHub</a></li>
                  <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                  <li><a href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap XML</a></li>
                </ul>
              </div>
            </div>

            {/* Disclosure & Copyright */}
            <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
              <p className="max-w-xl text-center md:text-left text-[11px] leading-relaxed">
                <strong>FTC Disclosure:</strong> Stack AI Tools (stackaitools.com) is reader-supported. When you purchase software through our links, we may earn an affiliate commission at no extra cost to you.
              </p>
              <p className="text-[11px] font-mono">
                © {new Date().getFullYear()} Stack AI Tools. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
