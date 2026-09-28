'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { AntigravityMcpServer, ANTIGRAVITY_MCP_CATEGORIES } from '@/data/antigravity-mcp';
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
  Palette, 
  Brain, 
  Terminal, 
  X, 
  Layers, 
  ArrowRight, 
  Info, 
  Settings, 
  FolderGit2, 
  Monitor, 
  Zap, 
  Cpu,
  Share2
} from 'lucide-react';

interface AntigravityMcpViewProps {
  servers: AntigravityMcpServer[];
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'All MCPs': <Sparkles size={14} />,
  'Google Ecosystem': <Cpu size={14} />,
  'Developer': <Code2 size={14} />,
  'Databases': <Database size={14} />,
  'Web & Search': <Globe size={14} />,
  'Creative & Media': <Palette size={14} />,
  'Productivity': <FileText size={14} />,
  'Memory & Reasoning': <Brain size={14} />,
};

export default function AntigravityMcpView({ servers }: AntigravityMcpViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All MCPs');
  const [activeTabGuide, setActiveTabGuide] = useState<'global' | 'workspace' | 'gui'>('global');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedBoilerplate, setCopiedBoilerplate] = useState(false);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [activeModalServer, setActiveModalServer] = useState<AntigravityMcpServer | null>(null);

  const filteredServers = useMemo(() => {
    return servers.filter((s) => {
      const matchesCat = selectedCategory === 'All MCPs' || s.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCat;
      const matchesSearch = 
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.maintainer.toLowerCase().includes(q) ||
        s.slug.toLowerCase().includes(q) ||
        s.keyFeatures.some((f) => f.toLowerCase().includes(q)) ||
        s.category.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [servers, selectedCategory, searchQuery]);

  function getSnippet(server: AntigravityMcpServer): string {
    if (server.transport === 'sse' && server.serverUrl) {
      return JSON.stringify({
        mcpServers: {
          [server.slug]: {
            serverUrl: server.serverUrl
          }
        }
      }, null, 2);
    }

    const configObj = {
      mcpServers: {
        [server.slug]: {
          command: server.command || 'npx',
          args: server.args || [],
          ...(server.env ? { env: server.env } : {})
        }
      }
    };
    return JSON.stringify(configObj, null, 2);
  }

  function handleCopy(server: AntigravityMcpServer) {
    const snippet = getSnippet(server);
    navigator.clipboard.writeText(snippet);
    setCopiedId(server.id);
    setTimeout(() => setCopiedId(null), 2500);
  }

  function handleCopyPrompt(prompt: string, id: string) {
    navigator.clipboard.writeText(prompt);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2500);
  }

  function handleCopyBoilerplate(text: string) {
    navigator.clipboard.writeText(text);
    setCopiedBoilerplate(true);
    setTimeout(() => setCopiedBoilerplate(false), 2500);
  }

  const globalConfigSnippet = `{
  "mcpServers": {
    "google-flow": {
      "command": "npx",
      "args": ["-y", "@google/antigravity-flow-mcp@latest"],
      "env": { "FLOW_API_KEY": "your_key_here" }
    },
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_..." }
    }
  }
}`;

  return (
    <div className="pb-16">
      {/* ------------------------------------------------------------- */}
      {/* HOW TO ADD MCPs IN ANTIGRAVITY - INTERACTIVE QUICKSTART GUIDE */}
      {/* ------------------------------------------------------------- */}
      <section className="obsidian-card rounded-2xl p-6 sm:p-8 mb-10 border border-white/10">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
              <Terminal size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-['Geist',sans-serif]">
                How to Add MCPs to Google Antigravity (AGY)
              </h2>
              <p className="text-xs text-zinc-400 font-light">
                Choose your configuration method: Global (all sessions), Workspace (repo-specific), or Antigravity IDE UI.
              </p>
            </div>
          </div>

          <div className="inline-flex bg-zinc-900/90 rounded-xl p-1 border border-white/10">
            <button
              onClick={() => setActiveTabGuide('global')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTabGuide === 'global'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Settings size={13} />
              <span>Global Config</span>
            </button>
            <button
              onClick={() => setActiveTabGuide('workspace')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTabGuide === 'workspace'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <FolderGit2 size={13} />
              <span>Workspace Repo</span>
            </button>
            <button
              onClick={() => setActiveTabGuide('gui')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTabGuide === 'gui'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Monitor size={13} />
              <span>Antigravity IDE GUI</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Global Config */}
        {activeTabGuide === 'global' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  FILE PATH
                </span>
                <code className="text-xs text-white font-mono bg-zinc-900 px-2 py-0.5 rounded border border-white/10">
                  ~/.gemini/config/mcp_config.json
                </code>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light mb-3">
                Global MCP servers are mounted across <strong className="text-white">all Antigravity workspaces</strong> and <strong className="text-white">CLI conversations</strong> on your computer.
              </p>
              <ul className="text-xs text-zinc-400 space-y-1.5 font-light pl-4 list-disc">
                <li>Supports standard <code className="text-cyan-300 font-mono">stdio</code> commands (npx, uvx, docker, binaries).</li>
                <li>Supports <code className="text-violet-300 font-mono">sse</code> remote streaming URLs.</li>
                <li>Lazy tools are automatically discovered and called on demand via native reasoning.</li>
              </ul>
            </div>

            <div className="bg-black/80 border border-white/10 rounded-xl p-4 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  mcp_config.json boilerplate
                </span>
                <button
                  onClick={() => handleCopyBoilerplate(globalConfigSnippet)}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[11px] font-medium hover:bg-cyan-500/25 transition-colors"
                >
                  {copiedBoilerplate ? <Check size={11} /> : <Copy size={11} />}
                  <span>{copiedBoilerplate ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <pre className="text-xs text-cyan-300 font-mono overflow-x-auto leading-relaxed">
                {globalConfigSnippet}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 2: Workspace Repo */}
        {activeTabGuide === 'workspace' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-violet-500/15 text-violet-300 border border-violet-500/30">
                  WORKSPACE PATH
                </span>
                <code className="text-xs text-white font-mono bg-zinc-900 px-2 py-0.5 rounded border border-white/10">
                  .agents/mcp_config.json
                </code>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light mb-3">
                Commit this file to your git repository root inside the <code className="text-cyan-300 font-mono">.agents/</code> folder. Antigravity automatically detects it when opening the repository, allowing your entire team to share identical tools and databases.
              </p>
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/25 text-xs text-amber-300 font-light">
                <strong>Security Tip:</strong> Never commit API keys or database passwords to git. Reference environment variables or keep credentials in local untracked config files.
              </div>
            </div>

            <div className="bg-black/80 border border-white/10 rounded-xl p-4">
              <div className="text-xs font-mono text-zinc-400 mb-2 font-medium">
                Quick Terminal Command:
              </div>
              <pre className="text-xs text-emerald-300 font-mono bg-zinc-950 p-2.5 rounded-lg border border-white/5 overflow-x-auto mb-2">
                mkdir -p .agents &amp;&amp; touch .agents/mcp_config.json
              </pre>
              <p className="text-xs text-zinc-500 font-light">
                Antigravity merges workspace servers with your global servers, giving precedence to the project repository.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Antigravity IDE GUI */}
        {activeTabGuide === 'gui' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/[0.08]">
              <div className="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs mb-2 font-mono">
                1
              </div>
              <h4 className="text-xs font-semibold text-white mb-1 font-['Geist',sans-serif]">Skills &amp; Customizations</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                In Antigravity 2.0 or Antigravity IDE, navigate to the Left Sidebar and select <strong>Skills &amp; Customizations</strong> (or <strong>&ldquo;...&rdquo;</strong> menu &gt; <strong>MCP Servers</strong>).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/[0.08]">
              <div className="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs mb-2 font-mono">
                2
              </div>
              <h4 className="text-xs font-semibold text-white mb-1 font-['Geist',sans-serif]">Add Server Config</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Click <strong>&ldquo;Add MCP Server&rdquo;</strong>. Choose between Stdio (Command/Args) or SSE (Remote URL). Paste the one-click JSON block from below.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/[0.08]">
              <div className="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs mb-2 font-mono">
                3
              </div>
              <h4 className="text-xs font-semibold text-white mb-1 font-['Geist',sans-serif]">Instant Tool Injection</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Save the server. Antigravity runs discovery and registers the tools for your active session immediately.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Category Navigation Filter Pills */}
      <div className="flex justify-center flex-wrap gap-2 mb-8">
        {ANTIGRAVITY_MCP_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? 'bg-cyan-500/20 border border-cyan-500/50 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'bg-zinc-900/80 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
              }`}
            >
              {CATEGORY_ICONS[cat]}
              <span>{cat}</span>
              {cat === 'All MCPs' && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                  {servers.length}
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
            placeholder="Search Antigravity MCP servers (Google Flow, DevTools, Postgres, GitHub)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-24 py-3 bg-zinc-950/80 border border-white/10 hover:border-cyan-500/30 focus:border-cyan-500/60 rounded-xl text-sm text-white placeholder-zinc-500 outline-none backdrop-blur-md transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
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
      </div>

      {/* Servers Grid */}
      {filteredServers.length === 0 ? (
        <div className="text-center py-16 px-4 bg-zinc-950/50 rounded-2xl border border-white/10 max-w-md mx-auto">
          <Layers size={32} className="mx-auto text-zinc-600 mb-3" />
          <h3 className="text-white font-medium mb-1">No MCP servers match &ldquo;{searchQuery}&rdquo;</h3>
          <p className="text-xs text-zinc-400 mb-4">Try searching for &ldquo;google&rdquo;, &ldquo;database&rdquo;, or &ldquo;git&rdquo;</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All MCPs'); }}
            className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-white transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
          {filteredServers.map((server) => {
            const isCopied = copiedId === server.id;
            return (
              <div
                key={server.id}
                className="obsidian-card rounded-2xl p-6 flex flex-col justify-between border border-white/10 hover:border-cyan-500/30 transition-all duration-200 group relative"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform flex-shrink-0">
                        {server.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-base font-['Geist',sans-serif] group-hover:text-cyan-300 transition-colors">
                          {server.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-cyan-400 font-mono">
                            {server.maintainer}
                          </span>
                          {server.verified && (
                            <span title="Verified Antigravity Server">
                              <ShieldCheck size={13} className="text-emerald-400" />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Transport & Stars Badges */}
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                        server.transport === 'sse'
                          ? 'bg-violet-500/15 border border-violet-500/30 text-violet-300'
                          : 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-300'
                      }`}>
                        {server.transport}
                      </span>
                      {server.stars && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-amber-300 font-mono">
                          <Star size={11} className="fill-amber-400 text-amber-400" /> {server.stars}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                    {server.description}
                  </p>

                  {/* Key Features Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {server.keyFeatures.slice(0, 3).map((feat, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-zinc-900/80 border border-white/5"
                      >
                        • {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleCopy(server)}
                    className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      isCopied
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30'
                    }`}
                  >
                    {isCopied ? <Check size={13} /> : <Copy size={13} />}
                    <span>{isCopied ? 'Config Copied!' : 'Copy AGY JSON'}</span>
                  </button>

                  <button
                    onClick={() => setActiveModalServer(server)}
                    className="px-3 py-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 text-xs text-zinc-300 hover:text-white transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Detail Drawer */}
      {activeModalServer && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
          onClick={() => setActiveModalServer(null)}
        >
          <div
            className="obsidian-card bg-zinc-950 border border-white/10 rounded-2xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activeModalServer.icon}</span>
                <div>
                  <h3 className="text-white text-lg font-semibold font-['Geist',sans-serif]">
                    {activeModalServer.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-cyan-400 font-mono">
                      {activeModalServer.maintainer}
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-[11px] text-zinc-400">
                      {activeModalServer.category}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveModalServer(null)}
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Description */}
            <p className="text-zinc-300 text-sm leading-relaxed mb-5 font-light">
              {activeModalServer.description}
            </p>

            {/* Antigravity Pro Tip (Lazy Loading) */}
            {activeModalServer.lazyRecommendation && (
              <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/25 mb-5 flex items-start gap-2.5">
                <Zap size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-zinc-300 leading-relaxed font-light">
                  <strong className="text-white">Antigravity Lazy-Loading Recommended:</strong> This server provides extensive tool schemas. In Antigravity, lazy-loading mounts tools on demand, saving ~1,200 tokens of initial context.
                </div>
              </div>
            )}

            {/* Tested Agent Prompt */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 mb-5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono font-bold text-amber-300 uppercase tracking-wider">
                  Tested Prompt for Antigravity Agent:
                </span>
                <button
                  onClick={() => handleCopyPrompt(activeModalServer.samplePrompt, activeModalServer.id)}
                  className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300"
                >
                  {copiedPromptId === activeModalServer.id ? <Check size={11} /> : <Copy size={11} />}
                  <span>{copiedPromptId === activeModalServer.id ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-zinc-200 font-light italic">
                &ldquo;{activeModalServer.samplePrompt}&rdquo;
              </p>
            </div>

            {/* JSON Config Snippet */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-medium text-zinc-300">
                  Add to <code className="text-cyan-300">mcp_config.json</code>:
                </span>
                <button
                  onClick={() => handleCopy(activeModalServer)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-medium hover:bg-cyan-500/30 transition-colors"
                >
                  {copiedId === activeModalServer.id ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedId === activeModalServer.id ? 'Copied!' : 'Copy Snippet'}</span>
                </button>
              </div>
              <pre className="p-3.5 rounded-xl bg-black/80 border border-white/10 font-mono text-xs text-cyan-300 overflow-x-auto">
                {getSnippet(activeModalServer)}
              </pre>
            </div>

            {/* Environment Variables Requirement */}
            {activeModalServer.env && Object.keys(activeModalServer.env).length > 0 && (
              <div className="mb-6">
                <span className="text-xs font-mono font-medium text-zinc-300 block mb-2">
                  Required Environment Variables:
                </span>
                <div className="p-3 rounded-xl bg-black/60 border border-white/10 space-y-1.5">
                  {Object.entries(activeModalServer.env).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between text-xs font-mono">
                      <code className="text-amber-300">{key}</code>
                      <span className="text-zinc-500 text-[11px]">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer External Links */}
            <div className="flex justify-end gap-2.5 pt-4 border-t border-white/10">
              <button
                onClick={() => setActiveModalServer(null)}
                className="px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 text-xs text-zinc-300 hover:text-white transition-colors"
              >
                Close
              </button>
              <a
                href={activeModalServer.githubUrl}
                target="_blank"
                rel="noopener nofollow"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition-colors"
              >
                <span>Documentation & Code</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
