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
  Server, 
  Clock, 
  AlertCircle,
  Eye,
  Plus,
  Key,
  ExternalLink,
  Zap,
  Lock,
  Check,
  Activity
} from 'lucide-react';
import { 
  getNewsletterDataAction, 
  sendBroadcastCampaignAction, 
  toggleSubscriberStatusAction, 
  deleteSubscriberAction,
  addSubscriberAction,
  saveProviderKeyAction,
  saveSmtpConfigAction,
  testProviderConnectionAction,
  NewsletterDashboardPayload 
} from '@/app/actions/newsletter';

interface AdminNewsletterViewProps {
  passkey: string;
}

const TEMPLATES = {
  frontier_dispatch: {
    name: 'Weekly Frontier AI Dispatch',
    subject: '🔥 The Frontier AI Dispatch #1: Top 5 Autonomous SWE Tools & Production Prompts',
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
    <p style="font-size: 12px; color: #64748b; text-align: center; margin: 0;">You received this because you subscribed to Stack AI Tools (stackaitools.com).<br />Curated by Karan Arora • Zero spam guarantee.</p>
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

  // Modals & Panels
  const [showAddSubModal, setShowAddSubModal] = useState(false);
  const [newSubEmail, setNewSubEmail] = useState('');
  const [newSubSource, setNewSubSource] = useState('admin_manual');

  // Key Configuration inputs
  const [brevoKeyInput, setBrevoKeyInput] = useState('');
  const [resendKeyInput, setResendKeyInput] = useState('');
  const [mailersendKeyInput, setMailersendKeyInput] = useState('');
  const [savingKeyId, setSavingKeyId] = useState<string | null>(null);
  const [testingKeyId, setTestingKeyId] = useState<string | null>(null);
  const [testConnectionResults, setTestConnectionResults] = useState<Record<string, { success: boolean; msg: string }>>({});

  // SMTP Configuration state
  const [showSmtpDrawer, setShowSmtpDrawer] = useState(false);
  const [smtpHost, setSmtpHost] = useState('');
  const [smtpPort, setSmtpPort] = useState('587');
  const [smtpUser, setSmtpUser] = useState('');
  const [smtpPass, setSmtpPass] = useState('');
  const [smtpFrom, setSmtpFrom] = useState('karan@stackaitools.com');

  // Composer State
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<'frontier_dispatch' | 'new_tool_alert'>('frontier_dispatch');
  const [subject, setSubject] = useState(TEMPLATES.frontier_dispatch.subject);
  const [previewText, setPreviewText] = useState(TEMPLATES.frontier_dispatch.previewText);
  const [htmlContent, setHtmlContent] = useState(TEMPLATES.frontier_dispatch.html);
  const [testEmail, setTestEmail] = useState('arorakaran869@gmail.com');
  const [preferredProvider, setPreferredProvider] = useState<'auto' | 'brevo' | 'resend' | 'mailersend' | 'smtp' | 'simulation'>('auto');
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

  const activeProvidersCount = data?.stats.activeProvidersCount || 0;

  const handleTemplateChange = (key: 'frontier_dispatch' | 'new_tool_alert') => {
    setSelectedTemplateKey(key);
    setSubject(TEMPLATES[key].subject);
    setPreviewText(TEMPLATES[key].previewText);
    setHtmlContent(TEMPLATES[key].html);
  };

  const handleAddSubscriber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubEmail || !newSubEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    setStatusMsg('');
    setErrorMsg('');

    startTransition(async () => {
      const res = await addSubscriberAction(passkey, newSubEmail, newSubSource);
      if (res.success) {
        setStatusMsg(`✅ ${res.message}`);
        setNewSubEmail('');
        setShowAddSubModal(false);
        loadData();
      } else {
        setErrorMsg(res.error || 'Failed to add subscriber');
      }
    });
  };

  const handleSaveKey = async (keyEnvName: string, value: string) => {
    if (!value.trim()) {
      setErrorMsg(`Please enter a key value for ${keyEnvName}`);
      return;
    }
    setSavingKeyId(keyEnvName);
    setErrorMsg('');

    const res = await saveProviderKeyAction(passkey, keyEnvName, value);
    setSavingKeyId(null);
    if (res.success) {
      setStatusMsg(`✅ ${res.message}`);
      loadData();
    } else {
      setErrorMsg(res.error || `Failed to save ${keyEnvName}`);
    }
  };

  const handleSaveSmtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!smtpHost || !smtpUser || !smtpPass) {
      setErrorMsg('SMTP Host, Username and Password are required');
      return;
    }
    setSavingKeyId('smtp');
    setErrorMsg('');

    const res = await saveSmtpConfigAction(passkey, {
      host: smtpHost,
      port: smtpPort,
      user: smtpUser,
      pass: smtpPass,
      emailFrom: smtpFrom
    });
    setSavingKeyId(null);
    if (res.success) {
      setStatusMsg(`✅ ${res.message}`);
      setShowSmtpDrawer(false);
      loadData();
    } else {
      setErrorMsg(res.error || 'Failed to save SMTP settings');
    }
  };

  const handleTestConnection = async (providerId: string) => {
    setTestingKeyId(providerId);
    setErrorMsg('');
    setStatusMsg('');

    const res = await testProviderConnectionAction(passkey, providerId);
    setTestingKeyId(null);
    if (res.success) {
      setTestConnectionResults(prev => ({
        ...prev,
        [providerId]: { success: true, msg: res.message || 'Connection verified successfully!' }
      }));
      setStatusMsg(res.message || 'Connection verified successfully!');
      loadData();
    } else {
      setTestConnectionResults(prev => ({
        ...prev,
        [providerId]: { success: false, msg: res.error || 'Connection failed' }
      }));
      setErrorMsg(res.error || 'Connection failed');
    }
  };

  const handleSendTest = () => {
    if (!testEmail) {
      setErrorMsg('Please enter a test email address');
      return;
    }

    if (activeProvidersCount === 0 && preferredProvider !== 'simulation') {
      setErrorMsg('❌ Cannot send: No live email providers are activated! Connect Brevo, Resend, or SMTP below first.');
      return;
    }

    setStatusMsg(`Dispatching test preview to ${testEmail}...`);
    setErrorMsg('');

    startTransition(async () => {
      const res = await sendBroadcastCampaignAction(passkey, {
        subject,
        previewText,
        html: htmlContent,
        isTest: true,
        testEmail,
        preferredProvider
      });

      if (res.success) {
        setStatusMsg(res.message || 'Test email dispatched successfully!');
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

    if (activeProvidersCount === 0 && preferredProvider !== 'simulation') {
      setErrorMsg('❌ Cannot broadcast: No active email providers are connected! Please configure at least one free provider (Brevo, Resend, or SMTP) below.');
      return;
    }

    if (!confirm(`Are you sure you want to broadcast this campaign to all ${activeCount} active subscribers using module: ${preferredProvider.toUpperCase()}?`)) {
      return;
    }

    setStatusMsg(`Broadcasting to ${activeCount} subscribers...`);
    setErrorMsg('');

    startTransition(async () => {
      const res = await sendBroadcastCampaignAction(passkey, {
        subject,
        previewText,
        html: htmlContent,
        isTest: false,
        preferredProvider
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
      {/* 1. Header & Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Mail size={22} color="#6366f1" />
            Email Dispatch & Subscriber Hub
          </h2>
          <p style={{ color: '#64748b', fontSize: 13, margin: '4px 0 0 0' }}>
            Multi-provider broadcasting engine. Real external email delivery via free tiers of Brevo, Resend, or direct SMTP.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button 
            onClick={() => setShowAddSubModal(true)}
            className="admin-btn-light"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#6366f1', color: '#fff', border: 'none' }}
          >
            <Plus size={15} />
            <span>Add Subscriber</span>
          </button>

          <button 
            onClick={() => setShowSmtpDrawer(!showSmtpDrawer)}
            className="admin-btn-light"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <Server size={15} color="#059669" />
            <span>Configure SMTP Relay</span>
          </button>

          <button 
            onClick={loadData}
            disabled={loading || isPending}
            className="admin-btn-light"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Connection Alert Banner */}
      {activeProvidersCount === 0 ? (
        <div style={{
          padding: '16px 20px',
          background: '#fffbeb',
          border: '1px solid #fde68a',
          borderRadius: 10,
          color: '#92400e',
          fontSize: 13,
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}>
          <AlertCircle size={20} color="#d97706" style={{ flexShrink: 0 }} />
          <div>
            <strong>No Live Email Providers Connected Yet:</strong> Email sending is locked to prevent false dispatches.
            Connect your free Brevo API key (300 emails/day free) or enter your SMTP credentials in the section below to unlock live broadcasting!
          </div>
        </div>
      ) : (
        <div style={{
          padding: '12px 18px',
          background: '#ecfdf5',
          border: '1px solid #a7f3d0',
          borderRadius: 10,
          color: '#065f46',
          fontSize: 13,
          display: 'flex',
          alignItems: 'center',
          gap: 10
        }}>
          <CheckCircle2 size={18} color="#059669" />
          <span>
            <strong>{activeProvidersCount} Active Email Provider(s) Connected:</strong> Live broadcasting is unlocked across your connected free quotas.
          </span>
        </div>
      )}

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
          <div className="stat-title-light">Active Providers</div>
          <div className="stat-val-light" style={{ color: activeProvidersCount > 0 ? '#059669' : '#d97706' }}>
            {activeProvidersCount} / 4
          </div>
          <div className="stat-sub-light">{activeProvidersCount > 0 ? 'Ready to dispatch' : 'Setup needed below'}</div>
        </div>

        <div className="admin-stat-card-light">
          <div className="stat-title-light">Genuine Delivered</div>
          <div className="stat-val-light" style={{ color: '#a855f7' }}>{data?.stats.totalEmailsSent || 0}</div>
          <div className="stat-sub-light">Zero fake logs</div>
        </div>

        <div className="admin-stat-card-light">
          <div className="stat-title-light">Active Free Capacity</div>
          <div className="stat-val-light" style={{ color: '#06b6d4' }}>{data?.stats.freeCapacityPerMonth || 0}</div>
          <div className="stat-sub-light">Available emails/month</div>
        </div>
      </div>

      {/* 2. Provider Management & Live Key Configuration Panel */}
      <div className="admin-table-card-light" style={{ padding: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Server size={18} color="#6366f1" />
              Email Provider Modules & Live Verification
            </h3>
            <span style={{ fontSize: 12, color: '#64748b' }}>
              Add free API keys or SMTP. Click <strong>Test Connection</strong> to verify with the vendor servers before sending.
            </span>
          </div>

          <a 
            href="https://vercel.com/karanprojects1/stack-ai-tools/settings/environment-variables"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 12, color: '#6366f1', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}
          >
            <span>Open Vercel Environment Variables</span>
            <ExternalLink size={13} />
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18 }}>
          {/* A. Brevo */}
          <div style={{ padding: '18px 20px', borderRadius: 10, border: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: 15, color: '#0f172a' }}>1. Brevo (Sendinblue)</strong>
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 12,
                background: data?.providers.find(p => p.id === 'brevo')?.isConfigured ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.12)',
                color: data?.providers.find(p => p.id === 'brevo')?.isConfigured ? '#059669' : '#dc2626'
              }}>
                {data?.providers.find(p => p.id === 'brevo')?.isConfigured ? '🟢 Active & Ready' : '🔴 Not Configured'}
              </span>
            </div>
            <div style={{ fontSize: 12, color: '#6366f1', fontWeight: 600 }}>
              300 free emails/day • 9,000 free/mo • Zero cost forever
            </div>
            <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>
              1. Sign up on Brevo. 2. Go to SMTP & API &gt; Generate API Key.
            </p>
            <a 
              href="https://app.brevo.com/settings/keys/api" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ fontSize: 12, color: '#0284c7', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}
            >
              <span>Get Free Brevo Key (app.brevo.com)</span>
              <ExternalLink size={12} />
            </a>

            <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
              <input 
                type="password"
                placeholder="Paste BREVO_API_KEY..."
                value={brevoKeyInput}
                onChange={e => setBrevoKeyInput(e.target.value)}
                style={{ flex: 1, padding: '7px 10px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 12 }}
              />
              <button 
                onClick={() => handleSaveKey('BREVO_API_KEY', brevoKeyInput)}
                disabled={savingKeyId === 'BREVO_API_KEY'}
                style={{ padding: '7px 12px', borderRadius: 6, background: '#059669', color: '#fff', border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
              >
                {savingKeyId === 'BREVO_API_KEY' ? 'Saving...' : 'Save'}
              </button>
            </div>

            {data?.providers.find(p => p.id === 'brevo')?.isConfigured && (
              <button
                type="button"
                onClick={() => handleTestConnection('brevo')}
                disabled={testingKeyId === 'brevo'}
                style={{
                  padding: '6px 12px',
                  borderRadius: 6,
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6
                }}
              >
                <Activity size={13} className={testingKeyId === 'brevo' ? 'animate-spin' : ''} />
                <span>{testingKeyId === 'brevo' ? 'Testing Live Connection...' : 'Test Connection with Brevo'}</span>
              </button>
            )}

            {testConnectionResults['brevo'] && (
              <div style={{
                fontSize: 11,
                padding: '6px 10px',
                borderRadius: 6,
                background: testConnectionResults['brevo'].success ? '#ecfdf5' : '#fef2f2',
                color: testConnectionResults['brevo'].success ? '#065f46' : '#991b1b',
                fontWeight: 600
              }}>
                {testConnectionResults['brevo'].msg}
              </div>
            )}
          </div>

          {/* B. Resend */}
          <div style={{ padding: '18px 20px', borderRadius: 10, border: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: 15, color: '#0f172a' }}>2. Resend</strong>
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 12,
                background: data?.providers.find(p => p.id === 'resend')?.isConfigured ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.12)',
                color: data?.providers.find(p => p.id === 'resend')?.isConfigured ? '#059669' : '#dc2626'
              }}>
                {data?.providers.find(p => p.id === 'resend')?.isConfigured ? '🟢 Active & Ready' : '🔴 Not Configured'}
              </span>
            </div>
            <div style={{ fontSize: 12, color: '#6366f1', fontWeight: 600 }}>
              100 free emails/day • 3,000 free/mo • Modern DX
            </div>
            <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>
              1. Sign up on Resend. 2. API Keys &gt; Create Key. 3. Add domain (stackaitools.com).
            </p>
            <a 
              href="https://resend.com/api-keys" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ fontSize: 12, color: '#0284c7', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}
            >
              <span>Get Free Resend Key (resend.com)</span>
              <ExternalLink size={12} />
            </a>

            <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
              <input 
                type="password"
                placeholder="Paste RESEND_API_KEY..."
                value={resendKeyInput}
                onChange={e => setResendKeyInput(e.target.value)}
                style={{ flex: 1, padding: '7px 10px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 12 }}
              />
              <button 
                onClick={() => handleSaveKey('RESEND_API_KEY', resendKeyInput)}
                disabled={savingKeyId === 'RESEND_API_KEY'}
                style={{ padding: '7px 12px', borderRadius: 6, background: '#059669', color: '#fff', border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
              >
                {savingKeyId === 'RESEND_API_KEY' ? 'Saving...' : 'Save'}
              </button>
            </div>

            {data?.providers.find(p => p.id === 'resend')?.isConfigured && (
              <button
                type="button"
                onClick={() => handleTestConnection('resend')}
                disabled={testingKeyId === 'resend'}
                style={{
                  padding: '6px 12px',
                  borderRadius: 6,
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6
                }}
              >
                <Activity size={13} className={testingKeyId === 'resend' ? 'animate-spin' : ''} />
                <span>{testingKeyId === 'resend' ? 'Testing Live Connection...' : 'Test Connection with Resend'}</span>
              </button>
            )}

            {testConnectionResults['resend'] && (
              <div style={{
                fontSize: 11,
                padding: '6px 10px',
                borderRadius: 6,
                background: testConnectionResults['resend'].success ? '#ecfdf5' : '#fef2f2',
                color: testConnectionResults['resend'].success ? '#065f46' : '#991b1b',
                fontWeight: 600
              }}>
                {testConnectionResults['resend'].msg}
              </div>
            )}
          </div>

          {/* C. Direct SMTP Relay (Gmail or Domain SMTP) */}
          <div style={{ padding: '18px 20px', borderRadius: 10, border: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: 15, color: '#0f172a' }}>3. Direct SMTP Relay (Gmail / Custom)</strong>
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 12,
                background: data?.providers.find(p => p.id === 'smtp')?.isConfigured ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.12)',
                color: data?.providers.find(p => p.id === 'smtp')?.isConfigured ? '#059669' : '#dc2626'
              }}>
                {data?.providers.find(p => p.id === 'smtp')?.isConfigured ? '🟢 Active & Ready' : '🔴 Not Configured'}
              </span>
            </div>
            <div style={{ fontSize: 12, color: '#6366f1', fontWeight: 600 }}>
              500 free emails/day (15,000/mo) via Gmail or Custom SMTP
            </div>
            <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>
              Use Gmail with a 16-character Google App Password, or Brevo's free SMTP relay (smtp-relay.brevo.com).
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <button 
                type="button"
                onClick={() => setShowSmtpDrawer(true)}
                style={{
                  flex: 1,
                  padding: '7px 12px',
                  borderRadius: 6,
                  background: '#6366f1',
                  color: '#fff',
                  border: 'none',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Configure SMTP Credentials
              </button>
            </div>

            {data?.providers.find(p => p.id === 'smtp')?.isConfigured && (
              <button
                type="button"
                onClick={() => handleTestConnection('smtp')}
                disabled={testingKeyId === 'smtp'}
                style={{
                  padding: '6px 12px',
                  borderRadius: 6,
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6
                }}
              >
                <Activity size={13} className={testingKeyId === 'smtp' ? 'animate-spin' : ''} />
                <span>{testingKeyId === 'smtp' ? 'Verifying SMTP Handshake...' : 'Test SMTP Connection'}</span>
              </button>
            )}

            {testConnectionResults['smtp'] && (
              <div style={{
                fontSize: 11,
                padding: '6px 10px',
                borderRadius: 6,
                background: testConnectionResults['smtp'].success ? '#ecfdf5' : '#fef2f2',
                color: testConnectionResults['smtp'].success ? '#065f46' : '#991b1b',
                fontWeight: 600
              }}>
                {testConnectionResults['smtp'].msg}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Campaign Composer & Module Selector */}
      <div className="admin-table-card-light" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={18} color="#a855f7" />
              Broadcast Campaign Composer
            </h3>
            <p style={{ color: '#64748b', fontSize: 13, margin: '4px 0 0 0' }}>
              Draft your weekly frontier dispatch, choose pre-tested templates, and select your dispatch module.
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

        {/* Module Selection Bar */}
        <div style={{ padding: '12px 16px', background: '#f1f5f9', borderRadius: 8, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#334155', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Zap size={14} color="#6366f1" />
            Active Dispatch Module:
          </span>

          <select 
            value={preferredProvider}
            onChange={(e) => setPreferredProvider(e.target.value as any)}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: '1px solid #cbd5e1',
              fontSize: 13,
              fontWeight: 600,
              background: '#ffffff',
              color: '#0f172a'
            }}
          >
            <option value="auto">🔀 Auto-Cascade (Brevo → Resend → MailerSend → SMTP)</option>
            <option value="brevo">🔵 Brevo API (Free: 300/day, 9,000/mo)</option>
            <option value="resend">🟣 Resend API (Free: 100/day, 3,000/mo)</option>
            <option value="mailersend">🟢 MailerSend API (Free: 100/day, 3,000/mo)</option>
            <option value="smtp">🟡 Direct SMTP Relay</option>
            <option value="simulation">🧪 Dry-Run Mode (Test logic without external calls)</option>
          </select>

          <span style={{ fontSize: 12, color: '#64748b' }}>
            {preferredProvider === 'auto' && (activeProvidersCount > 0 ? 'Cascades across your active providers.' : '⚠️ No providers active yet.')}
            {preferredProvider === 'brevo' && (data?.providers.find(p => p.id === 'brevo')?.isConfigured ? 'Ready to send via Brevo.' : '⚠️ Brevo key needed above.')}
            {preferredProvider === 'resend' && (data?.providers.find(p => p.id === 'resend')?.isConfigured ? 'Ready to send via Resend.' : '⚠️ Resend key needed above.')}
            {preferredProvider === 'smtp' && (data?.providers.find(p => p.id === 'smtp')?.isConfigured ? 'Ready to send via SMTP.' : '⚠️ SMTP setup needed above.')}
          </span>
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
                  width: 250
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
              disabled={isPending || (data?.stats.activeSubscribers || 0) === 0 || (activeProvidersCount === 0 && preferredProvider !== 'simulation')}
              onClick={handleSendBroadcast}
              style={{
                padding: '11px 24px',
                borderRadius: 8,
                background: (activeProvidersCount > 0 || preferredProvider === 'simulation') 
                  ? 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' 
                  : '#94a3b8',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: 14,
                cursor: (activeProvidersCount > 0 || preferredProvider === 'simulation') ? 'pointer' : 'not-allowed',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: (activeProvidersCount > 0) ? '0 4px 14px rgba(99, 102, 241, 0.3)' : 'none'
              }}
            >
              {activeProvidersCount === 0 && preferredProvider !== 'simulation' ? <Lock size={15} /> : <Send size={15} />}
              <span>
                {activeProvidersCount === 0 && preferredProvider !== 'simulation'
                  ? 'Locked (Connect Provider Above to Broadcast)'
                  : `Broadcast to All ${data?.stats.activeSubscribers || 0} Subscribers`}
              </span>
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
              Real-time records captured from website modals, footer, tool pages, and manual admin entry.
            </span>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button 
              onClick={() => setShowAddSubModal(true)}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                background: '#6366f1',
                color: '#fff',
                fontSize: 12,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              <Plus size={13} />
              <span>Add Subscriber</span>
            </button>

            <select 
              value={subStatusFilter} 
              onChange={(e) => setSubStatusFilter(e.target.value as any)}
              style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 13 }}
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="unsubscribed">Unsubscribed</option>
            </select>

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

      {/* MODAL: ADD SUBSCRIBER */}
      {showAddSubModal && (
        <div className="admin-modal-backdrop-light" onClick={() => setShowAddSubModal(false)}>
          <div className="admin-modal-card-light" onClick={e => e.stopPropagation()} style={{ maxWidth: 440 }}>
            <div className="admin-modal-header-light">
              <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Plus size={18} color="#6366f1" />
                Add New Subscriber Manually
              </h3>
              <button onClick={() => setShowAddSubModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                <XCircle size={20} />
              </button>
            </div>
            <form onSubmit={handleAddSubscriber} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                  Email Address *
                </label>
                <input 
                  type="email" 
                  placeholder="e.g. founder@startup.com"
                  value={newSubEmail}
                  onChange={e => setNewSubEmail(e.target.value)}
                  required
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                  Source Tag
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. admin_manual, VIP_investor, test"
                  value={newSubSource}
                  onChange={e => setNewSubSource(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 10 }}>
                <button type="button" onClick={() => setShowAddSubModal(false)} className="admin-btn-light">
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isPending}
                  style={{ padding: '9px 18px', borderRadius: 8, background: '#6366f1', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}
                >
                  Save Subscriber
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CONFIGURE SMTP CREDENTIALS */}
      {showSmtpDrawer && (
        <div className="admin-modal-backdrop-light" onClick={() => setShowSmtpDrawer(false)}>
          <div className="admin-modal-card-light" onClick={e => e.stopPropagation()} style={{ maxWidth: 480 }}>
            <div className="admin-modal-header-light">
              <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Server size={18} color="#059669" />
                Configure SMTP Server Credentials
              </h3>
              <button onClick={() => setShowSmtpDrawer(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                <XCircle size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveSmtp} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ fontSize: 12, color: '#64748b', background: '#f8fafc', padding: 10, borderRadius: 6 }}>
                💡 <strong>Tip for Gmail:</strong> Host: <code>smtp.gmail.com</code>, Port: <code>587</code>, Username: your gmail address, Password: 16-character Google App Password (not your normal password).
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                    SMTP Host *
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. smtp.gmail.com or smtp.stackaitools.com"
                    value={smtpHost}
                    onChange={e => setSmtpHost(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 13 }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                    Port *
                  </label>
                  <input 
                    type="text" 
                    placeholder="587"
                    value={smtpPort}
                    onChange={e => setSmtpPort(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 13 }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                  SMTP Username / Email *
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. karan@stackaitools.com or arorakaran869@gmail.com"
                  value={smtpUser}
                  onChange={e => setSmtpUser(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 13 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                  SMTP Password / App Password *
                </label>
                <input 
                  type="password" 
                  placeholder="App Password or SMTP password"
                  value={smtpPass}
                  onChange={e => setSmtpPass(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 13 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                  Sender From Address
                </label>
                <input 
                  type="email" 
                  placeholder="karan@stackaitools.com"
                  value={smtpFrom}
                  onChange={e => setSmtpFrom(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 13 }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 10 }}>
                <button type="button" onClick={() => setShowSmtpDrawer(false)} className="admin-btn-light">
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={savingKeyId === 'smtp'}
                  style={{ padding: '8px 18px', borderRadius: 6, background: '#059669', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}
                >
                  {savingKeyId === 'smtp' ? 'Saving...' : 'Save Credentials'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Campaign History & Dispatch Logs */}
      <div className="admin-table-card-light" style={{ padding: 20 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Clock size={16} color="#6366f1" />
          Recent Broadcast Campaigns & Delivery History
        </h3>

        {(data?.campaigns || []).length === 0 ? (
          <p style={{ color: '#64748b', fontSize: 13, margin: '8px 0 0 0' }}>
            No broadcast campaigns sent yet. Connect a provider above to launch your first dispatch!
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
