'use client';

import React, { useState, useMemo } from 'react';
import PromptCard, { PromptData } from '@/app/components/PromptCard';
import { 
  Sparkles, 
  Terminal, 
  Image as ImageIcon, 
  Code2, 
  FileText, 
  Search, 
  X,
  SlidersHorizontal,
  RotateCcw,
  Zap,
  Flame
} from 'lucide-react';

interface PromptsExplorerProps {
  initialPrompts: PromptData[];
}

const MODEL_ICONS: Record<string, string> = {
  'All Models': '✨',
  'Midjourney v7': '🔥',
  'Midjourney v6.1': '🖼️',
  'Midjourney v8.2': '🎨',
  'Flux.1': '⚡',
  'Cursor 3.0': '💻',
  'Claude Sonnet 5': '🧠',
  'ChatGPT (GPT-5.6)': '🤖',
  'v0.dev': '📐',
  'Lovable.dev': '🚀',
  'Suno v4': '🎵',
};

const SUGGESTED_SEARCHES = [
  'Dragon on Cliff Edge',
  'Vintage Tokyo Street',
  'Full-Stack SaaS Dashboard',
  'Dark Mode System Prompt',
  'Flux.1 Hyper-realistic'
];

export default function PromptsExplorer({ initialPrompts }: PromptsExplorerProps) {
  const [selectedTarget, setSelectedTarget] = useState<string>('All Models');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Dynamically extract all target AI models from the database
  const availableModels = useMemo(() => {
    const set = new Set<string>();
    initialPrompts.forEach(p => {
      if (p.targetAI) set.add(p.targetAI);
    });
    return ['All Models', ...Array.from(set)];
  }, [initialPrompts]);

  // Dynamic counts for models
  const modelCounts = useMemo(() => {
    const counts: Record<string, number> = { 'All Models': initialPrompts.length };
    initialPrompts.forEach(p => {
      if (p.targetAI) {
        counts[p.targetAI] = (counts[p.targetAI] || 0) + 1;
      }
    });
    return counts;
  }, [initialPrompts]);

  // Dynamic counts for output types
  const typeCounts = useMemo(() => {
    const counts = { all: initialPrompts.length, image: 0, code: 0, text: 0 };
    initialPrompts.forEach(p => {
      if (p.outputType === 'image') counts.image++;
      else if (p.outputType === 'code') counts.code++;
      else if (p.outputType === 'text') counts.text++;
    });
    return counts;
  }, [initialPrompts]);

  // Filtered prompts calculation
  const filteredPrompts = useMemo(() => {
    return initialPrompts.filter((p) => {
      // Model match
      if (selectedTarget !== 'All Models') {
        const normTarget = selectedTarget.toLowerCase();
        const pTarget = p.targetAI.toLowerCase();
        if (!pTarget.includes(normTarget) && !normTarget.includes(pTarget)) {
          return false;
        }
      }

      // Output Type match
      if (selectedType !== 'all') {
        if (p.outputType !== selectedType) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchPrompt = p.prompt.toLowerCase().includes(q);
        const matchModel = p.targetAI.toLowerCase().includes(q);
        const matchTags = p.tags?.some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchPrompt && !matchModel && !matchTags) {
          return false;
        }
      }

      return true;
    });
  }, [initialPrompts, selectedTarget, selectedType, searchQuery]);

  const hasActiveFilters = selectedTarget !== 'All Models' || selectedType !== 'all' || searchQuery.trim() !== '';

  const handleResetFilters = () => {
    setSelectedTarget('All Models');
    setSelectedType('all');
    setSearchQuery('');
  };

  return (
    <div className="prompts-vault-container">
      {/* 1. Centered Hero Search Bar */}
      <div className="prompts-search-container">
        <Search size={20} className="prompts-search-icon" />
        <input
          type="text"
          className="prompts-search-input"
          placeholder="Search 37+ production prompts by style, use case, model, or syntax..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button 
            className="prompts-search-clear-btn" 
            onClick={() => setSearchQuery('')}
            title="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Quick Search Suggestions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', marginRight: 4, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <Sparkles size={12} color="#818cf8" />
          <span>Popular:</span>
        </span>
        {SUGGESTED_SEARCHES.map(term => (
          <button
            key={term}
            onClick={() => setSearchQuery(term)}
            style={{ 
              background: 'rgba(255, 255, 255, 0.04)', 
              border: '1px solid rgba(255, 255, 255, 0.08)', 
              borderRadius: 100, 
              padding: '3px 10px', 
              fontSize: 11.5, 
              color: 'var(--text-secondary)', 
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = '#ffffff';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99, 102, 241, 0.4)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.08)';
            }}
          >
            {term}
          </button>
        ))}
      </div>

      {/* 2. Target AI Model Filter Carousel with Live Counts */}
      <div className="prompts-model-pills">
        {availableModels.map((target) => (
          <button
            key={target}
            className={`prompts-model-pill ${selectedTarget === target ? 'active' : ''}`}
            onClick={() => setSelectedTarget(target)}
          >
            <span>{MODEL_ICONS[target] || '✨'}</span>
            <span>{target}</span>
            <span style={{ fontSize: 11, opacity: 0.75, marginLeft: 2 }}>({modelCounts[target] || 0})</span>
          </button>
        ))}
      </div>

      {/* 3. Output Type Toolbar & Results Counter */}
      <div className="prompts-sub-toolbar">
        <div className="prompts-type-filters">
          <button
            className={`prompts-type-pill ${selectedType === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedType('all')}
          >
            <span>All Formats</span>
            <span style={{ opacity: 0.7, fontSize: 11.5 }}>({typeCounts.all})</span>
          </button>
          <button
            className={`prompts-type-pill ${selectedType === 'image' ? 'active' : ''}`}
            onClick={() => setSelectedType('image')}
          >
            <ImageIcon size={13} />
            <span>Visual Images</span>
            <span style={{ opacity: 0.7, fontSize: 11.5 }}>({typeCounts.image})</span>
          </button>
          <button
            className={`prompts-type-pill ${selectedType === 'code' ? 'active' : ''}`}
            onClick={() => setSelectedType('code')}
          >
            <Code2 size={13} />
            <span>Coding & Sandboxes</span>
            <span style={{ opacity: 0.7, fontSize: 11.5 }}>({typeCounts.code})</span>
          </button>
          <button
            className={`prompts-type-pill ${selectedType === 'text' ? 'active' : ''}`}
            onClick={() => setSelectedType('text')}
          >
            <FileText size={13} />
            <span>Text & Reasoning</span>
            <span style={{ opacity: 0.7, fontSize: 11.5 }}>({typeCounts.text})</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className="prompts-counter-pill">
            Showing <strong>{filteredPrompts.length}</strong> curated prompts
          </span>
          {hasActiveFilters && (
            <button
              className="prompts-reset-btn"
              onClick={handleResetFilters}
              title="Reset all filters"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* 4. Prompts Grid Showcase */}
      {filteredPrompts.length > 0 ? (
        <div className="prompts-grid">
          {filteredPrompts.map((item) => (
            <PromptCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="empty-state" style={{ padding: '60px 20px', textAlign: 'center', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 16 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
          <h3 style={{ fontSize: 18, color: '#fff', marginBottom: 8 }}>No prompts matched your search</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, maxWidth: 450, margin: '0 auto 16px' }}>
            No prompt recipes matched &ldquo;{searchQuery || selectedTarget}&rdquo;. Try broadening your keywords or resetting filters.
          </p>
          <button
            className="btn btn-secondary"
            onClick={handleResetFilters}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <RotateCcw size={14} />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
