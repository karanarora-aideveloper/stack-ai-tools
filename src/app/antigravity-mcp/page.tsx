import React from 'react';
import { Metadata } from 'next';
import AntigravityMcpView from './AntigravityMcpView';
import { getAllAntigravityMcps } from '@/data/antigravity-mcp';
import { Sparkles, Terminal, ShieldCheck, Zap, Cpu } from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'Top Antigravity MCP Servers & Tools (2026) | Stack AI Tools' },
  description: 'Curated directory of Model Context Protocol (MCP) servers and tools for Google Antigravity (AGY) in 2026. Instant one-click mcp_config.json snippets for Google Flow, Chrome DevTools, GitHub, Postgres, and web search.',
  keywords: [
    'antigravity mcp',
    'antigravity mcp servers',
    'google antigravity tools',
    'mcp tools for antigravity',
    'agy mcp',
    'model context protocol antigravity',
    'google flow mcp',
    'chrome devtools mcp',
    'mcp_config.json antigravity',
    'antigravity vibe coding'
  ],
  alternates: {
    canonical: 'https://www.stackaitools.com/antigravity-mcp',
  },
  openGraph: {
    title: 'Top Antigravity MCP Servers & Tools (2026): 30+ Verified AGY Connectors',
    description: 'Curated catalog of top Model Context Protocol (MCP) servers and tools for Google Antigravity (AGY). One-click mcp_config.json configs and setup guide.',
    url: 'https://www.stackaitools.com/antigravity-mcp',
    siteName: 'Stack AI Tools',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Antigravity MCP Servers and Tools Directory 2026',
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top Antigravity MCP Servers & Tools (2026): 30+ Verified Connectors',
    description: 'Curated directory of top Model Context Protocol (MCP) servers for Google Antigravity. Instant one-click mcp_config.json configs.',
    images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'],
  }
};

export default function AntigravityMcpPage() {
  const servers = getAllAntigravityMcps();

  // Schema.org Structured Data
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Top Google Antigravity MCP Servers and Tools Directory (2026)',
    'description': 'Curated catalog of Model Context Protocol (MCP) servers and integrations connecting Google Antigravity (AGY) to Google Flow, Gmail, GitHub, Postgres, DevTools, and local filesystem.',
    'numberOfItems': servers.length,
    'itemListElement': servers.map((s, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'name': s.name,
      'description': s.description,
      'url': s.githubUrl
    }))
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'How to Configure and Add MCP Servers in Google Antigravity (AGY)',
    'description': 'Step-by-step tutorial to configure Model Context Protocol (MCP) servers in Google Antigravity using mcp_config.json and the Antigravity IDE UI.',
    'step': [
      {
        '@type': 'HowToStep',
        'position': 1,
        'name': 'Locate or create mcp_config.json',
        'text': 'For global use across all projects, open ~/.gemini/config/mcp_config.json. For project-specific tools, create .agents/mcp_config.json in your git repository root.'
      },
      {
        '@type': 'HowToStep',
        'position': 2,
        'name': 'Add MCP Server JSON definition',
        'text': 'Paste the stdio command/args block or sse remote serverUrl block under the mcpServers object.'
      },
      {
        '@type': 'HowToStep',
        'position': 3,
        'name': 'Open Antigravity and prompt your agent',
        'text': 'Antigravity automatically discovers the tools and injects them into the agent toolset. You can prompt the agent to use the tool immediately.'
      }
    ]
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Schema.org Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '48px 24px 0' }}>
        {/* Hero Section */}
        <header style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 20,
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(168, 85, 247, 0.15))',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            color: 'var(--arcade-cyan)',
            fontSize: 12.5,
            fontWeight: 700,
            letterSpacing: '0.04em',
            marginBottom: 16
          }}>
            <Cpu size={14} />
            <span>GOOGLE ANTIGRAVITY (AGY) • MCP ECOSYSTEM DIRECTORY (2026)</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            color: 'var(--text-strong)',
            margin: '0 0 16px'
          }}>
            Top Antigravity <span style={{
              background: 'linear-gradient(135deg, #38bdf8 0%, #a855f7 50%, #f43f5e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>MCP Servers &amp; Tools</span>
          </h1>

          <p style={{
            color: 'var(--text-muted)',
            fontSize: '1.08rem',
            lineHeight: 1.7,
            maxWidth: 820,
            margin: '0 auto 28px'
          }}>
            Curated catalog of official and verified Model Context Protocol (MCP) servers for <strong>Google Antigravity (AGY)</strong>, the premier platform for autonomous AI coding agents. Connect your agent to <strong>Google Flow, Gmail, Chrome DevTools, GitHub, PostgreSQL, Playwright</strong>, and live web grounding with one-click JSON configurations.
          </p>

          {/* Quick Metrics Badge Strip */}
          <div style={{
            display: 'inline-flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 16,
            padding: '12px 24px',
            background: 'var(--bg-glass)',
            border: '1px solid rgba(var(--ink-tint-rgb), 0.08)',
            borderRadius: 30,
            fontSize: 13,
            color: 'var(--text-secondary)'
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <ShieldCheck size={14} color="var(--color-info)" /> <strong>{servers.length} Verified MCP Servers</strong>
            </span>
            <span style={{ color: 'rgba(var(--ink-tint-rgb), 0.3)' }}>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Terminal size={14} color="var(--color-success)" /> <strong>One-Click mcp_config.json</strong>
            </span>
            <span style={{ color: 'rgba(var(--ink-tint-rgb), 0.3)' }}>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Zap size={14} color="var(--color-warning)" /> <strong>Gemini 3.8 &amp; AGY 2.0 Ready</strong>
            </span>
          </div>
        </header>

        {/* Antigravity MCP Explorer */}
        <AntigravityMcpView servers={servers} />
      </div>
    </main>
  );
}
