'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';

interface NewsletterCaptureProps {
  source?: string;
  headline?: string;
  subheadline?: string;
  compact?: boolean;
}

export default function NewsletterCapture({
  source = 'homepage_hero',
  headline = 'Join the Frontier AI Dispatch',
  subheadline = 'Get our weekly vetted intelligence briefing: top 5 newly benchmarked AI tools, 1 production prompt, and exclusive SaaS discounts.',
  compact = false
}: NewsletterCaptureProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source })
      });

      const data = await res.json();
      if (data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Subscription failed. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div 
        className="newsletter-card"
        style={{
          padding: compact ? '20px 24px' : '32px 36px',
          borderRadius: 16,
          background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.1) 0%, rgba(255, 255, 255, 0.7) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          textAlign: 'center',
          boxShadow: '0 12px 30px rgba(16, 185, 129, 0.1)'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--color-success)', marginBottom: 12 }}>
          <CheckCircle2 size={26} />
        </div>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 6 }}>
          You&apos;re On the VIP List!
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, maxWidth: 440, margin: '0 auto' }}>
          Welcome aboard. Look out for the next edition of <strong>The Frontier AI Dispatch</strong> every Tuesday at 9 AM EST.
        </p>
      </div>
    );
  }

  return (
    <div 
      className="newsletter-card"
      style={{
        padding: compact ? '20px 24px' : '32px 36px',
        borderRadius: 16,
        background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.08) 0%, rgba(255, 255, 255, 0.65) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.25)',
        boxShadow: '0 16px 40px rgba(15, 23, 42, 0.08)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent-secondary)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
          <Sparkles size={14} />
          <span>Weekly Intelligence Briefing</span>
        </div>

        <h3 style={{ fontSize: compact ? 18 : 24, fontWeight: 800, color: 'var(--text-strong)', marginBottom: 8, letterSpacing: '-0.02em' }}>
          {headline}
        </h3>

        <p style={{ color: 'var(--text-secondary)', fontSize: compact ? 13 : 14.5, lineHeight: 1.6, maxWidth: 580, marginBottom: 20 }}>
          {subheadline}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, maxWidth: 480, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 240 }}>
            <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="email"
              placeholder="Enter your work email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
              style={{
                width: '100%',
                padding: '12px 16px 12px 42px',
                borderRadius: 10,
                background: 'var(--bg-glass)',
                border: '1px solid rgba(var(--ink-tint-rgb), 0.14)',
                color: 'var(--text-strong)',
                fontSize: 14,
                outline: 'none',
                boxShadow: 'inset 0 1px 3px rgba(15, 23, 42, 0.06)'
              }}
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              padding: '12px 22px',
              borderRadius: 10,
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            <span>{status === 'loading' ? 'Joining...' : 'Subscribe Free'}</span>
            <ArrowRight size={15} />
          </button>
        </form>

        {errorMsg && (
          <p style={{ color: 'var(--color-error)', fontSize: 13, marginTop: 8 }}>
            {errorMsg}
          </p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 14, color: 'var(--text-muted)', fontSize: 12 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <ShieldCheck size={13} color="#10b981" />
            <span>Zero spam. No selling data.</span>
          </span>
          <span>•</span>
          <span>Unsubscribe anytime in 1 click</span>
        </div>
      </div>
    </div>
  );
}
