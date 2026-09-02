import { MetadataRoute } from 'next';
import { getAllTools, getAllCategories } from '@/lib/tools';
import { getAllArticles } from '@/lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.stackaitools.com';
  const currentDate = new Date().toISOString();

  const [tools, categories] = await Promise.all([
    getAllTools(),
    getAllCategories()
  ]);

  const articles = getAllArticles();

  // 1. Static Core Landing Pages
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

  // 2. Dynamic Category Clusters (8 High-Intent Categories)
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.toLowerCase()}`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 0.85,
  }));

  // 3. Dynamic Programmatic Tool Profile Routes (222 Vetted Frontier Tools)
  const toolRoutes: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/tool/${tool.slug}`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 0.85,
  }));

  // 4. Dynamic Head-to-Head Alternative Comparison Routes (222 Alternative Clusters)
  const alternativeRoutes: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/alternatives/${tool.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 5. Dynamic Programmatic Blog Article Routes (All 10,000 In-Depth Research Guides)
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: article.updatedAt || currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 6. Dynamic Programmatic Search Hub Routes (High-Volume Competitor Search Gaps)
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
    ...articleRoutes,
  ];
}
