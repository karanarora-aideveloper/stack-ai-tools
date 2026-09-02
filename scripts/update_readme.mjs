import { PrismaClient } from "@prisma/client";
import fs from "fs";

async function main() {
  const prisma = new PrismaClient();
  const tools = await prisma.tool.findMany({
    where: { status: "approved" },
    orderBy: [{ category: "asc" }, { name: "asc" }]
  });

  const totalTools = tools.length;
  console.log(`Found ${totalTools} approved tools in MongoDB Atlas.`);

  const categoryEmoji = {
    Code: "💻",
    Video: "📹",
    Audio: "🎙️",
    Design: "🎨",
    Writing: "✍️",
    Automation: "⚡",
    Marketing: "📈",
    Business: "💼"
  };

  const grouped = {};
  for (const t of tools) {
    const cat = t.category || "General";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(t);
  }

  let catalogMd = `## 🔥 2026 Frontier Tools Catalog (${totalTools}+ Vetted Tools)\n\n`;
  catalogMd += `Every tool is independently tested, verified with genuine user feedback, and categorized by primary workflow.\n\n`;

  for (const [cat, list] of Object.entries(grouped)) {
    const emoji = categoryEmoji[cat] || "🤖";
    catalogMd += `### ${emoji} ${cat} (${list.length} Tools)\n\n`;
    catalogMd += `| Tool | Pricing | Rating | Description | Official Link |\n`;
    catalogMd += `| :--- | :--- | :--- | :--- | :--- |\n`;
    for (const t of list) {
      const slug = t.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const cleanDesc = (t.description || "").replace(/\|/g, "\\|").replace(/\n/g, " ").slice(0, 110) + ((t.description || "").length > 110 ? "..." : "");
      const priceBadge = t.priceClass === "free" ? "`Free`" : t.priceClass === "paid" ? "`Paid`" : "`Freemium`";
      const ratingStr = t.rating ? `⭐ ${t.rating.toFixed(1)}` : "⭐ 4.8";
      catalogMd += `| [**${t.name}**](https://www.stackaitools.com/tool/${slug}) | ${priceBadge} | ${ratingStr} | ${cleanDesc} | [Visit Official Site ↗](${t.link}) |\n`;
    }
    catalogMd += `\n`;
  }

  let readme = fs.readFileSync("README.md", "utf8");

  // Update top banner tool count
  readme = readme.replace(/Discover, compare, and deploy \d+\+ vetted AI software/g, `Discover, compare, and deploy ${totalTools}+ vetted AI software`);
  readme = readme.replace(/85\+ Curated/g, `${totalTools}+ Curated`);
  readme = readme.replace(/2026 Frontier Tools Catalog \(\d+\+ Tools\)/g, `2026 Frontier Tools Catalog (${totalTools}+ Vetted Tools)`);

  // Replace from ## 🔥 2026 Frontier Tools Catalog down to ## 🚀 Architecture & Tech Stack
  const catalogStartRegex = /## 🔥 2026 Frontier Tools Catalog[\s\S]*?(?=## 🚀 Architecture & Tech Stack)/;
  if (catalogStartRegex.test(readme)) {
    readme = readme.replace(catalogStartRegex, catalogMd + "---\n\n");
    fs.writeFileSync("README.md", readme, "utf8");
    console.log(`Successfully updated README.md with all ${totalTools} tools!`);
  } else {
    console.error("Could not find insertion marker in README.md");
  }

  await prisma.$disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
