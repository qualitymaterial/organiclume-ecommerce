# Organic Lume: Business Architecture & Source of Truth

**Last Updated:** April 4, 2026
**Status:** Live on Domain, Sourcing Phase Active, Product Line Expanding

---

## 🦋 1. Brand & Identity
- **Brand Name:** Organic Lume
- **Tagline:** Effortless Heatless Curls
- **Design System ("Organic Glow"):**
  - **Colors:** Warm Beige (`#FDFBF7`), Soft Cream (`#F5F2EB`), Sage Green (`#E8EFEA`)
  - **Typography:** `Playfair Display` (Headings) / `Inter` (Body)
- **Packaging:** Custom magnetic closure box, minimal luxury styling (PackMojo recommended, $5-12/unit)

---

## 🛍 2. Product Line

### Individual Products
| Product | Retail Price | Target COGS | Status |
|---------|-------------|-------------|--------|
| Silk Heatless Curler Set | $38.99 | $2-3.50 | RFQs sent to 4 manufacturers |
| Silk Pillowcase (Standard/Queen) | $29-39 | $3-6 | RFQs drafted |
| Silk Scrunchie 3-Pack | $15-22 | $1-3 | RFQs drafted |
| Silk Eye Mask | $18-25 | $1.50-3 | RFQs drafted |
| Silk Hair Bonnet | $22-30 | $2-4 | Sourcing plan ready |

### Bundles
| Bundle | Contents | Target Price |
|--------|----------|-------------|
| **The Organic Glow Set** | Curler + Pillowcase + Scrunchies | $79-89 |
| **Sleep Ritual Kit** | Curler + Eye Mask + Pillowcase | $89-99 |
| **Starter Kit** | Curler + Scrunchies | $49 |

*All products: 22 momme 6A Mulberry Silk, OEKO-TEX certified*

---

## 🖥 3. Technical Infrastructure
- **Domain:** `organiclume.com`
  - *Registrar:* Namecheap
  - *DNS pointing to:* Vercel (`76.76.21.21`)
- **Frontend Website:**
  - *Stack:* Vite + React + Vanilla CSS + Framer Motion
  - *Repository:* `https://github.com/qualitymaterial/organiclume-ecommerce`
  - *Hosting:* Vercel (auto-deploys on `main` branch push)
  - *Features:* Waitlist form (Klaviyo integration), Organic Glow design system
- **Shopify (E-commerce):**
  - *Dev Store:* `lume-8787.myshopify.com`
  - *Theme Repo:* `https://github.com/qualitymaterial/lume-commerce` (private)
  - *Account:* `hello@organiclume.com` (Shopify Partner)
  - *Shopify CLI:* Installed (v3.93.0), authenticated locally
  - *Custom App:* `Shopify CLI` — Admin API token set as GitHub secret
  - *CI/CD:* Theme Check, Prettier, Lighthouse, preview deploys via GitHub Actions
  - *Status:* Dev store created, theme selection in progress
- **Sales / Checkout:**
  - *Processor:* Stripe (Checkout Button logic integrated in Hero component)

---

## 🤖 4. Automation & AI Infrastructure

### n8n (Automation Engine)
- *Status:* **LIVE**
- *Host:* Railway.app — [https://n8n-production-309d6.up.railway.app](https://n8n-production-309d6.up.railway.app)
- *Workflow Files:* `celeste_workflow.json`, `outbound_email_workflow.json` (in repo root)

#### Workflow 1: Celeste Customer Success & Sourcing Agent
| Step | Node | Function |
|------|------|----------|
| 1 | Schedule Trigger | Fires every 2 minutes |
| 2 | Get Unread Emails | Gmail API (OAuth as `hello@organiclume.com`) — fetches unread emails from last 5 min |
| 3 | Celeste AI | Code node → direct Anthropic API call (Claude Haiku 4.5) — routes vendors vs. customers, drafts reply in brand voice |
| 4 | Create Draft | Saves response as a Gmail draft — does NOT auto-send |

**Celeste's routing logic:**
- *Vendor email* → inquires about bulk pricing, MOQ, samples, OEKO-TEX
- *Customer email* → warm, helpful reply signed off with "Warm regards, Celeste | Organic Lume"
- *Spam/system email* → skipped

#### Workflow 2: Outbound Email Drafts (Paperclip → Gmail)
| Step | Node | Function |
|------|------|----------|
| 1 | Webhook | `POST /webhook/draft-email` with `{to, subject, body}` |
| 2 | Create Gmail Draft | Creates draft in `hello@organiclume.com` |
| 3 | Format Response | Returns draft ID and confirmation |

**Usage:** Any Paperclip agent or script can call this webhook to draft outbound emails. Board reviews and sends from Gmail.
```bash
curl -X POST https://n8n-production-309d6.up.railway.app/webhook/draft-email \
  -H "Content-Type: application/json" \
  -d '{"to": "vendor@example.com", "subject": "RFQ", "body": "Email body..."}'
```

**GCP OAuth Setup:**
- *GCP Project ID:* `119990042010`
- *Gmail API:* Enabled
- *OAuth Scope:* `https://mail.google.com/`
- *Authorized user:* `hello@organiclume.com`
- *Consent screen:* Testing mode — `hello@organiclume.com` added as test user

**n8n Environment Variables (Railway):**
- `ANTHROPIC_API_KEY` — Claude API key for Celeste AI Code node
- `N8N_BLOCK_ENV_ACCESS_IN_NODE=false` — allows Code nodes to access env vars
- `DB_TYPE=postgresdb` + `DB_POSTGRESDB_*` — Postgres connection (Railway plugin)

**n8n Sync Script:**
- `scripts/n8n-sync.mjs` — pulls n8n execution history into local Paperclip board
- Run: `N8N_API_KEY="..." PAPERCLIP_API_KEY="..." node scripts/n8n-sync.mjs`

---

### Paperclip AI (Agent Orchestration)
- *Status:* **LOCAL**
- *Dashboard:* `http://localhost:3101/LUM/dashboard`
- *API Base URL:* `http://localhost:3101`
- *Repository (fork):* `https://github.com/qualitymaterial/paperclip`
- *Company:* LUM (Organic Lume) — Company ID: `cf0e4ffc-6ec9-42c3-a660-10e2ea086b57`
- *Admin Account:* `hello@organiclume.com` (instance admin)
- *Agent Execution:* Local via Claude Code — agents run heartbeats on the local machine
- *Superpowers Plugin:* Installed globally — all agents get structured workflows (brainstorming → planning → execution)

#### Active Agent Team (14 agents)

**Leadership:**
| Agent | Role | Responsibility |
|-------|------|----------------|
| CEO | ceo | Strategy, governance, hiring |
| COO | general | Operations, finance, business development |
| CTO | cto | Technical direction, architecture |
| CMO | general | Marketing strategy, brand |

**Marketing & Content:**
| Agent | Role | Responsibility | Superpowers Skills |
|-------|------|----------------|--------------------|
| Content Writer | general | Blog posts, email copy, product descriptions | content-strategy, content-creator, brand-guardian, ai-seo |
| Social Media Manager | general | Pinterest, TikTok, Instagram daily ops | social-content, tiktok-strategist, instagram-curator |
| SEO Specialist | general | Organic search, AI search, keyword research | ai-seo, seo-audit, programmatic-seo |
| Graphic Designer | general | Visual assets, ad creatives, brand kit | ui-designer, ad-creative, visual-storyteller |

**Product & Engineering:**
| Agent | Role | Responsibility | Superpowers Skills |
|-------|------|----------------|--------------------|
| Shopify Developer | general | Storefront build, theme dev | frontend-developer, ui-designer, programmatic-seo |
| Full Stack Engineer | general | Platform development, integrations | frontend-developer, ux-architect, analytics-tracking |
| QA Engineer | general | Testing, quality assurance | frontend-developer, devops-automator |

**Operations:**
| Agent | Role | Responsibility | Superpowers Skills |
|-------|------|----------------|--------------------|
| Celeste | general | Customer success, email automation | content-strategy, brand-guardian |
| Operations Manager | general | Fulfillment, supply chain oversight | project-shepherd |
| Supply Chain Analyst | general | Vendor management, import logistics | project-shepherd |

---

## 📦 5. Supply Chain & Sourcing

### Manufacturers
| Manufacturer | Location | Status | Key Strengths |
|---|---|---|---|
| **Zibo Daranfang Silk** | China (Alibaba) | RFQ sent April 3 — awaiting response | Original target vendor |
| **FSTex (Wujiang First Textile)** | Jiangsu, China | RFQ drafted — ready to send | $1.69-1.86/pc, OEKO-TEX, low sample MOQ (2 pcs) |
| **Stitchtex (Suzhou Shengze)** | Jiangsu, China | RFQ drafted — ready to send | Vertically integrated, TÜV Rheinland verified |
| **Taihu Snow Silk** | China | RFQ drafted — ready to send | OEKO-TEX, established brand |

- *Email for all:* `zibodaranfang@163.com`, `info@fstexsilk.com`, `info@stitchsilk.com`, `sales@taihusnow.com`
- *Material Requirements:* OEKO-TEX certified, 22 momme 6A Mulberry silk
- *Packaging Supplier:* PackMojo (recommended for magnetic closure gift boxes, $5-12/unit)

### Unit Economics
- *Target COGS:* $2-3.50 per curler set (under review — financial model estimates $10.50 including packaging/freight)
- *Recommended Retail:* $38.99 (73% gross margin per financial model)
- *Bundle AOV Target:* $60+ (via Organic Glow Set, Sleep Ritual Kit, Starter Kit)

### Logistics
- *Domestic Fulfillment:* PirateShip (integrates via Shopify app, USPS Ground $4-7)
- *Import:* Research in progress (HS codes, duties, customs requirements)

---

## 💌 6. Marketing & Communications
- **Official Email:** `hello@organiclume.com`
- **Marketing Setup:** Klaviyo (waitlist form live, welcome nurture flow designed, abandoned cart + post-purchase sequences written)
- **Social Accounts:** Setup in progress (Pinterest, TikTok, Instagram)
- **Content Pipeline:**
  - 30-day Pinterest content calendar + 20 pin designs (done)
  - 5 TikTok video scripts (done)
  - 5 blog posts (in progress)
  - Influencer outreach list: 20 micro-influencers identified (done)
- **Acquisition Channel Priority:**
  1. Pinterest Organic (Lifestyle/Aesthetic content)
  2. TikTok (Tutorial / "How it Works" viral loops)
  3. Instagram (Brand presence, UGC, community)
  4. Paid Social (Facebook/Instagram ads plan ready for review)

---

## 🚀 7. Roadmap
1. [x] **Sourcing:** RFQ email sent to Zibo Daranfang Silk — April 3, 2026
2. [x] **Sourcing:** RFQ emails drafted to 3 backup manufacturers via outbound automation — April 4, 2026
3. [ ] **Sourcing:** Receive vendor responses, negotiate pricing, request samples
4. [ ] **Sourcing:** Source expanded product line (pillowcases, scrunchies, eye masks, bonnets)
5. [ ] **Quality Assurance:** Receive bulk samples, verify material and custom box quality
6. [x] **Cloud Migration:** n8n live on Railway (`n8n-production-309d6.up.railway.app`)
7. [x] **Local Setup:** Paperclip AI running locally (`localhost:3101`) with 14 agents
8. [x] **Automation:** Celeste inbound email workflow verified (April 4, 2026)
9. [x] **Automation:** Outbound email draft webhook live (April 4, 2026)
10. [x] **Ecommerce:** Shopify standard selected, dev store live at `lume-8787.myshopify.com` (April 4, 2026)
11. [ ] **Ecommerce:** Shopify theme selection and customization
12. [ ] **Ecommerce:** Product catalog setup (5 products + 3 bundles)
13. [ ] **Marketing:** Set up social accounts (Pinterest, TikTok, Instagram)
14. [ ] **Marketing:** Execute pre-launch buzz campaign (30-day countdown)
15. [ ] **Marketing:** Launch Pinterest campaign
16. [ ] **Analytics:** GA4 + Meta Pixel setup (blocked on credentials)
17. [ ] **Analytics:** Unified customer data pipeline
18. [ ] **Launch:** Shopify store go-live
