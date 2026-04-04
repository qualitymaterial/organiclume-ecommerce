#!/bin/bash
# Start Paperclip with auto-sync
# Usage: ./start-paperclip.sh
#
# 1. Syncs vendor/customer emails from n8n → Paperclip
# 2. Starts Paperclip dev server

DIR="$(cd "$(dirname "$0")" && pwd)"

export N8N_API_KEY="${N8N_API_KEY:-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDM1MTdiYi1jYTRjLTQzM2QtYjYzNy1lNDg1NjQxMThmZDEiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiY2U0MTExODUtNWZkNC00NDE0LWIzNGItNWY0NmY0MWFiYWY2IiwiaWF0IjoxNzc1MzE5MzIxLCJleHAiOjE3Nzc4NjcyMDB9.96AJDzoHz4q-KPcLauTO_ol1y6ygD62Y_-FXIfAiRv0}"
export PAPERCLIP_API_KEY="${PAPERCLIP_API_KEY:-pcp_board_bd4f4cb1b08e458803050a05e7d346e22df2a2adfb0b3e50}"

echo "🔄 Syncing n8n emails → Paperclip..."
node "$DIR/scripts/vendor-sync.mjs" 2>&1 || echo "(sync skipped — Paperclip may not be ready yet)"

echo ""
echo "🚀 Starting Paperclip..."
cd "$DIR/paperclip" && pnpm dev
