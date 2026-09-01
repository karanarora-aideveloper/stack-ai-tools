import { Metadata } from 'next';
import Link from 'next/link';
import { getAllTools, getAlternativesForTool } from '@/lib/tools';
import ToolLogo from '@/app/components/ToolLogo';
import { 
  GitCompare, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Star, 
  CheckCircle2,
  TrendingUp
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Top AI Tool Alternatives & Competitor Comparisons (2026)',
  description: 'Explore side-by-side comparisons of the world\'s top AI tools. Find cheaper, faster, and open-source alternatives to Midjourney, Cursor, ChatGPT, ElevenLabs, and more.',
  openGraph: {
    title: 'Top AI Tool Alternatives (2026) | Stack AI Tools',
    description: 'Find top-rated alternatives to popular AI tools and software.',
    url: 'https://stackaitools.com/alternatives',
  }
};

export default async function AlternativesHub() {
  const tools = await getAllTools();
  
  // Select high-intent tools that searchers commonly look for alternatives to
  const featuredTools = tools.filter(t => [
    'cursor',
    'midjourney',
    'chatgpt',
    'elevenlabs',
    'jasper-ai',
    'descript',
    'heygen',
    'synthesia',
    'notion-ai',
    'make',
    'runway',
    'github-copilot'
  ].includes(t.slug));

  const toolWithAlts = await Promise.all(
    featuredTools.map(async (tool) => {
      const alts = await getAlternativesForTool(tool.slug, 3);
      return { tool, alts };
    })
  );

  return (
    <div>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 48 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#818cf8', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
          <GitCompare size={16} />
          <span>Head-to-Head Benchmarks</span>
        </div>
        <h1 className="page-title">
          Top AI Tool Alternatives & Competitor Guide (2026)
        </h1>
        <p className="page-subtitle">
          Compare pricing, performance benchmarks, and free tier limitations across leading frontier AI software. Find the exact replacement matching your budget and workflow.
        </p>
      </div>

      {/* Grid of Alternatives Hubs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 24 }}>
        {toolWithAlts.map(({ tool, alts }) => (
          <div key={tool.id} className="tool-card-box" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <ToolLogo 
                    name={tool.name} 
                    domain={tool.domain} 
                    logoUrl={tool.logoUrl} 
                    icon={tool.icon} 
                    size={40} 
                  />
                  <div>
                    <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>
                      {tool.name}
                    </h2>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {tool.category} • {tool.pricingModel}
                    </span>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 16 }}>
                Looking for cheaper or open alternatives to {tool.name.split(' ')[0]}? Here are the top vetted replacements:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                {alts.map(alt => (
                  <div key={alt.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <ToolLogo name={alt.name} domain={alt.domain} logoUrl={alt.logoUrl} icon={alt.icon} size={24} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>{alt.name}</span>
                    </div>
                    <span style={{ fontSize: 12, color: '#fbbf24' }}>★ {alt.rating}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link 
              href={`/alternatives/${tool.slug}`} 
              className="btn btn-primary" 
              style={{ width: '100%', justifyContent: 'center', padding: '10px 16px', fontSize: 13 }}
            >
              <span>Compare All {tool.name.split(' ')[0]} Alternatives</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
