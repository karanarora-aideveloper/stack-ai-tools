import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { Sparkles, PlusCircle, Compass, Layers, GitCompare, BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  metadataBase: new URL('https://stackaitools.com'),
  title: {
    default: 'Stack AI Tools | Top 40+ Curated AI Tools, Autonomous Agents & Prompt Directory (2026)',
    template: '%s | Stack AI Tools'
  },
  description: 'The authoritative US directory of top artificial intelligence software, autonomous coding agents, generative media, and ready-to-use prompt templates.',
  keywords: [
    'AI tools directory',
    'best AI tools 2026',
    'AI coding assistants',
    'AI agents',
    'Midjourney prompts',
    'Claude prompts',
    'Stack AI Tools'
  ],
  authors: [{ name: 'Stack AI Tools Editorial Board' }],
  creator: 'Stack AI Tools',
  openGraph: {
    title: 'Stack AI Tools | Curated AI Directory & Prompt Library',
    description: 'Discover and compare the world\'s top frontier AI software, autonomous agents, and prompts.',
    url: 'https://stackaitools.com',
    siteName: 'Stack AI Tools',
    type: 'website',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stack AI Tools | Curated AI Directory & Prompts (2026)',
    description: 'Discover and compare top frontier AI software and autonomous agents.'
  },
  alternates: {
    canonical: 'https://stackaitools.com',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Stack AI Tools',
  url: 'https://stackaitools.com',
  description: 'The authoritative US directory of top artificial intelligence software, autonomous coding agents, generative media, and ready-to-use prompt templates.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://stackaitools.com/?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Stack AI Tools',
  url: 'https://stackaitools.com',
  logo: 'https://stackaitools.com/icon.svg',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="help" href="/llms.txt" type="text/plain" title="LLM Context & AI Parser" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <div id="app" className="app-container">
          <nav className="navbar">
            <div className="navbar-content">
              <Link href="/" className="logo">
                <span className="logo-icon">
                  <Sparkles size={18} color="#fff" />
                </span>
                <span className="logo-text">Stack AI Tools</span>
                <span className="logo-domain-badge">.com</span>
              </Link>
              <div className="nav-links">
                <Link href="/" className="nav-link">
                  <Compass size={15} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 5 }} />
                  Explore
                </Link>
                <Link href="/categories" className="nav-link">
                  <Layers size={15} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 5 }} />
                  Categories
                </Link>
                <Link href="/alternatives" className="nav-link">
                  <GitCompare size={15} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 5 }} />
                  Alternatives
                </Link>
                <Link href="/prompts" className="nav-link">
                  <BookOpen size={15} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 5 }} />
                  Prompts
                </Link>
                <Link href="/submit" className="nav-link">
                  <PlusCircle size={15} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 5 }} />
                  Submit Tool
                </Link>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <a 
                  href="https://github.com/karanarora-aideveloper/stack-ai-tools" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ padding: '8px 14px', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13 }}
                  title="Star Stack AI Tools on GitHub"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </a>
                <Link href="/submit" className="btn btn-primary">
                  <span>Submit Tool</span>
                  <PlusCircle size={15} />
                </Link>
              </div>
            </div>
          </nav>
          <main id="app-router-view" className="main-content">
            {children}
          </main>
          <footer className="footer">
            <div className="footer-content">
              <div className="footer-status-pill">
                <span className="live-dot"></span>
                <span>Directory Verified & Live on <strong>stackaitools.com</strong> (Updated September 1, 2026)</span>
              </div>
              <div className="footer-grid">
                <div className="footer-col">
                  <div className="footer-brand-title">
                    <Sparkles size={16} style={{ display: 'inline', marginRight: 6 }} />
                    Stack AI Tools
                  </div>
                  <p className="footer-subtext">
                    The leading independent US directory of verified frontier AI models, autonomous coding agents, generative media, and ready-to-run prompt templates.
                  </p>
                  <div className="footer-compliance-pill">
                    <ShieldCheck size={14} style={{ display: 'inline', marginRight: 5 }} />
                    <span>Independent Editorial & Vetted Pricing</span>
                  </div>
                </div>
                <div className="footer-col">
                  <h4 className="footer-heading">Top Categories</h4>
                  <ul className="footer-links-list">
                    <li><Link href="/category/code">Coding & Dev Agents</Link></li>
                    <li><Link href="/category/video">AI Video & Avatars</Link></li>
                    <li><Link href="/category/writing">Writing & Reasoning</Link></li>
                    <li><Link href="/category/design">Generative Design</Link></li>
                    <li><Link href="/category/audio">Voice & Studio Audio</Link></li>
                    <li><Link href="/category/automation">Workflow Automation</Link></li>
                  </ul>
                </div>
                <div className="footer-col">
                  <h4 className="footer-heading">Top Alternatives</h4>
                  <ul className="footer-links-list">
                    <li><Link href="/alternatives/cursor">Cursor AI Alternatives</Link></li>
                    <li><Link href="/alternatives/midjourney">Midjourney Alternatives</Link></li>
                    <li><Link href="/alternatives/chatgpt">ChatGPT Alternatives</Link></li>
                    <li><Link href="/alternatives/elevenlabs">ElevenLabs Alternatives</Link></li>
                    <li><Link href="/alternatives/jasper-ai">Jasper AI Alternatives</Link></li>
                  </ul>
                </div>
                <div className="footer-col">
                  <h4 className="footer-heading">Ecosystem & Community</h4>
                  <ul className="footer-links-list">
                    <li><Link href="/prompts">Visual Prompt Showcase</Link></li>
                    <li><Link href="/categories">All Software Categories</Link></li>
                    <li><Link href="/submit">Submit Your AI Tool</Link></li>
                    <li>
                      <a href="https://github.com/karanarora-aideveloper/stack-ai-tools" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        <span>Open Source GitHub</span>
                      </a>
                    </li>
                    <li><a href="/llms.txt" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><span>🤖</span> LLM Context (`llms.txt`)</a></li>
                  </ul>
                </div>
              </div>

              {/* FTC Affiliate Disclosure */}
              <div className="footer-disclosure">
                <p>
                  <strong>FTC Reader Disclosure:</strong> Stack AI Tools (stackaitools.com) is reader-supported. When you click through links or purchase software through our directory, we may earn an affiliate commission at no additional cost to you. We only feature vetted, high-quality AI products.
                </p>
              </div>

              <p className="footer-copyright">
                © 2026 Stack AI Tools (stackaitools.com). All rights reserved. Built for modern builders, researchers, and creators.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

