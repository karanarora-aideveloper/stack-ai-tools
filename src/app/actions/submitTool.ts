'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function submitToolAction(formData: FormData) {
  const name = formData.get('name') as string
  const url = formData.get('url') as string
  const category = formData.get('category') as string
  const pricing = formData.get('pricing') as string
  const description = formData.get('description') as string

  if (!name || !url || !category || !pricing || !description) {
    throw new Error('All fields are required')
  }

  // Extract domain cleanly
  let domain = '';
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    domain = parsed.hostname.replace(/^www\./, '');
  } catch {
    domain = url.split('/')[0].replace(/^www\./, '');
  }

  const logoUrl = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : null;

  const categoryIcons: Record<string, string> = {
    Writing: '✍️',
    Code: '💻',
    Design: '🎨',
    Video: '🎬',
    Audio: '🎙️',
    Automation: '⚡',
    Marketing: '📈',
    Business: '💼'
  };

  await prisma.tool.create({
    data: {
      name,
      link: url.startsWith('http') ? url : `https://${url}`,
      domain,
      logoUrl,
      category,
      pricingModel: pricing,
      priceClass: pricing.toLowerCase(),
      description,
      icon: categoryIcons[category] || '✨',
      rating: 4.8,
      reviewsCount: 1,
      tags: [category, 'Community'],
      status: 'pending'
    }
  });

  return { success: true };
}
