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
  RotateCcw
} from 'lucide-react';

interface PromptsExplorerProps {
  initialPrompts: PromptData[];
}

const MODEL_ICONS: Record<string, string> = {
  'All Models': '✨',
  'Midjourney v8.2': '🎨',
  'Flux.1': '⚡',
  'Cursor 3.0': '💻',
  'Claude Sonnet 5': '🧠',
  'ChatGPT (GPT-5.6)': '🤖',
  'v0.dev': '📐',
  'Lovable.dev': '🚀',
  'Suno v4': '🎵',
};

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
          placeholder="Search 12+ battle-tested prompts by use case, style, syntax, or model..."
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

      {/* 2. Centered Target AI Model Filter Pills */}
      <div className="prompts-model-pills">
        {availableModels.map((target) => (
          <button
            key={target}
            className={`prompts-model-pill ${selectedTarget === target ? 'active' : ''}`}
            onClick={() => setSelectedTarget(target)}
          >
            <span>{MODEL_ICONS[target] || '✨'}</span>
            <span>{target}</span>
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
            All Outputs ({initialPrompts.length})
          </button>
          <button
            className={`prompts-type-pill ${selectedType === 'image' ? 'active' : ''}`}
            onClick={() => setSelectedType('image')}
          >
            <ImageIcon size={13} />
            <span>Visual Images</span>
          </button>
          <button
            className={`prompts-type-pill ${selectedType === 'code' ? 'active' : ''}`}
            onClick={() => setSelectedType('code')}
          >
            <Code2 size={13} />
            <span>Coding & Sandboxes</span>
          </button>
          <button
            className={`prompts-type-pill ${selectedType === 'text' ? 'active' : ''}`}
            onClick={() => setSelectedType('text')}
          >
            <FileText size={13} />
            <span>Text & Reasoning</span>
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
        <div className="empty-state" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
          <h3 style={{ fontSize: 18, color: '#fff', marginBottom: 8 }}>No prompts matched your search</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, maxWidth: 450, margin: '0 auto 16px' }}>
            No recipes matched &ldquo;{searchQuery || selectedTarget}&rdquo;. Try broadening your keywords or resetting filters.
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
