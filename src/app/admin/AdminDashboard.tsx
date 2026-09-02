'use client';

import React, { useState, useTransition, useMemo, useEffect } from 'react';
import Link from 'next/link';
import './admin.css';
import { 
  Lock, 
  ShieldCheck, 
  Sparkles, 
  Search, 
  Plus, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Layers, 
  DollarSign, 
  Inbox, 
  Star, 
  TrendingUp, 
  ArrowRight,
  LogOut,
  SlidersHorizontal,
  RefreshCw,
  BarChart3,
  Users,
  MousePointerClick,
  UserMinus,
  Activity,
  Copy,
  Check,
  Download,
  AlertCircle,
  Mail
} from 'lucide-react';
import ToolLogo from '@/app/components/ToolLogo';
import AdminNewsletterView from './AdminNewsletterView';
import { EnrichedTool } from '@/lib/tools';
import { PromptItem } from '@/data';
import { AnalyticsSummary } from '@/lib/analytics';
import { 
  verifyAdminPasskey, 
  createToolAction, 
  updateToolAction, 
  updateAffiliateLinkAction, 
  updateAffiliateDetailsAction,
  toggleFeaturedAction, 
  approveToolAction, 
  rejectToolAction, 
  deleteToolAction,
  ToolInputData
} from '@/app/actions/admin';
import { MASTER_AFFILIATE_REGISTRY, getAffiliateInfo, AffiliateProgramInfo } from '@/lib/affiliates';

interface AdminDashboardProps {
  initialApprovedTools: EnrichedTool[];
  initialPendingTools: EnrichedTool[];
  initialPrompts: PromptItem[];
}

export default function AdminDashboard({
  initialApprovedTools,
  initialPendingTools,
  initialPrompts
}: AdminDashboardProps) {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('stackai_admin_session') === 'true';
    }
    return false;
  });
  const [passkeyInput, setPasskeyInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Data states
  const [tools, setTools] = useState<EnrichedTool[]>(initialApprovedTools);
  const [pendingTools, setPendingTools] = useState<EnrichedTool[]>(initialPendingTools);
  const [prompts] = useState<PromptItem[]>(initialPrompts);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsSummary | null>(null);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false);

  const [passkey, setPasskey] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('stackai_admin_passkey') || 'stackaitools2026';
    }
    return 'stackaitools2026';
  });

  // Navigation & Filtering
  const [activeTab, setActiveTab] = useState<'affiliates' | 'tools' | 'pending' | 'prompts' | 'analytics' | 'newsletter'>('affiliates');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPricing, setSelectedPricing] = useState('all');

  // Affiliate Manager Specific Filters
  const [affStatusFilter, setAffStatusFilter] = useState<'all' | 'active' | 'pending' | 'not_applied' | 'high_commission'>('all');
  const [affNetworkFilter, setAffNetworkFilter] = useState<string>('all');

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<EnrichedTool | null>(null);
  const [formData, setFormData] = useState<ToolInputData>({
    name: '',
    category: 'Code',
    link: '',
    affiliateLink: '',
    description: '',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    tags: [],
    badge: '',
    featured: false,
    rating: 4.9,
    reviewsCount: 150
  });

  // Dedicated Affiliate Link Connection Modal
  const [isAffModalOpen, setIsAffModalOpen] = useState(false);
  const [affModalTool, setAffModalTool] = useState<EnrichedTool | null>(null);
  const [affFormData, setAffFormData] = useState<{
    affiliateLink: string;
    affiliateStatus: 'active' | 'pending' | 'not_applied' | 'direct';
    commissionRate: string;
    affiliateNetwork: string;
    affiliateNotes: string;
  }>({
    affiliateLink: '',
    affiliateStatus: 'not_applied',
    commissionRate: '20% Recurring',
    affiliateNetwork: 'Rewardful',
    affiliateNotes: ''
  });

  // Toast & Copied State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const copyToClipboard = (text: string, slug: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      setCopiedSlug(slug);
      showToast(`Copied short redirect URL for ${slug}!`);
      setTimeout(() => setCopiedSlug(null), 2000);
    }
  };

  const loadAnalytics = async () => {
    setIsLoadingAnalytics(true);
    try {
      const res = await fetch('/api/analytics');
      if (res.ok) {
        const data = await res.json();
        setAnalyticsData(data);
      }
    } catch {
      // ignore error
    } finally {
      setIsLoadingAnalytics(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAnalytics();
    }
  }, [isAuthenticated, activeTab]);

  // Passkey Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setAuthError('');

    try {
      const res = await verifyAdminPasskey(passkeyInput);
      if (res.success) {
        setIsAuthenticated(true);
        localStorage.setItem('stackai_admin_session', 'true');
        localStorage.setItem('stackai_admin_passkey', passkeyInput);
        setPasskey(passkeyInput);
        showToast('Admin session unlocked successfully');
      } else {
        setAuthError(res.error || 'Invalid credentials');
      }
    } catch {
      setAuthError('Connection error. Try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('stackai_admin_session');
    localStorage.removeItem('stackai_admin_passkey');
    setIsAuthenticated(false);
    setPasskeyInput('');
  };

  // Open Full Tool Modal
  const handleOpenCreateModal = () => {
    setEditingTool(null);
    setFormData({
      name: '',
      category: 'Code',
      link: '',
      affiliateLink: '',
      description: '',
      pricingModel: 'Freemium',
      priceClass: 'freemium',
      tags: [],
      badge: '',
      featured: false,
      rating: 4.9,
      reviewsCount: 150
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (tool: EnrichedTool) => {
    setEditingTool(tool);
    setFormData({
      id: String(tool.id),
      name: tool.name,
      category: tool.category,
      link: tool.link,
      affiliateLink: tool.link,
      description: tool.description,
      pricingModel: tool.pricingModel,
      priceClass: tool.priceClass,
      tags: tool.tags || [],
      badge: tool.badge || '',
      featured: Boolean(tool.featured),
      rating: tool.rating,
      reviewsCount: tool.reviewsCount
    });
    setIsModalOpen(true);
  };

  // Open Affiliate Management Modal
  const handleOpenAffiliateModal = (tool: EnrichedTool) => {
    setAffModalTool(tool);
    const aff = getAffiliateInfo(tool.slug, tool.name);
    setAffFormData({
      affiliateLink: tool.link || '',
      affiliateStatus: tool.affiliateStatus || aff.status || 'not_applied',
      commissionRate: tool.commissionRate || aff.commissionRate || '20% Recurring',
      affiliateNetwork: tool.affiliateNetwork || aff.network || 'Rewardful',
      affiliateNotes: tool.affiliateNotes || aff.notes || ''
    });
    setIsAffModalOpen(true);
  };

  // Save Affiliate Changes
  const handleSaveAffiliate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!affModalTool) return;

    startTransition(async () => {
      await updateAffiliateDetailsAction({
        id: String(affModalTool.id),
        toolName: affModalTool.name,
        affiliateLink: affFormData.affiliateLink,
        affiliateStatus: affFormData.affiliateStatus,
        commissionRate: affFormData.commissionRate,
        affiliateNetwork: affFormData.affiliateNetwork,
        affiliateNotes: affFormData.affiliateNotes
      });

      setTools(prev => prev.map(t => t.id === affModalTool.id ? {
        ...t,
        link: affFormData.affiliateLink.trim() || t.link,
        affiliateStatus: affFormData.affiliateStatus,
        commissionRate: affFormData.commissionRate,
        affiliateNetwork: affFormData.affiliateNetwork,
        affiliateNotes: affFormData.affiliateNotes
      } : t));

      showToast(`Affiliate link updated for ${affModalTool.name}! Outbound /go/${affModalTool.slug} is live.`);
      setIsAffModalOpen(false);
    });
  };

  // Save Tool Action
  const handleSaveTool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.link) {
      alert('Please provide tool name and website link');
      return;
    }

    startTransition(async () => {
      if (editingTool) {
        await updateToolAction(String(editingTool.id), formData);
        setTools(prev => prev.map(t => t.id === editingTool.id ? {
          ...t,
          name: formData.name,
          category: formData.category,
          link: formData.affiliateLink || formData.link,
          description: formData.description,
          pricingModel: formData.pricingModel,
          priceClass: formData.priceClass,
          badge: formData.badge || undefined,
          featured: formData.featured,
          tags: formData.tags || t.tags
        } : t));
        showToast(`Updated "${formData.name}" successfully`);
      } else {
        const res = await createToolAction(formData);
        if (res.success && res.tool) {
          const newEnriched: EnrichedTool = {
            id: res.tool.id,
            name: res.tool.name,
            slug: res.tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            category: res.tool.category,
            icon: res.tool.icon || '✨',
            domain: res.tool.domain || '',
            logoUrl: res.tool.logoUrl || '',
            description: res.tool.description,
            pricingModel: res.tool.pricingModel,
            priceClass: res.tool.priceClass as any,
            link: res.tool.link,
            rating: res.tool.rating,
            reviewsCount: res.tool.reviewsCount,
            tags: res.tool.tags,
            badge: res.tool.badge || undefined,
            featured: res.tool.featured
          };
          setTools(prev => [newEnriched, ...prev]);
          showToast(`Added "${formData.name}" to directory!`);
        }
      }
      setIsModalOpen(false);
    });
  };

  // Toggle Featured
  const handleToggleFeatured = async (tool: EnrichedTool) => {
    const nextFeatured = !tool.featured;
    startTransition(async () => {
      await toggleFeaturedAction(String(tool.id), nextFeatured, tool.name);
      setTools(prev => prev.map(t => t.id === tool.id ? { ...t, featured: nextFeatured } : t));
      showToast(`${tool.name} ${nextFeatured ? 'set as Featured ⭐' : 'removed from Featured'}`);
    });
  };

  // Approve Pending Submission
  const handleApprovePending = async (tool: EnrichedTool) => {
    startTransition(async () => {
      await approveToolAction(String(tool.id));
      setPendingTools(prev => prev.filter(p => p.id !== tool.id));
      setTools(prev => [tool, ...prev]);
      showToast(`Approved and published "${tool.name}" live to directory!`);
    });
  };

  // Reject Pending Submission
  const handleRejectPending = async (tool: EnrichedTool) => {
    if (!confirm(`Reject submission for "${tool.name}"?`)) return;
    startTransition(async () => {
      await rejectToolAction(String(tool.id));
      setPendingTools(prev => prev.filter(p => p.id !== tool.id));
      showToast(`Rejected submission "${tool.name}"`);
    });
  };

  // Delete Tool
  const handleDeleteTool = async (tool: EnrichedTool) => {
    if (!confirm(`Are you sure you want to delete "${tool.name}" from the directory?`)) return;
    startTransition(async () => {
      await deleteToolAction(String(tool.id));
      setTools(prev => prev.filter(t => t.id !== tool.id));
      showToast(`Deleted "${tool.name}"`);
    });
  };

  // Export Affiliate Spreadsheet to CSV
  const handleExportCSV = () => {
    const headers = ['Tool Name', 'Category', 'Status', 'Commission Rate', 'Network', 'Destination Link', 'Short Redirect', 'Signup Portal'];
    const rows = tools.map(t => {
      const aff = getAffiliateInfo(t.slug, t.name);
      return [
        `"${t.name.replace(/"/g, '""')}"`,
        `"${t.category}"`,
        `"${t.affiliateStatus || aff.status}"`,
        `"${t.commissionRate || aff.commissionRate}"`,
        `"${t.affiliateNetwork || aff.network}"`,
        `"${t.link}"`,
        `"https://stackaitools.com/go/${t.slug}"`,
        `"${aff.signupUrl}"`
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `stack-ai-tools-affiliates-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported affiliate tracker spreadsheet (.csv)!');
  };

  // Filtered tools for General Tab
  const filteredTools = useMemo(() => {
    return tools.filter(t => {
      const matchesSearch = 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.domain && t.domain.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (t.tags && t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
      const matchesPricing = selectedPricing === 'all' || t.priceClass === selectedPricing;

      return matchesSearch && matchesCat && matchesPricing;
    });
  }, [tools, searchQuery, selectedCategory, selectedPricing]);

  // Affiliate Manager Tools List with Advanced Filtering
  const affiliateFilteredTools = useMemo(() => {
    return tools.filter(t => {
      const aff = getAffiliateInfo(t.slug, t.name);
      const currentStatus = t.affiliateStatus || aff.status;
      const currentRate = t.commissionRate || aff.commissionRate;
      const currentNetwork = t.affiliateNetwork || aff.network;

      const matchesSearch = 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.link.toLowerCase().includes(searchQuery.toLowerCase()) ||
        currentRate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        currentNetwork.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesStatus = true;
      if (affStatusFilter === 'active') {
        matchesStatus = currentStatus === 'active' || Boolean(t.link && (t.link.includes('via=') || t.link.includes('ref=') || t.link.includes('aff') || t.link.includes('partner') || t.link.includes('fp_ref')));
      } else if (affStatusFilter === 'pending') {
        matchesStatus = currentStatus === 'pending';
      } else if (affStatusFilter === 'not_applied') {
        matchesStatus = currentStatus === 'not_applied';
      } else if (affStatusFilter === 'high_commission') {
        matchesStatus = currentRate.includes('25%') || currentRate.includes('30%') || currentRate.includes('45%') || currentRate.includes('50%');
      }

      let matchesNetwork = true;
      if (affNetworkFilter !== 'all') {
        matchesNetwork = currentNetwork.toLowerCase() === affNetworkFilter.toLowerCase();
      }

      return matchesSearch && matchesStatus && matchesNetwork;
    });
  }, [tools, searchQuery, affStatusFilter, affNetworkFilter]);

  // Unique Networks for Filter
  const availableNetworks = useMemo(() => {
    const set = new Set<string>();
    tools.forEach(t => {
      const aff = getAffiliateInfo(t.slug, t.name);
      if (aff.network) set.add(aff.network);
    });
    return ['all', ...Array.from(set)];
  }, [tools]);

  // Total Active Affiliate count
  const activeAffiliateCount = useMemo(() => {
    return tools.filter(t => {
      const aff = getAffiliateInfo(t.slug, t.name);
      return t.affiliateStatus === 'active' || Boolean(t.link && (t.link.includes('via=') || t.link.includes('ref=') || t.link.includes('aff') || t.link.includes('partner') || t.link.includes('fp_ref')));
    }).length;
  }, [tools]);

  // If not authenticated, render Light Mode passkey gate
  if (!isAuthenticated) {
    return (
      <div className="admin-light-mode">
        <div className="admin-auth-overlay-light">
          <div className="admin-auth-card-light">
            <div className="admin-lock-icon-wrap-light">
              <Lock size={26} />
            </div>
            <h2 className="admin-auth-title">
              Stack AI Tools Admin
            </h2>
            <p className="admin-auth-subtitle">
              Enter your master passkey to manage directory listings, affiliate tracking redirects, and revenue settings.
            </p>

            <form onSubmit={handleLogin}>
              <div className="admin-form-group-light" style={{ textAlign: 'left', marginBottom: 20 }}>
                <label>Admin Master Passkey</label>
                <input 
                  type="password"
                  className="admin-input-light"
                  value={passkeyInput}
                  onChange={e => setPasskeyInput(e.target.value)}
                  placeholder="Enter passkey (default: stackai2026)"
                  autoFocus
                  required
                />
              </div>

              {authError && (
                <div style={{ color: '#dc2626', fontSize: 13, marginBottom: 16, textAlign: 'left', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <AlertCircle size={15} />
                  <span>{authError}</span>
                </div>
              )}

              <button 
                type="submit" 
                className="admin-btn-primary-light"
                disabled={isVerifying}
              >
                {isVerifying ? 'Verifying...' : 'Unlock Admin Portal →'}
              </button>
            </form>

            <div style={{ marginTop: 24, fontSize: 12, color: '#94a3b8' }}>
              Light Theme Mode • Protected by Karan Arora Architecture
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-light-mode">
      {/* Toast Alert Notification */}
      {toastMessage && (
        <div className="admin-toast-light">
          <CheckCircle2 size={18} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="admin-header-light">
        <div className="admin-title-group-light">
          <h1>
            <Sparkles size={26} color="#4f46e5" />
            <span>Stack AI Tools Admin Console</span>
            <span className="admin-live-badge-light">Live Production</span>
          </h1>
          <p className="admin-subtitle-light">
            Curated by <strong>Karan Arora</strong> • Master affiliate management, outbound tracking redirects, and directory publishing.
          </p>
        </div>

        <div className="admin-header-actions-light">
          <button onClick={handleOpenCreateModal} className="admin-btn-primary-light" style={{ width: 'auto', padding: '0 16px', height: 38 }}>
            <Plus size={16} />
            <span>Add New Tool</span>
          </button>
          <button onClick={handleLogout} className="admin-btn-secondary-light" title="Log out of admin session">
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics Summary */}
      <div className="admin-kpi-grid-light">
        <div className="admin-kpi-card-light">
          <div className="admin-kpi-icon-light" style={{ background: '#eef2ff', color: '#4f46e5' }}>
            <Layers size={22} />
          </div>
          <div>
            <div className="admin-kpi-val-light">{tools.length}</div>
            <div className="admin-kpi-lbl-light">Frontier Tools</div>
          </div>
        </div>

        <div className="admin-kpi-card-light">
          <div className="admin-kpi-icon-light" style={{ background: '#ecfdf5', color: '#059669' }}>
            <DollarSign size={22} />
          </div>
          <div>
            <div className="admin-kpi-val-light">{activeAffiliateCount}</div>
            <div className="admin-kpi-lbl-light">Active Affiliate Links</div>
          </div>
        </div>

        <div className="admin-kpi-card-light">
          <div className="admin-kpi-icon-light" style={{ background: '#fffbeb', color: '#d97706' }}>
            <MousePointerClick size={22} />
          </div>
          <div>
            <div className="admin-kpi-val-light">{analyticsData?.totalOutboundClicks ?? 0}</div>
            <div className="admin-kpi-lbl-light">Outbound Clicks (/go)</div>
          </div>
        </div>

        <div className="admin-kpi-card-light">
          <div className="admin-kpi-icon-light" style={{ background: '#fdf2f8', color: '#db2777' }}>
            <Inbox size={22} />
          </div>
          <div>
            <div className="admin-kpi-val-light">{pendingTools.length}</div>
            <div className="admin-kpi-lbl-light">Pending Submissions</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="admin-tabs-light">
        <button 
          className={`admin-tab-btn-light ${activeTab === 'affiliates' ? 'active' : ''}`}
          onClick={() => { setActiveTab('affiliates'); setSearchQuery(''); }}
        >
          <DollarSign size={16} />
          <span>Affiliate Manager</span>
          <span className="admin-tab-count-light">{activeAffiliateCount}/{tools.length}</span>
        </button>

        <button 
          className={`admin-tab-btn-light ${activeTab === 'tools' ? 'active' : ''}`}
          onClick={() => { setActiveTab('tools'); setSearchQuery(''); }}
        >
          <Layers size={16} />
          <span>All Directory Tools</span>
          <span className="admin-tab-count-light">{tools.length}</span>
        </button>

        <button 
          className={`admin-tab-btn-light ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => { setActiveTab('pending'); setSearchQuery(''); }}
        >
          <Inbox size={16} />
          <span>Pending Submissions</span>
          {pendingTools.length > 0 && (
            <span className="admin-tab-count-light" style={{ background: '#fef3c7', color: '#92400e' }}>
              {pendingTools.length}
            </span>
          )}
        </button>

        <button 
          className={`admin-tab-btn-light ${activeTab === 'prompts' ? 'active' : ''}`}
          onClick={() => { setActiveTab('prompts'); setSearchQuery(''); }}
        >
          <Sparkles size={16} />
          <span>Prompt Library</span>
          <span className="admin-tab-count-light">{prompts.length}</span>
        </button>

        <button 
          className={`admin-tab-btn-light ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => { setActiveTab('analytics'); setSearchQuery(''); }}
        >
          <BarChart3 size={16} />
          <span>Deep Analytics & Churn</span>
        </button>

        <button 
          className={`admin-tab-btn-light ${activeTab === 'newsletter' ? 'active' : ''}`}
          onClick={() => { setActiveTab('newsletter'); setSearchQuery(''); }}
        >
          <Mail size={16} />
          <span>Newsletter & Free Email Dispatch</span>
        </button>
      </div>

      {/* ====================================================================
          TAB 1: DEDICATED AFFILIATE MANAGEMENT SYSTEM (USER'S MAIN USE CASE)
          ==================================================================== */}
      {activeTab === 'affiliates' && (
        <div>
          {/* Affiliate Operations Health Banner */}
          <div className="affiliate-health-card-light">
            <div className="affiliate-health-top">
              <div>
                <h2 className="affiliate-health-title">
                  <DollarSign size={20} color="#059669" />
                  <span>Centralized Affiliate & Commission Management Hub</span>
                </h2>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 13.5 }}>
                  Every tool button on Stack AI Tools routes through <code>/go/[slug]</code> with automatic attribution logging. Connect your custom affiliate links below to start capturing recurring revenue.
                </p>
              </div>

              <button 
                onClick={handleExportCSV} 
                className="admin-btn-secondary-light"
                title="Export affiliate pipeline spreadsheet"
              >
                <Download size={15} />
                <span>Export Tracker (CSV)</span>
              </button>
            </div>

            {/* Micro Pipeline Metrics */}
            <div className="affiliate-health-metrics">
              <div className="affiliate-micro-stat">
                <span className="affiliate-micro-val" style={{ color: '#059669' }}>
                  {activeAffiliateCount} Tools Active
                </span>
                <span className="affiliate-micro-lbl">Live Affiliate Links</span>
              </div>
              <div className="affiliate-micro-stat">
                <span className="affiliate-micro-val" style={{ color: '#d97706' }}>
                  {tools.length - activeAffiliateCount} Programs
                </span>
                <span className="affiliate-micro-lbl">Available to Apply</span>
              </div>
              <div className="affiliate-micro-stat">
                <span className="affiliate-micro-val" style={{ color: '#4f46e5' }}>
                  {analyticsData?.totalOutboundClicks ?? 0}
                </span>
                <span className="affiliate-micro-lbl">Outbound Referrals</span>
              </div>
              <div className="affiliate-micro-stat">
                <span className="affiliate-micro-val" style={{ color: '#0284c7' }}>
                  {availableNetworks.length - 1} Networks
                </span>
                <span className="affiliate-micro-lbl">PartnerStack, Rewardful...</span>
              </div>
            </div>
          </div>

          {/* Controls & Filters Bar */}
          <div className="affiliate-controls-light">
            {/* Filter Pills */}
            <div className="affiliate-filter-pills">
              <button 
                className={`aff-filter-pill ${affStatusFilter === 'all' ? 'active' : ''}`}
                onClick={() => setAffStatusFilter('all')}
              >
                All Tools ({tools.length})
              </button>
              <button 
                className={`aff-filter-pill ${affStatusFilter === 'active' ? 'active' : ''}`}
                onClick={() => setAffStatusFilter('active')}
              >
                🟢 Active Links ({activeAffiliateCount})
              </button>
              <button 
                className={`aff-filter-pill ${affStatusFilter === 'not_applied' ? 'active' : ''}`}
                onClick={() => setAffStatusFilter('not_applied')}
              >
                🔴 Ready to Apply ({tools.filter(t => (t.affiliateStatus || getAffiliateInfo(t.slug, t.name).status) === 'not_applied').length})
              </button>
              <button 
                className={`aff-filter-pill ${affStatusFilter === 'high_commission' ? 'active' : ''}`}
                onClick={() => setAffStatusFilter('high_commission')}
              >
                ⚡ High Commission (&gt;25% MRR)
              </button>
            </div>

            {/* Search & Network Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <select 
                value={affNetworkFilter}
                onChange={e => setAffNetworkFilter(e.target.value)}
                style={{ height: 36, borderRadius: 8, border: '1px solid #cbd5e1', padding: '0 10px', fontSize: 13, color: '#334155', background: '#fff' }}
              >
                <option value="all">All Networks</option>
                <option value="Rewardful">Rewardful</option>
                <option value="FirstPromoter">FirstPromoter</option>
                <option value="PartnerStack">PartnerStack</option>
                <option value="Direct">Direct / In-house</option>
              </select>

              <div style={{ position: 'relative', width: 240 }}>
                <Search size={15} style={{ position: 'absolute', left: 10, top: 11, color: '#94a3b8' }} />
                <input 
                  type="text" 
                  className="admin-input-light" 
                  style={{ paddingLeft: 32, height: 36 }}
                  placeholder="Search tool or network..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Master Affiliate Data Table */}
          <div className="admin-table-card-light">
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table-light">
                <thead>
                  <tr>
                    <th>Tool & Category</th>
                    <th>Affiliate Status</th>
                    <th>Commission Structure</th>
                    <th>Network</th>
                    <th>Application Link</th>
                    <th>Short Redirect (/go)</th>
                    <th>Destination URL</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {affiliateFilteredTools.length === 0 ? (
                    <tr>
                      <td colSpan={8} style={{ textAlign: 'center', padding: '48px 20px', color: '#64748b' }}>
                        No tools match your current affiliate filters.
                      </td>
                    </tr>
                  ) : (
                    affiliateFilteredTools.map(tool => {
                      const aff = getAffiliateInfo(tool.slug, tool.name);
                      const isCustom = Boolean(tool.link && (tool.link.includes('via=') || tool.link.includes('ref=') || tool.link.includes('aff') || tool.link.includes('partner') || tool.link.includes('fp_ref')));
                      const status = isCustom ? 'active' : (tool.affiliateStatus || aff.status || 'not_applied');
                      const rate = tool.commissionRate || aff.commissionRate;
                      const network = tool.affiliateNetwork || aff.network;
                      const shortUrl = `https://stackaitools.com/go/${tool.slug}`;

                      return (
                        <tr key={tool.id}>
                          {/* Tool Name & Logo */}
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <ToolLogo 
                                name={tool.name} 
                                logoUrl={tool.logoUrl} 
                                icon={tool.icon} 
                                domain={tool.domain} 
                                size={32} 
                              />
                              <div>
                                <div style={{ fontWeight: 700, color: '#0f172a' }}>{tool.name}</div>
                                <span style={{ fontSize: 11, color: '#64748b' }}>{tool.category}</span>
                              </div>
                            </div>
                          </td>

                          {/* Status Badge */}
                          <td>
                            <span className={`aff-badge ${status}`}>
                              {status === 'active' && '🟢 Active (Linked)'}
                              {status === 'pending' && '🟡 In Review'}
                              {status === 'not_applied' && '🔴 Not Applied'}
                              {status === 'direct' && '⚪ Direct Only'}
                            </span>
                          </td>

                          {/* Commission Rate & Cookie */}
                          <td>
                            <div>
                              <span className="commission-pill-light">{rate}</span>
                              {aff.cookieDays > 0 && (
                                <div style={{ fontSize: 11, color: '#64748b', marginTop: 3 }}>
                                  {aff.cookieDays}-day cookie
                                </div>
                              )}
                            </div>
                          </td>

                          {/* Network */}
                          <td>
                            <span className="network-pill-light">{network}</span>
                          </td>

                          {/* Application Link */}
                          <td>
                            {aff.signupUrl ? (
                              <a 
                                href={aff.signupUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="admin-action-btn-light apply"
                                title="Open affiliate signup in new tab"
                              >
                                <span>Apply Now</span>
                                <ExternalLink size={12} />
                              </a>
                            ) : (
                              <span style={{ fontSize: 12, color: '#94a3b8' }}>—</span>
                            )}
                          </td>

                          {/* Short Redirect Route */}
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <a 
                                href={`/go/${tool.slug}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="admin-action-btn-light redirect"
                                title="Click to test redirect"
                              >
                                /go/{tool.slug}
                              </a>
                              <button 
                                onClick={() => copyToClipboard(shortUrl, tool.slug)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 2 }}
                                title="Copy short link"
                              >
                                {copiedSlug === tool.slug ? (
                                  <Check size={14} color="#059669" />
                                ) : (
                                  <Copy size={14} />
                                )}
                              </button>
                            </div>
                          </td>

                          {/* Current Destination Link */}
                          <td style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            <span style={{ fontSize: 12, fontFamily: 'monospace', color: isCustom ? '#059669' : '#64748b' }}>
                              {tool.link}
                            </span>
                          </td>

                          {/* Action Button */}
                          <td style={{ textAlign: 'right' }}>
                            <button 
                              className="admin-action-btn-light edit"
                              onClick={() => handleOpenAffiliateModal(tool)}
                              title="Connect or update affiliate link"
                            >
                              <Edit3 size={13} />
                              <span>{isCustom ? 'Edit Link' : 'Connect Link'}</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          TAB 2: ALL DIRECTORY TOOLS (LIGHT MODE)
          ==================================================================== */}
      {activeTab === 'tools' && (
        <div className="admin-table-card-light">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Search size={16} color="#94a3b8" />
              <input 
                type="text" 
                className="admin-input-light" 
                style={{ width: 260, height: 36 }}
                placeholder="Search tools by name, tag..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <div style={{ fontSize: 13, color: '#64748b' }}>
              Showing <strong>{filteredTools.length}</strong> of {tools.length} published tools
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table-light">
              <thead>
                <tr>
                  <th>Tool</th>
                  <th>Category</th>
                  <th>Pricing</th>
                  <th>Rating</th>
                  <th>Featured</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTools.map(tool => (
                  <tr key={tool.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <ToolLogo 
                          name={tool.name} 
                          logoUrl={tool.logoUrl} 
                          icon={tool.icon} 
                          domain={tool.domain} 
                          size={32} 
                        />
                        <div>
                          <div style={{ fontWeight: 700, color: '#0f172a' }}>{tool.name}</div>
                          <span style={{ fontSize: 11, color: '#64748b' }}>{tool.domain}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="network-pill-light">{tool.category}</span>
                    </td>

                    <td>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#334155' }}>
                        {tool.pricingModel}
                      </span>
                    </td>

                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Star size={13} fill="#f59e0b" color="#f59e0b" />
                        <span style={{ fontWeight: 700, fontSize: 13, color: '#0f172a' }}>{tool.rating?.toFixed(1) || '4.9'}</span>
                      </div>
                    </td>

                    <td>
                      <button 
                        onClick={() => handleToggleFeatured(tool)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: tool.featured ? '#f59e0b' : '#94a3b8', fontSize: 12, fontWeight: 600 }}
                      >
                        <Star size={14} fill={tool.featured ? '#f59e0b' : 'none'} />
                        <span>{tool.featured ? 'Featured' : 'Standard'}</span>
                      </button>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
                        <button 
                          className="admin-action-btn-light edit"
                          onClick={() => handleOpenEditModal(tool)}
                        >
                          <Edit3 size={13} />
                          <span>Edit</span>
                        </button>

                        <button 
                          className="admin-action-btn-light"
                          style={{ background: '#fef2f2', borderColor: '#fecaca', color: '#991b1b' }}
                          onClick={() => handleDeleteTool(tool)}
                          title="Delete tool"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ====================================================================
          TAB 3: PENDING COMMUNITY SUBMISSIONS (LIGHT MODE)
          ==================================================================== */}
      {activeTab === 'pending' && (
        <div className="admin-table-card-light">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <strong style={{ color: '#92400e', fontSize: 14 }}>Submissions Vetting Queue</strong>
              <p style={{ color: '#b45309', fontSize: 12, margin: 0 }}>
                Tools submitted via the public <code>/submit</code> portal. Click &quot;Approve&quot; to publish instantly to the live directory.
              </p>
            </div>
            <span style={{ fontSize: 12, color: '#92400e', fontWeight: 700 }}>
              {pendingTools.length} Awaiting Review
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table-light">
              <thead>
                <tr>
                  <th>Submitted Tool</th>
                  <th>Category</th>
                  <th>Pricing</th>
                  <th>Website URL</th>
                  <th>Description</th>
                  <th style={{ textAlign: 'right' }}>Review Decision</th>
                </tr>
              </thead>
              <tbody>
                {pendingTools.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '48px 20px', color: '#64748b' }}>
                      <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
                      <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>No pending submissions!</div>
                      <div style={{ fontSize: 13 }}>All community submitted tools have been reviewed.</div>
                    </td>
                  </tr>
                ) : (
                  pendingTools.map(tool => (
                    <tr key={tool.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <ToolLogo 
                            name={tool.name} 
                            logoUrl={tool.logoUrl} 
                            icon={tool.icon} 
                            domain={tool.domain} 
                            size={32} 
                          />
                          <div>
                            <div style={{ fontWeight: 700, color: '#0f172a' }}>{tool.name}</div>
                            <span style={{ fontSize: 11, color: '#64748b' }}>{tool.domain}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="network-pill-light">{tool.category}</span>
                      </td>

                      <td>
                        <span style={{ fontSize: 12, fontWeight: 600 }}>{tool.pricingModel}</span>
                      </td>

                      <td>
                        <a 
                          href={tool.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="admin-action-btn-light redirect"
                          style={{ fontSize: 12 }}
                        >
                          <ExternalLink size={12} />
                          <span>Visit Link</span>
                        </a>
                      </td>

                      <td style={{ maxWidth: 280 }}>
                        <div style={{ fontSize: 12.5, color: '#475569', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {tool.description}
                        </div>
                      </td>

                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
                          <button 
                            className="admin-action-btn-light apply"
                            onClick={() => handleApprovePending(tool)}
                          >
                            <CheckCircle2 size={13} />
                            <span>Approve</span>
                          </button>

                          <button 
                            className="admin-action-btn-light"
                            style={{ background: '#fef2f2', borderColor: '#fecaca', color: '#991b1b' }}
                            onClick={() => handleRejectPending(tool)}
                          >
                            <XCircle size={13} />
                            <span>Reject</span>
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
      )}

      {/* ====================================================================
          TAB 4: PROMPTS LIBRARY (LIGHT MODE)
          ==================================================================== */}
      {activeTab === 'prompts' && (
        <div className="admin-table-card-light">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <strong style={{ color: '#0f172a', fontSize: 14 }}>Interactive Prompt Engineering Library</strong>
              <p style={{ color: '#64748b', fontSize: 12, margin: 0 }}>
                Curated visual prompts shown on the homepage and <code>/prompts</code> showcase.
              </p>
            </div>
            <Link href="/prompts" className="admin-btn-secondary-light" target="_blank">
              <ExternalLink size={13} />
              <span>View Live Library</span>
            </Link>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table-light">
              <thead>
                <tr>
                  <th>Prompt Title</th>
                  <th>Target AI Model</th>
                  <th>Category</th>
                  <th>Output Type</th>
                  <th>Prompt Preview</th>
                </tr>
              </thead>
              <tbody>
                {prompts.map(prompt => (
                  <tr key={prompt.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{prompt.title}</div>
                      <span style={{ fontSize: 11, color: '#64748b' }}>By {prompt.author || 'Curated'}</span>
                    </td>
                    <td>
                      <span className="commission-pill-light">{prompt.targetAI}</span>
                    </td>
                    <td>
                      <span className="network-pill-light">{prompt.category}</span>
                    </td>
                    <td>
                      <span style={{ textTransform: 'capitalize', fontSize: 12, fontWeight: 600, color: '#334155' }}>
                        {prompt.outputType}
                      </span>
                    </td>
                    <td style={{ maxWidth: 320 }}>
                      <div style={{ fontSize: 12, fontFamily: 'monospace', color: '#475569', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {prompt.prompt}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ====================================================================
          TAB 5: DEEP ANALYTICS & CHURN TRACKER (LIGHT MODE)
          ==================================================================== */}
      {activeTab === 'analytics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Top Analytics Cards */}
          <div className="admin-kpi-grid-light">
            <div className="admin-kpi-card-light">
              <div>
                <div className="admin-kpi-val-light" style={{ color: '#4f46e5' }}>
                  {analyticsData?.totalVisitors ?? 0}
                </div>
                <div className="admin-kpi-lbl-light">Total Unique Visitors</div>
              </div>
            </div>
            <div className="admin-kpi-card-light">
              <div>
                <div className="admin-kpi-val-light" style={{ color: '#059669' }}>
                  {analyticsData?.totalOutboundClicks ?? 0}
                </div>
                <div className="admin-kpi-lbl-light">Outbound Affiliate Clicks</div>
              </div>
            </div>
            <div className="admin-kpi-card-light">
              <div>
                <div className="admin-kpi-val-light" style={{ color: '#0284c7' }}>
                  {analyticsData?.conversionRatePercentage ?? 0}%
                </div>
                <div className="admin-kpi-lbl-light">Outbound CTR</div>
              </div>
            </div>
            <div className="admin-kpi-card-light">
              <div>
                <div className="admin-kpi-val-light" style={{ color: '#dc2626' }}>
                  {analyticsData?.churnRatePercentage ?? 0}%
                </div>
                <div className="admin-kpi-lbl-light">Bounce / Churn Rate</div>
              </div>
            </div>
          </div>

          {/* Top Affiliate Clicks Table */}
          <div className="admin-table-card-light">
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <TrendingUp size={18} color="#059669" />
                <strong style={{ fontSize: 14, color: '#0f172a' }}>Top Outbound Affiliate Tools (Highest Clicks)</strong>
              </div>
              <span style={{ fontSize: 12, color: '#64748b' }}>Live Data</span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table-light">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Tool Name</th>
                    <th>Category</th>
                    <th>Total Clicks</th>
                    <th style={{ textAlign: 'right' }}>Test Redirect</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData?.topToolsClicked && analyticsData.topToolsClicked.length > 0 ? (
                    analyticsData.topToolsClicked.map((tool, idx) => (
                      <tr key={tool.slug}>
                        <td style={{ fontWeight: 800, color: idx < 3 ? '#d97706' : '#64748b' }}>
                          #{idx + 1}
                        </td>
                        <td style={{ fontWeight: 700, color: '#0f172a' }}>{tool.name}</td>
                        <td><span className="network-pill-light">{tool.category || 'General'}</span></td>
                        <td>
                          <span style={{ fontWeight: 800, color: '#059669' }}>{tool.clicks} clicks</span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <Link 
                            href={`/go/${tool.slug}`} 
                            target="_blank" 
                            className="admin-action-btn-light redirect"
                          >
                            <span>/go/{tool.slug}</span>
                            <ExternalLink size={12} />
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                        No clicks recorded yet. Clicks are logged automatically when visitors click tool buttons.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          TAB 6: NEWSLETTER & MULTI-PROVIDER FREE BROADCAST DISPATCH ENGINE
          ==================================================================== */}
      {activeTab === 'newsletter' && (
        <AdminNewsletterView passkey={passkey} />
      )}

      {/* ====================================================================
          MODAL 1: CONNECT / EDIT AFFILIATE PROGRAM DETAILS
          ==================================================================== */}
      {isAffModalOpen && affModalTool && (
        <div className="admin-modal-backdrop-light" onClick={() => setIsAffModalOpen(false)}>
          <div className="admin-modal-card-light" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header-light">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <ToolLogo 
                  name={affModalTool.name} 
                  logoUrl={affModalTool.logoUrl} 
                  icon={affModalTool.icon} 
                  domain={affModalTool.domain} 
                  size={36} 
                />
                <div>
                  <h3 style={{ margin: 0 }}>Connect Affiliate: {affModalTool.name}</h3>
                  <span style={{ fontSize: 12, color: '#64748b' }}>Short Link: <code>stackaitools.com/go/{affModalTool.slug}</code></span>
                </div>
              </div>
              <button 
                onClick={() => setIsAffModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                <XCircle size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveAffiliate}>
              {/* Affiliate Destination URL */}
              <div className="admin-form-group-light">
                <label>Destination Affiliate Referral URL *</label>
                <input 
                  type="url" 
                  value={affFormData.affiliateLink}
                  onChange={e => setAffFormData({ ...affFormData, affiliateLink: e.target.value })}
                  placeholder="e.g. https://heygen.com/?via=stackaitools"
                  required
                />
                <span style={{ fontSize: 11.5, color: '#64748b' }}>
                  When visitors click &ldquo;Try Free&rdquo; or visit <code>/go/{affModalTool.slug}</code>, they will 307-redirect to this URL.
                </span>
              </div>

              {/* Status and Commission Rate */}
              <div className="admin-form-row-2-light">
                <div className="admin-form-group-light">
                  <label>Affiliate Program Status *</label>
                  <select 
                    value={affFormData.affiliateStatus}
                    onChange={e => setAffFormData({ ...affFormData, affiliateStatus: e.target.value as any })}
                  >
                    <option value="active">🟢 Active / Approved (Live routing)</option>
                    <option value="pending">🟡 Applied / In Review</option>
                    <option value="not_applied">🔴 Not Applied (Plan to apply)</option>
                    <option value="direct">⚪ Direct Only (No affiliate program)</option>
                  </select>
                </div>

                <div className="admin-form-group-light">
                  <label>Commission Rate</label>
                  <input 
                    type="text" 
                    value={affFormData.commissionRate}
                    onChange={e => setAffFormData({ ...affFormData, commissionRate: e.target.value })}
                    placeholder="e.g. 20% Recurring MRR"
                  />
                </div>
              </div>

              {/* Network and Portal */}
              <div className="admin-form-group-light">
                <label>Affiliate Network / Platform</label>
                <select 
                  value={affFormData.affiliateNetwork}
                  onChange={e => setAffFormData({ ...affFormData, affiliateNetwork: e.target.value })}
                >
                  <option value="Rewardful">Rewardful</option>
                  <option value="FirstPromoter">FirstPromoter</option>
                  <option value="PartnerStack">PartnerStack</option>
                  <option value="Impact">Impact Radius</option>
                  <option value="ShareASale">ShareASale</option>
                  <option value="Direct">Direct / In-house</option>
                  <option value="None">None</option>
                </select>
              </div>

              {/* Notes */}
              <div className="admin-form-group-light">
                <label>Internal Notes & Login Info (Optional)</label>
                <textarea 
                  rows={2}
                  value={affFormData.affiliateNotes}
                  onChange={e => setAffFormData({ ...affFormData, affiliateNotes: e.target.value })}
                  placeholder="e.g. Registered via karan@stackaitools.com, monthly Stripe payouts, 60-day cookie window"
                />
              </div>

              <div className="admin-modal-footer-light">
                <button 
                  type="button" 
                  className="admin-btn-secondary-light"
                  onClick={() => setIsAffModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="admin-btn-primary-light"
                  style={{ width: 'auto', padding: '0 20px' }}
                  disabled={isPending}
                >
                  {isPending ? 'Saving...' : 'Save & Activate Affiliate Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL 2: ADD / EDIT FULL TOOL PROFILE
          ==================================================================== */}
      {isModalOpen && (
        <div className="admin-modal-backdrop-light" onClick={() => setIsModalOpen(false)}>
          <div className="admin-modal-card-light" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header-light">
              <h3>{editingTool ? `Edit "${editingTool.name}"` : 'Add New Frontier Tool'}</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                <XCircle size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveTool}>
              <div className="admin-form-row-2-light">
                <div className="admin-form-group-light">
                  <label>Tool Name *</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Cursor 3.0"
                    required
                  />
                </div>

                <div className="admin-form-group-light">
                  <label>Category *</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Code">Code (Autonomous Agents)</option>
                    <option value="Video">Video (Generative & Avatars)</option>
                    <option value="Design">Design (Visual & 3D)</option>
                    <option value="Writing">Writing & Reasoning</option>
                    <option value="Audio">Audio & Voice</option>
                    <option value="Automation">Automation & Workflows</option>
                  </select>
                </div>
              </div>

              <div className="admin-form-row-2-light">
                <div className="admin-form-group-light">
                  <label>Website Link *</label>
                  <input 
                    type="url" 
                    value={formData.link}
                    onChange={e => setFormData({ ...formData, link: e.target.value })}
                    placeholder="https://cursor.com"
                    required
                  />
                </div>

                <div className="admin-form-group-light">
                  <label>Affiliate Referral URL (Optional)</label>
                  <input 
                    type="url" 
                    value={formData.affiliateLink || ''}
                    onChange={e => setFormData({ ...formData, affiliateLink: e.target.value })}
                    placeholder="https://cursor.com/?via=stackai"
                  />
                </div>
              </div>

              <div className="admin-form-row-2-light">
                <div className="admin-form-group-light">
                  <label>Pricing Model</label>
                  <select 
                    value={formData.pricingModel}
                    onChange={e => {
                      const val = e.target.value;
                      setFormData({ 
                        ...formData, 
                        pricingModel: val,
                        priceClass: val.toLowerCase().includes('free') && !val.toLowerCase().includes('freemium') ? 'free' : val.toLowerCase().includes('paid') ? 'paid' : 'freemium'
                      });
                    }}
                  >
                    <option value="Freemium">Freemium (Free Tier Available)</option>
                    <option value="Free">Free (Open Source)</option>
                    <option value="Paid">Paid (Subscription Only)</option>
                  </select>
                </div>

                <div className="admin-form-group-light">
                  <label>Badge Pill</label>
                  <input 
                    type="text" 
                    value={formData.badge || ''}
                    onChange={e => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Frontier Pick"
                  />
                </div>
              </div>

              <div className="admin-form-group-light">
                <label>Description *</label>
                <textarea 
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Comprehensive technical description..."
                  required
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
                <input 
                  type="checkbox" 
                  id="featured-check"
                  checked={formData.featured}
                  onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                  style={{ width: 18, height: 18, cursor: 'pointer' }}
                />
                <label htmlFor="featured-check" style={{ fontSize: 13.5, color: '#0f172a', cursor: 'pointer' }}>
                  Mark as <strong>Featured Tool</strong> (Top directory showcase)
                </label>
              </div>

              <div className="admin-modal-footer-light">
                <button 
                  type="button" 
                  className="admin-btn-secondary-light"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="admin-btn-primary-light"
                  style={{ width: 'auto', padding: '0 20px' }}
                  disabled={isPending}
                >
                  {isPending ? 'Saving...' : editingTool ? 'Save Changes' : 'Create Tool'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
