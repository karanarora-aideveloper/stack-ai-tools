import type { Metadata } from 'next';
import Link from 'next/link';
import ObsidianHeader from '@/app/components/ObsidianHeader';
import ObsidianFooter from '@/app/components/ObsidianFooter';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'Privacy Policy | Stack AI Tools' },
  description: 'How Stack AI Tools collects, uses, and protects your information.',
  alternates: { canonical: 'https://www.stackaitools.com/privacy' },
  robots: { index: true, follow: true }
};

export default function PrivacyPage() {
  return (
    <div data-redesign-page="true" className="min-h-screen bg-[#040406] text-[#e3e1ec] antialiased selection:bg-[#8b5cf6] selection:text-white relative flex flex-col justify-between">
      <div className="obsidian-glow-mesh fixed inset-x-0 top-0 h-[700px] pointer-events-none -z-10" />
      <ObsidianHeader />
      
      <main className="flex-1 max-w-4xl mx-auto px-4 md:px-8 py-12 w-full">
        {/* Breadcrumb Navigation */}
        <nav className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900/70 border border-white/10 text-xs text-zinc-400 font-mono mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={12} className="text-zinc-600" />
          <span className="text-violet-400 font-medium">Privacy Policy</span>
        </nav>

        <div className="obsidian-card rounded-3xl p-6 sm:p-10 border border-white/10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3 font-['Geist',sans-serif]">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-zinc-500 mb-8 pb-6 border-b border-white/[0.08]">
            Last updated: September 29, 2026
          </p>

          <div className="space-y-8 text-sm sm:text-base leading-relaxed text-zinc-300 font-light">
            <section>
              <h2 className="text-lg font-semibold text-white mb-2 font-['Geist',sans-serif]">1. Overview</h2>
              <p>
                Stack AI Tools (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates stackaitools.com, an independent directory of AI
                software, autonomous agents, and prompt templates. This policy explains what information we collect
                when you use the site, how we use it, and the choices available to you.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2 font-['Geist',sans-serif]">2. Information We Collect</h2>
              <p className="mb-2">
                <strong className="text-white font-medium">Information you provide directly:</strong> your email
                address if you subscribe to our newsletter, and any details you submit through the tool submission
                form (tool name, description, contact information for the tool being submitted).
              </p>
              <p>
                <strong className="text-white font-medium">Information collected automatically:</strong> standard
                analytics data such as pages visited, referring URL, device/browser type, and approximate location
                (derived from IP address), collected via Google Analytics, PostHog, and our own first-party event
                store. We do not collect payment information, government IDs, or other sensitive personal data.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2 font-['Geist',sans-serif]">3. How We Use Information</h2>
              <ul className="list-disc pl-5 space-y-1.5 text-zinc-300">
                <li>To operate, maintain, and improve the directory and its search/recommendation features.</li>
                <li>To send the newsletter you opted into, and to let you unsubscribe at any time.</li>
                <li>To review and respond to tool submissions.</li>
                <li>To understand aggregate traffic patterns and improve site performance and content.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2 font-['Geist',sans-serif]">4. Cookies &amp; Analytics</h2>
              <p>
                We use cookies and similar technologies from Google Analytics and PostHog to
                understand how the site is used. You can disable cookies in your browser settings; the site will
                continue to function, though some preferences may not persist across visits.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2 font-['Geist',sans-serif]">5. Affiliate Links</h2>
              <p>
                Stack AI Tools is reader-supported. Some outbound links to third-party AI tools are affiliate links —
                we may earn a commission if you sign up or purchase through them, at no additional cost to you. This
                never affects which tools we list or how they are described; see our{' '}
                <Link href="/about" className="text-violet-400 hover:text-violet-300 underline font-medium">editorial standards</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2 font-['Geist',sans-serif]">6. Third-Party Links</h2>
              <p>
                Our directory links to third-party AI tools and services. We are not responsible for the privacy
                practices of those sites. Review their own privacy policies before providing them any information.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2 font-['Geist',sans-serif]">7. Data Retention &amp; Your Choices</h2>
              <p>
                We retain newsletter subscriber emails until you unsubscribe (a one-click link is included in every
                email). You may request deletion of any personal data we hold about you by submitting a request
                through our <Link href="/submit" className="text-violet-400 hover:text-violet-300 underline font-medium">submission portal</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2 font-['Geist',sans-serif]">8. Children&apos;s Privacy</h2>
              <p>
                Stack AI Tools is not directed at children under 13, and we do not knowingly collect personal
                information from them.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2 font-['Geist',sans-serif]">9. Changes to This Policy</h2>
              <p>
                We may update this policy from time to time. Material changes will be reflected by updating the
                &quot;Last updated&quot; date above.
              </p>
            </section>
          </div>
        </div>
      </main>

      <ObsidianFooter />
    </div>
  );
}
