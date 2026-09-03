'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Sparkles, 
  Layers, 
  BookOpen, 
  GitCompare, 
  User, 
  Plus, 
  Menu, 
  X, 
  Compass,
  ArrowRight,
  ExternalLink,
  Terminal
} from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { DrawerBackdrop, DrawerPanel } from './motion/Drawer';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <div className="topbar-logo-mark">
              <Sparkles size={17} color="#ffffff" />
            </div>
            <div className="topbar-brand-text">
              <span className="topbar-brand-main">Stack AI</span>
              <span className="topbar-brand-sub">Tools</span>
            </div>
            <span className="modern-status-badge">
              <span className="status-dot"></span>
              2026 INDEX
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
              <span>Prompts</span>
            </Link>
            <Link 
              href="/blog" 
              className={`topbar-nav-pill ${isActive('/blog') ? 'active' : ''}`}
            >
              <span>Research</span>
            </Link>
            <Link 
              href="/claude-connectors" 
              className={`topbar-nav-pill ${isActive('/claude-connectors') ? 'active' : ''}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <span>Claude Connectors</span>
              <span style={{ fontSize: 9.5, padding: '1px 5px', borderRadius: 6, background: 'rgba(168, 85, 247, 0.25)', color: '#7e22ce', border: '1px solid rgba(168, 85, 247, 0.4)', fontWeight: 700 }}>NEW</span>
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
            <a 
              href="https://github.com/karanarora-aideveloper/stack-ai-tools" 
              target="_blank" 
              rel="noopener noreferrer"
              className="topbar-btn-github"
              title="View on GitHub"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>Star</span>
            </a>

            <Link href="/submit" className="topbar-btn-submit">
              <Plus size={14} />
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

      {/* Clean Mobile Slide-Over Drawer */}
      <AnimatePresence>
      {isMobileMenuOpen && (
        <DrawerBackdrop className="mobile-drawer-backdrop" onClick={() => setIsMobileMenuOpen(false)}>
          <DrawerPanel className="mobile-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="topbar-logo-mark" style={{ width: 28, height: 28 }}>
                  <Sparkles size={14} color="#ffffff" />
                </div>
                <span style={{ fontWeight: 700, color: 'var(--text-strong)', fontSize: 16 }}>Stack AI Tools</span>
              </div>
              <button 
                className="mobile-drawer-close"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mobile-drawer-content">
              <nav className="mobile-drawer-nav">
                <Link 
                  href="/" 
                  className={`mobile-drawer-link ${isActive('/') ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Compass size={18} color="#6366f1" />
                  <span>Explore 85+ Tools</span>
                </Link>

                <Link 
                  href="/categories" 
                  className={`mobile-drawer-link ${isActive('/categories') ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Layers size={18} color="#0ea5e9" />
                  <span>Categories Directory</span>
                </Link>

                <Link 
                  href="/alternatives" 
                  className={`mobile-drawer-link ${isActive('/alternatives') ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <GitCompare size={18} color="#8b5cf6" />
                  <span>Tool Alternatives</span>
                </Link>

                <Link 
                  href="/prompts" 
                  className={`mobile-drawer-link ${isActive('/prompts') ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BookOpen size={18} color="#d97706" />
                  <span>Prompt Library (37 Prompts)</span>
                </Link>

                <Link 
                  href="/blog" 
                  className={`mobile-drawer-link ${isActive('/blog') ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Sparkles size={18} color="#10b981" />
                  <span>Research & Benchmarks</span>
                </Link>

                <Link 
                  href="/claude-connectors" 
                  className={`mobile-drawer-link ${isActive('/claude-connectors') ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Terminal size={18} color="#0284c7" />
                  <span>Claude Connectors & MCP</span>
                </Link>

                <Link 
                  href="/about" 
                  className={`mobile-drawer-link ${isActive('/about') ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User size={18} color="#a855f7" />
                  <span>About Us</span>
                </Link>
              </nav>

              <div className="mobile-drawer-footer">
                <Link 
                  href="/submit" 
                  className="btn btn-primary" 
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Plus size={16} />
                  <span>Submit Your AI Tool</span>
                </Link>
              </div>
            </div>
          </DrawerPanel>
        </DrawerBackdrop>
      )}
      </AnimatePresence>
    </>
  );
}
