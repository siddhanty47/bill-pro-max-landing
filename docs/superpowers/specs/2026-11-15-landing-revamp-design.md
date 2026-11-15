# Landing Page Revamp — Design

**Status:** approved 2026-11-15 (prototype v3 accepted: "looks perfect").
**Reference prototype:** `docs/superpowers/specs/assets/landing-revamp-prototype.html` (open in a browser; the build ports it).

## Why

The current page reads as a terminal/CLI app (monospace everywhere, `[BRACKET]` buttons, `_CURSOR` wordmark, fake bash windows). Bill Pro Max is not a terminal app, so this misleads. The page also looks dated and AI-template-like. Goal: an authentic, premium, Apple-grade scroll experience whose visuals come from the trade itself (scaffold, paper challan book) and show what users actually see in the app.

## Goals

- Keep the colour theme: black base, `#00cc88` green accent, existing status colours.
- Remove every terminal cue.
- Smooth scrolling with gentle snap to section edges; scroll-driven ("scrollytelling") sections.
- Each feature illustrated with a realistic, animated app-screen vignette.
- A few "wow" moments: self-drawing scaffold hero, scrubbed challan→bill story, horizontal feature track, tower that builds at the close.
- Works on phones; respects `prefers-reduced-motion`.

## Anti-goals (what would make it fail even if it works)

- Generic AI-landing tropes: "New" pill badges, gradient shimmer text, glow blobs, orbs, emoji icons, `⌘K` key chips as decoration, glassmorphism cards, 12-card icon grids, "3 simple steps", hype copy ("on autopilot", "supercharge").
- Scroll-jacking on touch devices.
- Hard snapping mid-story.

## Approaches considered

1. **Colours-only refresh (sans everywhere)** — cleanest break from terminal, loses continuity with the app.
2. **Colours + monospace for numbers only** — *chosen by user (B)*. Archivo/Inter for words, JetBrains Mono only for amounts, document numbers and figures, matching the app's numeric display.
3. Keep monospace body — rejected; keeps the terminal impression.

Hero: user picked **A (product reveal: big headline, product revealed below)**, then rejected the generic look of v1 → v2/v3 "from the challan book to the bill" direction.

## Design

- **Type:** Archivo (variable `wdth`, display, ~112% stretch, 800 weight; light 300 for second lines), Inter (body), JetBrains Mono (numbers/labels), Caveat (handwriting on the paper challan only).
- **Shape:** 6px buttons, 12–20px card radii, hairline borders, blueprint 48px grid backgrounds faded with masks. No glow blobs; shadows only to lift floating app cards.
- **Sections** (in order):
  1. **Nav** — fixed; transparent → frosted on scroll; scroll progress line on top; scaffold-mark wordmark "Bill Pro Max". Links: How it works, What's inside, Start free (→ app signup). Mobile: links collapse to the Start free link.
  2. **Hero** — kicker "For scaffolding rental businesses"; headline "Every pipe, coupler and plank. / Accounted for." words blur-in; lede + "Start free" + "Watch a challan become a bill ↓". Scaffold SVG draws itself with dimension annotations and item callouts; parallax fade on scroll; scroll hint.
  3. **Story** (`#how-it-works`, pinned 320vh) — "From the challan book to the bill." Scrubbed by scroll: scan line over paper challan → digital challan rows fill → bill slides in with per-line calc, CGST/SGST, total counts to ₹5,522.40. Three steps highlight in sync; bottom progress bar.
  4. **What's inside** (`#features`, pinned 520vh, horizontal track) — numbered rail (01–05). Panels: Assistant (chat → confirm payment), Search (types "sharma", live filtering), Stock (truck yard↔site, at-site/yard/damaged bars), Billing (47 tiles, counters, GST split), Portal (share link → phone statement).
  5. **Close** — "Close the month in an afternoon." + Start free; scaffold tower builds per scroll.
  6. **Footer** — slim; keeps contact email `billpromax.v2@gmail.com`, Privacy/Terms placeholders.
- **Motion engine:** Lenis smooth scroll (desktop, non-reduced-motion). One rAF-driven scroll loop; components register update callbacks and mutate DOM via refs (no React re-render per frame). Snap: 180ms after scroll stops, if within 30% of viewport of a section top or pinned-section end, glide there (0.9s). No snapping on mobile or reduced motion.
- **Mobile (≤860px):** single column; story stays pinned but shows only the active step; horizontal track becomes a vertical stack, each panel animates on view (IntersectionObserver).
- **Reduced motion:** no Lenis, no snap, animations collapse to end states.

## Copy notes (builder's calls, flagged to user)

- Sample data (Sharma Builders, Andheri, item names, amounts) is illustrative.
- No Pricing link (no pricing page exists).
- "View demo" (`/demo`, nonexistent) replaced by the in-page story anchor.

## Out of scope

- `og-image.png` is referenced in metadata but missing from `public/` (pre-existing).
- Real Privacy/Terms pages.
