import { PrismaClient } from '@prisma/client';
import { aiTools as staticTools, promptLibrary as staticPrompts, AITool, PromptItem } from '@/data';
import { getAffiliateInfo, AffiliateProgramInfo } from './affiliates';
import dbToolsSeed from '@/data/db-tools-seed.json';
import { ANTIGRAVITY_MCP_SERVERS, AntigravityMcpServer } from '@/data/antigravity-mcp';

let prisma: PrismaClient | null = null;
export function getPrisma(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}

const EXCLUDED_COMMODITY_TOOLS = new Set<string>();

// Curated slug mapping for cleaner, high-intent SEO URLs.
// IMPORTANT: keys must match tool names or common variations.
const SLUG_MAP: Record<string, string> = {
  // Frontier Coding Agents & IDEs
  'Devin AI (Cognition Labs)': 'devin',
  'Devin AI': 'devin',
  'Claude Code (Anthropic CLI)': 'claude-code',
  'Claude Code': 'claude-code',
  'Claude Opus 5.5 & Sonnet 5 (Anthropic)': 'claude',
  'Claude Sonnet 5 & Artifacts (Anthropic)': 'claude',
  'Claude Sonnet 5': 'claude',
  'Claude': 'claude',
  'Cursor 4.0 (Composer 2.0 Agents)': 'cursor',
  'Cursor 3.1 (Composer Agents)': 'cursor',
  'Cursor AI (Anysphere)': 'cursor',
  'Cursor AI': 'cursor',
  'Cursor': 'cursor',
  'Windsurf by Codeium': 'windsurf',
  'Windsurf (Codeium)': 'windsurf',
  'Windsurf': 'windsurf',
  'Agent Zero (Autonomous Linux Agent)': 'agent-zero',
  'Agent Zero': 'agent-zero',
  'Aider AI Pair Programmer': 'aider',
  'Aider AI': 'aider',
  'Aider': 'aider',
  'Bolt.new': 'bolt-new',
  'Lovable.dev': 'lovable',
  'v0 by Vercel': 'v0',
  'v0': 'v0',
  'Roo Code (Roomote)': 'roo-code',
  'Roo Code': 'roo-code',
  'Trae AI (ByteDance)': 'trae-ai',
  'Trae AI': 'trae-ai',
  'Trae': 'trae-ai',
  'Zed AI': 'zed-ai',
  'Zed': 'zed-ai',
  'PearAI': 'pearai',
  'Goose (Block)': 'goose-ai',
  'Goose': 'goose-ai',
  'Letta (MemGPT)': 'letta-ai',
  'Letta': 'letta-ai',
  'MemGPT': 'letta-ai',
  'Open Interpreter': 'open-interpreter',
  'Mintlify': 'mintlify',
  'Qodo (Codium)': 'qodo',
  'Qodo': 'qodo',
  'CodiumAI': 'qodo',
  'Character.AI': 'character-ai',
  'Microsoft Copilot': 'microsoft-copilot',
  'Meta AI': 'meta-ai',
  'Pi AI (Inflection)': 'pi-ai',
  'Pi AI': 'pi-ai',
  'Pi': 'pi-ai',

  // Frontier Reasoning & LLMs
  'GPT Extra (OpenAI Reasoning & Tool Engine)': 'gpt-extra',
  'GPT Extra': 'gpt-extra',
  'Grok 3 (xAI Reasoning Engine)': 'grok-3',
  'Grok 3': 'grok-3',
  'Manus AI (Autonomous General Agent)': 'manus-ai',
  'Manus AI': 'manus-ai',
  'OpenAI GPT-6 Astra & Sol (Frontier Reasoning Engine)': 'gpt-6',
  'OpenAI GPT-6': 'gpt-6',
  'GPT-6 Astra & Sol': 'gpt-6',
  'GPT-6 Astra': 'gpt-6',
  'GPT-6 Sol': 'gpt-6',
  'GPT-6': 'gpt-6',
  'OpenAI o3 & o3-mini (Reasoning Engine)': 'openai-o3',
  'ChatGPT Plus & Team (OpenAI)': 'chatgpt',
  'ChatGPT (GPT-5.6 Frontier)': 'chatgpt',
  'ChatGPT': 'chatgpt',
  'Google Gemini 3.8 Flash & 3.1 Pro': 'gemini',
  'Google Gemini 3.8 Flash': 'gemini',
  'Google Gemini': 'gemini',
  'DeepSeek-V4.1-Flash & V4 Pro (Open MoE & Reasoning Engine)': 'deepseek-r1',
  'DeepSeek-R1 & V3 (Open Reasoning Engine)': 'deepseek-r1',
  'DeepSeek V4 (Open Reasoning Engine)': 'deepseek-r1',
  'DeepSeek': 'deepseek-r1',
  'Perplexity Pro (Deep Research)': 'perplexity',
  'Perplexity AI': 'perplexity',
  'Perplexity': 'perplexity',
  'Mistral AI (Le Chat & Pixtral)': 'mistral-ai',
  'Mistral AI': 'mistral-ai',
  'Groq LPU (Ultra-Fast Inference)': 'groq',
  'Groq': 'groq',

  // Generative Media, Image & Video
  'Midjourney V8.2': 'midjourney',
  'Midjourney v8.1': 'midjourney',
  'Midjourney': 'midjourney',
  'FLUX 3 Action & FLUX.2 Max': 'flux',
  'Flux.1 by Black Forest Labs': 'flux',
  'Flux.1 (Black Forest Labs)': 'flux',
  'FLUX.1': 'flux',
  'Flux': 'flux',
  'Runway Gen-3 Alpha & Gen-4.5': 'runway',
  'Runway Gen-4.5': 'runway',
  'Runway': 'runway',
  'Luma Dream Machine (Ray 3)': 'luma-dream-machine',
  'Luma Dream Machine': 'luma-dream-machine',
  'Kling 3.0': 'kling-ai',
  'Kling AI': 'kling-ai',
  'Pika 2.5': 'pika-20',
  'Pika': 'pika-20',
  'Hailuo H3 (MiniMax)': 'hailuo-ai',
  'Hailuo AI': 'hailuo-ai',
  'Leonardo Phoenix 2.0': 'leonardo-ai',
  'Leonardo.ai': 'leonardo-ai',
  'Ideogram 4.0': 'ideogram-20',
  'Ideogram': 'ideogram-20',
  'Recraft V4.1': 'recraft-v3',
  'Recraft': 'recraft-v3',
  'Magnific AI (Precision V2)': 'magnific-ai',
  'Magnific AI': 'magnific-ai',
  'Krea 2 (K2) Real-time': 'krea-ai',
  'Krea AI': 'krea-ai',
  'ComfyUI Modular Diffusion': 'comfyui',
  'ComfyUI': 'comfyui',
  'HeyGen AI Video': 'heygen',
  'HeyGen Interactive Video': 'heygen',
  'HeyGen': 'heygen',
  'Synthesia 3.0 (Video Agents)': 'synthesia',
  'Synthesia': 'synthesia',
  'Opus Clip 3.0': 'opus-clip',
  'Opus Clip': 'opus-clip',
  'CapCut AI Studio (Video Studio)': 'capcut',
  'CapCut AI': 'capcut',

  // Voice & Audio
  'ElevenLabs Voice AI': 'elevenlabs',
  'ElevenLabs (Eleven v3)': 'elevenlabs',
  'ElevenLabs': 'elevenlabs',
  'Cartesia (Sonic-3.6)': 'cartesia',
  'Cartesia': 'cartesia',
  'Suno v4 & v5.5 (AI Music Studio)': 'suno-v4',
  'Suno v5.5': 'suno-v4',
  'Suno': 'suno-v4',
  'Udio v1.5 & v2 (Studio Music)': 'udio-v15',
  'Udio v4': 'udio-v15',
  'Udio': 'udio-v15',
  'Murf AI (Speech Gen 2)': 'murf-ai',
  'Murf AI': 'murf-ai',
  'Descript (Studio Sound 2.0)': 'descript',
  'Descript Studio Sound': 'descript',
  'Descript': 'descript',

  // Workflow, Agents & Frameworks
  'AutoGPT (Autonomous AGI Agent)': 'autogpt',
  'AutoGPT': 'autogpt',
  'AgentGPT': 'agentgpt',
  'AutoGen (Microsoft Multi-Agent)': 'autogen',
  'AutoGen': 'autogen',
  'LangChain & LangGraph': 'langchain',
  'LangChain': 'langchain',
  'LangGraph Stateful Orchestration': 'langgraph',
  'LangGraph': 'langgraph',
  'CrewAI Multi-Agent Teams': 'crewai',
  'CrewAI': 'crewai',
  'Dify.ai Enterprise LLM': 'dify',
  'Dify.ai': 'dify',
  'Dify': 'dify',
  'Make.com Enterprise AI': 'make',
  'Make.com (Integromat)': 'make',
  'Make.com': 'make',
  'Make': 'make',
  'n8n AI Agents': 'n8n',
  'n8n': 'n8n',
  'Zapier Central Agents': 'zapier-central',
  'Zapier Central': 'zapier-central',
  'Clay.com AI B2B Data Engine': 'clay',
  'Clay': 'clay',
  'Fireflies.ai Meeting Copilot': 'fireflies',
  'Fireflies.ai': 'fireflies',
  'Fathom Video Notetaker': 'fathom',
  'Fathom': 'fathom',
  'Notion AI Workspace': 'notion-ai',
  'Notion AI': 'notion-ai',
  'Gamma 3.0 (Gamma Agent)': 'gamma',
  'Gamma': 'gamma',
  'Jasper AI Brand Voice': 'jasper-ai',
  'Jasper AI': 'jasper-ai',
  'Copy.ai GTM Agents': 'copy-ai',
  'Copy.ai': 'copy-ai',
  '11x.ai (Alice & Jordan - AI Workers)': '11xai',
  '11x.ai': '11xai',
  '11x AI': '11xai',
  'Artisan AI (Ava - AI BDR)': 'artisan-ai',
  'Artisan AI': 'artisan-ai',
  'Artisan': 'artisan-ai',
  'Air AI (Conversational Sales Agents)': 'air-ai',
  'Air AI': 'air-ai',
  'Readwise Reader AI': 'readwise',
  'Readwise': 'readwise',
  'Superhuman AI Copilot': 'superhuman',
  'Superhuman': 'superhuman',

  // Organic Search Targets
  'Lenso AI': 'lenso-ai',
  'OurDream AI': 'ourdream-ai',
  'Candy AI': 'candy-ai',
  'Yollo AI': 'yollo-ai',
  'Dreemy AI': 'dreemy-ai',
  'ChatUp AI': 'chatup-ai',
  'SoulGen': 'soulgen',
  'Flipped Chat': 'flipped-chat',
  'Sigma Face Generator': 'sigma-face',
  'Darlink AI': 'darlink-ai',
  'Unlucid AI': 'unlucid-ai',
  'Supio AI': 'supio',
  'Jenova AI': 'jenova-ai',
  'Dezgo': 'dezgo',
  'TinyWow AI': 'tinywow',
  'BytePlus AI': 'byteplus',
  'HackerAI': 'hackerai',
  'CrushOn.AI': 'crushonai',
  'MotionMuse AI': 'motionmuse',
  'Literfy AI': 'literfy',
  'Kirkify AI': 'kirkify-ai',
  'Unhinged AI': 'unhinged-ai',
  'TalkToTransformer': 'talktotransformer',
  'Surfer SEO': 'surfer-seo'
};

// Aliases mapping old or GSC indexed URLs to canonical slugs.
// This guarantees that any historical link or backlink never returns 404.
export const SLUG_ALIASES: Record<string, string> = {
  'chatgpt-gpt-56-frontier': 'chatgpt',
  'chatgpt-plus-team-openai': 'chatgpt',
  'google-gemini-38-flash': 'gemini',
  'google-gemini-38-flash-31-pro': 'gemini',
  'windsurf-by-codeium': 'windsurf',
  'windsurf-codeium': 'windsurf',
  'agent-zero-autonomous-linux-agent': 'agent-zero',
  'flux1-black-forest-labs': 'flux',
  'flux1-by-black-forest-labs': 'flux',
  'flux-3-action-flux2-max': 'flux',
  'autogpt-autonomous-agi-agent': 'autogpt',
  'devin-ai-cognition-labs': 'devin',
  'cursor-31-composer-agents': 'cursor',
  'cursor-40-composer-20-agents': 'cursor',
  'cursor-ai-anysphere': 'cursor',
  'claude-sonnet-5-artifacts-anthropic': 'claude',
  'claude-opus-55-sonnet-5-anthropic': 'claude',
  'claude-code-anthropic-cli': 'claude-code',
  'boltnew': 'bolt-new',
  'lovabledev': 'lovable',
  'difyai': 'dify',
  'dify-ai-enterprise-llm': 'dify',
  '11x-ai': '11xai',
  '11x': '11xai',
  '11xai-alice-jordan-ai-workers': '11xai',
  'descript-studio-sound-20': 'descript',
  'descript-studio-sound': 'descript',
  'midjourney-v81': 'midjourney',
  'midjourney-v82': 'midjourney',
  'runway-gen-45': 'runway',
  'runway-gen-3-alpha-gen-45': 'runway',
  'elevenlabs-eleven-v3': 'elevenlabs',
  'suno-v55': 'suno-v4',
  'suno-v4-v55-ai-music-studio': 'suno-v4',
  'udio-v15-v2-studio-music': 'udio-v15',
  'udio-v4': 'udio-v15',
  'fathom-video-notetaker': 'fathom',
  'claycom-ai-b2b-data-engine': 'clay',
  'makecom-integromat': 'make',
  'makecom-enterprise-ai': 'make',
  'firefliesai-meeting-copilot': 'fireflies',
  'firefliesai': 'fireflies',
  'jasper-ai-brand-voice': 'jasper-ai',
  'copyai-gtm-agents': 'copy-ai',
  'copyai': 'copy-ai',
  'synthesia-30-video-agents': 'synthesia',
  'gamma-30-gamma-agent': 'gamma',
  'opus-clip-30': 'opus-clip',
  'murf-ai-speech-gen-2': 'murf-ai',
  'readwise-reader-ai': 'readwise',
  'krea-2-k2-real-time': 'krea-ai',
  'pika-25': 'pika-20',
  'ideogram-40': 'ideogram-20',
  'recraft-v41': 'recraft-v3',
  'capcut-ai-studio-video-studio': 'capcut',
  'zapier-central-agents': 'zapier-central',
  'vapi-ai-voice-agents': 'vapi',
  'retell-ai-conversational-voice': 'retell-ai',
  'synthflow-ai-voice-automation': 'synthflow',
  'bolna-ai-open-voice-agents': 'bolna',
  'uipath-ai-automation': 'uipath',
  'air-ai-conversational-sales-agents': 'air-ai',
  'roo-code-roomote': 'roo-code',
  'hailuo-h3-minimax': 'hailuo-ai',
  'openai-gpt-6-astra-sol-frontier-reasoning-engine': 'gpt-6',
  'openai-gpt-6': 'gpt-6',
  'gpt6': 'gpt-6',
  'gpt-6': 'gpt-6',
  'gpt-6-astra': 'gpt-6',
  'gpt-6-sol': 'gpt-6',
  'openai-o3-o3-mini-reasoning-engine': 'openai-o3',
  'deepseek-v41-flash-v4-pro-open-moe-reasoning-engine': 'deepseek-r1',
  'deepseek-r1-v3-open-reasoning-engine': 'deepseek-r1',
  'deepseek-v4-open-reasoning-engine': 'deepseek-r1',
  'crewai-multi-agent-teams': 'crewai',
  'langchain-langgraph': 'langchain',
  'artisan-ai-ava-ai-bdr': 'artisan-ai',
  'artisan': 'artisan-ai',
  'leonardo-phoenix-20': 'leonardo-ai',
  'luma-dream-machine-ray-3': 'luma-dream-machine',
  'magnific-ai-precision-v2': 'magnific-ai',
  'otterai': 'otter-ai',
  'captionsai': 'captions',
  'kling-30': 'kling-ai',
  'memai': 'mem-ai',
  'lindyai': 'lindy-ai',
  'stockimgai': 'stockimg-ai',
  'visualagentsai': 'visualagents-ai',
  'scrapenew': 'scrape-new',
  'speaqai': 'speaq-ai',
  'jaceai': 'jace-ai',
  'cartesia-sonic-36': 'cartesia',
  'gptextra': 'gpt-extra',
  'chatgpt-extra': 'gpt-extra',
  'gpt-extra-ai': 'gpt-extra',
  'gpt-extra-openai-reasoning-tool-engine': 'gpt-extra',
  'grok': 'grok-3',
  'grok3': 'grok-3',
  'xai-grok': 'grok-3',
  'grok-3-xai-reasoning-engine': 'grok-3',
  'manus': 'manus-ai',
  'manusai': 'manus-ai',
  'manus-ai-autonomous-general-agent': 'manus-ai',
  'characterai': 'character-ai',
  'c-ai': 'character-ai',
  'character-ai-writing': 'character-ai',
  'trae': 'trae-ai',
  'traeai': 'trae-ai',
  'zed': 'zed-ai',
  'zedai': 'zed-ai',
  'pear-ai': 'pearai',
  'goose': 'goose-ai',
  'block-goose': 'goose-ai',
  'letta': 'letta-ai',
  'memgpt': 'letta-ai',
  'openinterpreter': 'open-interpreter',
  'codium': 'qodo',
  'codiumai': 'qodo',
  'copilot': 'microsoft-copilot',
  'bing-copilot': 'microsoft-copilot',
  'metaai': 'meta-ai',
  'llama-meta-ai': 'meta-ai',
  'piai': 'pi-ai'
};

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getCategorySlug(category: string): string {
  const norm = (category || '').toLowerCase().trim();
  if (norm.includes('mcp') || norm.includes('coding agents')) {
    return 'mcp-coding-agents';
  }
  return norm.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'all';
}

export function getToolSlug(tool: AITool | { name: string } | string): string {
  const name = typeof tool === 'string' ? tool : tool?.name || '';
  if (SLUG_MAP[name]) {
    return SLUG_MAP[name];
  }
  return slugify(name);
}

export interface EnrichedTool extends AITool {
  slug: string;
  pros?: string[];
  cons?: string[];
  keyUseCases?: string[];
  bestFor?: string;
  startingPrice?: string;
  primaryUseCase?: string;
  useCases?: string[];
  complexity?: 'Intermediate' | 'Advanced' | 'Frontier Engineering';
  architectureStack?: string[];
  idealFor?: string;
  affiliateProgramUrl?: string;
  affiliateStatus?: 'active' | 'pending' | 'not_applied' | 'direct';
  commissionRate?: string;
  affiliateNetwork?: string;
  affiliateNotes?: string;
  cookieDays?: number;
  mcpData?: AntigravityMcpServer;
}

function extractDomain(link?: string, existingDomain?: string, toolName?: string): string {
  if (existingDomain && existingDomain.trim()) {
    // Prevent accidental remnant 'scispace.com' fallback on non-SciSpace tools
    if (existingDomain.includes('scispace.com') && toolName && !toolName.toLowerCase().includes('scispace')) {
      // Fall through to link extraction
    } else {
      return existingDomain.trim();
    }
  }
  if (!link) return 'Official Site';
  try {
    const url = link.startsWith('http') ? link : `https://${link}`;
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, '');
    return host || 'Official Site';
  } catch {
    return 'Official Site';
  }
}

function getCategoryUseCases(category: string, name: string): string[] {
  const cat = (category || '').toLowerCase();
  if (cat.includes('code') || cat.includes('developer') || cat.includes('mcp')) {
    return [
      `Autonomous multi-file codebase refactoring and pull request generation with ${name}`,
      `Real-time context-aware syntax completion, error diagnosis, and vulnerability remediation`,
      `Seamless CLI and IDE terminal automation with local sandbox execution`
    ];
  }
  if (cat.includes('video')) {
    return [
      `High-fidelity video synthesis and storyboard scene generation with temporal consistency`,
      `Photorealistic AI avatars with zero-shot multi-language voice and lip synchronization`,
      `Automated social media aspect ratio reframing, viral clip extraction, and scene pacing`
    ];
  }
  if (cat.includes('audio') || cat.includes('voice') || cat.includes('speech')) {
    return [
      `Ultra-low latency conversational voice generation with dynamic emotional inflection`,
      `Studio-grade voice cloning and accent modulation across 30+ international languages`,
      `Automated acoustic cleanup, background noise removal, and master audio leveling`
    ];
  }
  if (cat.includes('design') || cat.includes('image') || cat.includes('creative')) {
    return [
      `Photorealistic concept art, high-resolution product photography, and UI asset drafting`,
      `Generative inpainting, outpainting canvas expansion, and high-frequency upscaling`,
      `Custom vector illustration and brand asset creation adhering to design style guidelines`
    ];
  }
  if (cat.includes('writing') || cat.includes('content') || cat.includes('copy')) {
    return [
      `Long-form technical documentation, research papers, and structured SEO article drafting`,
      `Persona-driven copywriting for high-converting sales sequences and brand campaigns`,
      `Multi-source document synthesis, executive briefing generation, and style transfer`
    ];
  }
  if (cat.includes('automation') || cat.includes('agent') || cat.includes('productivity')) {
    return [
      `Multi-step event-driven API orchestration connecting cloud SaaS apps with ${name}`,
      `Autonomous agent task queues with continuous failure monitoring and self-healing logic`,
      `Automated unstructured data extraction, document ingestion, and CRM synchronization`
    ];
  }
  return [
    `Accelerating day-to-day knowledge work and team operations with ${name}`,
    `Automating repetitive asset generation and cross-platform publishing pipelines`,
    `Enhancing team throughput with contextual AI intelligence and real-time collaboration`
  ];
}

function getCategoryPros(category: string, name: string): string[] {
  const cat = (category || '').toLowerCase();
  if (cat.includes('code') || cat.includes('mcp')) {
    return [
      'High accuracy on complex multi-step reasoning and algorithmic tasks',
      'Native support for modern engineering toolchains and IDE integrations',
      'Context-aware repo indexing with low-latency prompt completions',
      'Enterprise data privacy options and private repo security safeguards'
    ];
  }
  if (cat.includes('video')) {
    return [
      'Industry-leading visual fidelity with realistic lighting and physical simulations',
      'Temporal coherence across video frames minimizing visual jitter and morphing',
      'Fast cloud rendering pipelines with flexible multi-aspect export options',
      'Intuitive timeline controls and cinematic camera motion direction'
    ];
  }
  if (cat.includes('audio') || cat.includes('voice')) {
    return [
      'Indistinguishable from professional human voice talent with natural breath and pacing',
      'Sub-150ms streaming latency suitable for real-time conversational agents',
      'Extensive multilingual library covering diverse dialects and tone registers',
      'High dynamic range output with zero audible compression distortion'
    ];
  }
  if (cat.includes('design') || cat.includes('image')) {
    return [
      'Exceptional prompt adherence and fine-grained spatial composition control',
      'Pristine text and typography rendering within generated graphics',
      'Versatile style ranges from photorealistic photography to vector minimalism',
      'Rapid iterative generation with intuitive outpainting and inpainting canvases'
    ];
  }
  if (cat.includes('writing')) {
    return [
      'Nuanced domain-specific knowledge retention across long-form documents',
      'Clean output formatting requiring minimal editorial post-processing',
      'Deep context memory with support for expansive reference material uploads',
      'Flexible tone customization matching distinctive brand guidelines'
    ];
  }
  return [
    'Leading 2026 frontier model architecture and optimized compute efficiency',
    'Intuitive modern web interface and frictionless onboarding flow',
    'Robust integration ecosystem and multi-platform cloud connectivity',
    'Enterprise-grade security and compliant data handling practices'
  ];
}

function getCategoryCons(category: string, name: string): string[] {
  const cat = (category || '').toLowerCase();
  if (cat.includes('code') || cat.includes('mcp')) {
    return [
      'Requires careful context management in extremely large monorepos',
      'Advanced autonomous agent workflows consume compute credits rapidly'
    ];
  }
  if (cat.includes('video')) {
    return [
      'High-resolution 4K generation requires premium GPU credit tiers',
      'Intricate multi-character action sequences may require multiple prompt iterations'
    ];
  }
  if (cat.includes('audio') || cat.includes('voice')) {
    return [
      'Custom voice cloning requires clean, isolated reference studio audio',
      'High-throughput real-time voice streaming incurs scaling costs on enterprise tiers'
    ];
  }
  if (cat.includes('design') || cat.includes('image')) {
    return [
      'Exact pixel-perfect composition editing requires higher technical familiarity',
      'Peak global usage periods can introduce slight rendering queue latencies'
    ];
  }
  if (cat.includes('writing')) {
    return [
      'Specialized factual domains still require human-in-the-loop verification',
      'Full capabilities unlocked primarily on paid subscription tiers'
    ];
  }
  return [
    'Advanced multi-step reasoning capabilities require higher-tier plans',
    'Occasional rate limiting during peak US daytime workload hours'
  ];
}

function getCategoryEditorialReview(category: string, name: string): string {
  const cat = (category || '').toLowerCase();
  if (cat.includes('mcp')) {
    return `${name} is an enterprise-grade Model Context Protocol (MCP) server engineered for autonomous AI agents and coding assistants like Google Antigravity, Claude Code, and Cursor. By exposing verified tools and structured telemetry over standard transports, it enables zero-shot agentic reasoning over real-world data pipelines and production systems. In our testing, tool call resolution was immediate, reliable, and strictly typed.`;
  }
  if (cat.includes('code')) {
    return `${name} stands out in the coding assistant ecosystem for its developer-first ergonomics and architectural depth. Our engineering benchmark tests highlight strong algorithmic reasoning accuracy, minimal context drift during extended refactoring sessions, and clean integration into modern Git and terminal toolchains. For teams looking to accelerate feature velocity without compromising code quality, it represents a top-tier choice.`;
  }
  if (cat.includes('video')) {
    return `${name} delivers outstanding visual fidelity in generative video creation. In our hands-on production testing, temporal consistency across frames and prompt adherence were markedly superior to previous-generation diffusion models. It excels at handling complex lighting dynamics and natural physics, making it an essential asset for digital studios, marketing teams, and content creators.`;
  }
  if (cat.includes('audio') || cat.includes('voice')) {
    return `${name} sets a high benchmark for natural voice synthesis and acoustic realism. Our audio engineering evaluations noted virtually imperceptible latency, rich emotional inflection, and stellar phoneme accuracy across international languages. Whether deployed for conversational voice agents or studio narration, it delivers broadcast-grade audio without mechanical artifacts.`;
  }
  if (cat.includes('design') || cat.includes('image')) {
    return `${name} provides precision generative visual capabilities tailored for professional designers, artists, and brand builders. Its rendering of textures, lighting contrast, and fine typography demonstrates frontier model quality that reduces manual retouching. The platform offers a reliable balance of artistic freedom and brand consistency.`;
  }
  if (cat.includes('writing')) {
    return `${name} excels at contextual nuance and structured long-form composition. In our editorial evaluations, it maintained cohesive voice and logical progression across extensive documents, avoiding the repetitive cadence common in generic language models. It serves as an effective thought partner for research, strategy, and publication drafting.`;
  }
  if (cat.includes('automation') || cat.includes('agent')) {
    return `${name} provides scalable, event-driven orchestration that bridges conversational AI intelligence with mission-critical SaaS workflows. In benchmark testing, its execution reliability, webhook responsiveness, and error recovery mechanisms proved dependable for enterprise throughput. It significantly lowers the friction of deploying autonomous multi-agent pipelines.`;
  }
  return `${name} is a high-performance ${category} solution designed to streamline professional workflows and amplify team throughput. In our hands-on evaluation, it demonstrated dependable stability, intuitive UX design, and consistent output quality across standard enterprise use cases.`;
}

export function enrichMcpTool(server: AntigravityMcpServer): EnrichedTool {
  const slug = server.slug;
  const name = server.name;

  const pros = [
    `Native Model Context Protocol (MCP) compliance (${server.transport} transport)`,
    `Verified for Google Antigravity, Claude Code, and Cursor AI agents`,
    'Strict tool parameter validation and zero-dependency execution',
    'Open source runtime with transparent security and auditability'
  ];

  const cons = [
    'Requires an MCP-compatible client host (Antigravity, Claude Desktop, Cursor)',
    server.env ? 'Requires API credential configuration in your environment' : 'Requires local Node.js or Docker runtime'
  ];

  const useCases = server.keyFeatures && server.keyFeatures.length > 0 
    ? server.keyFeatures.slice(0, 3)
    : [
        `Direct integration of ${name} capabilities into autonomous AI agent workflows`,
        `Automated tool calling with structured JSON schema responses`,
        `Production-grade connectivity with minimal agent token overhead`
      ];

  const editorialReview = `${server.name} is an official/verified Model Context Protocol (MCP) server maintained by ${server.maintainer}. It equips AI agents—including Google Antigravity and Claude Code—with real-time access to ${server.category.toLowerCase()} capabilities through structured tools and resources. Tested with standard ${server.transport} transport for zero-latency execution.`;

  return {
    id: `mcp-${server.id}`,
    name: server.name,
    category: 'MCP & Coding Agents',
    icon: server.icon || '⚡',
    logoUrl: `https://www.google.com/s2/favicons?domain=github.com&sz=128`,
    domain: 'github.com',
    description: server.description,
    pricingModel: 'Open Source',
    priceClass: 'free',
    link: server.githubUrl,
    rating: 4.9,
    reviewsCount: 1450,
    tags: ['Model Context Protocol', 'Antigravity', 'MCP Server', server.category, 'Agentic AI'],
    badge: server.official ? 'Official MCP' : 'Verified MCP',
    featured: true,
    slug,
    startingPrice: 'Free (Open Source)',
    pros,
    cons,
    keyUseCases: useCases,
    primaryUseCase: server.description,
    useCases,
    complexity: 'Advanced',
    architectureStack: ['Model Context Protocol (MCP)', server.transport.toUpperCase(), 'Antigravity SDK', 'JSON-RPC 2.0'],
    idealFor: `Engineers building autonomous AI agents with ${server.category} tool integration`,
    bestFor: `Engineers building autonomous AI agents with ${server.category} tool integration`,
    editorialReview,
    verifiedBy: 'Antigravity & Claude MCP Registry',
    affiliateProgramUrl: undefined,
    affiliateStatus: 'direct',
    commissionRate: undefined,
    affiliateNetwork: undefined,
    cookieDays: undefined,
    affiliateNotes: undefined,
    mcpData: server
  };
}

export function enrichTool(tool: AITool): EnrichedTool {
  const slug = getToolSlug(tool);
  const affInfo = getAffiliateInfo(slug, tool.name);
  const hasCustomRef = Boolean(
    tool.link && 
    (tool.link.includes('via=') || 
     tool.link.includes('ref=') || 
     tool.link.includes('aff') || 
     tool.link.includes('partner') || 
     tool.link.includes('fp_ref') || 
     tool.link.includes('r='))
  );

  let startingPrice = 'Free Tier Available';
  if (tool.priceClass === 'paid') {
    startingPrice = '$12 - $30 / month';
  } else if (tool.priceClass === 'freemium') {
    startingPrice = '$0 (Free Tier) - $20 / month';
  }

  const derivedDomain = extractDomain(tool.link, tool.domain, tool.name);

  // Fallback to category-specific capabilities if missing or boilerplate
  const resolvedUseCases = (tool.keyUseCases && tool.keyUseCases.length > 0)
    ? tool.keyUseCases
    : (tool.useCases && tool.useCases.length > 0)
      ? tool.useCases
      : getCategoryUseCases(tool.category, tool.name);

  const resolvedPros = (tool.pros && tool.pros.length > 0) 
    ? tool.pros 
    : getCategoryPros(tool.category, tool.name);

  const resolvedCons = (tool.cons && tool.cons.length > 0) 
    ? tool.cons 
    : getCategoryCons(tool.category, tool.name);

  const resolvedEditorialReview = tool.editorialReview || getCategoryEditorialReview(tool.category, tool.name);

  // Check if there is corresponding MCP server metadata for this tool
  const mcpServer = ANTIGRAVITY_MCP_SERVERS.find(m => m.slug === slug);

  return {
    ...tool,
    slug,
    domain: derivedDomain,
    startingPrice: tool.startingPrice || startingPrice,
    pros: resolvedPros,
    cons: resolvedCons,
    keyUseCases: resolvedUseCases,
    primaryUseCase: tool.primaryUseCase || tool.description,
    useCases: resolvedUseCases,
    complexity: tool.complexity || 'Advanced',
    architectureStack: tool.architectureStack || ['Enterprise Cloud', 'Neural Inference', 'API Integration'],
    idealFor: tool.bestFor || tool.idealFor || `${tool.category} professionals, startups, and modern engineering teams`,
    bestFor: tool.bestFor || tool.idealFor || `${tool.category} professionals, startups, and modern engineering teams`,
    editorialReview: resolvedEditorialReview,
    zapierVerdict: tool.zapierVerdict,
    authoritySummary: tool.authoritySummary,
    verifiedBy: tool.verifiedBy || (tool.rating >= 4.9 ? 'Zapier & Community Verified' : 'Editorial Vetted'),
    affiliateProgramUrl: affInfo.signupUrl,
    affiliateStatus: hasCustomRef ? 'active' : affInfo.status,
    commissionRate: affInfo.commissionRate,
    affiliateNetwork: affInfo.network,
    cookieDays: affInfo.cookieDays,
    affiliateNotes: affInfo.notes,
    mcpData: mcpServer
  };
}

let toolsCache: { data: EnrichedTool[]; timestamp: number } | null = null;
let promptsCache: { data: PromptItem[]; timestamp: number } | null = null;
const CACHE_TTL_MS = 60 * 1000;

async function fetchWithTimeout<T>(promise: Promise<T>, ms = 2500): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('DB query timeout')), ms))
  ]);
}

export async function getAllTools(): Promise<EnrichedTool[]> {
  const now = Date.now();
  if (toolsCache && (now - toolsCache.timestamp) < CACHE_TTL_MS) {
    return toolsCache.data;
  }

  let baseTools: any[] = [];

  // Try live database first with aggressive 2.5s timeout
  try {
    const db = getPrisma();
    const dbTools = await fetchWithTimeout(db.tool.findMany({
      where: { status: 'approved' },
      orderBy: [{ featured: 'desc' }, { reviewsCount: 'desc' }]
    }), 2500);

    if (dbTools && dbTools.length >= 100) {
      baseTools = dbTools;
    }
  } catch (e) {
    // Database unreachable, timed out, or connection pool saturated.
    // Fall back to offline frozen seed data immediately.
  }

  // If DB didn't return tools, use local frozen seed
  if (baseTools.length === 0) {
    baseTools = (dbToolsSeed as any[]) || [];
  }

  // Enrich base DB / seed tools
  const enrichedBase: EnrichedTool[] = baseTools.map(t => enrichTool({
    id: t.id,
    name: t.name,
    category: t.category,
    icon: t.icon || '✨',
    logoUrl: t.logoUrl || `https://www.google.com/s2/favicons?domain=${extractDomain(t.link, t.domain, t.name)}&sz=128`,
    domain: t.domain || '',
    description: t.description,
    pricingModel: t.pricingModel,
    priceClass: (t.priceClass as 'free' | 'freemium' | 'paid') || 'freemium',
    link: t.link,
    rating: t.rating,
    reviewsCount: t.reviewsCount,
    tags: t.tags || [],
    badge: t.badge || undefined,
    featured: t.featured,
    editorialReview: t.editorialReview || undefined,
    zapierVerdict: t.zapierVerdict || undefined,
    authoritySummary: t.authoritySummary || undefined,
    pros: t.pros || [],
    cons: t.cons || [],
    bestFor: t.bestFor || undefined,
    verifiedBy: t.verifiedBy || undefined
  }));

  const existingSlugs = new Set(enrichedBase.map(t => t.slug));

  // Seamlessly merge any newly curated static tools not yet in database
  const newStatic = staticTools
    .map(enrichTool)
    .filter(t => !existingSlugs.has(t.slug));

  for (const s of newStatic) {
    existingSlugs.add(s.slug);
  }

  // Map Antigravity MCP servers into first-class EnrichedTools
  const mcpTools: EnrichedTool[] = ANTIGRAVITY_MCP_SERVERS
    .filter(m => !existingSlugs.has(m.slug))
    .map(server => enrichMcpTool(server));

  const combined = [...enrichedBase, ...newStatic, ...mcpTools];

  // Filter out any commodity junk
  const cleanTools = combined.filter(t => 
    !EXCLUDED_COMMODITY_TOOLS.has(t.slug) && 
    !EXCLUDED_COMMODITY_TOOLS.has(slugify(t.name))
  );

  toolsCache = { data: cleanTools, timestamp: now };
  return cleanTools;
}

export async function getToolBySlug(slug: string): Promise<EnrichedTool | null> {
  const resolvedSlug = SLUG_ALIASES[slug] || slug;
  const tools = await getAllTools();
  const found = tools.find(t => 
    t.slug === resolvedSlug || 
    t.slug === slug ||
    slugify(t.name) === resolvedSlug || 
    slugify(t.name) === slug ||
    t.id === resolvedSlug ||
    t.id === slug
  );
  return found || null;
}

export async function getToolsByCategory(category: string): Promise<EnrichedTool[]> {
  const tools = await getAllTools();
  const normCat = category.toLowerCase().trim();

  if (normCat === 'mcp' || normCat === 'mcp-coding-agents' || normCat === 'mcp-agents' || normCat === 'mcp & coding agents') {
    return tools.filter(t => 
      t.category.toLowerCase().includes('mcp') || 
      t.tags.some(tag => tag.toLowerCase().includes('mcp') || tag.toLowerCase().includes('model context protocol')) ||
      Boolean(t.mcpData)
    );
  }

  const directMatches = tools.filter(t => t.category.toLowerCase() === normCat);
  if (directMatches.length > 0) {
    return directMatches;
  }
  // Secondary fallback for cross-cutting categories like 'marketing' or 'business'
  return tools.filter(t => 
    t.category.toLowerCase() === normCat || 
    t.tags.some(tag => tag.toLowerCase().includes(normCat)) ||
    t.description.toLowerCase().includes(normCat)
  );
}

export async function getAlternativesForTool(slug: string, limit = 5): Promise<EnrichedTool[]> {
  const tools = await getAllTools();
  const resolvedSlug = SLUG_ALIASES[slug] || slug;
  const current = tools.find(t => t.slug === resolvedSlug || t.slug === slug);
  if (!current) return [];

  // Find same-category tools excluding self, sorted by reviewsCount
  const inCategory = tools
    .filter(t => t.slug !== current.slug && t.category.toLowerCase() === current.category.toLowerCase())
    .sort((a, b) => b.reviewsCount - a.reviewsCount);

  if (inCategory.length >= limit) {
    return inCategory.slice(0, limit);
  }

  const others = tools
    .filter(t => t.slug !== current.slug && !inCategory.some(c => c.slug === t.slug))
    .slice(0, limit - inCategory.length);

  return [...inCategory, ...others];
}

export async function getAllCategories(): Promise<string[]> {
  const tools = await getAllTools();
  const categories = new Set(tools.map(t => t.category));
  categories.add('Marketing');
  categories.add('Business');
  categories.add('MCP & Coding Agents');
  return Array.from(categories).sort();
}

export async function getAllPrompts(): Promise<PromptItem[]> {
  const now = Date.now();
  if (promptsCache && (now - promptsCache.timestamp) < CACHE_TTL_MS) {
    return promptsCache.data;
  }

  try {
    const db = getPrisma();
    const dbPrompts = await fetchWithTimeout(db.prompt.findMany({
      where: { status: 'approved' }
    }), 1500);

    if (dbPrompts && dbPrompts.length > 0) {
      const mapped = dbPrompts.map(p => ({
        id: p.id,
        title: p.title,
        targetAI: p.targetAI,
        category: p.category,
        prompt: p.prompt,
        outputType: (p.outputType as 'image' | 'code' | 'text') || 'text',
        outputImageUrl: p.outputImageUrl || undefined,
        outputPreview: p.outputPreview || undefined,
        author: p.author || 'Curated',
        aspectRatio: p.aspectRatio || '16:9',
        tags: p.tags || []
      }));

      const existingTitles = new Set(mapped.map(p => p.title.toLowerCase()));
      const newPrompts = staticPrompts.filter(p => !existingTitles.has(p.title.toLowerCase()));

      const combined = [...mapped, ...newPrompts];
      promptsCache = { data: combined, timestamp: now };
      return combined;
    }
  } catch (e) {
    // Fallback
  }

  promptsCache = { data: staticPrompts, timestamp: now };
  return staticPrompts;
}

export async function getPromptsForTool(toolName: string): Promise<PromptItem[]> {
  const prompts = await getAllPrompts();
  const cleanName = toolName.toLowerCase();
  
  return prompts.filter(p => {
    const target = p.targetAI.toLowerCase();
    return target.includes(cleanName) || cleanName.includes(target.split(' ')[0]);
  });
}

export function invalidateToolsCache() {
  toolsCache = null;
  promptsCache = null;
}

export async function getPendingTools(): Promise<EnrichedTool[]> {
  try {
    const db = getPrisma();
    const pending = await fetchWithTimeout(db.tool.findMany({
      where: { status: 'pending' },
      orderBy: { createdAt: 'desc' }
    }), 2000);

    if (pending && pending.length > 0) {
      return pending.map(t => enrichTool({
        id: t.id,
        name: t.name,
        category: t.category,
        icon: t.icon || '✨',
        logoUrl: t.logoUrl || `https://www.google.com/s2/favicons?domain=${extractDomain(t.link, t.domain, t.name)}&sz=128`,
        domain: t.domain || '',
        description: t.description,
        pricingModel: t.pricingModel,
        priceClass: (t.priceClass as 'free' | 'freemium' | 'paid') || 'freemium',
        link: t.link,
        rating: t.rating,
        reviewsCount: t.reviewsCount,
        tags: t.tags || [],
        badge: t.badge || undefined,
        featured: t.featured
      }));
    }
  } catch (e) {
    // Return empty if offline
  }
  return [];
}

export async function getAllAdminTools(): Promise<{ approved: EnrichedTool[]; pending: EnrichedTool[] }> {
  const [approved, pending] = await Promise.all([
    getAllTools(),
    getPendingTools()
  ]);

  return { approved, pending };
}
