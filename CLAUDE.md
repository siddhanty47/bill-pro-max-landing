# BillProMax Landing Page

Static marketing/landing page. **Fully independent** — no API calls, no auth, no connection to the backend or frontend app.

## Tech

- Next.js 15 with App Router
- TypeScript
- Motion (Framer Motion) for animations
- Static export (`next build` produces `out/`)

## Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── page.tsx            # Home page — composes section components
│   └── globals.css         # Global styles
└── components/
    ├── Navbar/Navbar.tsx
    ├── Hero/Hero.tsx, TypingAnimation.tsx
    ├── Features/Features.tsx, FeatureCard.tsx
    ├── TerminalDemo/TerminalDemo.tsx
    ├── CTA/CTA.tsx
    ├── Footer/Footer.tsx
    ├── Container.tsx        # Shared max-width wrapper
    ├── ScrollReveal.tsx     # Scroll-triggered animation wrapper
    └── GridBackground.tsx   # Decorative background
```

## Styling

No inline styles. Use CSS classes in `globals.css` or component-level CSS files.

## Regression Risks

Minimal — this is an isolated static site. Only risks:
- If the **app URL** changes (e.g., `app.billpromax.com`), update any CTA links pointing to the main app
- If **branding** changes (name, logo), update Navbar, Hero, Footer, and metadata in `layout.tsx`
