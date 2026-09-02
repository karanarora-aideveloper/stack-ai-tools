import fs from "fs";
import path from "path";

// Curated high-resolution Unsplash images for crazy AI visuals
const IMAGES = {
  claude: [
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80"
  ],
  code: [
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
  ],
  video: [
    "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=1200&q=80"
  ],
  audio: [
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80"
  ],
  design: [
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
  ],
  automation: [
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"
  ],
  writing: [
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=1200&q=80"
  ],
  marketing: [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
  ],
  business: [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
  ]
};

function getRandomImage(cat) {
  const list = IMAGES[cat] || IMAGES.code;
  return list[Math.floor(Math.random() * list.length)];
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Read existing articles to preserve them as high-priority seeds
const existingArticlesPath = path.join(process.cwd(), "data", "articles.json");
let existingArticles = [];
if (fs.existsSync(existingArticlesPath)) {
  try {
    existingArticles = JSON.parse(fs.readFileSync(existingArticlesPath, "utf8"));
    console.log(`Loaded ${existingArticles.length} existing base articles.`);
  } catch (e) {
    console.error("Error reading existing articles:", e);
  }
}

const seenSlugs = new Set(existingArticles.map(a => a.slug));
const allArticles = [...existingArticles];

console.log("Generating remaining articles up to 10,000...");

// 1. ANTHROPIC & CLAUDE FRONTIER ARTICLES (September 2, 2026 Focus)
const CLAUDE_TOPICS = [
  "Claude 3.7 Sonnet Hybrid Reasoning & Thinking Budgets: Complete Engineering Benchmark",
  "Claude Code CLI Deep Dive: Autonomous Terminal Agent for Complex Codebases",
  "Claude Computer Use API: Architecture, Action Execution & Enterprise Security",
  "Claude Artifacts 2.0: Building Fullstack React & Next.js Apps Interactively",
  "Model Context Protocol (MCP) Server Masterclass: Building Multi-Agent Tool Meshes",
  "Claude Prompt Engineering 2026: XML Tags, System Directives & Extended Thinking Protocols",
  "Claude Opus 3.5 Frontier Evaluation: Mathematical Proofs & SWE-bench Benchmarks",
  "Claude 3.5 Haiku at Scale: Sub-180ms Latency Economics in High-Volume APIs",
  "Claude Enterprise Zero Data Retention: SOC2 Type II, HIPAA & VPC Deployment Guide",
  "Claude vs OpenAI o3-mini: Which Reasoning Engine Wins for Autonomous Coding in 2026?",
  "Claude vs DeepSeek-R1: Open vs Closed Reasoning Showdown",
  "Building an Autonomous DevOps Pipeline Using Claude Code and GitHub Actions",
  "Optimizing Claude Token Consumption: Prompt Caching & Message Truncation Strategies",
  "Claude Function Calling & Tool Orchestration: Handling 100+ Schema Tools in Production",
  "How to Migrate from OpenAI Assistants to Claude Agentic Workflows in 2026",
  "Claude Vision Capabilities: Automated Figma-to-Code and UI Inspection Pipelines",
  "Claude for Financial Modeling: SEC 10-K Parsing and Multi-Year Revenue Forecasts",
  "Claude in Healthcare & Biotech: Clinical Trial Protocol Synthesis and PubMed Ingestion",
  "Claude in Legal Tech: Contract Clause Risk Extraction and Autonomous Redlining",
  "Claude System Prompts: 25 Production-Tested Templates for Engineering Teams"
];

// Sub-angles for Claude topics to generate 1,200+ Claude-specific in-depth variations
const CLAUDE_MODIFIERS = [
  { role: "Software Architects", intent: "System Design & Scale" },
  { role: "Founders", intent: "Unit Economics & ROI" },
  { role: "DevOps Engineers", intent: "CI/CD & Infrastructure" },
  { role: "Fullstack Developers", intent: "Next.js & React Integration" },
  { role: "AI Researchers", intent: "Evaluation Benchmarks & Loss Curvatures" },
  { role: "Product Managers", intent: "Product Delivery & Feature Velocity" },
  { role: "Enterprise Security Teams", intent: "Data Loss Prevention & Compliance" },
  { role: "Growth Marketers", intent: "Programmatic Copy & A/B Experiments" },
  { role: "Data Engineers", intent: "ETL Pipelines & Schema Transformation" },
  { role: "Cybersecurity Analysts", intent: "Vulnerability Auditing & AST Scanning" },
  { role: "Technical Leads", intent: "Team Productivity & Onboarding Metrics" },
  { role: "FinTech Builders", intent: "High-Frequency Transaction Auditing" },
  { role: "HealthTech Innovators", intent: "HIPAA Compliant Patient Intake" },
  { role: "Legal Operations", intent: "Cross-Jurisdictional Regulatory Audits" },
  { role: "E-Commerce Brands", intent: "Autonomous Product Description Workflows" },
  { role: "Agency Owners", intent: "Client Deliverable Automation & Margins" },
  { role: "Indie Hackers", intent: "Building $50k MRR Micro-SaaS" },
  { role: "Game Developers", intent: "Dynamic NPC Dialogue & World Generation" },
  { role: "Mobile Engineers", intent: "React Native & Flutter Code Generation" },
  { role: "Cloud Architects", intent: "AWS Bedrock vs Google Vertex Claude Hosting" }
];

// 2. FRONTIER AUTONOMOUS CODING AGENTS & TOOLS
const CODING_TOOLS = [
  "Cursor 3.0", "Windsurf", "Bolt.new", "Devin 2.0", "Aider", "Lovable.dev", "v0 by Vercel",
  "CodeRabbit", "Continue.dev", "Cline", "Roo Code", "Ollama", "Qwen 2.5 Coder",
  "DeepSeek-R1", "DeepSeek-V3", "GitHub Copilot Workspace", "Replit Agent", "Supermaven",
  "Pieces for Developers", "Tabnine Enterprise", "Augment Code", "Magic AI Llama", "Claude Code"
];

// 3. AI VIDEO & GENERATIVE MEDIA TOOLS
const VIDEO_MEDIA_TOOLS = [
  "HeyGen", "Runway Gen-4", "Runway Gen-3 Alpha", "Synthesia", "Sora", "Kling AI 1.5",
  "Luma Dream Machine", "Pika 2.0", "Hailuo Minimax", "Descript", "Opus Clip", "D-ID",
  "Vids", "Captions AI", "InVideo AI", "Fliki", "Elai.io", "Colossyan", "DeepBrain AI"
];

// 4. IMAGE, 3D & GRAPHIC DESIGN TOOLS
const DESIGN_IMAGE_TOOLS = [
  "Midjourney v7", "Midjourney v8", "Flux.1 Pro", "Flux.1 Schnell", "Flux.1 Dev",
  "Ideogram 2.0", "Recraft v3", "Stable Diffusion 3.5", "ComfyUI", "Canva Magic Studio",
  "PhotoRoom", "Civitai", "Leonardo AI", "Freepik Pikaso", "Krea AI", "Magnific AI",
  "Stylar AI", "Scenario AI", "Photoroom Pro", "Meshy 3D", "Luma Genie 3D"
];

// 5. AUDIO, SPEECH & VOICE CLONING TOOLS
const AUDIO_VOICE_TOOLS = [
  "ElevenLabs Gen-3", "Cartesia Sonic", "Suno v4.5", "Suno v4", "Udio v2", "Udio v1.5",
  "Murf AI", "PlayHT", "Resemble AI", "Speechify AI", "Soundraw", "Mubert",
  "Deepgram Nova-2", "AssemblyAI", "Whisper large-v3-turbo", "Voicemod", "Weights.gg"
];

// 6. WORKFLOW AUTOMATION, AGENTS & PRODUCTIVITY TOOLS
const AUTOMATION_PRODUCTIVITY_TOOLS = [
  "Make.com", "Zapier Central", "n8n AI", "Taskade AI", "MeetGeek", "Fireflies.ai",
  "Otter.ai", "SaneBox", "Browse AI", "SiteGPT", "Chatbase", "Lindy.ai",
  "Beam AI", "Adept AI", "Agent Zero", "AutoGPT", "CrewAI", "LlamaIndex",
  "Langfuse", "Mem.ai", "Notion AI", "Glean", "Consensus", "Elicit", "SciSpace"
];

// Primary category definitions
const CATEGORIES_DATA = [
  { name: "Code", cat: "code", tools: CODING_TOOLS },
  { name: "Video", cat: "video", tools: VIDEO_MEDIA_TOOLS },
  { name: "Audio", cat: "audio", tools: AUDIO_VOICE_TOOLS },
  { name: "Design", cat: "design", tools: DESIGN_IMAGE_TOOLS },
  { name: "Automation", cat: "automation", tools: AUTOMATION_PRODUCTIVITY_TOOLS }
];

// Article formats to create 10,000 realistic, high-intent variations
const ARTICLE_PATTERNS = [
  {
    template: "{tool} Review (2026): Pricing, Latency Benchmarks & Production ROI",
    intent: "review",
    volumeRange: [4000, 35000],
    cpcRange: [3.5, 9.5],
    diffRange: [1, 3]
  },
  {
    template: "Top 10 {tool} Alternatives in 2026: Tested & Ranked for {role}",
    intent: "alternatives",
    volumeRange: [6000, 45000],
    cpcRange: [4.2, 11.0],
    diffRange: [1, 4]
  },
  {
    template: "{tool1} vs {tool2} (2026 Showdown): Head-to-Head Benchmark for {role}",
    intent: "showdown",
    volumeRange: [3500, 28000],
    cpcRange: [3.8, 10.5],
    diffRange: [1, 3]
  },
  {
    template: "How to Use {tool} for {intent}: Step-by-Step Production Guide (2026)",
    intent: "tutorial",
    volumeRange: [2500, 22000],
    cpcRange: [2.5, 7.5],
    diffRange: [1, 2]
  },
  {
    template: "Why {tool} is Essential for {role} in 2026 (Case Study & ROI Analysis)",
    intent: "case-study",
    volumeRange: [1800, 16000],
    cpcRange: [3.0, 8.5],
    diffRange: [1, 2]
  },
  {
    template: "{tool} Pricing Breakdown (2026): Hidden Costs, Token Limits & Best Plans",
    intent: "pricing",
    volumeRange: [5000, 32000],
    cpcRange: [4.5, 12.0],
    diffRange: [1, 3]
  },
  {
    template: "The Ultimate Guide to {tool} Architecture, API Integration & Enterprise Security",
    intent: "architecture",
    volumeRange: [2000, 18000],
    cpcRange: [3.2, 8.8],
    diffRange: [1, 2]
  },
  {
    template: "Common Mistakes When Deploying {tool} (And How Top {role} Avoid Them in 2026)",
    intent: "pitfalls",
    volumeRange: [1500, 14000],
    cpcRange: [2.8, 7.2],
    diffRange: [1, 2]
  }
];

function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

let nextId = allArticles.length > 0 ? Math.max(...allArticles.map(a => a.id)) + 1 : 1;

// Phase 1: Exhaustive Claude Topics Generation
console.log("Phase 1: Generating Deep Claude 3.7 & Anthropic Frontier Topics...");
for (const topic of CLAUDE_TOPICS) {
  for (const mod of CLAUDE_MODIFIERS) {
    if (allArticles.length >= 10000) break;

    const title = `${topic}: The 2026 Master Guide for ${mod.role} (${mod.intent})`;
    const slug = slugify(title);
    if (seenSlugs.has(slug)) continue;
    seenSlugs.add(slug);

    allArticles.push({
      id: nextId++,
      slug,
      title,
      category: "code",
      primaryKeyword: `${topic.split(":")[0].toLowerCase()} for ${mod.role.toLowerCase()}`,
      searchVolume: randBetween(3500, 42000),
      difficulty: randBetween(1, 4),
      cpc: randFloat(3.8, 12.5),
      readTime: `${randBetween(14, 25)} min read`,
      featured: allArticles.length < 20,
      excerpt: `Exhaustive benchmark audit and technical breakdown of ${topic.split(":")[0]} for ${mod.role}. Verified as of September 2, 2026 with production telemetry, latency tests, and token economics.`,
      imageUrl: getRandomImage("claude"),
      author: "Karan Arora",
      authorRole: "Founder & Chief AI Architect",
      publishedAt: "2026-08-20",
      updatedAt: "2026-09-02",
      tags: ["Claude 3.7", "Anthropic", "Frontier AI", mod.role, "Tested Sept 2026"]
    });
  }
}

// Phase 2: Systematic Tool Review, Alternatives & Pricing Matrices
console.log("Phase 2: Generating Systematic Tool Reviews & Alternatives Matrices...");
for (const catGroup of CATEGORIES_DATA) {
  for (const tool of catGroup.tools) {
    if (allArticles.length >= 10000) break;

    for (const pat of ARTICLE_PATTERNS) {
      if (allArticles.length >= 10000) break;

      for (const mod of CLAUDE_MODIFIERS.slice(0, 10)) {
        if (allArticles.length >= 10000) break;

        // Pick a showdown partner
        const otherTools = catGroup.tools.filter(t => t !== tool);
        const tool2 = otherTools[Math.floor(Math.random() * otherTools.length)] || "Top Competitors";

        const title = pat.template
          .replace("{tool}", tool)
          .replace("{tool1}", tool)
          .replace("{tool2}", tool2)
          .replace("{role}", mod.role)
          .replace("{intent}", mod.intent);

        const slug = slugify(title);
        if (seenSlugs.has(slug)) continue;
        seenSlugs.add(slug);

        allArticles.push({
          id: nextId++,
          slug,
          title,
          category: catGroup.cat,
          primaryKeyword: `${tool.toLowerCase()} ${pat.intent} 2026`,
          searchVolume: randBetween(pat.volumeRange[0], pat.volumeRange[1]),
          difficulty: randBetween(pat.diffRange[0], pat.diffRange[1]),
          cpc: randFloat(pat.cpcRange[0], pat.cpcRange[1]),
          readTime: `${randBetween(12, 22)} min read`,
          featured: false,
          excerpt: `In-depth 2026 evaluation of ${tool} tailored for ${mod.role}. Comprehensive analysis covering accuracy, cost benchmarks, real-world integration pitfalls, and vetted user ratings.`,
          imageUrl: getRandomImage(catGroup.cat),
          author: "Karan Arora",
          authorRole: "Founder & Chief AI Architect",
          publishedAt: "2026-08-15",
          updatedAt: "2026-09-02",
          tags: [catGroup.cat, tool, mod.role, "2026 Tested", "Guide"]
        });
      }
    }
  }
}

// Phase 3: Head-to-Head Showdowns Across All Category Tool Pairs
console.log("Phase 3: Generating Head-to-Head Showdowns Across Tool Permutations...");
for (const catGroup of CATEGORIES_DATA) {
  const tools = catGroup.tools;
  for (let i = 0; i < tools.length; i++) {
    for (let j = i + 1; j < tools.length; j++) {
      if (allArticles.length >= 10000) break;

      const t1 = tools[i];
      const t2 = tools[j];

      const showdownThemes = [
        "Head-to-Head Benchmark (Accuracy, Speed & Latency)",
        "Pricing & Compute Cost Comparison for Startups",
        "Developer Experience, API Robustness & Documentation",
        "Enterprise Security, Privacy & SOC2 Compliance",
        "Real-World Production Stress Test"
      ];

      for (const theme of showdownThemes) {
        if (allArticles.length >= 10000) break;

        const title = `${t1} vs ${t2} in 2026: ${theme}`;
        const slug = slugify(title);
        if (seenSlugs.has(slug)) continue;
        seenSlugs.add(slug);

        allArticles.push({
          id: nextId++,
          slug,
          title,
          category: catGroup.cat,
          primaryKeyword: `${t1.toLowerCase()} vs ${t2.toLowerCase()} 2026`,
          searchVolume: randBetween(3000, 38000),
          difficulty: randBetween(1, 4),
          cpc: randFloat(3.5, 9.8),
          readTime: `${randBetween(14, 24)} min read`,
          featured: false,
          excerpt: `Direct head-to-head comparison between ${t1} and ${t2} as of September 2026. Audited benchmarks across ${theme.toLowerCase()} to help you choose the right platform.`,
          imageUrl: getRandomImage(catGroup.cat),
          author: "Karan Arora",
          authorRole: "Founder & Chief AI Architect",
          publishedAt: "2026-08-25",
          updatedAt: "2026-09-02",
          tags: [catGroup.cat, t1, t2, "Showdown", "Tested Sept 2026"]
        });
      }
    }
  }
}

// Phase 4: Fill Remaining to Exactly 10,000 Articles with High-Intent Vertical Blueprints
console.log("Phase 4: Generating Vertical Industry AI Blueprints to Reach Exactly 10,000...");
const INDUSTRIES = [
  "SaaS Founders", "FinTech Startups", "Healthcare Clinics", "E-Commerce Stores",
  "B2B Sales Teams", "Legal Firms", "Real Estate Brokerages", "Agencies",
  "EdTech Platforms", "Cybersecurity Operations", "Bioinformatics Labs",
  "Game Studios", "Architecture Firms", "Logistics & Supply Chain", "Media Publications"
];

const WORKFLOWS = [
  "Autonomous Customer Acquisition", "Code Refactoring & Technical Debt Reduction",
  "Generative Video Marketing Campaigns", "Multi-Agent Document Processing",
  "High-Volume Lead Enrichment & Qualification", "Contract Risk Analysis & Redlining",
  "Automated Social Media Video Repurposing", "Enterprise Knowledge Base Retrieval",
  "Speech-to-Text Clinical Documentation", "Real-Time Audio Translation"
];

let indIdx = 0;
let wfIdx = 0;
while (allArticles.length < 10000) {
  const ind = INDUSTRIES[indIdx % INDUSTRIES.length];
  const wf = WORKFLOWS[wfIdx % WORKFLOWS.length];
  const cat = ["code", "automation", "video", "audio", "writing"][indIdx % 5];

  const title = `The Complete 2026 AI Playbook for ${ind}: How to Deploy ${wf}`;
  const slug = slugify(`${title}-${allArticles.length + 1}`);

  if (!seenSlugs.has(slug)) {
    seenSlugs.add(slug);
    allArticles.push({
      id: nextId++,
      slug,
      title,
      category: cat,
      primaryKeyword: `ai for ${ind.toLowerCase()} ${wf.toLowerCase()}`,
      searchVolume: randBetween(1200, 15000),
      difficulty: randBetween(1, 3),
      cpc: randFloat(3.0, 8.5),
      readTime: `${randBetween(15, 25)} min read`,
      featured: false,
      excerpt: `A master technical blueprint designed for ${ind} to implement ${wf} using vetted 2026 frontier AI tools, autonomous agents, and audited prompt architectures.`,
      imageUrl: getRandomImage(cat),
      author: "Karan Arora",
      authorRole: "Founder & Chief AI Architect",
      publishedAt: "2026-08-30",
      updatedAt: "2026-09-02",
      tags: [cat, ind, "Playbook", "Tested Sept 2026", "Guide"]
    });
  }

  indIdx++;
  wfIdx++;
}

console.log(`\nFinal catalog size: ${allArticles.length} articles!`);

// Write the complete 10,000 articles registry to data/articles.json
fs.writeFileSync(existingArticlesPath, JSON.stringify(allArticles, null, 2), "utf8");

const stats = fs.statSync(existingArticlesPath);
console.log(`Successfully saved data/articles.json (${(stats.size / (1024 * 1024)).toFixed(2)} MB)`);
