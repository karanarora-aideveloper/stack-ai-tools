import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Terminal,
  Code2,
  Cpu,
  Send,
  Layers,
  Compass
} from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'About Stack AI Tools' },
  description: 'Stack AI Tools is an independent directory of frontier AI software, autonomous agents, and prompts — every listing is tested, benchmarked, and verified before publishing.',
  keywords: [
    'about Stack AI Tools',
    'AI tools directory',
    'independent AI software reviews',
    'Stack AI Tools editorial standards'
  ],
  alternates: {
    canonical: 'https://stackaitools.com/about'
  },
  openGraph: {
    title: 'About Stack AI Tools',
    description: 'An independent, editorially vetted directory of frontier AI software, autonomous agents, and prompts.',
    url: 'https://stackaitools.com/about',
    type: 'website',
    siteName: 'Stack AI Tools'
  }
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  mainEntity: {
    '@type': 'Organization',
    name: 'Stack AI Tools',
    description: 'An independent directory of frontier AI software, autonomous coding agents, generative media models, and tested prompt templates.',
    url: 'https://stackaitools.com',
    logo: 'https://stackaitools.com/icon.svg',
    knowsAbout: [
      'Artificial Intelligence',
      'Autonomous Coding Agents',
      'Prompt Engineering',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      {/* Breadcrumbs */}
      <div className="breadcrumbs" style={{ marginBottom: 28 }}>
        <Link href="/" className="crumb-link">Home</Link>
        <span className="crumb-sep">/</span>
        <span className="crumb-current">About Us</span>
      </div>

      {/* Hero Card */}
      <div
        className="founder-hero-card"
        style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.06) 0%, rgba(255, 255, 255, 0.9) 100%)',
          border: '1px solid rgba(var(--ink-tint-rgb), 0.08)',
          borderRadius: 24,
          padding: '44px 36px',
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: 40
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.25)', borderRadius: 20, padding: '4px 12px', marginBottom: 16 }}>
          <Sparkles size={13} color="var(--accent-secondary)" />
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', color: 'var(--accent-secondary)', textTransform: 'uppercase' }}>
            Independent AI Software Directory
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, margin: '0 0 14px', color: 'var(--text-strong)', letterSpacing: '-0.02em' }}>
          About Stack AI Tools
        </h1>

        <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, maxWidth: 680 }}>
          <strong>Stack AI Tools</strong> (<code>stackaitools.com</code>) is an independently run directory built to give builders, founders, and creators a transparent, high-performance catalog of vetted artificial intelligence software, autonomous coding agents, and tested prompts — without the marketing noise.
        </p>
      </div>

      {/* Grid: Mission & Standards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 40 }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid rgba(var(--ink-tint-rgb), 0.08)', borderRadius: 20, padding: 30, boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <Cpu size={22} color="var(--accent-secondary)" />
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 10px', color: 'var(--text-strong)' }}>
            Why We Built This
          </h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
            In the explosion of AI startups, hundreds of tools claim revolutionary features while hiding real pricing or repackaging basic wrappers. Stack AI Tools exists to give builders an unvarnished, transparent directory with verified reviews, accurate pricing models, and direct alternative comparisons.
          </p>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid rgba(var(--ink-tint-rgb), 0.08)', borderRadius: 20, padding: 30, boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(219, 39, 119, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <ShieldCheck size={22} color="#db2777" />
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 10px', color: 'var(--text-strong)' }}>
            Strict Editorial Standard
          </h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
            Every tool in this directory is evaluated for speed, developer ergonomics, model backing, and value. We never list broken software or deceptive subscriptions, and listings are never ranked by payment.
          </p>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid rgba(var(--ink-tint-rgb), 0.08)', borderRadius: 20, padding: 30, boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <Terminal size={22} color="#059669" />
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 10px', color: 'var(--text-strong)' }}>
            Open Source & Community Driven
          </h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
            The code and data behind Stack AI Tools is open source. Anyone can submit pull requests, contribute prompt recipes, or consume clean Markdown context via <code>/llms.txt</code>.
          </p>
        </div>
      </div>

      {/* How We Vet Tools */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid rgba(var(--ink-tint-rgb), 0.08)', borderRadius: 20, padding: 32, marginBottom: 40, boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 18px', color: 'var(--text-strong)' }}>
          How We Vet Every Tool
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <Layers size={18} color="var(--accent-secondary)" style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
              Pricing, plan tiers, and free-tier limits are checked directly against the vendor&apos;s own pricing page, not press releases.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Compass size={18} color="var(--accent-secondary)" style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
              Category and use-case fit is based on hands-on testing of core workflows, not marketing copy.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <ShieldCheck size={18} color="var(--accent-secondary)" style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
              Ratings and review counts are cross-checked and refreshed on an ongoing basis, not set once and forgotten.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div
        style={{
          background: 'rgba(99, 102, 241, 0.06)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderRadius: 20,
          padding: '36px 30px',
          textAlign: 'center'
        }}
      >
        <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-strong)', margin: '0 0 12px' }}>
          Want to Feature Your AI Tool?
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', maxWidth: 620, margin: '0 auto 24px', lineHeight: 1.6 }}>
          Whether you are launching an autonomous coding agent, a generative model, or want to explore partnership opportunities, submit it for editorial review.
        </p>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
          <Link href="/submit" className="btn btn-primary" style={{ padding: '12px 24px' }}>
            <span>Submit Tool for Review</span>
            <Send size={16} />
          </Link>
          <a
            href="https://github.com/karanarora-aideveloper/stack-ai-tools"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ padding: '12px 24px' }}
          >
            <Code2 size={16} />
            <span>Open Source Repo</span>
          </a>
        </div>
      </div>
    </div>
  );
}
