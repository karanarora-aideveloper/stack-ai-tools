'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ClaudeConnector, CONNECTOR_CATEGORIES } from '@/data/claude-connectors';
import { 
  Search, 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  Star, 
  Code2, 
  Database, 
  FileText, 
  Globe, 
  Cloud, 
  Brain, 
  Terminal, 
  X,
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';

interface ConnectorsViewProps {
  connectors: ClaudeConnector[];
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'All Connectors': <Sparkles size={14} />,
  'Developer': <Code2 size={14} />,
  'Databases': <Database size={14} />,
  'Productivity': <FileText size={14} />,
  'Web & Search': <Globe size={14} />,
  'Cloud & DevOps': <Cloud size={14} />,
  'Memory & Reasoning': <Brain size={14} />,
};

export default function ConnectorsView({ connectors }: ConnectorsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Connectors');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeModalConnector, setActiveModalConnector] = useState<ClaudeConnector | null>(null);

  const filteredConnectors = useMemo(() => {
    return connectors.filter((c) => {
      const matchesCat = selectedCategory === 'All Connectors' || c.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCat;
      const matchesSearch = 
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.maintainer.toLowerCase().includes(q) ||
        c.keyFeatures.some((f) => f.toLowerCase().includes(q)) ||
        c.category.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [connectors, selectedCategory, searchQuery]);

  function getSnippet(connector: ClaudeConnector): string {
    const configObj = {
      mcpServers: {
        [connector.slug]: {
          command: connector.command,
          args: connector.args,
          ...(connector.env ? { env: connector.env } : {})
        }
      }
    };
    return JSON.stringify(configObj, null, 2);
  }

  function handleCopy(connector: ClaudeConnector) {
    const snippet = getSnippet(connector);
    navigator.clipboard.writeText(snippet);
    setCopiedId(connector.id);
    setTimeout(() => setCopiedId(null), 2500);
  }

  return (
    <div className="pb-16">
      {/* Category Navigation Filter Pills */}
      <div className="flex justify-center flex-wrap gap-2 mb-8">
        {CONNECTOR_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? 'bg-violet-600/20 border border-violet-500/50 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                  : 'bg-zinc-900/80 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
              }`}
            >
              {CATEGORY_ICONS[cat]}
              <span>{cat}</span>
              {cat === 'All Connectors' && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                  {connectors.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Raycast-style Search Command Bar */}
      <div className="max-w-xl mx-auto mb-10 relative">
        <div className="relative flex items-center">
          <Search size={18} className="absolute left-4 text-zinc-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search Claude connectors (GitHub, Postgres, Notion, Slack, Brave)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-24 py-3 bg-zinc-950/80 border border-white/10 hover:border-violet-500/30 focus:border-violet-500/60 rounded-xl text-sm text-white placeholder-zinc-500 outline-none backdrop-blur-md transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          ) : (
            <kbd className="absolute right-4 text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800/80 border border-white/10 text-zinc-400 pointer-events-none">
              ⌘K
            </kbd>
          )}
        </div>
        <div className="flex justify-between items-center mt-2.5 px-2 text-xs text-zinc-500 font-mono">
          <span>Showing <strong className="text-zinc-300">{filteredConnectors.length}</strong> of {connectors.length} connectors</span>
          <span>Claude 3.7 & Claude Code Tested</span>
        </div>
      </div>

      {/* Connectors Grid */}
      {filteredConnectors.length === 0 ? (
        <div className="text-center py-16 px-4 bg-zinc-950/50 rounded-2xl border border-white/10 max-w-md mx-auto">
          <Layers size={32} className="mx-auto text-zinc-600 mb-3" />
          <h3 className="text-white font-medium mb-1">No connectors match &ldquo;{searchQuery}&rdquo;</h3>
          <p className="text-xs text-zinc-400 mb-4">Try searching for &ldquo;github&rdquo;, &ldquo;postgres&rdquo;, or &ldquo;search&rdquo;</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All Connectors'); }}
            className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-white transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
          {filteredConnectors.map((c) => {
            const isCopied = copiedId === c.id;
            return (
              <div
                key={c.id}
                className="obsidian-card rounded-2xl p-6 flex flex-col justify-between border border-white/10 hover:border-violet-500/30 transition-all duration-200 group relative"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform flex-shrink-0">
                        {c.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-base font-['Geist',sans-serif] group-hover:text-violet-300 transition-colors">
                          {c.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-cyan-400 font-mono">
                            {c.category}
                          </span>
                          <span className="text-zinc-600">•</span>
                          <span className="text-[11px] text-zinc-500">
                            {c.maintainer}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      {c.official && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-[10px] font-mono font-medium">
                          <ShieldCheck size={11} /> Official
                        </span>
                      )}
                      {c.stars && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-amber-300 font-mono">
                          <Star size={11} className="fill-amber-400 text-amber-400" /> {c.stars}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                    {c.description}
                  </p>

                  {/* Key Features Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {c.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="text-[11px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-zinc-900/80 border border-white/5"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleCopy(c)}
                    className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      isCopied
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/30'
                    }`}
                  >
                    {isCopied ? <Check size={13} /> : <Copy size={13} />}
                    <span>{isCopied ? 'Copied Config!' : 'Copy Config'}</span>
                  </button>

                  <button
                    onClick={() => setActiveModalConnector(c)}
                    className="px-3 py-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 text-xs text-zinc-300 hover:text-white transition-colors"
                  >
                    Setup
                  </button>

                  <a
                    href={c.githubUrl}
                    target="_blank"
                    rel="noopener nofollow"
                    title="View GitHub Repository"
                    className="w-9 h-9 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors flex-shrink-0"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Step-by-Step Quickstart Section */}
      <section className="max-w-5xl mx-auto mt-16 px-4">
        <div className="obsidian-card rounded-3xl p-8 md:p-10 border border-white/10">
          <div className="text-center mb-8">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              QUICKSTART GUIDE
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-['Geist',sans-serif] mt-1 mb-2">
              How to Install MCP Connectors in Claude Desktop
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto font-light">
              Follow these three quick steps to enable persistent files, databases, search, and development tools.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-zinc-950/60 border border-white/[0.08]">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 flex items-center justify-center font-bold text-xs mb-3 font-mono">
                1
              </div>
              <h4 className="text-sm font-semibold text-white mb-1.5 font-['Geist',sans-serif]">Locate Config File</h4>
              <p className="text-xs text-zinc-400 mb-3 leading-relaxed font-light">
                Open your Claude Desktop user configuration file on your machine:
              </p>
              <div className="p-2 rounded bg-black/60 border border-white/5 font-mono text-[11px] text-cyan-300 overflow-x-auto">
                ~/Library/Application Support/Claude/claude_desktop_config.json
              </div>
            </div>

            <div className="p-5 rounded-xl bg-zinc-950/60 border border-white/[0.08]">
              <div className="w-7 h-7 rounded-lg bg-violet-500/20 border border-violet-500/30 text-violet-300 flex items-center justify-center font-bold text-xs mb-3 font-mono">
                2
              </div>
              <h4 className="text-sm font-semibold text-white mb-1.5 font-['Geist',sans-serif]">Paste Connector JSON</h4>
              <p className="text-xs text-zinc-400 mb-3 leading-relaxed font-light">
                Click <strong>&ldquo;Copy Config&rdquo;</strong> above and merge it into your <code className="text-violet-300 font-mono">mcpServers</code> dictionary.
              </p>
              <div className="p-2 rounded bg-black/60 border border-white/5 font-mono text-[11px] text-violet-300 overflow-x-auto">
                &#123; &quot;mcpServers&quot;: &#123; &quot;github&quot;: &#123; ... &#125; &#125; &#125;
              </div>
            </div>

            <div className="p-5 rounded-xl bg-zinc-950/60 border border-white/[0.08]">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center justify-center font-bold text-xs mb-3 font-mono">
                3
              </div>
              <h4 className="text-sm font-semibold text-white mb-1.5 font-['Geist',sans-serif]">Restart Claude Desktop</h4>
              <p className="text-xs text-zinc-400 mb-3 leading-relaxed font-light">
                Restart Claude Desktop. You will see a small hammer icon 🔨 in the input prompt indicating active tools!
              </p>
              <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 font-mono text-[11px] text-emerald-300">
                ✓ Ready for autonomous tool use
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Detail Drawer */}
      {activeModalConnector && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
          onClick={() => setActiveModalConnector(null)}
        >
          <div
            className="obsidian-card bg-zinc-950 border border-white/10 rounded-2xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activeModalConnector.icon}</span>
                <div>
                  <h3 className="text-white text-lg font-semibold font-['Geist',sans-serif]">
                    {activeModalConnector.name} Setup
                  </h3>
                  <span className="text-xs text-cyan-400 font-mono">
                    Maintainer: {activeModalConnector.maintainer}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveModalConnector(null)}
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Description */}
            <p className="text-zinc-300 text-sm leading-relaxed mb-5 font-light">
              {activeModalConnector.description}
            </p>

            {/* Sample Prompt Box */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 mb-5">
              <span className="text-[11px] font-mono font-bold text-amber-300 uppercase tracking-wider block mb-1">
                Tested Prompt to Run in Claude:
              </span>
              <p className="text-xs sm:text-sm text-zinc-200 font-light italic">
                &ldquo;{activeModalConnector.samplePrompt}&rdquo;
              </p>
            </div>

            {/* JSON Config Snippet */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-medium text-zinc-300">
                  claude_desktop_config.json snippet:
                </span>
                <button
                  onClick={() => handleCopy(activeModalConnector)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-violet-600/20 border border-violet-500/30 text-violet-300 text-xs font-medium hover:bg-violet-600/30 transition-colors"
                >
                  {copiedId === activeModalConnector.id ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedId === activeModalConnector.id ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="p-3.5 rounded-xl bg-black/80 border border-white/10 font-mono text-xs text-cyan-300 overflow-x-auto">
                {getSnippet(activeModalConnector)}
              </pre>
            </div>

            {/* Claude Code CLI command */}
            <div className="mb-6">
              <span className="text-xs font-mono font-medium text-zinc-300 block mb-2">
                Or Add via Claude Code CLI:
              </span>
              <div className="p-3 rounded-xl bg-black/80 border border-white/10 font-mono text-xs text-emerald-300 overflow-x-auto">
                <code>claude mcp add {activeModalConnector.slug} {activeModalConnector.command} {activeModalConnector.args.join(' ')}</code>
              </div>
            </div>

            {/* Footer External Links */}
            <div className="flex justify-end gap-2.5 pt-4 border-t border-white/10">
              <button
                onClick={() => setActiveModalConnector(null)}
                className="px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 text-xs text-zinc-300 hover:text-white transition-colors"
              >
                Close
              </button>
              <a
                href={activeModalConnector.githubUrl}
                target="_blank"
                rel="noopener nofollow"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-colors"
              >
                <span>View on GitHub</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
