# Organic Lume: Business Architecture & Source of Truth

**Last Updated:** April 3, 2026
**Status:** Live on Domain, Sourcing Phase Active

---

## 🦋 1. Brand & Identity
- **Brand Name:** Organic Lume
- **Tagline:** Effortless Heatless Curls
- **Design System ("Organic Glow"):**
  - **Colors:** Warm Beige (`#FDFBF7`), Soft Cream (`#F5F2EB`), Sage Green (`#E8EFEA`)
  - **Typography:** `Playfair Display` (Headings) / `Inter` (Body)
- **Primary Product:** 100% 6A Grade Mulberry Silk Heatless Hair Curler Sets
- **Packaging:** Custom magnetic closure box, minimal luxury styling

---

## 🖥 2. Technical Infrastructure
- **Domain:** `organiclume.com`
  - *Registrar:* Namecheap
  - *DNS pointing to:* Vercel (`76.76.21.21`)
- **Frontend Website:**
  - *Stack:* Vite + React + Vanilla CSS + Framer Motion
  - *Repository:* `https://github.com/qualitymaterial/organiclume-ecommerce`
  - *Hosting:* Vercel (auto-deploys on `main` branch push)
- **Sales / Checkout:**
  - *Processor:* Stripe (Checkout Button logic integrated in Hero component)

---

## 🤖 3. Automation & AI Infrastructure

### n8n (Automation Engine)
- *Status:* **LIVE**
- *Host:* Railway.app — [https://n8n-production-309d6.up.railway.app](https://n8n-production-309d6.up.railway.app)
- *Workflow File:* `celeste_workflow.json` (in repo root)

#### Active Workflow: Celeste Customer Success & Sourcing Agent
| Step | Node | Function |
|------|------|----------|
| 1 | IMAP Email Trigger | Polls `hello@organiclume.com` every 1 min for UNSEEN emails |
| 2 | Celeste AI Brain | Claude-powered agent — routes vendors vs. customers, drafts reply in brand voice |
| 3 | Create Gmail Draft | Saves response as a Gmail draft — does NOT auto-send |

**Celeste's routing logic:**
- *Vendor email* → inquires about bulk pricing (target $2–$3.50) for 22 momme 6A silk
- *Customer email* → warm, helpful reply signed off with "Organic Glow"

---

### Paperclip AI (Agent Orchestration)
- *Status:* **LOCAL**
- *Dashboard:* `http://localhost:3101/LUM/dashboard`
- *API Base URL:* `http://localhost:3101`
- *Repository (fork):* `https://github.com/qualitymaterial/paperclip`
- *Company:* LUM (Organic Lume) — Company ID: `0aa61dda-d563-4cf4-a608-f04979b729c8`
- *Admin Account:* `hello@organiclume.com` (instance admin)
- *Agent Execution:* Local via Claude Code — agents run heartbeats on the local machine

#### Active Agent Team (LUM Company)
| Agent | Role | Responsibility |
|-------|------|----------------|
| CEO | ceo | Strategy & governance |
| COO | general | Operations oversight |
| CTO | cto | Technical direction |
| CMO | general | Marketing & campaigns |
| Celeste | general | Customer success & email |
| Shopify Developer | general | Storefront build |
| Full Stack Engineer | general | Platform development |
| Operations Manager | general | Fulfillment & supply chain |

#### Open Issues
| Ticket | Priority | Title | Status |
|--------|----------|-------|--------|
| LUM-2 | Critical | Select and set up e-commerce platform stack | Blocked |
| LUM-8 | Critical | Provision Shopify stores: dev, staging, production | Blocked — RFQ sent to Zibo Daranfang Silk on April 3, 2026 |

---

## 📦 4. Supply Chain & Sourcing
- **Primary Target Manufacturer:** Zibo Daranfang Silk (Alibaba Verified)
  - *Email:* `zibodaranfang@163.com`
  - *Material Requirements:* OEKO-TEX certified, 22 momme 6A Mulberry silk
  - *RFQ Status:* **Sent April 3, 2026** — awaiting response
- **Unit Economics (Target):**
  - *COGS (Sample/Bulk):* ~$2.00 - $3.50 per unit
  - *Retail Price:* ~$35.00 - $45.00
- **Logistics:** PirateShip (Planned for domestic fulfillment automation)

---

## 💌 5. Marketing & Communications
- **Official Email:** `hello@organiclume.com`
- **Marketing Setup:** Klaviyo (Planned — "Organic Glow" Heatless Curls Welcome Nurture Flow)
- **Acquisition Channel Priority:**
  1. Pinterest Organic (Lifestyle/Aesthetic content)
  2. TikTok (Tutorial / "How it Works" viral loops)

---

## 🚀 6. Roadmap
1. [x] **Sourcing:** RFQ email sent to Zibo Daranfang Silk (`zibodaranfang@163.com`) — April 3, 2026
2. [ ] **Sourcing:** Receive vendor response, negotiate pricing, request samples
3. [ ] **Quality Assurance:** Receive bulk samples, verify material and custom box quality
4. [x] **Cloud Migration:** n8n live on Railway (`n8n-production-309d6.up.railway.app`)
5. [x] **Local Setup:** Paperclip AI running locally (`localhost:3101`)
6. [ ] **Automation:** Verify Celeste n8n workflow is creating Gmail drafts correctly
7. [ ] **Ecommerce:** Resolve LUM-2 — finalize e-commerce platform stack decision
8. [ ] **Ecommerce:** Resolve LUM-8 — provision Shopify stores once vendor/sourcing confirmed
9. [ ] **Scale:** Launch Pinterest campaign using CMO Agent generated assets
