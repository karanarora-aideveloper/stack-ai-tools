'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Code2, 
  ArrowRight, 
  CheckCircle2,
  Terminal,
  Database,
  Globe,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

type QuizState = 'start' | 'q1' | 'q2' | 'q3' | 'result';

export default function VibeCoderQuiz() {
  const [state, setState] = useState<QuizState>('start');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleNext = (q: string, a: string, nextState: QuizState) => {
    setAnswers(prev => ({ ...prev, [q]: a }));
    setState(nextState);
  };

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'vibe_coder_quiz' }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message);
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Failed to connect to the server.');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12 relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-8 sm:p-12 shadow-2xl">
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        {state === 'start' && (
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center p-3 bg-zinc-900 border border-zinc-800 rounded-2xl mb-4">
              <Sparkles className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Find Your Perfect <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                AI Coding Stack
              </span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-xl mx-auto">
              Answer 3 quick questions to get a personalized, 1-click installable 2026 AI tool stack optimized for your workflow.
            </p>
            <button 
              onClick={() => setState('q1')}
              className="mt-4 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors inline-flex items-center gap-2"
            >
              Start Quiz <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {state === 'q1' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-bold text-white text-center">What is your primary development environment?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <button onClick={() => handleNext('ide', 'vscode', 'q2')} className="p-6 text-left border border-zinc-800 rounded-2xl hover:bg-zinc-900 hover:border-zinc-700 transition-all group">
                <Terminal className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-white text-lg">VS Code / Cursor</h4>
                <p className="text-zinc-400 text-sm mt-1">I live in the terminal and write code locally.</p>
              </button>
              <button onClick={() => handleNext('ide', 'browser', 'q2')} className="p-6 text-left border border-zinc-800 rounded-2xl hover:bg-zinc-900 hover:border-zinc-700 transition-all group">
                <Globe className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-white text-lg">Browser / Cloud</h4>
                <p className="text-zinc-400 text-sm mt-1">I prefer Replit, IDX, or web-based workflows.</p>
              </button>
            </div>
          </div>
        )}

        {state === 'q2' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-bold text-white text-center">What are you primarily building?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <button onClick={() => handleNext('type', 'frontend', 'q3')} className="p-6 text-left border border-zinc-800 rounded-2xl hover:bg-zinc-900 hover:border-zinc-700 transition-all group">
                <Code2 className="w-8 h-8 text-teal-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-white text-lg">Frontend / UI</h4>
                <p className="text-zinc-400 text-sm mt-1">React, Next.js, mobile apps, beautiful interfaces.</p>
              </button>
              <button onClick={() => handleNext('type', 'backend', 'q3')} className="p-6 text-left border border-zinc-800 rounded-2xl hover:bg-zinc-900 hover:border-zinc-700 transition-all group">
                <Database className="w-8 h-8 text-orange-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-white text-lg">Backend / Data</h4>
                <p className="text-zinc-400 text-sm mt-1">APIs, databases, Python scripts, ML pipelines.</p>
              </button>
            </div>
          </div>
        )}

        {state === 'q3' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-bold text-white text-center">What's your preferred AI agent style?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <button onClick={() => handleNext('style', 'copilot', 'result')} className="p-6 text-left border border-zinc-800 rounded-2xl hover:bg-zinc-900 hover:border-zinc-700 transition-all group">
                <Sparkles className="w-8 h-8 text-yellow-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-white text-lg">The Co-pilot</h4>
                <p className="text-zinc-400 text-sm mt-1">I want autocomplete and chat, but I write the architecture.</p>
              </button>
              <button onClick={() => handleNext('style', 'autonomous', 'result')} className="p-6 text-left border border-zinc-800 rounded-2xl hover:bg-zinc-900 hover:border-zinc-700 transition-all group">
                <Terminal className="w-8 h-8 text-red-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-white text-lg">The Autonomous Agent</h4>
                <p className="text-zinc-400 text-sm mt-1">I want to give a prompt and let it write entire files/projects.</p>
              </button>
            </div>
          </div>
        )}

        {state === 'result' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-2">Your 2026 Vibe Coder Stack</h3>
              <p className="text-zinc-400">Based on your workflow, here is your optimized setup:</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {answers.ide === 'vscode' ? (
                <Link href="/tool/cursor" className="block p-4 border border-zinc-800 rounded-xl bg-zinc-900/50 hover:bg-zinc-800 transition-colors text-center">
                  <div className="w-12 h-12 rounded-lg bg-black flex items-center justify-center mx-auto mb-3">
                    <img src="https://mintlify.s3-us-west-1.amazonaws.com/cursor/images/logo/cursor-mark.svg" alt="Cursor" className="w-8 h-8" />
                  </div>
                  <div className="font-semibold text-white">Cursor IDE</div>
                  <div className="text-xs text-zinc-500 mt-1">Primary Environment</div>
                </Link>
              ) : (
                <Link href="/tool/lovable" className="block p-4 border border-zinc-800 rounded-xl bg-zinc-900/50 hover:bg-zinc-800 transition-colors text-center">
                  <div className="w-12 h-12 rounded-lg bg-black flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-white">L</span>
                  </div>
                  <div className="font-semibold text-white">Lovable.dev</div>
                  <div className="text-xs text-zinc-500 mt-1">Primary Environment</div>
                </Link>
              )}

              {answers.style === 'autonomous' ? (
                <Link href="/tool/devin" className="block p-4 border border-zinc-800 rounded-xl bg-zinc-900/50 hover:bg-zinc-800 transition-colors text-center">
                  <div className="w-12 h-12 rounded-lg bg-black flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-white">D</span>
                  </div>
                  <div className="font-semibold text-white">Devin / Roo Code</div>
                  <div className="text-xs text-zinc-500 mt-1">Autonomous Agent</div>
                </Link>
              ) : (
                <Link href="/tool/github-copilot" className="block p-4 border border-zinc-800 rounded-xl bg-zinc-900/50 hover:bg-zinc-800 transition-colors text-center">
                  <div className="w-12 h-12 rounded-lg bg-black flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-white">GH</span>
                  </div>
                  <div className="font-semibold text-white">GitHub Copilot</div>
                  <div className="text-xs text-zinc-500 mt-1">Inline Assistant</div>
                </Link>
              )}

              <Link href="/antigravity-mcp" className="block p-4 border border-zinc-800 rounded-xl bg-zinc-900/50 hover:bg-zinc-800 transition-colors text-center">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-6 h-6 text-blue-400" />
                </div>
                <div className="font-semibold text-white">Brave Search MCP</div>
                <div className="text-xs text-zinc-500 mt-1">Context / Research</div>
              </Link>
              
              <Link href={answers.type === 'frontend' ? "/tool/v0" : "/claude-connectors"} className="block p-4 border border-zinc-800 rounded-xl bg-zinc-900/50 hover:bg-zinc-800 transition-colors text-center">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                  <Code2 className="w-6 h-6 text-purple-400" />
                </div>
                <div className="font-semibold text-white">{answers.type === 'frontend' ? 'v0 by Vercel' : 'Postgres MCP'}</div>
                <div className="text-xs text-zinc-500 mt-1">{answers.type === 'frontend' ? 'UI Generation' : 'Database Access'}</div>
              </Link>
            </div>

            <div className="mt-8 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
              <h4 className="text-lg font-semibold text-white mb-2">Want to stay updated?</h4>
              <p className="text-sm text-zinc-400 mb-4">Join 12,000+ engineers getting the best new AI tools in their inbox weekly.</p>
              
              {status === 'success' ? (
                <div className="flex items-center gap-2 text-green-400 font-medium p-3 bg-green-400/10 rounded-lg">
                  <CheckCircle2 className="w-5 h-5" /> {message}
                </div>
              ) : (
                <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-zinc-600"
                    required
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Subscribe'}
                  </button>
                </form>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-sm mt-2">{message}</p>
              )}
            </div>
            
            <div className="text-center">
              <button onClick={() => setState('start')} className="text-sm text-zinc-500 hover:text-white transition-colors">
                Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
