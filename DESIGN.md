# Design system

"Loud craft spirit meets serious balance sheet." Retro Bengal beer-label flash (stamps, foil, marquee ribbons, tiger stripes, Bengali lettering) sits on a clean editorial grid so the investor numbers read first.

## Tokens (`src/styles/tokens.css`)

| Token | Hex | Role |
| --- | --- | --- |
| `--pine` | `#14281D` | Light-mode text, dark-mode page, dark bands, footer |
| `--pine-deep` | `#0D1C14` | Dark-mode cards, player frame |
| `--gold` | `#DEB841` | Fills (buttons, stamps, meters), foil, glows, focus in dark |
| `--crimson` | `#A30000` | Primary CTA, urgency stamps, marquee, focus in light |
| `--white` / `--off-white` / `--paper` | `#FFFFFF` / `#F9F9FB` / `#FFFCFF` | Light page, inputs, text on dark |
| `--copper` | `#B8743A` | Stills, spirit pipeline, player inner ring |

Components use semantic tokens (`--bg`, `--surface`, `--text`, `--text-muted`, `--border`, `--accent-text`, `--band-*`), redefined under `:root[data-theme="dark"]`. Light is the default; the head script in `index.html` applies a stored choice before paint.

Contrast rules: gold is never text on white. In light mode, accent text is crimson; in dark mode it is gold. Gold foil text appears only on pine grounds.

## Type

- **Rozha One** (display): headings, figures, can lettering. High-contrast Indian poster serif.
- **Archivo Variable** (UI and body), using the width axis: expanded black for the wordmark, condensed 800 uppercase for stamps and marquee, normal width for reading.
- **Galada** for Bengali (হাইমার, নলেন গুড়) only.

## Components

- **Stamp** (`.stamp`, `-gold`, `-crimson`, `-outline`): rubber-stamp badge, uppercase condensed. Use for status (Batch 001, Limited first run, In progress), never as an eyebrow above a heading.
- **Corners**: sharp. Every radius token is 0. No pills or circles except the seal and the can.
- **Buttons**: crimson default, `btn-gold`, `btn-ghost`. Square, 2px border, lift and gold ring on hover, press-down on active.
- **Launch banner**: crimson bar above the header on every page, counting down to `company.launchAt`; switches to an "out now" line after launch.
- **Bands** (`.band`): dark pine sections for the facility tour and the production process. Cards inside use `--band-card` with gold/20 borders.
- **`.lift`**: card hover, slight scale plus gold glow (brief requirement).
- **Seal**: circular stamp emblem; spins slowly in hero and footer only.
- **BeerCan**: authored SVG with pointer tilt and moving specular.
- **StageArt**: schematic production drawings (mash, brew, ferment, still, cask), always on a dark ground.

## Motion

One authored moment: the hero entrance (lines rise out of blur, foil sweeps, seal stamps down), held until the age gate is dismissed. Everything else answers input (tabs, toggle, drawer, player). Marquee and seal rotation are the only ambient loops. `prefers-reduced-motion` stops all of it.
