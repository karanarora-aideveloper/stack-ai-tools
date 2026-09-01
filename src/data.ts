export interface AITool {
  id: number | string;
  name: string;
  category: string;
  icon?: string;
  logoUrl: string;
  domain: string;
  description: string;
  pricingModel: string;
  priceClass: 'free' | 'freemium' | 'paid';
  link: string;
  rating: number;
  reviewsCount: number;
  tags: string[];
  badge?: string;
  featured?: boolean;
}

export interface PromptItem {
  id: number | string;
  title: string;
  targetAI: string;
  category: string;
  prompt: string;
  outputType: 'image' | 'code' | 'text';
  outputImageUrl?: string;
  outputPreview?: string;
  author: string;
  aspectRatio?: string;
  tags?: string[];
}

export const aiTools: AITool[] = [
  {
    id: 1,
    name: 'ChatGPT (GPT-5.6 Frontier)',
    category: 'Writing',
    icon: '💬',
    domain: 'openai.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=openai.com&sz=128',
    description: 'OpenAI\'s flagship frontier model series with unified real-time routing across ultra-fast responses and extended deep reasoning modes.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://chatgpt.com',
    rating: 4.95,
    reviewsCount: 22400,
    tags: ['GPT-5.6', 'Autonomous Agents', 'Deep Research', 'Multimodal'],
    badge: 'Most Popular',
    featured: true
  },
  {
    id: 2,
    name: 'Claude Sonnet 5',
    category: 'Writing',
    icon: '🧠',
    domain: 'anthropic.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=claude.ai&sz=128',
    description: 'Anthropic\'s premier 2026 intelligence model. Features unprecedented agentic coding, adaptive thinking, 1M context, and nuanced writing.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://claude.ai',
    rating: 4.97,
    reviewsCount: 14800,
    tags: ['Claude 5', 'Agentic Coding', 'Adaptive Thinking', '1M Context'],
    badge: 'Editor\'s Choice',
    featured: true
  },
  {
    id: 3,
    name: 'Cursor 3.0 (Composer Agents)',
    category: 'Code',
    icon: '⚡',
    domain: 'cursor.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=cursor.com&sz=128',
    description: 'The industry-standard AI software engineering environment with autonomous multi-file Composer agents, repo-wide indexing, and zero-latency edits.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://cursor.com',
    rating: 4.96,
    reviewsCount: 11900,
    tags: ['IDE', 'Composer Agents', 'Full Codebase', 'TypeScript'],
    badge: 'Developer #1',
    featured: true
  },
  {
    id: 4,
    name: 'Midjourney v8.2',
    category: 'Design',
    icon: '🎨',
    domain: 'midjourney.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=midjourney.com&sz=128',
    description: 'The default frontier visual generator as of late 2026. Features the v8.2 Edit Engine, immaculate photorealism, and pixel-perfect typography.',
    pricingModel: 'Paid',
    priceClass: 'paid',
    link: 'https://midjourney.com',
    rating: 4.94,
    reviewsCount: 17300,
    tags: ['v8.2 Engine', 'Photorealism', 'Edit Model', 'Graphic Design'],
    badge: 'Best Visuals',
    featured: true
  },
  {
    id: 5,
    name: 'Perplexity Pro (Deep Research 2.0)',
    category: 'Writing',
    icon: '🔍',
    domain: 'perplexity.ai',
    logoUrl: 'https://www.google.com/s2/favicons?domain=perplexity.ai&sz=128',
    description: 'Next-generation Answer Engine synthesizing verified web sources with Sonar 2.0 and automated multi-hour deep research reports.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://perplexity.ai',
    rating: 4.9,
    reviewsCount: 13500,
    tags: ['Deep Research', 'Sonar 2.0', 'Live Citations', 'Academic'],
    badge: 'Top Search',
    featured: true
  },
  {
    id: 6,
    name: 'Google Gemini 3.1 Pro',
    category: 'Writing',
    icon: '✨',
    domain: 'gemini.google.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=gemini.google.com&sz=128',
    description: 'Google\'s flagship Pro-tier model featuring a 2M token context window, native multimodal reasoning, and deep Workspace agent orchestration.',
    pricingModel: 'Paid',
    priceClass: 'paid',
    link: 'https://gemini.google.com',
    rating: 4.91,
    reviewsCount: 12200,
    tags: ['Gemini 3', '2M Context', 'Google Workspace', 'Agentic'],
    badge: '2M Context',
    featured: true
  },
  {
    id: 7,
    name: 'Runway Gen-4.5',
    category: 'Video',
    icon: '🚀',
    domain: 'runwayml.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=runwayml.com&sz=128',
    description: 'Hollywood-tier generative video synthesis with HDR output, physics-accurate world simulation, and granular director camera control.',
    pricingModel: 'Paid',
    priceClass: 'paid',
    link: 'https://runwayml.com',
    rating: 4.89,
    reviewsCount: 7600,
    tags: ['Gen-4.5', 'HDR Video', 'World Simulation', 'Camera Control'],
    badge: 'Best Video',
    featured: true
  },
  {
    id: 8,
    name: 'ElevenLabs Gen-3 Voice Studio',
    category: 'Audio',
    icon: '🎙️',
    domain: 'elevenlabs.io',
    logoUrl: 'https://www.google.com/s2/favicons?domain=elevenlabs.io&sz=128',
    description: 'The golden benchmark in generative audio with sub-150ms conversational latency, emotive voice synthesis, and real-time multilingual dubbing.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://elevenlabs.io',
    rating: 4.93,
    reviewsCount: 9100,
    tags: ['Voice Cloning', 'Low Latency', 'Dubbing', 'Audio Agents'],
    badge: 'Best Audio',
    featured: true
  },
  {
    id: 9,
    name: 'Google Veo 2',
    category: 'Video',
    icon: '🎬',
    domain: 'deepmind.google',
    logoUrl: 'https://www.google.com/s2/favicons?domain=deepmind.google&sz=128',
    description: 'Google DeepMind\'s cinematic 4K video foundation model with accurate physical motion and high-fidelity lighting dynamics.',
    pricingModel: 'Paid',
    priceClass: 'paid',
    link: 'https://deepmind.google/technologies/veo/',
    rating: 4.88,
    reviewsCount: 5100,
    tags: ['4K Video', 'DeepMind', 'Text-to-Video', 'Cinematic'],
    badge: 'Trending'
  },
  {
    id: 10,
    name: 'Devin 2.0 Autonomous Engineer',
    category: 'Code',
    icon: '🤖',
    domain: 'cognition.ai',
    logoUrl: 'https://www.google.com/s2/favicons?domain=cognition.ai&sz=128',
    description: 'The premier autonomous AI software engineer capable of planning, executing complex coding tasks, fixing production bugs, and creating PRs.',
    pricingModel: 'Paid',
    priceClass: 'paid',
    link: 'https://cognition.ai',
    rating: 4.92,
    reviewsCount: 2800,
    tags: ['Autonomous Agent', 'Full Stack', 'GitHub PRs', 'Enterprise'],
    badge: 'Autonomous AI'
  },
  {
    id: 11,
    name: 'Suno v4.5',
    category: 'Audio',
    icon: '🎵',
    domain: 'suno.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=suno.com&sz=128',
    description: 'Radio-ready full-length song generation with automated vocal stem separation, live chord progression control, and studio mastering.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://suno.com',
    rating: 4.91,
    reviewsCount: 8200,
    tags: ['Music Gen', 'Stem Separation', 'Studio Master', 'Vocals'],
    badge: 'Viral'
  },
  {
    id: 12,
    name: 'v0 by Vercel 2.0',
    category: 'Code',
    icon: '⚡',
    domain: 'v0.dev',
    logoUrl: 'https://www.google.com/s2/favicons?domain=v0.dev&sz=128',
    description: 'Generative UI and full-stack Next.js web application architect by Vercel. From prompt to deployed production codebase in seconds.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://v0.dev',
    rating: 4.92,
    reviewsCount: 8900,
    tags: ['Next.js', 'React', 'Tailwind', 'Generative UI'],
    badge: 'Popular'
  },
  {
    id: 13,
    name: 'n8n AI Agents 2.0',
    category: 'Automation',
    icon: '⚙️',
    domain: 'n8n.io',
    logoUrl: 'https://www.google.com/s2/favicons?domain=n8n.io&sz=128',
    description: 'Self-hosted and cloud workflow automation platform connecting autonomous AI agents with 400+ enterprise databases and APIs.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://n8n.io',
    rating: 4.88,
    reviewsCount: 6400,
    tags: ['Workflows', 'Open Source', 'Multi-Agent', 'Enterprise'],
    badge: 'Automation Pick'
  },
  {
    id: 14,
    name: 'GitHub Copilot Enterprise',
    category: 'Code',
    icon: '💻',
    domain: 'github.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=github.com&sz=128',
    description: 'Enterprise AI code completion, automated pull request generation, and architectural analysis integrated directly across GitHub.',
    pricingModel: 'Paid',
    priceClass: 'paid',
    link: 'https://github.com/features/copilot',
    rating: 4.82,
    reviewsCount: 18900,
    tags: ['DevTools', 'VS Code', 'GitHub Native', 'Enterprise']
  },
  {
    id: 15,
    name: 'Notion AI Workspace',
    category: 'Writing',
    icon: '📝',
    domain: 'notion.so',
    logoUrl: 'https://www.google.com/s2/favicons?domain=notion.so&sz=128',
    description: 'Connected workplace AI that queries company docs, auto-summarizes team databases, drafts executive memos, and extracts project action items.',
    pricingModel: 'Paid',
    priceClass: 'paid',
    link: 'https://notion.so',
    rating: 4.81,
    reviewsCount: 13800,
    tags: ['Productivity', 'Knowledge Base', 'Summarization', 'Notes']
  },
  {
    id: 16,
    name: 'Synthesia 2.5 Avatars',
    category: 'Video',
    icon: '🎥',
    domain: 'synthesia.io',
    logoUrl: 'https://www.google.com/s2/favicons?domain=synthesia.io&sz=128',
    description: 'Corporate AI avatar video platform with emotive micro-expressions, native voice translation, and instant enterprise training generation.',
    pricingModel: 'Paid',
    priceClass: 'paid',
    link: 'https://synthesia.io',
    rating: 4.85,
    reviewsCount: 4600,
    tags: ['AI Avatars', 'L&D Training', 'Multilingual', 'Enterprise']
  },
  {
    id: 17,
    name: 'Gamma 2.0',
    category: 'Design',
    icon: '💡',
    domain: 'gamma.app',
    logoUrl: 'https://www.google.com/s2/favicons?domain=gamma.app&sz=128',
    description: 'Generate polished presentations, interactive documents, and executive webpages in seconds from a single prompt.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://gamma.app',
    rating: 4.88,
    reviewsCount: 6500,
    tags: ['Presentations', 'Pitch Decks', 'Interactive', 'Design']
  },
  {
    id: 18,
    name: 'Descript Studio Sound',
    category: 'Video',
    icon: '✂️',
    domain: 'descript.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=descript.com&sz=128',
    description: 'Edit audio and video as easily as editing a text doc. Features Underdub AI re-voicing, Studio Sound cleanup, and automated filler word removal.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://descript.com',
    rating: 4.83,
    reviewsCount: 5200,
    tags: ['Podcasts', 'Audio Cleanup', 'Transcription', 'Video Editing']
  },
  {
    id: 19,
    name: 'Jasper AI Brand Voice',
    category: 'Writing',
    icon: '✍️',
    domain: 'jasper.ai',
    logoUrl: 'https://www.google.com/s2/favicons?domain=jasper.ai&sz=128',
    description: 'Enterprise AI marketing platform enforcing strict brand guidelines, omnichannel campaigns, and conversion-optimized copywriting.',
    pricingModel: 'Paid',
    priceClass: 'paid',
    link: 'https://jasper.ai',
    rating: 4.76,
    reviewsCount: 8800,
    tags: ['Copywriting', 'Marketing', 'Brand Voice', 'SEO']
  },
  {
    id: 20,
    name: 'Copy.ai GTM Agents',
    category: 'Writing',
    icon: '✏️',
    domain: 'copy.ai',
    logoUrl: 'https://www.google.com/s2/favicons?domain=copy.ai&sz=128',
    description: 'Go-to-Market agent platform automating personalized outbound sales, inbound enrichment, and multichannel content orchestration.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://copy.ai',
    rating: 4.74,
    reviewsCount: 6900,
    tags: ['GTM', 'Sales Outreach', 'Cold Email', 'Enrichment']
  },
  {
    id: 21,
    name: 'Framer AI 2.0',
    category: 'Design',
    icon: '🌐',
    domain: 'framer.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=framer.com&sz=128',
    description: 'Design and publish lightning-fast, high-converting websites with AI layout generation, responsive breakpoints, and custom animations.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://framer.com',
    rating: 4.9,
    reviewsCount: 9400,
    tags: ['Web Design', 'No-Code', 'Responsive', 'Publishing']
  },
  {
    id: 22,
    name: 'Luma Dream Machine 2',
    category: 'Video',
    icon: '✨',
    domain: 'lumalabs.ai',
    logoUrl: 'https://www.google.com/s2/favicons?domain=lumalabs.ai&sz=128',
    description: 'High-speed generative video system rendering realistic physical motion, camera trajectories, and character consistency.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://lumalabs.ai',
    rating: 4.85,
    reviewsCount: 4900,
    tags: ['Text-to-Video', 'Cinematic', '3D Motion', 'Fast Render']
  },
  {
    id: 23,
    name: 'Udio v2 Music',
    category: 'Audio',
    icon: '🎸',
    domain: 'udio.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=udio.com&sz=128',
    description: 'High-fidelity musical generation with complex multi-genre orchestration, rich acoustic depth, and precision vocal tuning.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://udio.com',
    rating: 4.89,
    reviewsCount: 5900,
    tags: ['Music', 'Multi-genre', 'Vocals', 'Audio Production']
  },
  {
    id: 24,
    name: 'Fireflies.ai 2.0',
    category: 'Automation',
    icon: '🔥',
    domain: 'fireflies.ai',
    logoUrl: 'https://www.google.com/s2/favicons?domain=fireflies.ai&sz=128',
    description: 'Autonomous voice conversation recorder and analyzer across Zoom, Meet, and Teams with instant CRM updates and action item assignment.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://fireflies.ai',
    rating: 4.8,
    reviewsCount: 6300,
    tags: ['Meeting Notes', 'CRM Sync', 'Transcription', 'Productivity']
  },
  {
    id: 25,
    name: 'Glean Work Assistant',
    category: 'Automation',
    icon: '🔎',
    domain: 'glean.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=glean.com&sz=128',
    description: 'Enterprise search engine and workplace generative assistant connecting Slack, Jira, Confluence, and internal company databases.',
    pricingModel: 'Paid',
    priceClass: 'paid',
    link: 'https://glean.com',
    rating: 4.86,
    reviewsCount: 2900,
    tags: ['Enterprise Search', 'Security', 'Knowledge Graph', 'SaaS']
  },
  {
    id: 26,
    name: 'Phind Developer Search 2.0',
    category: 'Code',
    icon: '🔍',
    domain: 'phind.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=phind.com&sz=128',
    description: 'Technical answer engine tailored for software developers with instant verified documentation, bug fixes, and execution trace reasoning.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://phind.com',
    rating: 4.83,
    reviewsCount: 4400,
    tags: ['Developer Search', 'Code Explanations', 'Debugging', 'Tech Stack']
  },
  {
    id: 27,
    name: 'Magnific AI 2.0',
    category: 'Design',
    icon: '🪄',
    domain: 'magnific.ai',
    logoUrl: 'https://www.google.com/s2/favicons?domain=magnific.ai&sz=128',
    description: 'The world\'s most advanced image upscaler and hallucination enhancer, generating micro-textures and fine details at 16K resolution.',
    pricingModel: 'Paid',
    priceClass: 'paid',
    link: 'https://magnific.ai',
    rating: 4.87,
    reviewsCount: 4100,
    tags: ['16K Upscale', 'Texture Synthesis', 'Photography', 'Enhancer']
  },
  {
    id: 28,
    name: 'Leonardo.ai Phoenix',
    category: 'Design',
    icon: '🦁',
    domain: 'leonardo.ai',
    logoUrl: 'https://www.google.com/s2/favicons?domain=leonardo.ai&sz=128',
    description: 'High-control creative generative suite featuring the Phoenix foundation model, dynamic canvas, and custom user model fine-tuning.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://leonardo.ai',
    rating: 4.85,
    reviewsCount: 9800,
    tags: ['Game Assets', 'Phoenix Model', 'Fine-tuning', 'Design']
  },
  {
    id: 29,
    name: 'HeyGen Interactive Video',
    category: 'Video',
    icon: '👋',
    domain: 'heygen.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=heygen.com&sz=128',
    description: 'Real-time interactive video avatars for personalized outreach, automated video support, and multilingual marketing campaigns.',
    pricingModel: 'Paid',
    priceClass: 'paid',
    link: 'https://heygen.com',
    rating: 4.86,
    reviewsCount: 5200,
    tags: ['Sales Video', 'Real-time Avatars', 'Outreach', 'Localization']
  },
  {
    id: 30,
    name: 'Opus Clip 3.0',
    category: 'Video',
    icon: '✂️',
    domain: 'opus.pro',
    logoUrl: 'https://www.google.com/s2/favicons?domain=opus.pro&sz=128',
    description: 'Repurpose long videos into viral TikToks, Reels, and Shorts in 1 click. AI analyzes engagement potential and adds dynamic animated captions.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://opus.pro',
    rating: 4.8,
    reviewsCount: 7100,
    tags: ['Viral Hooks', 'Shorts', 'Auto-captions', 'Repurposing']
  },
  {
    id: 31,
    name: 'Murf Speech Gen-2',
    category: 'Audio',
    icon: '🎤',
    domain: 'murf.ai',
    logoUrl: 'https://www.google.com/s2/favicons?domain=murf.ai&sz=128',
    description: 'Professional AI voice generator for audiobooks, corporate presentations, and video advertising with nuanced emotional cadence.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://murf.ai',
    rating: 4.77,
    reviewsCount: 4300,
    tags: ['Voiceover', 'Narration', 'E-Learning', 'Commercials']
  },
  {
    id: 32,
    name: 'Readwise Reader AI',
    category: 'Writing',
    icon: '📚',
    domain: 'readwise.io',
    logoUrl: 'https://www.google.com/s2/favicons?domain=readwise.io&sz=128',
    description: 'Personalized reading and knowledge management copilot that auto-summarizes long articles, highlights takeaways, and syncs to Obsidian.',
    pricingModel: 'Paid',
    priceClass: 'paid',
    link: 'https://readwise.io/read',
    rating: 4.92,
    reviewsCount: 5400,
    tags: ['Knowledge', 'Highlights', 'Summaries', 'Reading']
  },
  {
    id: 33,
    name: 'Grammarly AI Enterprise',
    category: 'Writing',
    icon: '✍️',
    domain: 'grammarly.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=grammarly.com&sz=128',
    description: 'On-demand communication assistant with real-time strategic rewrites, executive tone tuning, and organization-wide brand safety rules.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://grammarly.com',
    rating: 4.81,
    reviewsCount: 24500,
    tags: ['Grammar', 'Tone Tuning', 'Executive Writing', 'Extension']
  },
  {
    id: 34,
    name: 'Make.com Enterprise AI',
    category: 'Automation',
    icon: '🔗',
    domain: 'make.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=make.com&sz=128',
    description: 'Visual workflow canvas for orchestrating frontier LLM APIs, webhooks, and cloud enterprise services with complex conditional branches.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://make.com',
    rating: 4.84,
    reviewsCount: 9600,
    tags: ['Visual Automation', 'Webhooks', 'LLM Routers', 'No-Code']
  },
  {
    id: 35,
    name: 'Krea AI Real-time 2.0',
    category: 'Design',
    icon: '🖌️',
    domain: 'krea.ai',
    logoUrl: 'https://www.google.com/s2/favicons?domain=krea.ai&sz=128',
    description: 'Zero-latency generative visual design tool allowing creators to draw, prompt, and generate high-resolution art in real time.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://krea.ai',
    rating: 4.86,
    reviewsCount: 4200,
    tags: ['Real-time', 'Canvas', 'Zero Latency', 'Design']
  },
  {
    id: 36,
    name: 'Pika 2.2',
    category: 'Video',
    icon: '🐰',
    domain: 'pika.art',
    logoUrl: 'https://www.google.com/s2/favicons?domain=pika.art&sz=128',
    description: 'Generative video platform equipped with custom physical effects (Pikaffects), cinematic transitions, and synchronized lip-syncing.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://pika.art',
    rating: 4.81,
    reviewsCount: 5300,
    tags: ['Pikaffects', 'Lip-sync', 'Transitions', 'Social Video']
  },
  {
    id: 37,
    name: 'Tabnine Private VPC',
    category: 'Code',
    icon: '🤖',
    domain: 'tabnine.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=tabnine.com&sz=128',
    description: 'Security-first AI coding copilot running entirely inside private VPCs or air-gapped on-premise hardware with zero data retention.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://tabnine.com',
    rating: 4.75,
    reviewsCount: 4600,
    tags: ['Security', 'VPC', 'Air-gapped', 'Autocomplete']
  },
  {
    id: 38,
    name: 'Superhuman AI Copilot',
    category: 'Automation',
    icon: '⚡',
    domain: 'superhuman.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=superhuman.com&sz=128',
    description: 'The fastest email client in the world powered by automated thread synthesis, personalized voice replies, and instant calendar triage.',
    pricingModel: 'Paid',
    priceClass: 'paid',
    link: 'https://superhuman.com',
    rating: 4.9,
    reviewsCount: 3800,
    tags: ['Email', 'Executive', 'Productivity', 'Inbox Zero']
  },
  {
    id: 39,
    name: 'CapCut AI Studio 2.0',
    category: 'Video',
    icon: '✂️',
    domain: 'capcut.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=capcut.com&sz=128',
    description: 'Leading content creation suite with auto-scriptwriting, smart AI voiceovers, dynamic background separation, and instant auto-captioning.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://capcut.com',
    rating: 4.83,
    reviewsCount: 16800,
    tags: ['Video Editing', 'Social Media', 'Auto-captions', 'TikTok']
  },
  {
    id: 40,
    name: 'Zapier Central Agents',
    category: 'Automation',
    icon: '🔄',
    domain: 'zapier.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=zapier.com&sz=128',
    description: 'Create and deploy custom AI coworkers that autonomously execute multistep business operations across 7,000+ software platforms.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://zapier.com/central',
    rating: 4.79,
    reviewsCount: 4800,
    tags: ['AI Coworkers', '7000+ Integrations', 'Multi-app', 'No-Code']
  },
  {
    id: 41,
    name: 'Lovable.dev',
    category: 'Code',
    icon: '❤️',
    domain: 'lovable.dev',
    logoUrl: 'https://www.google.com/s2/favicons?domain=lovable.dev&sz=128',
    description: 'The viral fullstack autonomous software engineer. Generates responsive React, Supabase databases, and authentication from plain English prompts.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://lovable.dev',
    rating: 4.93,
    reviewsCount: 14200,
    tags: ['Fullstack', 'React', 'Supabase', 'No-Code to Code'],
    badge: 'Viral #1',
    featured: true
  },
  {
    id: 42,
    name: 'Bolt.new',
    category: 'Code',
    icon: '⚡',
    domain: 'bolt.new',
    logoUrl: 'https://www.google.com/s2/favicons?domain=bolt.new&sz=128',
    description: 'StackBlitz powered in-browser AI development environment. Prompt, build, run, and deploy fullstack web applications entirely in your browser.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://bolt.new',
    rating: 4.91,
    reviewsCount: 11600,
    tags: ['WebContainers', 'Browser IDE', 'Node.js', 'Instant Deploy'],
    badge: 'Trending'
  },
  {
    id: 43,
    name: 'v0.dev by Vercel',
    category: 'Code',
    icon: '▲',
    domain: 'v0.dev',
    logoUrl: 'https://www.google.com/s2/favicons?domain=v0.dev&sz=128',
    description: 'Vercel\'s generative user interface builder. Translates prompts and screenshots into accessible, production-ready React components using Tailwind CSS and shadcn/ui.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://v0.dev',
    rating: 4.92,
    reviewsCount: 15400,
    tags: ['Generative UI', 'Tailwind', 'shadcn/ui', 'React 19'],
    badge: 'UI Builder'
  },
  {
    id: 44,
    name: 'Windsurf by Codeium',
    category: 'Code',
    icon: '🏄',
    domain: 'codeium.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=codeium.com&sz=128',
    description: 'The agentic IDE that understands your codebase flow. Features Cascade multi-file agent workflows, real-time supercomplete, and terminal execution.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://codeium.com/windsurf',
    rating: 4.89,
    reviewsCount: 8900,
    tags: ['Cascade AI', 'IDE', 'Multi-File', 'Developer Agent']
  },
  {
    id: 45,
    name: 'Replit Agent',
    category: 'Code',
    icon: '🚀',
    domain: 'replit.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=replit.com&sz=128',
    description: 'Autonomous development agent that designs, codes, tests, and deploys complete software applications from scratch right in the cloud.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://replit.com',
    rating: 4.87,
    reviewsCount: 9400,
    tags: ['Autonomous Agent', 'Cloud IDE', 'Hosting', 'Database Setup']
  },
  {
    id: 46,
    name: 'Aider AI',
    category: 'Code',
    icon: '💻',
    domain: 'aider.chat',
    logoUrl: 'https://www.google.com/s2/favicons?domain=aider.chat&sz=128',
    description: 'The premier open-source command-line autonomous pair programming tool. Works with Claude 3.5 Sonnet and GPT-4o with automatic git commit history.',
    pricingModel: 'Free',
    priceClass: 'free',
    link: 'https://aider.chat',
    rating: 4.94,
    reviewsCount: 7100,
    tags: ['Terminal Agent', 'Open Source', 'Git Automation', 'CLI']
  },
  {
    id: 47,
    name: 'Flux.1 (Black Forest Labs)',
    category: 'Design',
    icon: '🎨',
    domain: 'blackforestlabs.ai',
    logoUrl: 'https://www.google.com/s2/favicons?domain=blackforestlabs.ai&sz=128',
    description: 'State-of-the-art 12B parameter open-weights visual generative model. Sets the gold standard for anatomy, fine details, and complex typography prompts.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://blackforestlabs.ai',
    rating: 4.96,
    reviewsCount: 18900,
    tags: ['Open Weights', 'Photorealism', 'Typography', 'Text-to-Image'],
    badge: 'Quality #1',
    featured: true
  },
  {
    id: 48,
    name: 'Ideogram 2.0',
    category: 'Design',
    icon: '✍️',
    domain: 'ideogram.ai',
    logoUrl: 'https://www.google.com/s2/favicons?domain=ideogram.ai&sz=128',
    description: 'Industry-leading graphic design and visual generator. Renowned for rendering legible, beautifully styled typography, posters, logos, and T-shirt mockups.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://ideogram.ai',
    rating: 4.91,
    reviewsCount: 13500,
    tags: ['Typography', 'Logo Design', 'Posters', 'Brand Assets'],
    badge: 'Best Text'
  },
  {
    id: 49,
    name: 'Recraft v3',
    category: 'Design',
    icon: '📐',
    domain: 'recraft.ai',
    logoUrl: 'https://www.google.com/s2/favicons?domain=recraft.ai&sz=128',
    description: 'Professional design canvas powered by AI. Generates infinitely scalable vector SVG illustrations, 3D clay graphics, brand color palettes, and icon sets.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://recraft.ai',
    rating: 4.88,
    reviewsCount: 6800,
    tags: ['Vector SVG', 'Icon Systems', 'Brand Design', '3D Graphics']
  },
  {
    id: 50,
    name: 'Magnific AI',
    category: 'Design',
    icon: '🔍',
    domain: 'magnific.ai',
    logoUrl: 'https://www.google.com/s2/favicons?domain=magnific.ai&sz=128',
    description: 'Ultra-high resolution AI upscaler and hallucinating enhancer. Re-imagines fine textures, skin pores, hair, and cinematic details up to 10K resolution.',
    pricingModel: 'Paid',
    priceClass: 'paid',
    link: 'https://magnific.ai',
    rating: 4.89,
    reviewsCount: 7900,
    tags: ['10K Upscale', 'Hallucination', 'Relighting', 'Production VFX']
  },
  {
    id: 51,
    name: 'Runway Gen-3 Alpha',
    category: 'Video',
    icon: '🎬',
    domain: 'runwayml.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=runwayml.com&sz=128',
    description: 'Hollywood-grade generative video model with precise director camera controls, motion brush, text-to-video, and image-to-video rendering.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://runwayml.com',
    rating: 4.93,
    reviewsCount: 16200,
    tags: ['Gen-3', 'Camera Controls', 'VFX', 'Cinematic Video'],
    badge: 'Hollywood Grade',
    featured: true
  },
  {
    id: 52,
    name: 'Kling AI',
    category: 'Video',
    icon: '🎥',
    domain: 'klingai.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=klingai.com&sz=128',
    description: 'Next-generation video synthesis capable of rendering realistic physical simulations, dynamic multi-character action, and up to 2-minute continuous sequences.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://klingai.com',
    rating: 4.90,
    reviewsCount: 10400,
    tags: ['Motion Physics', 'Action Video', 'Realistic Lighting', 'HD Video']
  },
  {
    id: 53,
    name: 'Luma Dream Machine',
    category: 'Video',
    icon: '✨',
    domain: 'lumalabs.ai',
    logoUrl: 'https://www.google.com/s2/favicons?domain=lumalabs.ai&sz=128',
    description: 'High-speed generative video model producing realistic 5-second cinematic shots with smooth camera movements and spatial 3D consistency.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://lumalabs.ai/dream-machine',
    rating: 4.87,
    reviewsCount: 8200,
    tags: ['3D Consistency', 'Fast Video', 'Cinematic', 'World Modeling']
  },
  {
    id: 54,
    name: 'Captions.ai',
    category: 'Video',
    icon: '🎙️',
    domain: 'captions.ai',
    logoUrl: 'https://www.google.com/s2/favicons?domain=captions.ai&sz=128',
    description: 'All-in-one AI creator studio for short-form video. Offers automatic animated captions, eye contact redirection, voice dubbing, and AI twins.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://captions.ai',
    rating: 4.88,
    reviewsCount: 12100,
    tags: ['Eye Contact', 'Auto Captions', 'Shorts', 'AI Talking Heads']
  },
  {
    id: 55,
    name: 'Pika 2.0',
    category: 'Video',
    icon: '🍿',
    domain: 'pika.art',
    logoUrl: 'https://www.google.com/s2/favicons?domain=pika.art&sz=128',
    description: 'Playful and creative video generation suite. Features Pikaffects physics effects (crush, melt, explode, inflate), lip-sync, and sound effects.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://pika.art',
    rating: 4.84,
    reviewsCount: 9100,
    tags: ['Pikaffects', 'Lip Sync', 'Animation', 'Special Effects']
  },
  {
    id: 56,
    name: 'Suno v4',
    category: 'Audio',
    icon: '🎵',
    domain: 'suno.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=suno.com&sz=128',
    description: 'The world\'s leading text-to-music AI platform. Composes full, broadcast-ready songs with lifelike vocals, intricate guitar solos, and custom lyric arrangements.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://suno.com',
    rating: 4.95,
    reviewsCount: 21800,
    tags: ['Music Generation', 'Vocals', 'Instrumentals', 'Radio Ready'],
    badge: 'Music #1',
    featured: true
  },
  {
    id: 57,
    name: 'Udio v1.5',
    category: 'Audio',
    icon: '🎧',
    domain: 'udio.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=udio.com&sz=128',
    description: 'Studio-fidelity generative music workstation. Features advanced stem separation, audio inpainting, genre blending, and pristine audio mastering.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://udio.com',
    rating: 4.90,
    reviewsCount: 13700,
    tags: ['Audio Mastering', 'Stem Separation', 'Genre Blending', 'Music Production']
  },
  {
    id: 58,
    name: 'Cartesia Sonic',
    category: 'Audio',
    icon: '⚡',
    domain: 'cartesia.ai',
    logoUrl: 'https://www.google.com/s2/favicons?domain=cartesia.ai&sz=128',
    description: 'Ultra-low-latency 95ms streaming generative voice synthesis engine. Built for real-time natural conversational AI agents and telephonic assistants.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://cartesia.ai',
    rating: 4.91,
    reviewsCount: 4200,
    tags: ['95ms Latency', 'Voice Streaming', 'Conversational AI', 'API']
  },
  {
    id: 59,
    name: 'NotebookLM by Google',
    category: 'Writing',
    icon: '📓',
    domain: 'google.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=notebooklm.google.com&sz=128',
    description: 'Google\'s personalized AI research notebook grounded entirely in your notes, PDFs, and links. Creates viral 2-host conversational Deep Dive audio podcasts.',
    pricingModel: 'Free',
    priceClass: 'free',
    link: 'https://notebooklm.google.com',
    rating: 4.94,
    reviewsCount: 17400,
    tags: ['Deep Dive Audio', 'PDF Research', 'Grounded Citations', 'Google Gemini'],
    badge: 'Editor Pick',
    featured: true
  },
  {
    id: 60,
    name: 'Consensus',
    category: 'Writing',
    icon: '🔬',
    domain: 'consensus.app',
    logoUrl: 'https://www.google.com/s2/favicons?domain=consensus.app&sz=128',
    description: 'Academic search engine powered by AI. Searches over 200M research papers to synthesize scientific consensus on medicine, nutrition, and economics.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://consensus.app',
    rating: 4.88,
    reviewsCount: 6500,
    tags: ['Scientific Research', 'Peer Reviewed', 'Literature Review', 'Evidence']
  },
  {
    id: 61,
    name: 'Jenni AI',
    category: 'Writing',
    icon: '📝',
    domain: 'jenni.ai',
    logoUrl: 'https://www.google.com/s2/favicons?domain=jenni.ai&sz=128',
    description: 'AI research writing assistant for essays, literature reviews, and papers. Features automated APA/MLA in-text citations and plagiarism checks.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://jenni.ai',
    rating: 4.83,
    reviewsCount: 8100,
    tags: ['Academic Writing', 'Citations', 'Literature Review', 'Theses']
  },
  {
    id: 62,
    name: 'Browse AI',
    category: 'Automation',
    icon: '🤖',
    domain: 'browse.ai',
    logoUrl: 'https://www.google.com/s2/favicons?domain=browse.ai&sz=128',
    description: 'No-code web scraping and monitoring robots. Extract structured data from any website in 2 minutes, turn any site into an API, and track price changes.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://browse.ai',
    rating: 4.87,
    reviewsCount: 6400,
    tags: ['Web Scraping', 'No-Code Robot', 'Price Monitoring', 'Turn Web to API'],
    badge: 'Affiliate 20%'
  },
  {
    id: 63,
    name: 'Gumloop',
    category: 'Automation',
    icon: '🧩',
    domain: 'gumloop.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=gumloop.com&sz=128',
    description: 'Visual drag-and-drop canvas for chaining autonomous LLM agents, web scrapers, and data pipelines. Automates complex browser operations at scale.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://gumloop.com',
    rating: 4.90,
    reviewsCount: 5200,
    tags: ['Agent Pipelines', 'Visual Canvas', 'Data Extraction', 'Workflows']
  },
  {
    id: 64,
    name: 'Lindy.ai',
    category: 'Automation',
    icon: '💼',
    domain: 'lindy.ai',
    logoUrl: 'https://www.google.com/s2/favicons?domain=lindy.ai&sz=128',
    description: 'AI employee platform capable of building autonomous agents that manage email inboxes, calendar scheduling, contract reviews, and CRM data hygiene.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://lindy.ai',
    rating: 4.86,
    reviewsCount: 4700,
    tags: ['AI Employees', 'Inbox Zero', 'Calendar Management', 'Sales Ops']
  },
  {
    id: 65,
    name: 'Relevance AI',
    category: 'Automation',
    icon: '🤝',
    domain: 'relevanceai.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=relevanceai.com&sz=128',
    description: 'Build and hire an entire autonomous workforce of B2B agents for outbound sales prospecting, customer support triage, and competitive research.',
    pricingModel: 'Freemium',
    priceClass: 'freemium',
    link: 'https://relevanceai.com',
    rating: 4.88,
    reviewsCount: 4300,
    tags: ['B2B Workforce', 'SDR Agents', 'Support Triage', 'Enterprise AI']
  }
];

export const promptLibrary: PromptItem[] = [
  { 
    id: 1, 
    title: 'Luxury Chronograph Commercial Studio Shoot', 
    targetAI: 'Midjourney v8.2', 
    category: 'Design', 
    outputType: 'image',
    author: 'StudioKrea Elite',
    aspectRatio: '16:9',
    outputImageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
    tags: ['Product Photography', 'Macro', 'Lighting', 'Commercial'],
    prompt: 'Award-winning commercial product photography of a luxury Swiss chronograph watch, positioned on a wet dark slate stone podium. Cinematic directional spotlight, shallow depth of field, 90mm macro lens, f/2.4 aperture, delicate water mist droplets in the air, hyper-detailed brushed titanium bezel and sapphire glass reflections, 8k resolution, raw style, photorealistic --ar 16:9 --style raw --v 8.2' 
  },
  { 
    id: 2, 
    title: 'Neo-Tokyo Cyberpunk Rain Reflections', 
    targetAI: 'Midjourney v8.2', 
    category: 'Design', 
    outputType: 'image',
    author: 'NexusRender AI',
    aspectRatio: '16:9',
    outputImageUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1200&auto=format&fit=crop',
    tags: ['Sci-Fi', 'Environment', 'Raytracing', 'Atmosphere'],
    prompt: 'A dense futuristic cyberpunk boulevard in Neo-Tokyo during midnight heavy downpour. Glowing holographic kanji advertisements reflected in street puddles, autonomous hovering vehicles cutting through violet and cyan fog, cinematic atmospheric perspective, shot on Arri Alexa 65, Blade Runner aesthetic, unreal engine 5 render, photorealistic --ar 16:9 --v 8.2' 
  },
  { 
    id: 3, 
    title: 'Minimalist Zen Architectural Villa', 
    targetAI: 'Midjourney v8.2', 
    category: 'Design', 
    outputType: 'image',
    author: 'ArchDigest Vision',
    aspectRatio: '16:9',
    outputImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    tags: ['Architecture', 'Minimalism', 'Interior Design', 'Zen'],
    prompt: 'Architectural Digest feature photograph of a modern brutalist concrete villa nestled in a bamboo forest near Kyoto. Floor-to-ceiling glass openings, tranquil reflecting infinity pool, soft golden hour sunlight filtering through wooden slats, warm minimalism, high-end interior styling, 8k --ar 16:9 --style raw --v 8.2' 
  },
  { 
    id: 4, 
    title: '3D Isometric Glassmorphism App Icon System', 
    targetAI: 'Midjourney v8.2', 
    category: 'Design', 
    outputType: 'image',
    author: 'UI8 Master',
    aspectRatio: '1:1',
    outputImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    tags: ['3D Icon', 'SaaS', 'Glassmorphism', 'Product Design'],
    prompt: 'A 3D isometric floating fintech app icon depicting an iridescent glowing crystal graph with translucent frosted glass layers. Vibrant violet and emerald ambient lighting, raytraced subsurface scattering, clean dark background, clay render aesthetic, Blender 3D cycles, hyper-detailed --ar 1:1 --v 8.2' 
  },
  { 
    id: 5, 
    title: 'Production Animated React Navbar Architecture', 
    targetAI: 'Cursor 3.0', 
    category: 'Code', 
    outputType: 'code',
    author: 'Vercel Engineering Fellow',
    tags: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
    prompt: 'Write a production-grade, accessible React TypeScript navbar component using Tailwind CSS and Framer Motion. It must support sticky glassmorphism backdrop, active route highlighting, mobile drawer sheet, keyboard accessibility (WCAG 2.1 AAA), and smooth hover pill indicator transition.',
    outputPreview: `'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function Navbar({ items }: { items: { label: string; href: string }[] }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <nav className="sticky top-4 z-50 mx-auto max-w-5xl rounded-full border border-white/10 bg-black/50 p-2 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4">
        <span className="font-bold text-white tracking-tight">AI Suite</span>
        <div className="flex items-center gap-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => setHovered(item.href)}
              className="relative px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              {hovered === item.href && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-full bg-white/10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}`
  },
  { 
    id: 6, 
    title: 'Next.js 15 Server Action with MongoDB & Prisma', 
    targetAI: 'Cursor 3.0', 
    category: 'Code', 
    outputType: 'code',
    author: 'Senior Fullstack Architect',
    tags: ['Backend', 'Prisma', 'MongoDB', 'Next.js 15'],
    prompt: 'Create an idiomatic Next.js 15 App Router Server Action with Prisma ORM and MongoDB. It must validate inputs with Zod, extract the domain from a URL, enforce rate limits with Upstash Redis, handle database transactions safely, and return typed union responses { success: true, data } | { success: false, error }.',
    outputPreview: `'use server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

const ToolSubmissionSchema = z.object({
  name: z.string().min(2).max(60),
  url: z.string().url(),
  category: z.enum(['Writing', 'Code', 'Design', 'Video', 'Audio', 'Automation']),
  pricing: z.enum(['Free', 'Freemium', 'Paid'])
});

export async function submitToolAction(prevState: any, formData: FormData) {
  const parsed = ToolSubmissionSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors };
  }

  const { name, url, category, pricing } = parsed.data;
  const domain = new URL(url).hostname.replace(/^www\./, '');

  try {
    const tool = await prisma.tool.create({
      data: {
        name,
        link: url,
        domain,
        logoUrl: \`https://www.google.com/s2/favicons?domain=\${domain}&sz=128\`,
        category,
        pricingModel: pricing,
        priceClass: pricing.toLowerCase(),
        status: 'pending'
      }
    });

    revalidatePath('/');
    return { success: true, data: tool };
  } catch (err: any) {
    return { success: false, error: 'Database ingestion failure: ' + err.message };
  }
}`
  },
  { 
    id: 7, 
    title: 'C-Suite SaaS Growth & Retention Intelligence', 
    targetAI: 'Claude Sonnet 5', 
    category: 'Business', 
    outputType: 'text',
    author: 'McKinsey & Co. AI Practice Lead',
    tags: ['Analytics', 'Finance', 'Executive', 'SaaS'],
    prompt: 'You are an elite enterprise CFO and growth strategist. Analyze the raw cohort metrics below: [ARR: $18.4M, Net Revenue Retention: 114%, Gross Churn: 0.8% MoM, Blended CAC Payback: 14.2 months, LTV/CAC: 4.8x]. Deliver an executive memo assessing capital efficiency, runway risk under down-market scenarios, and 3 strategic pricing levers to expand ARPU.',
    outputPreview: `### EXECUTIVE MEMO: STRATEGIC REVENUE & RETENTION REVIEW
**To:** Board of Directors & Executive Committee  
**From:** Office of the CFO & Strategic AI Practice  
**Date:** September 1, 2026  

#### 1. Core Health & Unit Economics Benchmark
* **ARR Health ($18.4M):** Puts the organization firmly in the top decile of Series-B+ enterprise SaaS platforms.
* **Net Revenue Retention (114%):** Strong baseline; enterprise expansion motions are offsetting mid-market churn.
* **LTV/CAC (4.8x) & CAC Payback (14.2 mos):** Outstanding capital efficiency; room to increase marketing spend by 22% while maintaining sub-18-month payback.

#### 2. Strategic Growth Initiatives
1. **Consumption-Based Hybrid Pricing:** Transition heavy AI agent utilization to value-linked credits, capturing 18% unmonetized compute overhead.
2. **Enterprise Tier Segmentation:** Introduce strict VPC/SOC2 Type III isolation tier at a 35% premium for regulated financial & healthcare logos.
3. **Automated Expansion Triggers:** Deploy telemetry-triggered sales alerts when a customer reaches 85% seat utilization.`
  },
  { 
    id: 8, 
    title: '$50K+ ACV B2B Cold Outreach Pipeline', 
    targetAI: 'ChatGPT (GPT-5.6)', 
    category: 'Marketing', 
    outputType: 'text',
    author: 'Hyperbound Sales Accelerator',
    tags: ['Outreach', 'Pipeline', 'High Ticket', 'Conversion'],
    prompt: 'Draft a 3-touch high-ticket B2B cold email sequence targeting enterprise CTOs and VP Eng for our AI code security platform. Rules: Touch 1 must cite a specific recent dependency vulnerability vector. Touch 2 must offer an interactive 60-second sandbox audit (no sales pitch). Touch 3 is a polite breakup email. Keep all emails under 85 words.',
    outputPreview: `SUBJECT: quick question on your repo security audit

Hi {{firstName}},

Saw your engineering team recently scaled your core monorepo to 40+ active contributors. 

Most CTOs we work with noticed that autonomous AI coding agents (like Cursor and Copilot) inadvertently commit third-party API tokens into internal PR branches at 4x the rate of human devs.

We built a 60-second headless audit that scans your last 50 commits with zero repo write access. 

Open to me sending over the 2-minute Loom breakdown?

Best,
Alex`
  },
  {
    id: 9,
    title: 'Photorealistic Editorial Cinematic Portrait',
    targetAI: 'Flux.1',
    category: 'Design',
    outputType: 'image',
    author: 'Vogue AI Studio',
    aspectRatio: '16:9',
    tags: ['Flux.1', 'Cinematic', 'Portrait', 'Photorealism'],
    prompt: 'Cinematic medium close-up of a 30-year-old Scandinavian architect inspecting blueprints on a glass desk at dusk. Soft ambient twilight mixed with warm 3200k incandescent task lighting, shot on 35mm Kodak Portra 400, natural skin pores and subtle imperfections, realistic depth of field, authentic fabric texture, no plastic sheen, masterpiece.',
    outputImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 10,
    title: 'Fullstack Modern Analytics Dashboard Component',
    targetAI: 'v0.dev',
    category: 'Code',
    outputType: 'code',
    author: 'Vercel UI Fellow',
    aspectRatio: '16:9',
    tags: ['v0.dev', 'React', 'Tailwind', 'shadcn/ui'],
    prompt: 'Create a high-density enterprise SaaS analytics dashboard card using Tailwind CSS, Lucide React icons, and accessible HTML. Include a 30-day MRR sparkline, month-over-month growth delta pills with green/red status badges, hover tooltips, and an export CSV dropdown action button.',
    outputPreview: `export function RevenueMetricCard({ mrr, delta, chartData }: Props) {
  return (
    <div className="rounded-2xl border border-border/40 bg-card/60 p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Monthly Recurring Revenue</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
          <TrendingUp className="h-3 w-3" /> +18.4% MoM
        </span>
      </div>
      <div className="mt-4 flex items-baseline gap-3">
        <span className="text-3xl font-extrabold tracking-tight">$148,920</span>
        <span className="text-xs text-muted-foreground">vs $125,750 last month</span>
      </div>
    </div>
  );
}`
  },
  {
    id: 11,
    title: 'Cyberpunk Synthwave Driving Anthem',
    targetAI: 'Suno v4',
    category: 'Audio',
    outputType: 'text',
    author: 'NeonWave Producer',
    tags: ['Suno', 'Synthwave', 'Music', 'Vocals'],
    prompt: '[Style: 80s Retrowave, Dark Synthwave, 128 BPM, analog Moog bassline, punchy gated snare, lush female vocal hook] [Intro: pulsing arpeggiator, atmospheric rain tape-stop] [Verse 1: Neon reflections on the windshield, midnight highway with nowhere to turn] [Chorus: soaring vocal lead with wide stereo chorus and energetic analog synth drop]',
    outputPreview: `[Genre: 80s Dark Synthwave, Analog Moog Bass, 128 BPM]
[Structure]
[Intro - Pulsing 16th-note analog bass, distant rain ambience]
[Verse 1 - Female Vocals, breathy and intimate]
Midnight highway cutting through the chrome
Hologram billboards watching as I roam
Speedometer climbing past the danger line
Leaving every shadow of your ghost behind

[Chorus - Powerful anthemic vocal drop with lush polyphonic synths]
We are neon ghosts in the electric rain
Running through the static to erase the pain!`
  },
  {
    id: 12,
    title: 'Multi-Tenant RBAC Database & Auth Architecture',
    targetAI: 'Lovable.dev',
    category: 'Code',
    outputType: 'code',
    author: 'Fullstack Velocity Architect',
    aspectRatio: '16:9',
    tags: ['Lovable', 'Supabase', 'PostgreSQL', 'RBAC'],
    prompt: 'Generate an end-to-end Supabase PostgreSQL schema with strict Row Level Security (RLS) for a multi-tenant B2B application. Tables required: organizations, users, memberships (roles: owner, admin, member), and projects. Provide the security definer function to check tenant access efficiently.',
    outputPreview: `-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Organizations Table
create table organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  created_at timestamptz default now()
);

-- Organization Memberships with Roles
create table organization_memberships (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references organizations(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role text check (role in ('owner', 'admin', 'member')) not null default 'member',
  created_at timestamptz default now(),
  unique(org_id, user_id)
);

-- Fast Security Definer Helper for RLS
create or replace function get_user_org_ids()
returns setof uuid security definer set search_path = public stable as $$
  select org_id from organization_memberships where user_id = auth.uid();
$$ language sql;`
  }
];
