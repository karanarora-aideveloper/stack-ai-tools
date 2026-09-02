import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const SITEMAP_STEP_PATH = path.join(rootDir, '.system_generated', 'steps', '2297', 'content.md');

// Fallback in case path doesn't exist, we can fetch
async function getSitemapContent() {
  const possiblePaths = [
    SITEMAP_STEP_PATH,
    path.join(process.env.HOME || '', '.gemini', 'antigravity-ide', 'brain', 'ff814c46-08f9-4d4f-856b-ea36b3c65c84', '.system_generated', 'steps', '2297', 'content.md')
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return fs.readFileSync(p, 'utf8');
    }
  }

  // Fetch directly if not on disk
  console.log('Fetching sitemap.xml directly...');
  const res = await fetch('https://aiagentsdirectory.com/sitemap.xml');
  return await res.text();
}

async function parseAgents() {
  const content = await getSitemapContent();
  
  // Extract all <loc>https://aiagentsdirectory.com/agent/[slug]</loc> but skip /alternatives
  const regex = /<loc>https:\/\/aiagentsdirectory\.com\/agent\/([a-z0-9-]+)<\/loc>/gi;
  const agentSlugs = new Set();
  let match;
  while ((match = regex.exec(content)) !== null) {
    const slug = match[1];
    if (!slug.endsWith('/alternatives')) {
      agentSlugs.add(slug);
    }
  }

  console.log(`Found ${agentSlugs.size} unique AI agent entries in sitemap!`);
  
  const sample = Array.from(agentSlugs).slice(0, 50);
  console.log('Sample agents:', sample);

  fs.writeFileSync(
    path.join(rootDir, 'data', 'harvested_agent_slugs.json'),
    JSON.stringify(Array.from(agentSlugs), null, 2)
  );
  console.log(`Wrote slugs to data/harvested_agent_slugs.json`);
}

parseAgents().catch(console.error);
