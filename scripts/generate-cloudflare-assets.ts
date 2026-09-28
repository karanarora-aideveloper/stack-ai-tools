import fs from 'fs';
import path from 'path';
import { aiTools } from '../src/data';
import { getToolSlug } from '../src/lib/tools';

export function generateCloudflareAssets() {
  const rootDir = process.cwd();
  const publicDir = path.join(rootDir, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Generate _redirects
  let redirects = `# Cloudflare Pages Redirects & Rewrites for Stack AI Tools\n`;
  redirects += `/sitemap.xml /sitemap.xml 200\n`;
  redirects += `/sitemap-index.xml /sitemap.xml 200\n`;
  redirects += `/sitemap/:id.xml /sitemap/:id.xml 200\n\n`;

  redirects += `# Outbound Affiliate Link Redirects\n`;
  const seenSlugs = new Set<string>();
  for (const tool of aiTools) {
    if (tool && tool.name && tool.link) {
      const slug = getToolSlug(tool.name);
      if (slug && !seenSlugs.has(slug)) {
        seenSlugs.add(slug);
        redirects += `/go/${slug} ${tool.link} 302\n`;
      }
    }
  }

  redirects += `\n# Fallback for unknown /go links\n`;
  redirects += `/go/* https://www.stackaitools.com/ 302\n`;

  fs.writeFileSync(path.join(publicDir, '_redirects'), redirects, 'utf8');
  console.log(`✅ Generated _redirects with ${seenSlugs.size} tool affiliate redirects`);

  // 2. Generate _headers
  const headers = `/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=2592000, stale-while-revalidate=86400
`;
  fs.writeFileSync(path.join(publicDir, '_headers'), headers, 'utf8');
  console.log(`✅ Generated _headers`);

  // 3. Generate sitemap.xml and sitemap-index.xml
  const today = new Date().toISOString().split('T')[0];
  let sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemapIndexXml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  for (let i = 0; i <= 10; i++) {
    sitemapIndexXml += `  <sitemap>\n`;
    sitemapIndexXml += `    <loc>https://www.stackaitools.com/sitemap/${i}.xml</loc>\n`;
    sitemapIndexXml += `    <lastmod>${today}</lastmod>\n`;
    sitemapIndexXml += `  </sitemap>\n`;
  }
  sitemapIndexXml += `</sitemapindex>\n`;

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapIndexXml, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), sitemapIndexXml, 'utf8');
  console.log(`✅ Generated sitemap.xml and sitemap-index.xml`);

  // 4. Generate llms.txt
  const llmsContent = `# Stack AI Tools (stackaitools.com)
> The authoritative directory of curated frontier AI software, autonomous coding agents, generative media models, and prompt engineering libraries. Independently tested and verified.

- Website: https://www.stackaitools.com
- About: https://www.stackaitools.com/about
- Open-Source Repo: https://github.com/karanarora-aideveloper/stack-ai-tools
- Main Market: United States (US) & Global
- Last Verified: September 2026
`;
  fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsContent, 'utf8');
  console.log(`✅ Generated llms.txt`);
}

generateCloudflareAssets();
