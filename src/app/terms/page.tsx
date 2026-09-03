import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: { absolute: 'Terms of Service | Stack AI Tools' },
  description: 'The terms that govern your use of Stack AI Tools (stackaitools.com).',
  alternates: { canonical: 'https://stackaitools.com/terms' },
  robots: { index: true, follow: true }
};

export default function TermsPage() {
  return (
    <div style={{ maxWidth: 780, margin: '0 auto', padding: '40px 20px 80px' }}>
      <div className="breadcrumbs" style={{ marginBottom: 28 }}>
        <Link href="/" className="crumb-link">Home</Link>
        <span className="crumb-sep">/</span>
        <span className="crumb-current">Terms of Service</span>
      </div>

      <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: 'var(--text-strong)', letterSpacing: '-0.02em', margin: '0 0 8px' }}>
        Terms of Service
      </h1>
      <p style={{ fontSize: 13.5, color: 'var(--text-muted)', margin: '0 0 36px' }}>
        Last updated: September 2, 2026
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, fontSize: 14.5, lineHeight: 1.75, color: 'var(--text-secondary)' }}>
        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 10 }}>1. Acceptance of Terms</h2>
          <p>
            By accessing or using stackaitools.com (the &quot;Site&quot;), you agree to be bound by these Terms of
            Service. If you do not agree, please do not use the Site.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 10 }}>2. What We Provide</h2>
          <p>
            Stack AI Tools is an independent directory of third-party AI software, autonomous agents, and prompt
            templates. Listings, ratings, and pricing information are compiled from public sources and our own
            testing, and are provided for informational purposes only. We do not develop, own, or control the
            tools listed on the Site.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 10 }}>3. No Warranty</h2>
          <p>
            The Site and its content are provided &quot;as is&quot; without warranties of any kind. While we make a
            reasonable effort to keep pricing, ratings, and descriptions current, third-party tools change without
            notice, and we cannot guarantee the accuracy, completeness, or availability of any listing at any
            given time. You should verify pricing and capabilities directly with the tool provider before making a
            purchasing decision.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 10 }}>4. Affiliate Relationships</h2>
          <p>
            Some outbound links on the Site are affiliate links, meaning we may earn a commission if you sign up
            for or purchase a tool through them, at no additional cost to you. This is disclosed on relevant
            pages and never influences which tools are listed or how they are rated.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 10 }}>5. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Stack AI Tools shall not be liable for any indirect,
            incidental, or consequential damages arising from your use of the Site or any third-party tool
            discovered through it, including losses related to purchasing decisions made based on Site content.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 10 }}>6. Tool Submissions</h2>
          <p>
            If you submit a tool for listing, you confirm that you have the right to share the information
            provided and that it is accurate to the best of your knowledge. We reserve the right to accept,
            reject, edit, or remove any listing at our discretion, including for accuracy, quality, or policy
            reasons.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 10 }}>7. Intellectual Property</h2>
          <p>
            The Site&apos;s design, original written content, and compilation of listings are owned by Stack AI
            Tools. Trademarks, logos, and product names belonging to third-party tools remain the property of
            their respective owners and are used for identification purposes only. The site&apos;s codebase is
            open source; see the{' '}
            <a
              href="https://github.com/karanarora-aideveloper/stack-ai-tools"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent-primary)', fontWeight: 600 }}
            >
              repository
            </a>{' '}
            for its license terms.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 10 }}>8. Changes to the Service</h2>
          <p>
            We may modify, suspend, or discontinue any part of the Site at any time without notice. We may also
            update these Terms from time to time; continued use of the Site after changes constitutes acceptance
            of the revised Terms.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 10 }}>9. Contact</h2>
          <p>
            Questions about these Terms can be sent through our{' '}
            <Link href="/submit" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>contact form</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
