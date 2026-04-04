#!/bin/bash
# Sync all n8n activity into local Paperclip
# Run this when you open your laptop or on a cron
#
# Usage: ./scripts/sync-all.sh
#
# Required env vars (or set them here):
#   N8N_API_KEY
#   PAPERCLIP_API_KEY

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Default keys — replace with your actual keys or export before running
export N8N_API_KEY="${N8N_API_KEY:-}"
export PAPERCLIP_API_KEY="${PAPERCLIP_API_KEY:-pcp_board_bd4f4cb1b08e458803050a05e7d346e22df2a2adfb0b3e50}"

if [ -z "$N8N_API_KEY" ]; then
  echo "Error: N8N_API_KEY not set"
  exit 1
fi

echo "=== Vendor & Email Sync ==="
node "$SCRIPT_DIR/vendor-sync.mjs"

echo ""
echo "=== Done ==="
echo "Check Paperclip board: http://localhost:3101/LUM/dashboard"
