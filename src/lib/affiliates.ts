export interface AffiliateProgramInfo {
  toolSlug: string;
  toolName: string;
  hasAffiliateProgram: boolean;
  commissionRate: string;
  commissionType: 'recurring' | 'one_time' | 'hybrid' | 'free_credits';
  cookieDays: number;
  network: 'Rewardful' | 'FirstPromoter' | 'PartnerStack' | 'Impact' | 'ShareASale' | 'CJ' | 'Direct' | 'None';
  signupUrl: string;
  loginUrl?: string;
  status: 'active' | 'pending' | 'not_applied' | 'direct';
  customAffiliateUrl?: string;
  notes?: string;
}

export const MASTER_AFFILIATE_REGISTRY: Record<string, AffiliateProgramInfo> = {
  'heygen': {
    toolSlug: 'heygen',
    toolName: 'HeyGen Interactive Video',
    hasAffiliateProgram: true,
    commissionRate: '20% Recurring',
    commissionType: 'recurring',
    cookieDays: 60,
    network: 'Rewardful',
    signupUrl: 'https://www.heygen.com/affiliate',
    loginUrl: 'https://heygen.rewardful.com',
    status: 'not_applied',
    notes: 'High conversion for video translation & AI avatars. Monthly payouts.'
  },
  'elevenlabs': {
    toolSlug: 'elevenlabs',
    toolName: 'ElevenLabs Gen-3 Voice Studio',
    hasAffiliateProgram: true,
    commissionRate: '22% - 30% Recurring',
    commissionType: 'recurring',
    cookieDays: 60,
    network: 'FirstPromoter',
    signupUrl: 'https://elevenlabs.io/affiliates',
    loginUrl: 'https://elevenlabs.firstpromoter.com',
    status: 'not_applied',
    notes: 'Industry benchmark for voice synthesis. Strong recurring payouts.'
  },
  'jasper-ai': {
    toolSlug: 'jasper-ai',
    toolName: 'Jasper AI Brand Voice',
    hasAffiliateProgram: true,
    commissionRate: '30% Lifetime Recurring',
    commissionType: 'recurring',
    cookieDays: 30,
    network: 'FirstPromoter',
    signupUrl: 'https://www.jasper.ai/partners',
    loginUrl: 'https://jasper.firstpromoter.com',
    status: 'not_applied',
    notes: 'Established enterprise affiliate program. High average order value.'
  },
  'copy-ai': {
    toolSlug: 'copy-ai',
    toolName: 'Copy.ai GTM Agents',
    hasAffiliateProgram: true,
    commissionRate: '45% First Year',
    commissionType: 'recurring',
    cookieDays: 60,
    network: 'FirstPromoter',
    signupUrl: 'https://www.copy.ai/affiliate-program',
    status: 'not_applied',
    notes: 'Very high initial payout rate for annual plans.'
  },
  'notion-ai': {
    toolSlug: 'notion-ai',
    toolName: 'Notion AI Workspace',
    hasAffiliateProgram: true,
    commissionRate: '50% of Payments (up to $250/seat)',
    commissionType: 'recurring',
    cookieDays: 90,
    network: 'PartnerStack',
    signupUrl: 'https://www.notion.so/affiliates',
    loginUrl: 'https://dash.partnerstack.com',
    status: 'not_applied',
    notes: 'Top SaaS brand in productivity. 90-day attribution window.'
  },
  'framer-ai': {
    toolSlug: 'framer-ai',
    toolName: 'Framer AI 2.0',
    hasAffiliateProgram: true,
    commissionRate: '50% First Year Subscriptions',
    commissionType: 'recurring',
    cookieDays: 60,
    network: 'Rewardful',
    signupUrl: 'https://www.framer.com/affiliates',
    status: 'not_applied',
    notes: 'Very high conversion for designers, indie hackers, and startups.'
  },
  'descript': {
    toolSlug: 'descript',
    toolName: 'Descript Studio Sound',
    hasAffiliateProgram: true,
    commissionRate: '15% - 20% Recurring for 12 mos',
    commissionType: 'recurring',
    cookieDays: 30,
    network: 'PartnerStack',
    signupUrl: 'https://www.descript.com/affiliate',
    status: 'not_applied',
    notes: 'Podcasters, video creators, and YouTube editors.'
  },
  'make': {
    toolSlug: 'make',
    toolName: 'Make.com Enterprise AI',
    hasAffiliateProgram: true,
    commissionRate: '20% Recurring for 24 mos',
    commissionType: 'recurring',
    cookieDays: 90,
    network: 'PartnerStack',
    signupUrl: 'https://www.make.com/en/affiliates',
    status: 'not_applied',
    notes: 'High lifetime value as users scale automated workflows.'
  },
  'synthesia': {
    toolSlug: 'synthesia',
    toolName: 'Synthesia 2.5 Avatars',
    hasAffiliateProgram: true,
    commissionRate: '20% Recurring (Enterprise plans)',
    commissionType: 'recurring',
    cookieDays: 60,
    network: 'FirstPromoter',
    signupUrl: 'https://www.synthesia.io/affiliates',
    status: 'not_applied',
    notes: 'Highest ticket price in video avatars. Enterprise payouts.'
  },
  'murf-ai': {
    toolSlug: 'murf-ai',
    toolName: 'Murf Speech Gen-2',
    hasAffiliateProgram: true,
    commissionRate: '20% Recurring for 24 mos',
    commissionType: 'recurring',
    cookieDays: 90,
    network: 'Rewardful',
    signupUrl: 'https://murf.ai/affiliate',
    status: 'not_applied',
    notes: 'Audio & voiceover market. Reliable monthly commissions.'
  },
  'opus-clip': {
    toolSlug: 'opus-clip',
    toolName: 'Opus Clip 3.0',
    hasAffiliateProgram: true,
    commissionRate: '25% - 30% Monthly Recurring',
    commissionType: 'recurring',
    cookieDays: 60,
    network: 'FirstPromoter',
    signupUrl: 'https://www.opus.pro/affiliates',
    status: 'not_applied',
    notes: 'Viral TikTok & YouTube Shorts repurposing tool.'
  },
  'fireflies': {
    toolSlug: 'fireflies',
    toolName: 'Fireflies.ai 2.0',
    hasAffiliateProgram: true,
    commissionRate: '20% Recurring',
    commissionType: 'recurring',
    cookieDays: 60,
    network: 'FirstPromoter',
    signupUrl: 'https://fireflies.ai/affiliate',
    status: 'not_applied',
    notes: 'Meeting note-taker with strong team adoption rates.'
  },
  'leonardo-ai': {
    toolSlug: 'leonardo-ai',
    toolName: 'Leonardo.ai Phoenix',
    hasAffiliateProgram: true,
    commissionRate: '20% - 25% Recurring',
    commissionType: 'recurring',
    cookieDays: 60,
    network: 'Rewardful',
    signupUrl: 'https://leonardo.ai/affiliate',
    status: 'not_applied',
    notes: 'Popular alternative to Midjourney with web canvas editor.'
  },
  'devin': {
    toolSlug: 'devin',
    toolName: 'Devin AI (Cognition Labs)',
    hasAffiliateProgram: false,
    commissionRate: 'Enterprise Partner Program',
    commissionType: 'hybrid',
    cookieDays: 30,
    network: 'Direct',
    signupUrl: 'https://cognition.ai',
    status: 'direct',
    notes: 'Frontier SWE agent. Direct referral contact with sales.'
  },
  'claude-code': {
    toolSlug: 'claude-code',
    toolName: 'Claude Code (Anthropic CLI)',
    hasAffiliateProgram: false,
    commissionRate: 'Anthropic Partner Network',
    commissionType: 'hybrid',
    cookieDays: 30,
    network: 'Direct',
    signupUrl: 'https://anthropic.com',
    status: 'direct',
    notes: 'Developer CLI tool powered by Claude 3.7 Sonnet.'
  },
  'cursor': {
    toolSlug: 'cursor',
    toolName: 'Cursor 3.0 (Composer Agents)',
    hasAffiliateProgram: true,
    commissionRate: 'Referral Credits & Pro Perks',
    commissionType: 'free_credits',
    cookieDays: 30,
    network: 'Direct',
    signupUrl: 'https://cursor.com',
    status: 'direct',
    notes: 'Most popular AI code editor in 2026. Free pro months on referral.'
  },
  'cartesia': {
    toolSlug: 'cartesia',
    toolName: 'Cartesia Sonic',
    hasAffiliateProgram: true,
    commissionRate: 'API Volume Revenue Share',
    commissionType: 'recurring',
    cookieDays: 45,
    network: 'Direct',
    signupUrl: 'https://cartesia.ai',
    status: 'not_applied',
    notes: 'Sub-100ms voice API. Great for telecom & voice bot integrations.'
  },
  'deepseek-r1': {
    toolSlug: 'deepseek-r1',
    toolName: 'DeepSeek-R1 (Open Reasoning)',
    hasAffiliateProgram: false,
    commissionRate: 'Open Source / Free',
    commissionType: 'free_credits',
    cookieDays: 0,
    network: 'None',
    signupUrl: 'https://deepseek.com',
    status: 'direct',
    notes: 'Open weights model. Hosted on Ollama, vLLM, and cloud GPU providers.'
  },
  'bolt-new': {
    toolSlug: 'bolt-new',
    toolName: 'Bolt.new',
    hasAffiliateProgram: true,
    commissionRate: '20% Subscription Share',
    commissionType: 'recurring',
    cookieDays: 30,
    network: 'Direct',
    signupUrl: 'https://bolt.new',
    status: 'not_applied',
    notes: 'WebContainer in-browser app builder.'
  },
  'lovable': {
    toolSlug: 'lovable',
    toolName: 'Lovable.dev',
    hasAffiliateProgram: true,
    commissionRate: '25% Recurring',
    commissionType: 'recurring',
    cookieDays: 60,
    network: 'Rewardful',
    signupUrl: 'https://lovable.dev',
    status: 'not_applied',
    notes: 'Rapid full-stack React & Supabase web app generation.'
  },
  'v0': {
    toolSlug: 'v0',
    toolName: 'v0 by Vercel',
    hasAffiliateProgram: true,
    commissionRate: 'Vercel Partner Program',
    commissionType: 'hybrid',
    cookieDays: 30,
    network: 'Direct',
    signupUrl: 'https://v0.dev',
    status: 'direct',
    notes: 'Vercel generative UI frontend code generator.'
  },
  'n8n': {
    toolSlug: 'n8n',
    toolName: 'n8n AI Agents 2.0',
    hasAffiliateProgram: true,
    commissionRate: '20% Cloud Recurring',
    commissionType: 'recurring',
    cookieDays: 60,
    network: 'PartnerStack',
    signupUrl: 'https://n8n.io/affiliates',
    status: 'not_applied',
    notes: 'Workflow automation with autonomous agent nodes.'
  },
  'suno': {
    toolSlug: 'suno',
    toolName: 'Suno v4.5',
    hasAffiliateProgram: true,
    commissionRate: 'Creator Referral Credits',
    commissionType: 'free_credits',
    cookieDays: 30,
    network: 'Direct',
    signupUrl: 'https://suno.com',
    status: 'direct',
    notes: 'Generative radio music.'
  },
  'runway': {
    toolSlug: 'runway',
    toolName: 'Runway Gen-4.5',
    hasAffiliateProgram: true,
    commissionRate: 'Creator Partner Payouts',
    commissionType: 'hybrid',
    cookieDays: 30,
    network: 'Direct',
    signupUrl: 'https://runwayml.com/partners',
    status: 'not_applied',
    notes: 'Cinematic video generation.'
  },
  'comfyui': {
    toolSlug: 'comfyui',
    toolName: 'ComfyUI Modular Diffusion',
    hasAffiliateProgram: false,
    commissionRate: 'Open Source',
    commissionType: 'free_credits',
    cookieDays: 0,
    network: 'None',
    signupUrl: 'https://github.com/comfyanonymous/ComfyUI',
    status: 'direct',
    notes: 'Open-source node graph visual interface.'
  },
  'tripo3d': {
    toolSlug: 'tripo3d',
    toolName: 'Tripo3D Fast Mesh Engine',
    hasAffiliateProgram: true,
    commissionRate: '20% Recurring',
    commissionType: 'recurring',
    cookieDays: 45,
    network: 'Rewardful',
    signupUrl: 'https://www.tripo3d.ai',
    status: 'not_applied',
    notes: 'Fast 3D game mesh generation.'
  },
  'meshy': {
    toolSlug: 'meshy',
    toolName: 'Meshy.ai 3D Game Assets',
    hasAffiliateProgram: true,
    commissionRate: '20% Recurring',
    commissionType: 'recurring',
    cookieDays: 60,
    network: 'FirstPromoter',
    signupUrl: 'https://www.meshy.ai/affiliate',
    status: 'not_applied',
    notes: 'Text-to-3D with PBR textures and UV unwrap.'
  },
  'tavily': {
    toolSlug: 'tavily',
    toolName: 'Tavily AI Search Engine',
    hasAffiliateProgram: true,
    commissionRate: '15% API Billing',
    commissionType: 'recurring',
    cookieDays: 30,
    network: 'Direct',
    signupUrl: 'https://tavily.com',
    status: 'not_applied',
    notes: 'Real-time search API optimized for LLMs and autonomous agents.'
  },
  'unstructured': {
    toolSlug: 'unstructured',
    toolName: 'Unstructured.io RAG ETL',
    hasAffiliateProgram: true,
    commissionRate: 'Enterprise Partner Referral',
    commissionType: 'hybrid',
    cookieDays: 60,
    network: 'PartnerStack',
    signupUrl: 'https://unstructured.io',
    status: 'not_applied',
    notes: 'Extract structured tables and images from PDFs for RAG.'
  },
  'ollama': {
    toolSlug: 'ollama',
    toolName: 'Ollama',
    hasAffiliateProgram: false,
    commissionRate: 'Open Source',
    commissionType: 'free_credits',
    cookieDays: 0,
    network: 'None',
    signupUrl: 'https://ollama.com',
    status: 'direct',
    notes: 'Local LLM runner on Mac, Linux, and Windows.'
  }
};

export function getAffiliateInfo(slug: string, fallbackName?: string): AffiliateProgramInfo {
  if (MASTER_AFFILIATE_REGISTRY[slug]) {
    return MASTER_AFFILIATE_REGISTRY[slug];
  }

  // Sensible default for any tool not explicitly listed
  return {
    toolSlug: slug,
    toolName: fallbackName || slug,
    hasAffiliateProgram: true,
    commissionRate: '15% - 25% Recurring',
    commissionType: 'recurring',
    cookieDays: 30,
    network: 'Direct',
    signupUrl: `https://www.google.com/search?q=${encodeURIComponent((fallbackName || slug) + ' affiliate program sign up')}`,
    status: 'not_applied',
    notes: 'Check tool website footer for "Partners" or "Affiliate Program" link.'
  };
}
