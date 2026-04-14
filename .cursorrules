# Synaptiq Intel — Project Context

> **SYNC RULE:** This file is mirrored across `CLAUDE.md`, `GEMINI.md`, `.cursorrules`, and `AGENTS.md`. All four files MUST contain identical content. When updating any of these files, you MUST update all four simultaneously. Never edit one without the others.

## What This Is
Synaptiq Intel is an AI-powered SDR platform (`synaptiqintel.com`) that qualifies inbound website visitors in real-time and books demos 24/7. This repository (`Special Projects`) manages the outbound playbooks, orchestration scripts, and outreach sequences.

**Owner:** Brian Anderson
**Key Document:** `outbound-playbook.md` — The source of truth for current outreach sequences.

---

## Tech Stack

### Playbook Execution (This Repo)
- **Stack:** Node.js / ES Modules
- **Integration:** n8n Webhooks + Direct Scripting
- **Orchestration:** Paperclip AI (local instance at `localhost:3101`)

### Synaptiq Core (External Repo)
- **Location:** `Desktop/AI Automation`
- **Stack:** Next.js + TypeScript + Tailwind CSS
- **Database:** Neon / Postgres
- **Social Integration:** LinkedIn API (v2 / UGC Posts) configured for the Synaptiq Intel Company Page.

### Automation Channels
- **Email:** Custom n8n workflows (`draft-email` webhook).
- **LinkedIn:** Automated posts and brand shadowing from the Synaptiq Intel Business Page.

---

## Important Rules

1. **Brand Voice**: Professional, provocative (contrasting human SDR inefficiency), and data-driven (focus on ROI and response time).
2. **Personal Profile vs. Site**: All automated LinkedIn actions should target the **Synaptiq Intel Company Page** unless explicitly directed otherwise.
3. **No Heartbeats**: Do not implement background polling or automated loops unless they are manual-trigger scripts.
4. **Target Context**: Always reference the `outbound-playbook.md` for prospect-specific drivers (e.g., Phil Freo, Sujan Patel).

---

## File Structure

```
/
├── outbound-playbook.md   # Outreach sequences (THE SOURCE OF TRUTH)
├── scripts/               # Automation & orchestration scripts
│   └── execute-playbook.mjs # Proposed manual-trigger script
├── paperclip/             # Local Paperclip AI orchestration
├── docs/                  # Documentation and creative assets
│   ├── superpowers/       # Agent strategy docs
│   └── operations/        # Process documentation
├── outbound_email_workflow.json # n8n workflow export
└── celeste_workflow.json        # n8n workflow export
```
