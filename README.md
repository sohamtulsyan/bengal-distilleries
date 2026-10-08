# Bengal Distilleries

Corporate site for Bengal Distilleries, Kharagpur, West Bengal. React + Vite + TypeScript, static output.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs dist/ (includes 404.html for GitHub Pages)
```

## Content

Every name, figure, date and address except the company name, city and the 15,000 BBL capacity is **placeholder**. Replace it in `src/content/site.ts`; the pages read only from there.

The launch countdown reads `company.launchAt` (currently 12 October 2026, 8:00 PM IST).

Real footage: put MP4s in `public/media/` and set `company.heroVideo` / `company.facilityVideo`. Until then the hero draws a beer pour on canvas and the facility player runs a drawn four-stop tour.

## Inquiry form

There is no backend. Set `VITE_FORM_ENDPOINT` (e.g. a Formspree or Basin URL) at build time and the form POSTs JSON there. Without it, submitting opens a pre-filled email to the investor or general address.

## Deploying

**Vercel:** import the repo; framework preset Vite. `vercel.json` rewrites all routes to the app.

**GitHub Pages (project site):** build with the repo name as base path, then publish `dist/`:

```bash
BASE_PATH=/bengal-distilleries/ npm run build
```

`404.html` is a copy of the app shell, so deep links like `/about` load.
