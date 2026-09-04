'use client';

import React, { useState } from 'react';
import { submitToolAction } from '../actions/submitTool';
import { 
  Sparkles, 
  Globe, 
  CheckCircle2, 
  Send, 
  Layers, 
  Tag, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Search,
  ExternalLink,
  Zap,
  Lock
} from 'lucide-react';
import Link from 'next/link';

export default function Submit() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [previewUrl, setPreviewUrl] = useState('');
  const [detectedDomain, setDetectedDomain] = useState('');

  const toolCategories = [
    'Writing', 
    'Code', 
    'Design', 
    'Video', 
    'Audio', 
    'Automation', 
    'Marketing', 
    'Business'
  ];

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    try {
      if (val.includes('.')) {
        const hostname = val.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
        if (hostname.length > 3 && hostname.includes('.')) {
          setDetectedDomain(hostname);
          setPreviewUrl(`https://www.google.com/s2/favicons?domain=${hostname}&sz=128`);
          return;
        }
      }
    } catch {}
    setDetectedDomain('');
    setPreviewUrl('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    try {
      await submitToolAction(formData);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('idle');
      alert('Failed to submit tool. Please ensure all required fields are filled.');
    }
  };

  return (
    <div className="submit-page-wrapper">
      {/* Header Section */}
      <div className="submit-header">
        <div className="submit-pill-badge">
          <Sparkles size={14} className="sparkle-icon" color="#00f0ff" />
          <span>Creator & Founder Submissions</span>
        </div>
        <h1 className="submit-title">Submit Your AI Software</h1>
        <p className="submit-subtitle">
          Showcase your product to 50,000+ monthly US engineers, founders, and AI operators searching for frontier tools.
        </p>

        {/* Benefits Row */}
        <div className="submit-benefits-grid">
          <div className="submit-benefit-item">
            <div className="benefit-icon-wrap" style={{ background: 'rgba(0, 240, 255, 0.1)', color: '#00f0ff' }}>
              <TrendingUp size={18} />
            </div>
            <div>
              <div className="benefit-label">High-Intent Traffic</div>
              <div className="benefit-desc">Direct discovery by verified US buyers and developers</div>
            </div>
          </div>

          <div className="submit-benefit-item">
            <div className="benefit-icon-wrap" style={{ background: 'rgba(129, 140, 248, 0.1)', color: '#818cf8' }}>
              <Search size={18} />
            </div>
            <div>
              <div className="benefit-label">Programmatic SEO</div>
              <div className="benefit-desc">Indexed across dedicated alternative and search hubs</div>
            </div>
          </div>

          <div className="submit-benefit-item">
            <div className="benefit-icon-wrap" style={{ background: 'rgba(52, 211, 153, 0.1)', color: 'var(--color-success)' }}>
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="benefit-label">Editorial Vetting</div>
              <div className="benefit-desc">Official Verified 2026 checkmark upon approval</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Form Container */}
      <div className="submit-container">
        {status === 'success' ? (
          <div className="submit-success-card">
            <div className="submit-success-icon">
              <CheckCircle2 size={56} color="#34d399" />
            </div>
            <h2>Software Submitted Successfully!</h2>
            <p>
              Your listing has been queued for editorial review. Our research team will benchmark your tool against our quality standards and publish your dedicated profile page within 24–48 hours.
            </p>
            <div className="submit-success-actions">
              <button 
                type="button"
                className="btn-submit-action primary"
                onClick={() => { setStatus('idle'); setPreviewUrl(''); setDetectedDomain(''); }}
              >
                Submit Another Tool
              </button>
              <Link href="/" className="btn-submit-action secondary">
                Return to Directory
              </Link>
            </div>
          </div>
        ) : (
          <form className="submit-form-card" onSubmit={handleSubmit}>
            <div className="form-card-header">
              <h2>Tool Listing Details</h2>
              <span className="required-notice">* Required fields</span>
            </div>

            {/* Live Logo Preview when domain detected */}
            {previewUrl && (
              <div className="detected-brand-preview">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={previewUrl} 
                  alt="Detected brand logo" 
                  width={38} 
                  height={38} 
                  className="brand-favicon"
                  onError={() => setPreviewUrl('')}
                />
                <div className="detected-brand-info">
                  <div className="detected-title">
                    <CheckCircle2 size={13} color="#34d399" />
                    <span>Brand Favicon Detected: <strong>{detectedDomain}</strong></span>
                  </div>
                  <div className="detected-desc">High-resolution logo will be fetched automatically for your listing badge.</div>
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="toolName">
                Tool Name <span className="req-star">*</span>
              </label>
              <input 
                type="text" 
                id="toolName" 
                name="name" 
                className="submit-input" 
                placeholder="e.g. Cursor, Claude 3.7, Midjourney, Suno" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="toolUrl">
                Official Website URL <span className="req-star">*</span>
              </label>
              <div className="input-with-icon">
                <Globe size={18} className="field-icon" />
                <input 
                  type="url" 
                  id="toolUrl" 
                  name="url" 
                  className="submit-input pl-icon" 
                  placeholder="https://example.ai" 
                  onChange={handleUrlChange}
                  required 
                />
              </div>
            </div>

            <div className="form-row-2col">
              <div className="form-group">
                <label htmlFor="toolCategory">
                  Primary Category <span className="req-star">*</span>
                </label>
                <div className="select-wrap">
                  <select id="toolCategory" name="category" className="submit-select" required defaultValue="">
                    <option value="" disabled>Select Category</option>
                    {toolCategories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="pricingModel">
                  Pricing Model <span className="req-star">*</span>
                </label>
                <div className="select-wrap">
                  <select id="pricingModel" name="pricing" className="submit-select" required defaultValue="">
                    <option value="" disabled>Select Pricing</option>
                    <option value="Free">Free (100% Free Forever)</option>
                    <option value="Freemium">Freemium (Free Tier Available)</option>
                    <option value="Paid">Paid / Subscription Only</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="label-with-hint">
                <label htmlFor="toolDesc">
                  Value Proposition & Description <span className="req-star">*</span>
                </label>
                <span className="char-hint">Max 160 characters</span>
              </div>
              <textarea 
                id="toolDesc" 
                name="description" 
                className="submit-textarea" 
                rows={3} 
                placeholder="What does this AI tool do? What makes it unique in 2026? (e.g. Autonomous full-stack engineer that solves GitHub issues and submits verified PRs)" 
                maxLength={160} 
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn-submit-primary" 
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? (
                <div className="btn-loading-state">
                  <div className="spinner"></div>
                  <span>Submitting to Directory Review Queue...</span>
                </div>
              ) : (
                <>
                  <span>Submit Tool for Editorial Review</span>
                  <Send size={16} />
                </>
              )}
            </button>

            <div className="submit-trust-footer">
              <div className="trust-item">
                <ShieldCheck size={14} color="#34d399" />
                <span>100% Free Editorial Submission</span>
              </div>
              <div className="trust-dot">•</div>
              <div className="trust-item">
                <Zap size={14} color="#00f0ff" />
                <span>48h Review Turnaround</span>
              </div>
              <div className="trust-dot">•</div>
              <div className="trust-item">
                <Lock size={14} color="#818cf8" />
                <span>Zero Spam Guarantee</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

