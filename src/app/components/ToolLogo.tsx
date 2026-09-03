'use client';

import React, { useState } from 'react';

interface ToolLogoProps {
  name: string;
  domain?: string | null;
  logoUrl?: string | null;
  icon?: string | null;
  size?: number;
}

export default function ToolLogo({
  name,
  domain,
  logoUrl,
  icon,
  size = 48
}: ToolLogoProps) {
  const [imgError, setImgError] = useState(false);

  // Compute primary and fallback image sources
  const primarySrc = logoUrl || (domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : null);
  const fallbackFavicon = domain ? `https://icon.horse/icon/${domain}` : null;
  const [currentSrc, setCurrentSrc] = useState(primarySrc);

  const handleError = () => {
    if (currentSrc === primarySrc && fallbackFavicon) {
      setCurrentSrc(fallbackFavicon);
    } else {
      setImgError(true);
    }
  };

  return (
    <div 
      className="tool-brand-logo"
      style={{
        width: size,
        height: size,
        borderRadius: size > 40 ? 14 : 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #ffffff 0%, #f4f5f8 100%)',
        border: '1px solid rgba(15, 23, 42, 0.1)',
        boxShadow: '0 2px 8px rgba(15, 23, 42, 0.06)',
        flexShrink: 0,
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {!imgError && currentSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={currentSrc}
          alt={`${name} official logo`}
          width={Math.round(size * 0.65)}
          height={Math.round(size * 0.65)}
          onError={handleError}
          loading="lazy"
          style={{
            objectFit: 'contain',
            borderRadius: 6,
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
          }}
        />
      ) : icon ? (
        <span style={{ fontSize: Math.round(size * 0.5) }}>{icon}</span>
      ) : (
        <span style={{ 
          fontSize: Math.round(size * 0.4), 
          fontWeight: 700, 
          color: 'var(--accent-primary)',
          letterSpacing: -0.5 
        }}>
          {name.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
}
