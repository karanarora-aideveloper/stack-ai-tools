'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ObsidianHeader from '@/app/components/ObsidianHeader';
import ObsidianFooter from '@/app/components/ObsidianFooter';
import {
  Compass,
  Search,
  ArrowRight,
  Sparkles,
  Code2,
  Video,
  Music,
  PenTool,
  Workflow,
  Terminal,
  Layers,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Star
} from 'lucide-react';

const POPULAR_TOOLS = [
  {
    name: 'Cursor 4.0',
    slug: 'cursor',
    category: 'Code & Dev Agents',
    description: 'Frontier AI-first code editor with Composer 2.0 multi-file reasoning and deep codebase context.',
    pricing: 'Freemium',
    rating: '4.97',
    badge: 'Editor\'s Choice'
  },
  {
    name: 'Claude Sonnet 5 & Opus 5.5',
    slug: 'claude',
    category: 'Code & Reasoning',
    description: 'Anthropic\'s flagship 5.5 generation combining Opus 5.5 strategic reasoning with Sonnet 5 autonomous coding.',
    pricing: 'Freemium',
    rating: '4.99',
    badge: 'Frontier Benchmark'
  },
  {
    name: 'OpenAI GPT-6 Astra',
    slug: 'openai-o3',
    category: 'Reasoning & Agents',
    description: 'OpenAI\'s frontier intelligence model with 2M context and master-tier STEM reasoning.',
    pricing: 'Freemium',
    rating: '4.98',
    badge: 'GPT-6 Series'
  },
  {
    name: 'DeepSeek-V4 Pro',
    slug: 'deepseek-r1',
    category: 'Code & Reasoning',
    description: '552B MoE open-weights model featuring integrated reasoning modes and Engram memory architecture.',
    pricing: 'Open Source',
    rating: '4.97',
    badge: 'Open Weights'
  }
];

const POPULAR_CATEGORIES = [
  { label: 'Coding Agents', href: '/category/code', icon: Code2, count: '38 Tools' },
  { label: 'AI Video', href: '/category/video', icon: Video, count: '29 Tools' },
  { label: 'Voice & Speech', href: '/category/audio', icon: Music, count: '22 Tools' },
  { label: 'Generative Design', href: '/category/design', icon: PenTool, count: '34 Tools' },
  { label: 'Autonomous Agents', href: '/category/automation', icon: Workflow, count: '41 Tools' },
  { label: 'Prompt Library', href: '/prompts', icon: Sparkles, count: '45+ Curated' },
  { label: 'Claude Connectors', href: '/claude-connectors', icon: Terminal, count: '60+ Servers' }
];

export default function NotFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const filteredTools = searchQuery.trim()
    ? POPULAR_TOOLS.filter((t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : POPULAR_TOOLS;

  return (
    <div data-redesign-page="true" className="min-h-screen bg-[#040406] text-zinc-100 flex flex-col font-sans selection:bg-violet-500/30 selection:text-white">
      <ObsidianHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-16 sm:py-24 relative">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-violet-600/10 via-cyan-500/10 to-indigo-600/10 blur-[120px] pointer-events-none rounded-full" />

        {/* 404 Hero Section */}
        <div className="text-center max-w-2xl mx-auto relative z-10 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-400 text-xs font-mono uppercase tracking-wider mb-6">
            <Compass size={13} className="animate-spin-slow" />
            <span>404 • Resource Relocated or Missing</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-5 font-['Geist',sans-serif]">
            Lost in the AI Frontier?
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed mb-8">
            The page, comparison, or tool you requested cannot be located. It may have been moved, renamed, or is currently undergoing verified benchmarking.
          </p>

          {/* Interactive Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto mb-6">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-zinc-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 220+ AI tools, coding agents, prompts..."
                className="w-full pl-12 pr-28 py-3.5 bg-zinc-900/90 border border-white/10 rounded-2xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 shadow-xl backdrop-blur-md transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 shadow-lg shadow-violet-600/20"
              >
                <span>Search</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </form>

          {/* Quick Hub Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white transition-all"
            >
              <Layers size={14} className="text-violet-400" />
              <span>Explore AI Directory</span>
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white transition-all"
            >
              <span>All Categories</span>
              <ChevronRight size={13} className="text-zinc-500" />
            </Link>
            <Link
              href="/prompts"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white transition-all"
            >
              <Sparkles size={13} className="text-cyan-400" />
              <span>Prompt Showcase</span>
            </Link>
          </div>
        </div>

        {/* Quick Category Jump Pills */}
        <section className="mb-14 relative z-10">
          <div className="flex items-center justify-between mb-5 border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400">Popular AI Hubs</h2>
            </div>
            <Link href="/categories" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1">
              <span>View all</span>
              <ChevronRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {POPULAR_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.label}
                  href={cat.href}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/60 border border-white/[0.07] hover:border-violet-500/30 hover:bg-zinc-900 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-zinc-400 group-hover:text-violet-400 group-hover:border-violet-500/30 transition-all">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-zinc-200 group-hover:text-white transition-colors">{cat.label}</p>
                      <p className="text-[10px] text-zinc-500 font-mono">{cat.count}</p>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-zinc-600 group-hover:text-zinc-300 group-hover:translate-x-0.5 transition-all" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Top Verified Frontier Tools Recovery Grid */}
        <section className="relative z-10">
          <div className="flex items-center justify-between mb-5 border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-400" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400">Top Verified Frontier Tools</h2>
            </div>
            <span className="text-[11px] text-zinc-500 font-mono">Hand-vetted by Karan Arora</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredTools.map((tool) => (
              <div
                key={tool.name}
                className="obsidian-card p-5 rounded-2xl border border-white/[0.08] bg-zinc-950/70 hover:border-violet-500/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-[10px] font-mono text-violet-300">
                      {tool.badge}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-amber-400">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span>{tool.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-white group-hover:text-violet-300 transition-colors mb-1 font-['Geist',sans-serif]">
                    {tool.name}
                  </h3>
                  <p className="text-[11px] text-zinc-500 font-mono mb-2.5">{tool.category}</p>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed mb-4 line-clamp-2">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-zinc-400">{tool.pricing}</span>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/tool/${tool.slug}`}
                      className="text-xs text-zinc-400 hover:text-white transition-colors"
                    >
                      Review
                    </Link>
                    <Link
                      href={`/go/${tool.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-500/15 border border-violet-500/30 text-violet-300 hover:bg-violet-500/25 text-xs font-medium transition-all"
                    >
                      <span>Try</span>
                      <ExternalLink size={11} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <ObsidianFooter />
    </div>
  );
}
