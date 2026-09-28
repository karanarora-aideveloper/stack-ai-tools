import { Metadata } from 'next';
import { getAllTools, getAllPrompts } from '@/lib/tools';
import CategoriesExplorer, { CategoryCardData } from './CategoriesExplorer';
import ObsidianHeader from '@/app/components/ObsidianHeader';
import ObsidianFooter from '@/app/components/ObsidianFooter';
import { Sparkles, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'AI Software Categories (2026) | Stack AI Tools' },
  description: 'Explore 8 core AI software ecosystems across autonomous coding, generative video, voice cloning, workflow automation, and enterprise intelligence. Compare verified pricing and features.',
  openGraph: {
    title: 'Explore AI Software by Category | Stack AI Tools',
    description: 'Vetted frontier software directory organized across developer agents, video, audio, design, writing, and workflow automation.',
    url: 'https://www.stackaitools.com/categories'
  },
  alternates: {
    canonical: 'https://www.stackaitools.com/categories'
  }
};

export const revalidate = 3600;

interface CategoryConfig {
  name: string;
  slug: string;
  icon: string;
  themeColor: string;
  borderGlow: string;
  glowBg: string;
  accentText: string;
  tagline: string;
  subtags: string[];
}

const CATEGORY_CONFIGS: CategoryConfig[] = [
  {
    name: 'Code & Dev Agents',
    slug: 'code',
    icon: '💻',
    themeColor: '#06b6d4',
    borderGlow: 'rgba(6, 182, 212, 0.45)',
    glowBg: 'radial-gradient(circle, rgba(6, 182, 212, 0.18) 0%, transparent 70%)',
    accentText: '#22d3ee',
    tagline: 'Autonomous coding agents, AI pair programmers, terminal CLI tools, and full-stack cloud sandboxes.',
    subtags: ['Autonomous Agents', 'IDE Extensions', 'Code Review', 'Terminal Sandboxes', 'TypeScript']
  },
  {
    name: 'AI Video & Motion',
    slug: 'video',
    icon: '🎬',
    themeColor: '#ec4899',
    borderGlow: 'rgba(236, 72, 153, 0.45)',
    glowBg: 'radial-gradient(circle, rgba(236, 72, 153, 0.18) 0%, transparent 70%)',
    accentText: '#f472b6',
    tagline: 'Text-to-video foundation models, hyper-realistic avatar actors, clip repurposing, and AI cinematic directors.',
    subtags: ['Text-to-Video', 'Digital Avatars', 'Lip Sync', 'Repurposing', 'Camera Motion']
  },
  {
    name: 'Generative Design & 3D',
    slug: 'design',
    icon: '🎨',
    themeColor: '#f59e0b',
    borderGlow: 'rgba(245, 158, 11, 0.45)',
    glowBg: 'radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, transparent 70%)',
    accentText: '#fbbf24',
    tagline: 'Frontier image synthesis models, high-res upscalers, vector generators, and 3D asset engines.',
    subtags: ['Photorealism', 'Vector Graphics', '3D Assets', 'Upscaling', 'UI Concepting']
  },
  {
    name: 'Voice & Studio Audio',
    slug: 'audio',
    icon: '🎙️',
    themeColor: '#a855f7',
    borderGlow: 'rgba(168, 85, 247, 0.45)',
    glowBg: 'radial-gradient(circle, rgba(168, 85, 247, 0.18) 0%, transparent 70%)',
    accentText: '#c084fc',
    tagline: 'Ultra-realistic voice cloning, text-to-speech APIs, automated podcast studios, and generative music engines.',
    subtags: ['Voice Cloning', 'Text-to-Speech', 'Music Generation', 'Noise Isolation', 'Podcasting']
  },
  {
    name: 'Writing & Deep Reasoning',
    slug: 'writing',
    icon: '✍️',
    themeColor: '#10b981',
    borderGlow: 'rgba(16, 185, 129, 0.45)',
    glowBg: 'radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, transparent 70%)',
    accentText: '#34d399',
    tagline: 'Long-form editorial copilots, recursive research synthesis, technical documentation, and enterprise writing.',
    subtags: ['Research Synthesis', 'Long-Form Docs', 'Copywriting', 'Knowledge Bases', 'Fact-Checking']
  },
  {
    name: 'Workflow & MCP Automation',
    slug: 'automation',
    icon: '⚡',
    themeColor: '#3b82f6',
    borderGlow: 'rgba(59, 130, 246, 0.45)',
    glowBg: 'radial-gradient(circle, rgba(59, 130, 246, 0.18) 0%, transparent 70%)',
    accentText: '#60a5fa',
    tagline: 'Autonomous web browsers, Model Context Protocol (MCP) servers, enterprise webhook orchestrators, and AI scrapers.',
    subtags: ['MCP Servers', 'Browser Automation', 'Webhooks', 'Scraping Agents', 'Multi-Step Flows']
  },
  {
    name: 'Marketing & Growth',
    slug: 'marketing',
    icon: '📈',
    themeColor: '#f43f5e',
    borderGlow: 'rgba(244, 63, 94, 0.45)',
    glowBg: 'radial-gradient(circle, rgba(244, 63, 94, 0.18) 0%, transparent 70%)',
    accentText: '#fb7185',
    tagline: 'B2B outbound pipeline automation, SEO ranking intelligence, ad copy variations, and brand voice copilots.',
    subtags: ['Cold Outreach', 'Programmatic SEO', 'Ad Copy Gen', 'Competitor Radar', 'Conversion Rate']
  },
  {
    name: 'Business Intelligence',
    slug: 'business',
    icon: '💼',
    themeColor: '#818cf8',
    borderGlow: 'rgba(129, 140, 248, 0.45)',
    glowBg: 'radial-gradient(circle, rgba(129, 140, 248, 0.18) 0%, transparent 70%)',
    accentText: '#a5b4fc',
    tagline: 'Automated executive meeting synthesis, financial cohort analytics, contract review, and organizational knowledge.',
    subtags: ['Meeting Summaries', 'Financial Modeling', 'Legal AI', 'Knowledge Search', 'SaaS Metrics']
  }
];

export default async function CategoriesPage() {
  const [allTools, allPrompts] = await Promise.all([
    getAllTools(),
    getAllPrompts()
  ]);

  // Build rich category cards data
  const categoriesData: CategoryCardData[] = CATEGORY_CONFIGS.map(config => {
    const slug = config.slug;
    
    // Match tools
    const matchingTools = allTools.filter(t => {
      const catNorm = t.category.toLowerCase();
      if (catNorm === slug) return true;
      if (slug === 'marketing') {
        return t.tags.some(tag => tag.toLowerCase().includes('marketing') || tag.toLowerCase().includes('seo') || tag.toLowerCase().includes('copywriting'));
      }
      if (slug === 'business') {
        return t.tags.some(tag => tag.toLowerCase().includes('meeting') || tag.toLowerCase().includes('workspace') || tag.toLowerCase().includes('notes') || tag.toLowerCase().includes('finance'));
      }
      return false;
    });

    // Match prompts
    const matchingPrompts = allPrompts.filter(p => {
      const catNorm = p.category.toLowerCase();
      if (catNorm === slug) return true;
      if (slug === 'marketing' && (catNorm === 'marketing' || p.tags?.some(t => t.toLowerCase().includes('marketing')))) return true;
      if (slug === 'business' && (catNorm === 'business' || p.tags?.some(t => t.toLowerCase().includes('business')))) return true;
      return false;
    });

    // Sort top tools by review count and rating
    const sortedTools = [...matchingTools].sort((a, b) => b.reviewsCount - a.reviewsCount);

    return {
      name: config.name,
      slug: config.slug,
      icon: config.icon,
      tagline: config.tagline,
      themeColor: config.themeColor,
      gradient: `linear-gradient(135deg, ${config.themeColor} 0%, rgba(99, 102, 241, 0.4) 100%)`,
      glowBg: config.glowBg,
      borderGlow: config.borderGlow,
      accentText: config.accentText,
      subtags: config.subtags,
      toolCount: matchingTools.length,
      promptCount: matchingPrompts.length,
      topTools: sortedTools.slice(0, 4).map(t => ({
        name: t.name,
        slug: t.slug,
        logoUrl: t.logoUrl,
        domain: t.domain,
        priceClass: t.priceClass,
        rating: t.rating
      }))
    };
  });

  return (
    <div data-redesign-page="true" className="min-h-screen bg-[#040406] text-[#e3e1ec] antialiased selection:bg-[#8b5cf6] selection:text-white relative">
      {/* Atmospheric Ambient Glow Mesh */}
      <div className="obsidian-glow-mesh fixed inset-x-0 top-0 h-[700px] pointer-events-none -z-10" />

      {/* Shared Obsidian Luxury Header */}
      <ObsidianHeader activeNav="categories" />

      {/* Hero Header Section */}
      <header className="pt-16 pb-8 px-4 md:px-8 max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900/90 border border-violet-500/30 text-xs text-zinc-300 mb-6 shadow-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="tracking-wide uppercase font-mono text-[11px] text-zinc-400">FRONTIER AI TAXONOMY</span>
          <span className="text-zinc-600">•</span>
          <span className="text-violet-400 font-medium">8 CORE ECOSYSTEMS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-6 font-['Geist',sans-serif] leading-[1.12]">
          Explore AI Tools by{' '}
          <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
            Category & Ecosystem
          </span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light mb-10">
          Discover curated directories of verified frontier tools, autonomous agents, and production prompts segmented across engineering, generative media, and enterprise intelligence.
        </p>

        {/* 4-Stat Metric Ribbon in Obsidian Style */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto p-2 rounded-xl bg-zinc-950/60 border border-white/10 backdrop-blur-md">
          <div className="text-center py-2 px-3">
            <div className="text-xl font-bold text-white font-['Geist',sans-serif]">8 Core</div>
            <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">Ecosystems</div>
          </div>
          <div className="text-center py-2 px-3 sm:border-l border-white/10">
            <div className="text-xl font-bold text-violet-400 font-['Geist',sans-serif]">{allTools.length}+</div>
            <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">Frontier Tools</div>
          </div>
          <div className="text-center py-2 px-3 sm:border-l border-white/10">
            <div className="text-xl font-bold text-pink-400 font-['Geist',sans-serif]">{allPrompts.length}+</div>
            <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">Vetted Prompts</div>
          </div>
          <div className="text-center py-2 px-3 sm:border-l border-white/10 flex flex-col items-center justify-center">
            <div className="text-xl font-bold text-emerald-400 font-['Geist',sans-serif] flex items-center gap-1">
              <ShieldCheck size={18} className="text-emerald-400" />
              <span>100%</span>
            </div>
            <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">Vetted & Active</div>
          </div>
        </div>
      </header>

      {/* Main Interactive Categories Explorer */}
      <main className="relative z-10">
        <CategoriesExplorer 
          categories={categoriesData} 
          totalTools={allTools.length}
          totalPrompts={allPrompts.length}
        />
      </main>

      {/* Shared Obsidian Luxury Footer */}
      <ObsidianFooter />
    </div>
  );
}
