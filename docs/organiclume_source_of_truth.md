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
  - *Hosting:* Vercel (Auto-deployments active on `main` branch push)
- **Sales / Checkout:**
  - *Processor:* Stripe (Checkout Button logic integrated in Hero component)

---

## 🤖 3. "Zero-Human" AI Operations
- **Orchestrator Platform:** Paperclip AI
  - *Instance Slug:* `LUM`
  - *Current Host:* Local Machine (`localhost:3101`)
  - *Planned Production Host:* DigitalOcean Droplet (Ubuntu VM)
- **Hired AI Agents (Active):**
  1. **CEO Agent:** High-level strategy
  2. **CTO Agent:** Technical debugging & maintenance
  3. **CMO Agent:** Marketing campaigns (Pinterest/TikTok)
  4. **Operations Manager:** Supply chain & fulfillment
  5. **Celeste:** Customer Success Lead (Email handler)
- **Nervous System (Automation):**
  - *Platform:* n8n Cloud (`n8n.io/cloud`)
  - *Purpose:* Connects `hello@organiclume.com` to Celeste via Paperclip REST Webhooks.
  - *Action:* Celeste actively monitors IMAP unread emails and generates reply drafts.

---

## 📦 4. Supply Chain & Sourcing
- **Primary Target Manufacturer:** Zibo Daranfang Silk (Alibaba Verified)
  - *Email:* `zibodaranfang@163.com`
  - *Material Requirements:* OEKO-TEX certified, 22 momme 6A Mulberry silk
- **Unit Economics (Target):**
  - *COGS (Sample/Bulk):* ~$2.00 - $3.50 per unit
  - *Retail Price:* ~$35.00 - $45.00
- **Logistics:** PirateShip (Planned for domestic fulfillment automation)

---

## 💌 5. Marketing & Communications
- **Official Email:** `hello@organiclume.com`
- **Marketing Setup:** Klaviyo (Planned implementation for "Organic Glow" Heatless Curls Welcome Nurture Flow)
- **Acquisition Channel Priority:** 
  1. Pinterest Organic (Lifestyle/Aesthetic content)
  2. TikTok (Tutorial / "How it Works" viral loops)

---

## 🚀 6. Immediate Next Steps / Roadmap
1. [ ] **Sourcing:** Successfully send RFQ sample email to Zibo Daranfang via `hello@organiclume.com`.
2. [ ] **Quality Assurance:** Receive bulk samples, verify material and custom box quality.
3. [ ] **Automation Checkout:** Verify n8n Webhook connection is successfully creating drafts in Gmail.
4. [ ] **Cloud Migration:** Deploy Paperclip instance to `$6/mo` DigitalOcean Droplet.
5. [ ] **Scale:** Launch Pinterest campaign utilizing CMO Agent generated assets.
