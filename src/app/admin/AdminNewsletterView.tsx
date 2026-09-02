'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { 
  Mail, 
  Send, 
  Sparkles, 
  Users, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Trash2, 
  Search, 
  ShieldCheck, 
  Info, 
  Clock, 
  Server, 
  Layers, 
  AlertCircle,
  Eye,
  FileText
} from 'lucide-react';
import { 
  getNewsletterDataAction, 
  sendBroadcastCampaignAction, 
  toggleSubscriberStatusAction, 
  deleteSubscriberAction,
  NewsletterDashboardPayload 
} from '@/app/actions/newsletter';

interface AdminNewsletterViewProps {
  passkey: string;
}

const TEMPLATES = {
  frontier_dispatch: {
    name: 'Weekly Frontier AI Dispatch',
    subject: '🔥 The Frontier AI Dispatch #1: Top 5 Autononous SWE Tools & Production Prompts',
    previewText: 'This week: Devin vs Claude Code benchmarks, Cursor Composer tips, and new prompt pack.',
    html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
  <div style="background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); padding: 32px 24px; text-align: center;">
    <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.02em;">Stack AI Tools Dispatch</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">The Authoritative Weekly Frontier Software Intelligence</p>
  </div>
  <div style="padding: 28px 24px;">
    <p style="font-size: 16px; line-height: 1.6; color: #cbd5e1;">Hey Founder,</p>
    <p style="font-size: 15px; line-height: 1.6; color: #cbd5e1;">Here is your weekly vetted breakdown of the fastest-moving AI developer tools, video generators, and production prompts benchmarked by Karan Arora and the Stack AI Tools editorial team.</p>
    
    <div style="margin: 24px 0; padding: 20px; background: rgba(255,255,255,0.04); border-radius: 10px; border-left: 4px solid #6366f1;">
      <h3 style="margin: 0 0 8px 0; color: #818cf8; font-size: 17px;">1. Cursor 3.0 Composer Multi-File Deep Dive</h3>
      <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #94a3b8;">Tested across a 40,000-line Next.js monorepo. Composer cut dependency migration time by 74% compared to standard Copilot autocomplete.</p>
    </div>

    <div style="margin: 24px 0; padding: 20px; background: rgba(255,255,255,0.04); border-radius: 10px; border-left: 4px solid #10b981;">
      <h3 style="margin: 0 0 8px 0; color: #34d399; font-size: 17px;">2. Claude Code Terminal Agent Review</h3>
      <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #94a3b8;">Anthropic's CLI engineer understands your local git state and test suites directly from terminal commands.</p>
    </div>

    <div style="text-align: center; margin: 32px 0;">
      <a href="https://stackaitools.com" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 15px;">Explore All 200+ Vetted Tools →</a>
    </div>

    <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 28px 0;" />
    <p style="font-size: 12px; color: #64748b; text-align: center; margin: 0;">You received this because you subscribed to Stack AI Tools (stackaitools.com).<br />Built & Curated by Karan Arora • Zero spam guarantee.</p>
  </div>
</div>`
  },
  new_tool_alert: {
    name: 'New Frontier Tool Launch Alert',
    subject: '⚡ New Tool Vetted: Claude 3.7 Sonnet + Hybrid Reasoning is Live',
    previewText: 'Read our verified benchmark on latency, SWE-bench performance, and pricing.',
    html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; border-radius: 12px; padding: 28px; border: 1px solid rgba(255,255,255,0.1);">
  <h2 style="color: #6366f1; margin-top: 0;">⚡ Frontier Release Benchmark</h2>
  <p style="font-size: 15px; line-height: 1.6; color: #cbd5e1;">A major new foundation model has been audited and added to the Stack AI Tools directory with genuine Zapier review notes.</p>
  <div style="margin: 20px 0; padding: 18px; background: rgba(99,102,241,0.1); border-radius: 8px; border: 1px solid rgba(99,102,241,0.2);">
    <strong style="color: #fff;">Verified Verdict:</strong>
    <p style="color: #cbd5e1; font-size: 14px; margin: 6px 0 0 0;">Hybrid reasoning dynamically allocates thinking tokens for complex logic, while answering standard queries instantly.</p>
  </div>
  <a href="https://stackaitools.com/tool/claude" style="display: inline-block; background: #6366f1; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600;">Read In-depth Review →</a>
</div>`
  }
};

export default function AdminNewsletterView({ passkey }: AdminNewsletterViewProps) {
  const [data, setData] = useState<NewsletterDashboardPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [statusMsg, setStatusMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Composer State
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<'frontier_dispatch' | 'new_tool_alert'>('frontier_dispatch');
  const [subject, setSubject] = useState(TEMPLATES.frontier_dispatch.subject);
  const [previewText, setPreviewText] = useState(TEMPLATES.frontier_dispatch.previewText);
  const [htmlContent, setHtmlContent] = useState(TEMPLATES.frontier_dispatch.html);
  const [testEmail, setTestEmail] = useState('karan@stackaitools.com');
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Subscriber table search
  const [subSearch, setSubSearch] = useState('');
  const [subStatusFilter, setSubStatusFilter] = useState<'all' | 'active' | 'unsubscribed'>('all');

  const loadData = async () => {
    setLoading(true);
    setErrorMsg('');
    const res = await getNewsletterDataAction(passkey);
    if (res.success && res.data) {
      setData(res.data);
    } else {
      setErrorMsg(res.error || 'Failed to load newsletter data');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [passkey]);

  const handleTemplateChange = (key: 'frontier_dispatch' | 'new_tool_alert') => {
    setSelectedTemplateKey(key);
    setSubject(TEMPLATES[key].subject);
    setPreviewText(TEMPLATES[key].previewText);
    setHtmlContent(TEMPLATES[key].html);
  };

  const handleSendTest = () => {
    if (!testEmail) {
      setErrorMsg('Please enter a test email address');
      return;
    }
    setStatusMsg('Dispatching test preview...');
    setErrorMsg('');

    startTransition(async () => {
      const res = await sendBroadcastCampaignAction(passkey, {
        subject,
        previewText,
        html: htmlContent,
        isTest: true,
        testEmail
      });

      if (res.success) {
        setStatusMsg(`✅ ${res.message}`);
        loadData();
      } else {
        setErrorMsg(res.error || 'Failed to send test email');
      }
    });
  };

  const handleSendBroadcast = () => {
    const activeCount = data?.stats.activeSubscribers || 0;
    if (activeCount === 0) {
      setErrorMsg('Cannot broadcast: 0 active subscribers in database.');
      return;
    }

    if (!confirm(`Are you sure you want to broadcast this campaign to all ${activeCount} active subscribers?`)) {
      return;
    }

    setStatusMsg(`Broadcasting to ${activeCount} subscribers via cascading free providers...`);
    setErrorMsg('');

    startTransition(async () => {
      const res = await sendBroadcastCampaignAction(passkey, {
        subject,
        previewText,
        html: htmlContent,
        isTest: false
      });

      if (res.success) {
        setStatusMsg(`🎉 ${res.message}`);
        loadData();
      } else {
        setErrorMsg(res.error || 'Failed to dispatch broadcast');
      }
    });
  };

  const handleToggleSubscriber = async (id: string) => {
    startTransition(async () => {
      const res = await toggleSubscriberStatusAction(passkey, id);
      if (res.success) {
        loadData();
      } else {
        setErrorMsg(res.error || 'Failed to update subscriber');
      }
    });
  };

  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm('Permanently delete this subscriber?')) return;
    startTransition(async () => {
      const res = await deleteSubscriberAction(passkey, id);
      if (res.success) {
        loadData();
      } else {
        setErrorMsg(res.error || 'Failed to delete subscriber');
      }
    });
  };

  const filteredSubscribers = (data?.subscribers || []).filter(sub => {
    if (subStatusFilter !== 'all' && sub.status !== subStatusFilter) return false;
    if (subSearch && !sub.email.toLowerCase().includes(subSearch.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="admin-newsletter-view" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* 1. Header & Metrics Grid */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Mail size={22} color="#6366f1" />
            Email Dispatch & Subscriber Hub
          </h2>
          <p style={{ color: '#64748b', fontSize: 13, margin: '4px 0 0 0' }}>
            Multi-provider cascading broadcast engine. Send free newsletters to thousands using pooled provider limits.
          </p>
        </div>

        <button 
          onClick={loadData}
          disabled={loading || isPending}
          className="admin-btn-light"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          <span>Refresh Data</span>
        </button>
      </div>

      {statusMsg && (
        <div style={{ padding: '12px 18px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 8, color: '#059669', fontSize: 13, fontWeight: 600 }}>
          {statusMsg}
        </div>
      )}

      {errorMsg && (
        <div style={{ padding: '12px 18px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 8, color: '#dc2626', fontSize: 13, fontWeight: 600 }}>
          {errorMsg}
        </div>
      )}

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        <div className="admin-stat-card-light">
          <div className="stat-title-light">Total Subscribers</div>
          <div className="stat-val-light">{data?.stats.totalSubscribers || 0}</div>
          <div className="stat-sub-light" style={{ color: '#6366f1' }}>Registered in MongoDB</div>
        </div>

        <div className="admin-stat-card-light">
          <div className="stat-title-light">Active Recipients</div>
          <div className="stat-val-light" style={{ color: '#10b981' }}>{data?.stats.activeSubscribers || 0}</div>
          <div className="stat-sub-light">Ready for broadcast</div>
        </div>

        <div className="admin-stat-card-light">
          <div className="stat-title-light">Unsubscribed</div>
          <div className="stat-val-light" style={{ color: '#94a3b8' }}>{data?.stats.unsubscribedCount || 0}</div>
          <div className="stat-sub-light">Opted out</div>
        </div>

        <div className="admin-stat-card-light">
          <div className="stat-title-light">Total Delivered</div>
          <div className="stat-val-light" style={{ color: '#a855f7' }}>{data?.stats.totalEmailsSent || 0}</div>
          <div className="stat-sub-light">Lifetime emails</div>
        </div>

        <div className="admin-stat-card-light">
          <div className="stat-title-light">Pooled Free Capacity</div>
          <div className="stat-val-light" style={{ color: '#06b6d4' }}>21,000+</div>
          <div className="stat-sub-light">Free emails / month</div>
        </div>
      </div>

      {/* 2. Cascading Free Providers Pool */}
      <div className="admin-table-card-light" style={{ padding: 20 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Server size={18} color="#6366f1" />
          Configured Free Dispatch Providers (Automatic Cascading Failover)
        </h3>
        <p style={{ color: '#64748b', fontSize: 13, marginBottom: 16 }}>
          When you click Broadcast, the engine routes emails through the provider chain. If Provider 1 exhausts its daily free limit, the system auto-cascades to Provider 2 without interruption.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
          {data?.providers.map((p, idx) => (
            <div 
              key={p.id}
              style={{
                padding: '14px 16px',
                borderRadius: 10,
                border: '1px solid #e2e8f0',
                background: p.isConfigured ? '#f8fafc' : '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                gap: 6
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>
                  {idx + 1}. {p.name}
                </span>
                <span style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: 12,
                  background: p.isConfigured ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                  color: p.isConfigured ? '#059669' : '#d97706'
                }}>
                  {p.isConfigured ? 'Active / Configured' : 'Available (Set Key)'}
                </span>
              </div>
              <div style={{ fontSize: 12, color: '#6366f1', fontWeight: 600 }}>
                {p.freeDailyLimit.toLocaleString()} free/day • {p.freeMonthlyLimit.toLocaleString()}/mo
              </div>
              <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>
                {p.notes}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Campaign Composer Console */}
      <div className="admin-table-card-light" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={18} color="#a855f7" />
              Broadcast Campaign Composer
            </h3>
            <p style={{ color: '#64748b', fontSize: 13, margin: '4px 0 0 0' }}>
              Draft your weekly frontier dispatch, choose pre-tested templates, and broadcast to all active subscribers.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button 
              type="button"
              className={`admin-btn-light ${selectedTemplateKey === 'frontier_dispatch' ? 'active' : ''}`}
              onClick={() => handleTemplateChange('frontier_dispatch')}
              style={{ fontSize: 12 }}
            >
              Template 1: Frontier Dispatch
            </button>
            <button 
              type="button"
              className={`admin-btn-light ${selectedTemplateKey === 'new_tool_alert' ? 'active' : ''}`}
              onClick={() => handleTemplateChange('new_tool_alert')}
              style={{ fontSize: 12 }}
            >
              Template 2: New Tool Alert
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
              Subject Line
            </label>
            <input 
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid #cbd5e1',
                fontSize: 14,
                color: '#0f172a',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
              Preview Text (Inbox Snippet)
            </label>
            <input 
              type="text"
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid #cbd5e1',
                fontSize: 14,
                color: '#0f172a',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>
                HTML & Responsive Email Template
              </label>
              <button 
                type="button"
                onClick={() => setShowPreviewModal(!showPreviewModal)}
                className="admin-btn-light"
                style={{ fontSize: 12, padding: '4px 10px', display: 'inline-flex', alignItems: 'center', gap: 4 }}
              >
                <Eye size={13} />
                <span>{showPreviewModal ? 'Hide Visual Preview' : 'Show Visual Preview'}</span>
              </button>
            </div>

            {showPreviewModal ? (
              <div 
                style={{
                  padding: 16,
                  background: '#1e293b',
                  borderRadius: 8,
                  border: '1px solid #334155',
                  maxHeight: 480,
                  overflowY: 'auto'
                }}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            ) : (
              <textarea 
                rows={10}
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 8,
                  border: '1px solid #cbd5e1',
                  fontSize: 13,
                  fontFamily: 'monospace',
                  color: '#0f172a',
                  outline: 'none',
                  background: '#f8fafc'
                }}
              />
            )}
          </div>

          {/* Dispatch Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, paddingTop: 12, borderTop: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <input 
                type="email"
                placeholder="Test email address..."
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                style={{
                  padding: '9px 12px',
                  borderRadius: 8,
                  border: '1px solid #cbd5e1',
                  fontSize: 13,
                  width: 240
                }}
              />
              <button 
                type="button"
                disabled={isPending}
                onClick={handleSendTest}
                className="admin-btn-light"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <Mail size={14} />
                <span>Send Test Preview</span>
              </button>
            </div>

            <button 
              type="button"
              disabled={isPending || (data?.stats.activeSubscribers || 0) === 0}
              onClick={handleSendBroadcast}
              style={{
                padding: '11px 24px',
                borderRadius: 8,
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)'
              }}
            >
              <Send size={15} />
              <span>Broadcast to All {data?.stats.activeSubscribers || 0} Subscribers</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Subscribers Ledger Table */}
      <div className="admin-table-card-light">
        <div style={{ padding: '18px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Users size={16} color="#6366f1" />
              Subscriber Database ({filteredSubscribers.length} showing)
            </h3>
            <span style={{ fontSize: 12, color: '#64748b' }}>
              Real-time records captured from website modals, footer, and tool pages.
            </span>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {/* Status Filter */}
            <select 
              value={subStatusFilter} 
              onChange={(e) => setSubStatusFilter(e.target.value as any)}
              style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 13 }}
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="unsubscribed">Unsubscribed</option>
            </select>

            {/* Email Search */}
            <div style={{ position: 'relative', minWidth: 200 }}>
              <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="text"
                placeholder="Search email..."
                value={subSearch}
                onChange={(e) => setSubSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '6px 10px 6px 30px',
                  borderRadius: 6,
                  border: '1px solid #cbd5e1',
                  fontSize: 13
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table-light">
            <thead>
              <tr>
                <th>Subscriber Email</th>
                <th>Status</th>
                <th>Source</th>
                <th>Last Sent</th>
                <th>Module Used</th>
                <th>Emails Sent</th>
                <th>Joined</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '36px 20px', color: '#64748b' }}>
                    No subscribers found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((sub) => (
                  <tr key={sub.id}>
                    <td>
                      <strong style={{ color: '#0f172a' }}>{sub.email}</strong>
                    </td>
                    <td>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: 11,
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: 10,
                        background: sub.status === 'active' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(148, 163, 184, 0.15)',
                        color: sub.status === 'active' ? '#059669' : '#64748b'
                      }}>
                        {sub.status === 'active' ? <CheckCircle2 size={11} /> : <XCircle size={11} />}
                        {sub.status.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ fontSize: 12, color: '#64748b' }}>
                      {sub.source || 'website'}
                    </td>
                    <td style={{ fontSize: 12, color: '#475569' }}>
                      {sub.lastSentAt ? new Date(sub.lastSentAt).toLocaleDateString() : 'Never'}
                    </td>
                    <td>
                      <span style={{ fontSize: 11, padding: '2px 6px', borderRadius: 4, background: '#f1f5f9', color: '#334155', fontWeight: 600 }}>
                        {sub.lastProviderUsed || 'Pending'}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600, color: '#0f172a' }}>
                      {sub.emailsSentCount}
                    </td>
                    <td style={{ fontSize: 12, color: '#64748b' }}>
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: 6 }}>
                        <button 
                          onClick={() => handleToggleSubscriber(sub.id)}
                          title={sub.status === 'active' ? 'Mark Unsubscribed' : 'Reactivate'}
                          style={{
                            padding: '4px 8px',
                            borderRadius: 6,
                            border: '1px solid #e2e8f0',
                            background: '#ffffff',
                            fontSize: 11,
                            cursor: 'pointer',
                            color: sub.status === 'active' ? '#d97706' : '#059669'
                          }}
                        >
                          {sub.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button 
                          onClick={() => handleDeleteSubscriber(sub.id)}
                          title="Delete Subscriber"
                          style={{
                            padding: '4px 8px',
                            borderRadius: 6,
                            border: '1px solid #fecaca',
                            background: '#fff1f2',
                            fontSize: 11,
                            cursor: 'pointer',
                            color: '#e11d48'
                          }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Campaign History & Dispatch Logs */}
      <div className="admin-table-card-light" style={{ padding: 20 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Clock size={16} color="#6366f1" />
          Recent Broadcast Campaigns & Delivery History
        </h3>

        {(data?.campaigns || []).length === 0 ? (
          <p style={{ color: '#64748b', fontSize: 13, margin: '8px 0 0 0' }}>
            No broadcast campaigns sent yet. Send your first broadcast above!
          </p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table-light">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Sent Date</th>
                  <th>Status</th>
                  <th>Recipients</th>
                  <th>Success</th>
                  <th>Failed</th>
                  <th>Providers Used</th>
                </tr>
              </thead>
              <tbody>
                {data?.campaigns.map((camp) => (
                  <tr key={camp.id}>
                    <td><strong>{camp.subject}</strong></td>
                    <td style={{ fontSize: 12, color: '#64748b' }}>
                      {camp.sentAt ? new Date(camp.sentAt).toLocaleString() : 'In Progress'}
                    </td>
                    <td>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 10, background: 'rgba(16, 185, 129, 0.1)', color: '#059669' }}>
                        {camp.status.toUpperCase()}
                      </span>
                    </td>
                    <td>{camp.totalRecipients}</td>
                    <td style={{ color: '#059669', fontWeight: 600 }}>{camp.successfulSent}</td>
                    <td style={{ color: camp.failedCount > 0 ? '#e11d48' : '#94a3b8' }}>{camp.failedCount}</td>
                    <td>
                      <span style={{ fontSize: 11, padding: '2px 6px', borderRadius: 4, background: '#f1f5f9', color: '#334155', fontWeight: 600 }}>
                        {camp.providersUsed.join(', ') || 'dispatcher'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
