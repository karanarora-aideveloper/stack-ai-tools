export interface AntigravityMcpServer {
  id: string;
  name: string;
  slug: string;
  category: 
    | 'Google Ecosystem'
    | 'Developer'
    | 'Databases'
    | 'Web & Search'
    | 'Creative & Media'
    | 'Productivity'
    | 'Memory & Reasoning';
  icon: string;
  description: string;
  maintainer: string;
  githubUrl: string;
  stars?: string;
  verified: boolean;
  official: boolean;
  transport: 'stdio' | 'sse';
  command?: string;
  args?: string[];
  serverUrl?: string;
  env?: Record<string, string>;
  keyFeatures: string[];
  samplePrompt: string;
  lazyRecommendation?: boolean;
}

export const ANTIGRAVITY_MCP_CATEGORIES = [
  'All MCPs',
  'Google Ecosystem',
  'Developer',
  'Databases',
  'Web & Search',
  'Creative & Media',
  'Productivity',
  'Memory & Reasoning'
] as const;

export const ANTIGRAVITY_MCP_SERVERS: AntigravityMcpServer[] = [
  // -------------------------------------------------------------
  // GOOGLE ECOSYSTEM
  // -------------------------------------------------------------
  {
    id: 'google-flow',
    name: 'Google Flow Studio',
    slug: 'google-flow',
    category: 'Google Ecosystem',
    icon: '🎬',
    description: 'Generates frontier AI images, cinematic videos, custom character references, and scene grids directly inside Google Antigravity agents.',
    maintainer: 'Google Antigravity Team',
    githubUrl: 'https://antigravity.google/docs/mcp/google-flow',
    stars: '18.4k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@google/antigravity-flow-mcp@latest'],
    env: {
      FLOW_API_KEY: 'your_google_flow_api_key_here'
    },
    keyFeatures: [
      'Cinematic text-to-video rendering',
      'High-resolution multi-aspect image generation',
      'Character reference consistency engine',
      'Scene storyboard generation'
    ],
    samplePrompt: 'Create a hyper-realistic 16:9 cinematic shot of a cybernetic research laboratory using Google Flow and generate a 5-second video sequence.',
    lazyRecommendation: true
  },
  {
    id: 'gmail',
    name: 'Gmail Workspace Connector',
    slug: 'gmail',
    category: 'Google Ecosystem',
    icon: '✉️',
    description: 'Enables Antigravity agents to draft replies, inspect email threads, search mailboxes, and organize labels with secure Google OAuth credentials.',
    maintainer: 'Google Workspace Team',
    githubUrl: 'https://github.com/google/mcp-gmail',
    stars: '12.8k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@googleworkspace/gmail-mcp-server@latest'],
    env: {
      GOOGLE_CLIENT_ID: 'your_oauth_client_id.apps.googleusercontent.com',
      GOOGLE_CLIENT_SECRET: 'your_oauth_client_secret'
    },
    keyFeatures: [
      'Compose and edit draft messages',
      'Search threads by sender, subject, and date',
      'Automated labeling & triage',
      'Spam management & archive handling'
    ],
    samplePrompt: 'Search my inbox for the latest invoices from Vercel and AWS, summarize total spending for this month, and draft a confirmation email to finance.',
    lazyRecommendation: true
  },
  {
    id: 'firebase',
    name: 'Firebase Developer Suite',
    slug: 'firebase',
    category: 'Google Ecosystem',
    icon: '🔥',
    description: 'Deep integration for Cloud Firestore, Firebase Authentication, Security Rules verification, and App Hosting deployments directly from the agent.',
    maintainer: 'Firebase Team',
    githubUrl: 'https://github.com/firebase/firebase-tools',
    stars: '16.9k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', 'firebase-tools@latest', 'mcp'],
    env: {
      FIREBASE_TOKEN: 'your_firebase_ci_token'
    },
    keyFeatures: [
      'Firestore document query and schema introspection',
      'Security rules syntax and vulnerability audit',
      'App Hosting build logs & deployment triggers',
      'Remote Config template updates'
    ],
    samplePrompt: 'Audit our Firestore security rules for the /users and /orders collections to make sure unauthorized reads are strictly rejected.',
    lazyRecommendation: false
  },
  {
    id: 'google-drive',
    name: 'Google Drive & Docs',
    slug: 'google-drive',
    category: 'Google Ecosystem',
    icon: '📁',
    description: 'Enables your agent to search, read, and extract content from Google Docs, Sheets, and Drive files without leaving the Antigravity chat.',
    maintainer: 'Community Starred',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/gdrive',
    stars: '24.5k',
    verified: true,
    official: false,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-gdrive'],
    env: {
      GDRIVE_CREDENTIALS_PATH: '/path/to/credentials.json'
    },
    keyFeatures: [
      'Read and parse Google Docs documents',
      'Full-text search across shared Drives',
      'Extract tabular data from Google Sheets',
      'File metadata and permission inspection'
    ],
    samplePrompt: 'Find our Q3 Product Architecture doc on Google Drive, extract the technical milestones, and cross-reference them against our current git branches.',
    lazyRecommendation: true
  },

  // -------------------------------------------------------------
  // DEVELOPER TOOLS & RUNTIMES
  // -------------------------------------------------------------
  {
    id: 'chrome-devtools',
    name: 'Chrome DevTools Inspector',
    slug: 'chrome-devtools',
    category: 'Developer',
    icon: '🌐',
    description: 'Direct connection to Google Chrome DevTools. Inspect live DOM elements, debug network waterfalls, capture console errors, and audit Core Web Vitals.',
    maintainer: 'Google Chrome Team',
    githubUrl: 'https://github.com/ChromeDevTools/devtools-mcp',
    stars: '7.9k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', 'chrome-devtools-mcp@latest'],
    keyFeatures: [
      'Live DOM tree and CSS computed style inspection',
      'Network request interception and timing waterfalls',
      'Console log streaming and uncaught error capture',
      'Lighthouse LCP & INP Core Web Vitals diagnostic'
    ],
    samplePrompt: 'Open localhost:3000 in Chrome, inspect the network panel during page load, and explain why the hero image causes high Largest Contentful Paint.',
    lazyRecommendation: false
  },
  {
    id: 'github',
    name: 'GitHub Frontier Connector',
    slug: 'github',
    category: 'Developer',
    icon: '🐙',
    description: 'Empowers Antigravity to review Pull Requests, search repositories, inspect file diffs, manage branches, and post automated code review comments.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/github',
    stars: '24.5k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-github'],
    env: {
      GITHUB_PERSONAL_ACCESS_TOKEN: 'ghp_your_github_pat_token_here'
    },
    keyFeatures: [
      'Search across repos, code, and commit history',
      'Inspect PR diffs and line-by-line code reviews',
      'Automate issue triage and milestone updates',
      'Manage branches, merges, and git tags'
    ],
    samplePrompt: 'Review the latest open pull request on my repository, find any security vulnerabilities or race conditions, and draft a detailed inline review.',
    lazyRecommendation: false
  },
  {
    id: 'filesystem',
    name: 'Local Filesystem Sandbox',
    slug: 'filesystem',
    category: 'Developer',
    icon: '📂',
    description: 'Gives Antigravity safe, sandboxed access to browse directory trees, read code files, and create new project assets in approved folders.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem',
    stars: '24.5k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-filesystem', '/Users/username/Projects'],
    keyFeatures: [
      'Multi-file read and write operations',
      'Safe path sandboxing preventing directory traversal',
      'Directory tree introspection and glob matching',
      'Binary asset handling and metadata inspection'
    ],
    samplePrompt: 'Scan my project folder for any outdated React class components and modernize them into React 19 functional components with TypeScript.',
    lazyRecommendation: false
  },
  {
    id: 'playwright',
    name: 'Playwright Browser Automation',
    slug: 'playwright',
    category: 'Developer',
    icon: '🎭',
    description: 'Headless and visual browser automation. Allows your Antigravity agent to navigate websites, click elements, fill forms, and take screenshots.',
    maintainer: 'ExecuteAutomation',
    githubUrl: 'https://github.com/executeautomation/mcp-playwright',
    stars: '4.8k',
    verified: true,
    official: false,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@executeautomation/playwright-mcp-server'],
    keyFeatures: [
      'Full-page high-DPI screenshots',
      'Automated form submission and input typing',
      'End-to-end user journey simulation',
      'Multi-tab browser session management'
    ],
    samplePrompt: 'Go to our staging site, add an item to the shopping cart, proceed to checkout, and take a screenshot verifying the order summary modal renders properly.',
    lazyRecommendation: true
  },
  {
    id: 'puppeteer',
    name: 'Puppeteer Web Renderer',
    slug: 'puppeteer',
    category: 'Developer',
    icon: '🎪',
    description: 'Chromium automation tool for fast client-side rendering, PDF generation, and executing arbitrary client scripts inside an isolated browser context.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer',
    stars: '24.5k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-puppeteer'],
    keyFeatures: [
      'Fast client-side JavaScript execution',
      'PDF generation from HTML/CSS layouts',
      'High-speed DOM screenshot captures',
      'Cookie and session storage manipulation'
    ],
    samplePrompt: 'Render our pricing page in 1440x900 viewport, capture an image of the comparison table, and verify that the annual discount badge is visible.',
    lazyRecommendation: true
  },
  {
    id: 'git',
    name: 'Git Version Control',
    slug: 'git',
    category: 'Developer',
    icon: '🌿',
    description: 'Direct git CLI wrapper enabling Antigravity to check out branches, inspect commit logs, parse diffs, and generate clean conventional commits.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/git',
    stars: '24.5k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'uvx',
    args: ['mcp-server-git', '--repository', '/path/to/repo'],
    keyFeatures: [
      'Unified git diff inspection',
      'Commit log search and author filtering',
      'Branch staging, checkout, and rebasing',
      'Merge conflict analysis and resolution'
    ],
    samplePrompt: 'Compare my local working branch with origin/main, summarize all architectural changes, and draft an informative git commit message.',
    lazyRecommendation: false
  },
  {
    id: 'docker',
    name: 'Docker Container Engine',
    slug: 'docker',
    category: 'Developer',
    icon: '🐳',
    description: 'Inspect running containers, stream container logs, rebuild local images, and manage development microservices from your Antigravity chat.',
    maintainer: 'Community Starred',
    githubUrl: 'https://github.com/ckreiling/mcp-server-docker',
    stars: '2.6k',
    verified: true,
    official: false,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', 'mcp-server-docker'],
    keyFeatures: [
      'Inspect container health and resource utilization',
      'Stream real-time stdout/stderr container logs',
      'Start, stop, and restart local containers',
      'Docker Compose service orchestration'
    ],
    samplePrompt: 'Check our running Docker containers, locate why the redis container is failing healthchecks, and inspect the last 100 log lines.',
    lazyRecommendation: true
  },
  {
    id: 'sentry',
    name: 'Sentry Error Triage',
    slug: 'sentry',
    category: 'Developer',
    icon: '🚨',
    description: 'Triage production errors, inspect stacktraces, analyze user impact, and resolve regression alerts directly with your autonomous coding agent.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/sentry',
    stars: '24.5k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'uvx',
    args: ['mcp-server-sentry', '--auth-token', 'your_sentry_token_here'],
    keyFeatures: [
      'Retrieve recent unhandled exceptions and crashes',
      'Stack trace mapping to local source code files',
      'Issue tagging, assignment, and status resolution',
      'Release health and error frequency monitoring'
    ],
    samplePrompt: 'Pull the most frequent unhandled exception from our production Sentry project, inspect the stack trace, and locate the root cause in our codebase.',
    lazyRecommendation: true
  },

  // -------------------------------------------------------------
  // DATABASES & STORAGE
  // -------------------------------------------------------------
  {
    id: 'postgresql',
    name: 'PostgreSQL Database',
    slug: 'postgresql',
    category: 'Databases',
    icon: '🐘',
    description: 'Direct read-only or read-write access to PostgreSQL databases. Allows Antigravity to inspect schemas, optimize slow queries, and write migrations.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/postgres',
    stars: '24.5k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-postgres', 'postgresql://user:password@localhost:5432/mydb'],
    keyFeatures: [
      'Schema reflection and foreign key mapping',
      'Safe read-only SQL execution',
      'Query plan EXPLAIN ANALYZE performance tuning',
      'DDL migration script generation'
    ],
    samplePrompt: 'Inspect our Postgres schema, identify tables lacking indexes on frequently filtered columns, and generate an optimized migration script.',
    lazyRecommendation: false
  },
  {
    id: 'supabase',
    name: 'Supabase Cloud Backend',
    slug: 'supabase',
    category: 'Databases',
    icon: '⚡',
    description: 'Manage Supabase projects, write Edge Functions, query Postgres tables, inspect storage buckets, and audit Row Level Security (RLS) policies.',
    maintainer: 'Supabase Community',
    githubUrl: 'https://github.com/supabase-community/mcp-supabase',
    stars: '4.3k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@supabase/mcp-server'],
    env: {
      SUPABASE_URL: 'https://your-project.supabase.co',
      SUPABASE_KEY: 'your-service-role-or-anon-key'
    },
    keyFeatures: [
      'Row Level Security (RLS) policy audit',
      'Query Postgres tables and views',
      'Edge Function deployment and logs',
      'Storage bucket access and permissions'
    ],
    samplePrompt: 'Audit our Supabase users and subscriptions tables to ensure RLS is enabled and users cannot read each other\'s billing details.',
    lazyRecommendation: false
  },
  {
    id: 'sqlite',
    name: 'SQLite Local Database',
    slug: 'sqlite',
    category: 'Databases',
    icon: '🗄️',
    description: 'Fast local SQLite database inspection. Query local `.sqlite` or `.db` files, run analytical queries, and introspect indexes without external dependencies.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite',
    stars: '24.5k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'uvx',
    args: ['mcp-server-sqlite', '--db-path', '/path/to/database.db'],
    keyFeatures: [
      'Zero-config local database querying',
      'Table schema and column type reflection',
      'Read-only safety guardrails',
      'Analytical aggregation queries'
    ],
    samplePrompt: 'Connect to our local development sqlite database, list all tables, and find the top 10 most viewed articles in the analytics table.',
    lazyRecommendation: false
  },
  {
    id: 'redis',
    name: 'Redis In-Memory Store',
    slug: 'redis',
    category: 'Databases',
    icon: '🔴',
    description: 'Inspect cache keys, examine TTL expiration, debug pub/sub channels, and monitor memory consumption across your Redis and Dragonfly instances.',
    maintainer: 'Community Starred',
    githubUrl: 'https://github.com/mcp-servers/redis',
    stars: '1.9k',
    verified: true,
    official: false,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@mcp-servers/redis', 'redis://localhost:6379'],
    keyFeatures: [
      'Inspect keys, types, and TTL expirations',
      'Hash and set inspection',
      'Memory footprint analysis',
      'Pub/sub event monitoring'
    ],
    samplePrompt: 'Scan our Redis cache for keys matching user:session:*, inspect their TTLs, and check if any expired sessions are lingering.',
    lazyRecommendation: true
  },

  // -------------------------------------------------------------
  // WEB & SEARCH
  // -------------------------------------------------------------
  {
    id: 'brave-search',
    name: 'Brave Search Engine',
    slug: 'brave-search',
    category: 'Web & Search',
    icon: '🦁',
    description: 'Provides real-time privacy-preserving web search and local POI lookups to keep Antigravity agents grounded with current documentation and news.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search',
    stars: '24.5k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-brave-search'],
    env: {
      BRAVE_API_KEY: 'your_brave_search_api_key'
    },
    keyFeatures: [
      'Fresh index search across global web sources',
      'Local geographic search and business info',
      'Zero user tracking and privacy compliance',
      'Fast JSON search results payload'
    ],
    samplePrompt: 'Search the web for Next.js 16 breaking changes regarding Server Actions and caching headers, and summarize the migration checklist.',
    lazyRecommendation: false
  },
  {
    id: 'fetch',
    name: 'Fetch Web Content Scraper',
    slug: 'fetch',
    category: 'Web & Search',
    icon: '📥',
    description: 'Fetches static or public web pages, converts complex HTML into clean LLM-friendly Markdown, and extracts core readability content in milliseconds.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/fetch',
    stars: '24.5k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'uvx',
    args: ['mcp-server-fetch'],
    keyFeatures: [
      'High-speed HTML to Markdown conversion',
      'Readability extraction stripping navbars and ads',
      'Custom User-Agent and header support',
      'Fast HTTP payload ingestion'
    ],
    samplePrompt: 'Fetch the official Prisma documentation page on MongoDB relations and extract the schema definition for many-to-many relationship modeling.',
    lazyRecommendation: false
  },
  {
    id: 'readwise',
    name: 'Readwise Reader Knowledge',
    slug: 'readwise',
    category: 'Web & Search',
    icon: '📚',
    description: 'Query your personal Readwise knowledge base, book highlights, web articles, PDFs, and RSS feeds to ground Antigravity in your curated reading.',
    maintainer: 'Readwise Community',
    githubUrl: 'https://github.com/mcp-community/readwise-mcp',
    stars: '1.4k',
    verified: true,
    official: false,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', 'readwise-mcp-server'],
    env: {
      READWISE_API_TOKEN: 'your_readwise_token'
    },
    keyFeatures: [
      'Search book, article, and tweet highlights',
      'Retrieve saved articles from Reader library',
      'Document tag and note filtering',
      'Sync reading notes with agent context'
    ],
    samplePrompt: 'Search my Readwise highlights for notes on "distributed consensus and Raft", and synthesize them into an architectural brief.',
    lazyRecommendation: true
  },

  // -------------------------------------------------------------
  // CREATIVE & MEDIA
  // -------------------------------------------------------------
  {
    id: 'replicate',
    name: 'Replicate AI Model Runner',
    slug: 'replicate',
    category: 'Creative & Media',
    icon: '⚡',
    description: 'Run thousands of open-source AI models in the cloud: FLUX.1 image synthesis, Llama 3, Whisper audio transcription, and MusicGen audio generation.',
    maintainer: 'Replicate Community',
    githubUrl: 'https://github.com/replicate/mcp-replicate',
    stars: '3.1k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@replicate/mcp-server'],
    env: {
      REPLICATE_API_TOKEN: 'r8_your_replicate_api_token'
    },
    keyFeatures: [
      'Run FLUX.1 and SDXL image generations',
      'Transcribe audio files with Whisper Large',
      'Run speech synthesis and voice cloning',
      'Video generation with CogVideoX'
    ],
    samplePrompt: 'Generate a high-fidelity vector illustration of an astronaut programming on a glowing laptop using FLUX.1 via Replicate.',
    lazyRecommendation: true
  },
  {
    id: 'stability-ai',
    name: 'Stability AI Media Engine',
    slug: 'stability-ai',
    category: 'Creative & Media',
    icon: '🎨',
    description: 'Generates ultra-fast photorealistic imagery, performs image upscaling, background removal, and multi-angle scene transformation via Stability API.',
    maintainer: 'Community Starred',
    githubUrl: 'https://github.com/mcp-community/stability-mcp',
    stars: '1.8k',
    verified: true,
    official: false,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', 'stability-mcp-server'],
    env: {
      STABILITY_API_KEY: 'sk-your_stability_key'
    },
    keyFeatures: [
      'Stable Image Ultra and Core generation',
      '4K image upscaling and enhancement',
      'Instant background removal and replacement',
      'Inpainting and generative fill'
    ],
    samplePrompt: 'Take our app product screenshot, remove the cluttered background, and replace it with a clean minimalist workstation background.',
    lazyRecommendation: true
  },

  // -------------------------------------------------------------
  // PRODUCTIVITY & WORKSPACE
  // -------------------------------------------------------------
  {
    id: 'slack',
    name: 'Slack Communication Hub',
    slug: 'slack',
    category: 'Productivity',
    icon: '💬',
    description: 'Allows your Antigravity agent to read conversation threads, post build notifications, triage bug alerts, and collaborate in public or private channels.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/slack',
    stars: '24.5k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-slack'],
    env: {
      SLACK_BOT_TOKEN: 'xoxb-your-bot-token',
      SLACK_TEAM_ID: 'T0123456789'
    },
    keyFeatures: [
      'Post messages and interactive blocks',
      'Read public and private channel threads',
      'Search channel history and attachments',
      'User status and presence inspection'
    ],
    samplePrompt: 'Read the latest 20 messages from #engineering-incidents, summarize the root cause of the payment gateway downtime, and post a debrief.',
    lazyRecommendation: true
  },
  {
    id: 'notion',
    name: 'Notion Knowledge Base',
    slug: 'notion',
    category: 'Productivity',
    icon: '📓',
    description: 'Direct integration with Notion workspaces. Enables Antigravity to search company wikis, update database properties, and create rich markdown docs.',
    maintainer: 'Community Starred',
    githubUrl: 'https://github.com/mcp-servers/notion',
    stars: '3.7k',
    verified: true,
    official: false,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@mcp-servers/notion'],
    env: {
      NOTION_API_KEY: 'secret_your_notion_integration_token'
    },
    keyFeatures: [
      'Search pages, wikis, and nested databases',
      'Create new pages with formatted blocks',
      'Update database properties and tags',
      'Sync PR change logs to product wikis'
    ],
    samplePrompt: 'Find our Notion document titled "API Architecture v2", review the authentication guidelines, and make sure our new endpoints conform to it.',
    lazyRecommendation: true
  },
  {
    id: 'linear',
    name: 'Linear Issue Tracking',
    slug: 'linear',
    category: 'Productivity',
    icon: '📐',
    description: 'Manage engineering sprints, create issues, attach PR links, query team backlogs, and update project statuses directly within Antigravity.',
    maintainer: 'Jerhadf / Community',
    githubUrl: 'https://github.com/jerhadf/linear-mcp-server',
    stars: '2.8k',
    verified: true,
    official: false,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', 'linear-mcp-server'],
    env: {
      LINEAR_API_KEY: 'lin_api_your_linear_key'
    },
    keyFeatures: [
      'Create and update software engineering issues',
      'Search issues by cycle, team, and priority',
      'Link git commits and branches to tickets',
      'Automated sprint standup summaries'
    ],
    samplePrompt: 'Find all high-priority bugs assigned to me in the current sprint, sort them by priority, and list their ticket descriptions.',
    lazyRecommendation: false
  },
  {
    id: 'airtable',
    name: 'Airtable Relational CMS',
    slug: 'airtable',
    category: 'Productivity',
    icon: '📊',
    description: 'Read and update records in Airtable bases, filter by views, create schema records, and sync marketing or customer data with your agents.',
    maintainer: 'Community Starred',
    githubUrl: 'https://github.com/mcp-community/airtable-mcp',
    stars: '1.6k',
    verified: true,
    official: false,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', 'airtable-mcp-server'],
    env: {
      AIRTABLE_API_KEY: 'pat_your_airtable_token'
    },
    keyFeatures: [
      'Query base records with formula filters',
      'Batch create and update records',
      'Introspect table fields and metadata',
      'Attachment handling and link fields'
    ],
    samplePrompt: 'Query our Airtable "Product Catalog" base, locate all items marked "Needs Review", and update their status once verified.',
    lazyRecommendation: true
  },
  {
    id: 'stripe',
    name: 'Stripe Billing & Payments',
    slug: 'stripe',
    category: 'Productivity',
    icon: '💳',
    description: 'Inspect Stripe customers, examine recent charges, debug webhook deliveries, and query subscription statuses directly from Antigravity conversations.',
    maintainer: 'Community Starred',
    githubUrl: 'https://github.com/mcp-community/stripe-mcp',
    stars: '2.2k',
    verified: true,
    official: false,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', 'stripe-mcp-server'],
    env: {
      STRIPE_SECRET_KEY: 'sk_test_your_stripe_secret_key'
    },
    keyFeatures: [
      'Query customer subscriptions and invoices',
      'Inspect charge statuses and failure reasons',
      'Triage failed webhook events',
      'Read-only safety guardrails for payments'
    ],
    samplePrompt: 'Check why customer cus_12345 had their last three invoice attempts fail and inspect the decline code from Stripe.',
    lazyRecommendation: true
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare Edge Platform',
    slug: 'cloudflare',
    category: 'Productivity',
    icon: '☁️',
    description: 'Inspect Cloudflare Workers, manage KV namespaces, inspect DNS records, and purge CDN cache directly from Antigravity agent interactions.',
    maintainer: 'Cloudflare Community',
    githubUrl: 'https://github.com/cloudflare/mcp-server-cloudflare',
    stars: '3.4k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@cloudflare/mcp-server-cloudflare'],
    env: {
      CLOUDFLARE_API_TOKEN: 'your_cloudflare_api_token',
      CLOUDFLARE_ACCOUNT_ID: 'your_cloudflare_account_id'
    },
    keyFeatures: [
      'Workers deployment status and execution logs',
      'KV namespace key-value management',
      'DNS records query and update',
      'Instant edge cache purge triggers'
    ],
    samplePrompt: 'Check the real-time execution logs for our edge Worker "auth-gate" and check if any 5xx error responses were returned in the last 15 minutes.',
    lazyRecommendation: true
  },

  // -------------------------------------------------------------
  // MEMORY & REASONING
  // -------------------------------------------------------------
  {
    id: 'memory',
    name: 'Persistent Knowledge Graph Memory',
    slug: 'memory',
    category: 'Memory & Reasoning',
    icon: '🧠',
    description: 'Local persistent knowledge graph allowing Antigravity agents to remember architectural decisions, user preferences, and project rules across chats.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/memory',
    stars: '24.5k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-memory'],
    keyFeatures: [
      'Persistent cross-session entity extraction',
      'Relational knowledge graph storage',
      'Zero external cloud data exposure',
      'Instant associative recall for vibe coding'
    ],
    samplePrompt: 'Remember that our production stack uses Next.js 16 App Router, Prisma ORM, and Tailwind CSS v4, and always format imports with absolute paths.',
    lazyRecommendation: false
  },
  {
    id: 'sequential-thinking',
    name: 'Sequential Thinking Reasoning Engine',
    slug: 'sequential-thinking',
    category: 'Memory & Reasoning',
    icon: '🔄',
    description: 'Dynamic problem-solving connector that structures complex engineering challenges into step-by-step hypothesis generation and verification trees.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking',
    stars: '24.5k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-sequential-thinking'],
    keyFeatures: [
      'Dynamic hypothesis generation and verification',
      'Backtracking decision trees for complex logic',
      'Multi-stage algorithmic problem decomposition',
      'Self-correcting reasoning loops'
    ],
    samplePrompt: 'Use sequential thinking to design a zero-downtime database migration strategy from monolithic Postgres to distributed multi-region replicas.',
    lazyRecommendation: false
  }
];

export function getAllAntigravityMcps(): AntigravityMcpServer[] {
  return ANTIGRAVITY_MCP_SERVERS;
}

export function getAntigravityMcpBySlug(slug: string): AntigravityMcpServer | undefined {
  return ANTIGRAVITY_MCP_SERVERS.find((s) => s.slug === slug);
}
