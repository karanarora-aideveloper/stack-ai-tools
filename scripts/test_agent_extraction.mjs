async function testExtraction() {
  const testSlugs = ['autogpt', 'voiceflow', 'phidata', 'vanna-ai', 'sweep-ai'];
  
  for (const slug of testSlugs) {
    try {
      const res = await fetch(`https://aiagentsdirectory.com/agent/${slug}`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' }
      });
      const html = await res.text();
      
      // Match each <script type="application/ld+json">...</script>
      const regex = /<script\s+type=["']application\/ld\+json["']\s*>([\s\S]*?)<\/script>/gi;
      let match;
      let appData = null;
      
      while ((match = regex.exec(html)) !== null) {
        try {
          const raw = match[1].replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
          const parsed = JSON.parse(raw);
          if (parsed['@type'] === 'SoftwareApplication') {
            appData = parsed;
            break;
          }
        } catch {}
      }
      
      if (appData) {
        console.log(`✅ Success for ${slug}:`, {
          name: appData.name,
          category: appData.applicationCategory,
          officialUrl: appData.sameAs?.[0],
          logoUrl: appData.image,
          description: appData.description,
          price: appData.offers?.price,
          rating: appData.aggregateRating?.ratingValue
        });
      } else {
        console.log(`⚠️ No SoftwareApplication found for ${slug}`);
      }
    } catch (e) {
      console.error(`❌ Error on ${slug}:`, e.message);
    }
  }
}

testExtraction();
