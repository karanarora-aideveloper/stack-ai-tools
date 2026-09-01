import { Metadata } from 'next';
import { getAllTools, getAllPrompts, EnrichedTool } from '@/lib/tools';
import CategoriesExplorer, { CategoryCardData } from './CategoriesExplorer';
import ModernBackground from '@/app/components/ModernBackground';
import { Sparkles, Layers, ShieldCheck, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All AI Software Categories (2026) | Verified Tools & Prompts Index',
  description: 'Explore 8 core AI software ecosystems across autonomous coding, generative video, voice cloning, workflow automation, and enterprise intelligence. Compare verified pricing and features.',
  openGraph: {
    title: 'Explore AI Software by Category | Stack AI Tools',
    description: 'Vetted frontier software directory organized across developer agents, video, audio, design, writing, and workflow automation.',
    url: 'https://stackaitools.com/categories'
  }
};

export const revalidate = 60;

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
    <div style={{ position: 'relative', minHeight: '100vh', paddingBottom: 80 }}>
      {/* Ambient Radial Mesh Background */}
      <ModernBackground />

      {/* Hero Header Section */}
      <header className="page-header" style={{ maxWidth: 880, margin: '0 auto 40px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: 8, 
          padding: '6px 16px', 
          borderRadius: 100,
          background: 'rgba(99, 102, 241, 0.12)', 
          border: '1px solid rgba(99, 102, 241, 0.3)', 
          color: '#a5b4fc', 
          fontSize: 12.5, 
          fontWeight: 700, 
          letterSpacing: '0.04em', 
          textTransform: 'uppercase', 
          marginBottom: 16 
        }}>
          <Sparkles size={14} color="#818cf8" />
          <span>Frontier AI Software Taxonomy (2026)</span>
        </div>

        <h1 className="page-title" style={{ 
          fontSize: 'clamp(32px, 5vw, 48px)', 
          fontWeight: 900, 
          letterSpacing: '-0.03em', 
          lineHeight: 1.15, 
          color: '#ffffff', 
          marginBottom: 16 
        }}>
          Explore AI Tools by <span className="modern-hero-gradient">Category & Ecosystem</span>
        </h1>

        <p className="page-subtitle" style={{ 
          fontSize: 'clamp(15px, 2vw, 17px)', 
          color: 'var(--text-secondary)', 
          lineHeight: 1.6, 
          maxWidth: 720, 
          margin: '0 auto 28px' 
        }}>
          Discover curated directories of verified frontier tools, autonomous agents, and production prompts segmented across engineering, media, workflow automation, and enterprise intelligence.
        </p>

        {/* 4-Stat Metric Ribbon */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', 
          gap: 12, 
          maxWidth: 720, 
          margin: '0 auto', 
          padding: '12px 16px', 
          background: 'rgba(255, 255, 255, 0.03)', 
          backdropFilter: 'blur(12px)', 
          border: '1px solid rgba(255, 255, 255, 0.08)', 
          borderRadius: 14 
        }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#ffffff' }}>8 Core</div>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Ecosystems</div>
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#818cf8' }}>{allTools.length}+</div>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Frontier Tools</div>
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#ec4899' }}>{allPrompts.length}+</div>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Vetted Prompts</div>
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#10b981' }}>100%</div>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Vetted & Active</div>
          </div>
        </div>
      </header>

      {/* Main Interactive Categories Explorer */}
      <main style={{ position: 'relative', zIndex: 2 }}>
        <CategoriesExplorer 
          categories={categoriesData} 
          totalTools={allTools.length}
          totalPrompts={allPrompts.length}
        />
      </main>
    </div>
  );
}
