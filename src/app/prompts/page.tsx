import { Metadata } from 'next';
import { getAllPrompts } from '@/lib/tools';
import PromptsExplorer from './PromptsExplorer';
import ModernBackground from '@/app/components/ModernBackground';
import { Sparkles, Terminal, Image as ImageIcon, Flame, CheckCircle2, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'AI Prompts Library (2026) | Stack AI Tools' },
  description: 'Explore 37+ production-grade prompts for Midjourney v8 photorealism, Flux.1 Schnell, Cursor 3.1 autonomous coding, and Claude Sonnet 5 with live output previews.',
  openGraph: {
    title: 'AI Prompts Library (2026) | Stack AI Tools',
    description: 'Battle-tested prompts for Midjourney v8, Flux.1, Cursor 3.1, Claude, and GPT-5.',
    url: 'https://stackaitools.com/prompts',
  }
};

export const revalidate = 60;

export default async function PromptsPage() {
  const prompts = await getAllPrompts();

  const serializedPrompts = prompts.map(p => ({
    id: p.id,
    title: p.title,
    targetAI: p.targetAI,
    category: p.category,
    prompt: p.prompt,
    outputType: p.outputType,
    outputImageUrl: p.outputImageUrl,
    outputPreview: p.outputPreview,
    author: p.author,
    aspectRatio: p.aspectRatio,
    tags: p.tags || []
  }));

  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingBottom: 80 }}>
      {/* Dynamic Ambient Background */}
      <ModernBackground />

      {/* Hero Header Section */}
      <header className="page-header" style={{ maxWidth: 840, margin: '0 auto 40px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
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
          <span>Frontier Prompt Engineering Vault (2026)</span>
        </div>

        <h1 className="page-title" style={{ 
          fontSize: 'clamp(32px, 5vw, 48px)', 
          fontWeight: 900, 
          letterSpacing: '-0.03em', 
          lineHeight: 1.15, 
          color: '#ffffff', 
          marginBottom: 16 
        }}>
          Curated Frontier AI <span className="modern-hero-gradient">Prompts Library</span>
        </h1>

        <p className="page-subtitle" style={{ 
          fontSize: 'clamp(15px, 2vw, 17px)', 
          color: 'var(--text-secondary)', 
          lineHeight: 1.6, 
          maxWidth: 700, 
          margin: '0 auto 28px' 
        }}>
          Battle-tested prompts engineered for <strong>Gmail MCP</strong>, <strong>GitHub MCP</strong>, <strong>PostgreSQL</strong>, Midjourney v8, Flux.1, and Cursor 3.1 agents. Includes verified outputs, executable MCP config JSON, and one-click copy.
        </p>

        {/* 4-Column Metric Ribbon */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', 
          gap: 12, 
          maxWidth: 680, 
          margin: '0 auto', 
          padding: '12px 16px', 
          background: 'rgba(255, 255, 255, 0.03)', 
          backdropFilter: 'blur(12px)', 
          border: '1px solid rgba(255, 255, 255, 0.08)', 
          borderRadius: 14 
        }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#ffffff' }}>{serializedPrompts.length}+</div>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Vetted Prompts</div>
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#818cf8' }}>8 Top</div>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>MCP Servers</div>
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#ec4899' }}>100%</div>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Real Outputs</div>
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#10b981' }}>1-Click</div>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Instant Copy</div>
          </div>
        </div>
      </header>

      {/* Main Interactive Prompts Explorer */}
      <main style={{ position: 'relative', zIndex: 2 }}>
        <PromptsExplorer initialPrompts={serializedPrompts} />
      </main>
    </div>
  );
}
