export interface ComplexUseCasePreset {
  id: string;
  title: string;
  icon: string;
  category: string;
  query: string;
  description: string;
  complexity: 'Intermediate' | 'Advanced' | 'Frontier Engineering';
  featuredTools: string[]; // Slugs of best-in-class tools
}

export const COMPLEX_USE_CASE_PRESETS: ComplexUseCasePreset[] = [
  {
    id: 'autonomous-swe',
    title: 'Autonomous Software Engineering & PRs',
    icon: '🤖',
    category: 'Code',
    query: 'autonomous software engineer clone repo fix bug shell test suite github pull request',
    description: 'Deploy autonomous agents that clone full repositories, run compiler/test suites in sandboxed terminals, and open production-ready pull requests.',
    complexity: 'Frontier Engineering',
    featuredTools: ['devin', 'claude-code', 'cursor', 'coderabbit', 'aider']
  },
  {
    id: 'fullstack-web-from-prompt',
    title: 'Full-Stack Web App from Single Prompt',
    icon: '⚡',
    category: 'Code',
    query: 'build fullstack web application from prompt react nextjs supabase in browser container instant deploy',
    description: 'Generate production-ready full-stack applications with responsive frontend, backend databases, authentication, and instant cloud hosting from a natural language prompt.',
    complexity: 'Advanced',
    featuredTools: ['bolt-new', 'lovable', 'v0', 'replit-agent']
  },
  {
    id: 'multi-agent-orchestration',
    title: 'Self-Hosted Multi-Agent Orchestration',
    icon: '🔄',
    category: 'Automation',
    query: 'self-hosted multi-agent workflow orchestration visual canvas dag tool calling vector db langchain',
    description: 'Build, chain, and self-host multi-agent autonomous teams with custom tool calling, RAG pipelines, and cyclical execution DAGs without cloud vendor lock-in.',
    complexity: 'Frontier Engineering',
    featuredTools: ['n8n', 'dify', 'crewai', 'langgraph']
  },
  {
    id: 'streaming-voice-realtime',
    title: 'Sub-100ms Streaming Voice for Live Agents',
    icon: '🎙️',
    category: 'Audio',
    query: 'ultra low latency streaming text to speech voice synthesis conversational voice agent sub 100ms websockets',
    description: 'Build real-time bidirectional conversational voice bots and telephone agents with sub-100ms latency, emotional inflection, and streaming STT/TTS.',
    complexity: 'Frontier Engineering',
    featuredTools: ['cartesia', 'deepgram', 'elevenlabs']
  },
  {
    id: 'video-dubbing-lip-sync',
    title: 'Studio Video Dubbing & 175+ Lang Lip-Sync',
    icon: '🎬',
    category: 'Video',
    query: 'translate video studio voice clone multilingual lip sync facial animation photorealistic avatar',
    description: 'Translate long-form video content into 175+ languages with automated voice cloning, natural facial lip synchronization, and zero re-recording.',
    complexity: 'Advanced',
    featuredTools: ['heygen', 'kling-ai', 'runway', 'synthesia']
  },
  {
    id: 'text-to-3d-game-assets',
    title: 'Text-to-3D Meshes & PBR Game Assets',
    icon: '🧊',
    category: 'Design',
    query: 'generate 3d model text to 3d mesh pbr textures retopology unreal engine unity blender glb obj',
    description: 'Generate production-ready 3D game assets and textured meshes from text or images with automated retopology and UV maps for Unreal Engine 5 and Unity.',
    complexity: 'Advanced',
    featuredTools: ['tripo3d', 'meshy', 'luma-dream-machine']
  },
  {
    id: 'private-local-llms',
    title: 'Private Local LLMs & Offline GPU Serving',
    icon: '🔒',
    category: 'Code',
    query: 'run open source llms locally offline mac gpu vllm pagedattention ollama deepseek r1 zero cloud tracking',
    description: 'Serve and orchestrate quantized open-weights models (DeepSeek-R1, Llama 3.3, Qwen) privately on local hardware or enterprise clusters with high-throughput PagedAttention.',
    complexity: 'Frontier Engineering',
    featuredTools: ['ollama', 'vllm', 'deepseek-r1']
  },
  {
    id: 'document-rag-extraction',
    title: 'Complex PDF & Multi-Format RAG Extraction',
    icon: '📑',
    category: 'Writing',
    query: 'extract complex pdf unstructured documents tables json chunking rag embeddings grounding citations',
    description: 'Ingest and parse complex enterprise PDFs, scanned tables, presentation decks, and technical reports into clean structured JSON chunks for RAG.',
    complexity: 'Advanced',
    featuredTools: ['unstructured', 'llamaindex', 'notebooklm']
  },
  {
    id: 'agent-search-api',
    title: 'Clean Real-Time Web Search APIs for Agents',
    icon: '🔍',
    category: 'Writing',
    query: 'real time web search api for ai agents clean markdown extraction live citations no seo spam',
    description: 'Equip autonomous agents with fast, clean, real-time web search results stripped of ads, popups, and SEO spam, formatted as structured Markdown.',
    complexity: 'Advanced',
    featuredTools: ['tavily', 'perplexity', 'phind']
  },
  {
    id: 'modular-node-diffusion',
    title: 'Node-Graph Modular Diffusion & VFX',
    icon: '🎨',
    category: 'Design',
    query: 'comfyui node graph modular diffusion flux 1 lora controlnet upscaler photorealism visual pipeline',
    description: 'Design custom node-based generative image and VFX pipelines chaining LoRAs, ControlNets, IP-Adapters, and 10K resolution upscalers.',
    complexity: 'Frontier Engineering',
    featuredTools: ['comfyui', 'flux1-black-forest-labs', 'magnific']
  }
];

export interface UseCaseMatchResult {
  tool: any;
  matchScore: number; // 0 to 100
  matchedUseCase: string;
  whyThisTool: string;
  complexity: 'Intermediate' | 'Advanced' | 'Frontier Engineering';
}

/**
 * Intelligent Use Case Matcher
 * Analyzes natural language requirements against tool capabilities, tags, architectures, and categories.
 */
export function matchToolsByUseCase(inputQuery: string, tools: any[]): UseCaseMatchResult[] {
  if (!inputQuery || !inputQuery.trim()) return [];

  const tokens = inputQuery.toLowerCase().trim().split(/\s+/).filter(t => t.length > 2);
  if (tokens.length === 0) return [];

  const results: UseCaseMatchResult[] = [];

  for (const tool of tools) {
    let score = 50; // base potential
    let matchedReasons: string[] = [];

    const toolName = (tool.name || '').toLowerCase();
    const toolDesc = (tool.description || '').toLowerCase();
    const toolTags = (tool.tags || []).map((t: string) => t.toLowerCase());
    const toolCategory = (tool.category || '').toLowerCase();
    const toolPrimaryUseCase = (tool.primaryUseCase || '').toLowerCase();
    const toolUseCases = (tool.useCases || []).map((u: string) => u.toLowerCase());

    // Check tokens across fields
    tokens.forEach((token) => {
      if (toolName.includes(token)) {
        score += 25;
        matchedReasons.push(`Direct tool name match for "${token}"`);
      }
      if (toolPrimaryUseCase.includes(token)) {
        score += 20;
        matchedReasons.push(`Core architecture designed for ${token}`);
      }
      if (toolUseCases.some((u: string) => u.includes(token))) {
        score += 18;
        matchedReasons.push(`Documented capability for ${token}`);
      }
      if (toolTags.some((tag: string) => tag.includes(token))) {
        score += 12;
      }
      if (toolDesc.includes(token)) {
        score += 8;
      }
      if (toolCategory.includes(token)) {
        score += 6;
      }
    });

    // Check against presets to boost high-confidence curated matches
    for (const preset of COMPLEX_USE_CASE_PRESETS) {
      const presetTokens = preset.query.toLowerCase().split(/\s+/);
      const hasOverlap = tokens.some(t => presetTokens.includes(t));
      
      if (hasOverlap) {
        const slug = tool.slug || '';
        if (preset.featuredTools.includes(slug)) {
          score += 35;
          matchedReasons.push(`Top-tier benchmark pick for ${preset.title}`);
        }
      }
    }

    // Only return tools with meaningful match
    if (score >= 65) {
      const normalizedScore = Math.min(99, Math.max(82, score));
      
      const complexity = tool.complexity || 
        (normalizedScore >= 95 ? 'Frontier Engineering' : normalizedScore >= 88 ? 'Advanced' : 'Intermediate');

      const whyThisTool = matchedReasons.length > 0 
        ? matchedReasons.slice(0, 2).join(' • ')
        : `High-fidelity match for ${tool.category} workflows and specialized automated tasks`;

      results.push({
        tool,
        matchScore: normalizedScore,
        matchedUseCase: tool.primaryUseCase || tool.description.slice(0, 90) + '...',
        whyThisTool,
        complexity
      });
    }
  }

  // Sort descending by matchScore
  return results.sort((a, b) => b.matchScore - a.matchScore);
}
