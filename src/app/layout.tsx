import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { 
  Sparkles, 
  PlusCircle, 
  Compass, 
  Layers, 
  GitCompare, 
  BookOpen, 
  ShieldCheck
} from 'lucide-react';
import Analytics from '@/app/components/Analytics';
import MobileDock from '@/app/components/MobileDock';
import Navbar from '@/app/components/Navbar';
import NewsletterCapture from '@/app/components/NewsletterCapture';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  metadataBase: new URL('https://stackaitools.com'),
  title: {
    default: 'Stack AI Tools | Curated Directory of 200+ Frontier AI Tools, Autonomous Agents & Prompt Index (2026)',
    template: '%s | Stack AI Tools'
  },
  description: 'The authoritative directory of top artificial intelligence software, autonomous coding agents, generative media, and ready-to-use prompt templates. Independently tested and verified.',
  keywords: [
    'AI tools directory',
    'best AI tools 2026',
    'AI coding assistants',
    'AI agents',
    'Midjourney prompts',
    'Claude prompts',
    'Stack AI Tools'
  ],
  authors: [
    { name: 'Stack AI Tools', url: 'https://stackaitools.com' }
  ],
  creator: 'Stack AI Tools',
  publisher: 'Stack AI Tools',
  openGraph: {
    title: 'Stack AI Tools | Curated AI Directory & Prompt Library',
    description: 'Discover and compare the world\'s top frontier AI software, autonomous agents, and prompts. Independently tested and verified.',
    url: 'https://stackaitools.com',
    siteName: 'Stack AI Tools',
    type: 'website',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stack AI Tools | Curated AI Directory & Prompts (2026)',
    description: 'Discover and compare top frontier AI software and autonomous agents. Independently tested and verified.'
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
  author: {
    '@type': 'Organization',
    name: 'Stack AI Tools',
    url: 'https://stackaitools.com'
  },
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
  logo: 'https://stackaitools.com/icon.svg'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) - GA4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-WCL9JTB6TC"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-WCL9JTB6TC');`
          }}
        ></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="help" href="/llms.txt" type="text/plain" title="LLM Context & AI Parser" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* PostHog Web Snippet (US Cloud - Project 364108) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}p||((p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",p.onerror=function(){p=null},(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r));var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="al ol ll init Il Rl Tl Ml Ol za El Dl Sl capture getExtension Pl nl Hl calculateEventProperties Bl register register_once register_for_session unregister unregister_for_session Vl Cl zl getFeatureFlag getFeatureFlagPayload getFeatureFlagResult getAllFeatureFlags isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync Gl identify setPersonProperties unsetPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset Zl shutdown setIdentity clearIdentity get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException addExceptionStep captureLog startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty Ul ql createPersonProfile setInternalOrTestUser Wl ul hl opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing $l debug Ua Jn getPageViewId captureTraceFeedback captureTraceMetric bl".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]); posthog.init('phc_wLA9gRd7oxsendn9i2z7CppaytbHaokeZTUwGPPEi4eJ', { api_host: 'https://us.i.posthog.com', defaults: '2026-05-30', person_profiles: 'identified_only' });`
          }}
        />
      </head>
      <body>
        <Analytics />
        <VercelAnalytics />
        <SpeedInsights />
        <MobileDock />
        <div id="app" className="app-container">
          <Navbar />
          <main id="app-router-view" className="main-content">
            {children}
          </main>
          <footer className="footer">
            <div className="footer-content">
              <div className="footer-status-pill">
                <span className="live-dot"></span>
                <span>Directory Verified & Live on <strong>stackaitools.com</strong> (Updated September 1, 2026)</span>
              </div>

              {/* Editorial Trust Strip */}
              <div
                style={{
                  marginTop: 20,
                  marginBottom: 36,
                  padding: '20px 24px',
                  background: 'rgba(99, 102, 241, 0.05)',
                  border: '1px solid rgba(15, 23, 42, 0.08)',
                  borderRadius: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 16
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: 'linear-gradient(135deg, #6366f1, #4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-strong)' }}>
                      Independently Tested & Verified
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                      Every listing is benchmarked directly • No pay-to-rank placements
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13 }}>
                  <Link href="/about" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <span>Our Editorial Standards</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* Global Newsletter Capture */}
              <div style={{ marginBottom: 48 }}>
                <NewsletterCapture 
                  source="global_footer"
                  headline="Stay Ahead of the AI Frontier"
                  subheadline="Subscribe to the free weekly intelligence briefing covering newly benchmarked tools, autonomous agents, and exclusive SaaS discount codes."
                />
              </div>

              <div className="footer-grid">
                <div className="footer-col">
                  <div className="footer-brand-title">
                    <Sparkles size={16} style={{ display: 'inline', marginRight: 6 }} />
                    Stack AI Tools
                  </div>
                  <p className="footer-subtext">
                    The leading independent directory of verified frontier AI models, autonomous coding agents, generative media, and ready-to-run prompt templates.
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
                    <li><Link href="/claude-connectors" style={{ color: '#38bdf8', fontWeight: 600 }}>Claude Connectors & MCP</Link></li>
                    <li><Link href="/blog">Frontier AI Research Blog</Link></li>
                    <li><Link href="/about">About Us</Link></li>
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
                © 2026 Stack AI Tools (stackaitools.com). All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
