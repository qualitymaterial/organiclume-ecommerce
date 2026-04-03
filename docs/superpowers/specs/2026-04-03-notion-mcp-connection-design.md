# Design Doc: Notion MCP Connectivity Fix

**Goal:** Enable the Notion Model Context Protocol (MCP) server in the Antigravity platform by correcting the package name in `mcp_config.json` and verifying the connection.

## 1. Problem Statement
The current Notion MCP server configuration in `~/.gemini/antigravity/mcp_config.json` is pointing to `@modelcontextprotocol/server-notion`. This package does not exist on NPM, resulting in a 404 error and preventing the server from loading.

## 2. Proposed Solution
Update the configuration to use the official, verified package name: `@notionhq/notion-mcp-server`.

## 3. Configuration Change
*   **Target File:** `/Users/briananderson/.gemini/antigravity/mcp_config.json`
*   **Action:** Replace the `notion` server definition.
*   **New Definition:**
    ```json
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "NOTION_TOKEN": "YOUR_NOTION_TOKEN_HERE"
      }
    }
    ```

## 4. Verification Plan
1.  **Save the Configuration:** Apply the changes to the JSON file.
2.  **Platform Reload:** Wait for the platform to detect the change and attempt to start the server.
3.  **Discovery Test:** Use the `list_resources` or `list_notebooks` equivalent to see if `notion` tools become available.
4.  **Functional Test:** Attempt to call a simple tool like `search` or `list_databases` if tools are discovered.

## 5. Success Criteria
*   The `notion` MCP server is recognized by the Antigravity session.
*   Notion-specific tools (e.g., `mcp_notion_search`) are available for use.
*   A test call successfully retrieves data from the user's Notion workspace.
