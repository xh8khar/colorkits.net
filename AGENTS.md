# ColorKits

Color tools for developers — converters, palettes, accessibility checkers, and utilities. All client-side, no server uploads.

## Stack

- **Framework:** Next.js 16 (App Router, static export)
- **Styling:** Tailwind CSS v4 (CSS-first, no config file)
- **Dark mode:** Class-based (`.dark`), localStorage toggle, inline script to prevent flash
- **Hosting:** Static export via `output: 'export'` → `./out/`
- **Nav config:** `config/navigation.json` — edit navbar menu items without touching TypeScript

## Project Structure

```
config/
├── navigation.json        # Editable nav menu (add/reorder/remove items)
scripts/
├── generate-tool-pages.js  # Script to regenerate tool page boilerplate
src/
├── app/
│   ├── globals.css          # Tailwind v4 + custom properties + dark mode
│   ├── layout.tsx           # Root layout: Navbar + <main> + Footer + ToastProvider
│   ├── page.tsx             # Homepage → renders <HomeContent />
│   ├── sitemap.ts           # Dynamic sitemap
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── cookies/page.tsx
│   ├── disclaimer/page.tsx
│   ├── blog/                # Blog listing + [slug]/page.tsx (12 posts)
│   ├── learn/               # Learn listing + [slug]/page.tsx (10 articles)
│   └── {tool-slug}/         # Tool pages (page.tsx + ToolPageClient.tsx)
├── components/
│   ├── home/
│   │   ├── HomeContent.tsx  # Hero, search, category filters, tool grid
│   │   └── ToolCard.tsx     # Tool card with icon, name, badge, color swatch
│   ├── layout/
│   │   ├── Navbar.tsx       # Sticky nav with dropdowns + mobile hamburger
│   │   ├── Footer.tsx       # 4-column footer + copyright
│   │   └── ThemeToggle.tsx  # Dark/light toggle (localStorage + class toggle)
│   ├── tools/
│   │   ├── ToolLayout.tsx   # Dual-panel layout (input textarea + output + actions)
│   │   ├── InputPanel.tsx   # Textarea with file upload support
│   │   └── OutputPanel.tsx  # Readonly textarea with optional color swatch preview
│   └── ui/
│       ├── Button.tsx       # Reusable button (primary/secondary/ghost/danger)
│       └── Toast.tsx        # Toast notification context + provider
├── lib/
│   ├── navigation.ts        # navItems from config/navigation.json + tools[] (grid data)
│   ├── converters.ts        # 55+ color conversion functions (HEX, RGB, HSL, CMYK, LAB, LCH, OKLab, OKLCH, HWB…)
│   ├── blog/posts.ts        # 12 blog posts (BlogPost[])
│   ├── learn/posts.ts       # 10 learn articles (BlogPost[])
│   └── site.ts              # SITE_URL constant
└── types/
    └── index.ts             # Tool, ToolCategory, NavItem, BlogPost, FAQItem, Toast
```

## Layout Architecture

- **RootLayout**: `<html suppressHydrationWarning>` → `<body flex flex-col>` → `ToastProvider` → `Navbar` + `<main flex-1>` + `Footer`
- **Dark mode**: Inline `<script>` in `<head>` reads `localStorage('theme')` and toggles `.dark` class before React hydrates.
- **Navbar**: Desktop = horizontal nav with dropdowns; Mobile = hamburger with accordion expand. Auto-closes on route change.

## Color Scheme

- Primary brand: rose-500 (`#f43f5e`)
- Category badges: converter=blue, palette=purple, gradient=pink, accessibility=emerald, picker=amber, image=orange, adjustment=teal, reference=indigo, utility=cyan
- CSS custom properties in `globals.css`: `--bg`, `--text`, `--border`, `--primary`, etc.

## Tool Page Pattern

Each tool = `src/app/{slug}/page.tsx` (server, metadata) + `ToolPageClient.tsx` (client, uses `ToolLayout`):

```tsx
// page.tsx
import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'
export const metadata: Metadata = { title: 'HEX to RGB', description: '...' }
export default function Page() { return <ToolPageClient /> }
```

```tsx
// ToolPageClient.tsx
'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { hexToRgb } from '@/lib/converters'
const example = '#ff0044'
export default function ToolPageClient() {
  return <ToolLayout title="HEX to RGB" description="..." onConvert={hexToRgb} exampleInput={example} colorPreview="#ff0044" />
}
```

## Hosting (Cloudflare Pages)

- Static export to `./out/`
- `public/_headers` — security & cache headers for Cloudflare Pages
- No custom domain yet → deployed at `https://colorkits.pages.dev`
- To change URL, update `src/lib/site.ts` (single source of truth for `SITE_URL`)

## Commands

```bash
npm install      # Install deps
npm run dev      # Dev server (http://localhost:3000)
npm run build    # Static export → ./out/
```

## Status

- ✅ Layout (Navbar, Footer, ThemeToggle, Toast)
- ✅ Homepage (hero, search, category cards, tool grid)
- ✅ Tool page components (InputPanel, OutputPanel, ToolLayout)
- ✅ Boilerplate pages (about, contact, privacy, terms, cookies, disclaimer)
- ✅ Blog (12 posts) + Learn (10 articles)
- ✅ Sitemap (includes tools, blog, learn)
- ✅ Cloudflare Pages headers
- ✅ Color converter library (55+ functions)
- ✅ 300 tool pages (page.tsx + ToolPageClient.tsx)
- ✅ Editable nav config (config/navigation.json)
- ⬜ Favicon / OG images / public assets
