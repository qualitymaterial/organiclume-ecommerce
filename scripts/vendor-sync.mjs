#!/usr/bin/env node
/**
 * Vendor Email → Paperclip Sync
 *
 * Checks the Vendor Response Router workflow executions on n8n,
 * and creates Paperclip issues/comments for any vendor replies detected.
 *
 * Run this on a schedule or when you open your laptop:
 *   N8N_API_KEY="..." PAPERCLIP_API_KEY="..." node scripts/vendor-sync.mjs
 *
 * Or add to your n8n-sync run for a single command.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CURSOR_FILE = path.join(__dirname, ".vendor-sync-cursor.json");

const N8N_URL = process.env.N8N_URL || "https://n8n-production-309d6.up.railway.app";
const N8N_API_KEY = process.env.N8N_API_KEY || "";
const VENDOR_ROUTER_WORKFLOW_ID = "k3rgfPUGRAuDhuw7";
const CELESTE_WORKFLOW_ID = "fFTHYCzRykpHYIwq";

const PAPERCLIP_URL = process.env.PAPERCLIP_URL || "http://localhost:3101";
const PAPERCLIP_API_KEY = process.env.PAPERCLIP_API_KEY || "";
const COMPANY_ID = process.env.PAPERCLIP_COMPANY_ID || "cf0e4ffc-6ec9-42c3-a660-10e2ea086b57";

// Agent IDs (local LUME instance)
const SUPPLY_CHAIN_ANALYST_ID = "95edddb7-bb54-46c3-86b0-ad9b70076d4d";
const OPS_MANAGER_ID = "3ceb213c-ad94-4d99-ab79-ded16a870025";
const CELESTE_ID = "054a9e59-bb3c-422f-aa4b-e0848890d24e";

const VENDOR_PATTERNS = [
  "163.com",
  "alibaba.com",
  "fstexsilk.com",
  "stitchsilk.com",
  "taihusnow.com",
  "globalsources.com",
  "made-in-china.com",
];

const IGNORE_SENDERS = [
  "no-reply@accounts.google.com",
  "notify-noreply@google.com",
  "noreply@",
  "mailer-daemon@",
];

function loadCursor() {
  try {
    return JSON.parse(fs.readFileSync(CURSOR_FILE, "utf-8"));
  } catch {
    return { lastExecutionId: null, lastSyncedAt: null };
  }
}

function saveCursor(cursor) {
  fs.writeFileSync(CURSOR_FILE, JSON.stringify(cursor, null, 2) + "\n");
}

async function n8nFetch(endpoint) {
  const res = await fetch(`${N8N_URL}/api/v1${endpoint}`, {
    headers: { "X-N8N-API-KEY": N8N_API_KEY, accept: "application/json" },
  });
  if (!res.ok) throw new Error(`n8n API ${res.status}: ${await res.text()}`);
  return res.json();
}

async function paperclipFetch(endpoint, opts = {}) {
  const res = await fetch(`${PAPERCLIP_URL}/api${endpoint}`, {
    ...opts,
    headers: {
      Authorization: `Bearer ${PAPERCLIP_API_KEY}`,
      "Content-Type": "application/json",
      ...opts.headers,
    },
  });
  if (!res.ok) throw new Error(`Paperclip API ${res.status}: ${await res.text()}`);
  return res.json();
}

function isVendor(from) {
  const lower = (from || "").toLowerCase();
  return VENDOR_PATTERNS.some((p) => lower.includes(p));
}

function isIgnored(from) {
  const lower = (from || "").toLowerCase();
  return IGNORE_SENDERS.some((p) => lower.includes(p));
}

function extractEmails(execution) {
  const runData = execution?.data?.resultData?.runData || {};
  const gmailRuns = runData["Get Unread Emails"] || [];
  if (!gmailRuns.length) return [];

  const mainData = gmailRuns[0]?.data?.main?.[0] || [];
  return mainData.map((item) => item.json).filter((e) => e && !isIgnored(e.from));
}

async function main() {
  if (!N8N_API_KEY) {
    console.error("Error: N8N_API_KEY required");
    process.exit(1);
  }
  if (!PAPERCLIP_API_KEY) {
    console.error("Error: PAPERCLIP_API_KEY required");
    process.exit(1);
  }

  const cursor = loadCursor();
  console.log(`Last synced execution: ${cursor.lastExecutionId || "never"}`);

  // Check both Celeste and Vendor Router workflows
  const workflows = [CELESTE_WORKFLOW_ID, VENDOR_ROUTER_WORKFLOW_ID];
  let totalSynced = 0;
  let maxId = Number(cursor.lastExecutionId || 0);

  for (const wfId of workflows) {
    const { data: executions } = await n8nFetch(
      `/executions?workflowId=${wfId}&limit=25`
    );

    if (!executions.length) continue;

    const newExecs = cursor.lastExecutionId
      ? executions.filter((e) => Number(e.id) > Number(cursor.lastExecutionId))
      : [...executions];

    if (!newExecs.length) continue;

    newExecs.sort((a, b) => Number(a.id) - Number(b.id));

    for (const exec of newExecs) {
      if (exec.status !== "success") continue;

      const fullExec = await n8nFetch(`/executions/${exec.id}?includeData=true`);
      const emails = extractEmails(fullExec);

      for (const email of emails) {
        const from = email.from || "";
        const subject = email.subject || "(no subject)";
        const snippet = email.snippet || email.text || "";

        if (isVendor(from)) {
          console.log(`  VENDOR EMAIL: ${from} — ${subject}`);

          // Create a Paperclip issue for vendor response
          try {
            const issue = await paperclipFetch(`/companies/${COMPANY_ID}/issues`, {
              method: "POST",
              body: JSON.stringify({
                title: `Vendor Response: ${subject}`.substring(0, 100),
                description: `## Vendor Email Received\n\n**From:** ${from}\n**Subject:** ${subject}\n**Received:** ${exec.startedAt}\n\n**Preview:**\n${snippet.substring(0, 500)}\n\n---\n*Auto-imported from n8n Vendor Response Router. Check full email in hello@organiclume.com.*`,
                priority: "high",
                assigneeAgentId: SUPPLY_CHAIN_ANALYST_ID,
                status: "todo",
              }),
            });
            console.log(`    Created: ${issue.identifier}`);
          } catch (err) {
            console.error(`    Paperclip error: ${err.message}`);
          }

          totalSynced++;
        } else if (!isIgnored(from) && snippet.length > 0) {
          // Customer email — create issue for Celeste
          console.log(`  CUSTOMER EMAIL: ${from} — ${subject}`);

          try {
            const issue = await paperclipFetch(`/companies/${COMPANY_ID}/issues`, {
              method: "POST",
              body: JSON.stringify({
                title: `Customer Email: ${subject}`.substring(0, 100),
                description: `## Customer Email\n\n**From:** ${from}\n**Subject:** ${subject}\n**Received:** ${exec.startedAt}\n\n**Preview:**\n${snippet.substring(0, 500)}\n\n---\n*Auto-imported from n8n. Celeste has drafted a response in Gmail.*`,
                priority: "medium",
                assigneeAgentId: CELESTE_ID,
                status: "todo",
              }),
            });
            console.log(`    Created: ${issue.identifier}`);
          } catch (err) {
            console.error(`    Paperclip error: ${err.message}`);
          }

          totalSynced++;
        }
      }

      if (Number(exec.id) > maxId) maxId = Number(exec.id);
    }
  }

  saveCursor({
    lastExecutionId: String(maxId || cursor.lastExecutionId),
    lastSyncedAt: new Date().toISOString(),
  });

  console.log(`\nSync complete. ${totalSynced} email(s) imported to Paperclip.`);
}

main().catch((err) => {
  console.error("Sync failed:", err.message);
  process.exit(1);
});
