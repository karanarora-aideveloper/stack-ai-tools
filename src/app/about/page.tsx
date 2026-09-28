import type { Metadata } from 'next';
import Link from 'next/link';
import ObsidianHeader from '@/app/components/ObsidianHeader';
import ObsidianFooter from '@/app/components/ObsidianFooter';
import {
  Sparkles,
  ShieldCheck,
  Terminal,
  Code2,
  Cpu,
  Send,
  Layers,
  Compass,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Lock,
  Zap
} from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'About Stack AI Tools' },
  description: 'Stack AI Tools is an independent directory of frontier AI software, autonomous agents, and prompts — every listing is tested, benchmarked, and verified before publishing.',
  keywords: [
    'about Stack AI Tools',
    'AI tools directory',
    'independent AI software reviews',
    'Stack AI Tools editorial standards'
  ],
  alternates: {
    canonical: 'https://www.stackaitools.com/about'
  },
  openGraph: {
    title: 'About Stack AI Tools',
    description: 'An independent, editorially vetted directory of frontier AI software, autonomous agents, and prompts.',
    url: 'https://www.stackaitools.com/about',
    type: 'website',
    siteName: 'Stack AI Tools'
  }
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  mainEntity: {
    '@type': 'Organization',
    name: 'Stack AI Tools',
    description: 'An independent directory of frontier AI software, autonomous coding agents, generative media models, and tested prompt templates.',
    url: 'https://www.stackaitools.com',
    logo: 'https://www.stackaitools.com/icon.svg',
    founder: {
      '@type': 'Person',
      name: 'Karan Arora',
      jobTitle: 'Founder & Chief AI Architect'
    },
    knowsAbout: [
      'Artificial Intelligence',
      'Autonomous Coding Agents',
      'Prompt Engineering',
      'Large Language Models (LLMs)',
      'Model Context Protocol (MCP)',
      'Machine Learning Systems'
    ]
  }
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
      name: 'About Us',
      item: 'https://www.stackaitools.com/about'
    }
  ]
};

export default function AboutPage() {
  return (
    <div data-redesign-page="true" className="min-h-screen bg-[#040406] text-[#e3e1ec] antialiased selection:bg-[#8b5cf6] selection:text-white relative">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Atmospheric Ambient Glow Mesh */}
      <div className="obsidian-glow-mesh fixed inset-x-0 top-0 h-[700px] pointer-events-none -z-10" />

      {/* Shared Obsidian Luxury Header */}
      <ObsidianHeader activeNav="about" />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
        <nav className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/70 border border-white/10 text-xs text-zinc-400 font-mono" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={12} className="text-zinc-600" />
          <span className="text-violet-400 font-medium">About Us</span>
        </nav>
      </div>

      {/* Hero Header Section */}
      <header className="pt-10 pb-12 px-4 md:px-8 max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900/90 border border-violet-500/30 text-xs text-zinc-300 mb-6 shadow-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
          <span className="tracking-wide uppercase font-mono text-[11px] text-zinc-400">INDEPENDENT DIRECTORY</span>
          <span className="text-zinc-600">•</span>
          <span className="text-violet-400 font-medium">AUDITED 2026</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-5 font-['Geist',sans-serif] leading-[1.12]">
          About{' '}
          <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
            Stack AI Tools
          </span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light mb-10">
          <strong className="text-zinc-200">Stack AI Tools</strong> (<code className="text-violet-300 font-mono text-xs px-1.5 py-0.5 rounded bg-zinc-900 border border-white/10">stackaitools.com</code>) is an independently run directory built to give builders, founders, and creators a transparent, high-performance catalog of vetted artificial intelligence software, autonomous coding agents, and tested prompts — without the marketing noise.
        </p>

        {/* 4-Stat Metric Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto p-2 rounded-xl bg-zinc-950/60 border border-white/10 backdrop-blur-md">
          <div className="text-center py-2 px-3">
            <div className="text-xl font-bold text-white font-['Geist',sans-serif]">220+</div>
            <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">Vetted Tools</div>
          </div>
          <div className="text-center py-2 px-3 sm:border-l border-white/10">
            <div className="text-xl font-bold text-violet-400 font-['Geist',sans-serif]">45+</div>
            <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">Battle-Tested Prompts</div>
          </div>
          <div className="text-center py-2 px-3 sm:border-l border-white/10">
            <div className="text-xl font-bold text-emerald-400 font-['Geist',sans-serif]">0%</div>
            <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">Pay-to-Rank Bias</div>
          </div>
          <div className="text-center py-2 px-3 sm:border-l border-white/10 flex flex-col items-center justify-center">
            <div className="text-xl font-bold text-cyan-400 font-['Geist',sans-serif] flex items-center gap-1">
              <Zap size={17} className="text-cyan-400" />
              <span>Edge</span>
            </div>
            <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">Sub-100ms Global CDN</div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 space-y-12 relative z-10 pb-16">
        {/* Core Pillars Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="obsidian-card rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/25 flex items-center justify-center text-violet-400 mb-6">
                <Cpu size={24} />
              </div>
              <h2 className="text-lg font-semibold text-white mb-2 font-['Geist',sans-serif]">
                Why We Built This
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                In the explosion of AI startups, hundreds of tools claim revolutionary features while hiding real pricing or repackaging basic wrappers. Stack AI Tools exists to give builders an unvarnished, transparent directory with verified reviews, accurate pricing models, and direct alternative comparisons.
              </p>
            </div>
          </div>

          <div className="obsidian-card rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/25 flex items-center justify-center text-pink-400 mb-6">
                <ShieldCheck size={24} />
              </div>
              <h2 className="text-lg font-semibold text-white mb-2 font-['Geist',sans-serif]">
                Strict Editorial Standard
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                Every tool in this directory is evaluated for speed, developer ergonomics, model backing, and value. We never list broken software or deceptive subscriptions, and listings are never ranked by payment or sponsored ad auctions.
              </p>
            </div>
          </div>

          <div className="obsidian-card rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 mb-6">
                <Terminal size={24} />
              </div>
              <h2 className="text-lg font-semibold text-white mb-2 font-['Geist',sans-serif]">
                Open Source &amp; Community
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                The code and data behind Stack AI Tools is open source on GitHub. Anyone can submit pull requests, contribute prompt recipes, verify tool features, or consume clean Markdown context via our machine-readable <code className="text-cyan-300 font-mono">/llms.txt</code> endpoint.
              </p>
            </div>
          </div>
        </section>

        {/* How We Vet Every Tool */}
        <section className="obsidian-card rounded-3xl p-8 md:p-10 border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
              <CheckCircle2 size={18} />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-['Geist',sans-serif]">
              How We Vet &amp; Benchmark Every Listing
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-zinc-950/60 border border-white/[0.08]">
              <div className="flex items-center gap-2 mb-2 text-violet-400 font-mono text-xs font-bold">
                <Layers size={14} />
                <span>01. PRICING AUDIT</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                Pricing, plan tiers, and free-tier token or credit limits are checked directly against the vendor&apos;s own checkout pages, never third-party press releases.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-zinc-950/60 border border-white/[0.08]">
              <div className="flex items-center gap-2 mb-2 text-pink-400 font-mono text-xs font-bold">
                <Compass size={14} />
                <span>02. HANDS-ON TESTING</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                Category and use-case fit is based on hands-on developer testing of core workflows, API reliability, and benchmark scores rather than vendor marketing claims.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-zinc-950/60 border border-white/[0.08]">
              <div className="flex items-center gap-2 mb-2 text-cyan-400 font-mono text-xs font-bold">
                <ShieldCheck size={14} />
                <span>03. SENTIMENT REFRESH</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                Ratings, review counts, and community discussions across GitHub, X, and Reddit are refreshed regularly to ensure our index reflects current product quality.
              </p>
            </div>
          </div>
        </section>

        {/* Founder Profile Card */}
        <section className="obsidian-card rounded-3xl p-8 md:p-10 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-500 p-0.5 flex-shrink-0">
              <div className="w-full h-full bg-zinc-950 rounded-2xl flex items-center justify-center text-3xl font-bold text-white font-['Geist',sans-serif]">
                KA
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-white font-['Geist',sans-serif]">Karan Arora</h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-[10px] font-mono">
                  Verified Founder
                </span>
              </div>
              <div className="text-xs text-zinc-400 font-mono mb-2">
                Chief AI Architect &amp; Creator of Stack AI Tools
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light max-w-xl">
                Building autonomous agent systems, AI workflow optimizations, and developer directories. Passionate about empowering founders and engineers with unbiased, transparent AI tooling.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href="mailto:karan@stackaitools.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 hover:border-violet-500/40 text-xs font-medium text-white transition-colors"
            >
              <span>karan@stackaitools.com</span>
            </a>
            <a
              href="https://github.com/karanarora-aideveloper/stack-ai-tools"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-xs font-medium text-white transition-colors shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub Profile</span>
            </a>
          </div>
        </section>

        {/* Call to Action */}
        <section className="obsidian-card rounded-3xl p-8 md:p-10 border border-white/10 text-center">
          <h2 className="text-2xl font-bold text-white mb-3 font-['Geist',sans-serif]">
            Want to Feature Your AI Tool?
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto mb-8 font-light leading-relaxed">
            Whether you are launching an autonomous coding agent, a generative model, or want to explore partnership opportunities, submit it for editorial review.
          </p>
          <div className="inline-flex flex-wrap gap-3 justify-center">
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-medium text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95"
            >
              <span>Submit Tool for Review</span>
              <Send size={14} />
            </Link>
            <a
              href="https://github.com/karanarora-aideveloper/stack-ai-tools"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white font-medium text-xs sm:text-sm transition-colors"
            >
              <Code2 size={15} />
              <span>Open Source Repo</span>
            </a>
          </div>
        </section>
      </main>

      {/* Shared Obsidian Luxury Footer */}
      <ObsidianFooter />
    </div>
  );
}
