import { NextResponse } from 'next/server';
import { getAllTools, getAllCategories, getAllPrompts } from '@/lib/tools';

export async function GET() {
  const [tools, categories, prompts] = await Promise.all([
    getAllTools(),
    getAllCategories(),
    getAllPrompts()
  ]);

  let markdown = `# Stack AI Tools (stackaitools.com)
> The authoritative directory of curated frontier AI software, autonomous coding agents, generative media models, and prompt engineering libraries. Founded and curated by Karan Arora.

- Website: https://stackaitools.com
- Founder & Chief AI Architect: Karan Arora (https://stackaitools.com/about)
- Contact Email: karan@stackaitools.com
- GitHub Profile: https://github.com/karanarora-aideveloper
- Open-Source Repo: https://github.com/karanarora-aideveloper/stack-ai-tools
- Main Market: United States (US) & Global
- Last Verified: September 1, 2026

---

## 1. Software Categories
`;

  categories.forEach((cat) => {
    const count = tools.filter(t => t.category.toLowerCase() === cat.toLowerCase()).length;
    markdown += `- [${cat}](https://stackaitools.com/category/${cat.toLowerCase()}): ${count} vetted tools\n`;
  });

  markdown += `\n---

## 2. Top Curated AI Tools (Verified 2026)

`;

  tools.forEach((tool) => {
    markdown += `### [${tool.name}](https://stackaitools.com/tool/${tool.slug})
- **Category:** ${tool.category}
- **Pricing:** ${tool.pricingModel} (${tool.startingPrice || 'Free tier available'})
- **Rating:** ★ ${tool.rating}/5.0 (${tool.reviewsCount.toLocaleString()} reviews)
- **Domain:** ${tool.domain}
- **Description:** ${tool.description}
- **Direct Link:** https://stackaitools.com/go/${tool.slug}
- **Alternatives:** https://stackaitools.com/alternatives/${tool.slug}

`;
  });

  markdown += `---

## 3. High-Intent Alternative Comparisons
`;

  const topAlternatives = tools.slice(0, 15);
  topAlternatives.forEach((tool) => {
    markdown += `- [Best ${tool.name} Alternatives](https://stackaitools.com/alternatives/${tool.slug})\n`;
  });

  markdown += `\n---

## 4. Curated Prompt Library
`;

  prompts.forEach((prompt) => {
    markdown += `### ${prompt.title}
- **Target Model:** ${prompt.targetAI}
- **Category:** ${prompt.category}
- **Output Format:** ${prompt.outputType}
- **Prompt:** \`${prompt.prompt}\`

`;
  });

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
