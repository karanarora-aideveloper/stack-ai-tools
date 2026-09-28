'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Layers, 
  Search, 
  Plus, 
  Menu, 
  X, 
  Code2, 
  PenTool, 
  Video, 
  Music, 
  Workflow, 
  Briefcase,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface ObsidianHeaderProps {
  onSearchClick?: () => void;
  activeNav?: 'categories' | 'prompts' | 'research' | 'mcp' | 'spotlight' | 'directory';
}

export default function ObsidianHeader({ onSearchClick, activeNav }: ObsidianHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#040406]/85 backdrop-blur-xl border-b border-white/[0.07]">
        <div className="flex justify-between items-center h-16 px-4 md:px-8 max-w-7xl mx-auto">
          {/* Brand Logo & Version Chip */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-violet-500/30 flex items-center justify-center text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.3)] group-hover:scale-105 transition-transform">
                <Layers size={18} strokeWidth={2.2} />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-semibold text-lg tracking-tight text-white font-['Geist',sans-serif]">Stack AI</span>
                <span className="text-xs text-zinc-400 font-medium">Tools</span>
              </div>
            </Link>

            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-[10px] font-mono text-violet-300 uppercase tracking-wider">
              2026 Directory
            </span>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm text-zinc-400">
            <Link 
              href="/#spotlight" 
              className={`hover:text-white transition-colors ${activeNav === 'spotlight' ? 'text-white font-medium' : ''}`}
            >
              Spotlight
            </Link>
            <Link 
              href="/#directory" 
              className={`hover:text-white transition-colors ${activeNav === 'directory' ? 'text-white font-medium' : ''}`}
            >
              Directory
            </Link>
            <Link 
              href="/categories" 
              className={`hover:text-white transition-colors ${activeNav === 'categories' ? 'text-violet-400 font-medium' : ''}`}
            >
              Categories
            </Link>
            <Link 
              href="/prompts" 
              className={`hover:text-white transition-colors ${activeNav === 'prompts' ? 'text-violet-400 font-medium' : ''}`}
            >
              Prompts
            </Link>
            <Link 
              href="/blog" 
              className={`hover:text-white transition-colors ${activeNav === 'research' ? 'text-violet-400 font-medium' : ''}`}
            >
              Research
            </Link>
            <Link 
              href="/antigravity-mcp" 
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <span>MCP Servers</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono">NEW</span>
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <Link
              href="/#directory"
              onClick={onSearchClick}
              className="hidden sm:flex items-center gap-2 bg-zinc-900/80 border border-white/10 hover:border-violet-500/40 rounded-lg px-3 py-1.5 text-xs text-zinc-400 transition-all hover:text-white"
            >
              <Search size={14} className="text-zinc-500" />
              <span>Search...</span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-white/10 text-[10px] font-mono text-zinc-300">⌘K</kbd>
            </Link>

            {/* Submit Tool Action */}
            <Link
              href="/submit"
              className="inline-flex items-center gap-1.5 bg-white text-zinc-950 hover:bg-zinc-100 font-medium text-xs sm:text-sm px-3.5 py-1.5 rounded-lg transition-all duration-150 shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95"
            >
              <Plus size={15} strokeWidth={2.5} />
              <span>Submit Tool</span>
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0a0a0f] border-b border-white/10 px-4 py-6 space-y-4">
            <nav className="flex flex-col space-y-3 text-sm">
              <Link 
                href="/#directory" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-zinc-300 hover:text-white py-1.5"
              >
                <span>Directory</span>
                <span className="text-xs text-zinc-500 font-mono">220+ Tools</span>
              </Link>
              <Link 
                href="/categories" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-zinc-300 hover:text-white py-1.5"
              >
                <span>Categories</span>
                <span className="text-xs text-violet-400 font-mono">8 Core</span>
              </Link>
              <Link 
                href="/prompts" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-zinc-300 hover:text-white py-1.5"
              >
                <span>Prompts Library</span>
                <span className="text-xs text-pink-400 font-mono">45+ Prompts</span>
              </Link>
              <Link 
                href="/blog" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-zinc-300 hover:text-white py-1.5"
              >
                <span>Frontier Research</span>
                <span className="text-xs text-zinc-500 font-mono">Deep Dives</span>
              </Link>
              <Link 
                href="/antigravity-mcp" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-zinc-300 hover:text-white py-1.5"
              >
                <span>MCP Servers</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">NEW</span>
              </Link>
              <Link 
                href="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-zinc-300 hover:text-white py-1.5"
              >
                <span>About & Editorial</span>
              </Link>
            </nav>
            <div className="pt-3 border-t border-white/10">
              <Link
                href="/submit"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
              >
                <Plus size={16} />
                <span>Submit Tool to Index</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
