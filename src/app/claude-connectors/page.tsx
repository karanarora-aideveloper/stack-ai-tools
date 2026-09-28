import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import ConnectorsView from './ConnectorsView';
import { getAllConnectors } from '@/data/claude-connectors';
import ObsidianHeader from '@/app/components/ObsidianHeader';
import ObsidianFooter from '@/app/components/ObsidianFooter';
import { Sparkles, Terminal, ShieldCheck, Zap, ChevronRight, HelpCircle } from 'lucide-react';

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
    canonical: 'https://www.stackaitools.com/claude-connectors',
  },
  openGraph: {
    title: 'Top Claude Connectors & Plugins (2026): 40+ Verified MCP Servers',
    description: 'Curated directory of top Claude connectors, plugins, and Model Context Protocol (MCP) servers on GitHub. Instant one-click configs for Claude Desktop and Claude Code CLI.',
    url: 'https://www.stackaitools.com/claude-connectors',
    siteName: 'Stack AI Tools',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top Claude Connectors & Plugins (2026): 40+ Verified MCP Servers',
    description: 'Curated directory of top Claude connectors, plugins, and MCP servers on GitHub. Instant one-click configs for Claude Desktop.',
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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.stackaitools.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Claude Connectors',
        item: 'https://www.stackaitools.com/claude-connectors'
      }
    ]
  };

  return (
    <div data-redesign-page="true" className="min-h-screen bg-[#040406] text-[#e3e1ec] antialiased selection:bg-[#8b5cf6] selection:text-white relative">
      {/* Schema.org Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Atmospheric Ambient Glow Mesh */}
      <div className="obsidian-glow-mesh fixed inset-x-0 top-0 h-[700px] pointer-events-none -z-10" />

      {/* Shared Obsidian Luxury Header */}
      <ObsidianHeader activeNav="mcp" />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
        <nav className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/70 border border-white/10 text-xs text-zinc-400 font-mono" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={12} className="text-zinc-600" />
          <span className="text-cyan-400 font-medium">Claude Connectors & MCP Servers</span>
        </nav>
      </div>

      {/* Hero Header Section */}
      <header className="pt-10 pb-8 px-4 md:px-8 max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900/90 border border-cyan-500/30 text-xs text-zinc-300 mb-6 shadow-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="tracking-wide uppercase font-mono text-[11px] text-zinc-400">MODEL CONTEXT PROTOCOL (MCP)</span>
          <span className="text-zinc-600">•</span>
          <span className="text-cyan-400 font-medium">{connectors.length}+ VERIFIED CONNECTORS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-5 font-['Geist',sans-serif] leading-[1.12]">
          Top Claude{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
            Connectors &amp; Plugins
          </span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light mb-10">
          Curated catalog of official and open-source Model Context Protocol (MCP) servers connecting <strong className="text-zinc-200">Anthropic Claude Desktop</strong> and <strong className="text-zinc-200">Claude Code CLI</strong> directly to your local filesystem, GitHub repos, PostgreSQL databases, Slack, Notion, and real-time web search.
        </p>

        {/* 4-Stat Metric Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto p-2 rounded-xl bg-zinc-950/60 border border-white/10 backdrop-blur-md">
          <div className="text-center py-2 px-3">
            <div className="text-xl font-bold text-white font-['Geist',sans-serif]">{connectors.length}+</div>
            <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">Verified Connectors</div>
          </div>
          <div className="text-center py-2 px-3 sm:border-l border-white/10">
            <div className="text-xl font-bold text-cyan-400 font-['Geist',sans-serif]">1-Click</div>
            <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">JSON Configs</div>
          </div>
          <div className="text-center py-2 px-3 sm:border-l border-white/10">
            <div className="text-xl font-bold text-violet-400 font-['Geist',sans-serif]">Claude 3.7</div>
            <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">Code CLI Ready</div>
          </div>
          <div className="text-center py-2 px-3 sm:border-l border-white/10 flex flex-col items-center justify-center">
            <div className="text-xl font-bold text-emerald-400 font-['Geist',sans-serif] flex items-center gap-1">
              <ShieldCheck size={17} className="text-emerald-400" />
              <span>100%</span>
            </div>
            <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">Audited Stdio</div>
          </div>
        </div>
      </header>

      {/* Main Interactive Connectors Explorer */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <ConnectorsView connectors={connectors} />
      </main>

      {/* Shared Obsidian Luxury Footer */}
      <ObsidianFooter />
    </div>
  );
}
