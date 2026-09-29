import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const ARTIFACTS_DIR = '/Users/karanarora/.gemini/antigravity/brain/b6907ec1-e099-4e48-a114-6fc4c21b5099';
const BASE_URL = process.env.TEST_URL || 'https://stackaitools.pages.dev';

async function runBrowserAudit() {
  console.log(`\n======================================================`);
  console.log(`🚀 STARTING END-TO-END BROWSER AUDIT FOR STACK AI TOOLS`);
  console.log(`🌐 Target Base URL: ${BASE_URL}`);
  console.log(`======================================================\n`);

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 AntigravityE2E'
  });

  const page = await context.newPage();

  const auditLog = {
    pagesVisited: 0,
    toolsClicked: 0,
    successes: [],
    failures: [],
    consoleErrors: []
  };

  page.on('console', msg => {
    if (msg.type() === 'error') {
      auditLog.consoleErrors.push(msg.text());
    }
  });

  page.on('response', response => {
    const status = response.status();
    const url = response.url();
    if (status >= 400 && !url.includes('favicon') && !url.includes('google-analytics') && !url.includes('/api/analytics')) {
      auditLog.failures.push({ url, status, type: 'HTTP Error' });
    }
  });

  try {
    // -------------------------------------------------------------
    // TEST 1: Homepage & Tools Explorer
    // -------------------------------------------------------------
    console.log(`[TEST 1] Visiting Homepage: ${BASE_URL}...`);
    const homeRes = await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    auditLog.pagesVisited++;

    if (!homeRes || homeRes.status() !== 200) {
      throw new Error(`Homepage failed to load: status ${homeRes ? homeRes.status() : 'null'}`);
    }

    const homeTitle = await page.title();
    console.log(`✅ Homepage 200 OK | Title: "${homeTitle}"`);

    // Take screenshot of homepage
    const homeScreenshot = path.join(ARTIFACTS_DIR, 'e2e_homepage_tools.png');
    await page.screenshot({ path: homeScreenshot, fullPage: false });
    console.log(`📸 Saved screenshot: ${homeScreenshot}`);

    // -------------------------------------------------------------
    // TEST 2: Click 6 Diverse Tool Cards on Homepage
    // -------------------------------------------------------------
    console.log(`\n[TEST 2] Testing Tool Card Clicks from Homepage...`);
    
    // Find all tool card title links
    const toolLinks = await page.$$eval('a[href^="/tool/"]', links => 
      links.map(l => ({
        href: l.getAttribute('href'),
        text: l.innerText.trim().split('\n')[0]
      })).filter(l => l.text.length > 0)
    );

    console.log(`Found ${toolLinks.length} tool profile links on homepage.`);

    // Sample distinct tools to click
    const sampleTools = toolLinks.slice(0, 6);

    for (const item of sampleTools) {
      const targetUrl = new URL(item.href, BASE_URL).toString();
      console.log(`\n➡️ Testing Navigation to: ${targetUrl} (Expected: "${item.text}")`);
      
      const res = await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 20000 });
      auditLog.pagesVisited++;
      auditLog.toolsClicked++;

      const status = res.status();
      const pageTitle = await page.title();
      const bodyText = await page.innerText('body');

      const is404 = status === 404 || bodyText.includes('Tool Not Found') || pageTitle.includes('Tool Not Found');
      const hasDomainBug = bodyText.includes('scispace.com') && !item.text.toLowerCase().includes('scispace');

      if (is404) {
        console.error(`❌ 404 ERROR on ${targetUrl}!`);
        auditLog.failures.push({ url: targetUrl, status, reason: '404 Tool Not Found' });
      } else if (hasDomainBug) {
        console.error(`⚠️ SCISPACE LEAK detected on ${targetUrl}!`);
        auditLog.failures.push({ url: targetUrl, status, reason: 'scispace.com domain leak' });
      } else {
        console.log(`✅ 200 OK | Title: "${pageTitle}"`);
        console.log(`   Specs verified: No 404, No scispace leak, content loaded cleanly.`);
        auditLog.successes.push({ url: targetUrl, name: item.text, status });
      }
    }

    // -------------------------------------------------------------
    // TEST 3: MCP Tools Tab & Runtime Config Box
    // -------------------------------------------------------------
    console.log(`\n[TEST 3] Testing Antigravity MCP Tools Tab...`);
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Click the MCP tab
    const mcpTabButton = page.locator('button:has-text("Antigravity MCP")');
    if (await mcpTabButton.count() > 0) {
      await mcpTabButton.click();
      await page.waitForTimeout(1000);
      console.log(`✅ Clicked "Antigravity MCP" tab on homepage.`);

      const mcpScreenshot = path.join(ARTIFACTS_DIR, 'e2e_homepage_mcp.png');
      await page.screenshot({ path: mcpScreenshot, fullPage: false });
      console.log(`📸 Saved MCP tab screenshot: ${mcpScreenshot}`);

      // Test specific MCP tool pages
      const mcpSlugs = ['google-flow', 'stitch', 'cognee', 'postgres', 'linear'];

      for (const mcpSlug of mcpSlugs) {
        const mcpUrl = `${BASE_URL}/tool/${mcpSlug}`;
        console.log(`\n➡️ Testing MCP Tool Profile: ${mcpUrl}`);

        const res = await page.goto(mcpUrl, { waitUntil: 'networkidle', timeout: 20000 });
        auditLog.pagesVisited++;
        auditLog.toolsClicked++;

        const status = res.status();
        const pageTitle = await page.title();
        const bodyText = await page.innerText('body');

        const hasMcpBox = bodyText.includes('Model Context Protocol (MCP)') || bodyText.includes('MCP Server Runtime');
        const is404 = status === 404 || bodyText.includes('Tool Not Found');

        if (is404) {
          console.error(`❌ 404 ERROR on MCP tool ${mcpUrl}!`);
          auditLog.failures.push({ url: mcpUrl, status, reason: '404 MCP Tool Not Found' });
        } else if (!hasMcpBox) {
          console.error(`⚠️ Missing McpConfigBox on ${mcpUrl}!`);
          auditLog.failures.push({ url: mcpUrl, status, reason: 'Missing McpConfigBox' });
        } else {
          console.log(`✅ 200 OK | Title: "${pageTitle}" | McpConfigBox Active: YES`);
          
          if (mcpSlug === 'google-flow') {
            const mcpDetailScreenshot = path.join(ARTIFACTS_DIR, 'e2e_tool_detail_google_flow_mcp.png');
            await page.screenshot({ path: mcpDetailScreenshot, fullPage: false });
            console.log(`📸 Saved Google Flow MCP screenshot: ${mcpDetailScreenshot}`);
          }

          auditLog.successes.push({ url: mcpUrl, name: mcpSlug, status, mcp: true });
        }
      }
    }

    // -------------------------------------------------------------
    // TEST 4: Historical & GSC Legacy Aliases
    // -------------------------------------------------------------
    console.log(`\n[TEST 4] Testing Historical GSC Aliases & Canonical Routing...`);
    const aliasesToTest = [
      { alias: 'windsurf-codeium', canonicalTarget: 'Windsurf' },
      { alias: 'chatgpt-gpt-56-frontier', canonicalTarget: 'ChatGPT' },
      { alias: 'google-gemini-38-flash', canonicalTarget: 'Gemini' },
      { alias: 'agent-zero', canonicalTarget: 'Agent Zero' },
      { alias: '11xai', canonicalTarget: '11x.ai' }
    ];

    for (const item of aliasesToTest) {
      const aliasUrl = `${BASE_URL}/tool/${item.alias}`;
      console.log(`➡️ Testing Alias URL: ${aliasUrl}`);

      const res = await page.goto(aliasUrl, { waitUntil: 'networkidle', timeout: 20000 });
      auditLog.pagesVisited++;

      const status = res.status();
      const pageTitle = await page.title();
      const bodyText = await page.innerText('body');
      const is404 = status === 404 || bodyText.includes('Tool Not Found');

      if (is404) {
        console.error(`❌ 404 on Alias ${aliasUrl}!`);
        auditLog.failures.push({ url: aliasUrl, status, reason: 'Alias 404' });
      } else {
        console.log(`✅ 200 OK | Alias "${item.alias}" resolved to: "${pageTitle}"`);
        auditLog.successes.push({ url: aliasUrl, name: item.alias, status });
      }
    }

    // -------------------------------------------------------------
    // TEST 5: Categories Hub & Individual Category Page
    // -------------------------------------------------------------
    console.log(`\n[TEST 5] Testing Categories Hub (/categories)...`);
    const catRes = await page.goto(`${BASE_URL}/categories`, { waitUntil: 'networkidle' });
    auditLog.pagesVisited++;

    if (catRes.status() === 200) {
      console.log(`✅ /categories loaded 200 OK.`);
      // Click into Code category
      const codeCatUrl = `${BASE_URL}/category/code`;
      const codeRes = await page.goto(codeCatUrl, { waitUntil: 'networkidle' });
      auditLog.pagesVisited++;
      console.log(`✅ /category/code loaded ${codeRes.status()} OK | Title: "${await page.title()}"`);

      // Click first tool inside /category/code
      const catToolLink = await page.$('a[href^="/tool/"]');
      if (catToolLink) {
        const catToolHref = await catToolLink.getAttribute('href');
        const catToolUrl = new URL(catToolHref, BASE_URL).toString();
        const toolRes = await page.goto(catToolUrl, { waitUntil: 'networkidle' });
        auditLog.pagesVisited++;
        auditLog.toolsClicked++;
        console.log(`✅ Tool click from category page -> ${catToolUrl} loaded ${toolRes.status()} OK.`);
      }
    }

    // -------------------------------------------------------------
    // TEST 6: Alternatives Hub & Side-by-Side Comparison
    // -------------------------------------------------------------
    console.log(`\n[TEST 6] Testing Alternatives Comparison Hub (/alternatives)...`);
    const altRes = await page.goto(`${BASE_URL}/alternatives`, { waitUntil: 'networkidle' });
    auditLog.pagesVisited++;

    if (altRes.status() === 200) {
      console.log(`✅ /alternatives loaded 200 OK.`);
      const cursorAltUrl = `${BASE_URL}/alternatives/cursor`;
      const cursorAltRes = await page.goto(cursorAltUrl, { waitUntil: 'networkidle' });
      auditLog.pagesVisited++;

      const altTitle = await page.title();
      console.log(`✅ /alternatives/cursor loaded ${cursorAltRes.status()} OK | Title: "${altTitle}"`);

      const altScreenshot = path.join(ARTIFACTS_DIR, 'e2e_alternatives_cursor.png');
      await page.screenshot({ path: altScreenshot, fullPage: false });
      console.log(`📸 Saved Alternatives screenshot: ${altScreenshot}`);
    }

  } catch (error) {
    console.error(`💥 Unhandled Exception during browser audit:`, error);
    auditLog.failures.push({ error: error.message });
  } finally {
    await browser.close();
  }

  // -------------------------------------------------------------
  // FINAL EXECUTIVE SUMMARY
  // -------------------------------------------------------------
  console.log(`\n======================================================`);
  console.log(`📊 END-TO-END BROWSER AUDIT EXECUTIVE SUMMARY`);
  console.log(`======================================================`);
  console.log(`Total Pages Visited:       ${auditLog.pagesVisited}`);
  console.log(`Total Tool Clicks Tested:  ${auditLog.toolsClicked}`);
  console.log(`Successful Tool Pages:     ${auditLog.successes.length}`);
  console.log(`Total 404 Errors:          ${auditLog.failures.filter(f => f.reason && f.reason.includes('404')).length}`);
  console.log(`Total Domain Leaks:        ${auditLog.failures.filter(f => f.reason && f.reason.includes('leak')).length}`);
  console.log(`Total Navigation Failures: ${auditLog.failures.length}`);

  if (auditLog.failures.length > 0) {
    console.error(`\nFailures Detail:`, JSON.stringify(auditLog.failures, null, 2));
    process.exit(1);
  } else {
    console.log(`\n🎉 ALL END-TO-END BROWSER TESTS PASSED FLAWLESSLY WITH ZERO 404s!`);
    process.exit(0);
  }
}

runBrowserAudit();
