import { MetadataRoute } from 'next';
import { getAllTools, getAllCategories } from '@/lib/tools';
import { getAllArticles } from '@/lib/blog';

export async function generateSitemaps() {
  // 0: Core pages, categories, tools, alternatives, search hubs (~600 URLs)
  // 1-10: 1,000 articles per chunk for the 10,000 article catalog
  return [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
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

    const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
      url: `${baseUrl}/category/${cat.toLowerCase()}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.85,
    }));

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
  // SITEMAPS 1-10: 1,000 blog articles each (Chunked for GSC speed)
  // -------------------------------------------------------------
  const articles = await getAllArticles();
  const chunkSize = 1000;
  const startIndex = (resolvedId - 1) * chunkSize;
  const endIndex = startIndex + chunkSize;
  const chunkedArticles = articles.slice(startIndex, endIndex);

  return chunkedArticles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: article.updatedAt || currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
}
