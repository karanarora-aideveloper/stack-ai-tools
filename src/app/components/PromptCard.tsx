'use client';

import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Sparkles, 
  ExternalLink, 
  Code2, 
  Eye, 
  Terminal, 
  User, 
  Image as ImageIcon,
  FileText
} from 'lucide-react';

export interface PromptData {
  id: string | number;
  title: string;
  targetAI: string;
  category: string;
  prompt: string;
  outputType?: 'image' | 'code' | 'text';
  outputImageUrl?: string | null;
  outputPreview?: string | null;
  author?: string | null;
  aspectRatio?: string | null;
  tags?: string[];
}

export default function PromptCard({ item }: { item: PromptData }) {
  const [activeTab, setActiveTab] = useState<'prompt' | 'output'>('prompt');
  const [copied, setCopied] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(item.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    import('@/lib/analytics').then(({ trackClientEvent }) => {
      trackClientEvent('prompt_copy', {
        promptTitle: item.title,
        category: item.category,
        metadata: {
          targetAI: item.targetAI,
          promptId: item.id
        }
      });
    }).catch(() => {});
  };

  const handleCopyOutput = () => {
    if (item.outputPreview) {
      navigator.clipboard.writeText(item.outputPreview);
      setCopiedOutput(true);
      setTimeout(() => setCopiedOutput(false), 2000);
    }
  };

  const isImage = item.outputType === 'image' && item.outputImageUrl;

  return (
    <div className={`prompt-card ${isImage ? 'prompt-card-visual' : ''}`}>
      {/* Visual Image Showcase (For Midjourney & Design Prompts) */}
      {isImage && (
        <div className="prompt-visual-header">
          <div className="prompt-image-container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={item.outputImageUrl!} 
              alt={`Generated result for ${item.title}`} 
              className="prompt-result-image"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="prompt-image-overlay">
              <span className="output-tag">
                <ImageIcon size={12} />
                <span>Generated Output</span>
              </span>
              {item.aspectRatio && (
                <span className="aspect-tag">{item.aspectRatio}</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Card Header */}
      <div className="prompt-header">
        <div>
          <div className="prompt-meta-top">
            <span className="prompt-target-pill">{item.targetAI}</span>
            <span className="prompt-cat-pill">{item.category}</span>
          </div>
          <h3 className="prompt-title">{item.title}</h3>
          {item.author && (
            <span className="prompt-author">
              <User size={12} />
              <span>By {item.author}</span>
            </span>
          )}
        </div>
      </div>

      {/* Interactive Tabs for Code and Text outputs */}
      {!isImage && item.outputPreview && (
        <div className="prompt-view-tabs">
          <button 
            className={`prompt-tab-btn ${activeTab === 'prompt' ? 'active' : ''}`}
            onClick={() => setActiveTab('prompt')}
          >
            <FileText size={13} />
            <span>Prompt</span>
          </button>
          <button 
            className={`prompt-tab-btn ${activeTab === 'output' ? 'active' : ''}`}
            onClick={() => setActiveTab('output')}
          >
            {item.outputType === 'code' ? <Terminal size={13} /> : <Eye size={13} />}
            <span>Generated Result</span>
          </button>
        </div>
      )}

      {/* Main Content Body */}
      {(!isImage && activeTab === 'output' && item.outputPreview) ? (
        <div className="prompt-content output-code-box">
          <pre><code>{item.outputPreview}</code></pre>
        </div>
      ) : (
        <div className="prompt-content">
          <code>{item.prompt}</code>
        </div>
      )}

      {/* Footer / Actions */}
      <div className="prompt-footer">
        <div className="prompt-tags">
          {item.tags && item.tags.slice(0, 2).map(tag => (
            <span key={tag} className="tool-tag">{tag}</span>
          ))}
        </div>

        <div className="prompt-actions">
          {!isImage && activeTab === 'output' && item.outputPreview ? (
            <button 
              className={`copy-btn ${copiedOutput ? 'copied' : ''}`}
              onClick={handleCopyOutput}
            >
              {copiedOutput ? (
                <>
                  <Check size={14} />
                  <span>Copied Result!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Result</span>
                </>
              )}
            </button>
          ) : (
            <button 
              className={`copy-btn ${copied ? 'copied' : ''}`}
              onClick={handleCopyPrompt}
            >
              {copied ? (
                <>
                  <Check size={14} />
                  <span>Copied Prompt!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
