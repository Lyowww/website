# Website copy (for content editors)

All customer-facing text for the marketing site lives in JSON:

- **English:** `content/copy/en.json`
- **Armenian:** `content/copy/hy.json`

Edit those files only. The app loads them at build/runtime and wires Lucide icons from string keys.

## Rules

1. **Do not rename JSON keys** (nested property names). The site expects a fixed structure.
2. **Keep `locale` accurate:** `"en"` in `en.json`, `"hy"` in `hy.json`.
3. **`icon` fields** must be one of the allowed keys listed in `lib/content-icons.ts` (`ICON_KEYS`). If you use an unknown key, the site falls back to a default icon and logs a warning in development.

## After editing

Commit the JSON files and deploy as usual. Run `npm run lint` and `npm run build` locally if you want to confirm nothing broke before pushing.

Technical wiring lives in `lib/site-content.ts` (hydration) and `lib/content-icons.ts` (icon registry).
