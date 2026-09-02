import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Sparkles, 
  Mail, 
  CheckCircle, 
  ExternalLink, 
  Terminal, 
  Code2, 
  ShieldCheck, 
  Layers, 
  Compass, 
  Send,
  Cpu
} from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'Karan Arora | Founder, Stack AI Tools' },
  description: 'Official profile of Karan Arora, founder and lead architect behind Stack AI Tools (stackaitools.com). Software engineer, builder, and frontier AI researcher.',
  keywords: [
    'Karan Arora',
    'Karan Arora AI',
    'Karan Arora Stack AI Tools',
    'Karan Arora AI developer',
    'Karan Arora founder',
    'Stack AI Tools founder'
  ],
  authors: [{ name: 'Karan Arora', url: 'https://stackaitools.com/about' }],
  creator: 'Karan Arora',
  alternates: {
    canonical: 'https://stackaitools.com/about'
  },
  openGraph: {
    title: 'Karan Arora | Founder & Chief AI Architect',
    description: 'Learn about Karan Arora, founder of Stack AI Tools, and his mission to build the world\'s most authoritative frontier AI ecosystem.',
    url: 'https://stackaitools.com/about',
    type: 'profile',
    siteName: 'Stack AI Tools'
  }
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: 'Karan Arora',
    jobTitle: 'Founder & Chief AI Architect',
    description: 'Software engineer, startup founder, and AI architect building Stack AI Tools (stackaitools.com), the premier catalog of frontier AI software and autonomous agents.',
    url: 'https://stackaitools.com/about',
    email: 'mailto:karan@stackaitools.com',
    image: 'https://stackaitools.com/icon.svg',
    sameAs: [
      'https://github.com/karanarora-aideveloper',
      'https://github.com/karanarora-aideveloper/stack-ai-tools'
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Stack AI Tools',
      url: 'https://stackaitools.com'
    },
    knowsAbout: [
      'Artificial Intelligence',
      'Autonomous Coding Agents',
      'Prompt Engineering',
      'Fullstack Web Architecture',
      'Large Language Models (LLMs)',
      'Machine Learning Systems'
    ]
  }
};

export default function AboutPage() {
  return (
    <div className="about-container" style={{ maxWidth: 1040, margin: '0 auto', padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* Breadcrumbs */}
      <div className="breadcrumbs" style={{ marginBottom: 28 }}>
        <Link href="/" className="crumb-link">Home</Link>
        <span className="crumb-sep">/</span>
        <span className="crumb-current">About Karan Arora</span>
      </div>

      {/* Founder Hero Card */}
      <div 
        className="founder-hero-card"
        style={{
          background: 'linear-gradient(135deg, rgba(26, 26, 36, 0.95), rgba(16, 16, 24, 0.95))',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 24,
          padding: '44px 36px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: 40
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 320,
            height: 320,
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(236, 72, 153, 0.1) 60%, transparent 80%)',
            filter: 'blur(50px)',
            pointerEvents: 'none'
          }}
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center' }}>
          {/* Avatar / Monogram */}
          <div 
            style={{
              width: 110,
              height: 110,
              borderRadius: 24,
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 38,
              fontWeight: 800,
              color: '#ffffff',
              boxShadow: '0 12px 30px rgba(99, 102, 241, 0.4)',
              flexShrink: 0,
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            KA
          </div>

          <div style={{ flex: '1 1 300px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: 20, padding: '4px 12px', marginBottom: 12 }}>
              <Sparkles size={13} color="#a5b4fc" />
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', color: '#c7d2fe', textTransform: 'uppercase' }}>
                Founder & Chief AI Architect
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, margin: '0 0 10px', color: '#ffffff', letterSpacing: '-0.02em' }}>
              Karan Arora
            </h1>

            <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.6, margin: '0 0 20px', maxWidth: 640 }}>
              Founder of <strong>Stack AI Tools</strong> (<code>stackaitools.com</code>). Software engineer, generative AI researcher, and ecosystem architect on a mission to build the world’s most transparent, high-performance directory of vetted artificial intelligence software, autonomous coding agents, and tested prompts.
            </p>

            {/* Direct Contact Links */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <a 
                href="mailto:karan@stackaitools.com" 
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', fontSize: 14 }}
              >
                <Mail size={16} />
                <span>Contact Karan</span>
              </a>

              <a 
                href="https://github.com/karanarora-aideveloper" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', fontSize: 14 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub (@karanarora-aideveloper)</span>
              </a>

              <a 
                href="https://github.com/karanarora-aideveloper/stack-ai-tools" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', fontSize: 14 }}
              >
                <Code2 size={16} />
                <span>Open Source Repo</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Philosophy & Expertise */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 40 }}>
        <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 20, padding: 30 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <Cpu size={22} color="#818cf8" />
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 10px', color: '#f8fafc' }}>
            Why I Built Stack AI Tools
          </h3>
          <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.65, margin: 0 }}>
            In the explosion of AI startups, hundreds of tools claim revolutionary features while hiding real pricing or repackaging basic wrappers. I built Stack AI Tools to give builders, founders, and creators an unvarnished, transparent directory with verified reviews, accurate pricing models, and direct alternative comparisons.
          </p>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 20, padding: 30 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(236, 72, 153, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <ShieldCheck size={22} color="#f472b6" />
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 10px', color: '#f8fafc' }}>
            Strict E-E-A-T Editorial Standard
          </h3>
          <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.65, margin: 0 }}>
            Every tool in this directory is personally evaluated for speed, developer ergonomics, model backing (GPT-5, Claude 3.5 Sonnet, Llama 3, Midjourney v7), and value. We never list broken software or deceptive subscriptions.
          </p>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 20, padding: 30 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <Terminal size={22} color="#34d399" />
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 10px', color: '#f8fafc' }}>
            Open Source & Community Driven
          </h3>
          <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.65, margin: 0 }}>
            The code and data behind Stack AI Tools is open source on GitHub. Founders can submit pull requests, developers can contribute prompt recipes, and crawlers can consume clean Markdown context via <code>/llms.txt</code>.
          </p>
        </div>
      </div>

      {/* Founder Direct Action Callout */}
      <div 
        style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(236, 72, 153, 0.08) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          borderRadius: 20,
          padding: '36px 30px',
          textAlign: 'center'
        }}
      >
        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#ffffff', margin: '0 0 12px' }}>
          Want to Feature Your AI Tool or Collaborate?
        </h2>
        <p style={{ fontSize: 15, color: '#cbd5e1', maxWidth: 620, margin: '0 auto 24px', lineHeight: 1.6 }}>
          Whether you are launching an autonomous coding agent, a generative model, or want to explore partnership opportunities, reach out directly to Karan Arora.
        </p>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
          <Link href="/submit" className="btn btn-primary" style={{ padding: '12px 24px' }}>
            <span>Submit Tool for Review</span>
            <Send size={16} />
          </Link>
          <a href="mailto:karan@stackaitools.com" className="btn btn-secondary" style={{ padding: '12px 24px' }}>
            <span>Email: karan@stackaitools.com</span>
            <Mail size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
