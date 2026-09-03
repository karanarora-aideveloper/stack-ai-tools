import React from 'react';
import { Metadata } from 'next';
import ConnectorsView from './ConnectorsView';
import { getAllConnectors } from '@/data/claude-connectors';
import { Sparkles, Terminal, ShieldCheck, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'Claude Connectors & MCP Servers (2026)' },
  description: 'Curated directory of top Claude connectors, plugins, and Model Context Protocol (MCP) servers on GitHub in 2026. One-click Claude Desktop configs for GitHub, PostgreSQL, Notion, Slack, and web search.',
  keywords: [
    'claude connectors',
    'claude plugins',
    'mcp servers',
    'model context protocol',
    'claude desktop connectors',
    'claude code plugins',
    'github mcp servers',
    'claude integrations',
    'anthropic mcp',
    'claude postgresql connector',
    'claude github connector',
    'readwise reader mcp server'
  ],
  alternates: {
    canonical: 'https://stackaitools.com/claude-connectors',
  },
  openGraph: {
    title: 'Top Claude Connectors & Plugins (2026): 40+ Verified MCP Servers',
    description: 'Curated directory of top Claude connectors, plugins, and Model Context Protocol (MCP) servers on GitHub. Instant one-click configs for Claude Desktop and Claude Code CLI.',
    url: 'https://stackaitools.com/claude-connectors',
    siteName: 'Stack AI Tools',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Top Claude Connectors and Plugins Directory 2026',
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top Claude Connectors & Plugins (2026): 40+ Verified MCP Servers',
    description: 'Curated directory of top Claude connectors, plugins, and MCP servers on GitHub. Instant one-click configs for Claude Desktop.',
    images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'],
  }
};

export default function ClaudeConnectorsPage() {
  const connectors = getAllConnectors();

  // Schema.org Structured Data
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Top Claude Connectors and Plugins Directory (2026)',
    'description': 'Curated catalog of top Model Context Protocol (MCP) servers and plugins connecting Claude to external tools, databases, and APIs.',
    'numberOfItems': connectors.length,
    'itemListElement': connectors.map((c, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'name': c.name,
      'description': c.description,
      'url': c.githubUrl
    }))
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'How to Install Claude Connectors and MCP Plugins in Claude Desktop',
    'description': 'Step-by-step guide to installing Model Context Protocol (MCP) servers into Anthropic Claude Desktop configuration.',
    'step': [
      {
        '@type': 'HowToStep',
        'position': 1,
        'name': 'Locate claude_desktop_config.json',
        'text': 'Open your user configuration folder on macOS (~/Library/Application Support/Claude/) or Windows (%APPDATA%\\Claude\\).'
      },
      {
        '@type': 'HowToStep',
        'position': 2,
        'name': 'Add Connector Configuration',
        'text': 'Copy the JSON snippet for your chosen connector and merge it into the mcpServers object in claude_desktop_config.json.'
      },
      {
        '@type': 'HowToStep',
        'position': 3,
        'name': 'Restart Claude Desktop',
        'text': 'Restart the Claude Desktop application to initialize active tools and verify the hammer icon.'
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
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(56, 189, 248, 0.15))',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            color: '#c084fc',
            fontSize: 12.5,
            fontWeight: 700,
            letterSpacing: '0.04em',
            marginBottom: 16
          }}>
            <Sparkles size={14} />
            <span>MODEL CONTEXT PROTOCOL (MCP) DIRECTORY • 2026 TESTED</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            color: 'var(--text-strong)',
            margin: '0 0 16px'
          }}>
            Top Claude <span style={{
              background: 'linear-gradient(135deg, #38bdf8 0%, #a855f7 50%, #f43f5e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Connectors & Plugins</span>
          </h1>

          <p style={{
            color: 'var(--text-muted)',
            fontSize: '1.08rem',
            lineHeight: 1.7,
            maxWidth: 780,
            margin: '0 auto 28px'
          }}>
            Curated catalog of official and open-source Model Context Protocol (MCP) servers connecting <strong>Anthropic Claude Desktop</strong> and <strong>Claude Code CLI</strong> directly to your local filesystem, GitHub repos, PostgreSQL databases, Slack, Notion, and real-time web search.
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
              <ShieldCheck size={14} color="var(--color-info)" /> <strong>{connectors.length} Verified Connectors</strong>
            </span>
            <span style={{ color: 'rgba(var(--ink-tint-rgb), 0.3)' }}>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Terminal size={14} color="var(--color-success)" /> <strong>One-Click JSON Configs</strong>
            </span>
            <span style={{ color: 'rgba(var(--ink-tint-rgb), 0.3)' }}>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Zap size={14} color="var(--color-warning)" /> <strong>Claude 3.7 & Claude Code Ready</strong>
            </span>
          </div>
        </header>

        {/* Connectors Explorer */}
        <ConnectorsView connectors={connectors} />
      </div>
    </main>
  );
}
