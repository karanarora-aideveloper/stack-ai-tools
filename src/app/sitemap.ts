import { MetadataRoute } from 'next';
import { getAllTools, getAllCategories } from '@/lib/tools';
import { getAllArticles } from '@/lib/blog';

export const dynamic = 'force-static';

export async function generateSitemaps() {
  // 0: Core pages, categories, tools, alternatives, search hubs (~650 URLs)
  // 1: Verified prerendered research guides & articles (~235 URLs)
  return [
    { id: 0 },
    { id: 1 },
  ];
}

export default async function sitemap(
  props: { id: Promise<{ id: string | number }> | { id: string | number } | number }
): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.stackaitools.com';
  const currentDate = new Date().toISOString();

  // Resolve id whether passed as a Promise (Next 16), an object, or direct primitive
  let resolvedId = 0;
  if (typeof props === 'number') {
    resolvedId = props;
  } else if (props && typeof props === 'object' && 'id' in props) {
    const idVal = 'then' in (props.id as any) ? await (props.id as any) : props.id;
    resolvedId = Number(idVal) || 0;
  }

  // -------------------------------------------------------------
  // SITEMAP 0: Core static, categories, tools, alternatives, hubs
  // -------------------------------------------------------------
  if (resolvedId === 0) {
    const [tools, categories] = await Promise.all([
      getAllTools(),
      getAllCategories(),
    ]);

    const staticRoutes: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 0.95,
      },
      {
        url: `${baseUrl}/categories`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/alternatives`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/prompts`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/antigravity-mcp`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 0.95,
      },
      {
        url: `${baseUrl}/claude-connectors`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 0.95,
      },
      {
        url: `${baseUrl}/submit`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/llms.txt`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.5,
      },
    ];

    const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => {
      const catSlug = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      return {
        url: `${baseUrl}/category/${catSlug}`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 0.85,
      };
    });

    const toolRoutes: MetadataRoute.Sitemap = tools.map((tool) => ({
      url: `${baseUrl}/tool/${tool.slug}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.85,
    }));

    const alternativeRoutes: MetadataRoute.Sitemap = tools.map((tool) => ({
      url: `${baseUrl}/alternatives/${tool.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    const { getAllSearchHubs } = await import('@/data/search-hubs');
    const searchHubs = getAllSearchHubs();
    const searchHubRoutes: MetadataRoute.Sitemap = searchHubs.map((hub) => ({
      url: `${baseUrl}/s/${hub.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    }));

    return [
      ...staticRoutes,
      ...categoryRoutes,
      ...toolRoutes,
      ...alternativeRoutes,
      ...searchHubRoutes,
    ];
  }

  // -------------------------------------------------------------
  // SITEMAP 1: Prerendered verified research guides (100% 200 OK)
  // -------------------------------------------------------------
  const { getPrerenderedArticles } = await import('@/lib/blog');
  const articles = await getPrerenderedArticles();

  return articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: article.updatedAt || currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
}
