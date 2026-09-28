import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const moves = [
  { from: path.join(rootDir, 'src/app/api'), to: path.join(rootDir, '_cf_tmp_api') },
  { from: path.join(rootDir, 'src/app/admin'), to: path.join(rootDir, '_cf_tmp_admin') },
  { from: path.join(rootDir, 'src/app/actions'), to: path.join(rootDir, '_cf_tmp_actions') },
  { from: path.join(rootDir, 'src/app/go'), to: path.join(rootDir, '_cf_tmp_go') },
  { from: path.join(rootDir, 'src/app/llms.txt'), to: path.join(rootDir, '_cf_tmp_llms') },
  { from: path.join(rootDir, 'src/app/sitemap-index.xml'), to: path.join(rootDir, '_cf_tmp_sitemap_index') },
  { from: path.join(rootDir, 'src/app/blog/[slug]/opengraph-image.tsx'), to: path.join(rootDir, '_cf_tmp_og_blog.tsx') },
  { from: path.join(rootDir, 'src/app/tool/[slug]/opengraph-image.tsx'), to: path.join(rootDir, '_cf_tmp_og_tool.tsx') },
  { from: path.join(rootDir, 'src/app/alternatives/[slug]/opengraph-image.tsx'), to: path.join(rootDir, '_cf_tmp_og_alt.tsx') },
  { from: path.join(rootDir, 'src/app/antigravity-mcp/opengraph-image.tsx'), to: path.join(rootDir, '_cf_tmp_og_mcp.tsx') },
  { from: path.join(rootDir, 'src/app/claude-connectors/opengraph-image.tsx'), to: path.join(rootDir, '_cf_tmp_og_claude.tsx') },
];

function move(from, to) {
  if (fs.existsSync(from)) {
    fs.renameSync(from, to);
  }
}

function restoreAll() {
  for (const item of moves) {
    if (fs.existsSync(item.to)) {
      move(item.to, item.from);
    }
  }
  console.log('🔄 Restored local dynamic and server routes.');
}

async function generateAssets() {
  console.log('\n[1/3] Generating Cloudflare _redirects, _headers, sitemaps, and llms.txt...');
  execSync('npx tsx scripts/generate-cloudflare-assets.ts', {
    cwd: rootDir,
    stdio: 'inherit'
  });
}

async function build() {
  console.log('🚀 Starting Cloudflare Pages Static Build Pipeline for Stack AI Tools...');

  await generateAssets();

  console.log('\n[2/3] Stashing dynamic server routes for static export...');
  for (const item of moves) {
    move(item.from, item.to);
  }

  console.log('\n[3/3] Running Next.js Static Export build...');
  try {
    execSync('npx next build', {
      cwd: rootDir,
      stdio: 'inherit',
      env: {
        ...process.env,
        NEXT_EXPORT: 'true',
      },
    });

    // Copy public/_redirects, _headers, sitemap.xml, llms.txt to out/
    const outDir = path.join(rootDir, 'out');
    if (fs.existsSync(outDir)) {
      const publicDir = path.join(rootDir, 'public');
      const filesToCopy = ['_redirects', '_headers', 'sitemap.xml', 'sitemap-index.xml', 'llms.txt'];
      for (const file of filesToCopy) {
        const src = path.join(publicDir, file);
        const dest = path.join(outDir, file);
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest);
          console.log(`Copied ${file} to out/`);
        }
      }
    }

    console.log('\n✨ Cloudflare Pages static export completed successfully in out/ directory!');
  } finally {
    restoreAll();
  }
}

process.on('SIGINT', () => {
  restoreAll();
  process.exit(1);
});
process.on('SIGTERM', () => {
  restoreAll();
  process.exit(1);
});

build().catch((err) => {
  console.error('\n❌ Build failed:', err);
  restoreAll();
  process.exit(1);
});
