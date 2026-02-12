# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the Project

No build system or package manager is used. To serve the app locally:

```bash
python -m http.server 8000
# then open http://localhost:8000/bucket-list-main/
```

Or open `bucket-list-main/index.html` directly in a browser.

## Architecture

The main app lives in `bucket-list-main/` and is split into two JS modules:

**`js/storage.js` — `BucketStorage` singleton**
Owns all data: LocalStorage reads/writes and CRUD operations. The data model is a flat JSON array stored under the `bucketList` key. Each item has `id` (timestamp string), `title`, `completed`, `createdAt`, and `completedAt`.

**`js/app.js` — `BucketListApp` ES6 class**
Owns all UI: DOM caching, event binding, rendering, and modal management. It calls into `BucketStorage` for every state change and calls `render()` to do a full DOM redraw after each operation.

**Data flow:** User action → `BucketListApp` event handler → `BucketStorage` mutation → `LocalStorage` → `BucketListApp.render()` → DOM update.

**XSS protection** is applied in `createBucketItemHTML()` via manual character escaping before injecting user content into innerHTML.

## Claude Workspace Config

- `.claude/settings.local.json` sets `"outputStyle": "Learning"` — all sessions use the learning style by default.
- `.claude/Intermediate.md` defines the persona: core-logic-focused explanations with design pattern commentary.
- `.claude/Test/main.js` is a standalone scratch file, not connected to the main app.
