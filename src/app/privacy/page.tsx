import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: { absolute: 'Privacy Policy | Stack AI Tools' },
  description: 'How Stack AI Tools collects, uses, and protects your information.',
  alternates: { canonical: 'https://stackaitools.com/privacy' },
  robots: { index: true, follow: true }
};

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: 780, margin: '0 auto', padding: '40px 20px 80px' }}>
      <div className="breadcrumbs" style={{ marginBottom: 28 }}>
        <Link href="/" className="crumb-link">Home</Link>
        <span className="crumb-sep">/</span>
        <span className="crumb-current">Privacy Policy</span>
      </div>

      <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: 'var(--text-strong)', letterSpacing: '-0.02em', margin: '0 0 8px' }}>
        Privacy Policy
      </h1>
      <p style={{ fontSize: 13.5, color: 'var(--text-muted)', margin: '0 0 36px' }}>
        Last updated: September 2, 2026
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, fontSize: 14.5, lineHeight: 1.75, color: 'var(--text-secondary)' }}>
        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 10 }}>1. Overview</h2>
          <p>
            Stack AI Tools (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates stackaitools.com, an independent directory of AI
            software, autonomous agents, and prompt templates. This policy explains what information we collect
            when you use the site, how we use it, and the choices available to you.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 10 }}>2. Information We Collect</h2>
          <p style={{ marginBottom: 10 }}>
            <strong style={{ color: 'var(--text-strong)' }}>Information you provide directly:</strong> your email
            address if you subscribe to our newsletter, and any details you submit through the tool submission
            form (tool name, description, contact information for the tool being submitted).
          </p>
          <p>
            <strong style={{ color: 'var(--text-strong)' }}>Information collected automatically:</strong> standard
            analytics data such as pages visited, referring URL, device/browser type, and approximate location
            (derived from IP address), collected via Google Analytics, PostHog, and our own first-party event
            store. We do not collect payment information, government IDs, or other sensitive personal data.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 10 }}>3. How We Use Information</h2>
          <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li>To operate, maintain, and improve the directory and its search/recommendation features.</li>
            <li>To send the newsletter you opted into, and to let you unsubscribe at any time.</li>
            <li>To review and respond to tool submissions.</li>
            <li>To understand aggregate traffic patterns and improve site performance and content.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 10 }}>4. Cookies & Analytics</h2>
          <p>
            We use cookies and similar technologies from Google Analytics, PostHog, and Vercel Analytics to
            understand how the site is used. You can disable cookies in your browser settings; the site will
            continue to function, though some preferences may not persist across visits.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 10 }}>5. Affiliate Links</h2>
          <p>
            Stack AI Tools is reader-supported. Some outbound links to third-party AI tools are affiliate links —
            we may earn a commission if you sign up or purchase through them, at no additional cost to you. This
            never affects which tools we list or how they are described; see our{' '}
            <Link href="/about" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>editorial standards</Link>.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 10 }}>6. Third-Party Links</h2>
          <p>
            Our directory links to third-party AI tools and services. We are not responsible for the privacy
            practices of those sites. Review their own privacy policies before providing them any information.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 10 }}>7. Data Retention & Your Choices</h2>
          <p>
            We retain newsletter subscriber emails until you unsubscribe (a one-click link is included in every
            email). You may request deletion of any personal data we hold about you by submitting a request
            through our <Link href="/submit" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>contact form</Link>.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 10 }}>8. Children&apos;s Privacy</h2>
          <p>
            Stack AI Tools is not directed at children under 13, and we do not knowingly collect personal
            information from them.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 10 }}>9. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. Material changes will be reflected by updating the
            &quot;Last updated&quot; date above.
          </p>
        </section>
      </div>
    </div>
  );
}
