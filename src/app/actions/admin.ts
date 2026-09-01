'use server';

import { getPrisma, invalidateToolsCache } from '@/lib/tools';
import { revalidatePath } from 'next/cache';

const DEFAULT_ADMIN_PASSKEY = process.env.ADMIN_PASSWORD || 'stackai2026';

export async function verifyAdminPasskey(passkey: string) {
  if (!passkey || passkey.trim() !== DEFAULT_ADMIN_PASSKEY) {
    return { success: false, error: 'Invalid admin passkey. Please check your credentials.' };
  }
  return { success: true };
}

export interface ToolInputData {
  id?: string;
  name: string;
  category: string;
  link: string;
  affiliateLink?: string;
  description: string;
  pricingModel: string;
  priceClass: 'free' | 'freemium' | 'paid';
  tags?: string[];
  badge?: string;
  featured?: boolean;
  rating?: number;
  reviewsCount?: number;
}

function extractDomain(url: string): string {
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return url.split('/')[0].replace(/^www\./, '');
  }
}

const CATEGORY_ICONS: Record<string, string> = {
  Writing: '✍️',
  Code: '💻',
  Design: '🎨',
  Video: '🎬',
  Audio: '🎙️',
  Automation: '⚡',
  Marketing: '📈',
  Business: '💼'
};

export async function createToolAction(data: ToolInputData) {
  const db = getPrisma();
  const domain = extractDomain(data.link);
  const logoUrl = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : null;
  const icon = CATEGORY_ICONS[data.category] || '✨';

  // If affiliate link is provided, use it as primary outbound link
  const finalLink = data.affiliateLink?.trim() || data.link.trim();

  const created = await db.tool.create({
    data: {
      name: data.name.trim(),
      category: data.category.trim(),
      domain,
      logoUrl,
      icon,
      link: finalLink,
      description: data.description.trim(),
      pricingModel: data.pricingModel || 'Freemium',
      priceClass: data.priceClass || 'freemium',
      rating: data.rating ?? 4.9,
      reviewsCount: data.reviewsCount ?? 150,
      tags: data.tags && data.tags.length > 0 ? data.tags : [data.category, 'Frontier AI'],
      badge: data.badge?.trim() || null,
      featured: Boolean(data.featured),
      status: 'approved'
    }
  });

  invalidateToolsCache();
  revalidatePath('/');
  revalidatePath('/categories');
  revalidatePath('/admin');

  return { success: true, tool: created };
}

export async function updateToolAction(id: string, data: ToolInputData) {
  const db = getPrisma();
  const domain = extractDomain(data.link);
  const logoUrl = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : null;
  const finalLink = data.affiliateLink?.trim() || data.link.trim();

  // Try updating by id first if it looks like a MongoDB ObjectId (24 hex characters)
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);

  if (isObjectId) {
    await db.tool.update({
      where: { id },
      data: {
        name: data.name.trim(),
        category: data.category.trim(),
        domain,
        logoUrl,
        link: finalLink,
        description: data.description.trim(),
        pricingModel: data.pricingModel,
        priceClass: data.priceClass,
        rating: data.rating,
        reviewsCount: data.reviewsCount,
        tags: data.tags,
        badge: data.badge?.trim() || null,
        featured: Boolean(data.featured)
      }
    });
  } else {
    // If updating a static item that wasn't yet in DB, upsert it by name
    await db.tool.upsert({
      where: { id: isObjectId ? id : '000000000000000000000000' },
      update: {
        name: data.name.trim(),
        category: data.category.trim(),
        domain,
        logoUrl,
        link: finalLink,
        description: data.description.trim(),
        pricingModel: data.pricingModel,
        priceClass: data.priceClass,
        badge: data.badge?.trim() || null,
        featured: Boolean(data.featured)
      },
      create: {
        name: data.name.trim(),
        category: data.category.trim(),
        domain,
        logoUrl,
        icon: CATEGORY_ICONS[data.category] || '✨',
        link: finalLink,
        description: data.description.trim(),
        pricingModel: data.pricingModel,
        priceClass: data.priceClass,
        rating: data.rating ?? 4.8,
        reviewsCount: data.reviewsCount ?? 120,
        tags: data.tags ?? [data.category],
        badge: data.badge?.trim() || null,
        featured: Boolean(data.featured),
        status: 'approved'
      }
    });
  }

  invalidateToolsCache();
  revalidatePath('/');
  revalidatePath('/categories');
  revalidatePath('/admin');

  return { success: true };
}

export async function updateAffiliateLinkAction(id: string, affiliateUrl: string, toolName?: string) {
  const db = getPrisma();
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);

  if (isObjectId) {
    await db.tool.update({
      where: { id },
      data: { link: affiliateUrl.trim() }
    });
  } else if (toolName) {
    // Find or create in DB
    const existing = await db.tool.findFirst({ where: { name: toolName } });
    if (existing) {
      await db.tool.update({
        where: { id: existing.id },
        data: { link: affiliateUrl.trim() }
      });
    }
  }

  invalidateToolsCache();
  revalidatePath('/');
  revalidatePath('/admin');

  return { success: true };
}

export async function toggleFeaturedAction(id: string, featured: boolean, toolName?: string) {
  const db = getPrisma();
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);

  if (isObjectId) {
    await db.tool.update({
      where: { id },
      data: { featured }
    });
  } else if (toolName) {
    const existing = await db.tool.findFirst({ where: { name: toolName } });
    if (existing) {
      await db.tool.update({
        where: { id: existing.id },
        data: { featured }
      });
    }
  }

  invalidateToolsCache();
  revalidatePath('/');
  revalidatePath('/admin');

  return { success: true };
}

export async function approveToolAction(id: string) {
  const db = getPrisma();
  await db.tool.update({
    where: { id },
    data: { status: 'approved' }
  });

  invalidateToolsCache();
  revalidatePath('/');
  revalidatePath('/categories');
  revalidatePath('/admin');

  return { success: true };
}

export async function rejectToolAction(id: string) {
  const db = getPrisma();
  await db.tool.delete({
    where: { id }
  });

  invalidateToolsCache();
  revalidatePath('/admin');

  return { success: true };
}

export async function deleteToolAction(id: string) {
  const db = getPrisma();
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);

  if (isObjectId) {
    await db.tool.delete({
      where: { id }
    });
  }

  invalidateToolsCache();
  revalidatePath('/');
  revalidatePath('/categories');
  revalidatePath('/admin');

  return { success: true };
}
