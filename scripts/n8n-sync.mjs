#!/usr/bin/env node
/**
 * n8n → Paperclip Sync
 *
 * Pulls recent Celeste workflow executions from n8n (cloud)
 * and posts updates to the local Paperclip board.
 *
 * Usage:
 *   node scripts/n8n-sync.mjs
 *
 * Environment (or edit defaults below):
 *   N8N_URL          - n8n instance URL
 *   N8N_API_KEY      - n8n API key
 *   PAPERCLIP_URL    - local Paperclip URL (default: http://localhost:3101)
 *   PAPERCLIP_API_KEY - board API key for Paperclip
 *   PAPERCLIP_COMPANY_ID - LUM company ID
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CURSOR_FILE = path.join(__dirname, ".n8n-sync-cursor.json");

// --- Config ---
const N8N_URL = process.env.N8N_URL || "https://n8n-production-309d6.up.railway.app";
const N8N_API_KEY = process.env.N8N_API_KEY || "";
const CELESTE_WORKFLOW_ID = "nbO4TfIC7jaBRUst";

const PAPERCLIP_URL = process.env.PAPERCLIP_URL || "http://localhost:3101";
const PAPERCLIP_API_KEY = process.env.PAPERCLIP_API_KEY || "";
const COMPANY_ID = process.env.PAPERCLIP_COMPANY_ID || "cf0e4ffc-6ec9-42c3-a660-10e2ea086b57";

// Agent IDs (local LUME instance)
const CELESTE_AGENT_ID = "054a9e59-bb3c-422f-aa4b-e0848890d24e";
const OPS_MANAGER_AGENT_ID = "3ceb213c-ad94-4d99-ab79-ded16a870025";

// Known vendor domains/emails for routing
const VENDOR_PATTERNS = [
  "163.com",         // Chinese vendors (Alibaba sellers)
  "alibaba.com",
  "aliexpress.com",
  "made-in-china.com",
  "globalsources.com",
];

const IGNORE_SENDERS = [
  "no-reply@accounts.google.com",
  "notify-noreply@google.com",
  "noreply@",
  "mailer-daemon@",
];

// --- Helpers ---

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
    headers: {
      "X-N8N-API-KEY": N8N_API_KEY,
      "accept": "application/json",
    },
  });
  if (!res.ok) throw new Error(`n8n API ${res.status}: ${await res.text()}`);
  return res.json();
}

async function paperclipFetch(endpoint, opts = {}) {
  const res = await fetch(`${PAPERCLIP_URL}/api${endpoint}`, {
    ...opts,
    headers: {
      "Authorization": `Bearer ${PAPERCLIP_API_KEY}`,
      "Content-Type": "application/json",
      ...opts.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Paperclip API ${res.status}: ${text}`);
  }
  return res.json();
}

function isIgnoredSender(from) {
  const lower = (from || "").toLowerCase();
  return IGNORE_SENDERS.some((p) => lower.includes(p));
}

function isVendorEmail(from) {
  const lower = (from || "").toLowerCase();
  return VENDOR_PATTERNS.some((p) => lower.includes(p));
}

function extractEmailData(execution) {
  const runData = execution?.data?.resultData?.runData || {};
  const triggerRuns = runData["Email Trigger (IMAP)"] || [];
  if (!triggerRuns.length) return [];

  const mainData = triggerRuns[0]?.data?.main?.[0] || [];
  return mainData
    .map((item) => item.json)
    .filter((email) => email && !isIgnoredSender(email.from));
}

function extractAIResponse(execution) {
  const runData = execution?.data?.resultData?.runData || {};
  const agentRuns = runData["AI Agent"] || [];
  if (!agentRuns.length) return null;

  const mainData = agentRuns[0]?.data?.main?.[0] || [];
  return mainData[0]?.json?.output || null;
}

function extractDraftStatus(execution) {
  const runData = execution?.data?.resultData?.runData || {};
  const draftRuns = runData["Create a draft"] || [];
  if (!draftRuns.length) return null;

  const status = draftRuns[0]?.executionStatus;
  return status === "success" ? "Draft created" : `Draft ${status || "unknown"}`;
}

function buildComment(execution, emails, aiResponse, draftStatus) {
  const lines = [`## Celeste n8n Sync`];
  lines.push(`**Execution:** #${execution.id} | **Status:** ${execution.status} | **Time:** ${execution.startedAt}`);
  lines.push("");

  if (emails.length === 0 && execution.status === "error") {
    const errMsg = execution?.data?.resultData?.error?.message || "Unknown error";
    lines.push(`**Error:** ${errMsg}`);
    return lines.join("\n");
  }

  for (const email of emails) {
    const type = isVendorEmail(email.from) ? "VENDOR" : "CUSTOMER";
    lines.push(`**${type} Email**`);
    lines.push(`- **From:** ${email.from}`);
    lines.push(`- **Subject:** ${email.subject || "(no subject)"}`);
    if (email.text) {
      const preview = email.text.substring(0, 300).replace(/\n/g, " ");
      lines.push(`- **Preview:** ${preview}${email.text.length > 300 ? "..." : ""}`);
    }
    lines.push("");
  }

  if (aiResponse) {
    lines.push("**Celeste's Response:**");
    lines.push(`> ${aiResponse.substring(0, 500).replace(/\n/g, "\n> ")}`);
    lines.push("");
  }

  if (draftStatus) {
    lines.push(`**Gmail:** ${draftStatus}`);
  }

  return lines.join("\n");
}

// --- Main ---

async function main() {
  if (!N8N_API_KEY) {
    console.error("Error: N8N_API_KEY is required. Set it as an environment variable.");
    process.exit(1);
  }
  if (!PAPERCLIP_API_KEY) {
    console.error("Error: PAPERCLIP_API_KEY is required. Set it as an environment variable.");
    process.exit(1);
  }

  const cursor = loadCursor();
  console.log(`Last synced execution: ${cursor.lastExecutionId || "never"}`);

  // Fetch recent executions
  const { data: executions } = await n8nFetch(
    `/executions?workflowId=${CELESTE_WORKFLOW_ID}&limit=25`
  );

  if (!executions.length) {
    console.log("No executions found.");
    return;
  }

  // Filter to only new executions (newer than cursor)
  const newExecs = cursor.lastExecutionId
    ? executions.filter((e) => Number(e.id) > Number(cursor.lastExecutionId))
    : [...executions];

  if (!newExecs.length) {
    console.log("No new executions since last sync.");
    return;
  }

  // Process oldest first
  newExecs.sort((a, b) => Number(a.id) - Number(b.id));
  console.log(`Found ${newExecs.length} new execution(s) to sync.\n`);

  let synced = 0;

  for (const exec of newExecs) {
    console.log(`--- Execution #${exec.id} (${exec.status}) ---`);

    // Skip canceled executions
    if (exec.status === "canceled") {
      console.log("  Skipped (canceled)");
      continue;
    }

    // Fetch full execution data
    const fullExec = await n8nFetch(`/executions/${exec.id}?includeData=true`);
    const emails = extractEmailData(fullExec);
    const aiResponse = extractAIResponse(fullExec);
    const draftStatus = extractDraftStatus(fullExec);

    // Skip if only system/notification emails
    if (emails.length === 0 && exec.status === "success") {
      console.log("  Skipped (no relevant emails)");
      continue;
    }

    const comment = buildComment(fullExec, emails, aiResponse, draftStatus);
    const isVendor = emails.some((e) => isVendorEmail(e.from));

    // Decide where to post
    if (isVendor) {
      // Post to vendor/sourcing related issues — find LUM-8 or similar
      console.log("  Vendor email detected — posting to sourcing issues");
      try {
        const { data: issues } = await paperclipFetch(
          `/companies/${COMPANY_ID}/issues?status=todo,in_progress,blocked&limit=50`
        );
        const sourcingIssue = issues.find(
          (i) => i.title?.toLowerCase().includes("sourcing") ||
                 i.title?.toLowerCase().includes("shopify") ||
                 i.title?.toLowerCase().includes("provision") ||
                 i.identifier === "LUM-8"
        );

        if (sourcingIssue) {
          await paperclipFetch(`/issues/${sourcingIssue.id}/comments`, {
            method: "POST",
            body: JSON.stringify({ body: comment }),
          });
          console.log(`  Posted to ${sourcingIssue.identifier}: ${sourcingIssue.title}`);
        } else {
          // Create a new sourcing update issue
          const newIssue = await paperclipFetch(`/companies/${COMPANY_ID}/issues`, {
            method: "POST",
            body: JSON.stringify({
              title: `Vendor update: ${emails[0]?.subject || "New email"}`,
              description: comment,
              assigneeAgentId: OPS_MANAGER_AGENT_ID,
              priority: "medium",
            }),
          });
          console.log(`  Created new issue: ${newIssue.identifier}`);
        }
      } catch (err) {
        console.error(`  Paperclip error: ${err.message}`);
      }
    } else if (emails.length > 0) {
      // Customer email — post to Celeste or create customer issue
      console.log("  Customer email detected");
      try {
        const newIssue = await paperclipFetch(`/companies/${COMPANY_ID}/issues`, {
          method: "POST",
          body: JSON.stringify({
            title: `Customer email: ${emails[0]?.subject || "New inquiry"}`,
            description: comment,
            assigneeAgentId: CELESTE_AGENT_ID,
            priority: "medium",
          }),
        });
        console.log(`  Created issue: ${newIssue.identifier}`);
      } catch (err) {
        console.error(`  Paperclip error: ${err.message}`);
      }
    } else if (exec.status === "error") {
      // Error execution — log it
      console.log(`  Error execution — logging for awareness`);
      const errComment = buildComment(fullExec, [], null, null);
      console.log(`  ${fullExec?.data?.resultData?.error?.message || "Unknown error"}`);
    }

    synced++;
  }

  // Update cursor to latest
  const latest = executions[0];
  saveCursor({
    lastExecutionId: latest.id,
    lastSyncedAt: new Date().toISOString(),
  });

  console.log(`\nSync complete. ${synced} execution(s) processed.`);
  console.log(`Cursor saved: execution #${latest.id}`);
}

main().catch((err) => {
  console.error("Sync failed:", err.message);
  process.exit(1);
});
