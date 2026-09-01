'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Star, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Zap, 
  ShieldCheck, 
  TrendingUp,
  Award,
  Users,
  Target
} from 'lucide-react';
import ToolLogo from './ToolLogo';
import { getToolSlug } from '@/lib/tools';

export interface VisualToolItem {
  id: string | number;
  name: string;
  category: string;
  domain?: string | null;
  logoUrl?: string | null;
  description: string;
  pricingModel: string;
  priceClass: string;
  link: string;
  rating: number;
  reviewsCount: number;
  rank: number;
  awardBadge: string;
  matchScore: number;
  primaryUseCase: string;
  idealFor: string;
  pros: string[];
  cons: string[];
}

interface VisualToolListProps {
  tools: VisualToolItem[];
  title?: string;
  subtitle?: string;
}

export default function VisualToolList({ 
  tools, 
  title = "Verified Leaderboard & Visual Comparison", 
  subtitle = "Audited for speed, output quality, and enterprise reliability in 2026." 
}: VisualToolListProps) {
  return (
    <section className="visual-tool-list-container" aria-label="Visual AI Tools Comparison">
      <div className="visual-list-header">
        <div className="modern-badge-pill">
          <Award size={14} color="#6366f1" />
          <span>VERIFIED 2026 BENCHMARKS</span>
        </div>
        <h2 className="visual-list-title">{title}</h2>
        <p className="visual-list-subtitle">{subtitle}</p>
      </div>

      <div className="visual-cards-stack">
        {tools.map((tool) => {
          const slug = getToolSlug(tool);
          const scoreColor = tool.matchScore >= 95 ? '#10b981' : tool.matchScore >= 90 ? '#6366f1' : '#f59e0b';

          return (
            <div key={tool.name} className="visual-tool-card">
              {/* Card Top Banner: Rank & Category */}
              <div className="visual-card-top">
                <div className="visual-rank-pill">
                  <span className="rank-number">#{tool.rank}</span>
                  <span className="rank-award">{tool.awardBadge}</span>
                </div>

                <div className="visual-tags-row">
                  <span className="modern-category-chip">{tool.category}</span>
                  <span className={`modern-pricing-chip ${tool.priceClass}`}>
                    {tool.pricingModel}
                  </span>
                </div>
              </div>

              {/* Card Main: Logo, Title, Rating, & CTA */}
              <div className="visual-card-main">
                <div className="visual-brand-group">
                  <div className="visual-logo-box">
                    <ToolLogo 
                      logoUrl={tool.logoUrl} 
                      name={tool.name} 
                      domain={tool.domain || undefined} 
                      size={52} 
                    />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <h3 className="visual-tool-name">{tool.name}</h3>
                      <span className="modern-verified-pill" title="Verified by Karan Arora">✓ Verified</span>
                    </div>

                    {/* Star Rating Row */}
                    <div className="visual-rating-row">
                      <div className="visual-stars">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>
                      <span className="rating-score">{tool.rating.toFixed(1)}</span>
                      <span className="rating-count">({tool.reviewsCount.toLocaleString()} verified ratings)</span>
                    </div>
                  </div>
                </div>

                {/* Primary Outbound Action */}
                <div className="visual-cta-group">
                  <a 
                    href={`/go/${slug}`} 
                    target="_blank" 
                    rel="sponsored nofollow noopener"
                    className="visual-primary-btn"
                  >
                    <span>Try {tool.name.split(' ')[0]} Free</span>
                    <ExternalLink size={14} />
                  </a>
                  <Link href={`/tool/${slug}`} className="visual-secondary-link">
                    Full Profile & Alternatives →
                  </Link>
                </div>
              </div>

              {/* Description */}
              <p className="visual-card-desc">
                {tool.description}
              </p>

              {/* Use Case Probability & Best-For Matrix (Karan's Core Request) */}
              <div className="visual-use-case-box">
                <div className="use-case-metric-row">
                  <div className="use-case-label-group">
                    <Target size={16} color="#6366f1" />
                    <span className="use-case-heading">PRIMARY USE CASE & MATCH CONFIDENCE</span>
                  </div>

                  <div className="match-score-badge" style={{ color: scoreColor, borderColor: `${scoreColor}40`, background: `${scoreColor}15` }}>
                    <Zap size={13} />
                    <span>{tool.matchScore}% Use Case Match</span>
                  </div>
                </div>

                {/* Match Probability Progress Bar */}
                <div className="match-progress-track">
                  <div 
                    className="match-progress-fill" 
                    style={{ 
                      width: `${tool.matchScore}%`,
                      background: `linear-gradient(90deg, #6366f1, ${scoreColor})`
                    }}
                  />
                </div>

                {/* Targeted Use Case Details */}
                <div className="use-case-details-grid">
                  <div className="use-case-detail-item">
                    <span className="detail-label">🎯 Best For:</span>
                    <span className="detail-value">{tool.primaryUseCase}</span>
                  </div>
                  <div className="use-case-detail-item">
                    <span className="detail-label">👥 Ideal Audience:</span>
                    <span className="detail-value">{tool.idealFor}</span>
                  </div>
                </div>
              </div>

              {/* Pros and Cons Breakdown */}
              <div className="visual-pros-cons-grid">
                <div className="pros-column">
                  <span className="pros-title">Top Advantages</span>
                  <ul className="pros-list">
                    {tool.pros.map((pro, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={15} color="#10b981" className="pro-icon" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="cons-column">
                  <span className="cons-title">Considerations</span>
                  <ul className="cons-list">
                    {tool.cons.map((con, idx) => (
                      <li key={idx}>
                        <AlertCircle size={15} color="#94a3b8" className="con-icon" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
