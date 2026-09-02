import fs from 'fs';
import path from 'path';
import { getPrisma } from '../src/lib/tools';

async function main() {
  console.log('=== Step 1: Loading data/article_slug_images.json ===');
  const mappingPath = path.join(process.cwd(), 'data/article_slug_images.json');
  const mapping: Record<string, string> = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));
  const entries = Object.entries(mapping);
  console.log(`Loaded ${entries.length} article slug -> imageUrl mappings.`);

  const db = getPrisma();

  console.log('\n=== Step 2: Updating MongoDB Article collection ===');
  const BATCH_SIZE = 500;
  const totalBatches = Math.ceil(entries.length / BATCH_SIZE);
  let totalUpdated = 0;

  for (let i = 0; i < entries.length; i += BATCH_SIZE) {
    const chunk = entries.slice(i, i + BATCH_SIZE);
    const updates = chunk.map(([slug, imageUrl]) => ({
      q: { slug },
      u: { $set: { imageUrl } },
      multi: false
    }));

    const res: any = await db.$runCommandRaw({
      update: 'Article',
      updates
    });

    const modified = res?.nModified || res?.n || chunk.length;
    totalUpdated += modified;
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    console.log(`  Batch ${batchNum}/${totalBatches} (${chunk.length} items): ok=${res?.ok}, matched=${res?.n}, modified=${res?.nModified}`);
  }

  console.log(`\nSuccessfully processed all ${totalBatches} batches in MongoDB!`);

  console.log('\n=== Step 3: Verifying MongoDB uniqueness ===');
  const allDbArticles = await db.article.findMany({
    select: { slug: true, imageUrl: true }
  });

  const dbUrls = allDbArticles.map(a => a.imageUrl);
  const uniqueDbUrls = new Set(dbUrls);
  console.log(`Total DB Articles: ${allDbArticles.length}`);
  console.log(`Unique DB imageUrls: ${uniqueDbUrls.size}`);

  if (uniqueDbUrls.size !== allDbArticles.length) {
    console.error(`ERROR: Found ${allDbArticles.length - uniqueDbUrls.size} duplicate imageUrl values in MongoDB!`);
    process.exit(1);
  } else {
    console.log('PERFECT! Zero duplicate imageUrl values in MongoDB Article collection.');
  }

  console.log('\n=== Step 4: Checking & fixing Tool collection duplicate logos ===');
  const tools = await db.tool.findMany({
    select: { id: true, name: true, domain: true, logoUrl: true }
  });
  console.log(`Total tools in MongoDB: ${tools.length}`);

  const logoCounts: Record<string, number> = {};
  for (const t of tools) {
    if (t.logoUrl) {
      logoCounts[t.logoUrl] = (logoCounts[t.logoUrl] || 0) + 1;
    }
  }

  const dupLogos = Object.entries(logoCounts).filter(([url, count]) => count > 1);
  console.log(`Duplicate logoUrls in Tool collection: ${dupLogos.length}`);

  for (const [url, count] of dupLogos) {
    console.log(`  Fixing ${count}x reuse of: ${url}`);
    const affected = tools.filter(t => t.logoUrl === url);
    for (const tool of affected) {
      if (tool.domain) {
        const uniqueLogo = `https://www.google.com/s2/favicons?domain=${tool.domain}&sz=128`;
        await db.tool.update({
          where: { id: tool.id },
          data: { logoUrl: uniqueLogo }
        });
        console.log(`    Updated ${tool.name} (${tool.domain}) -> ${uniqueLogo}`);
      }
    }
  }

  // Final tool verification
  const updatedTools = await db.tool.findMany({ select: { logoUrl: true } });
  const finalToolLogoCounts: Record<string, number> = {};
  for (const t of updatedTools) {
    if (t.logoUrl) {
      finalToolLogoCounts[t.logoUrl] = (finalToolLogoCounts[t.logoUrl] || 0) + 1;
    }
  }
  const remainingToolDups = Object.entries(finalToolLogoCounts).filter(([_, count]) => count > 1);
  console.log(`Remaining duplicate logoUrls in Tool collection: ${remainingToolDups.length}`);

  console.log('\n=== SYNC COMPLETE ===');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
