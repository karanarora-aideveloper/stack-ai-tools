'use client';

import React from 'react';
import Link from 'next/link';

export default function ArcadeMarquee() {
  const tickerItems = [
    '👾 AI IS CHANGING THE WORLD',
    '⚡ LEVEL 2026: 85+ FRONTIER WEAPONS UNLOCKED',
    '🎮 PLAYER 1: KARAN ARORA (CHIEF AI ARCHITECT)',
    '🔥 37 SECRET VISUAL PROMPTS READY TO RUN',
    '🦾 CODE AGENTS · VIDEO AVATARS · VOICE CLONES',
    '💎 HIGH SCORE: $10B+ SAAS EXPONENTIAL VALUE',
    '🕹️ INSERT COIN TO DISRUPT THE MATRIX',
  ];

  return (
    <div className="arcade-marquee-container" aria-label="Arcade Live Ticker">
      <div className="arcade-marquee-badge">
        <span className="arcade-blink-dot"></span>
        <span>BREAKING</span>
      </div>
      <div className="arcade-marquee-track">
        <div className="arcade-marquee-inner">
          {tickerItems.concat(tickerItems).map((item, idx) => (
            <span key={idx} className="arcade-marquee-item">
              {item}
              <span className="arcade-marquee-separator">✦</span>
            </span>
          ))}
        </div>
      </div>
      <Link href="/prompts" className="arcade-marquee-action">
        TRY PROMPTS →
      </Link>
    </div>
  );
}
