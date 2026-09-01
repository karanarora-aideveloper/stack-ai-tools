'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function InteractiveGameBg() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCrtEnabled, setIsCrtEnabled] = useState(true);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Check CRT preference
    const savedCrt = localStorage.getItem('stackai_arcade_crt');
    if (savedCrt !== null) {
      setIsCrtEnabled(savedCrt === 'true');
    }

    const handleCrtToggle = (e: CustomEvent<boolean>) => {
      setIsCrtEnabled(e.detail);
    };

    window.addEventListener('stackai:crt-toggle' as any, handleCrtToggle);

    const handleScroll = () => {
      if (animFrameRef.current) return;
      animFrameRef.current = requestAnimationFrame(() => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;
        const progress = totalHeight > 0 ? Math.min(1, Math.max(0, currentScroll / totalHeight)) : 0;
        setScrollProgress(progress);
        animFrameRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('stackai:crt-toggle' as any, handleCrtToggle);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Compute dynamic colorway based on scroll
  const getAmbientColors = () => {
    if (scrollProgress < 0.25) {
      // Stage 1: Cyber Cyan & Electric Indigo
      return {
        primary: 'rgba(0, 240, 255, 0.18)',
        secondary: 'rgba(99, 102, 241, 0.15)',
        grid: 'rgba(0, 240, 255, 0.08)',
        glow: '#00f0ff'
      };
    } else if (scrollProgress < 0.55) {
      // Stage 2: Hot Magenta & Arcade Pink
      return {
        primary: 'rgba(255, 0, 127, 0.2)',
        secondary: 'rgba(236, 72, 153, 0.16)',
        grid: 'rgba(255, 0, 127, 0.09)',
        glow: '#ff007f'
      };
    } else if (scrollProgress < 0.8) {
      // Stage 3: Retro Sunset Amber & Gold
      return {
        primary: 'rgba(251, 191, 36, 0.2)',
        secondary: 'rgba(245, 158, 11, 0.16)',
        grid: 'rgba(251, 191, 36, 0.09)',
        glow: '#fbbf24'
      };
    } else {
      // Stage 4: Matrix Emerald & Cyber Green
      return {
        primary: 'rgba(0, 255, 102, 0.2)',
        secondary: 'rgba(16, 185, 129, 0.16)',
        grid: 'rgba(0, 255, 102, 0.09)',
        glow: '#00ff66'
      };
    }
  };

  const colors = getAmbientColors();
  const gridOffset = (scrollProgress * 200) % 40;

  return (
    <>
      {/* Dynamic Ambient Reactive Glow Canvas */}
      <div 
        className="interactive-game-ambient"
        style={{
          background: `radial-gradient(circle at 50% ${20 + scrollProgress * 60}%, ${colors.primary} 0%, ${colors.secondary} 40%, transparent 75%)`,
          transition: 'background 0.5s ease'
        }}
      />

      {/* 3D Scrolling Perspective Grid */}
      <div className="retro-perspective-grid-container">
        <div 
          className="retro-perspective-grid"
          style={{
            transform: `perspective(300px) rotateX(60deg) translateY(${gridOffset}px)`,
            borderColor: colors.grid,
            backgroundImage: `
              linear-gradient(${colors.grid} 1px, transparent 1px),
              linear-gradient(90deg, ${colors.grid} 1px, transparent 1px)
            `
          }}
        />
        <div className="retro-grid-horizon-glow" style={{ boxShadow: `0 -10px 40px ${colors.glow}40` }} />
      </div>

      {/* Floating 8-Bit Pixel Sprites in Cyberspace */}
      <div className="floating-pixels-layer" aria-hidden="true">
        <span className="floating-pixel-item p1">🪙</span>
        <span className="floating-pixel-item p2">⭐</span>
        <span className="floating-pixel-item p3">👾</span>
        <span className="floating-pixel-item p4">💾</span>
        <span className="floating-pixel-item p5">⚡</span>
        <span className="floating-pixel-item p6">💖</span>
        <span className="floating-pixel-item p7">🎮</span>
      </div>

      {/* Optional CRT Scanline Overlay */}
      {isCrtEnabled && <div className="crt-scanlines-overlay" />}
    </>
  );
}
