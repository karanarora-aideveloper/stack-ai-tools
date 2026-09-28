import fs from 'fs';
import path from 'path';
import { aiTools } from '../src/data';
import { getAllTools, getToolSlug } from '../src/lib/tools';

export async function generateCloudflareAssets() {
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

  // Fetch all tools from DB or fallback
  let allTools = aiTools;
  try {
    const dbTools = await getAllTools();
    if (dbTools && dbTools.length > 0) {
      allTools = dbTools as any;
    }
  } catch (err) {
    console.warn('⚠️ Falling back to static tools for _redirects:', err);
  }

  for (const tool of allTools) {
    if (tool && tool.name && tool.link) {
      const slug = (tool as any).slug || getToolSlug(tool.name);
      if (slug && !seenSlugs.has(slug)) {
        seenSlugs.add(slug);
        redirects += `/go/${slug} ${tool.link} 302\n`;
      }
    }
  }

  // Common aliases and variations
  const aliases: Record<string, string> = {
    'claude': 'https://claude.ai',
    'claude-sonnet-5': 'https://claude.ai',
    'claude-opus-5-5': 'https://claude.ai',
    'claude-3-7-sonnet': 'https://claude.ai',
    'chatgpt': 'https://chatgpt.com',
    'gpt-6': 'https://chatgpt.com',
    'gpt-6-astra': 'https://chatgpt.com',
    'gpt-6-sol': 'https://chatgpt.com',
    'gemini': 'https://gemini.google.com',
    'gemini-3-8-flash': 'https://gemini.google.com',
    'deepseek-v4': 'https://deepseek.com',
    'deepseek-v4-1': 'https://deepseek.com',
    'windsurf-codeium': 'https://codeium.com/windsurf',
    'lovabledev': 'https://lovable.dev',
    'v0-by-vercel': 'https://v0.dev',
    'artisan': 'https://artisan.co',
    'shortgpt': 'https://github.com/RayFernando1337/ShortGPT',
    'autogpt': 'https://agpt.co',
    'langchain': 'https://langchain.com',
    'crewai': 'https://crewai.com',
    'multion': 'https://multion.ai',
    'voiceflow': 'https://voiceflow.com',
    'deepgram': 'https://deepgram.com',
    'surfer-seo': 'https://surferseo.com',
    'cal-ai': 'https://cal.ai',
    'clay': 'https://clay.com',
    'fathom': 'https://fathom.video',
    'groq': 'https://groq.com',
    'lilac-labs': 'https://lilacml.com',
    'salesape-ai': 'https://salesape.ai',
    'superagi': 'https://superagi.com',
    'haystack': 'https://haystack.deepset.ai',
    'langflow': 'https://langflow.org',
    'vanna-ai': 'https://vanna.ai',
    'difyai': 'https://dify.ai',
    'qode': 'https://qode.ai',
    'tavily': 'https://tavily.com',
    'mirascope': 'https://mirascope.com',
    'phonely-ai': 'https://phonely.ai',
    'callfluent-ai': 'https://callfluent.com',
    'synthflow-ai': 'https://synthflow.ai',
    'thoughtly-ai': 'https://thoughtly.ai',
    'goodcall-ai': 'https://goodcall.com',
    '11xai': 'https://11x.ai',
    'wordware': 'https://wordware.ai',
    'controlflow': 'https://controlflow.ai',
    'agentgpt': 'https://agentgpt.reworkd.ai',
    'sweep-ai': 'https://sweep.dev',
    'phidata': 'https://phidata.com',
    'beam-ai': 'https://beam.ai',
    'composio': 'https://composio.dev',
    'mistral-ai-agent': 'https://mistral.ai',
    'descript-studio-sound-20': 'https://descript.com',
    'kushoai': 'https://kusho.ai',
    'agent-zero': 'https://github.com/frdel/agent-zero',
    'praisonai': 'https://praison.ai',
    'wren-ai': 'https://getwren.ai',
    'tusk': 'https://usetusk.ai',
    'autogen': 'https://microsoft.github.io/autogen',
    'anon': 'https://anon.com',
    'custodia-ai': 'https://custodia.ai',
    'mindpal': 'https://mindpal.space',
    'tektonic-ai': 'https://tektonic.ai',
    'humen': 'https://humen.ai',
    'avanzai': 'https://avanz.ai',
    'talkstack-ai': 'https://talkstack.com',
    'lynq-ai': 'https://lynq.ai',
    'speaqai': 'https://speaq.ai',
    'metagpt': 'https://github.com/geekan/MetaGPT',
    'adept-ai': 'https://adept.ai',
    'scrapenew': 'https://scrapenew.com',
    'aomni': 'https://aomni.com',
    'nelima': 'https://nelima.ai',
    'einstein-service-agent': 'https://salesforce.com',
    'nexusgpt': 'https://nexusgpt.io',
    'aileadagentcom': 'https://aileadagent.com',
    'stockimgai': 'https://stockimg.ai',
    'reiki': 'https://reiki.web3go.xyz',
    'teenage-agi': 'https://github.com/yoheinakajima/babyagi',
    'paymanai': 'https://payman.ai',
    'airkitai': 'https://airkit.com',
    'bloop-ai': 'https://bloop.ai',
    'octoverse': 'https://octoverse.ai',
    'askyourdatabase': 'https://askyourdatabase.com',
    'project-oscar': 'https://oscar.ai',
    'visualagentsai': 'https://visualagents.ai',
    'moemate': 'https://moemate.io',
    'hebbia-ai': 'https://hebbia.ai',
    'talkscriber': 'https://talkscriber.com',
    'anymodel': 'https://anymodel.ai',
    'kay-ai': 'https://kay.ai',
    'superagent': 'https://superagent.sh',
    'project-astra': 'https://deepmind.google/technologies/gemini/project-astra',
    'apidna': 'https://apidna.com',
    'softgen': 'https://softgen.ai',
    'vertex-ai-agent-builder': 'https://cloud.google.com/products/agent-builder',
    'griptape': 'https://griptape.ai',
    'aide': 'https://aide.dev',
    'cognosys': 'https://cognosys.ai',
    'uagents': 'https://fetch.ai',
    'llmstack': 'https://llmstack.ai',
    'sourcegraph-cody-ai': 'https://sourcegraph.com/cody',
    'opencord-ai': 'https://opencord.ai',
    'langwatch': 'https://langwatch.ai',
    'vinsi': 'https://vinsi.ai',
    'ai-phone-agent': 'https://aiphoneagent.com',
    'aivah': 'https://aivah.com',
    'mightybot': 'https://mightybot.ai',
    'agentverse': 'https://agentverse.ai',
    'eidolon-ai': 'https://eidolonai.com',
    'emergence-ai': 'https://emergence.ai',
    'questflow-ai': 'https://questflow.ai',
    'reactagent': 'https://reactagent.com',
    'do-anything-machine': 'https://doanythingmachine.com',
    'agent-genesis': 'https://agentgenesis.ai',
    'maige': 'https://maige.app',
    'mitra': 'https://mitra.ai',
    'voyager': 'https://voyager.minedojo.org',
    'jaceai': 'https://jace.ai',
    'phoenix': 'https://arize.com/phoenix',
    'ai-agent-app': 'https://aiagentapp.com',
    'hyperwrite-ai-agent': 'https://hyperwriteai.com',
    'llamacloud': 'https://cloud.llamaindex.ai'
  };

  for (const [alias, dest] of Object.entries(aliases)) {
    if (!seenSlugs.has(alias)) {
      seenSlugs.add(alias);
      redirects += `/go/${alias} ${dest} 302\n`;
    }
  }

  // Content & Blog Aliases
  redirects += `\n# Content & Blog Aliases\n`;
  redirects += `/blog/deepseek-v3* /blog/deepseek-v3-review-2026-pricing-latency-tested-roi 302\n`;

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

  // 5. Generate _worker.js for Edge redirects (bypasses Cloudflare 100-rule limit)
  const redirectsMap: Record<string, string> = {};
  for (const tool of allTools) {
    if (tool && tool.name && tool.link) {
      const slug = (tool as any).slug || getToolSlug(tool.name);
      if (slug) {
        redirectsMap[slug.toLowerCase()] = tool.link;
      }
    }
  }
  for (const [alias, dest] of Object.entries(aliases)) {
    redirectsMap[alias.toLowerCase()] = dest;
  }

  const workerCode = `// Cloudflare Pages Advanced Mode Edge Worker for Stack AI Tools
const REDIRECTS = ${JSON.stringify(redirectsMap, null, 2)};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.toLowerCase();

    // 1. Intercept /go/[slug] outbound affiliate redirects
    if (path.startsWith('/go/')) {
      const slug = path.replace(/^\\/go\\/?/, '').replace(/\\/$/, '');
      const target = REDIRECTS[slug];
      if (target) {
        return Response.redirect(target, 302);
      }
      return Response.redirect('https://www.stackaitools.com/', 302);
    }

    // 2. Intercept deepseek-v3 blog variations
    if (path.startsWith('/blog/deepseek-v3') && path !== '/blog/deepseek-v3-review-2026-pricing-latency-tested-roi') {
      return Response.redirect('https://www.stackaitools.com/blog/deepseek-v3-review-2026-pricing-latency-tested-roi', 302);
    }

    // 3. Fallback to native Cloudflare Pages static assets
    const response = await env.ASSETS.fetch(request);

    // 4. Smart redirect for unprerendered /blog/ URLs to the main research blog hub
    if (response.status === 404 && path.startsWith('/blog/')) {
      return Response.redirect('https://www.stackaitools.com/blog', 302);
    }

    // 5. Smart redirect for unprerendered /tool/ URLs to the main directory
    if (response.status === 404 && path.startsWith('/tool/')) {
      return Response.redirect('https://www.stackaitools.com/', 302);
    }

    return response;
  }
};
`;
  fs.writeFileSync(path.join(publicDir, '_worker.js'), workerCode, 'utf8');
  console.log(`✅ Generated _worker.js with ${Object.keys(redirectsMap).length} edge redirects`);
}

generateCloudflareAssets().catch((err) => {
  console.error('Failed to generate Cloudflare assets:', err);
  process.exit(1);
});
