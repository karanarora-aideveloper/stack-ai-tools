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
  ShieldAlert
} from 'lucide-react';

export default function Submit() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [previewUrl, setPreviewUrl] = useState('');

  const toolCategories = ['Writing', 'Code', 'Design', 'Video', 'Audio', 'Automation'];

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    try {
      if (val.includes('.')) {
        const hostname = val.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
        if (hostname.length > 3) {
          setPreviewUrl(`https://www.google.com/s2/favicons?domain=${hostname}&sz=128`);
          return;
        }
      }
    } catch {}
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
    <>
      <div className="page-header">
        <div className="hero-badge" style={{ margin: '0 auto 16px' }}>
          <Sparkles size={13} className="sparkle-icon" />
          <span>Creator & Founder Submissions</span>
        </div>
        <h1 className="page-title">Submit Your AI Tool</h1>
        <p className="page-subtitle">
          Get listed in front of over 50,000+ monthly AI researchers, developers, and enterprise buyers in the US market.
        </p>
      </div>
      
      <div className="submit-container">
        {status === 'success' ? (
          <div className="success-modal">
            <div className="success-icon" style={{ color: '#10b981' }}>
              <CheckCircle2 size={64} />
            </div>
            <h2>Tool Submitted Successfully!</h2>
            <p>
              Your listing has been sent to our curation team. Once reviewed for quality and safety, it will go live with an official verified badge.
            </p>
            <button className="btn btn-secondary" onClick={() => { setStatus('idle'); setPreviewUrl(''); }}>
              Submit Another Tool
            </button>
          </div>
        ) : (
          <form className="submit-form" onSubmit={handleSubmit}>
            {/* Live Logo Preview if available */}
            {previewUrl && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(99, 102, 241, 0.08)',
                border: '1px solid rgba(99, 102, 241, 0.25)'
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={previewUrl} 
                  alt="Detected brand logo" 
                  width={36} 
                  height={36} 
                  style={{ borderRadius: 8, objectFit: 'contain' }}
                  onError={() => setPreviewUrl('')}
                />
                <span style={{ fontSize: 13, color: '#c7d2fe' }}>
                  ✓ Official brand logo detected automatically from domain!
                </span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="toolName">Tool Name *</label>
              <input 
                type="text" 
                id="toolName" 
                name="name" 
                className="form-input" 
                placeholder="e.g. Cursor, Midjourney, Perplexity" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="toolUrl">Website URL *</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Globe size={16} style={{ position: 'absolute', left: 14, color: 'var(--text-muted)' }} />
                <input 
                  type="url" 
                  id="toolUrl" 
                  name="url" 
                  className="form-input" 
                  placeholder="https://example.ai" 
                  style={{ paddingLeft: 42 }}
                  onChange={handleUrlChange}
                  required 
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="toolCategory">Primary Category *</label>
                <select id="toolCategory" name="category" className="form-input" required defaultValue="">
                  <option value="" disabled>Select Category</option>
                  {toolCategories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="pricingModel">Pricing Model *</label>
                <select id="pricingModel" name="pricing" className="form-input" required defaultValue="">
                  <option value="" disabled>Select Pricing</option>
                  <option value="Free">Free (100% Free)</option>
                  <option value="Freemium">Freemium (Free tier + Paid)</option>
                  <option value="Paid">Paid / Subscription</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="toolDesc">Value Proposition & Description *</label>
              <textarea 
                id="toolDesc" 
                name="description" 
                className="form-input" 
                rows={3} 
                placeholder="What does this AI tool do? What makes it unique in 2026? (Max 160 characters)" 
                maxLength={160} 
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ justifyContent: 'center', padding: '14px 24px', width: '100%', fontSize: 15 }}
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? (
                <span>Submitting to Directory...</span>
              ) : (
                <>
                  <span>Submit for Review</span>
                  <Send size={16} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
