export interface ClaudeConnector {
  id: string;
  name: string;
  slug: string;
  category: 'Developer' | 'Databases' | 'Productivity' | 'Web & Search' | 'Cloud & DevOps' | 'Memory & Reasoning';
  icon: string;
  description: string;
  maintainer: string;
  githubUrl: string;
  stars?: string;
  verified: boolean;
  official: boolean;
  installType: 'npx' | 'uvx' | 'docker' | 'remote';
  command: string;
  args: string[];
  env?: Record<string, string>;
  keyFeatures: string[];
  samplePrompt: string;
}

export const CLAUDE_CONNECTORS: ClaudeConnector[] = [
  // DEVELOPER TOOLS
  {
    id: 'github',
    name: 'GitHub Connector',
    slug: 'github',
    category: 'Developer',
    icon: '🐙',
    description: 'Enables Claude to search repositories, inspect pull requests, read issues, manage git branches, and submit code reviews autonomously.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/github',
    stars: '24.5k',
    verified: true,
    official: true,
    installType: 'npx',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-github'],
    env: {
      GITHUB_PERSONAL_ACCESS_TOKEN: 'your_github_pat_token_here'
    },
    keyFeatures: ['Search repositories & code', 'Read & update issues', 'Review pull requests', 'Fork & branch operations'],
    samplePrompt: 'Review the latest open pull request on my repo and summarize any security regressions or performance bottlenecks.'
  },
  {
    id: 'filesystem',
    name: 'Local Filesystem Connector',
    slug: 'filesystem',
    category: 'Developer',
    icon: '📂',
    description: 'Gives Claude safe, sandboxed access to read, create, and modify directories and files on your local development machine.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem',
    stars: '24.5k',
    verified: true,
    official: true,
    installType: 'npx',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-filesystem', '/Users/username/Projects'],
    keyFeatures: ['Multi-file read & write', 'Directory tree navigation', 'Safe path sandboxing', 'File metadata extraction'],
    samplePrompt: 'Inspect the src/ directory of my local project and refactor any outdated React class components into modern functional hooks.'
  },
  {
    id: 'chrome-devtools',
    name: 'Chrome DevTools Plugin',
    slug: 'chrome-devtools',
    category: 'Developer',
    icon: '🌐',
    description: 'Enables Claude to inspect live web browser sessions, analyze DOM trees, debug network requests, evaluate scripts, and audit Core Web Vitals.',
    maintainer: 'Google Chrome Team',
    githubUrl: 'https://github.com/ChromeDevTools/devtools-mcp',
    stars: '6.8k',
    verified: true,
    official: true,
    installType: 'npx',
    command: 'npx',
    args: ['-y', 'chrome-devtools-mcp@latest'],
    keyFeatures: ['DOM tree inspection', 'Network request interception', 'Console logs monitoring', 'Lighthouse & CWV auditing'],
    samplePrompt: 'Open Chrome to localhost:3000, inspect the network panel, and tell me why my hero banner is causing high cumulative layout shift.'
  },
  {
    id: 'playwright',
    name: 'Playwright Browser Automation',
    slug: 'playwright',
    category: 'Developer',
    icon: '🎭',
    description: 'Headless and headed browser automation plugin. Allows Claude to navigate websites, click elements, fill forms, and capture full-page screenshots.',
    maintainer: 'ExecuteAutomation',
    githubUrl: 'https://github.com/executeautomation/mcp-playwright',
    stars: '4.2k',
    verified: true,
    official: false,
    installType: 'npx',
    command: 'npx',
    args: ['-y', '@executeautomation/playwright-mcp-server'],
    keyFeatures: ['Automated form submission', 'Full-page screenshots', 'End-to-End testing', 'Multi-tab session handling'],
    samplePrompt: 'Navigate to my staging checkout page, fill out the demo credit card form, and take a screenshot of the confirmation modal.'
  },
  {
    id: 'git',
    name: 'Git Version Control',
    slug: 'git',
    category: 'Developer',
    icon: '🌿',
    description: 'Direct git interface enabling Claude to inspect repository diffs, commit histories, commit changes, and resolve merge conflicts.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/git',
    stars: '24.5k',
    verified: true,
    official: true,
    installType: 'uvx',
    command: 'uvx',
    args: ['mcp-server-git', '--repository', '/path/to/repo'],
    keyFeatures: ['Git diff analysis', 'Log inspection', 'Staging & commit execution', 'Branch checkout & status'],
    samplePrompt: 'Analyze the git diff between main and my feature branch, and generate a concise semantic conventional commit message.'
  },
  {
    id: 'docker',
    name: 'Docker Container Engine',
    slug: 'docker',
    category: 'Developer',
    icon: '🐳',
    description: 'Manage containers, inspect Docker images, inspect container logs, and spin up microservices directly from your Claude conversation.',
    maintainer: 'Community Starred',
    githubUrl: 'https://github.com/ckreiling/mcp-server-docker',
    stars: '2.1k',
    verified: true,
    official: false,
    installType: 'npx',
    command: 'npx',
    args: ['-y', 'mcp-server-docker'],
    keyFeatures: ['Container status & lifecycle', 'Image building & pulling', 'Real-time log tailing', 'Volume & network inspection'],
    samplePrompt: 'Check which Docker containers are currently consuming more than 1GB of memory and restart my redis-cache service.'
  },

  // DATABASES & STORAGE
  {
    id: 'postgresql',
    name: 'PostgreSQL Database Connector',
    slug: 'postgresql',
    category: 'Databases',
    icon: '🐘',
    description: 'Direct read and query access to PostgreSQL databases. Allows Claude to inspect table schemas, analyze slow queries, and generate optimized SQL.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/postgres',
    stars: '24.5k',
    verified: true,
    official: true,
    installType: 'npx',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-postgres', 'postgresql://user:password@localhost:5432/mydb'],
    keyFeatures: ['Schema reflection & DDL', 'Read-only SQL execution', 'Index recommendation', 'Table relationships mapping'],
    samplePrompt: 'Inspect the public schema, find any tables missing foreign key indexes, and write an optimized migration script.'
  },
  {
    id: 'supabase',
    name: 'Supabase Cloud Backend',
    slug: 'supabase',
    category: 'Databases',
    icon: '⚡',
    description: 'Manage Supabase projects, write Edge Functions, query Postgres tables, and audit Row Level Security (RLS) policies.',
    maintainer: 'Supabase Community',
    githubUrl: 'https://github.com/supabase-community/mcp-supabase',
    stars: '3.9k',
    verified: true,
    official: true,
    installType: 'npx',
    command: 'npx',
    args: ['-y', '@supabase/mcp-server'],
    env: {
      SUPABASE_URL: 'https://your-project.supabase.co',
      SUPABASE_KEY: 'your-service-role-or-anon-key'
    },
    keyFeatures: ['RLS policy audits', 'Postgres queries & views', 'Auth schema inspection', 'Storage bucket management'],
    samplePrompt: 'Audit my Supabase users table to ensure Row Level Security is active and users can only read their own profile records.'
  },
  {
    id: 'sqlite',
    name: 'SQLite Local Database',
    slug: 'sqlite',
    category: 'Databases',
    icon: '💾',
    description: 'Lightweight local database inspector. Ideal for mobile app databases, embedded analytics, and local development stores.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite',
    stars: '24.5k',
    verified: true,
    official: true,
    installType: 'uvx',
    command: 'uvx',
    args: ['mcp-server-sqlite', '--db-path', '/path/to/database.db'],
    keyFeatures: ['Local DB inspection', 'Full schema query support', 'Instant export to JSON/CSV', 'Lightweight runtime'],
    samplePrompt: 'Connect to my application sqlite database and show me the top 10 users with the most recorded sessions.'
  },
  {
    id: 'redis',
    name: 'Redis Cache & KV Store',
    slug: 'redis',
    category: 'Databases',
    icon: '🔴',
    description: 'Inspect cached keys, monitor pub/sub channels, diagnose key TTL expirations, and debug distributed caching layers.',
    maintainer: 'Community Starred',
    githubUrl: 'https://github.com/mcp-servers/redis',
    stars: '1.8k',
    verified: true,
    official: false,
    installType: 'npx',
    command: 'npx',
    args: ['-y', 'mcp-server-redis'],
    env: {
      REDIS_URL: 'redis://default:password@localhost:6379'
    },
    keyFeatures: ['Key inspection & TTL verification', 'Memory usage breakdown', 'Hash & Set queries', 'Pub/Sub monitoring'],
    samplePrompt: 'Inspect the redis cache for keys matching session:* and calculate their average remaining TTL.'
  },
  {
    id: 'snowflake',
    name: 'Snowflake Enterprise Data Warehouse',
    slug: 'snowflake',
    category: 'Databases',
    icon: '❄️',
    description: 'Execute analytical queries, inspect warehouse credits, generate data transformation pipelines, and analyze customer telemetry.',
    maintainer: 'Snowflake Developers',
    githubUrl: 'https://github.com/Snowflake-Labs/mcp-server-snowflake',
    stars: '2.7k',
    verified: true,
    official: true,
    installType: 'uvx',
    command: 'uvx',
    args: ['mcp-server-snowflake'],
    env: {
      SNOWFLAKE_ACCOUNT: 'your-account-id',
      SNOWFLAKE_USER: 'analyst_user'
    },
    keyFeatures: ['Data warehouse queries', 'Role-based access control', 'Credit consumption analysis', 'Data lakehouse joins'],
    samplePrompt: 'Write a Snowflake SQL query aggregating monthly churn rate across US enterprise accounts for the last two quarters.'
  },

  // PRODUCTIVITY & DOCS
  {
    id: 'readwise-reader',
    name: 'Readwise Reader MCP Server',
    slug: 'readwise-reader',
    category: 'Productivity',
    icon: '📚',
    description: 'Connects Claude to your entire Readwise Reader knowledge base. Search saved web articles, highlights, Twitter threads, and Kindle books.',
    maintainer: 'Readwise Community',
    githubUrl: 'https://github.com/readwiseio/reader-mcp-server',
    stars: '4.8k',
    verified: true,
    official: true,
    installType: 'npx',
    command: 'npx',
    args: ['-y', '@readwise/reader-mcp-server'],
    env: {
      READWISE_API_TOKEN: 'your_readwise_api_token'
    },
    keyFeatures: ['Search 10,000+ personal highlights', 'Full-text article recall', 'Document tagging & tagging', 'Kindle and web sync'],
    samplePrompt: 'Search my Readwise Reader library for highlights regarding "transformer attention mechanisms" and synthesize a summary.'
  },
  {
    id: 'notion',
    name: 'Notion Workspace Connector',
    slug: 'notion',
    category: 'Productivity',
    icon: '📝',
    description: 'Direct bidirectional sync with Notion. Claude can search pages, append meeting notes, update database properties, and organize team docs.',
    maintainer: 'Model Context Protocol Community',
    githubUrl: 'https://github.com/suekou/mcp-notion-server',
    stars: '3.4k',
    verified: true,
    official: false,
    installType: 'npx',
    command: 'npx',
    args: ['-y', '@suekou/mcp-notion-server'],
    env: {
      NOTION_API_KEY: 'your_notion_integration_secret'
    },
    keyFeatures: ['Full workspace search', 'Database row creation', 'Markdown page writing', 'Block structure traversal'],
    samplePrompt: 'Find the Notion document titled "Q3 Product Roadmap" and append a section outlining our AI agent architecture milestones.'
  },
  {
    id: 'slack',
    name: 'Slack Communication Hub',
    slug: 'slack',
    category: 'Productivity',
    icon: '💬',
    description: 'Read channel histories, search thread conversations, summarize active discussions, and post formatted team updates.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/slack',
    stars: '24.5k',
    verified: true,
    official: true,
    installType: 'npx',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-slack'],
    env: {
      SLACK_BOT_TOKEN: 'xoxb-your-token',
      SLACK_TEAM_ID: 'T12345678'
    },
    keyFeatures: ['Thread summarization', 'Channel history lookup', 'Direct message search', 'Automated broadcast posts'],
    samplePrompt: 'Summarize the last 50 messages in the #engineering channel and list any outstanding unassigned bug reports.'
  },
  {
    id: 'linear',
    name: 'Linear Issue Tracker',
    slug: 'linear',
    category: 'Productivity',
    icon: '📐',
    description: 'Connects Claude directly to Linear. Create engineering tickets, update project roadmaps, assign team members, and check sprint velocity.',
    maintainer: 'Linear Developers Community',
    githubUrl: 'https://github.com/jerhadf/linear-mcp-server',
    stars: '2.9k',
    verified: true,
    official: false,
    installType: 'npx',
    command: 'npx',
    args: ['-y', 'linear-mcp-server'],
    env: {
      LINEAR_API_KEY: 'your_linear_api_key'
    },
    keyFeatures: ['Issue creation & updates', 'Team sprint tracking', 'Project milestone status', 'Custom cycle assignment'],
    samplePrompt: 'Create a High Priority Linear issue in the Engineering team for "Implement OAuth token caching" with reproduction steps.'
  },
  {
    id: 'obsidian',
    name: 'Obsidian Local Markdown Vault',
    slug: 'obsidian',
    category: 'Productivity',
    icon: '💎',
    description: 'Search and link personal notes in your local Obsidian vault. Reads backlinks, graph metadata, and maintains your Second Brain.',
    maintainer: 'Calvert Labs',
    githubUrl: 'https://github.com/calvertlabs/obsidian-mcp-server',
    stars: '3.1k',
    verified: true,
    official: false,
    installType: 'npx',
    command: 'npx',
    args: ['-y', 'obsidian-mcp-server', '/Users/username/Documents/ObsidianVault'],
    keyFeatures: ['Markdown frontmatter parsing', 'Wikilink graph navigation', 'Daily notes append', 'Tag categorization'],
    samplePrompt: 'Search my Obsidian vault for notes linking to [[System Architecture]] and synthesize an executive summary.'
  },
  {
    id: 'google-drive',
    name: 'Google Drive & Docs',
    slug: 'google-drive',
    category: 'Productivity',
    icon: '📁',
    description: 'Access Google Drive files, search Google Docs, parse spreadsheet tables, and export presentations for instant Claude analysis.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/gdrive',
    stars: '24.5k',
    verified: true,
    official: true,
    installType: 'npx',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-gdrive'],
    env: {
      GDRIVE_CLIENT_ID: 'your-client-id',
      GDRIVE_CLIENT_SECRET: 'your-client-secret'
    },
    keyFeatures: ['Google Docs text extraction', 'Sheet table analysis', 'File search across folders', 'Permission verification'],
    samplePrompt: 'Search my Google Drive for "2026 Financial Projections.xlsx" and summarize the annual recurring revenue projections.'
  },

  // WEB & SEARCH
  {
    id: 'brave-search',
    name: 'Brave Web & News Search',
    slug: 'brave-search',
    category: 'Web & Search',
    icon: '🦁',
    description: 'Provides real-time web search capabilities using Brave Search API. Privacy-focused, independent index returning fresh web and news results.',
    maintainer: 'Brave Software Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search',
    stars: '24.5k',
    verified: true,
    official: true,
    installType: 'npx',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-brave-search'],
    env: {
      BRAVE_API_KEY: 'your_brave_search_api_key'
    },
    keyFeatures: ['Real-time web queries', 'Local business searches', 'Fresh news aggregation', 'Privacy-first index'],
    samplePrompt: 'Search the web for recent announcements regarding Claude 3.7 Sonnet pricing and list the key updates.'
  },
  {
    id: 'puppeteer',
    name: 'Puppeteer Web Scraper',
    slug: 'puppeteer',
    category: 'Web & Search',
    icon: '🌐',
    description: 'Enables Claude to navigate any public website, execute client-side JavaScript, extract structured text, and take full screenshots.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer',
    stars: '24.5k',
    verified: true,
    official: true,
    installType: 'npx',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-puppeteer'],
    keyFeatures: ['Client-side JS rendering', 'HTML to Markdown extraction', 'Screenshots of dynamic apps', 'Bypass static limitations'],
    samplePrompt: 'Scrape the pricing page of competitor X, extract all tiers and feature tables, and output as clean markdown.'
  },
  {
    id: 'fetch',
    name: 'Web Fetch & HTTP Client',
    slug: 'fetch',
    category: 'Web & Search',
    icon: '⚡',
    description: 'Lightweight, ultra-fast web page fetcher that converts raw web HTML into clean, token-efficient Markdown for Claude consumption.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/fetch',
    stars: '24.5k',
    verified: true,
    official: true,
    installType: 'uvx',
    command: 'uvx',
    args: ['mcp-server-fetch'],
    keyFeatures: ['Raw HTML to Markdown', 'Low token consumption', 'Fast static fetching', 'Header customization'],
    samplePrompt: 'Fetch the documentation page for Anthropic Model Context Protocol and explain how server tools are registered.'
  },
  {
    id: 'tavily',
    name: 'Tavily AI Search Engine',
    slug: 'tavily',
    category: 'Web & Search',
    icon: '🔍',
    description: 'Search engine optimized specifically for autonomous AI agents. Returns cleaned, synthesized web answers without ad clutter.',
    maintainer: 'Tavily AI Official',
    githubUrl: 'https://github.com/tavily-ai/tavily-mcp',
    stars: '3.6k',
    verified: true,
    official: true,
    installType: 'npx',
    command: 'npx',
    args: ['-y', 'tavily-mcp'],
    env: {
      TAVILY_API_KEY: 'your_tavily_api_key'
    },
    keyFeatures: ['Agent-optimized search snippets', 'Direct answer extraction', 'Domain inclusion/exclusion', 'Low latency responses'],
    samplePrompt: 'Perform deep research on current US cloud infrastructure benchmarks and synthesize the top 3 market findings.'
  },

  // CLOUD & DEVOPS
  {
    id: 'aws',
    name: 'AWS Cloud Infrastructure',
    slug: 'aws',
    category: 'Cloud & DevOps',
    icon: '☁️',
    description: 'Inspect AWS services, query CloudWatch metrics, list S3 buckets, manage EC2/ECS instances, and review IAM policies.',
    maintainer: 'AWS Labs',
    githubUrl: 'https://github.com/awslabs/mcp-server-aws',
    stars: '5.4k',
    verified: true,
    official: true,
    installType: 'uvx',
    command: 'uvx',
    args: ['mcp-server-aws'],
    env: {
      AWS_REGION: 'us-east-1',
      AWS_PROFILE: 'default'
    },
    keyFeatures: ['CloudWatch logs querying', 'S3 storage inspection', 'IAM role validation', 'Lambda execution metrics'],
    samplePrompt: 'Check CloudWatch logs for error spikes in the production authentication service over the past 2 hours.'
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare Workers & DNS',
    slug: 'cloudflare',
    category: 'Cloud & DevOps',
    icon: '🧡',
    description: 'Manage Cloudflare Workers, inspect DNS records, review security firewall rules, and query D1 serverless SQL databases.',
    maintainer: 'Cloudflare Community',
    githubUrl: 'https://github.com/cloudflare/mcp-server-cloudflare',
    stars: '3.8k',
    verified: true,
    official: true,
    installType: 'npx',
    command: 'npx',
    args: ['-y', '@cloudflare/mcp-server-cloudflare'],
    env: {
      CLOUDFLARE_API_TOKEN: 'your_cloudflare_api_token',
      CLOUDFLARE_ACCOUNT_ID: 'your_account_id'
    },
    keyFeatures: ['Worker deployment management', 'DNS record updates', 'D1 database querying', 'WAF security log review'],
    samplePrompt: 'Verify DNS propagation for my new subdomains and ensure all records have Cloudflare proxy enabled.'
  },
  {
    id: 'sentry',
    name: 'Sentry Error Monitoring',
    slug: 'sentry',
    category: 'Cloud & DevOps',
    icon: '🚨',
    description: 'Retrieve live production exceptions, inspect stack traces, analyze regression causes, and trace unhandled errors in real time.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/sentry',
    stars: '24.5k',
    verified: true,
    official: true,
    installType: 'npx',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-sentry'],
    env: {
      SENTRY_AUTH_TOKEN: 'your_sentry_auth_token'
    },
    keyFeatures: ['Live error stack traces', 'Breadcrumb event analysis', 'Issue assignment & tagging', 'Release health statistics'],
    samplePrompt: 'Fetch the top 5 unresolved errors in Sentry for the production release and diagnose the root cause of the 500 status codes.'
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes Cluster Manager',
    slug: 'kubernetes',
    category: 'Cloud & DevOps',
    icon: '☸️',
    description: 'Inspect Kubernetes pods, tail service logs, monitor deployment rollout states, and debug cluster health via kubectl MCP integration.',
    maintainer: 'Community Starred',
    githubUrl: 'https://github.com/mcp-servers/kubernetes',
    stars: '2.6k',
    verified: true,
    official: false,
    installType: 'npx',
    command: 'npx',
    args: ['-y', 'mcp-server-kubernetes'],
    keyFeatures: ['Pod health inspection', 'Namespace management', 'Deployment rollout tracking', 'Service discovery'],
    samplePrompt: 'List all pods in the production namespace that have restarted in the past 24 hours and show their termination reason.'
  },

  // MEMORY & REASONING
  {
    id: 'memory-graph',
    name: 'Anthropic Memory Knowledge Graph',
    slug: 'memory-graph',
    category: 'Memory & Reasoning',
    icon: '🧠',
    description: 'Gives Claude persistent long-term memory across sessions using a graph-based entity-relationship model stored locally.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/memory',
    stars: '24.5k',
    verified: true,
    official: true,
    installType: 'npx',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-memory'],
    keyFeatures: ['Persistent cross-chat recall', 'Entity relationship extraction', 'Local JSON graph store', 'Zero cloud data leak'],
    samplePrompt: 'Remember that our engineering stack utilizes Next.js 16 App Router, Prisma ORM, and Tailwind CSS for all projects.'
  },
  {
    id: 'sequential-thinking',
    name: 'Sequential Thinking Dynamic Reasoning',
    slug: 'sequential-thinking',
    category: 'Memory & Reasoning',
    icon: '🔄',
    description: 'Dynamic problem-solving connector that allows Claude to structure complex architectural challenges into step-by-step reasoning sequences.',
    maintainer: 'Model Context Protocol Official',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking',
    stars: '24.5k',
    verified: true,
    official: true,
    installType: 'npx',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-sequential-thinking'],
    keyFeatures: ['Dynamic hypothesis generation', 'Backtracking thought trees', 'Step-by-step verification', 'Deep problem solving'],
    samplePrompt: 'Use sequential thinking to decompose our distributed database migration into 8 zero-downtime cutover phases.'
  }
];

export const CONNECTOR_CATEGORIES = [
  'All Connectors',
  'Developer',
  'Databases',
  'Productivity',
  'Web & Search',
  'Cloud & DevOps',
  'Memory & Reasoning'
] as const;

export function getAllConnectors(): ClaudeConnector[] {
  return CLAUDE_CONNECTORS;
}

export function getConnectorBySlug(slug: string): ClaudeConnector | undefined {
  return CLAUDE_CONNECTORS.find((c) => c.slug === slug);
}
