import { ImageResponse } from 'next/og';

export const alt = 'Top Antigravity MCP Servers';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
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
          <div style={{ width: '120px', height: '120px', borderRadius: '30px', background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)' }}>
            <span style={{ fontSize: '70px' }}>⚡</span>
          </div>
        </div>
        
        <h1 style={{ fontSize: '84px', fontWeight: 800, textAlign: 'center', margin: '0 0 20px 0', background: 'linear-gradient(to bottom right, #ffffff, #a1a1aa)', backgroundClip: 'text', color: 'transparent' }}>
          30+ Antigravity MCP Servers
        </h1>
        
        <p style={{ fontSize: '36px', color: '#a1a1aa', textAlign: 'center', margin: '0 0 40px 0', maxWidth: '800px' }}>
          Instant One-Click Configs for Google AGY
        </p>

        <div style={{ display: 'flex', gap: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.1)', padding: '15px 30px', borderRadius: '100px', fontSize: '28px', fontWeight: 600 }}>
            Tested & Verified for 2026
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
