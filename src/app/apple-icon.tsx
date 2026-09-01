import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #09090f 0%, #15152a 100%)',
          borderRadius: 40,
          border: '3px solid rgba(99, 102, 241, 0.3)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 88,
            fontWeight: 900,
            background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f472b6 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            letterSpacing: '-0.05em',
          }}
        >
          S
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
