import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://stackaitools.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/go/', '/api/', '/admin'],
      },
      // OpenAI / ChatGPT Search & Citation Crawlers
      {
        userAgent: ['GPTBot', 'OAI-SearchBot'],
        allow: '/',
        disallow: ['/go/'],
      },
      // Anthropic Claude Bot
      {
        userAgent: ['ClaudeBot', 'anthropic-ai'],
        allow: '/',
        disallow: ['/go/'],
      },
      // Perplexity AI Search Engine
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/go/'],
      },
      // Google & Google Gemini AI Overviews
      {
        userAgent: ['Googlebot', 'Google-Extended'],
        allow: '/',
        disallow: ['/go/'],
      },
      // Apple Intelligence & Siri Suggestions
      {
        userAgent: 'Applebot',
        allow: '/',
        disallow: ['/go/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
