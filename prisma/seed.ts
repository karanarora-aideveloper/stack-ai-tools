import { PrismaClient } from '@prisma/client';
import { aiTools, promptLibrary } from '../src/data';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Database with Enriched Tools and Outputs...');

  await prisma.tool.deleteMany();
  await prisma.prompt.deleteMany();

  // Seed Rich Tools
  for (const t of aiTools) {
    await prisma.tool.create({
      data: {
        name: t.name,
        category: t.category,
        icon: t.icon,
        domain: t.domain,
        logoUrl: t.logoUrl,
        description: t.description,
        pricingModel: t.pricingModel,
        priceClass: t.priceClass,
        link: t.link,
        rating: t.rating,
        reviewsCount: t.reviewsCount,
        tags: t.tags || [],
        badge: t.badge,
        featured: t.featured || false,
        status: 'approved'
      }
    });
  }

  // Seed Prompts with Tool-Specific Outputs
  for (const p of promptLibrary) {
    await prisma.prompt.create({
      data: {
        title: p.title,
        targetAI: p.targetAI,
        category: p.category,
        prompt: p.prompt,
        outputType: p.outputType || 'text',
        outputImageUrl: p.outputImageUrl,
        outputPreview: p.outputPreview,
        author: p.author || 'Curated',
        aspectRatio: p.aspectRatio || '16:9',
        tags: p.tags || [],
        status: 'approved'
      }
    });
  }

  console.log('Seeding finished successfully with tool-specific outputs!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
