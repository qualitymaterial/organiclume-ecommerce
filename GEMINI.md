# Organic Lume — Project Context

## What This Is
Organic Lume is a premium silk hair care brand (organiclume.com) selling 22 momme 6A Mulberry Silk heatless curler sets and accessories. Pre-launch phase — product sourced, site live, AI team operational.

**Owner:** Brian Anderson (`hello@organiclume.com`)
**Full documentation:** `docs/organiclume_source_of_truth.md` — READ THIS FIRST for complete business context.

---

## Tech Stack

### Website (organiclume.com)
- **Stack:** Vite + React + TypeScript + Framer Motion
- **Hosting:** Vercel (deploy via `vercel deploy --prod --archive=tgz`)
- **Repo:** `https://github.com/qualitymaterial/organiclume-ecommerce`
- **Design System:** "Organic Glow" — Beige `#FDFBF7`, Cream `#F5F2EB`, Sage `#E8EFEA`, fonts: Playfair Display (headings) + Inter (body)
- **Analytics:** GA4 installed (G-XDMY1TCNTH)
- **NOT Next.js** — do not use Next.js APIs, app router, or server components

### Shopify
- **Dev Store:** `lume-8787.myshopify.com`
- **Theme Repo:** `https://github.com/qualitymaterial/lume-commerce` (private)
- **Shopify CLI:** Installed (v3.93.0), authenticated as `hello@organiclume.com`
- **Custom App:** Admin API token set as GitHub secret `SHOPIFY_CLI_THEME_TOKEN`

### n8n (Automation — Railway)
- **Dashboard:** `https://n8n-production-309d6.up.railway.app`
- **5 Active Workflows:**

| Workflow | Trigger | Endpoint/Schedule |
|----------|---------|------------------|
| Celeste (inbound email) | Every 2 min | Polls Gmail, AI drafts reply |
| Outbound Email Drafts | Webhook | `POST /webhook/draft-email` with `{to, subject, body}` |
| Vendor Response Router | Every 5 min | Detects vendor domain emails |
| Daily Digest | 8:00 AM daily | Morning briefing draft |
| Waitlist Signup | Webhook | `POST /webhook/waitlist-signup` with `{email, firstName, source, signupDate}` |

**Email system is custom-built (n8n + Gmail API). Klaviyo was removed. Do NOT reference or use Klaviyo.**

### Paperclip AI (Agent Orchestration)
- **Dashboard:** `http://localhost:3101/LUM/dashboard`
- **Company ID:** `cf0e4ffc-6ec9-42c3-a660-10e2ea086b57`
- **Board API Key:** `pcp_board_bd4f4cb1b08e458803050a05e7d346e22df2a2adfb0b3e50`
- **16 Agents:** CEO, COO, CTO, CMO, CFO, Project Manager, Content Writer, Social Media Manager, SEO Specialist, Graphic Designer, Shopify Developer, Full Stack Engineer, QA Engineer, Celeste, Operations Manager, Supply Chain Analyst
- **Start command:** `./start-paperclip.sh` (auto-syncs n8n emails → Paperclip, then starts server)

---

## Key Endpoints & Webhooks

```bash
# Create a Gmail draft in hello@organiclume.com
curl -X POST https://n8n-production-309d6.up.railway.app/webhook/draft-email \
  -H "Content-Type: application/json" \
  -d '{"to": "vendor@example.com", "subject": "Subject", "body": "Email body"}'

# Add a waitlist subscriber (sends branded welcome email automatically)
curl -X POST https://n8n-production-309d6.up.railway.app/webhook/waitlist-signup \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "firstName": "Name", "source": "website", "signupDate": "2026-04-04T00:00:00Z"}'

# Paperclip API (local)
curl http://localhost:3101/api/companies/cf0e4ffc-6ec9-42c3-a660-10e2ea086b57/issues \
  -H "Authorization: Bearer pcp_board_bd4f4cb1b08e458803050a05e7d346e22df2a2adfb0b3e50"
```

---

## Accounts (all use hello@organiclume.com)

| Service | URL |
|---------|-----|
| Shopify Partner | partners.shopify.com |
| Shopify Dev Store | lume-8787.myshopify.com |
| Google Analytics | analytics.google.com (G-XDMY1TCNTH) |
| GCP Console | console.cloud.google.com (Project: 119990042010) |
| Pinterest Business | pinterest.com/organiclume |
| Instagram | instagram.com/organiclume |
| TikTok | tiktok.com/@organiclume |
| n8n | n8n-production-309d6.up.railway.app |
| Railway | railway.com |
| GitHub | github.com/qualitymaterial |

---

## Supply Chain

4 manufacturers contacted (RFQs sent April 3-4, 2026):
- **Zibo Daranfang Silk** — zibodaranfang@163.com
- **FSTex** — info@fstexsilk.com
- **Stitchtex** — 18815533743@163.com
- **Taihu Snow Silk** — carol@taihusnow.com

**Products:** Silk Heatless Curler Set ($38.99), Silk Pillowcase ($29-39), Silk Scrunchie 3-Pack ($15-22), Silk Eye Mask ($18-25), Silk Hair Bonnet ($22-30)

**Bundles:** Organic Glow Set ($79-89), Sleep Ritual Kit ($89-99), Starter Kit ($49)

---

## Important Rules

1. **No Klaviyo** — removed from stack. Email is custom n8n + Gmail API.
2. **No Next.js** — site is Vite + React. Don't use Next.js patterns.
3. **Vercel deploys manually** — run `vercel deploy --prod --archive=tgz` from project root (auto-deploy from GitHub is disconnected).
4. **Paperclip is local only** — runs on localhost:3101, not in cloud.
5. **All emails through n8n** — use the webhook endpoints, not Gmail MCP.
6. **Source of truth** — `docs/organiclume_source_of_truth.md` has everything.

---

## File Structure

```
/
├── docs/organiclume_source_of_truth.md   # Complete business documentation
├── src/                                   # Vite + React site (organiclume.com)
│   ├── App.tsx                           # Homepage
│   ├── ProductPage.tsx                   # /product
│   ├── WaitlistForm.tsx                  # Waitlist (posts to n8n webhook)
│   ├── blog/                             # Blog system
│   └── index.css                         # Styles
├── scripts/
│   ├── vendor-sync.mjs                   # Sync n8n emails → Paperclip
│   └── sync-all.sh                       # Run all syncs
├── start-paperclip.sh                    # Start Paperclip with auto-sync
├── celeste_workflow.json                 # n8n workflow export
├── outbound_email_workflow.json          # n8n workflow export
├── vendor_router_workflow.json           # n8n workflow export
├── daily_digest_workflow.json            # n8n workflow export
├── vercel.json                           # Vercel SPA routing config
├── paperclip/                            # Paperclip fork (git ignored, separate repo)
└── n8n-deploy/                           # n8n source (git ignored, separate repo)
```
