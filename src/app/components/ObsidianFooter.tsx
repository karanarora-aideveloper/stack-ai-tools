'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

export default function ObsidianFooter() {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <>
      {/* High-Conversion Perks & Weekly Radar Section */}
      <section className="px-4 md:px-8 max-w-5xl mx-auto py-16 relative z-10">
        <div className="obsidian-card rounded-3xl p-8 md:p-12 relative overflow-hidden border border-white/10 text-center">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-mono uppercase tracking-wider mb-4">
              <Sparkles size={13} className="text-violet-400" /> Frontier Perks & Radar
            </span>

            <h3 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight mb-4 font-['Geist',sans-serif]">
              Get $10,000+ in AI tool credits & weekly frontier breakdowns
            </h3>

            <p className="text-sm sm:text-base text-zinc-400 mb-8 leading-relaxed font-light">
              Every Friday, receive independent benchmark results on new releases, autonomous agent breakdowns, and exclusive discounts for modern engineering teams.
            </p>

            {subscribed ? (
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm font-medium">
                <CheckCircle2 size={18} className="text-emerald-400" />
                <span>You're on the list! Welcome to the Frontier Radar.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  placeholder="Enter your work email..."
                  className="w-full bg-zinc-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-zinc-950 font-medium text-sm hover:bg-zinc-100 transition-all shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.2)] active:scale-95"
                >
                  Get Radar
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Obsidian Refined Footer */}
      <footer className="border-t border-white/[0.08] bg-[#020204] py-16 px-4 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Status Indicator */}
          <div className="flex flex-col sm:flex-row items-center justify-between pb-10 border-b border-white/[0.08] gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>All AI benchmark feeds operational • Sub-50ms Global Anycast</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Independently Tested & Verified Directory</span>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/[0.08] text-xs">
            <div>
              <h5 className="font-semibold text-white mb-4 uppercase tracking-wider text-[11px] font-mono">
                Categories
              </h5>
              <ul className="space-y-2.5 text-zinc-400">
                <li><Link href="/category/code" className="hover:text-white transition-colors">Developer & Code Agents</Link></li>
                <li><Link href="/category/video" className="hover:text-white transition-colors">AI Video & Avatars</Link></li>
                <li><Link href="/category/writing" className="hover:text-white transition-colors">Writing & Reasoning</Link></li>
                <li><Link href="/category/design" className="hover:text-white transition-colors">Generative Design & 3D</Link></li>
                <li><Link href="/category/audio" className="hover:text-white transition-colors">Voice & Studio Audio</Link></li>
                <li><Link href="/category/automation" className="hover:text-white transition-colors">Workflow Automation</Link></li>
                <li><Link href="/categories" className="hover:text-violet-400 transition-colors">All 8 Categories →</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-white mb-4 uppercase tracking-wider text-[11px] font-mono">
                Alternatives
              </h5>
              <ul className="space-y-2.5 text-zinc-400">
                <li><Link href="/alternatives/cursor" className="hover:text-white transition-colors">Cursor AI Alternatives</Link></li>
                <li><Link href="/alternatives/midjourney" className="hover:text-white transition-colors">Midjourney Alternatives</Link></li>
                <li><Link href="/alternatives/chatgpt" className="hover:text-white transition-colors">ChatGPT Alternatives</Link></li>
                <li><Link href="/alternatives/elevenlabs" className="hover:text-white transition-colors">ElevenLabs Alternatives</Link></li>
                <li><Link href="/alternatives/jasper-ai" className="hover:text-white transition-colors">Jasper AI Alternatives</Link></li>
                <li><Link href="/alternatives" className="hover:text-white transition-colors">All 40+ Alternatives →</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-white mb-4 uppercase tracking-wider text-[11px] font-mono">
                Frontier Resources
              </h5>
              <ul className="space-y-2.5 text-zinc-400">
                <li><Link href="/antigravity-mcp" className="hover:text-white transition-colors">Antigravity MCP Tools</Link></li>
                <li><Link href="/claude-connectors" className="hover:text-white transition-colors">Claude Connectors</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Frontier AI Research Blog</Link></li>
                <li><Link href="/prompts" className="hover:text-white transition-colors">Curated Prompt Library</Link></li>
                <li><Link href="/submit" className="hover:text-white transition-colors">Submit Tool for Review</Link></li>
                <li><a href="/llms.txt" target="_blank" className="hover:text-white transition-colors">LLM Context (llms.txt)</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-white mb-4 uppercase tracking-wider text-[11px] font-mono">
                Stack AI
              </h5>
              <ul className="space-y-2.5 text-zinc-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About & Editorial Team</Link></li>
                <li><a href="https://github.com/karanarora-aideveloper/stack-ai-tools" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Open Source GitHub</a></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><a href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap XML</a></li>
              </ul>
            </div>
          </div>

          {/* Disclosure & Copyright */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
            <p className="max-w-xl text-center md:text-left text-[11px] leading-relaxed">
              <strong>FTC Disclosure:</strong> Stack AI Tools (stackaitools.com) is reader-supported. When you purchase software through our links, we may earn an affiliate commission at no extra cost to you.
            </p>
            <p className="text-[11px] font-mono">
              © {new Date().getFullYear()} Stack AI Tools. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
