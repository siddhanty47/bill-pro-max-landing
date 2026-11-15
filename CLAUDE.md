# BillProMax Landing Page

Static marketing/landing page. **Fully independent** — no API calls, no auth, no connection to the backend or frontend app.

## Tech

- Next.js 15 with App Router, static export (`next build` produces `out/`)
- TypeScript, CSS modules
- [Lenis](https://github.com/darkroomengineering/lenis) for smooth scrolling; no other animation library (CSS keyframes + small rAF helpers)
- Fonts via `next/font/google`: Archivo (display), Inter (text), JetBrains Mono (numbers only), Caveat (handwritten challan illustration)

## Structure

```
src/
├── app/
│   ├── layout.tsx            # Fonts, metadata, JSON-LD
│   ├── page.tsx              # Composes sections inside <ScrollProvider>
│   └── globals.css           # Tokens + global utilities (.gridBg, .eyebrow, .display, .btn, .textLink)
├── lib/
│   ├── motion.ts             # clamp/seg/easeOut, progressOf(), countUp(), media queries
│   └── site.ts               # APP_URL, SIGNUP_URL, CONTACT_EMAIL
└── components/
    ├── scroll/ScrollProvider.tsx   # Lenis, shared scroll loop (useScrollUpdate), snap-on-idle, anchor glide
    ├── Navbar/                     # Fixed nav, frosted on scroll, progress line
    ├── Hero/                       # Headline + self-drawing ScaffoldDrawing.tsx
    ├── Story/                      # Pinned, scroll-scrubbed: paper challan → digital challan → bill
    ├── Inside/                     # Pinned horizontal track of 5 feature panels (panels/*.tsx)
    ├── AlsoIncluded/               # Crawlable list of smaller features (keeps SEO text coverage)
    ├── Close/                      # Final CTA, tower builds on scroll
    ├── Footer/
    └── shared/BrandMark.tsx        # Scaffold logo mark
```

## Design Rules

- Colours match the app (black base, `#00cc88` accent). **No terminal styling**: no monospace body text, `[BRACKET]` buttons, `_` cursors, `//` labels or fake shell windows. Monospace is for numbers, amounts and document numbers only.
- Avoid generic AI-landing tropes (pill "New" badges, gradient shimmer text, glow blobs, emoji icons, icon-card grids). Visuals come from the trade: blueprint grid, scaffold drawings, paper challans, realistic app screens.

## Motion

- Per-frame work goes through `useScrollUpdate(cb)` and mutates DOM via refs. Never set React state every frame.
- Pinned sections use `data-snap-pin` (snaps to start and end); plain sections use `data-snap`. Snap only runs on desktop with Lenis.
- `STACKED_QUERY` (≤860px or `prefers-reduced-motion`) turns the horizontal track into a vertical stack; reduced motion also shows the Story's finished state and disables Lenis/snap.

## Styling

No inline `style={}` in JSX. Use CSS modules or `globals.css`. Data-driven values (bar widths, stagger delays, scroll transforms) are set from effects via refs.

## Regression Risks

Minimal — this is an isolated static site. Only risks:
- If the **app URL** changes (e.g., `app.billpromax.com`), update any CTA links pointing to the main app
- If **branding** changes (name, logo), update Navbar, Hero, Footer, and metadata in `layout.tsx`
