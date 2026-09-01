import React from 'react';

export default function ModernBackground() {
  return (
    <div className="modern-bg-container" aria-hidden="true">
      {/* Top Ambient Glows */}
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />
      <div className="ambient-glow ambient-glow-3" />

      {/* Subtle Dot Matrix Overlay */}
      <div className="modern-dot-grid" />
    </div>
  );
}
