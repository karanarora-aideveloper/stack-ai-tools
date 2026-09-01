'use client';

import React, { useState, useEffect } from 'react';
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
  Volume2,
  VolumeX,
  Monitor
} from 'lucide-react';
import { toggleAudio, isAudioEnabled, playCoinSound } from '@/lib/arcadeSound';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [crtOn, setCrtOn] = useState(false);

  useEffect(() => {
    setSoundOn(isAudioEnabled());
    const savedCrt = localStorage.getItem('stackai_arcade_crt');
    if (savedCrt !== null) setCrtOn(savedCrt === 'true');

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const next = toggleAudio();
    setSoundOn(next);
  };

  const handleToggleCrt = () => {
    const next = !crtOn;
    setCrtOn(next);
    localStorage.setItem('stackai_arcade_crt', String(next));
    window.dispatchEvent(new CustomEvent('stackai:crt-toggle', { detail: next }));
  };

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className={`top-navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <nav className="top-navbar-container">
          {/* Brand Logo */}
          <Link href="/" className="topbar-brand">
            <div className="topbar-logo-icon">
              <Sparkles size={18} color="#6366f1" />
            </div>
            <div className="topbar-brand-text">
              <span className="topbar-brand-main">Stack AI</span>
              <span className="topbar-brand-sub">Tools</span>
            </div>
            <span className="topbar-arcade-pill" style={{ color: '#818cf8', borderColor: 'rgba(99, 102, 241, 0.3)', background: 'rgba(99, 102, 241, 0.1)' }}>
              2026 DIRECTORY
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="topbar-nav-links">
            <Link 
              href="/" 
              className={`topbar-nav-pill ${isActive('/') ? 'active' : ''}`}
            >
              <span>Explore</span>
            </Link>
            <Link 
              href="/categories" 
              className={`topbar-nav-pill ${isActive('/categories') ? 'active' : ''}`}
            >
              <span>Categories</span>
            </Link>
            <Link 
              href="/alternatives" 
              className={`topbar-nav-pill ${isActive('/alternatives') ? 'active' : ''}`}
            >
              <span>Alternatives</span>
            </Link>
            <Link 
              href="/prompts" 
              className={`topbar-nav-pill ${isActive('/prompts') ? 'active' : ''}`}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <span>Prompts</span>
                <span className="nav-hot-dot"></span>
              </span>
            </Link>
            <Link 
              href="/blog" 
              className={`topbar-nav-pill ${isActive('/blog') ? 'active' : ''}`}
            >
              <span>Blog</span>
            </Link>
            <Link 
              href="/about" 
              className={`topbar-nav-pill ${isActive('/about') ? 'active' : ''}`}
            >
              <span>About</span>
            </Link>
          </div>

          {/* Action Buttons (Right) */}
          <div className="topbar-actions">
            {/* CRT Scanline Toggle */}
            <button 
              onClick={handleToggleCrt}
              className={`topbar-btn-toggle ${crtOn ? 'active' : ''}`}
              title={crtOn ? "CRT Scanlines Enabled" : "CRT Scanlines Disabled"}
            >
              <Monitor size={14} />
              <span className="toggle-lbl">CRT</span>
            </button>

            {/* 8-Bit SFX Sound Toggle */}
            <button 
              onClick={handleToggleSound}
              className={`topbar-btn-toggle ${soundOn ? 'active' : ''}`}
              title={soundOn ? "8-Bit Sound FX Enabled" : "8-Bit Sound FX Muted"}
            >
              {soundOn ? <Volume2 size={14} color="#00ff66" /> : <VolumeX size={14} />}
              <span className="toggle-lbl">{soundOn ? "SFX ON" : "SFX"}</span>
            </button>

            <a 
              href="https://github.com/karanarora-aideveloper/stack-ai-tools" 
              target="_blank" 
              rel="noopener noreferrer"
              className="topbar-btn-github"
              title="Star on GitHub"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </a>

            <Link href="/submit" className="topbar-btn-submit arcade-cta-press" onClick={() => playCoinSound()}>
              <PlusCircle size={15} />
              <span>Submit Tool</span>
            </Link>

            {/* Mobile Menu Hamburger */}
            <button 
              className="topbar-mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Slide-Over Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="retro-arcade-badge">ARCADE v2.0</span>
                <span style={{ fontWeight: 800, color: '#fff', fontSize: 16 }}>Stack AI Tools</span>
              </div>
              <button 
                className="mobile-drawer-close"
                onClick={() => setIsMobileMenuOpen(false)}
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

              {/* Mobile SFX & CRT Controls */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                <button 
                  onClick={handleToggleSound}
                  className={`mobile-control-pill ${soundOn ? 'active' : ''}`}
                >
                  {soundOn ? <Volume2 size={16} color="#00ff66" /> : <VolumeX size={16} />}
                  <span>{soundOn ? "SFX: ON 🔊" : "SFX: MUTE 🔇"}</span>
                </button>
                <button 
                  onClick={handleToggleCrt}
                  className={`mobile-control-pill ${crtOn ? 'active' : ''}`}
                >
                  <Monitor size={16} color="#00f0ff" />
                  <span>{crtOn ? "CRT: ON 📺" : "CRT: OFF"}</span>
                </button>
              </div>

              <nav className="mobile-drawer-nav">
                <Link 
                  href="/" 
                  className={`mobile-drawer-link ${isActive('/') ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Gamepad2 size={18} color="#00f0ff" />
                  <span>🕹️ Game Lobby (85+ Tools)</span>
                </Link>

                <Link 
                  href="/categories" 
                  className={`mobile-drawer-link ${isActive('/categories') ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Layers size={18} color="#ff007f" />
                  <span>⚡ Skill Tree (Categories)</span>
                </Link>

                <Link 
                  href="/prompts" 
                  className={`mobile-drawer-link ${isActive('/prompts') ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BookOpen size={18} color="#fbbf24" />
                  <span>🎨 Visual Prompts (37 Recipes)</span>
                </Link>

                <Link 
                  href="/alternatives" 
                  className={`mobile-drawer-link ${isActive('/alternatives') ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <GitCompare size={18} color="#a855f7" />
                  <span>⚔️ Versus Mode (Alternatives)</span>
                </Link>

                <Link 
                  href="/blog" 
                  className={`mobile-drawer-link ${isActive('/blog') ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BookOpen size={18} color="#38bdf8" />
                  <span>📰 Research Blog (1,000+ Guides)</span>
                </Link>

                <Link 
                  href="/about" 
                  className={`mobile-drawer-link ${isActive('/about') ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User size={18} color="#34d399" />
                  <span>👾 Player 1 (About Karan Arora)</span>
                </Link>

                <Link 
                  href="/submit" 
                  className={`mobile-drawer-link ${isActive('/submit') ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <PlusCircle size={18} color="#ec4899" />
                  <span>🚀 Submit Your AI Tool</span>
                </Link>
              </nav>

              <div className="mobile-drawer-footer">
                <Link 
                  href="/submit" 
                  className="btn btn-primary" 
                  style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                  onClick={() => setIsMobileMenuOpen(false)}
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
    </>
  );
}
