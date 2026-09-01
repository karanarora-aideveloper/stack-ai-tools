'use client';

import React, { useState, useTransition, useMemo } from 'react';
import Link from 'next/link';
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
  RefreshCw
} from 'lucide-react';
import ToolLogo from '@/app/components/ToolLogo';
import { EnrichedTool } from '@/lib/tools';
import { PromptItem } from '@/data';
import { 
  verifyAdminPasskey, 
  createToolAction, 
  updateToolAction, 
  updateAffiliateLinkAction, 
  toggleFeaturedAction, 
  approveToolAction, 
  rejectToolAction, 
  deleteToolAction,
  ToolInputData
} from '@/app/actions/admin';

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

  // Navigation & Filtering
  const [activeTab, setActiveTab] = useState<'tools' | 'affiliates' | 'pending' | 'prompts'>('tools');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPricing, setSelectedPricing] = useState('all');

  // Modal states
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

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

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
    setIsAuthenticated(false);
    setPasskeyInput('');
  };

  // Modal Open for Create
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

  // Modal Open for Edit
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

  // Save tool (create or edit)
  const handleSaveTool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.link) {
      alert('Please provide tool name and website link');
      return;
    }

    startTransition(async () => {
      if (editingTool) {
        // Update
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
        // Create
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

  // Quick Affiliate Update
  const handleQuickAffiliateUpdate = async (tool: EnrichedTool) => {
    const newAffiliate = prompt(`Enter affiliate tracking link for ${tool.name}:`, tool.link);
    if (newAffiliate !== null && newAffiliate.trim() !== '') {
      startTransition(async () => {
        await updateAffiliateLinkAction(String(tool.id), newAffiliate.trim(), tool.name);
        setTools(prev => prev.map(t => t.id === tool.id ? { ...t, link: newAffiliate.trim() } : t));
        showToast(`Affiliate link updated for ${tool.name}! Outbound /go/${tool.slug} is now live.`);
      });
    }
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

  // Categories list
  const categories = useMemo(() => {
    return Array.from(new Set(tools.map(t => t.category))).sort();
  }, [tools]);

  // Filtered tools
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

  // Affiliate tools
  const affiliateTools = useMemo(() => {
    return tools.filter(t => {
      const matchesSearch = 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.link.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [tools, searchQuery]);

  // If not authenticated, render passkey login gate
  if (!isAuthenticated) {
    return (
      <div className="admin-wrapper">
        <div className="admin-auth-overlay">
          <div className="admin-auth-card">
            <div className="admin-lock-icon-wrap">
              <Lock size={26} />
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
              Stack AI Tools Admin
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
              Enter your master passkey to manage directory tools, affiliate links, and pending submissions.
            </p>

            <form onSubmit={handleLogin}>
              <div className="admin-form-group" style={{ textAlign: 'left' }}>
                <label>Admin Passkey</label>
                <input 
                  type="password"
                  value={passkeyInput}
                  onChange={e => setPasskeyInput(e.target.value)}
                  placeholder="Enter passkey (default: stackai2026)"
                  autoFocus
                  required
                />
              </div>

              {authError && (
                <div style={{ color: '#f87171', fontSize: 13, marginBottom: 16, textAlign: 'left' }}>
                  ⚠️ {authError}
                </div>
              )}

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
                disabled={isVerifying}
              >
                {isVerifying ? 'Verifying...' : 'Unlock Admin Portal →'}
              </button>
            </form>

            <div style={{ marginTop: 24, fontSize: 12, color: 'var(--text-secondary)' }}>
              Protected by Stack AI Tools Architecture • USA Frontier
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-wrapper">
      {/* Toast Alert Notification */}
      {toastMessage && (
        <div className="admin-toast-alert">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="admin-top-header">
        <div className="admin-title-group">
          <h1>
            <Sparkles size={28} color="#6366f1" />
            Stack AI Tools Admin Console
            <span className="admin-badge-live">Live</span>
          </h1>
          <p className="admin-subtitle">
            Manage directory listings, high-converting affiliate redirects, and review community submissions.
          </p>
        </div>

        <div className="admin-header-actions">
          <button onClick={handleOpenCreateModal} className="btn btn-primary">
            <Plus size={16} />
            <span>Add New Tool</span>
          </button>
          <button onClick={handleLogout} className="admin-btn-action" title="Log out of admin session">
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics Summary */}
      <div className="admin-kpi-grid">
        <div className="admin-kpi-card">
          <div className="admin-kpi-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
            <Layers size={24} />
          </div>
          <div className="admin-kpi-info">
            <span className="admin-kpi-val">{tools.length}</span>
            <span className="admin-kpi-lbl">Active Tools</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
            <DollarSign size={24} />
          </div>
          <div className="admin-kpi-info">
            <span className="admin-kpi-val">
              {tools.filter(t => t.link.includes('via=') || t.link.includes('ref=') || t.link.includes('aff') || t.link.includes('partner') || t.link.includes('fp_ref')).length || tools.length}
            </span>
            <span className="admin-kpi-lbl">Affiliate Trackers</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
            <Inbox size={24} />
          </div>
          <div className="admin-kpi-info">
            <span className="admin-kpi-val">{pendingTools.length}</span>
            <span className="admin-kpi-lbl">Pending Submissions</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-icon" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#f472b6' }}>
            <Star size={24} />
          </div>
          <div className="admin-kpi-info">
            <span className="admin-kpi-val">{tools.filter(t => t.featured).length}</span>
            <span className="admin-kpi-lbl">Featured Showcases</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="admin-tabs-bar">
        <button 
          className={`admin-tab-item ${activeTab === 'tools' ? 'active' : ''}`}
          onClick={() => setActiveTab('tools')}
        >
          <Layers size={16} />
          <span>All Tools</span>
          <span className="admin-tab-count-pill">{tools.length}</span>
        </button>

        <button 
          className={`admin-tab-item ${activeTab === 'affiliates' ? 'active' : ''}`}
          onClick={() => setActiveTab('affiliates')}
        >
          <DollarSign size={16} />
          <span>Affiliate Manager</span>
          <span className="admin-tab-count-pill">/go/[slug]</span>
        </button>

        <button 
          className={`admin-tab-item ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          <Inbox size={16} />
          <span>Pending Submissions</span>
          {pendingTools.length > 0 && (
            <span className="admin-tab-count-pill pending">{pendingTools.length}</span>
          )}
        </button>

        <button 
          className={`admin-tab-item ${activeTab === 'prompts' ? 'active' : ''}`}
          onClick={() => setActiveTab('prompts')}
        >
          <Sparkles size={16} />
          <span>Prompt Library</span>
          <span className="admin-tab-count-pill">{prompts.length}</span>
        </button>
      </div>

      {/* Search & Filter Controls (for Tools & Affiliates) */}
      {(activeTab === 'tools' || activeTab === 'affiliates') && (
        <div className="admin-controls-bar">
          <div className="admin-search-wrapper">
            <Search size={16} />
            <input 
              type="text"
              placeholder="Search tools by name, domain, tag..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          {activeTab === 'tools' && (
            <div className="admin-filters-group">
              <select 
                className="admin-select-filter"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories ({categories.length})</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select 
                className="admin-select-filter"
                value={selectedPricing}
                onChange={e => setSelectedPricing(e.target.value)}
              >
                <option value="all">All Pricing</option>
                <option value="free">Free</option>
                <option value="freemium">Freemium</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          )}
        </div>
      )}

      {/* TAB 1: ALL TOOLS */}
      {activeTab === 'tools' && (
        <div className="admin-table-card">
          <div className="admin-table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Tool</th>
                  <th>Category</th>
                  <th>Pricing</th>
                  <th>Featured</th>
                  <th>Outbound Link</th>
                  <th>Rating</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTools.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
                      No tools found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredTools.map(tool => (
                    <tr key={tool.id}>
                      <td>
                        <div className="admin-tool-cell">
                          <ToolLogo 
                            name={tool.name} 
                            logoUrl={tool.logoUrl} 
                            icon={tool.icon} 
                            domain={tool.domain} 
                            size={36} 
                          />
                          <div className="admin-tool-cell-info">
                            <span className="admin-tool-cell-name">{tool.name}</span>
                            <span className="admin-tool-cell-domain">{tool.domain || 'direct'}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="tool-category-badge">{tool.category}</span>
                      </td>

                      <td>
                        <span className={`pricing-tag pricing-${tool.priceClass}`}>
                          {tool.pricingModel}
                        </span>
                      </td>

                      <td>
                        <button 
                          className={`admin-badge-featured-toggle ${tool.featured ? 'active' : 'inactive'}`}
                          onClick={() => handleToggleFeatured(tool)}
                          title="Click to toggle featured status on homepage"
                        >
                          <Star size={12} fill={tool.featured ? '#fbbf24' : 'none'} />
                          <span>{tool.featured ? 'Featured' : 'Standard'}</span>
                        </button>
                      </td>

                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <a 
                            href={`/go/${tool.slug}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="admin-btn-action test-redirect"
                            title={`Test redirect: /go/${tool.slug}`}
                          >
                            <ExternalLink size={12} />
                            <span>/go/{tool.slug}</span>
                          </a>
                        </div>
                      </td>

                      <td>
                        <span style={{ color: '#fbbf24', fontWeight: 600, fontSize: 13 }}>
                          ★ {tool.rating} <span style={{ color: 'var(--text-secondary)', fontSize: 11 }}>({tool.reviewsCount})</span>
                        </span>
                      </td>

                      <td style={{ textAlign: 'right' }}>
                        <div className="admin-row-actions" style={{ justifyContent: 'flex-end' }}>
                          <button 
                            className="admin-btn-action" 
                            onClick={() => handleOpenEditModal(tool)}
                            title="Edit full tool profile"
                          >
                            <Edit3 size={13} />
                            <span>Edit</span>
                          </button>

                          <button 
                            className="admin-btn-action delete" 
                            onClick={() => handleDeleteTool(tool)}
                            title="Delete tool from directory"
                          >
                            <Trash2 size={13} />
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

      {/* TAB 2: AFFILIATE & OUTBOUND REDIRECT MANAGER */}
      {activeTab === 'affiliates' && (
        <div className="admin-table-card">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(99, 102, 241, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <strong style={{ color: '#fff', fontSize: 14 }}>Centralized Outbound Tracking Engine</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: 12, margin: 0 }}>
                All directory buttons route through <code>stackaitools.com/go/[slug]</code> (307 redirect with noindex/nofollow). Update affiliate URLs here anytime.
              </p>
            </div>
            <span style={{ fontSize: 12, color: '#34d399', fontWeight: 600 }}>100% Tracking Compliant</span>
          </div>

          <div className="admin-table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Tool</th>
                  <th>Category</th>
                  <th>Destination Affiliate URL</th>
                  <th>Local Redirect Route</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {affiliateTools.map(tool => (
                  <tr key={tool.id}>
                    <td>
                      <div className="admin-tool-cell">
                        <ToolLogo 
                          name={tool.name} 
                          logoUrl={tool.logoUrl} 
                          icon={tool.icon} 
                          domain={tool.domain} 
                          size={32} 
                        />
                        <span className="admin-tool-cell-name">{tool.name}</span>
                      </div>
                    </td>

                    <td>
                      <span className="tool-category-badge">{tool.category}</span>
                    </td>

                    <td style={{ maxWidth: 380, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#a5b4fc' }}>
                        {tool.link}
                      </span>
                    </td>

                    <td>
                      <a 
                        href={`/go/${tool.slug}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="admin-btn-action test-redirect"
                        title="Click to test redirect in new tab"
                      >
                        <ExternalLink size={12} />
                        <span>/go/{tool.slug}</span>
                      </a>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <div className="admin-row-actions" style={{ justifyContent: 'flex-end' }}>
                        <button 
                          className="admin-btn-action" 
                          onClick={() => handleQuickAffiliateUpdate(tool)}
                          title="Change affiliate tracking URL"
                        >
                          <DollarSign size={13} />
                          <span>Update Link</span>
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

      {/* TAB 3: PENDING COMMUNITY SUBMISSIONS */}
      {activeTab === 'pending' && (
        <div className="admin-table-card">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(245, 158, 11, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <strong style={{ color: '#fff', fontSize: 14 }}>Submissions Vetting Queue</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: 12, margin: 0 }}>
                Tools submitted via the public <code>/submit</code> portal. Click &quot;Approve&quot; to publish instantly to the live directory.
              </p>
            </div>
            <span style={{ fontSize: 12, color: '#fbbf24', fontWeight: 600 }}>
              {pendingTools.length} Awaiting Review
            </span>
          </div>

          <div className="admin-table-responsive">
            <table className="admin-table">
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
                    <td colSpan={6} style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--text-secondary)' }}>
                      <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
                      <div style={{ fontWeight: 600, color: '#fff', marginBottom: 4 }}>No pending submissions!</div>
                      <div style={{ fontSize: 13 }}>All community submitted tools have been reviewed.</div>
                    </td>
                  </tr>
                ) : (
                  pendingTools.map(tool => (
                    <tr key={tool.id}>
                      <td>
                        <div className="admin-tool-cell">
                          <ToolLogo 
                            name={tool.name} 
                            logoUrl={tool.logoUrl} 
                            icon={tool.icon} 
                            domain={tool.domain} 
                            size={32} 
                          />
                          <div className="admin-tool-cell-info">
                            <span className="admin-tool-cell-name">{tool.name}</span>
                            <span className="admin-tool-cell-domain">{tool.domain}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="tool-category-badge">{tool.category}</span>
                      </td>

                      <td>
                        <span className={`pricing-tag pricing-${tool.priceClass}`}>
                          {tool.pricingModel}
                        </span>
                      </td>

                      <td>
                        <a 
                          href={tool.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="admin-btn-action"
                          style={{ fontSize: 12 }}
                        >
                          <ExternalLink size={12} />
                          <span>Visit Link</span>
                        </a>
                      </td>

                      <td style={{ maxWidth: 300 }}>
                        <div style={{ fontSize: 13, color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {tool.description}
                        </div>
                      </td>

                      <td style={{ textAlign: 'right' }}>
                        <div className="admin-row-actions" style={{ justifyContent: 'flex-end' }}>
                          <button 
                            className="admin-btn-action approve"
                            onClick={() => handleApprovePending(tool)}
                            title="Publish this tool live to directory"
                          >
                            <CheckCircle2 size={14} />
                            <span>Approve & Publish</span>
                          </button>

                          <button 
                            className="admin-btn-action reject"
                            onClick={() => handleRejectPending(tool)}
                            title="Reject and delete submission"
                          >
                            <XCircle size={14} />
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

      {/* TAB 4: PROMPT LIBRARY SHOWCASE */}
      {activeTab === 'prompts' && (
        <div className="admin-table-card">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(236, 72, 153, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <strong style={{ color: '#fff', fontSize: 14 }}>Interactive Prompt Engineering Library</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: 12, margin: 0 }}>
                Visual prompt templates shown on the homepage and <code>/prompts</code> showcase.
              </p>
            </div>
            <Link href="/prompts" className="admin-btn-action" target="_blank">
              <ExternalLink size={12} />
              <span>View Live Library</span>
            </Link>
          </div>

          <div className="admin-table-responsive">
            <table className="admin-table">
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
                      <strong style={{ color: '#fff', fontSize: 14 }}>{prompt.title}</strong>
                    </td>
                    <td>
                      <span className="tool-category-badge">{prompt.targetAI}</span>
                    </td>
                    <td>{prompt.category}</td>
                    <td>
                      <span style={{ textTransform: 'uppercase', fontSize: 11, fontWeight: 700, color: 'var(--accent-cyan)' }}>
                        {prompt.outputType}
                      </span>
                    </td>
                    <td style={{ maxWidth: 400 }}>
                      <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.3)', padding: '6px 10px', borderRadius: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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

      {/* MODAL: ADD / EDIT TOOL */}
      {isModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="admin-modal-card" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingTool ? `Edit "${editingTool.name}"` : 'Add New Frontier Tool'}</h3>
              <button className="admin-modal-close-btn" onClick={() => setIsModalOpen(false)}>
                <XCircle size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveTool}>
              <div className="admin-form-row-2">
                <div className="admin-form-group">
                  <label>Tool Name *</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Cursor 3.0"
                    required
                  />
                </div>

                <div className="admin-form-group">
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

              <div className="admin-form-row-2">
                <div className="admin-form-group">
                  <label>Official Website URL *</label>
                  <input 
                    type="url" 
                    value={formData.link}
                    onChange={e => setFormData({ ...formData, link: e.target.value })}
                    placeholder="https://cursor.com"
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Affiliate / Referral Link (Optional)</label>
                  <input 
                    type="url" 
                    value={formData.affiliateLink || ''}
                    onChange={e => setFormData({ ...formData, affiliateLink: e.target.value })}
                    placeholder="https://tool.com/?via=stackai"
                  />
                </div>
              </div>

              <div className="admin-form-row-2">
                <div className="admin-form-group">
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
                    <option value="Free">Free (Open Source / Completely Free)</option>
                    <option value="Paid">Paid (Subscription Only)</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label>Highlight Badge (Optional)</label>
                  <input 
                    type="text" 
                    value={formData.badge || ''}
                    onChange={e => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. 🔥 HOT or ⚡ 95ms Latency"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Description *</label>
                <textarea 
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Comprehensive description of capabilities and frontier architecture..."
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Tags (Comma separated)</label>
                <input 
                  type="text" 
                  value={formData.tags ? formData.tags.join(', ') : ''}
                  onChange={e => setFormData({ 
                    ...formData, 
                    tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) 
                  })}
                  placeholder="e.g. AI Coding, IDE, Agents"
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
                <label htmlFor="featured-check" style={{ fontSize: 14, color: '#fff', cursor: 'pointer' }}>
                  Mark as <strong>Featured Tool</strong> (Top homepage showcase)
                </label>
              </div>

              <div className="admin-modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
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
