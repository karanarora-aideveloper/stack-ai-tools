import { ImageResponse } from 'next/og';
import { getArticleBySlug } from '@/lib/blog';

export const runtime = 'edge';
export const alt = 'Stack AI Tools Blog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return new ImageResponse(
      (
        <div style={{ display: 'flex', width: '100%', height: '100%', backgroundColor: '#111', color: 'white', justifyContent: 'center', alignItems: 'center', fontSize: 64, fontWeight: 700 }}>
          Stack AI Tools Blog
        </div>
      )
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: '#09090b', // Zinc 950
          backgroundImage: 'radial-gradient(circle at 25px 25px, #27272a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #27272a 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          color: 'white',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'system-ui, sans-serif',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'space-between' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}></div>
              <span style={{ fontSize: '32px', fontWeight: 700, color: '#e4e4e7' }}>Stack AI Tools</span>
            </div>
            <div style={{ display: 'flex', padding: '10px 20px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', color: '#fbbf24', fontSize: '24px', fontWeight: 600 }}>
              {article.category}
            </div>
          </div>

          {/* Title - allow wrapping */}
          <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', padding: '40px 0' }}>
            <h1 style={{ 
              fontSize: article.title.length > 60 ? '60px' : '76px', 
              fontWeight: 800, 
              textAlign: 'left', 
              margin: 0,
              lineHeight: 1.2,
              background: 'linear-gradient(to bottom right, #ffffff, #a1a1aa)', 
              backgroundClip: 'text', 
              color: 'transparent' 
            }}>
              {article.title}
            </h1>
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', borderTop: '2px solid #27272a', paddingTop: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '28px', color: '#a1a1aa' }}>
              <span>By Stack AI Editorial</span>
              <span>•</span>
              <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
