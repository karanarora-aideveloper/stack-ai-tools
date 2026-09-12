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
  Cpu
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
    <div style={{ minHeight: '100vh', paddingBottom: 80 }}>
      {/* ------------------------------------------------------------- */}
      {/* HOW TO ADD MCPs IN ANTIGRAVITY - INTERACTIVE QUICKSTART GUIDE */}
      {/* ------------------------------------------------------------- */}
      <section style={{
        background: 'var(--bg-glass)',
        border: '1px solid rgba(var(--ink-tint-rgb), 0.12)',
        borderRadius: 20,
        padding: '28px 24px',
        marginBottom: 40,
        boxShadow: '0 12px 36px rgba(15, 23, 42, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
              <Terminal size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: 'var(--text-strong)' }}>
                How to Add MCPs to Google Antigravity (AGY)
              </h2>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
                Choose your configuration method: Global (all sessions), Workspace (repo-specific), or Antigravity IDE UI.
              </p>
            </div>
          </div>

          <div style={{ display: 'inline-flex', background: 'var(--bg-card)', borderRadius: 12, padding: 3, border: '1px solid var(--border-light)' }}>
            <button
              onClick={() => setActiveTabGuide('global')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                borderRadius: 9,
                fontSize: 12.5,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: activeTabGuide === 'global' ? 'var(--arcade-cyan)' : 'transparent',
                color: activeTabGuide === 'global' ? 'var(--text-on-accent)' : 'var(--text-secondary)',
                transition: 'all 0.15s ease'
              }}
            >
              <Settings size={13} />
              <span>Global Config</span>
            </button>
            <button
              onClick={() => setActiveTabGuide('workspace')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                borderRadius: 9,
                fontSize: 12.5,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: activeTabGuide === 'workspace' ? 'var(--arcade-cyan)' : 'transparent',
                color: activeTabGuide === 'workspace' ? 'var(--text-on-accent)' : 'var(--text-secondary)',
                transition: 'all 0.15s ease'
              }}
            >
              <FolderGit2 size={13} />
              <span>Workspace Repo</span>
            </button>
            <button
              onClick={() => setActiveTabGuide('gui')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                borderRadius: 9,
                fontSize: 12.5,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: activeTabGuide === 'gui' ? 'var(--arcade-cyan)' : 'transparent',
                color: activeTabGuide === 'gui' ? 'var(--text-on-accent)' : 'var(--text-secondary)',
                transition: 'all 0.15s ease'
              }}
            >
              <Monitor size={13} />
              <span>Antigravity IDE GUI</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Global Config */}
        {activeTabGuide === 'global' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, padding: '2px 8px', borderRadius: 6, background: 'rgba(56, 189, 248, 0.15)', color: 'var(--color-info)' }}>
                  FILE PATH
                </span>
                <code style={{ fontSize: 13, color: 'var(--text-strong)', fontFamily: 'monospace' }}>
                  ~/.gemini/config/mcp_config.json
                </code>
              </div>
              <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 12px' }}>
                Global MCP servers are mounted across <strong>all Antigravity workspaces</strong> and <strong>CLI conversations</strong> on your computer. Simply create or edit this JSON file in your user home directory.
              </p>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                <li>Supports standard <code style={{ color: 'var(--arcade-cyan)' }}>stdio</code> commands (npx, uvx, docker, binaries).</li>
                <li>Supports <code style={{ color: 'var(--arcade-cyan)' }}>sse</code> remote streaming URLs.</li>
                <li>Lazy tools are automatically discovered and called on demand via native reasoning.</li>
              </ul>
            </div>

            <div style={{ background: '#090d16', border: '1px solid rgba(var(--ink-tint-rgb), 0.12)', borderRadius: 12, padding: 14, position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  mcp_config.json example
                </span>
                <button
                  onClick={() => handleCopyBoilerplate(globalConfigSnippet)}
                  style={{
                    background: 'rgba(56, 189, 248, 0.12)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    color: 'var(--color-info)',
                    padding: '3px 8px',
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                >
                  {copiedBoilerplate ? <Check size={11} /> : <Copy size={11} />}
                  <span>{copiedBoilerplate ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <pre style={{ margin: 0, fontSize: 11.5, color: '#a5b4fc', fontFamily: 'monospace', overflowX: 'auto', lineHeight: 1.45 }}>
                {globalConfigSnippet}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 2: Workspace Repo */}
        {activeTabGuide === 'workspace' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, padding: '2px 8px', borderRadius: 6, background: 'rgba(168, 85, 247, 0.15)', color: 'var(--accent-secondary)' }}>
                  WORKSPACE PATH
                </span>
                <code style={{ fontSize: 13, color: 'var(--text-strong)', fontFamily: 'monospace' }}>
                  .agents/mcp_config.json
                </code>
              </div>
              <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 12px' }}>
                Commit this file to your git repository root inside the <code style={{ color: 'var(--arcade-cyan)' }}>.agents/</code> folder. Antigravity automatically detects it when opening the repository, allowing your entire team to share the exact same tools and databases.
              </p>
              <div style={{ background: 'rgba(234, 179, 8, 0.08)', border: '1px solid rgba(234, 179, 8, 0.25)', padding: '10px 14px', borderRadius: 8, fontSize: 12.5, color: 'var(--accent-amber)' }}>
                <strong>Security Tip:</strong> Never commit API keys or database passwords to git. Reference environment variables or keep credentials in local untracked config files.
              </div>
            </div>

            <div style={{ background: '#090d16', border: '1px solid rgba(var(--ink-tint-rgb), 0.12)', borderRadius: 12, padding: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 8 }}>
                Quick Terminal Setup:
              </div>
              <pre style={{ margin: '0 0 10px', fontSize: 12, color: 'var(--color-success)', fontFamily: 'monospace', overflowX: 'auto', background: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 6 }}>
                mkdir -p .agents &amp;&amp; touch .agents/mcp_config.json
              </pre>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>
                Antigravity will merge workspace servers with your global servers, giving precedence to the project repository.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Antigravity IDE GUI */}
        {activeTabGuide === 'gui' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: 12, padding: 16 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--arcade-cyan)', color: 'var(--text-on-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, marginBottom: 10 }}>
                1
              </div>
              <h4 style={{ margin: '0 0 6px', fontSize: 14, color: 'var(--text-strong)' }}>Open Skills &amp; Customizations</h4>
              <p style={{ margin: 0, fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                In Antigravity 2.0 or Antigravity IDE, navigate to the Left Sidebar and select <strong>Skills &amp; Customizations</strong> (or click the <strong>&ldquo;...&rdquo;</strong> menu &gt; <strong>MCP Servers</strong>).
              </p>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: 12, padding: 16 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--arcade-cyan)', color: 'var(--text-on-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, marginBottom: 10 }}>
                2
              </div>
              <h4 style={{ margin: '0 0 6px', fontSize: 14, color: 'var(--text-strong)' }}>Add Server Config</h4>
              <p style={{ margin: 0, fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Click <strong>&ldquo;Add MCP Server&rdquo;</strong>. Choose between Stdio (Command/Args) or SSE (Remote URL). Paste the one-click JSON block from below.
              </p>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: 12, padding: 16 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--arcade-cyan)', color: 'var(--text-on-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, marginBottom: 10 }}>
                3
              </div>
              <h4 style={{ margin: '0 0 6px', fontSize: 14, color: 'var(--text-strong)' }}>Instant Tool Injection</h4>
              <p style={{ margin: 0, fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Save the server. Antigravity instantly runs discovery, registering the tools for your conversation. You can prompt the agent immediately!
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------- */}
      {/* CATEGORY TABS */}
      {/* ------------------------------------------------------------- */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10, margin: '0 0 28px' }}>
        {ANTIGRAVITY_MCP_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                padding: '9px 18px',
                borderRadius: 24,
                fontSize: 13.5,
                fontWeight: 600,
                cursor: 'pointer',
                border: isActive ? '1px solid var(--arcade-cyan)' : '1px solid var(--border-light)',
                background: isActive ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(99, 102, 241, 0.15))' : 'var(--bg-card)',
                color: isActive ? 'var(--text-strong)' : 'var(--text-secondary)',
                boxShadow: isActive ? '0 0 16px rgba(56, 189, 248, 0.25)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {CATEGORY_ICONS[cat]}
              <span>{cat}</span>
              {cat === 'All MCPs' && (
                <span style={{ fontSize: 11, background: 'rgba(var(--ink-tint-rgb), 0.1)', padding: '2px 7px', borderRadius: 10 }}>
                  {servers.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SEARCH BAR */}
      {/* ------------------------------------------------------------- */}
      <div style={{ maxWidth: 680, margin: '0 auto 36px', position: 'relative' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'var(--bg-glass)',
          border: '1px solid rgba(var(--ink-tint-rgb), 0.15)',
          borderRadius: 14,
          padding: '12px 20px',
          boxShadow: '0 8px 30px rgba(15, 23, 42, 0.12)'
        }}>
          <Search size={19} style={{ color: 'var(--arcade-cyan)', marginRight: 12, flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search Antigravity MCP servers (e.g. Google Flow, DevTools, Postgres, GitHub, Playwright)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-strong)',
              fontSize: 15
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4 }}
              aria-label="Clear search query"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SERVERS GRID */}
      {/* ------------------------------------------------------------- */}
      {filteredServers.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border-light)' }}>
          <Layers size={36} style={{ color: 'var(--text-muted)', marginBottom: 12 }} />
          <h3 style={{ color: 'var(--text-strong)', margin: '0 0 8px' }}>No Antigravity MCP servers match &ldquo;{searchQuery}&rdquo;</h3>
          <p style={{ color: 'var(--text-muted)', margin: '0 0 16px', fontSize: 14 }}>Try searching for &ldquo;Google&rdquo;, &ldquo;database&rdquo;, &ldquo;git&rdquo;, or &ldquo;devtools&rdquo;.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All MCPs'); }}
            style={{ padding: '8px 16px', borderRadius: 8, background: 'var(--arcade-cyan)', color: 'var(--text-on-accent)', border: 'none', fontWeight: 600, cursor: 'pointer' }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: 24
        }}>
          {filteredServers.map((server) => {
            const isCopied = copiedId === server.id;
            return (
              <div
                key={server.id}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 16,
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  position: 'relative'
                }}
              >
                <div>
                  {/* Card Header */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: 'rgba(var(--ink-tint-rgb), 0.04)',
                        border: '1px solid rgba(var(--ink-tint-rgb), 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 22,
                        flexShrink: 0
                      }}>
                        {server.icon}
                      </div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--text-strong)' }}>
                          {server.name}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                          <span style={{ fontSize: 11.5, color: 'var(--arcade-cyan)', fontWeight: 500 }}>
                            {server.maintainer}
                          </span>
                          {server.verified && (
                            <span title="Verified Antigravity Server" style={{ display: 'inline-flex', alignItems: 'center' }}>
                              <ShieldCheck size={13} color="var(--color-info)" />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                      <span style={{
                        fontSize: 10.5,
                        fontWeight: 700,
                        padding: '2px 7px',
                        borderRadius: 6,
                        background: server.transport === 'sse' ? 'rgba(168, 85, 247, 0.15)' : 'rgba(56, 189, 248, 0.15)',
                        color: server.transport === 'sse' ? 'var(--accent-secondary)' : 'var(--color-info)',
                        textTransform: 'uppercase'
                      }}>
                        {server.transport}
                      </span>
                      {server.stars && (
                        <span style={{ fontSize: 11.5, color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                          <Star size={11} color="var(--accent-amber)" fill="var(--accent-amber)" />
                          <span>{server.stars}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{
                    fontSize: 13.5,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.55,
                    margin: '0 0 16px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {server.description}
                  </p>

                  {/* Key Features Bullets */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: 8 }}>
                      Core Capabilities:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {server.keyFeatures.slice(0, 3).map((feat, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: 11.5,
                            padding: '3px 8px',
                            borderRadius: 6,
                            background: 'rgba(var(--ink-tint-rgb), 0.04)',
                            color: 'var(--text-secondary)',
                            border: '1px solid rgba(var(--ink-tint-rgb), 0.08)'
                          }}
                        >
                          • {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                  <button
                    onClick={() => handleCopy(server)}
                    style={{
                      flex: 1,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      padding: '9px 14px',
                      borderRadius: 10,
                      fontSize: 12.5,
                      fontWeight: 600,
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      background: isCopied ? 'rgba(16, 185, 129, 0.15)' : 'rgba(56, 189, 248, 0.1)',
                      color: isCopied ? 'var(--color-success)' : 'var(--color-info)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {isCopied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{isCopied ? 'Config Copied!' : 'Copy Antigravity JSON'}</span>
                  </button>

                  <button
                    onClick={() => setActiveModalServer(server)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      padding: '9px 14px',
                      borderRadius: 10,
                      fontSize: 12.5,
                      fontWeight: 600,
                      border: '1px solid var(--border-light)',
                      background: 'var(--bg-glass)',
                      color: 'var(--text-strong)',
                      cursor: 'pointer'
                    }}
                  >
                    <span>Details</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL DETAIL DRAWER */}
      {/* ------------------------------------------------------------- */}
      {activeModalServer && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            zIndex: 9999
          }}
          onClick={() => setActiveModalServer(null)}
        >
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: 20,
              width: '100%',
              maxWidth: 680,
              padding: 28,
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 25px 60px rgba(15, 23, 42, 0.25)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 32 }}>{activeModalServer.icon}</span>
                <div>
                  <h3 style={{ margin: 0, color: 'var(--text-strong)', fontSize: 20, fontWeight: 700 }}>
                    {activeModalServer.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3 }}>
                    <span style={{ fontSize: 12.5, color: 'var(--arcade-cyan)' }}>
                      Maintainer: {activeModalServer.maintainer}
                    </span>
                    <span style={{ fontSize: 11, background: 'rgba(var(--ink-tint-rgb), 0.08)', padding: '1px 6px', borderRadius: 4, color: 'var(--text-muted)' }}>
                      {activeModalServer.category}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveModalServer(null)}
                style={{
                  background: 'rgba(var(--ink-tint-rgb), 0.06)',
                  border: 'none',
                  borderRadius: 8,
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Description */}
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
              {activeModalServer.description}
            </p>

            {/* Antigravity Pro Tip (Lazy Loading) */}
            {activeModalServer.lazyRecommendation && (
              <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: 10, padding: 12, marginBottom: 20, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Zap size={16} color="var(--arcade-cyan)" style={{ marginTop: 2, flexShrink: 0 }} />
                <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--text-strong)' }}>Antigravity Lazy-Loading Recommended:</strong> This server provides extensive tool schemas. In Antigravity, lazy-loading mounts the tool on demand, saving ~1,200 tokens of initial system context for your coding tasks.
                </div>
              </div>
            )}

            {/* Tested Agent Prompt */}
            <div style={{ background: 'rgba(var(--ink-tint-rgb), 0.03)', border: '1px solid rgba(var(--ink-tint-rgb), 0.08)', borderRadius: 10, padding: 14, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-amber)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Tested Prompt for Antigravity Agent:
                </span>
                <button
                  onClick={() => handleCopyPrompt(activeModalServer.samplePrompt, activeModalServer.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--arcade-cyan)',
                    fontSize: 11.5,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                >
                  {copiedPromptId === activeModalServer.id ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedPromptId === activeModalServer.id ? 'Copied Prompt!' : 'Copy Prompt'}</span>
                </button>
              </div>
              <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: 13, fontStyle: 'italic', lineHeight: 1.5 }}>
                &ldquo;{activeModalServer.samplePrompt}&rdquo;
              </p>
            </div>

            {/* JSON Config Snippet */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-strong)' }}>
                  Add to <code style={{ color: 'var(--arcade-cyan)' }}>mcp_config.json</code> under <code style={{ color: 'var(--arcade-cyan)' }}>mcpServers</code>:
                </span>
                <button
                  onClick={() => handleCopy(activeModalServer)}
                  style={{
                    background: 'rgba(56, 189, 248, 0.1)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    color: 'var(--color-info)',
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: 11.5,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5
                  }}
                >
                  {copiedId === activeModalServer.id ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedId === activeModalServer.id ? 'Copied!' : 'Copy Snippet'}</span>
                </button>
              </div>
              <pre style={{
                background: '#090d16',
                border: '1px solid rgba(var(--ink-tint-rgb), 0.1)',
                padding: 14,
                borderRadius: 8,
                fontSize: 12.5,
                color: 'var(--color-info)',
                overflowX: 'auto',
                fontFamily: 'monospace',
                margin: 0
              }}>
                {getSnippet(activeModalServer)}
              </pre>
            </div>

            {/* Environment Variables Requirement */}
            {activeModalServer.env && Object.keys(activeModalServer.env).length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-strong)', display: 'block', marginBottom: 6 }}>
                  Required Environment Variables:
                </span>
                <div style={{
                  background: 'rgba(var(--ink-tint-rgb), 0.03)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 8,
                  padding: '10px 14px'
                }}>
                  {Object.entries(activeModalServer.env).map(([key, val]) => (
                    <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, padding: '3px 0' }}>
                      <code style={{ color: 'var(--accent-amber)', fontFamily: 'monospace', fontWeight: 600 }}>{key}</code>
                      <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer External Links */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, borderTop: '1px solid var(--border-light)', paddingTop: 16 }}>
              <button
                onClick={() => setActiveModalServer(null)}
                style={{
                  padding: '9px 16px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  border: '1px solid rgba(var(--ink-tint-rgb), 0.15)',
                  background: 'transparent',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
              <a
                href={activeModalServer.githubUrl}
                target="_blank"
                rel="noopener nofollow"
                style={{
                  padding: '9px 18px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  background: 'var(--arcade-cyan)',
                  color: 'var(--text-on-accent)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <span>View Documentation / Code</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
