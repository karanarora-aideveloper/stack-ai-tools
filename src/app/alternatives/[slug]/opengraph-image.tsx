import { ImageResponse } from 'next/og';
import { getToolBySlug } from '@/lib/tools';

export const alt = 'Stack AI Tools Alternatives';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const tool = await getToolBySlug(params.slug);

  if (!tool) {
    return new ImageResponse(
      (
        <div style={{ display: 'flex', width: '100%', height: '100%', backgroundColor: '#111', color: 'white', justifyContent: 'center', alignItems: 'center', fontSize: 64, fontWeight: 700 }}>
          Stack AI Tools
        </div>
      )
    );
  }

  const baseName = tool.name.replace(/\s*\([^)]*\)\s*$/, '').trim();

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
          padding: '60px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          {tool.logoUrl && (
            <img 
              src={tool.logoUrl} 
              alt={baseName} 
              width={160} 
              height={160} 
              style={{ borderRadius: '32px', border: '2px solid #3f3f46', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} 
            />
          )}
        </div>
        
        <h1 style={{ fontSize: '84px', fontWeight: 800, textAlign: 'center', margin: '0 0 20px 0', background: 'linear-gradient(to bottom right, #ffffff, #a1a1aa)', backgroundClip: 'text', color: 'transparent' }}>
          Top {baseName} Alternatives
        </h1>
        
        <p style={{ fontSize: '36px', color: '#a1a1aa', textAlign: 'center', margin: '0 0 40px 0', maxWidth: '800px' }}>
          Compare Free & Paid Competitors in 2026
        </p>

        <div style={{ display: 'flex', gap: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.1)', padding: '15px 30px', borderRadius: '100px', fontSize: '28px', fontWeight: 600 }}>
            Side-by-Side Comparison
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
