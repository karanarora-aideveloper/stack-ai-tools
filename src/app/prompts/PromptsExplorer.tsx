'use client';

import React, { useState } from 'react';
import PromptCard, { PromptData } from '@/app/components/PromptCard';
import { Sparkles, Terminal, Image as ImageIcon, Code2, FileText, Filter, Search } from 'lucide-react';

export default function PromptsExplorer({ initialPrompts }: { initialPrompts: PromptData[] }) {
  const [selectedTarget, setSelectedTarget] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const targetAIs = ['All', 'Midjourney v8.2', 'Cursor 3.0', 'Claude Sonnet 5', 'ChatGPT (GPT-5.6)'];

  const filteredPrompts = initialPrompts.filter((p) => {
    // Model match
    if (selectedTarget !== 'All') {
      const normTarget = selectedTarget.toLowerCase();
      const pTarget = p.targetAI.toLowerCase();
      if (!pTarget.includes(normTarget) && !normTarget.includes(pTarget)) {
        return false;
      }
    }

    // Type match
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
      const matchTags = p.tags?.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchPrompt && !matchTags) {
        return false;
      }
    }

    return true;
  });

  return (
    <div>
      {/* Search & Filter Bar */}
      <div className="sub-filters-bar" style={{ marginBottom: 28 }}>
        {/* Search */}
        <div className="search-bar" style={{ flex: 1, minWidth: 260 }}>
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search prompts by use case, style, or syntax..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear-btn" onClick={() => setSearchQuery('')}>×</button>
          )}
        </div>

        {/* Output Type Filters */}
        <div className="price-filters-wrap">
          <button
            className={`price-pill ${selectedType === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedType('all')}
          >
            All Outputs
          </button>
          <button
            className={`price-pill ${selectedType === 'image' ? 'active' : ''}`}
            onClick={() => setSelectedType('image')}
          >
            <ImageIcon size={13} style={{ display: 'inline', marginRight: 4 }} />
            Images
          </button>
          <button
            className={`price-pill ${selectedType === 'code' ? 'active' : ''}`}
            onClick={() => setSelectedType('code')}
          >
            <Code2 size={13} style={{ display: 'inline', marginRight: 4 }} />
            Code
          </button>
          <button
            className={`price-pill ${selectedType === 'text' ? 'active' : ''}`}
            onClick={() => setSelectedType('text')}
          >
            <FileText size={13} style={{ display: 'inline', marginRight: 4 }} />
            Text / Reasoning
          </button>
        </div>
      </div>

      {/* Target AI Model Tabs */}
      <div className="category-tabs-container" style={{ marginBottom: 36 }}>
        <div className="category-tabs">
          {targetAIs.map((target) => (
            <button
              key={target}
              className={`category-tab ${selectedTarget === target ? 'active' : ''}`}
              onClick={() => setSelectedTarget(target)}
            >
              <Terminal size={14} style={{ display: 'inline', marginRight: 6 }} />
              {target}
            </button>
          ))}
        </div>
      </div>

      {/* Prompts Count */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
          Showing <strong>{filteredPrompts.length}</strong> curated prompts
        </span>
      </div>

      {/* Prompts Grid */}
      {filteredPrompts.length > 0 ? (
        <div className="prompts-grid">
          {filteredPrompts.map((item) => (
            <PromptCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No prompts match your current filters. Try resetting the search query.</p>
          <button
            className="btn btn-secondary"
            onClick={() => { setSelectedTarget('All'); setSelectedType('all'); setSearchQuery(''); }}
            style={{ marginTop: 12 }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
