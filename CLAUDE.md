# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The marketing website for **Perfect Care Laundry**, a real, operating premium laundry and garment-care business in Afienya, Ghana (perfectcarelaundrygh.com). It is a static, multi-page HTML site with no build system, no package manager, and no framework — plain HTML/CSS/vanilla JS served as-is.

Positioning: this is not a budget laundromat site — copy, layout, and visual polish should read as **trustworthy, professional, clean, convenient, and premium**, consistent with a garment-care service people trust with valuable clothing.

## Running / previewing

There is no build or dev-server command. Open the `.html` files directly in a browser, or serve the directory statically, e.g.:

```
npx serve .
# or
python -m http.server 8000
```

There are no tests, linters, or CI configured in this repo.

## Architecture

**Pages** (each is a fully self-contained HTML file, no templating/includes):
- `index.html` — home
- `about.html`, `services.html`, `areas-we-serve.html`, `gallery.html`, `faq.html`, `contact.html`, `book-pickup.html`, `thank-you.html`, `404.html`

Because there is no templating engine, the `<head>` (meta/SEO/Open Graph/structured data), the `<header>` nav, and the footer are **duplicated in every page**. When changing navigation, footer content, contact info, or global SEO/meta tags, you must edit **every** HTML file individually — there is no single source of truth to update.

**Shared assets:**
- `styles.css` — single global stylesheet for all pages, organized into clearly marked sections (RESET, DESIGN TOKENS, TYPOGRAPHY, LAYOUT, BUTTONS, TOP BAR, HEADER, MOBILE NAVIGATION, HERO, SECTION HEADING, SERVICES, WHY US, HOW IT WORKS, OUR PROMISE, CTA, RESPONSIVE, then per-page sections such as `ABOUT PAGE`, `AREAS WE SERVE`, `THANK YOU PAGE`, `FOOTER`, `GOOGLE MAP`, `GALLERY PAGE`, `LIGHTBOX`, `BOOK PICKUP FORM`, `WHATSAPP FLOATING BUTTON`). New page-specific styles should follow this pattern: add a clearly labeled `/* ... PAGE */` section rather than a separate stylesheet.
- `main.js` — single global script loaded on every page, split into clearly delimited feature blocks: AOS init, Lucide icon activation, mobile nav toggle (`#menuToggle` / `#navMenu`), gallery lightbox (`.gallery-item`, `#lightbox`), and the "Book Pickup" form handler which builds a WhatsApp deep link (`wa.me/233598963585`) from form field values rather than submitting to a backend. There is no backend — form "submission" across the site is via WhatsApp links or `mailto:`.
- `images/` — static image assets, including `images/Gallery/` (garment/service photos used by `gallery.html`'s lightbox via `data-title` / `data-desc` attributes on `.gallery-item` elements) and `images/about/` (photos used on the About page). `images/logo.png` is the brand logo; `images/favicon.png` is the favicon.

**Third-party dependencies** (all loaded via CDN `<script>`/`<link>` tags in each page, no npm install needed):
- Lucide icons (`unpkg.com/lucide@latest`)
- AOS – Animate On Scroll (`unpkg.com/aos@2.3.1`)
- Google Fonts: Fraunces + Inter (`<link>` in `<head>`)
- Google Analytics (gtag.js, measurement ID `G-SGV37VCJBQ`)

## Brand & visual identity

- **Brand name:** Perfect Care Laundry. Tagline on the logo: "Stay Clean Always."
- **Logo** (`images/logo.png`) is **black and orange**. `styles.css` design tokens match this:
  ```css
  --black:#1A1512;
  --orange:#EA580C;
  --orange-dark:#C2410C;   /* text/buttons on light backgrounds needing AA contrast */
  --orange-light:#FDEBDD;  /* soft tint backgrounds */
  --white:#FFFFFF;
  --background:#FCFCFA;
  --surface-alt:#FAF5F1;   /* alternating section backgrounds */
  --text:#1F2937;
  --muted:#6B7280;
  --border:#E9E2DB;
  --radius:22px;
  --shadow-sm/md/lg: rgba(26,21,18,…)-based
  ```
  Prefer these tokens over hardcoded colors in any new CSS. WhatsApp's own green (`#25D366`/`#1DA851`) and the success-checkmark green (`#2E7D5B`) are intentionally not part of this palette — leave them alone.
- **Font:** `body` in `styles.css` sets `font-family:'Poppins', sans-serif`, and every page (including `404.html`/`thank-you.html`) loads Poppins (weights 300–800) from Google Fonts identically. Keep new pages consistent with this.
- Any further palette/typography change beyond what's already in place should be treated as a **major design change** — explain and confirm before touching `:root` tokens or making broad sweeps, per the working conventions below.

## Business information (do not invent or alter without the user's say-so)

- Phone / WhatsApp: `+233 59 896 3585` (`tel:+233598963585`, `wa.me/233598963585`)
- Address: "Opposite Emefs Police Station, Mataheko–Afienya" — this is the single canonical form, used consistently in visible page content (top bar, footer, Google Maps link) **and** in the structured-data JSON-LD (`streetAddress: "Opposite Emefs Police Station, Mataheko"`, `addressLocality: "Afienya"`) across all 10 pages.
- Hours: Mon–Sat, 07:00–19:00 (7:00 AM – 7:00 PM)
- Structured data: `DryCleaningOrLaundry` JSON-LD block in every page's `<head>`, keyed to `https://www.perfectcarelaundrygh.com/#business`
- These details appear repeatedly across structured data, the top bar, footer, and page content in every HTML file — if the user gives you a real, confirmed change (e.g. new hours), update it **everywhere it appears**, not just one page.

## Working conventions

- **Preserve first.** Existing business information, page structure, branding, content, and functionality are real and correct until the user explicitly says otherwise. Never invent or replace real business details (phone, address, hours, service descriptions) with placeholder or assumed content.
- **Don't delete pages or functionality** (a page, a section, a JS feature, a form) without asking first.
- **Explain before major changes.** Before any significant design or structural change (new page layout, palette shift, nav restructuring, removing/merging sections), explain what you intend to change and why, and get confirmation first. Small, obviously-scoped fixes (typo, broken link, alt text) don't need this.
- **Prefer improving existing code over rebuilding.** This is a small, working, hand-built site — edit in place, follow the existing section-comment conventions in `styles.css` and `main.js`, don't rewrite files wholesale or introduce a build system/framework unless explicitly asked.
- **Stay in scope.** Don't make unrelated changes while doing a specific task.
- Keep new pages consistent with existing ones: same `<head>` boilerplate (meta tags, Open Graph, canonical URL, `DryCleaningOrLaundry` JSON-LD), same header/nav markup, same script include order (`lucide` → `aos` → `main.js`), same CSS section-comment style.
- No CSS/JS bundling or minification is in place; edit `styles.css` and `main.js` directly and they take effect immediately on refresh.

### Design quality bar

- Mobile responsiveness is a top priority — check the `RESPONSIVE` sections in `styles.css` and verify changes at mobile widths, not just desktop.
- Keep accessibility in mind: semantic HTML, meaningful `alt` text, focus states, `aria-*` attributes already used in nav/lightbox (`aria-expanded`, `aria-hidden`, `aria-label`, `aria-current`) should be maintained in new markup.
- Keep SEO and performance in mind: meta tags, Open Graph, structured data, and image sizing/optimization matter on a local-business marketing site.
- Use the **UI/UX Pro Max** skill for significant UI/UX decisions (layout, palette, typography, component patterns).
- Use **21st.dev** when an appropriate component or design resource would materially improve the site, rather than hand-rolling something it already solves well.

### After making changes

Verify: internal links resolve, images load (correct paths under `images/`), the Book Pickup form still builds a valid WhatsApp link, the gallery lightbox still opens/closes, the mobile nav toggle still works, and responsive layouts still hold at mobile/tablet widths — before reporting a change as done.
