import type { Metadata } from 'next';
import Link from 'next/link';
import ObsidianHeader from '@/app/components/ObsidianHeader';
import ObsidianFooter from '@/app/components/ObsidianFooter';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'Terms of Service | Stack AI Tools' },
  description: 'The terms that govern your use of Stack AI Tools (stackaitools.com).',
  alternates: { canonical: 'https://www.stackaitools.com/terms' },
  robots: { index: true, follow: true }
};

export default function TermsPage() {
  return (
    <div data-redesign-page="true" className="min-h-screen bg-[#040406] text-[#e3e1ec] antialiased selection:bg-[#8b5cf6] selection:text-white relative flex flex-col justify-between">
      <div className="obsidian-glow-mesh fixed inset-x-0 top-0 h-[700px] pointer-events-none -z-10" />
      <ObsidianHeader />

      <main className="flex-1 max-w-4xl mx-auto px-4 md:px-8 py-12 w-full">
        {/* Breadcrumb Navigation */}
        <nav className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900/70 border border-white/10 text-xs text-zinc-400 font-mono mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={12} className="text-zinc-600" />
          <span className="text-violet-400 font-medium">Terms of Service</span>
        </nav>

        <div className="obsidian-card rounded-3xl p-6 sm:p-10 border border-white/10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3 font-['Geist',sans-serif]">
            Terms of Service
          </h1>
          <p className="text-xs font-mono text-zinc-500 mb-8 pb-6 border-b border-white/[0.08]">
            Last updated: September 29, 2026
          </p>

          <div className="space-y-8 text-sm sm:text-base leading-relaxed text-zinc-300 font-light">
            <section>
              <h2 className="text-lg font-semibold text-white mb-2 font-['Geist',sans-serif]">1. Acceptance of Terms</h2>
              <p>
                By accessing or using stackaitools.com (the &quot;Site&quot;), you agree to be bound by these Terms of
                Service. If you do not agree, please do not use the Site.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2 font-['Geist',sans-serif]">2. What We Provide</h2>
              <p>
                Stack AI Tools is an independent directory of third-party AI software, autonomous agents, and prompt
                templates. Listings, ratings, and pricing information are compiled from public sources and our own
                testing, and are provided for informational purposes only. We do not develop, own, or control the
                tools listed on the Site.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2 font-['Geist',sans-serif]">3. No Warranty</h2>
              <p>
                The Site and its content are provided &quot;as is&quot; without warranties of any kind. While we make a
                reasonable effort to keep pricing, ratings, and descriptions current, third-party tools change without
                notice, and we cannot guarantee the accuracy, completeness, or availability of any listing at any
                given time. You should verify pricing and capabilities directly with the tool provider before making a
                purchasing decision.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2 font-['Geist',sans-serif]">4. Affiliate Relationships</h2>
              <p>
                Some outbound links on the Site are affiliate links, meaning we may earn a commission if you sign up
                for or purchase a tool through them, at no additional cost to you. This is disclosed on relevant
                pages and never influences which tools are listed or how they are rated.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2 font-['Geist',sans-serif]">5. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Stack AI Tools shall not be liable for any indirect,
                incidental, or consequential damages arising from your use of the Site or any third-party tool
                discovered through it, including losses related to purchasing decisions made based on Site content.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2 font-['Geist',sans-serif]">6. Tool Submissions</h2>
              <p>
                If you submit a tool for listing, you confirm that you have the right to share the information
                provided and that it is accurate to the best of your knowledge. We reserve the right to accept,
                reject, edit, or remove any listing at our discretion, including for accuracy, quality, or policy
                reasons.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2 font-['Geist',sans-serif]">7. Intellectual Property</h2>
              <p>
                The Site&apos;s design, original written content, and compilation of listings are owned by Stack AI
                Tools. Trademarks, logos, and product names belonging to third-party tools remain the property of
                their respective owners and are used for identification purposes only. The site&apos;s codebase is
                open source; see the{' '}
                <a
                  href="https://github.com/karanarora-aideveloper/stack-ai-tools"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-400 hover:text-violet-300 underline font-medium"
                >
                  repository
                </a>{' '}
                for its license terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2 font-['Geist',sans-serif]">8. Changes to the Service</h2>
              <p>
                We may modify, suspend, or discontinue any part of the Site at any time without notice. We may also
                update these Terms from time to time; continued use of the Site after changes constitutes acceptance
                of the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2 font-['Geist',sans-serif]">9. Contact</h2>
              <p>
                Questions about these Terms can be sent through our{' '}
                <Link href="/submit" className="text-violet-400 hover:text-violet-300 underline font-medium">contact form</Link>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <ObsidianFooter />
    </div>
  );
}
