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
    name: 'Google Flow Studio 2.0',
    slug: 'google-flow',
    category: 'Google Ecosystem',
    icon: '🎬',
    description: 'Generates frontier AI images, 4K 60fps cinematic videos, custom character references, and scene grids directly inside Google Antigravity agents.',
    maintainer: 'Google Antigravity Team',
    githubUrl: 'https://antigravity.google/docs/mcp/google-flow',
    stars: '24.2k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@google/antigravity-flow-mcp@latest'],
    env: {
      FLOW_API_KEY: 'your_google_flow_api_key_here'
    },
    keyFeatures: [
      'Cinematic 4K 60fps text-to-video rendering with temporal consistency',
      'High-resolution multi-aspect image generation',
      'Character reference consistency engine and avatar preservation',
      'Multi-camera scene trajectory storyboard generation'
    ],
    samplePrompt: 'Create a hyper-realistic 16:9 cinematic shot of an autonomous robotics lab using Google Flow and generate a 5-second video sequence with camera tilt.',
    lazyRecommendation: true
  },
  {
    id: 'google-stitch',
    name: 'Google Stitch Design System',
    slug: 'stitch',
    category: 'Google Ecosystem',
    icon: '🎨',
    description: 'Autonomous AI UI/UX design engine that generates multi-screen wireframes, atomic design systems, component variants, and design.md specs directly inside agent workspaces.',
    maintainer: 'Google Antigravity Team',
    githubUrl: 'https://antigravity.google/docs/mcp/stitch',
    stars: '21.3k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@google/stitch-mcp@latest'],
    env: {
      STITCH_API_KEY: 'your_google_stitch_api_key'
    },
    keyFeatures: [
      'Generate multi-screen UI components from natural language text',
      'Create and update centralized design tokens in design.md',
      'Produce high-fidelity responsive variant explorations',
      'Export production-ready React 19 and Tailwind CSS code'
    ],
    samplePrompt: 'Generate a dark-mode mobile dashboard for an AI analytics app in Google Stitch and export the atomic design system to design.md.',
    lazyRecommendation: true
  },
  {
    id: 'analytics-mcp',
    name: 'Google Analytics 4 (GA4) Telemetry',
    slug: 'analytics-mcp',
    category: 'Google Ecosystem',
    icon: '📈',
    description: 'Direct integration with Google Analytics 4 (GA4) for querying real-time active users, running conversion reports, analyzing funnel drop-offs, and tracking Google Ads links.',
    maintainer: 'Google Analytics Team',
    githubUrl: 'https://github.com/google/analytics-mcp',
    stars: '14.2k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@google/analytics-mcp@latest'],
    env: {
      GA4_PROPERTY_ID: 'your_ga4_property_id',
      GOOGLE_APPLICATION_CREDENTIALS: '/path/to/credentials.json'
    },
    keyFeatures: [
      'Realtime visitor counts and active page monitoring',
      'Multi-channel acquisition funnel & conversions reports',
      'Custom dimensions & metrics telemetry queries',
      'Automated traffic anomaly detection and bounce rate alerts'
    ],
    samplePrompt: 'Run a realtime conversion report in GA4 for the last 30 minutes and identify our top 5 referral sources and highest converting landing pages.',
    lazyRecommendation: true
  },
  {
    id: 'gsc',
    name: 'Google Search Console (GSC) Indexer',
    slug: 'gsc',
    category: 'Google Ecosystem',
    icon: '🔍',
    description: 'Enables autonomous coding agents to inspect live URL indexation states, test mobile usability, validate XML sitemaps, and retrieve high-intent search analytics queries.',
    maintainer: 'Google Search Central',
    githubUrl: 'https://github.com/google/gsc-mcp-server',
    stars: '16.7k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@google/gsc-mcp-server@latest'],
    env: {
      GSC_SITE_URL: 'https://www.stackaitools.com',
      GOOGLE_APPLICATION_CREDENTIALS: '/path/to/credentials.json'
    },
    keyFeatures: [
      'Real-time URL index inspection & crawl diagnostics',
      'Search performance queries (clicks, impressions, CTR, position)',
      'Automated XML sitemap validation & submission',
      'Mobile-first indexing compliance checks'
    ],
    samplePrompt: 'Inspect the URL https://www.stackaitools.com/antigravity-mcp in Google Search Console and check its indexing status, canonical URL, and crawl issues.',
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
    stars: '15.8k',
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
    stars: '18.9k',
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
    stars: '26.5k',
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
  {
    id: 'google-photos',
    name: 'Google Photos Media Asset Hub',
    slug: 'google-photos',
    category: 'Google Ecosystem',
    icon: '📸',
    description: 'Direct access to Google Photos library for searching images by visual location, managing product albums, uploading assets, and media enrichment.',
    maintainer: 'Google Workspace Team',
    githubUrl: 'https://github.com/google/photos-mcp-server',
    stars: '11.3k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@google/photos-mcp-server@latest'],
    env: {
      GOOGLE_PHOTOS_TOKEN: 'your_google_photos_token'
    },
    keyFeatures: [
      'Semantic visual search by location, object, and date',
      'Batch media upload and album management',
      'Media metadata enrichment and auto-captioning',
      'Asset picker session creation for agent workflows'
    ],
    samplePrompt: 'Search Google Photos for recent screenshot assets of our mobile app and compile them into a shared launch album.',
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
    stars: '12.9k',
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
    description: 'Empowers Antigravity to review Pull Requests, search repositories, inspect file diffs, manage branches, and post automated code review comments with Claude Code support.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/github',
    stars: '28.5k',
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
    stars: '27.5k',
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
    description: 'Headless and visual browser automation. Allows your Antigravity agent to navigate websites, click elements, fill forms, and take screenshots for automated testing.',
    maintainer: 'ExecuteAutomation',
    githubUrl: 'https://github.com/executeautomation/mcp-playwright',
    stars: '6.8k',
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
    stars: '25.5k',
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
    stars: '25.1k',
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
    samplePrompt: 'Show all uncommitted changes in this repository, group them by logical feature units, and generate clean semantic commit messages.',
    lazyRecommendation: false
  },
  {
    id: 'docker',
    name: 'Docker Container Engine',
    slug: 'docker',
    category: 'Developer',
    icon: '🐳',
    description: 'Allows your agent to inspect running containers, view real-time log streams, pull images, and orchestrate multi-container Docker Compose environments.',
    maintainer: 'Community Starred',
    githubUrl: 'https://github.com/ckreiling/mcp-server-docker',
    stars: '3.9k',
    verified: true,
    official: false,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@ckreiling/mcp-server-docker'],
    keyFeatures: [
      'List active and exited containers',
      'Tail live container stdout and stderr logs',
      'Start, stop, and restart container services',
      'Inspect volume mounts and network bindings'
    ],
    samplePrompt: 'Inspect the running postgres container, verify that port 5432 is mapped to localhost, and check if any healthcheck failures occurred.',
    lazyRecommendation: true
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes & Helm Cluster Operator',
    slug: 'kubernetes',
    category: 'Developer',
    icon: '☸️',
    description: 'Direct cluster management from your coding agent. Inspect pods, tail logs, debug CrashLoopBackOff states, and verify Helm deployment releases across staging and production.',
    maintainer: 'Cloud Native Community',
    githubUrl: 'https://github.com/cloudnative/kubernetes-mcp-server',
    stars: '16.5k',
    verified: true,
    official: false,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@cloudnative/kubernetes-mcp-server'],
    env: {
      KUBECONFIG: '~/.kube/config'
    },
    keyFeatures: [
      'Inspect pod health, container restarts, and event logs',
      'Apply, diff, and rollback Helm deployment charts',
      'Port-forward and debug microservice connectivity',
      'Resource utilization profiling (CPU, RAM, node limits)'
    ],
    samplePrompt: 'Inspect all pods in the production namespace with CrashLoopBackOff status, tail their last 100 lines of logs, and suggest the root cause.',
    lazyRecommendation: true
  },
  {
    id: 'figma',
    name: 'Figma Dev Mode Token Extractor',
    slug: 'figma',
    category: 'Developer',
    icon: '📐',
    description: 'Inspect Figma component node trees, extract color tokens and typography styles, and generate production-ready Tailwind CSS and React code directly from designs.',
    maintainer: 'Community Starred',
    githubUrl: 'https://github.com/figma/mcp-server',
    stars: '19.9k',
    verified: true,
    official: false,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@figma/mcp-server@latest'],
    env: {
      FIGMA_ACCESS_TOKEN: 'figd_your_access_token_here'
    },
    keyFeatures: [
      'Inspect Figma component auto-layouts and layer hierarchy',
      'Extract design tokens (colors, shadows, spacing, typography)',
      'Generate pixel-perfect React 19 and Tailwind CSS components',
      'Diff Figma design files against current codebase implementations'
    ],
    samplePrompt: 'Inspect the Navbar component in Figma file key "XyZ123" and convert its layout, colors, and responsive variants into Tailwind CSS.',
    lazyRecommendation: true
  },
  {
    id: 'sentry',
    name: 'Sentry Error Triage',
    slug: 'sentry',
    category: 'Developer',
    icon: '🚨',
    description: 'Query unresolved production exceptions, inspect stack traces, analyze user impact, and generate automated regression fixes right in your IDE.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/sentry',
    stars: '24.5k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'uvx',
    args: ['mcp-server-sentry', '--auth-token', 'your_sentry_token'],
    keyFeatures: [
      'Query top unhandled exceptions by frequency',
      'Inspect full stack traces with source-map mapping',
      'Correlate errors with git commit SHAs',
      'Retrieve error breadcrumbs and environment context'
    ],
    samplePrompt: 'Fetch the top 3 unhandled exceptions from Sentry in the last 24 hours, locate the offending lines in src/lib/api.ts, and write a patch.',
    lazyRecommendation: true
  },

  // -------------------------------------------------------------
  // DATABASES & STORAGE
  // -------------------------------------------------------------
  {
    id: 'postgres',
    name: 'PostgreSQL Database & pgvector',
    slug: 'postgres',
    category: 'Databases',
    icon: '🐘',
    description: 'Direct read-only or read-write PostgreSQL database connectivity. Inspect table schemas, generate optimized SQL queries, and manage pgvector similarity search.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/postgres',
    stars: '26.5k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-postgres', 'postgresql://user:password@localhost:5432/dbname'],
    keyFeatures: [
      'Schema introspection and foreign key mapping',
      'pgvector index creation and vector similarity queries',
      'EXPLAIN ANALYZE query plan optimization',
      'Automated migration script validation'
    ],
    samplePrompt: 'Inspect our database schema for the orders and customers tables, identify missing indices causing slow queries, and write a safe SQL migration.',
    lazyRecommendation: false
  },
  {
    id: 'neon-postgres',
    name: 'Neon Serverless Postgres & Branching',
    slug: 'neon-postgres',
    category: 'Databases',
    icon: '⚡',
    description: 'Instant database branching and autoscaling serverless PostgreSQL connector with sub-10ms connection pooling and point-in-time recovery.',
    maintainer: 'Neon Database',
    githubUrl: 'https://github.com/neondatabase/mcp-server-neon',
    stars: '17.2k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@neondatabase/mcp-server-neon'],
    env: {
      NEON_API_KEY: 'your_neon_api_key'
    },
    keyFeatures: [
      'Instant branch creation for test PRs and preview deployments',
      'Schema inspection and automated database migrations',
      'Point-in-time recovery and zero-cold-start queries',
      'Direct psql command execution via MCP protocol'
    ],
    samplePrompt: 'Create a temporary database branch in Neon for PR #142, apply pending Prisma migrations, and run verification queries.',
    lazyRecommendation: false
  },
  {
    id: 'supabase',
    name: 'Supabase Cloud Backend',
    slug: 'supabase',
    category: 'Databases',
    icon: '⚡',
    description: 'Connect to your Supabase project to query Postgres, manage Row Level Security (RLS) policies, inspect storage buckets, and run pgvector similarity search.',
    maintainer: 'Supabase Community',
    githubUrl: 'https://github.com/supabase-community/supabase-mcp',
    stars: '7.8k',
    verified: true,
    official: false,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@supabase/mcp-server-supabase'],
    env: {
      SUPABASE_URL: 'https://xyzcompany.supabase.co',
      SUPABASE_SERVICE_ROLE_KEY: 'your_service_role_key'
    },
    keyFeatures: [
      'Row Level Security (RLS) policy inspection and hardening',
      'Direct table queries with JSON filters',
      'Storage bucket upload and asset management',
      'Edge function deployment status tracking'
    ],
    samplePrompt: 'Audit our Supabase RLS policies for the documents table to ensure tenants can never read rows belonging to other organization_ids.',
    lazyRecommendation: false
  },
  {
    id: 'qdrant-vector',
    name: 'Qdrant Vector Search Engine',
    slug: 'qdrant-vector',
    category: 'Databases',
    icon: '🔮',
    description: 'High-scale hybrid vector search and payload filtering connector for enterprise RAG, similarity search, and semantic recommendation pipelines.',
    maintainer: 'Qdrant Team',
    githubUrl: 'https://github.com/qdrant/mcp-server-qdrant',
    stars: '15.4k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@qdrant/mcp-server-qdrant'],
    env: {
      QDRANT_URL: 'https://xyz.qdrant.tech:6333',
      QDRANT_API_KEY: 'your_qdrant_api_key'
    },
    keyFeatures: [
      'High-dimensional vector embedding search and retrieval',
      'Payload filtering with exact metadata predicates',
      'Hybrid dense/sparse vector search with reranking',
      'Dynamic collection creation and schema indexing'
    ],
    samplePrompt: 'Search our product knowledge base in Qdrant for semantic matches to "low latency video rendering pipelines" with similarity score > 0.85.',
    lazyRecommendation: true
  },
  {
    id: 'sqlite',
    name: 'SQLite Local Database',
    slug: 'sqlite',
    category: 'Databases',
    icon: '🗄️',
    description: 'Zero-config local database access. Perfect for desktop apps, embedded analytical stores, testing fixtures, and mobile app SQLite databases.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite',
    stars: '24.5k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'uvx',
    args: ['mcp-server-sqlite', '--db-path', '/path/to/database.db'],
    keyFeatures: [
      'Zero-latency local embedded querying',
      'Schema introspection and index analysis',
      'Transaction rollbacks for safe dry-runs',
      'Direct CSV and JSON import/export'
    ],
    samplePrompt: 'Run an analytical query on our local analytics.db to find the top 10 most visited URLs that resulted in zero search results.',
    lazyRecommendation: false
  },
  {
    id: 'redis',
    name: 'Redis In-Memory Store',
    slug: 'redis',
    category: 'Databases',
    icon: '🔴',
    description: 'Connects Antigravity to local or cloud Redis instances to inspect cache keys, monitor pub/sub channels, and debug session storage.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/redis',
    stars: '24.5k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-redis', 'redis://localhost:6379'],
    keyFeatures: [
      'Key inspection, TTL tracking, and memory usage profiling',
      'JSON data structure manipulation (ReJSON)',
      'Hash, Set, and Sorted Set inspection',
      'Pub/sub stream monitoring'
    ],
    samplePrompt: 'Check the TTL and value of the cache key session:user:4821 and verify that the authentication token has not expired.',
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
    description: 'Privacy-focused live web search API. Allows your agent to search the web, fetch real-time news, verify documentation, and retrieve fresh facts.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search',
    stars: '24.5k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-brave-search'],
    env: {
      BRAVE_API_KEY: 'your_brave_search_api_key_here'
    },
    keyFeatures: [
      'Independent global web index with zero tracking',
      'Real-time news and article search',
      'Site-specific domain filtering (e.g. site:docs.anthropic.com)',
      'Snippet extraction with source URLs'
    ],
    samplePrompt: 'Search the web for the latest Next.js 16 breaking changes and summarize how server actions have been updated.',
    lazyRecommendation: false
  },
  {
    id: 'perplexity-sonar',
    name: 'Perplexity Sonar Web Intelligence',
    slug: 'perplexity-sonar',
    category: 'Web & Search',
    icon: '🌐',
    description: 'Real-time live web search and deep research grounding powered by Perplexity Sonar and Sonar Pro reasoning models with full citation attribution.',
    maintainer: 'Community Starred',
    githubUrl: 'https://github.com/perplexity/perplexity-mcp-server',
    stars: '23.4k',
    verified: true,
    official: false,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', 'perplexity-mcp-server@latest'],
    env: {
      PERPLEXITY_API_KEY: 'pplx-your_api_key_here'
    },
    keyFeatures: [
      'Live web search grounding with verified domain citations',
      'Multi-query deep research mode for complex market queries',
      'Fresh news and social media sentiment extraction',
      'Structured JSON output with cited source URLs'
    ],
    samplePrompt: 'Research the latest pricing updates and features released by Anthropic and OpenAI in the last 48 hours using Perplexity Sonar.',
    lazyRecommendation: false
  },
  {
    id: 'fetch',
    name: 'Fetch Web Content Scraper',
    slug: 'fetch',
    category: 'Web & Search',
    icon: '🌐',
    description: 'Fetches raw web pages, parses clean Markdown, strips HTML boilerplate, and extracts main article text for immediate reasoning digestion.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/fetch',
    stars: '24.5k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'uvx',
    args: ['mcp-server-fetch'],
    keyFeatures: [
      'HTML to clean Markdown conversion',
      'Header, cookie, and user-agent customization',
      'Automatic main body content isolation',
      'Robust error handling and redirection following'
    ],
    samplePrompt: 'Fetch https://docs.anthropic.com/en/docs/build-with-claude/mcp and summarize the exact protocol handshake specifications.',
    lazyRecommendation: false
  },
  {
    id: 'readwise',
    name: 'Readwise Reader Knowledge',
    slug: 'readwise',
    category: 'Web & Search',
    icon: '📖',
    description: 'Personal knowledge vault integration. Search and query your saved articles, PDFs, Kindle highlights, and web clips directly inside Antigravity.',
    maintainer: 'Community Starred',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/readwise',
    stars: '2.4k',
    verified: true,
    official: false,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@readwise/mcp-server-readwise'],
    env: {
      READWISE_API_KEY: 'your_readwise_access_token'
    },
    keyFeatures: [
      'Full-text search across saved reading list and PDFs',
      'Highlight retrieval grouped by book or article title',
      'Note and tag search across personal reading database',
      'Offline document caching'
    ],
    samplePrompt: 'Search my Readwise Reader highlights for quotes and notes related to "reinforcement learning from human feedback".',
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
    icon: '🔮',
    description: 'Run thousands of open-source models in the cloud: FLUX.2 Max, Llama 3.3, Whisper v3, and Stable Diffusion via a unified serverless API.',
    maintainer: 'Community Starred',
    githubUrl: 'https://github.com/replicate/mcp-server-replicate',
    stars: '4.6k',
    verified: true,
    official: false,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@replicate/mcp-server-replicate'],
    env: {
      REPLICATE_API_TOKEN: 'r8_your_replicate_token'
    },
    keyFeatures: [
      'Serverless execution of 10,000+ open-source AI models',
      'Automatic hardware provisioning (A100, H100)',
      'Webhook notification on generation completion',
      'Audio, video, image, and text generation'
    ],
    samplePrompt: 'Use Replicate to run FLUX.2 Max with the prompt "A futuristic obsidian glass architectural pavilion in a misty cedar forest, 35mm photograph" and return the asset URL.',
    lazyRecommendation: true
  },
  {
    id: 'stability',
    name: 'Stability AI Media Engine',
    slug: 'stability',
    category: 'Creative & Media',
    icon: '🎨',
    description: 'Direct integration with Stability AI APIs: Stable Diffusion 3.5, Stable Fast 3D, and audio synthesis pipelines for enterprise creative workflows.',
    maintainer: 'Community Starred',
    githubUrl: 'https://github.com/stability-ai/mcp-server-stability',
    stars: '3.1k',
    verified: true,
    official: false,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@stability-ai/mcp-server'],
    env: {
      STABILITY_API_KEY: 'sk_your_stability_api_key'
    },
    keyFeatures: [
      'Stable Diffusion 3.5 Large and Turbo text-to-image',
      'Image upscaling and outpainting transformations',
      '3D mesh generation from single 2D concept images',
      'Direct aspect ratio and guidance scale parameter tuning'
    ],
    samplePrompt: 'Generate a high-resolution concept art visual for an isometric sci-fi computer terminal using Stable Diffusion 3.5.',
    lazyRecommendation: true
  },

  // -------------------------------------------------------------
  // PRODUCTIVITY & SAAS
  // -------------------------------------------------------------
  {
    id: 'meta-ads',
    name: 'Meta Ads & Creative Intelligence',
    slug: 'meta-ads',
    category: 'Productivity',
    icon: '🎯',
    description: 'Connects agents to Meta Marketing APIs to inspect ad campaigns, analyze ROAS/CPA performance, manage creative assets, and diagnose delivery bottlenecks.',
    maintainer: 'Meta Open Source',
    githubUrl: 'https://github.com/meta/ads-mcp-server',
    stars: '15.8k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@meta/ads-mcp-server@latest'],
    env: {
      META_ACCESS_TOKEN: 'your_meta_access_token',
      META_AD_ACCOUNT_ID: 'act_123456789'
    },
    keyFeatures: [
      'Real-time campaign spend, CPA, and ROAS telemetry',
      'Ad creative asset inspection and auto-generation',
      'Audience targeting and custom lookalike segmentation',
      'Automated ad fatigue & delivery diagnostic audits'
    ],
    samplePrompt: 'Analyze our top 3 active adsets in Meta Ads Manager and recommend budget reallocations based on last 7 days CPA and ROAS.',
    lazyRecommendation: true
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Network & Company Intelligence',
    slug: 'linkedin',
    category: 'Productivity',
    icon: '💼',
    description: 'Empowers agents to search company profiles, extract employee hierarchies, retrieve industry news feeds, and draft personalized outreach.',
    maintainer: 'Community Starred',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/linkedin',
    stars: '11.5k',
    verified: true,
    official: false,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-linkedin'],
    env: {
      LINKEDIN_SESSION_TOKEN: 'your_li_at_cookie_token'
    },
    keyFeatures: [
      'Company profile and executive team mapping',
      'B2B prospect discovery and filtered search',
      'Industry feed aggregation and sentiment analysis',
      'Personalized message drafting for enterprise deals'
    ],
    samplePrompt: 'Find Heads of AI and VP of Engineering at series-B fintech startups in San Francisco and draft a partnership outreach message.',
    lazyRecommendation: true
  },
  {
    id: 'slack',
    name: 'Slack Communication Hub',
    slug: 'slack',
    category: 'Productivity',
    icon: '💬',
    description: 'Enables Antigravity to post updates to channels, summarize unread threads, monitor incident alerts, and send direct messages.',
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
      SLACK_TEAM_ID: 'T01234567'
    },
    keyFeatures: [
      'Post formatted Markdown messages to channels',
      'Read thread history and summarize discussions',
      'Query user profiles and status updates',
      'React with emojis and manage channel topics'
    ],
    samplePrompt: 'Read the last 20 messages in the #engineering-incidents channel and compile a summary of the outage root cause and remediation steps.',
    lazyRecommendation: true
  },
  {
    id: 'notion',
    name: 'Notion Knowledge Base',
    slug: 'notion',
    category: 'Productivity',
    icon: '📓',
    description: 'Search, read, and write Notion pages and relational databases. Ideal for synchronizing engineering specs, meeting notes, and task lists.',
    maintainer: 'Community Starred',
    githubUrl: 'https://github.com/suekou/mcp-notion-server',
    stars: '5.2k',
    verified: true,
    official: false,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@suekou/mcp-notion-server'],
    env: {
      NOTION_API_TOKEN: 'secret_your_notion_api_token'
    },
    keyFeatures: [
      'Full database schema querying and row creation',
      'Page block editing with rich markdown formatting',
      'Hierarchical page search across workspaces',
      'Comment and user mention inspection'
    ],
    samplePrompt: 'Find our Product Roadmap database in Notion and create a new row for "Implement MCP Server for Google Flow" with priority "High".',
    lazyRecommendation: true
  },
  {
    id: 'linear',
    name: 'Linear Issue Tracking',
    slug: 'linear',
    category: 'Productivity',
    icon: '📐',
    description: 'Direct integration with Linear. Allows Antigravity to create issues, update issue status, assign tasks to sprints, and post resolution summaries.',
    maintainer: 'Community Starred',
    githubUrl: 'https://github.com/jerhadf/linear-mcp-server',
    stars: '4.1k',
    verified: true,
    official: false,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', 'linear-mcp-server'],
    env: {
      LINEAR_API_KEY: 'lin_api_your_key_here'
    },
    keyFeatures: [
      'Create, assign, and transition issue states',
      'Search issues with filters (team, project, cycle, priority)',
      'Add comments and markdown documentation to issues',
      'Link git PRs to Linear issue identifiers'
    ],
    samplePrompt: 'Create a Linear ticket in the ENG team titled "Fix LCP layout shift in homepage hero" with priority Urgent and assign it to me.',
    lazyRecommendation: true
  },
  {
    id: 'airtable',
    name: 'Airtable Relational CMS',
    slug: 'airtable',
    category: 'Productivity',
    icon: '📊',
    description: 'Query and update Airtable bases. Perfect for managing editorial calendars, customer feedback registries, and inventory tracking.',
    maintainer: 'Community Starred',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/airtable',
    stars: '2.1k',
    verified: true,
    official: false,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-airtable'],
    env: {
      AIRTABLE_API_KEY: 'pat_your_airtable_token'
    },
    keyFeatures: [
      'Inspect base metadata, tables, and field types',
      'Perform filtered record searches and pagination',
      'Create and batch update records with type safety',
      'Attachment inspection and URL retrieval'
    ],
    samplePrompt: 'Query our "Beta Waitlist" Airtable base, find all signups from the US in the last 7 days, and return their email addresses.',
    lazyRecommendation: true
  },
  {
    id: 'stripe',
    name: 'Stripe Billing & Payments',
    slug: 'stripe',
    category: 'Productivity',
    icon: '💳',
    description: 'Inspect customer subscriptions, retrieve failed invoice logs, search payment intents, and verify subscription status with safe read-only scopes.',
    maintainer: 'Community Starred',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/stripe',
    stars: '3.7k',
    verified: true,
    official: false,
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-stripe'],
    env: {
      STRIPE_SECRET_KEY: 'rk_live_read_only_stripe_key'
    },
    keyFeatures: [
      'Customer and subscription status queries',
      'Payment intent debugging and charge log retrieval',
      'Invoice payment failure diagnostics',
      'Product and price ID lookups'
    ],
    samplePrompt: 'Check if customer cus_991823 has an active Pro subscription in Stripe and list their last 3 invoice payment dates.',
    lazyRecommendation: true
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare Edge Platform',
    slug: 'cloudflare',
    category: 'Productivity',
    icon: '☁️',
    description: 'Inspect edge Workers, tail real-time execution logs, query KV namespaces, and update DNS records across your Cloudflare zones.',
    maintainer: 'Cloudflare Team',
    githubUrl: 'https://github.com/cloudflare/mcp-server-cloudflare',
    stars: '5.9k',
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
    id: 'cognee',
    name: 'Cognee Cloud Knowledge Graph Memory',
    slug: 'cognee',
    category: 'Memory & Reasoning',
    icon: '🧠',
    description: 'Persistent cloud memory tenant for autonomous agents. Cognifies documents, remembers user preferences across sessions, and recalls entity relationship graphs.',
    maintainer: 'Cognee AI',
    githubUrl: 'https://github.com/cognee-ai/cognee',
    stars: '19.6k',
    verified: true,
    official: true,
    transport: 'stdio',
    command: 'uvx',
    args: ['cognee-mcp'],
    env: {
      COGNEE_API_KEY: 'your_cognee_api_key',
      COGNEE_TENANT_ID: 'your_tenant_id'
    },
    keyFeatures: [
      'Long-term persistent memory across IDE restarts and devices',
      'Automatic semantic entity extraction and graph linking',
      'Session-independent memory recall for user preferences',
      'Cognify unstructured PDFs, repos, and notes into vectors & graphs'
    ],
    samplePrompt: 'Recall all architectural guidelines and tech stack preferences recorded for our Next.js App Router codebase from Cognee memory.',
    lazyRecommendation: false
  },
  {
    id: 'memory',
    name: 'Persistent Knowledge Graph Memory',
    slug: 'memory',
    category: 'Memory & Reasoning',
    icon: '🧠',
    description: 'Local persistent knowledge graph allowing Antigravity agents to remember architectural decisions, user preferences, and project rules across chats.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/memory',
    stars: '27.5k',
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
    stars: '26.5k',
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
