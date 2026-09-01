'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Compass, 
  Layers, 
  BookOpen, 
  GitCompare, 
  User, 
  Plus, 
  Menu, 
  X, 
  Sparkles,
  ArrowRight
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="topbar-logo-mark" style={{ width: 28, height: 28 }}>
                  <Sparkles size={14} color="#ffffff" />
                </div>
                <span style={{ fontWeight: 700, color: '#fff', fontSize: 16 }}>Stack AI Tools</span>
              </div>
              <button 
                className="mobile-drawer-close"
                onClick={() => setIsDrawerOpen(false)}
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
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <Compass size={18} color="#6366f1" />
                  <span>Explore 85+ Tools</span>
                </Link>

                <Link 
                  href="/categories" 
                  className={`mobile-drawer-link ${isActive('/categories') ? 'active' : ''}`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <Layers size={18} color="#0ea5e9" />
                  <span>Categories</span>
                </Link>

                <Link 
                  href="/alternatives" 
                  className={`mobile-drawer-link ${isActive('/alternatives') ? 'active' : ''}`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <GitCompare size={18} color="#8b5cf6" />
                  <span>Alternatives</span>
                </Link>

                <Link 
                  href="/prompts" 
                  className={`mobile-drawer-link ${isActive('/prompts') ? 'active' : ''}`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <BookOpen size={18} color="#f59e0b" />
                  <span>Prompt Library</span>
                </Link>

                <Link 
                  href="/blog" 
                  className={`mobile-drawer-link ${isActive('/blog') ? 'active' : ''}`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <Sparkles size={18} color="#10b981" />
                  <span>Research & Benchmarks</span>
                </Link>

                <Link 
                  href="/about" 
                  className={`mobile-drawer-link ${isActive('/about') ? 'active' : ''}`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <User size={18} color="#a855f7" />
                  <span>About Karan Arora</span>
                </Link>
              </nav>

              <div className="mobile-drawer-footer">
                <Link 
                  href="/submit" 
                  className="btn btn-primary" 
                  style={{ width: '100%', justifyContent: 'center', padding: '10px 16px' }}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <Plus size={15} />
                  <span>Submit AI Tool</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom App Dock (Clean Apple / Google style) */}
      <nav className="mobile-bottom-dock" aria-label="Mobile navigation">
        <Link 
          href="/" 
          className={`mobile-dock-btn ${isActive('/') ? 'active' : ''}`}
        >
          <Compass size={19} />
          <span>Explore</span>
        </Link>

        <Link 
          href="/categories" 
          className={`mobile-dock-btn ${isActive('/categories') ? 'active' : ''}`}
        >
          <Layers size={19} />
          <span>Categories</span>
        </Link>

        <Link 
          href="/prompts" 
          className={`mobile-dock-btn ${isActive('/prompts') ? 'active' : ''}`}
        >
          <BookOpen size={19} />
          <span>Prompts</span>
        </Link>

        <Link 
          href="/blog" 
          className={`mobile-dock-btn ${isActive('/blog') ? 'active' : ''}`}
        >
          <Sparkles size={19} />
          <span>Research</span>
        </Link>

        <button 
          className={`mobile-dock-btn ${isDrawerOpen ? 'active' : ''}`}
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          aria-label="Open full menu"
        >
          <Menu size={19} />
          <span>More</span>
        </button>
      </nav>
    </>
  );
}
