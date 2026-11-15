# Landing Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the terminal-styled landing page with the approved scroll-driven design (prototype v3), as Next.js components.

**Architecture:** One client-side `ScrollProvider` owns Lenis, a single rAF scroll loop, and the snap-on-idle logic; sections register `(y) => void` updaters and mutate DOM through refs. Each section is its own component + CSS module. Static export unchanged.

**Tech Stack:** Next.js 15 (static export), React 19, TypeScript, CSS modules, `lenis`, `next/font/google`.

**Spec:** `docs/superpowers/specs/2026-11-15-landing-revamp-design.md` (prototype: `docs/superpowers/specs/assets/landing-revamp-prototype.html`).

## Global Constraints

- Colours unchanged: `--bg-deepest #000`, accent `#00cc88`, status colours as in `globals.css`.
- No JSX `style={}` (repo rule). Per-frame transforms and computed delays are set from effects via refs.
- Fonts: Archivo (axes `wdth`), Inter, JetBrains Mono, Caveat via `next/font/google`.
- App links: `https://app.billpromax.com/signup`. Contact `billpromax.v2@gmail.com`.
- Breakpoint 860px for mobile behaviour; `prefers-reduced-motion` disables Lenis, snap, animations.
- No terminal cues: no `[BRACKETS]`, `_` cursor, `//` labels, bash windows.
- Gate: `npx tsc --noEmit` and `npm run build` pass (repo has no tests/lint config).

## Review Focus

- Reduced motion: page fully readable, story shows final state (bill + total) not a blank stage.
- Mobile ≤860px: no horizontal overflow; What's-inside panels stack and animate on view; no snap.
- Resizing across 860px: track transform cleared on mobile; pinned heights recalc.
- Anchor links (`#how-it-works`, `#features`, `#close`) glide via Lenis and work without JS smooth scroll.
- Static export: no `window` access during render (all in effects).

---

### Task 1: Foundation — tokens, fonts, scroll engine

**Files:** Modify `src/app/globals.css`, `src/app/layout.tsx`, `package.json`. Create `src/components/scroll/ScrollProvider.tsx`, `src/components/scroll/useScrollUpdate.ts`, `src/lib/motion.ts`.

**Interfaces — Produces:**
- `clamp(v, a=0, b=1)`, `seg(p, a, b)`, `easeOut(t)`, `progressOf(el): number` (0..1 through a pinned section) in `src/lib/motion.ts`.
- `<ScrollProvider>` with context `{ lenis: Lenis | null; isMobile(): boolean; reduced: boolean }` via `useScroll()`.
- `useScrollUpdate(cb: () => void)` registers cb on the shared loop (runs on scroll + resize + mount).
- CSS tokens added: `--font-display`, `--font-sans`, `--font-mono`, `--font-hand`, `--ease-out`, `--radius-btn: 6px`, `--radius-card: 12px`, `--radius-panel: 20px`, `--grid-line`; global `.gridBg` utility, `.mono`.

- [ ] Install `lenis@1.3.27`; load fonts in `layout.tsx` as CSS variables; rewrite `globals.css` header/typography/radius tokens (colours kept).
- [ ] Implement `ScrollProvider` (Lenis desktop only, anchor-link interception, snap-on-idle to `[data-snap]` tops and `[data-snap-pin]` ends within 30vh, disabled on mobile/reduced).
- [ ] `npx tsc --noEmit` passes. Commit.

### Task 2: Nav, Hero, Footer

**Files:** Rewrite `src/components/Navbar/*`, `src/components/Hero/*` (delete `TypingAnimation.tsx`), `src/components/Footer/*`. Create `src/components/Hero/ScaffoldDrawing.tsx`.

- [ ] Nav: fixed, frosted after 40px, progress bar, scaffold mark + "Bill Pro Max", links per spec.
- [ ] Hero: word blur-in headline, lede, CTAs, self-drawing scaffold with callouts, parallax/fade via `useScrollUpdate`, scroll hint.
- [ ] Footer: slim; contact mail, Privacy/Terms.
- [ ] tsc passes. Commit.

### Task 3: Story section (challan → bill)

**Files:** Create `src/components/Story/Story.tsx`, `Story.module.css`, `PaperChallan.tsx`, `DigitalChallan.tsx`, `BillCard.tsx`.

- [ ] Pinned 320vh (`data-snap-pin`, id `how-it-works`); scrub thresholds from prototype: scan `.05–.30`, paper→digital `.33–.48`, rows from `.38` step `.035`, bill `.62–.76`, bill rows from `.70`, total `.82–.95` → `₹5,522.40` (en-IN, 2dp); step index `<.32→0, <.60→1, else 2`.
- [ ] Reduced motion: render final state.
- [ ] tsc passes. Commit.

### Task 4: What's inside (horizontal track) + panels

**Files:** Create `src/components/Inside/Inside.tsx`, `Inside.module.css`, `panels/{AssistantPanel,SearchPanel,StockPanel,BillingPanel,PortalPanel}.tsx`, `panels/panels.module.css`.

**Interfaces:** each panel takes `{ active: boolean }`; animations (re)start when `active` flips true.

- [ ] Pinned 520vh (`data-snap-pin`, id `features`); `translate3d(-p * (scrollWidth - innerWidth + 80))`; active = `round(p*(n-1))`; rail tabs.
- [ ] Mobile: vertical stack, IntersectionObserver (threshold .35) activates once.
- [ ] Panels per spec (search types "sharma" at 220ms/char with live filter + highlight; billing counters 47 / ₹12,34,500).
- [ ] tsc passes. Commit.

### Task 5: Close, page assembly, cleanup, docs

**Files:** Create `src/components/Close/*`. Modify `src/app/page.tsx`, `CLAUDE.md`. Delete `Features/`, `TerminalDemo/`, `CTA/`, `shared/ScrollReveal.tsx`, `shared/GridBackground.*` if unused.

- [ ] Close section with tower levels toggled by scroll; reveal on view.
- [ ] Compose page inside `ScrollProvider`; remove dead components; update CLAUDE.md structure + motion notes.
- [ ] `npx tsc --noEmit && npm run build` pass; browser check desktop 1440 + mobile 390 (no overflow, no console errors). Commit.
