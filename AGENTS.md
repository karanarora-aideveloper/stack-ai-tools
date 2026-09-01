<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project: Stack AI Tools (stackaitools.com)

- **Domain Selected**: `stackaitools.com` (Targeted for purchase via Porkbun / Spaceship / Cloudflare)
- **Live Vercel Production URL**: `https://stack-ai-tools.vercel.app`
- **Vercel Project**: `karanprojects1/stack-ai-tools` (`prj_T3HBpATYFw4aFmU4f2y3b5cf7Oiv`)
- **Primary Market**: United States (USA)
- **Status**: Live in Production on Vercel (Edge SSG & Prerendered)
- **Last Updated**: September 1, 2026

### Domain Connection Instructions (When domain purchase completes)
Once `stackaitools.com` is purchased, run:
```bash
vercel domains add stackaitools.com stack-ai-tools
vercel domains add www.stackaitools.com stack-ai-tools
```
Then configure DNS at your registrar:
- **A Record**: `@` points to `76.76.21.21`
- **CNAME Record**: `www` points to `cname.vercel-dns.com`

---

## 1. Project Overview & Core Mission
**Stack AI Tools** (`stackaitools.com`) is an authoritative, high-converting directory and ecosystem platform designed to help US founders, engineers, creators, and marketers discover and deploy top artificial intelligence software, autonomous coding agents, and prompt libraries.

### Core Value Pillars
1. **Curated AI Tools & Software Directory**: Hand-vetted frontier AI tools across Writing, Code, Design, Video, Audio, and Automation with clear pricing classification (Free, Freemium, Paid), verified ratings, and review counts.
2. **Interactive Prompt Library**: Visual prompt showcase featuring targeted outputs (image, code, text), aspect ratio filters, supported models (Midjourney, Claude, ChatGPT, Cursor), and one-click copy.
3. **Tool Submission & Monetization**: Public submission portal (`/submit`) allowing creators/founders to submit their tools for review and featured sponsorship.

---

## 2. Technology Stack & Architecture
- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19, Vanilla CSS & Tailwind CSS v4, Lucide React icons
- **Database / ORM**: MongoDB Atlas integrated via Prisma 5.22.0 (`prisma/schema.prisma`)
  - `Tool` model: id, name, category, icon, logoUrl, domain, description, pricingModel, priceClass, link, rating, reviewsCount, tags, badge, featured, status
  - `Prompt` model: id, title, targetAI, category, prompt, outputType, outputImageUrl, outputPreview, author, aspectRatio, tags, status
- **Utilities**: Python scraper (`scrape.py`) with CloudScraper & BeautifulSoup for directory data ingestion
- **Font**: Google Font `Outfit`

---

## 3. Directory Structure
- `src/app/page.tsx`: SSR landing page fetching approved tools and prompts from Prisma
- `src/app/layout.tsx`: Root layout with main navbar, brand logo, and footer
- `src/app/components/DirectoryView.tsx`: Client-side interactive explorer with search, category tabs, pricing filters, and prompt cards
- `src/app/components/PromptCard.tsx`: Dedicated card component for prompt copy and preview
- `src/app/components/ToolLogo.tsx`: Resilient tool logo renderer with fallbacks
- `src/app/categories/page.tsx`: Category overview grid
- `src/app/submit/page.tsx`: Tool submission form
- `src/data.ts`: Fallback seeded datasets for 40+ frontier tools and prompt library
- `prisma/schema.prisma`: MongoDB schema definitions

---

## 4. SEO & USA Ranking Roadmap for Incoming Agents
Incoming agents working on this project should focus on executing the programmatic SEO strategy:
1. **Brand Alignment**: Update visible brand names, page titles, and OpenGraph metadata to align with **Stack AI Tools** (`stackaitools.com`).
2. **Programmatic Landing Pages**:
   - `/tool/[slug]`: Dedicated tool profile pages targeting commercial keywords (e.g. `"[Tool Name] pricing"`, `"[Tool Name] review"`).
   - `/category/[category]`: Clean category listing pages for high-volume US search queries (e.g. `"best ai coding assistants"`).
   - `/alternatives/[tool-slug]`: High-intent alternative comparison pages.
   - `/prompts/[targetAI]`: Targeted prompt pages (e.g. Midjourney, Claude prompts).
3. **Structured Data (Schema.org)**:
   - Inject `SoftwareApplication` and `AggregateRating` JSON-LD for rich star ratings in US Google SERPs.
   - Add `BreadcrumbList` for Google search breadcrumb navigation.
4. **Performance & Core Web Vitals**:
   - Maintain sub-1.5s LCP on US edge networks (Vercel / Cloudflare CDN).

---

## 5. Monetization & Earning Sources

Stack AI Tools implements a 5-pillar monetization model engineered for high recurring revenue in the US market:

1. **Recurring Affiliate Commissions (Primary Engine - 65% of Projected Revenue)**:
   - High-converting outbound affiliate links on tool cards, detailed profile pages, and category leaderboards.
   - Targeting SaaS tools with monthly/annual recurring payouts (20% to 50% recurring MRR).
2. **Paid Tool Submissions & Expedited Review (20% of Revenue)**:
   - Standard Review: Free (queued for editorial vetting).
   - Fast-Track Review (24h turnaround + "Featured" badge): $49 - $99 one-time.
   - Permanent Do-Follow SEO Backlink + Verified Checkmark: $149 - $199 one-time.
3. **Sponsored Category Placements & Promoted Banners (10% of Revenue)**:
   - Top 3 Sticky placement in high-intent categories (e.g. "Coding Agents", "AI Video"): $199 - $499/month.
   - Homepage Hero Featured Spot: $350 - $750/month.
4. **Programmatic Ad Networks (5% of Revenue at Scale)**:
   - Mediavine / Raptive / Google AdSense once organic US traffic exceeds 50k pageviews/mo (US tech/SaaS RPMs range between $28 - $45).
5. **Prompt Packs & Prompt Engineering Guides**:
   - Digital downloads of curated prompt packs (Midjourney v8 prompts, Claude 5 developer prompts) priced at $19 - $39.

---

## 6. High-Yield AI Affiliate Programs & Commission Rates

Pre-researched, high-converting partner programs for tools featured in the directory:

| Tool Name | Primary Category | Commission Rate | Payout Type / Cookie | Affiliate Network / Portal |
| :--- | :--- | :--- | :--- | :--- |
| **HeyGen** | AI Video / Avatars | **20% Recurring** | Monthly recurring / 60-day cookie | Rewardful / FirstPromoter |
| **ElevenLabs** | Voice / Audio AI | **22% - 30%** | First year or recurring / 60 days | FirstPromoter / Direct |
| **Jasper AI** | Copywriting / Marketing | **30% Recurring** | Lifetime recurring / 30 days | FirstPromoter |
| **Copy.ai** | GTM / Content Agents | **45% First Year** | Recurring for 12 mos / 60 days | FirstPromoter |
| **Notion AI** | Workspace & Docs | **50% of Payments** | First year (up to $250/seat) / 90 days | PartnerStack |
| **Framer AI** | Website & Design | **50% Signup** | First payment / 60 days | Rewardful |
| **Descript** | Audio / Video Editing | **15% - 20%** | Recurring for 12 mos / 30 days | PartnerStack |
| **Make.com** | Workflow Automation | **20% Recurring** | Recurring for 24 mos / 90 days | PartnerStack / In-house |
| **Synthesia** | Enterprise AI Video | **20% Recurring** | Recurring / 60-day cookie | FirstPromoter |
| **Murf.ai** | Voice Generation | **20% Recurring** | Recurring for 24 mos / 90 days | Rewardful / ShareASale |
| **Opus Clip** | Video Repurposing | **25% - 30%** | Monthly recurring / 60 days | FirstPromoter |
| **Fireflies.ai** | Meeting AI Assistant | **20% Recurring** | Monthly recurring / 60 days | FirstPromoter |
| **Leonardo.ai** | Image & Game Assets | **20% - 25%** | Monthly recurring / 60 days | Rewardful |

---

## 7. Click-Through Rate (CTR) Dynamics & Targets

To maximize revenue from US search traffic, the platform targets three distinct conversion stages:

### A. Google US SERP CTR (Searcher -> Stack AI Tools)
- **Position 1 Target**: 30% - 34% CTR
- **Position 2-3 Target**: 12% - 18% CTR
- **SERP CTR Enhancers**:
  - `AggregateRating` Schema for star rating display in search snippets (+22% average CTR increase).
  - High-CTR title tags utilizing brackets: `[Tested Sept 2026]`, `[Top 10 Vetted]`, `[Free vs Paid]`.
  - Transparent price tags in meta descriptions (e.g. *"Starting at $0 (Free Tier Available)"*).

### B. On-Site Outbound CTR (Directory Visitor -> Outbound Affiliate Link)
- **Industry Average**: 8% - 12%
- **Stack AI Tools Target**: **18% - 25%**
- **Conversion Tactics**:
  - High-contrast, action-oriented primary button: `"Try [Tool Name] Free →"` instead of a passive link.
  - Secondary `"Visit Official Site"` link with external icon.
  - Clear `"Claim Free Trial"` or `"Save 20%"` taglines on featured cards.
  - Sticky mobile bottom-bar CTA on all programmatic `/tool/[slug]` profile pages.

### C. Downstream Affiliate Conversion (Outbound Click -> Paid Subscriber)
- **Freemium to Paid SaaS Benchmark (US)**: **3.0% - 5.5%**
- **Projected Unit Economics**:
  - 20,000 monthly US visitors
  - 20% Outbound CTR = 4,000 outbound affiliate clicks
  - 3.5% Conversion = 140 paying subscribers
  - Average recurring commission = $12/month per subscriber
  - **= $1,680 / month in compounding new MRR**

---

## 8. High-Value US Keyword Clusters & Search Intent

Incoming programmatic pages should target these high-CPC, high-intent US keyword clusters:

### Cluster 1: High-Volume Commercial Category Queries (High CPC)
- `"best ai video generators 2026"` (Vol: 18,100/mo | Avg CPC: $4.50)
- `"best ai coding assistant"` (Vol: 14,800/mo | Avg CPC: $6.20)
- `"ai voice generator realistic"` (Vol: 22,000/mo | Avg CPC: $3.80)
- `"best ai copywriting software"` (Vol: 9,900/mo | Avg CPC: $8.50)
- `"ai workflow automation tools"` (Vol: 6,600/mo | Avg CPC: $9.10)
- `"ai meeting note taker"` (Vol: 12,400/mo | Avg CPC: $5.40)

### Cluster 2: Competitor Alternatives (Immediate Buying Intent)
- `"midjourney alternatives"` (Vol: 40,500/mo | Avg CPC: $2.80)
- `"cursor ai alternatives"` (Vol: 12,100/mo | Avg CPC: $4.20)
- `"jasper ai alternatives"` (Vol: 6,400/mo | Avg CPC: $5.80)
- `"elevenlabs alternatives free"` (Vol: 8,900/mo | Avg CPC: $3.50)
- `"synthesia alternatives"` (Vol: 5,400/mo | Avg CPC: $4.10)

### Cluster 3: Pricing, Reviews & Discounts
- `"[tool] pricing plans"`, `"[tool] review 2026"`
- `"[tool] discount code"`, `"[tool] free trial no credit card"`

### Cluster 4: Prompt Engineering Queries (Fueling Prompt Library Traffic)
- `"midjourney prompts for logo design"` (Vol: 8,200/mo)
- `"claude system prompts for coding"` (Vol: 4,400/mo)
- `"chatgpt prompts for email marketing"` (Vol: 7,100/mo)

---

## 9. Affiliate Link Architecture & Disclosure Compliance

Future agents implementing tool outbound links must use this architecture:
1. **Redirect Route**: Route affiliate links through internal redirects: `/go/[tool-slug]` (e.g. `stackaitools.com/go/heygen`).
   - Enables server-side click tracking, attribution logging, and easy affiliate link updates across the entire site without touching templates.
2. **SEO Protection**: All outbound affiliate URLs must include `rel="sponsored nofollow noopener"` to strictly comply with Google US link guidelines.
3. **FTC Disclosure**: Place a standard affiliate disclosure pill in the site footer and on profile pages: *"Stack AI Tools is reader-supported. When you buy through links on our site, we may earn an affiliate commission at no extra cost to you."*


