import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { breakingNewsArticlesMetadata } from '../src/data/blogs';
import { aiTools } from '../src/data';

const prisma = new PrismaClient();

async function main() {
  console.log('--- 1. Syncing Tools into MongoDB ---');
  const o3Tool = aiTools.find(t => t.name.includes('o3'));
  if (o3Tool) {
    const existing = await prisma.tool.findFirst({
      where: { name: o3Tool.name }
    });

    if (!existing) {
      await prisma.tool.create({
        data: {
          name: o3Tool.name,
          category: o3Tool.category,
          icon: o3Tool.icon || '🧠',
          logoUrl: o3Tool.logoUrl,
          domain: o3Tool.domain,
          description: o3Tool.description,
          pricingModel: o3Tool.pricingModel,
          priceClass: o3Tool.priceClass,
          link: o3Tool.link,
          rating: o3Tool.rating,
          reviewsCount: o3Tool.reviewsCount,
          tags: o3Tool.tags,
          badge: o3Tool.badge,
          featured: o3Tool.featured || true,
          status: 'approved',
          editorialReview: o3Tool.editorialReview,
          zapierVerdict: o3Tool.zapierVerdict,
          authoritySummary: o3Tool.authoritySummary,
          pros: o3Tool.pros || [],
          cons: o3Tool.cons || [],
          bestFor: o3Tool.bestFor,
          verifiedBy: o3Tool.verifiedBy
        }
      });
      console.log('✅ Created Tool: OpenAI o3 & o3-mini in MongoDB');
    } else {
      console.log('ℹ️ Tool OpenAI o3 already exists in MongoDB');
    }
  }

  console.log('\n--- 2. Syncing 10 Breaking News Articles into MongoDB ---');
  for (const art of breakingNewsArticlesMetadata) {
    await prisma.article.upsert({
      where: { slug: art.slug },
      update: {
        title: art.title,
        category: art.category,
        primaryKeyword: art.primaryKeyword,
        searchVolume: art.searchVolume,
        difficulty: art.difficulty,
        cpc: String(art.cpc),
        readTime: art.readTime,
        featured: art.featured,
        excerpt: art.excerpt,
        imageUrl: art.imageUrl,
        author: art.author,
        authorRole: art.authorRole,
        publishedAt: art.publishedAt,
        updatedAt: art.updatedAt,
        tags: art.tags,
        status: 'approved'
      },
      create: {
        legacyId: art.id,
        slug: art.slug,
        title: art.title,
        category: art.category,
        primaryKeyword: art.primaryKeyword,
        searchVolume: art.searchVolume,
        difficulty: art.difficulty,
        cpc: String(art.cpc),
        readTime: art.readTime,
        featured: art.featured,
        excerpt: art.excerpt,
        imageUrl: art.imageUrl,
        author: art.author,
        authorRole: art.authorRole,
        publishedAt: art.publishedAt,
        updatedAt: art.updatedAt,
        tags: art.tags,
        status: 'approved'
      }
    });
    console.log(`✅ Upserted DB Article: ${art.slug}`);
  }

  console.log('\n--- 3. Updating data/articles.json ---');
  const articlesJsonPath = path.join(process.cwd(), 'data/articles.json');
  if (fs.existsSync(articlesJsonPath)) {
    const raw = fs.readFileSync(articlesJsonPath, 'utf8');
    const articles = JSON.parse(raw);
    const existingSlugs = new Set(articles.map((a: any) => a.slug));
    const toAdd = breakingNewsArticlesMetadata.filter(a => !existingSlugs.has(a.slug));
    if (toAdd.length > 0) {
      const updated = [...toAdd, ...articles];
      fs.writeFileSync(articlesJsonPath, JSON.stringify(updated, null, 2), 'utf8');
      console.log(`✅ Added ${toAdd.length} articles to data/articles.json (Total: ${updated.length})`);
    } else {
      console.log('ℹ️ All breaking news articles already present in data/articles.json');
    }
  }

  console.log('\n✨ Database and Local Data Sync Completed Successfully!');
}

main()
  .catch(e => {
    console.error('Migration failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
