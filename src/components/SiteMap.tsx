import { useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";
import { company } from "../content/site";

/** Schematic locator for the facility. Not to scale; links out to a real map. */
export function SiteMap() {
  const [open, setOpen] = useState(true);
  return (
    <div className="sitemap">
      <svg viewBox="0 0 520 360" className="sitemap__svg" role="img" aria-labelledby="map-title map-desc">
        <title id="map-title">Schematic map of Kharagpur</title>
        <desc id="map-desc">
          Bengal Distilleries sits at Vidyasagar Industrial Park, north-west of Kharagpur junction, with the IIT campus to the
          west and National Highway 16 to the east.
        </desc>
        <rect width="520" height="360" className="sitemap__ground" />
        {/* river */}
        <path d="M-10 312 C120 290 200 336 330 318 S470 300 540 330" className="sitemap__river" />
        {/* highway */}
        <path d="M410 -10 C400 90 380 170 400 250 S430 330 440 380" className="sitemap__road" />
        <text x="418" y="64" className="sitemap__label">NH 16</text>
        {/* rail lines out of the junction */}
        <g className="sitemap__rail">
          <path d="M300 210 L520 120" />
          <path d="M300 210 L120 -10" />
          <path d="M300 210 L330 380" />
          <path d="M300 210 L-10 230" />
        </g>
        {/* IIT campus */}
        <rect x="140" y="170" width="96" height="70" rx="10" className="sitemap__zone" />
        <text x="188" y="210" textAnchor="middle" className="sitemap__label">IIT Kharagpur</text>
        {/* junction */}
        <circle cx="300" cy="210" r="9" className="sitemap__junction" />
        <text x="314" y="236" className="sitemap__label">Kharagpur Jn</text>
        {/* industrial park */}
        <rect x="150" y="54" width="120" height="66" rx="10" className="sitemap__zone sitemap__zone--site" />
        <text x="210" y="138" textAnchor="middle" className="sitemap__label">Vidyasagar Industrial Park</text>
        <path d="M210 88 L210 120 L300 210" className="sitemap__route" />
      </svg>

      <button
        type="button"
        className="sitemap__pin"
        aria-expanded={open}
        aria-controls="map-card"
        onClick={() => setOpen((o) => !o)}
      >
        <MapPin aria-hidden="true" />
        <span className="sr-only">{open ? "Hide" : "Show"} address</span>
      </button>

      {open && (
        <div id="map-card" className="sitemap__card">
          <strong>Bengal Distilleries</strong>
          {company.address.map((l) => (
            <span key={l}>{l}</span>
          ))}
          <a href={company.mapsUrl} target="_blank" rel="noreferrer" className="text-link">
            <ExternalLink aria-hidden="true" />
            Open in Google Maps
          </a>
        </div>
      )}
      <span className="sitemap__scale">Not to scale. 9 km from Kharagpur junction.</span>
    </div>
  );
}
