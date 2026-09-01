// Script to pull keyword metrics from Ahrefs API v3
const fs = require('fs');
const https = require('https');

const apiKey = process.env.AHREFS_API_KEY || process.argv[2];

if (!apiKey) {
  console.error('Error: Please provide your Ahrefs API Key via AHREFS_API_KEY environment variable or as a CLI argument:');
  console.error('Usage: node scripts/fetch_ahrefs.js <YOUR_AHREFS_API_KEY>');
  process.exit(1);
}

const url = 'https://api.ahrefs.com/v3/keywords-explorer/overview?country=us&keywords=ai%20image%20generator%20from%20text%2Cai%20meeting%20note%20taker%2Cai%20tools%20for%20content%20creators%2Cai%20voice%20generator%20realistic%2Cai%20workflow%20automation%20tools%2Cautonomous%20ai%20agents%202026%2Cbest%20ai%20agents%202026%2Cbest%20ai%20coding%20assistant%2Cbest%20ai%20copywriting%20tools%2Cbest%20ai%20tools%2Cbest%20ai%20tools%202026%2Cbest%20ai%20video%20generator%2Cchatgpt%20alternatives%20for%20coding%2Cchatgpt%20prompts%20for%20marketing%2Cclaude%203.7%20sonnet%20pricing%2Cclaude%20prompts%20for%20coding%2Ccursor%20ai%20alternatives%2Ccursor%20ai%20system%20prompt%2Ccursor%20pro%20pricing%2Ccursor%20vs%20copilot%2Cdescript%20alternatives%20free%2Celevenlabs%20alternatives%20free%2Celevenlabs%20pricing%20review%2Cfireflies%20ai%20alternatives%2Cflux%201%20text%20to%20image%20prompts%2Cflux%201%20vs%20midjourney%2Cfree%20ai%20tools%20for%20students%2Cfree%20midjourney%20alternatives%2Cheygen%20pricing%20plans%2Cheygen%20vs%20synthesia%2Chow%20ai%20is%20changing%20software%20development%2Chow%20to%20clone%20voice%20with%20ai%2Cjasper%20ai%20alternatives%2Cmake%20com%20alternatives%2Cmake%20com%20pricing%20review%2Cmidjourney%20alternatives%2Cmidjourney%20prompts%20for%20logo%20design%2Cmidjourney%20realistic%20portraits%20prompts%2Copus%20clip%20discount%20code%2Crunway%20gen-3%20pricing%2Csuno%20ai%20alternatives%2Csynthesia%20alternatives&limit=50&order_by=volume%3Adesc&select=serp_last_update%2Ccpc%2Cvolume_mobile_pct%2Cfirst_seen%2Cvolume_desktop_pct%2Cvolume_monthly%2Cparent_topic%2Cglobal_volume%2Ckeyword%2Csearches_pct_clicks_organic_and_paid%2Cclicks%2Cparent_volume%2Ccps%2Cvolume%2Cserp_features%2Ctraffic_potential%2Cdifficulty%2Csearches_pct_clicks_organic_only%2Csearches_pct_clicks_paid_only%2Cintents%2Cvolume_monthly_history&volume_monthly_date_from=2026-06-03&volume_monthly_date_to=2026-09-01';

const options = {
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Accept': 'application/json'
  }
};

console.log('Sending request to Ahrefs API v3...');

https.get(url, options, (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    if (res.statusCode !== 200) {
      console.error(`Error: Received HTTP ${res.statusCode}:`, data);
      process.exit(1);
    }
    try {
      const parsed = JSON.parse(data);
      fs.writeFileSync('data/ahrefs_keywords.json', JSON.stringify(parsed, null, 2));
      console.log(`Success! Saved keyword data for ${(parsed.keywords || []).length} keywords to data/ahrefs_keywords.json`);
    } catch (e) {
      console.error('Failed to parse JSON response:', e);
    }
  });
}).on('error', (err) => {
  console.error('Network error:', err.message);
});
