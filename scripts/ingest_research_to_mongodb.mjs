import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const MANIFEST_PATH = path.join(rootDir, 'data', 'ai_tools_master_research.jsonl');
const prisma = new PrismaClient();

async function ingestManifest() {
  console.log('📦 Ingesting Master Research Manifest into MongoDB Atlas...');

  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error(`❌ Manifest file not found at: ${MANIFEST_PATH}`);
    process.exit(1);
  }

  const lines = fs.readFileSync(MANIFEST_PATH, 'utf8').split('\n').filter(Boolean);
  console.log(`📋 Total tools in manifest to process: ${lines.length}`);

  let createdCount = 0;
  let updatedCount = 0;
  let errorCount = 0;

  for (let i = 0; i < lines.length; i++) {
    try {
      const tool = JSON.parse(lines[i]);
      if (!tool.name || !tool.category) continue;

      const domain = tool.domain ? tool.domain.toLowerCase().trim() : null;
      const name = tool.name.trim();

      // Check if tool already exists by domain or name
      const existing = await prisma.tool.findFirst({
        where: {
          OR: [
            ...(domain ? [{ domain: { equals: domain, mode: 'insensitive' } }] : []),
            { name: { equals: name, mode: 'insensitive' } }
          ]
        }
      });

      const payload = {
        name,
        category: tool.category,
        domain,
        link: tool.link || `https://${domain || ''}`,
        logoUrl: tool.logoUrl || existing?.logoUrl || null,
        description: tool.description || existing?.description || `${name} frontier AI software platform.`,
        pricingModel: tool.pricingDetails || existing?.pricingModel || 'Freemium',
        priceClass: tool.priceClass || existing?.priceClass || 'freemium',
        rating: tool.rating || existing?.rating || 4.8,
        reviewsCount: tool.reviewsCount || existing?.reviewsCount || 150,
        tags: tool.tags && tool.tags.length > 0 ? tool.tags : (existing?.tags || [tool.category]),
        badge: tool.badge || existing?.badge || null,
        featured: tool.featured !== undefined ? tool.featured : (existing?.featured || false),
        status: 'approved',
        editorialReview: tool.editorialReview || null,
        zapierVerdict: tool.zapierVerdict || null,
        authoritySummary: tool.authoritySummary || null,
        pros: tool.pros || [],
        cons: tool.cons || [],
        bestFor: tool.bestFor || null,
        verifiedBy: tool.verifiedBy || null
      };

      if (existing) {
        await prisma.tool.update({
          where: { id: existing.id },
          data: payload
        });
        updatedCount++;
      } else {
        await prisma.tool.create({
          data: payload
        });
        createdCount++;
      }

      if ((i + 1) % 10 === 0 || i === lines.length - 1) {
        console.log(`[${i + 1}/${lines.length}] Progress: ${createdCount} created, ${updatedCount} updated`);
      }
    } catch (err) {
      errorCount++;
      console.error(`❌ Error on line ${i + 1}:`, err.message);
    }
  }

  console.log('\n========================================');
  console.log(`🎉 Ingestion Complete!`);
  console.log(`✨ Created: ${createdCount}`);
  console.log(`🔄 Updated with Research: ${updatedCount}`);
  console.log(`⚠️ Errors: ${errorCount}`);
  console.log('========================================\n');

  await prisma.$disconnect();
}

ingestManifest().catch(async (e) => {
  console.error('Fatal Ingestion Error:', e);
  await prisma.$disconnect();
  process.exit(1);
});
