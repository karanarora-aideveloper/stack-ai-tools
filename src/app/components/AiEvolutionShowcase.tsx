'use client';

import React, { useState } from 'react';
import { Sparkles, Brain, Cpu, Orbit, ArrowRight, Eye, Layers } from 'lucide-react';
import { playLaserSound } from '@/lib/arcadeSound';

const EVOLUTION_STAGES = [
  {
    level: 'LVL 01 · 1995',
    title: 'The Silicon Cradle',
    subtitle: 'Mechanical Logic & Manual Web Indexing',
    desc: 'The dawn of the personal computer era. Humans manually programmed deterministic rules, floppy disks stored kilobytes, and search was simple keyword matching.',
    icon: <Cpu size={20} color="#94a3b8" />,
    badge: 'STATIC AGE',
    glow: '#94a3b8'
  },
  {
    level: 'LVL 02 · 2020',
    title: 'Neural Perception',
    subtitle: 'Pattern Recognition & Deep Learning',
    desc: 'Machines began to perceive the world: transcribing spoken voice, recognizing human faces, and recommending personalized streams through multi-layer deep neural networks.',
    icon: <Eye size={20} color="#00f0ff" />,
    badge: 'PERCEPTION',
    glow: '#00f0ff'
  },
  {
    level: 'LVL 03 · 2024',
    title: 'Synthetic Imagination',
    subtitle: 'Generative Models & Reasoning Engines',
    desc: 'AI began synthesizing original thought: writing complex software, rendering photorealistic art, and engaging in multi-step conversational reasoning.',
    icon: <Sparkles size={20} color="#ff007f" />,
    badge: 'GENERATIVE',
    glow: '#ff007f'
  },
  {
    level: 'LVL 04 · 2026+',
    title: 'Autonomous Super-Agency',
    subtitle: 'AI Is Changing The World Completely',
    desc: 'Frontier autonomous agents plan, execute, debug, and orchestrate real-world actions. The paradigm has shifted: human thought is no longer bounded by manual labor.',
    icon: <Brain size={20} color="#fbbf24" />,
    badge: 'FRONTIER ERA',
    glow: '#fbbf24'
  }
];

export default function AiEvolutionShowcase() {
  const [activeStage, setActiveStage] = useState(3);

  const handleSelectStage = (idx: number) => {
    setActiveStage(idx);
    playLaserSound();
  };

  const current = EVOLUTION_STAGES[activeStage];

  return (
    <section className="ai-evolution-section" aria-label="AI Paradigm Shift Narrative">
      <div className="ai-evolution-header">
        <div className="arcade-status-tag" style={{ margin: '0 auto 14px' }}>
          <span className="arcade-blink-dot"></span>
          <span>THE PHILOSOPHICAL SHIFT · HUMANITY & AI</span>
        </div>
        <h2 className="ai-evolution-title">
          AI IS CHANGING <span className="arcade-glow-gradient">THE WORLD COMPLETELY</span>
        </h2>
        <p className="ai-evolution-sub">
          It is not merely an upgrade in software — it is a monumental revolution in human thinking, creativity, and the very perspective of what is possible.
        </p>
      </div>

      <div className="ai-evolution-grid">
        {/* Left: Dramatic Artistic Visual */}
        <div className="ai-evolution-visual-card">
          <div className="arcade-crt-screen" style={{ border: `3px solid ${current.glow}` }}>
            <div className="arcade-crt-header">
              <div className="arcade-crt-buttons">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="arcade-crt-title">PARADIGM_SHIFT // PERSPECTIVE_2026</span>
              <span className="arcade-crt-badge" style={{ color: current.glow, background: `${current.glow}18` }}>
                {current.badge}
              </span>
            </div>

            <div className="arcade-artwork-container" style={{ aspectRatio: '16/10' }}>
              <img 
                src="/ai-perspective-shift.jpg" 
                alt="AI is Changing Human Perspective and Thinking"
                className="arcade-artwork-image"
              />
              <div className="ai-art-overlay-pill">
                <span>ART: &ldquo;THE REWIRING OF HUMAN THOUGHT&rdquo;</span>
              </div>
            </div>
          </div>

          <div className="ai-evolution-quote-box">
            <p className="ai-quote-text">
              &ldquo;We are transitioning from tools that obey commands to synthetic partners that expand human imagination and solve frontier challenges.&rdquo;
            </p>
            <div className="ai-quote-author">
              <span>Curated by <strong>Karan Arora</strong> • Chief AI Architect</span>
            </div>
          </div>
        </div>

        {/* Right: Interactive 4-Stage Evolution Selector */}
        <div className="ai-evolution-timeline">
          <div className="ai-timeline-title-row">
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: 0 }}>
              Evolutionary Skill Tree
            </h3>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              Click stage to inspect
            </span>
          </div>

          <div className="ai-stages-list">
            {EVOLUTION_STAGES.map((stage, idx) => {
              const isActive = idx === activeStage;
              return (
                <div 
                  key={stage.level}
                  className={`ai-stage-card ${isActive ? 'active' : ''}`}
                  onClick={() => handleSelectStage(idx)}
                  style={{
                    borderColor: isActive ? stage.glow : 'rgba(255, 255, 255, 0.08)',
                    boxShadow: isActive ? `0 0 25px ${stage.glow}30` : 'none'
                  }}
                >
                  <div className="ai-stage-top">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="ai-stage-icon" style={{ background: `${stage.glow}20`, color: stage.glow }}>
                        {stage.icon}
                      </div>
                      <div>
                        <span className="ai-stage-level" style={{ color: stage.glow }}>{stage.level}</span>
                        <h4 className="ai-stage-name">{stage.title}</h4>
                      </div>
                    </div>
                    <span className="ai-stage-badge" style={{ color: stage.glow, background: `${stage.glow}15`, border: `1px solid ${stage.glow}30` }}>
                      {stage.badge}
                    </span>
                  </div>

                  <p className="ai-stage-desc">
                    {stage.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
