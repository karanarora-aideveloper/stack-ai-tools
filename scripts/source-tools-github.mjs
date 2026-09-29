/**
 * Automated Tool Sourcing Engine for Stack AI Tools
 * Fetches and parses curated frontier AI tools from top GitHub repositories:
 * - steven2358/awesome-generative-ai (Premier general GenAI directory)
 * - QAInsights/awesome-ai-tools (AI-native IDEs, Coding Agents, Terminals)
 * - e2b-dev/awesome-ai-agents (Autonomous agents & sandboxes)
 * - punkpeye/awesome-mcp-servers (Model Context Protocol servers)
 */

import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'StackAITools-Sourcing/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to fetch ${url}: HTTP ${res.statusCode}`));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractDomain(urlStr) {
  try {
    const url = new URL(urlStr);
    return url.hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

function parseMarkdownList(markdown, defaultCategory = 'Code', sourceName = 'GitHub') {
  const tools = [];
  const lines = markdown.split('\n');

  let currentCategory = defaultCategory;

  for (const line of lines) {
    // Check for category headers
    const headerMatch = line.match(/^##+ (.+)/);
    if (headerMatch) {
      const headerText = headerMatch[1].toLowerCase();
      if (headerText.includes('code') || headerText.includes('ide') || headerText.includes('terminal')) {
        currentCategory = 'Code';
      } else if (headerText.includes('agent')) {
        currentCategory = 'Automation';
      } else if (headerText.includes('image') || headerText.includes('design') || headerText.includes('3d')) {
        currentCategory = 'Design';
      } else if (headerText.includes('video')) {
        currentCategory = 'Video';
      } else if (headerText.includes('audio') || headerText.includes('voice') || headerText.includes('speech')) {
        currentCategory = 'Audio';
      } else if (headerText.includes('writing') || headerText.includes('text') || headerText.includes('chat')) {
        currentCategory = 'Writing';
      }
      continue;
    }

    // Match list item: - [Name](URL) - Description
    const listMatch = line.match(/^-\s+\[([^\]]+)\]\(([^)]+)\)\s*(?:[-–:]\s*(.+))?/);
    if (listMatch) {
      const rawName = listMatch[1].trim();
      const link = listMatch[2].trim();
      let description = (listMatch[3] || '').trim();

      // Clean markdown tags like [#opensource](...) from description
      description = description.replace(/\[#opensource\]\([^)]+\)/gi, '').trim();

      const isArticle = link.includes('/article/') || link.includes('/news/') || link.includes('nytimes.com') || link.includes('wsj.com') || link.includes('wired.com');
      if (rawName && link && !link.startsWith('#') && link.startsWith('http') && !isArticle) {
        const domain = extractDomain(link);
        tools.push({
          name: rawName,
          link,
          domain,
          category: currentCategory,
          description: description || `${rawName} AI tool curated from ${sourceName}`,
          source: sourceName
        });
      }
    }

    // Match table row: | **[Name](URL)** | Company | Notes |
    const tableMatch = line.match(/^\|\s*\*\*\[([^\]]+)\]\(([^)]+)\)\*\*\s*\|\s*([^|]*)\|\s*([^|]*)\|/);
    if (tableMatch) {
      const rawName = tableMatch[1].trim();
      const link = tableMatch[2].trim();
      const company = tableMatch[3].trim();
      const notes = tableMatch[4].trim();

      if (rawName && link && link.startsWith('http')) {
        tools.push({
          name: rawName,
          link,
          domain: extractDomain(link),
          category: currentCategory,
          description: notes || `${company} AI tool`,
          source: sourceName
        });
      }
    }
  }

  return tools;
}

export async function sourceToolsFromTrustedGit() {
  console.log('🔍 Starting Tool Ingestion from Trusted Git Repositories...\n');

  const sources = [
    {
      name: 'steven2358/awesome-generative-ai',
      url: 'https://raw.githubusercontent.com/steven2358/awesome-generative-ai/main/README.md',
      defaultCategory: 'Code'
    },
    {
      name: 'QAInsights/awesome-ai-tools',
      url: 'https://raw.githubusercontent.com/QAInsights/awesome-ai-tools/main/README.md',
      defaultCategory: 'Code'
    },
    {
      name: 'punkpeye/awesome-mcp-servers',
      url: 'https://raw.githubusercontent.com/punkpeye/awesome-mcp-servers/main/README.md',
      defaultCategory: 'Automation'
    }
  ];

  const allDiscovered = [];

  for (const src of sources) {
    try {
      console.log(`📡 Fetching from: ${src.name}...`);
      const md = await fetchUrl(src.url);
      const parsed = parseMarkdownList(md, src.defaultCategory, src.name);
      console.log(`   ✅ Found ${parsed.length} candidate tools from ${src.name}`);
      allDiscovered.push(...parsed);
    } catch (err) {
      console.error(`   ❌ Failed to fetch ${src.name}:`, err.message);
    }
  }

  // Load existing tools to identify unindexed tools
  const seedPath = path.join(ROOT_DIR, 'src/data/db-tools-seed.json');
  let existingNames = new Set();
  let existingDomains = new Set();

  if (fs.existsSync(seedPath)) {
    const seedData = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));
    for (const t of seedData) {
      if (t.name) existingNames.add(t.name.toLowerCase().trim());
      if (t.domain) existingDomains.add(t.domain.toLowerCase().trim());
    }
  }

  // Deduplicate and filter out already indexed tools
  const newDiscovered = [];
  const seenUrls = new Set();

  for (const item of allDiscovered) {
    const domain = item.domain.toLowerCase();
    const nameLower = item.name.toLowerCase();

    if (seenUrls.has(item.link) || existingNames.has(nameLower) || (domain && existingDomains.has(domain))) {
      continue;
    }
    seenUrls.add(item.link);
    newDiscovered.push(item);
  }

  console.log(`\n======================================================`);
  console.log(`📊 SOURCING RESULTS SUMMARY`);
  console.log(`======================================================`);
  console.log(`Total Candidates Parsed:     ${allDiscovered.length}`);
  console.log(`Already Cataloged in Stack:  ${allDiscovered.length - newDiscovered.length}`);
  console.log(`New Frontier Tools Found:    ${newDiscovered.length}`);

  // Write top discoveries to a staging JSON file
  const outPath = path.join(ROOT_DIR, 'src/data/sourced-tools-staging.json');
  fs.writeFileSync(outPath, JSON.stringify(newDiscovered.slice(0, 100), null, 2));
  console.log(`💾 Saved top 100 new candidate tools to: ${outPath}\n`);

  // Print top 10 sample new tools
  console.log('Top 10 High-Intent New Discoveries:');
  newDiscovered.slice(0, 10).forEach((t, i) => {
    console.log(`  ${i + 1}. ${t.name} (${t.category}) - ${t.link} [${t.source}]`);
    console.log(`     Desc: ${t.description.slice(0, 80)}...`);
  });

  return newDiscovered;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  sourceToolsFromTrustedGit();
}
