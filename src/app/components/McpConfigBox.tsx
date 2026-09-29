'use client';

import React, { useState } from 'react';
import { Terminal, Copy, Check, ExternalLink, Cpu, ShieldCheck, Sparkles, BookOpen, Layers } from 'lucide-react';
import { AntigravityMcpServer } from '@/data/antigravity-mcp';

interface McpConfigBoxProps {
  server: AntigravityMcpServer;
}

export default function McpConfigBox({ server }: McpConfigBoxProps) {
  const [activeTab, setActiveTab] = useState<'config' | 'command' | 'prompt'>('config');
  const [copied, setCopied] = useState<string | null>(null);

  const commandSnippet = server.command 
    ? `${server.command} ${server.args?.join(' ') || ''}` 
    : server.serverUrl || 'npx -y @modelcontextprotocol/server';

  const mcpConfigObject = {
    mcpServers: {
      [server.id]: {
        ...(server.command ? { command: server.command } : {}),
        ...(server.args ? { args: server.args } : {}),
        ...(server.serverUrl ? { url: server.serverUrl } : {}),
        ...(server.env ? { env: server.env } : {})
      }
    }
  };

  const configJson = JSON.stringify(mcpConfigObject, null, 2);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="obsidian-card rounded-2xl p-6 md:p-8 border border-cyan-500/30 bg-gradient-to-br from-cyan-950/20 via-zinc-950/80 to-zinc-950/90 shadow-[0_0_30px_rgba(6,182,212,0.08)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase tracking-wider bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 flex items-center gap-1.5">
              <Cpu size={12} className="text-cyan-400" />
              <span>Model Context Protocol (MCP)</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-400 uppercase">
              {server.transport} transport
            </span>
            {server.official && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                Official
              </span>
            )}
          </div>
          <h3 className="text-lg md:text-xl font-bold text-white tracking-tight font-['Geist',sans-serif]">
            MCP Server Runtime &amp; Agent Configuration
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Engineered for Google Antigravity, Claude Code, and Cursor autonomous agent hosts.
          </p>
        </div>

        {server.githubUrl && (
          <a
            href={server.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 text-xs font-mono text-cyan-300 hover:text-cyan-200 transition-colors shrink-0"
          >
            <span>GitHub Repo</span>
            <ExternalLink size={12} />
          </a>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 pt-6 pb-4">
        <button
          onClick={() => setActiveTab('config')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
            activeTab === 'config'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
              : 'text-zinc-400 hover:text-white bg-zinc-900/50 hover:bg-zinc-900 border border-white/[0.06]'
          }`}
        >
          JSON Config
        </button>
        <button
          onClick={() => setActiveTab('command')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
            activeTab === 'command'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
              : 'text-zinc-400 hover:text-white bg-zinc-900/50 hover:bg-zinc-900 border border-white/[0.06]'
          }`}
        >
          Terminal Command
        </button>
        <button
          onClick={() => setActiveTab('prompt')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
            activeTab === 'prompt'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
              : 'text-zinc-400 hover:text-white bg-zinc-900/50 hover:bg-zinc-900 border border-white/[0.06]'
          }`}
        >
          Sample Agent Prompt
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'config' && (
        <div className="relative">
          <div className="flex items-center justify-between px-4 py-2.5 rounded-t-xl bg-zinc-950 border border-white/10 border-b-0 text-[11px] font-mono text-zinc-400">
            <span>claude_desktop_config.json / antigravity.json</span>
            <button
              onClick={() => copyToClipboard(configJson, 'config')}
              className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {copied === 'config' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copied === 'config' ? 'Copied JSON!' : 'Copy Config'}</span>
            </button>
          </div>
          <pre className="p-4 rounded-b-xl bg-zinc-950/95 border border-white/10 overflow-x-auto text-xs font-mono text-zinc-300 leading-relaxed max-h-72">
            <code>{configJson}</code>
          </pre>
        </div>
      )}

      {activeTab === 'command' && (
        <div className="relative">
          <div className="flex items-center justify-between px-4 py-2.5 rounded-t-xl bg-zinc-950 border border-white/10 border-b-0 text-[11px] font-mono text-zinc-400">
            <span>Quickstart CLI Command</span>
            <button
              onClick={() => copyToClipboard(commandSnippet, 'command')}
              className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {copied === 'command' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copied === 'command' ? 'Copied Command!' : 'Copy Command'}</span>
            </button>
          </div>
          <pre className="p-4 rounded-b-xl bg-zinc-950/95 border border-white/10 overflow-x-auto text-xs font-mono text-cyan-300 leading-relaxed flex items-center gap-2">
            <Terminal size={14} className="text-zinc-500 shrink-0" />
            <code>{commandSnippet}</code>
          </pre>
        </div>
      )}

      {activeTab === 'prompt' && (
        <div className="relative">
          <div className="flex items-center justify-between px-4 py-2.5 rounded-t-xl bg-zinc-950 border border-white/10 border-b-0 text-[11px] font-mono text-zinc-400">
            <span>Natural Language Instruction for Agent</span>
            <button
              onClick={() => copyToClipboard(server.samplePrompt, 'prompt')}
              className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {copied === 'prompt' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copied === 'prompt' ? 'Copied Prompt!' : 'Copy Prompt'}</span>
            </button>
          </div>
          <div className="p-4 rounded-b-xl bg-zinc-950/95 border border-white/10 text-xs font-mono text-zinc-300 leading-relaxed">
            &quot;{server.samplePrompt}&quot;
          </div>
        </div>
      )}

      {/* Environment Variables Notice */}
      {server.env && Object.keys(server.env).length > 0 && (
        <div className="mt-4 p-3.5 rounded-xl bg-amber-500/[0.06] border border-amber-500/20 text-xs text-amber-300/90 flex items-start gap-2.5">
          <ShieldCheck size={16} className="text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block font-mono text-[11px] uppercase tracking-wider mb-1">
              Required Environment Variables
            </span>
            <div className="flex flex-wrap gap-2 mt-1">
              {Object.keys(server.env).map((envKey) => (
                <span key={envKey} className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10 font-mono text-[11px] text-zinc-200">
                  {envKey}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Installation Directory Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/[0.06] text-[11px] text-zinc-400 font-mono">
        <div className="flex items-center gap-2">
          <Layers size={13} className="text-cyan-400" />
          <span>Claude Desktop: <code className="text-zinc-300">~/Library/Application Support/Claude/</code></span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles size={13} className="text-violet-400" />
          <span>Antigravity CLI: <code className="text-zinc-300">~/.gemini/antigravity/mcp/</code></span>
        </div>
      </div>
    </div>
  );
}
