import { PrismaClient } from '@prisma/client';
import { aiTools as staticTools, promptLibrary as staticPrompts, AITool, PromptItem } from '@/data';
import { getAffiliateInfo, AffiliateProgramInfo } from './affiliates';

let prisma: PrismaClient | null = null;
export function getPrisma(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}

const EXCLUDED_COMMODITY_TOOLS = new Set([
  'chatgpt',
  'gemini',
  'google-gemini',
  'chatgpt-gpt-56-frontier',
  'google-gemini-31-pro'
]);

// Curated slug mapping for cleaner, high-intent SEO URLs
const SLUG_MAP: Record<string, string> = {
  'Devin AI (Cognition Labs)': 'devin',
  'Claude Code (Anthropic CLI)': 'claude-code',
  'Cursor 3.0 (Composer Agents)': 'cursor',
  'Midjourney v8.2': 'midjourney',
  'Perplexity Pro (Deep Research 2.0)': 'perplexity',
  'Cartesia Sonic (Ultra-Low Latency Voice)': 'cartesia',
  'Runway Gen-4.5': 'runway',
  'ElevenLabs Gen-3 Voice Studio': 'elevenlabs',
  'ComfyUI Modular Diffusion': 'comfyui',
  'Devin 2.0 Autonomous Engineer': 'devin',
  'Suno v4.5': 'suno',
  'v0 by Vercel 2.0': 'v0',
  'v0.dev by Vercel': 'v0',
  'Bolt.new': 'bolt-new',
  'Lovable.dev': 'lovable',
  'Windsurf by Codeium': 'windsurf',
  'Aider AI': 'aider',
  'DeepSeek-R1 (Open Reasoning Engine)': 'deepseek-r1',
  'Dify.ai Enterprise LLM': 'dify',
  'CrewAI Multi-Agent Teams': 'crewai',
  'LangGraph Stateful Orchestration': 'langgraph',
  'Ollama': 'ollama',
  'vLLM High-Throughput Serving': 'vllm',
  'Deepgram Nova-3': 'deepgram',
  'Tripo3D Fast Mesh Engine': 'tripo3d',
  'Meshy.ai 3D Game Assets': 'meshy',
  'Tavily AI Search Engine': 'tavily',
  'Unstructured.io RAG ETL': 'unstructured',
  'NotebookLM by Google': 'notebooklm',
  'n8n AI Agents 2.0': 'n8n',
  'Notion AI Workspace': 'notion-ai',
  'Synthesia 2.5 Avatars': 'synthesia',
  'Gamma 2.0': 'gamma',
  'Descript Studio Sound': 'descript',
  'Jasper AI Brand Voice': 'jasper-ai',
  'Copy.ai GTM Agents': 'copy-ai',
  'Framer AI 2.0': 'framer-ai',
  'Luma Dream Machine 2': 'luma-dream-machine',
  'Udio v2 Music': 'udio',
  'Fireflies.ai 2.0': 'fireflies',
  'Glean Work Assistant': 'glean',
  'Phind Developer Search 2.0': 'phind',
  'Magnific AI 2.0': 'magnific',
  'Leonardo.ai Phoenix': 'leonardo-ai',
  'HeyGen Interactive Video': 'heygen',
  'Opus Clip 3.0': 'opus-clip',
  'Murf Speech Gen-2': 'murf-ai',
  'Readwise Reader AI': 'readwise',
  'Make.com Enterprise AI': 'make',
  'Krea AI Real-time 2.0': 'krea-ai',
  'Pika 2.2': 'pika',
  'Tabnine Private VPC': 'tabnine',
  'Superhuman AI Copilot': 'superhuman',
  'CapCut AI Studio 2.0': 'capcut',
  'Zapier Central Agents': 'zapier-central',
  'CodeRabbit': 'coderabbit',
  'LlamaIndex': 'llamaindex',
  'Langfuse': 'langfuse'
};

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getToolSlug(tool: AITool | { name: string }): string {
  if (SLUG_MAP[tool.name]) {
    return SLUG_MAP[tool.name];
  }
  return slugify(tool.name);
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

  const defaultPros = [
    'Leading 2026 frontier model architecture',
    'Intuitive modern web interface and frictionless onboarding',
    'Robust integration ecosystem and multi-platform support',
    'Enterprise-grade security and data privacy safeguards'
  ];

  const defaultCons = [
    'Advanced multi-step reasoning requires higher-tier plans',
    'Occasional rate limits during peak US work hours'
  ];

  const defaultUseCases = tool.useCases && tool.useCases.length > 0 
    ? tool.useCases 
    : [
        'Accelerating daily professional workflows by 3x - 5x',
        'Automating repetitive content and asset production',
        'Cross-functional team collaboration and ideation'
      ];

  return {
    ...tool,
    slug,
    startingPrice,
    pros: defaultPros,
    cons: defaultCons,
    keyUseCases: defaultUseCases,
    primaryUseCase: tool.primaryUseCase || tool.description,
    useCases: defaultUseCases,
    complexity: tool.complexity || 'Advanced',
    architectureStack: tool.architectureStack || ['Enterprise Cloud', 'Neural Inference', 'API Integration'],
    idealFor: tool.idealFor || `${tool.category} professionals, startups, and modern engineering teams`,
    bestFor: tool.idealFor || `${tool.category} professionals, startups, and modern engineering teams`,
    affiliateProgramUrl: affInfo.signupUrl,
    affiliateStatus: hasCustomRef ? 'active' : affInfo.status,
    commissionRate: affInfo.commissionRate,
    affiliateNetwork: affInfo.network,
    cookieDays: affInfo.cookieDays,
    affiliateNotes: affInfo.notes
  };
}

let toolsCache: { data: EnrichedTool[]; timestamp: number } | null = null;
let promptsCache: { data: PromptItem[]; timestamp: number } | null = null;
const CACHE_TTL_MS = 60 * 1000;

async function fetchWithTimeout<T>(promise: Promise<T>, ms = 1500): Promise<T> {
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

  try {
    const db = getPrisma();
    const dbTools = await fetchWithTimeout(db.tool.findMany({
      where: { status: 'approved' },
      orderBy: [{ featured: 'desc' }, { reviewsCount: 'desc' }]
    }), 1500);

    if (dbTools && dbTools.length > 0) {
      const enriched = dbTools.map(t => enrichTool({
        id: t.id,
        name: t.name,
        category: t.category,
        icon: t.icon || '✨',
        logoUrl: t.logoUrl || `https://www.google.com/s2/favicons?domain=${t.domain || 'openai.com'}&sz=128`,
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

      // Seamlessly merge any newly curated static tools not yet in database
      const existingSlugs = new Set(enriched.map(t => t.slug));
      const newStatic = staticTools
        .map(enrichTool)
        .filter(t => !existingSlugs.has(t.slug));

      const combined = [...enriched, ...newStatic];
      // Filter out generic commodity chatbots
      const cleanTools = combined.filter(t => 
        !EXCLUDED_COMMODITY_TOOLS.has(t.slug) && 
        !EXCLUDED_COMMODITY_TOOLS.has(slugify(t.name))
      );

      toolsCache = { data: cleanTools, timestamp: now };
      return cleanTools;
    }
  } catch (e) {
    // Graceful fallback to static dataset
  }

  const staticEnriched = staticTools
    .map(enrichTool)
    .filter(t => 
      !EXCLUDED_COMMODITY_TOOLS.has(t.slug) && 
      !EXCLUDED_COMMODITY_TOOLS.has(slugify(t.name))
    );

  toolsCache = { data: staticEnriched, timestamp: now };
  return staticEnriched;
}

export async function getToolBySlug(slug: string): Promise<EnrichedTool | null> {
  const tools = await getAllTools();
  const found = tools.find(t => t.slug === slug || slugify(t.name) === slug);
  return found || null;
}

export async function getToolsByCategory(category: string): Promise<EnrichedTool[]> {
  const tools = await getAllTools();
  const normCat = category.toLowerCase().trim();
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
  const current = tools.find(t => t.slug === slug);
  if (!current) return [];

  // Find same-category tools excluding self, sorted by reviewsCount
  const inCategory = tools
    .filter(t => t.slug !== slug && t.category.toLowerCase() === current.category.toLowerCase())
    .sort((a, b) => b.reviewsCount - a.reviewsCount);

  if (inCategory.length >= limit) {
    return inCategory.slice(0, limit);
  }

  const others = tools
    .filter(t => t.slug !== slug && !inCategory.some(c => c.slug === t.slug))
    .slice(0, limit - inCategory.length);

  return [...inCategory, ...others];
}

export async function getAllCategories(): Promise<string[]> {
  const tools = await getAllTools();
  const categories = new Set(tools.map(t => t.category));
  categories.add('Marketing');
  categories.add('Business');
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
        logoUrl: t.logoUrl || `https://www.google.com/s2/favicons?domain=${t.domain || 'openai.com'}&sz=128`,
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

