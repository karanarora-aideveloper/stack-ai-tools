import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import AntigravityMcpView from './AntigravityMcpView';
import { getAllAntigravityMcps } from '@/data/antigravity-mcp';
import ObsidianHeader from '@/app/components/ObsidianHeader';
import ObsidianFooter from '@/app/components/ObsidianFooter';
import { Sparkles, Terminal, ShieldCheck, Zap, Cpu, ChevronRight } from 'lucide-react';

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
    title: 'Top Antigravity MCP Servers & Tools (2026): 40+ Verified AGY Connectors',
    description: 'Curated catalog of top Model Context Protocol (MCP) servers and tools for Google Antigravity (AGY). One-click mcp_config.json configs and setup guide.',
    url: 'https://www.stackaitools.com/antigravity-mcp',
    siteName: 'Stack AI Tools',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top Antigravity MCP Servers & Tools (2026): 40+ Verified Connectors',
    description: 'Curated directory of top Model Context Protocol (MCP) servers for Google Antigravity. Instant one-click mcp_config.json configs.',
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
        name: 'Antigravity MCP Servers',
        item: 'https://www.stackaitools.com/antigravity-mcp'
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
          <span className="text-cyan-400 font-medium">Antigravity MCP Servers &amp; Tools</span>
        </nav>
      </div>

      {/* Hero Header Section */}
      <header className="pt-10 pb-8 px-4 md:px-8 max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900/90 border border-cyan-500/30 text-xs text-zinc-300 mb-6 shadow-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="tracking-wide uppercase font-mono text-[11px] text-zinc-400">GOOGLE ANTIGRAVITY (AGY) ECOSYSTEM</span>
          <span className="text-zinc-600">•</span>
          <span className="text-cyan-400 font-medium">{servers.length}+ MCP SERVERS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-5 font-['Geist',sans-serif] leading-[1.12]">
          Top Antigravity{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-amber-300 bg-clip-text text-transparent">
            MCP Servers &amp; Tools
          </span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light mb-10">
          Curated catalog of official and verified Model Context Protocol (MCP) servers for <strong className="text-zinc-200">Google Antigravity (AGY)</strong>, the premier platform for autonomous AI coding agents. Connect your agent to <strong className="text-zinc-200">Google Flow 2.0, Stitch UI, GA4, GSC, Chrome DevTools, GitHub, Neon Postgres, Qdrant, Cognee</strong>, and live web grounding with one-click JSON configurations.
        </p>

        {/* 4-Stat Metric Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto p-2 rounded-xl bg-zinc-950/60 border border-white/10 backdrop-blur-md">
          <div className="text-center py-2 px-3">
            <div className="text-xl font-bold text-white font-['Geist',sans-serif]">{servers.length}+</div>
            <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">MCP Servers</div>
          </div>
          <div className="text-center py-2 px-3 sm:border-l border-white/10">
            <div className="text-xl font-bold text-cyan-400 font-['Geist',sans-serif]">1-Click</div>
            <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">mcp_config.json</div>
          </div>
          <div className="text-center py-2 px-3 sm:border-l border-white/10">
            <div className="text-xl font-bold text-violet-400 font-['Geist',sans-serif]">AGY 2.0</div>
            <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">Gemini 3.8 Ready</div>
          </div>
          <div className="text-center py-2 px-3 sm:border-l border-white/10 flex flex-col items-center justify-center">
            <div className="text-xl font-bold text-emerald-400 font-['Geist',sans-serif] flex items-center gap-1">
              <ShieldCheck size={17} className="text-emerald-400" />
              <span>100%</span>
            </div>
            <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">Schema Verified</div>
          </div>
        </div>
      </header>

      {/* Main Interactive Antigravity MCP Explorer */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <AntigravityMcpView servers={servers} />
      </main>

      {/* Shared Obsidian Luxury Footer */}
      <ObsidianFooter />
    </div>
  );
}
