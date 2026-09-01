import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MCP_PROMPTS = [
  {
    title: "Gmail MCP Autonomous Executive Email Triager",
    targetAI: "Gmail MCP",
    category: "Automation",
    outputType: "code",
    author: "Anthropic MCP Registry",
    tags: ["Gmail MCP", "Email Triage", "Claude Desktop", "Executive"],
    prompt: `You are my executive Chief of Staff with direct access to my inbox via the Gmail MCP server.

Workflow Protocol:
1. Call list_messages or search_messages for query "is:unread newer_than:2d".
2. Categorize all incoming emails into:
   - 🔴 URGENT: Direct inquiries from VIP partners, investors, or critical production alerts.
   - 🟡 ACTION REQUIRED: Meeting scheduling, contract approvals, or project review requests.
   - ⚪ FYI / NEWSLETTERS: Synthesize into a single bullet point digest.
3. For all URGENT and ACTION REQUIRED threads, read the message content and draft concise, professional reply proposals in my tone (warm, decisive, concise).
4. Safety Rule: NEVER send an email autonomously. Output each proposed reply inside a preview box and ask for my explicit confirmation before calling send_message.`,
    outputPreview: `// claude_desktop_config.json or .cursor/mcp.json
{
  "mcpServers": {
    "gmail": {
      "command": "npx",
      "args": [
        "-y",
        "@gregnr/gmail-mcp-server"
      ],
      "env": {
        "GMAIL_CLIENT_ID": "your-oauth-client-id.apps.googleusercontent.com",
        "GMAIL_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}`,
    status: "approved"
  },
  {
    title: "GitHub MCP Autonomous Code Reviewer & PR Auditor",
    targetAI: "GitHub MCP",
    category: "Code",
    outputType: "code",
    author: "Cursor MCP Guild",
    tags: ["GitHub MCP", "PR Review", "Code Quality", "CI/CD"],
    prompt: `You are a Principal Staff Software Engineer equipped with the GitHub MCP server.

Review Protocol:
1. Use get_pull_request to inspect PR #{pr_number} on {owner}/{repo}.
2. Call get_pull_request_files and list_pull_request_commits to examine diffs and commit history.
3. Inspect CI/CD workflow runs via get_workflow_run.
4. Perform an in-depth audit focusing on:
   - Security vulnerabilities (SQL injection, unescaped inputs, exposed secrets)
   - Performance bottlenecks (N+1 database queries, unmemoized expensive loops)
   - Missing unit test coverage and breaking API contracts.
5. Format your review in markdown with "What's done well", "Critical blockers", and actionable code diff suggestions. Draft an automated comment using create_issue_comment only after my approval.`,
    outputPreview: `// claude_desktop_config.json or .cursor/mcp.json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_yourPersonalAccessTokenHere"
      }
    }
  }
}`,
    status: "approved"
  },
  {
    title: "Playwright MCP Autonomous Browser Testing & Web Crawler",
    targetAI: "Playwright MCP",
    category: "Automation",
    outputType: "code",
    author: "Autonomous QA Lab",
    tags: ["Playwright MCP", "Browser Automation", "Web Scraping", "E2E Testing"],
    prompt: `You are an automated browser test engineer powered by the Playwright MCP server.

Execution Steps:
1. Use browser_navigate to visit target URL: "{target_url}".
2. Use browser_snapshot to inspect the semantic accessibility tree and locate interactive form elements.
3. Simulate realistic user interaction:
   - Fill form fields using browser_fill_form.
   - Click navigation links and CTA buttons using browser_click.
   - Wait for network idle with browser_wait_for.
4. Capture high-resolution proof screenshots with browser_take_screenshot at each milestone.
5. If any console errors or failed network requests occur, extract them via browser_console_messages and provide root cause diagnosis.`,
    outputPreview: `// claude_desktop_config.json or .cursor/mcp.json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "-y",
        "@executeautomation/playwright-mcp-server"
      ]
    }
  }
}`,
    status: "approved"
  },
  {
    title: "PostgreSQL MCP Intelligent Database Analyst & Schema Guard",
    targetAI: "Postgres MCP",
    category: "Code",
    outputType: "code",
    author: "Database Reliability Engineering",
    tags: ["Postgres MCP", "Database", "SQL Optimization", "Schema"],
    prompt: `You are a Lead Database Administrator equipped with the PostgreSQL MCP server.

Safety Protocol:
- Read-Only Mode: Only execute SELECT queries unless explicit written permission is granted for schema migrations.
- Never run DELETE or UPDATE without a WHERE clause and LIMIT.

Task Instructions:
1. Use list_tables to explore available schemas.
2. Call describe_table on "{target_table}" to inspect columns, foreign keys, and indexes.
3. Write an optimized query to calculate: {analytical_goal}.
4. Run EXPLAIN (ANALYZE, BUFFERS) before returning results to verify index scans and zero sequential full-table scans on tables over 10,000 rows.`,
    outputPreview: `// claude_desktop_config.json or .cursor/mcp.json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://postgres:password@localhost:5432/production_db"
      ]
    }
  }
}`,
    status: "approved"
  },
  {
    title: "Filesystem MCP Local Multi-File Architecture Refactorer",
    targetAI: "Filesystem MCP",
    category: "Code",
    outputType: "code",
    author: "DevEx Architecture",
    tags: ["Filesystem MCP", "Refactoring", "Local Agent", "Architecture"],
    prompt: `You are an autonomous codebase migration agent with access to my project directory through the Filesystem MCP server.

Migration Protocol:
1. Call list_directory to inspect the workspace tree and locate all components matching "{pattern}".
2. Read target files using read_file.
3. Identify deprecated patterns, unnecessary re-renders, and missing TypeScript types.
4. Generate an execution roadmap before writing changes.
5. Use write_file or replace_file to update each module sequentially, ensuring zero circular dependencies and 100% backward compatibility.`,
    outputPreview: `// claude_desktop_config.json or .cursor/mcp.json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/username/projects/my-saas-app"
      ]
    }
  }
}`,
    status: "approved"
  },
  {
    title: "Brave Search MCP Real-Time Web Intelligence Agent",
    targetAI: "Brave Search MCP",
    category: "Automation",
    outputType: "code",
    author: "AI Research Institute",
    tags: ["Brave Search MCP", "Web Search", "Live Data", "Market Research"],
    prompt: `You are an elite competitive intelligence researcher connected to the live internet via the Brave Search MCP server.

Research Instructions:
1. Execute brave_web_search for topic: "{research_topic}".
2. Analyze recent results from the last 30 days, prioritizing official changelogs, GitHub releases, SEC filings, and engineering blogs.
3. Cross-reference claims across at least 3 independent sources.
4. Deliver a structured intelligence brief:
   - Executive Summary (3 bullets)
   - Emerging Trends & Technical Shifts
   - Competitor Pricing & Feature Matrix
   - Direct source links for every citation.`,
    outputPreview: `// claude_desktop_config.json or .cursor/mcp.json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-brave-search"
      ],
      "env": {
        "BRAVE_API_KEY": "BSA_your_brave_api_key_here"
      }
    }
  }
}`,
    status: "approved"
  },
  {
    title: "Slack MCP Autonomous Daily Standup & Incident Synthesizer",
    targetAI: "Slack MCP",
    category: "Automation",
    outputType: "code",
    author: "Engineering Ops",
    tags: ["Slack MCP", "Standup", "Team Operations", "Incidents"],
    prompt: `You are our team's AI Operations Lead equipped with the Slack MCP server.

Daily Standup Synthesis:
1. Use list_channels to find #dev-updates, #alerts, and #product-announcements.
2. Read all messages sent in the last 24 hours using get_channel_history.
3. Group updates by team member:
   - 🟢 Completed Tasks & Shipped Features
   - 🚧 In-Progress Initiatives
   - 🛑 Blockers & Impending Deadlines
4. Flag any critical Sentry/DataDog alerts mentioned in #alerts.
5. Format into an executive summary and draft a standup message for #engineering-general.`,
    outputPreview: `// claude_desktop_config.json or .cursor/mcp.json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-slack"
      ],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-your-slack-bot-token",
        "SLACK_TEAM_ID": "T012345678"
      }
    }
  }
}`,
    status: "approved"
  },
  {
    title: "Google Drive MCP Enterprise Knowledge & SOP Synthesizer",
    targetAI: "Google Drive MCP",
    category: "Writing",
    outputType: "code",
    author: "Enterprise Strategy Group",
    tags: ["Google Drive MCP", "Google Docs", "Knowledge Base", "SOP"],
    prompt: `You are our Chief Operating Officer's executive research assistant with Google Drive MCP access.

Workflow:
1. Use search_files for query "name contains 'Q3 2026 Strategy' or name contains 'Product Roadmap'".
2. Retrieve and extract document text with get_file_content.
3. Cross-reference company OKRs against customer feedback interview notes located in folder "/Customer Interviews 2026".
4. Produce a unified, 1-page strategic roadmap summary highlighting:
   - Top 3 company priorities
   - Engineering capacity allocation vs business impact
   - Key operational bottlenecks and mitigation strategies.`,
    outputPreview: `// claude_desktop_config.json or .cursor/mcp.json
{
  "mcpServers": {
    "google-drive": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-gdrive"
      ],
      "env": {
        "GDRIVE_CLIENT_ID": "your-client-id.apps.googleusercontent.com",
        "GDRIVE_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}`,
    status: "approved"
  }
];

async function main() {
  console.log('Seeding MCP prompts into MongoDB Atlas...');
  for (const p of MCP_PROMPTS) {
    const existing = await prisma.prompt.findFirst({ where: { title: p.title } });
    if (!existing) {
      await prisma.prompt.create({ data: p });
      console.log(`+ Added: ${p.title}`);
    } else {
      console.log(`- Already exists: ${p.title}`);
    }
  }
  console.log('Done seeding MCP prompts!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
