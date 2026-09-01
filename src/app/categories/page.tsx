import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { 
  PenTool, 
  Code2, 
  Palette, 
  Video, 
  Mic, 
  Bot, 
  TrendingUp, 
  Briefcase,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories | Top AI Tools & Prompts Directory',
  description: 'Browse AI software and prompt libraries categorized by Writing, Code, Design, Video, Audio, and Automation.',
};

const prisma = new PrismaClient();

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Writing: <PenTool size={28} />,
  Code: <Code2 size={28} />,
  Design: <Palette size={28} />,
  Video: <Video size={28} />,
  Audio: <Mic size={28} />,
  Automation: <Bot size={28} />,
  Marketing: <TrendingUp size={28} />,
  Business: <Briefcase size={28} />,
};

export default async function Categories() {
  const [aiTools, promptLibrary] = await Promise.all([
    prisma.tool.findMany({ where: { status: 'approved' } }),
    prisma.prompt.findMany({ where: { status: 'approved' } })
  ]);

  const toolCategories = ['Writing', 'Code', 'Design', 'Video', 'Audio', 'Automation'];
  const promptCategories = ['Marketing', 'Business'];
  const allCats = Array.from(new Set([...toolCategories, ...promptCategories]));

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Browse by Category</h1>
        <p className="page-subtitle">Find the exact artificial intelligence software, models, and prompts for your industry.</p>
      </div>

      <div className="categories-grid">
        {allCats.map((cat, index) => {
          const delay = index * 0.04;
          const icon = CATEGORY_ICONS[cat] || <Layers size={28} />;
          const toolCount = aiTools.filter(t => t.category.toLowerCase() === cat.toLowerCase()).length;
          const promptCount = promptLibrary.filter(p => p.category.toLowerCase() === cat.toLowerCase()).length;
          
          return (
            <Link href={`/category/${cat.toLowerCase()}`} key={cat}>
              <div 
                className="category-card" 
                style={{ animation: `fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both ${delay}s` }}
              >
                <div className="cat-icon-wrap">{icon}</div>
                <h3 className="cat-title">{cat}</h3>
                <p className="cat-stats">
                  {toolCount > 0 ? `${toolCount} Verified Tools` : ''} 
                  {toolCount > 0 && promptCount > 0 ? ' • ' : ''}
                  {promptCount > 0 ? `${promptCount} Prompts` : ''}
                </p>
                <div style={{ marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--accent-primary)', fontSize: 13, fontWeight: 600 }}>
                  <span>Explore {cat}</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
