'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Gamepad2, 
  Layers, 
  BookOpen, 
  GitCompare, 
  User, 
  PlusCircle, 
  Menu, 
  X, 
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function MobileDock() {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setIsDrawerOpen(false)}>
          <div className="mobile-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="retro-arcade-badge">ARCADE v2.0</span>
                <span style={{ fontWeight: 800, color: '#fff', fontSize: 16 }}>Stack AI Tools</span>
              </div>
              <button 
                className="mobile-drawer-close"
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mobile-drawer-content">
              <div className="mobile-drawer-hero-pill">
                <span className="live-dot"></span>
                <span>AI IS CHANGING THE WORLD · LEVEL 2026</span>
              </div>

              <nav className="mobile-drawer-nav">
                <Link 
                  href="/" 
                  className={`mobile-drawer-link ${isActive('/') ? 'active' : ''}`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <Gamepad2 size={18} color="#00f0ff" />
                  <span>🕹️ Game Lobby (Explore 85+ Tools)</span>
                </Link>

                <Link 
                  href="/categories" 
                  className={`mobile-drawer-link ${isActive('/categories') ? 'active' : ''}`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <Layers size={18} color="#ff007f" />
                  <span>⚡ Software Skill Tree (Categories)</span>
                </Link>

                <Link 
                  href="/prompts" 
                  className={`mobile-drawer-link ${isActive('/prompts') ? 'active' : ''}`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <BookOpen size={18} color="#fbbf24" />
                  <span>🎨 Visual Prompt Vault (37 Recipes)</span>
                </Link>

                <Link 
                  href="/alternatives" 
                  className={`mobile-drawer-link ${isActive('/alternatives') ? 'active' : ''}`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <GitCompare size={18} color="#a855f7" />
                  <span>⚔️ Versus Mode (Alternatives)</span>
                </Link>

                <Link 
                  href="/about" 
                  className={`mobile-drawer-link ${isActive('/about') ? 'active' : ''}`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <User size={18} color="#34d399" />
                  <span>👾 Player 1 Profile (About Karan Arora)</span>
                </Link>

                <Link 
                  href="/submit" 
                  className={`mobile-drawer-link ${isActive('/submit') ? 'active' : ''}`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <PlusCircle size={18} color="#ec4899" />
                  <span>🚀 Drop Your Tool (+XP)</span>
                </Link>
              </nav>

              <div className="mobile-drawer-footer">
                <Link 
                  href="/submit" 
                  className="btn btn-primary" 
                  style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <Sparkles size={16} />
                  <span>Submit AI Tool for Review</span>
                </Link>

                <a 
                  href="https://github.com/karanarora-aideveloper/stack-ai-tools"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: 10, padding: '10px', fontSize: 13 }}
                >
                  <span>Star on GitHub ⭐</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom App Dock (Visible on mobile screens < 768px) */}
      <nav className="mobile-bottom-dock" aria-label="Mobile navigation">
        <Link 
          href="/" 
          className={`mobile-dock-btn ${isActive('/') ? 'active' : ''}`}
        >
          <Gamepad2 size={20} />
          <span>Lobby</span>
        </Link>

        <Link 
          href="/categories" 
          className={`mobile-dock-btn ${isActive('/categories') ? 'active' : ''}`}
        >
          <Layers size={20} />
          <span>Skills</span>
        </Link>

        <Link 
          href="/prompts" 
          className={`mobile-dock-btn ${isActive('/prompts') ? 'active' : ''}`}
        >
          <BookOpen size={20} />
          <span>Prompts</span>
        </Link>

        <Link 
          href="/about" 
          className={`mobile-dock-btn ${isActive('/about') ? 'active' : ''}`}
        >
          <User size={20} />
          <span>Karan</span>
        </Link>

        <button 
          className={`mobile-dock-btn ${isDrawerOpen ? 'active' : ''}`}
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          aria-label="Open full menu"
        >
          <Menu size={20} />
          <span>Menu</span>
        </button>
      </nav>
    </>
  );
}
