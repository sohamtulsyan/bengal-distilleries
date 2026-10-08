# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + Vite + TypeScript, static output. Must host on GitHub Pages or Vercel with no server. `BASE_PATH` sets the sub-path for Pages; `vercel.json` rewrites routes; the build copies `index.html` to `404.html` for Pages deep links.

## Users

- **Investors and distribution partners** judging whether Bengal Distilleries is a credible commercial bet. They scan for capacity, margins, distribution plan, round status, and the team.
- **Trade buyers** (bars, taprooms, retailers, hospitality) deciding whether to stock the first commercial release.
- **Press and drinkers** curious about the brand.

## Product Purpose

Corporate site for Bengal Distilleries, Kharagpur, West Bengal, India: a new distillery that launches with a flagship craft beer and then moves into barrel-aged spirits. Success is a qualified inquiry: an investor deck request, a stocking inquiry, or a press contact.

## Positioning

A distillery that brews first. Beer cash flow (weeks to market) funds spirit maturation (years to market), and the same grain, brewhouse, and team feed both. The brand is rooted in Kharagpur and Bengal ingredients.

## Capabilities and Constraints

- Pages: Home, About, Products, Get in Touch. Flagship product: Heimer Strong, launching 12 October 2026 (site-wide countdown).
- 21+ age gate on first visit (legal drinking age in West Bengal), remembered in browser storage.
- Inquiry form has two tracks (general/distribution, investor relations). No backend: posts to `VITE_FORM_ENDPOINT` when set, otherwise opens a pre-filled email.
- Light mode is the default; dark mode via toggle in header and footer.

## Brand Commitments

From the client brief: deep pine `#14281D`, gold `#DEB841`, crimson `#A30000`, whites `#FFFFFF` / `#F9F9FB` / `#FFFCFF`. Tone: "loud craft spirit meets serious balance sheet." Retro, slightly flashy, stamp badges, marquee ribbons, gold foil, anchored by clean editorial grids.

## Evidence on Hand

Only the company name, city, and the brief's "15,000 BBL" capacity figure are supplied. **Everything else is placeholder** (beer name and specs, team, funding figures, milestones, address details, contact details) and lives in `src/content/site.ts` for replacement. Do not present placeholders as verified facts elsewhere. No photography or film exists yet; hero and facility media are drawn placeholders with slots for real video.

## Product Principles

1. Investors must find the numbers in seconds; the flash never hides the ledger.
2. Local is the moat: Kharagpur, Bengal grain, nolen gur, mahua.
3. Every figure is replaceable from one content file.

## Accessibility & Inclusion

WCAG AA contrast in both themes, keyboard-operable controls including the age gate and media player, reduced-motion respected.
