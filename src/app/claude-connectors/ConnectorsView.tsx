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
    <div style={{ minHeight: '100vh', paddingBottom: 80 }}>
      {/* Category Navigation Pills */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10, margin: '24px 0 32px' }}>
        {CONNECTOR_CATEGORIES.map((cat) => {
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
                color: isActive ? '#fff' : 'var(--text-secondary)',
                boxShadow: isActive ? '0 0 16px rgba(56, 189, 248, 0.25)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {CATEGORY_ICONS[cat]}
              <span>{cat}</span>
              {cat === 'All Connectors' && (
                <span style={{ fontSize: 11, background: 'rgba(var(--ink-tint-rgb), 0.1)', padding: '2px 7px', borderRadius: 10 }}>
                  {connectors.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Search Input Bar */}
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
            placeholder="Search Claude connectors (e.g. GitHub, Postgres, Notion, Slack, Brave, MCP)..."
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
            >
              <X size={16} />
            </button>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, padding: '0 8px', fontSize: 12.5, color: 'var(--text-muted)' }}>
          <span>Showing <strong>{filteredConnectors.length}</strong> of {connectors.length} verified connectors</span>
          <span>Updated as of <strong>September 2026</strong></span>
        </div>
      </div>

      {/* Connectors Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: 24,
        maxWidth: 1280,
        margin: '0 auto 60px'
      }}>
        {filteredConnectors.map((c) => {
          const isCopied = copiedId === c.id;
          return (
            <div
              key={c.id}
              style={{
                background: 'linear-gradient(180deg, var(--bg-card-hover) 0%, var(--bg-card) 100%)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 16,
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Header */}
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 46,
                      height: 46,
                      borderRadius: 12,
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 24
                    }}>
                      {c.icon}
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: 'var(--text-strong)' }}>
                        {c.name}
                      </h3>
                      <span style={{ fontSize: 12, color: 'var(--arcade-cyan)', fontWeight: 600 }}>
                        {c.category}
                      </span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                    {c.official && (
                      <span style={{
                        fontSize: 11,
                        padding: '3px 8px',
                        borderRadius: 12,
                        background: 'rgba(168, 85, 247, 0.15)',
                        color: 'var(--color-frontier)',
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4
                      }}>
                        <ShieldCheck size={11} /> Official
                      </span>
                    )}
                    {c.stars && (
                      <span style={{
                        fontSize: 11,
                        color: 'var(--color-warning)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 3,
                        fontWeight: 600
                      }}>
                        <Star size={11} fill="#fbbf24" /> {c.stars}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p style={{ color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.6, margin: '0 0 16px', minHeight: 64 }}>
                  {c.description}
                </p>

                {/* Key Features Chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
                  {c.keyFeatures.map((feat, fIdx) => (
                    <span
                      key={fIdx}
                      style={{
                        fontSize: 11,
                        padding: '3px 8px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 6,
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ paddingTop: 16, borderTop: '1px solid rgba(var(--ink-tint-rgb), 0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                  <button
                    onClick={() => handleCopy(c)}
                    style={{
                      flex: 1,
                      padding: '8px 14px',
                      borderRadius: 8,
                      fontSize: 12.5,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      border: isCopied ? '1px solid var(--color-success)' : '1px solid var(--color-info)',
                      background: isCopied
                        ? 'color-mix(in srgb, var(--color-success) 15%, transparent)'
                        : 'color-mix(in srgb, var(--color-info) 12%, transparent)',
                      color: isCopied ? 'var(--color-success)' : 'var(--color-info)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {isCopied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{isCopied ? 'Copied Config!' : 'Copy Claude Config'}</span>
                  </button>

                  <button
                    onClick={() => setActiveModalConnector(c)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 8,
                      fontSize: 12.5,
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: '1px solid rgba(var(--ink-tint-rgb), 0.15)',
                      background: 'rgba(var(--ink-tint-rgb), 0.04)',
                      color: 'var(--text-strong)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <span>View Setup</span>
                  </button>

                  <a
                    href={c.githubUrl}
                    target="_blank"
                    rel="noopener nofollow"
                    title="View GitHub Repository"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      border: '1px solid rgba(var(--ink-tint-rgb), 0.15)',
                      background: 'rgba(var(--ink-tint-rgb), 0.04)',
                      color: 'var(--text-secondary)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none'
                    }}
                  >
                    <ExternalLink size={15} />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Step-by-Step Installation Tutorial Section */}
      <section style={{
        maxWidth: 1100,
        margin: '0 auto 60px',
        padding: 36,
        background: 'linear-gradient(180deg, var(--bg-card-hover) 0%, var(--bg-card) 100%)',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        borderRadius: 20
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--arcade-cyan)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            STEP-BY-STEP QUICKSTART
          </span>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-strong)', margin: '6px 0 10px' }}>
            How to Install Claude Connectors & Plugins (MCP)
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 640, margin: '0 auto', fontSize: 14.5 }}>
            Follow these three quick steps to enable persistent files, databases, search, and development tools inside Claude Desktop or Claude Code CLI.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: 12, padding: 22 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--arcade-cyan)', color: 'var(--text-on-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: 12 }}>
              1
            </div>
            <h4 style={{ color: 'var(--text-strong)', margin: '0 0 8px', fontSize: 15 }}>Locate Your Config File</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.6, margin: '0 0 12px' }}>
              Open your Claude Desktop configuration file on your machine:
            </p>
            <div style={{ background: 'rgba(15, 23, 42, 0.85)', padding: '8px 12px', borderRadius: 6, fontSize: 11.5, color: '#38bdf8', fontFamily: 'monospace', overflowWrap: 'anywhere' }}>
              macOS: ~/Library/Application Support/Claude/claude_desktop_config.json
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.85)', padding: '8px 12px', borderRadius: 6, fontSize: 11.5, color: '#38bdf8', fontFamily: 'monospace', marginTop: 6, overflowWrap: 'anywhere' }}>
              Windows: %APPDATA%\Claude\claude_desktop_config.json
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: 12, padding: 22 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--arcade-cyan)', color: 'var(--text-on-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: 12 }}>
              2
            </div>
            <h4 style={{ color: 'var(--text-strong)', margin: '0 0 8px', fontSize: 15 }}>Paste Connector JSON</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.6, margin: '0 0 12px' }}>
              Click <strong>&ldquo;Copy Claude Config&rdquo;</strong> on any connector card above and merge it into your <code style={{ color: 'var(--color-info)' }}>mcpServers</code> dictionary.
            </p>
            <div style={{ background: 'rgba(15, 23, 42, 0.85)', padding: '8px 12px', borderRadius: 6, fontSize: 11.5, color: '#a5b4fc', fontFamily: 'monospace', overflowWrap: 'anywhere' }}>
              &#123; &quot;mcpServers&quot;: &#123; &quot;github&quot;: &#123; ... &#125; &#125; &#125;
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: 12, padding: 22 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--arcade-cyan)', color: 'var(--text-on-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: 12 }}>
              3
            </div>
            <h4 style={{ color: 'var(--text-strong)', margin: '0 0 8px', fontSize: 15 }}>Restart Claude Desktop</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.6, margin: '0 0 12px' }}>
              Restart the Claude Desktop application. You will see a small hammer icon 🔨 in the input prompt indicating active tools ready to execute!
            </p>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '8px 12px', borderRadius: 6, fontSize: 12, color: 'var(--color-success)' }}>
              ✓ Ready for autonomous tool use
            </div>
          </div>
        </div>
      </section>

      {/* Modal Detail Drawer */}
      {activeModalConnector && (
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
          onClick={() => setActiveModalConnector(null)}
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
              boxShadow: '0 25px 60px rgba(15, 23, 42, 0.18)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 32 }}>{activeModalConnector.icon}</span>
                <div>
                  <h3 style={{ margin: 0, color: 'var(--text-strong)', fontSize: 20, fontWeight: 700 }}>
                    {activeModalConnector.name} Setup
                  </h3>
                  <span style={{ fontSize: 12.5, color: 'var(--arcade-cyan)' }}>
                    Maintainer: {activeModalConnector.maintainer}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveModalConnector(null)}
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
              >
                <X size={18} />
              </button>
            </div>

            {/* Description */}
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
              {activeModalConnector.description}
            </p>

            {/* Sample Prompt Box */}
            <div style={{ background: 'rgba(var(--ink-tint-rgb), 0.03)', border: '1px solid rgba(var(--ink-tint-rgb), 0.08)', borderRadius: 10, padding: 14, marginBottom: 20 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-amber)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Tested Prompt to Run in Claude:
              </span>
              <p style={{ margin: '6px 0 0', color: 'var(--text-primary)', fontSize: 13, fontStyle: 'italic' }}>
                &ldquo;{activeModalConnector.samplePrompt}&rdquo;
              </p>
            </div>

            {/* JSON Config Snippet */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-strong)' }}>
                  claude_desktop_config.json block:
                </span>
                <button
                  onClick={() => handleCopy(activeModalConnector)}
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
                  {copiedId === activeModalConnector.id ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedId === activeModalConnector.id ? 'Copied!' : 'Copy Code'}</span>
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
                {getSnippet(activeModalConnector)}
              </pre>
            </div>

            {/* Claude Code CLI command */}
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-strong)', display: 'block', marginBottom: 6 }}>
                Or Add via Claude Code CLI:
              </span>
              <div style={{
                background: '#090d16',
                border: '1px solid rgba(var(--ink-tint-rgb), 0.1)',
                padding: '10px 14px',
                borderRadius: 8,
                fontSize: 12,
                color: 'var(--color-success)',
                fontFamily: 'monospace',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <code>claude mcp add {activeModalConnector.slug} {activeModalConnector.command} {activeModalConnector.args.join(' ')}</code>
              </div>
            </div>

            {/* Footer External Links */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button
                onClick={() => setActiveModalConnector(null)}
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
                href={activeModalConnector.githubUrl}
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
                <span>View on GitHub</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
