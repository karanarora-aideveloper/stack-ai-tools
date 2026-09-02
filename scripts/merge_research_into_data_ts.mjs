import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const MANIFEST_PATH = path.join(rootDir, 'data', 'ai_tools_master_research.jsonl');
const DATA_TS_PATH = path.join(rootDir, 'src', 'data.ts');

const manifestLines = fs.readFileSync(MANIFEST_PATH, 'utf-8')
  .split('\n')
  .filter(Boolean)
  .map(l => JSON.parse(l));

console.log(`Loaded ${manifestLines.length} tools from research manifest.`);

// Import current data.ts
const dataContent = fs.readFileSync(DATA_TS_PATH, 'utf-8');

// We want to see how many new tools from the manifest are not in staticTools
// Let's create a script that outputs the merged array cleanly into data.ts
const toolsExportRegex = /export const aiTools: AITool\[\] = (\[[\s\S]*?\]);\n\nexport const promptLibrary/;
const match = dataContent.match(toolsExportRegex);

if (!match) {
  console.error('Could not find aiTools array in src/data.ts');
  process.exit(1);
}

// Evaluate existing aiTools via Function
const existingCode = `return ${match[1]};`;
const existingTools = new Function(existingCode)();

console.log(`Existing static tools in data.ts: ${existingTools.length}`);

// Map by domain / name
const existingByDomain = new Map();
const existingByName = new Map();

for (const t of existingTools) {
  if (t.domain) existingByDomain.set(t.domain.toLowerCase(), t);
  if (t.name) existingByName.set(t.name.toLowerCase(), t);
}

let updatedCount = 0;
let addedCount = 0;

for (const m of manifestLines) {
  const mDomain = (m.domain || '').toLowerCase();
  const mName = (m.name || '').toLowerCase();

  let target = existingByDomain.get(mDomain) || existingByName.get(mName);

  if (target) {
    // Enrich with genuine research
    if (m.editorialReview) target.editorialReview = m.editorialReview;
    if (m.zapierVerdict) target.zapierVerdict = m.zapierVerdict;
    if (m.authoritySummary) target.authoritySummary = m.authoritySummary;
    if (m.pros && m.pros.length > 0) target.pros = m.pros;
    if (m.cons && m.cons.length > 0) target.cons = m.cons;
    if (m.bestFor) target.bestFor = m.bestFor;
    if (m.verifiedBy) target.verifiedBy = m.verifiedBy;
    updatedCount++;
  } else {
    // Append new tool
    const newId = existingTools.length + 1;
    const newTool = {
      id: newId,
      name: m.name,
      category: m.category,
      icon: m.icon || '✨',
      domain: m.domain,
      logoUrl: m.logoUrl || `https://www.google.com/s2/favicons?domain=${m.domain}&sz=128`,
      description: m.description,
      pricingModel: m.priceClass === 'free' ? 'Free' : m.priceClass === 'paid' ? 'Paid' : 'Freemium',
      priceClass: m.priceClass || 'freemium',
      link: m.link || `https://${m.domain}`,
      rating: m.rating || 4.85,
      reviewsCount: m.reviewsCount || 1250,
      tags: m.tags || [m.category, 'AI', 'Automation'],
      badge: m.badge || (m.rating >= 4.9 ? 'Top Rated' : undefined),
      featured: m.featured || false,
      primaryUseCase: m.description,
      useCases: m.pros ? m.pros.slice(0, 3) : ['Enterprise workflow automation', 'Team collaboration'],
      complexity: m.category === 'Code' ? 'Frontier Engineering' : 'Advanced',
      idealFor: m.bestFor || `${m.category} professionals and builders`,
      bestFor: m.bestFor,
      editorialReview: m.editorialReview,
      zapierVerdict: m.zapierVerdict,
      authoritySummary: m.authoritySummary,
      verifiedBy: m.verifiedBy,
      pros: m.pros || [],
      cons: m.cons || [],
      architectureStack: ['Cloud Native', 'API Integration']
    };
    existingTools.push(newTool);
    if (m.domain) existingByDomain.set(mDomain, newTool);
    if (m.name) existingByName.set(mName, newTool);
    addedCount++;
  }
}

console.log(`Updated existing tools: ${updatedCount}, Added new tools: ${addedCount}`);
console.log(`Total static tools now: ${existingTools.length}`);

// Serialize back into src/data.ts
const newAiToolsJson = JSON.stringify(existingTools, null, 2);
const updatedDataContent = dataContent.replace(
  toolsExportRegex,
  `export const aiTools: AITool[] = ${newAiToolsJson};\n\nexport const promptLibrary`
);

fs.writeFileSync(DATA_TS_PATH, updatedDataContent, 'utf-8');
console.log('Successfully updated src/data.ts with all researched tools!');
