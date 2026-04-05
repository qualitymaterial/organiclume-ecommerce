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

## 🔑 2. Accounts & Access Directory

*All accounts use `hello@organiclume.com` unless noted.*

### Domains & Hosting
| Service | URL | Account |
|---------|-----|---------|
| **organiclume.com** | https://organiclume.com | Namecheap (DNS → Vercel) |
| **Vercel** | https://vercel.com/qualitymaterials-projects | qualitymaterial |
| **Railway** (n8n) | https://railway.com | brian.anderson1784@me.com |

### E-commerce & Payments
| Service | URL | Account |
|---------|-----|---------|
| **Shopify Partner** | https://partners.shopify.com | hello@organiclume.com |
| **Shopify Dev Store** | https://lume-8787.myshopify.com/admin | hello@organiclume.com |
| **Stripe** | https://dashboard.stripe.com | *Setup pending — needs business entity* |

### Google / GCP
| Service | URL | Account |
|---------|-----|---------|
| **Google Workspace** | https://workspace.google.com | hello@organiclume.com |
| **Gmail** (business) | https://mail.google.com | hello@organiclume.com |
| **GCP Console** | https://console.cloud.google.com (Project ID: 119990042010) | hello@organiclume.com |
| **Google Analytics 4** | https://analytics.google.com | Property ID: G-XDMY1TCNTH |

### Social Media
| Platform | URL | Account |
|----------|-----|---------|
| **Pinterest** (Business) | https://pinterest.com/organiclume | hello@organiclume.com |
| **Instagram** | https://instagram.com/organiclume | hello@organiclume.com |
| **TikTok** | https://tiktok.com/@organiclume | hello@organiclume.com |

### Developer / Code
| Service | URL | Account |
|---------|-----|---------|
| **GitHub** | https://github.com/qualitymaterial | qualitymaterial |
| **GitHub Repo (site)** | https://github.com/qualitymaterial/organiclume-ecommerce | — |
| **GitHub Repo (Shopify)** | https://github.com/qualitymaterial/lume-commerce (private) | — |
| **GitHub Repo (Paperclip)** | https://github.com/qualitymaterial/paperclip (fork) | — |
| **Pinterest Developer** | https://developers.pinterest.com/apps/ | hello@organiclume.com |

### AI & Automation
| Service | URL | Account |
|---------|-----|---------|
| **n8n** | https://n8n-production-309d6.up.railway.app | hello@organiclume.com |
| **Paperclip AI** | http://localhost:3101/LUM/dashboard | local (hello@organiclume.com) |
| **Anthropic** | https://console.anthropic.com | API key set in Railway env vars |

### Pending Setup
| Service | Purpose | Status |
|---------|---------|--------|
| **LLC (Wyoming)** | Business entity | This week |
| **EIN (IRS)** | Tax ID | After LLC |
| **Mercury** | Business bank account | After EIN |
| **Meta Business Suite** | Meta Pixel + Facebook | Pending |

---

## 🛍 3. Product Line

### Individual Products
| Product | Retail Price | Target COGS | Status |
|---------|-------------|-------------|--------|
| Silk Heatless Curler Set | $38.99 | $2-3.50 | RFQs sent to 4 manufacturers |
| Silk Pillowcase (Standard/Queen) | $29-39 | $3-6 | RFQs sent |
| Silk Scrunchie 3-Pack | $15-22 | $1-3 | RFQs sent |
| Silk Eye Mask | $18-25 | $1.50-3 | RFQs sent |
| Silk Hair Bonnet | $22-30 | $2-4 | RFQs sent |

### Bundles
| Bundle | Contents | Target Price |
|--------|----------|-------------|
| **The Organic Glow Set** | Curler + Pillowcase + Scrunchies | $79-89 |
| **Sleep Ritual Kit** | Curler + Eye Mask + Pillowcase | $89-99 |
| **Starter Kit** | Curler + Scrunchies | $49 |

*All products: 22 momme 6A Mulberry Silk, OEKO-TEX certified*

---

## 🖥 4. Technical Infrastructure
- **Domain:** `organiclume.com`
  - *Registrar:* Namecheap
  - *DNS pointing to:* Vercel (`76.76.21.21`)
- **Frontend Website:**
  - *Stack:* Vite + React + TypeScript + Framer Motion
  - *Repository:* `https://github.com/qualitymaterial/organiclume-ecommerce`
  - *Hosting:* Vercel (deploy via `vercel deploy --prod --archive=tgz`)
  - *Features:* Waitlist form (n8n webhook), blog, product page, Organic Glow design system
  - *Analytics:* GA4 (G-XDMY1TCNTH) installed
- **Shopify (E-commerce):**
  - *Dev Store:* `lume-8787.myshopify.com`
  - *Theme Repo:* `https://github.com/qualitymaterial/lume-commerce` (private)
  - *Account:* `hello@organiclume.com` (Shopify Partner)
  - *Shopify CLI:* Installed (v3.93.0), authenticated locally
  - *Custom App:* `Shopify CLI` — Admin API token set as GitHub secret
  - *CI/CD:* Theme Check, Prettier, Lighthouse, preview deploys via GitHub Actions
  - *Status:* Dev store created, Dawn theme customized with Organic Glow

---

## 🤖 5. Automation & AI Infrastructure

### n8n (Automation Engine)
- *Status:* **LIVE**
- *Host:* Railway.app — [https://n8n-production-309d6.up.railway.app](https://n8n-production-309d6.up.railway.app)

#### Active Workflows (5)
| # | Workflow | Trigger | Function |
|---|---------|---------|----------|
| 1 | **Celeste Customer Success** | Every 2 min | Reads unread emails → Claude Haiku drafts reply → Gmail draft |
| 2 | **Outbound Email Drafts** | Webhook POST `/webhook/draft-email` | Agents draft emails → Gmail draft with recipient |
| 3 | **Vendor Response Router** | Every 5 min | Detects vendor domain emails → creates alert draft |
| 4 | **Daily Business Digest** | 8:00 AM daily | Morning briefing with inbox count + priorities |
| 5 | **Waitlist Signup** | Webhook POST `/webhook/waitlist-signup` | Website signup → branded HTML welcome email from hello@organiclume.com |

**Email system:** Custom-built, replaces Klaviyo. n8n + Gmail API + MJML templates. Zero monthly cost.

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

**Sync Scripts:**
- `scripts/vendor-sync.mjs` — pulls vendor/customer emails from n8n → creates Paperclip issues
- `scripts/sync-all.sh` — runs all syncs
- `start-paperclip.sh` — auto-syncs then starts Paperclip dev server

---

### Paperclip AI (Agent Orchestration)
- *Status:* **LOCAL**
- *Dashboard:* `http://localhost:3101/LUM/dashboard`
- *API Base URL:* `http://localhost:3101`
- *Repository (fork):* `https://github.com/qualitymaterial/paperclip`
- *Company:* LUM (Organic Lume) — Company ID: `cf0e4ffc-6ec9-42c3-a660-10e2ea086b57`
- *Admin Account:* `hello@organiclume.com` (instance admin)
- *Agent Execution:* Local via Claude Code — agents run heartbeats on the local machine
- *Superpowers Plugin:* Installed globally — all agents get structured workflows

#### Active Agent Team (16 agents)

**Leadership:**
| Agent | Role |
|-------|------|
| CEO | Strategy, governance, hiring |
| COO | Operations, business development |
| CTO | Technical direction, architecture |
| CMO | Marketing strategy, brand |
| CFO | Financial operations, business formation, tax |
| Project Manager | Coordination, dependency tracking, launch readiness |

**Marketing & Content:**
| Agent | Responsibility |
|-------|---------------|
| Content Writer | Blog posts, email copy, product descriptions, legal pages |
| Social Media Manager | Pinterest, TikTok, Instagram daily ops |
| SEO Specialist | Organic search, AI search, keyword research |
| Graphic Designer | Visual assets, ad creatives, brand kit, unboxing design |

**Product & Engineering:**
| Agent | Responsibility |
|-------|---------------|
| Shopify Developer | Storefront build, theme dev, Shopify CLI |
| Full Stack Engineer | Platform development, email templates, popup |
| QA Engineer | Testing, quality assurance, accessibility |

**Operations:**
| Agent | Responsibility |
|-------|---------------|
| Celeste | Customer success, inbound email automation |
| Operations Manager | Fulfillment, supply chain oversight, premium touches |
| Supply Chain Analyst | Vendor management, import logistics, sample tracking |

---

## 📦 6. Supply Chain & Sourcing

### Manufacturers
| Manufacturer | Email | Status | Key Strengths |
|---|---|---|---|
| **Zibo Daranfang Silk** | zibodaranfang@163.com | RFQ sent April 3 — awaiting response | Original target vendor |
| **FSTex (Wujiang First Textile)** | info@fstexsilk.com | RFQ sent April 4 — delivered | $1.69-1.86/pc, OEKO-TEX, low sample MOQ |
| **Stitchtex (Suzhou Shengze)** | 18815533743@163.com | RFQ sent April 4 | Vertically integrated, TÜV Rheinland verified |
| **Taihu Snow Silk** | carol@taihusnow.com | RFQ sent April 4 | OEKO-TEX, established brand |

*Expect vendor responses by April 8-9, 2026*

### Unit Economics
- *Target COGS:* $2-3.50 per curler set (under review — financial model estimates $10.50 including packaging/freight)
- *Recommended Retail:* $38.99 (73% gross margin per financial model)
- *Bundle AOV Target:* $60+ (via Organic Glow Set, Sleep Ritual Kit, Starter Kit)
- *Packaging Supplier:* PackMojo (magnetic closure gift boxes, $5-12/unit)

### Logistics
- *Domestic Fulfillment:* PirateShip (integrates via Shopify app, USPS Ground $4-7)
- *Import:* Research in progress (HS codes, duties, customs requirements)

---

## 💌 7. Marketing & Communications
- **Official Email:** `hello@organiclume.com`
- **Email System:** Custom (n8n + Gmail API + MJML templates — replaced Klaviyo)
- **Social Accounts:** Pinterest, Instagram, TikTok — all created as `hello@organiclume.com`
- **Content Pipeline:**
  - 30-day Pinterest content calendar + 20 pin designs (done)
  - 5 TikTok video scripts (done)
  - 7 blog posts (live on site)
  - Influencer outreach list: 20 micro-influencers identified (done)
  - Brand manifesto written (done)
  - Customer journey mapped (done)
- **Acquisition Channel Priority:**
  1. Pinterest Organic (Lifestyle/Aesthetic content)
  2. TikTok (Tutorial / "How it Works" viral loops)
  3. Instagram (Brand presence, UGC, community)
  4. Paid Social (Facebook/Instagram ads plan ready for review)

---

## 🚀 8. Roadmap
1. [x] **Sourcing:** RFQ email sent to Zibo Daranfang Silk — April 3, 2026
2. [x] **Sourcing:** RFQ emails sent to 3 backup manufacturers — April 4, 2026
3. [ ] **Sourcing:** Receive vendor responses, negotiate pricing, request samples (expected April 8-9)
4. [ ] **Sourcing:** Source expanded product line (pillowcases, scrunchies, eye masks, bonnets)
5. [ ] **Quality Assurance:** Receive samples, verify material and packaging quality
6. [x] **Cloud Migration:** n8n live on Railway with 5 workflows
7. [x] **Local Setup:** Paperclip AI running locally with 16 agents
8. [x] **Automation:** Celeste inbound email workflow verified
9. [x] **Automation:** Outbound email draft webhook live
10. [x] **Automation:** Waitlist signup → branded welcome email (replaced Klaviyo)
11. [x] **Ecommerce:** Shopify dev store live at `lume-8787.myshopify.com`
12. [x] **Analytics:** GA4 installed (G-XDMY1TCNTH)
13. [x] **Social:** Pinterest, Instagram, TikTok accounts created
14. [ ] **Business:** Form LLC (Wyoming) — this week
15. [ ] **Business:** Get EIN, open business bank account, connect Stripe
16. [ ] **Ecommerce:** Product catalog setup (5 products + 3 bundles)
17. [ ] **Marketing:** Brand and populate social accounts with content
18. [ ] **Marketing:** Execute pre-launch buzz campaign (30-day countdown)
19. [ ] **Analytics:** Meta Pixel setup
20. [ ] **Premium:** Brand ambassador / Founding 10 program
21. [ ] **Premium:** Unboxing experience design finalized
22. [ ] **Premium:** Loyalty + referral program ("Share the Glow")
23. [ ] **Launch:** Shopify store go-live
