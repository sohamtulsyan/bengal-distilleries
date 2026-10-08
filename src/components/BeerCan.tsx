import { useId, useRef, type PointerEvent } from "react";

type Props = {
  className?: string;
  /** Tilt toward the pointer (hover devices only, off under reduced motion). */
  interactive?: boolean;
  label?: string;
};

const BODY =
  "M46 24 C30 30 20 40 20 58 L20 402 C20 418 30 426 46 430 L194 430 C210 426 220 418 220 402 L220 58 C220 40 210 30 194 24 Z";

// Tiger stripes: wedges biting in from both edges of the gold panel.
const STRIPES = [
  "M20 118 Q56 124 84 134 Q56 142 20 150 Z",
  "M20 162 Q40 166 62 173 Q40 179 20 184 Z",
  "M20 246 Q34 249 50 254 Q34 258 20 262 Z",
  "M20 274 Q46 279 74 284 Q46 290 20 294 Z",
  "M220 124 Q184 132 152 142 Q186 150 220 156 Z",
  "M220 170 Q198 174 176 181 Q198 187 220 190 Z",
  "M220 248 Q206 251 190 255 Q206 259 220 262 Z",
  "M220 276 Q190 280 164 286 Q190 291 220 294 Z",
];

export function BeerCan({ className = "", interactive = true, label = "Heimer Strong can, 330 ml" }: Props) {
  const id = useId().replace(/:/g, "");
  const wrap = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!interactive || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${x * 22}deg`);
    el.style.setProperty("--rx", `${-y * 10}deg`);
    el.style.setProperty("--shine", `${x * 70}px`);
  };

  const reset = () => {
    const el = wrap.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--shine", "0px");
  };

  return (
    <div ref={wrap} className={`can ${className}`} onPointerMove={onMove} onPointerLeave={reset}>
      <svg className="can__svg" viewBox="0 0 240 444" role="img" aria-label={label}>
        <defs>
          <clipPath id={`body-${id}`}>
            <path d={BODY} />
          </clipPath>
          <linearGradient id={`metal-${id}`} x1="0" x2="1">
            <stop offset="0" stopColor="#6f7672" />
            <stop offset="0.3" stopColor="#f1f3f1" />
            <stop offset="0.55" stopColor="#a9b0ac" />
            <stop offset="0.85" stopColor="#e3e6e4" />
            <stop offset="1" stopColor="#5d6460" />
          </linearGradient>
          <linearGradient id={`shade-${id}`} x1="0" x2="1">
            <stop offset="0" stopColor="#000" stopOpacity="0.55" />
            <stop offset="0.14" stopColor="#000" stopOpacity="0.12" />
            <stop offset="0.5" stopColor="#000" stopOpacity="0" />
            <stop offset="0.82" stopColor="#000" stopOpacity="0.18" />
            <stop offset="1" stopColor="#000" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id={`shine-${id}`} x1="0" x2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.42" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`foil-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#a87d26" />
            <stop offset="0.4" stopColor="#fbe7a1" />
            <stop offset="0.6" stopColor="#deb841" />
            <stop offset="1" stopColor="#9c7524" />
          </linearGradient>
        </defs>

        {/* lid */}
        <ellipse cx="120" cy="24" rx="74" ry="9" fill={`url(#metal-${id})`} />
        <ellipse cx="120" cy="24" rx="62" ry="6" fill="none" stroke="#7d8480" strokeWidth="1.5" />

        <g clipPath={`url(#body-${id})`}>
          <rect x="0" y="0" width="240" height="444" fill="#14281D" />
          {/* shoulder and base metal */}
          <rect x="0" y="0" width="240" height="50" fill={`url(#metal-${id})`} />
          <rect x="0" y="406" width="240" height="40" fill={`url(#metal-${id})`} />

          <text
            x="120"
            y="86"
            textAnchor="middle"
            fill={`url(#foil-${id})`}
            fontFamily="Archivo Variable, Archivo, sans-serif"
            fontWeight="800"
            fontSize="11"
            letterSpacing="2.4"
            style={{ fontVariationSettings: '"wdth" 80' }}
          >
            BENGAL DISTILLERIES
          </text>

          {/* gold tiger panel */}
          <rect x="0" y="108" width="240" height="190" fill="#DEB841" />
          <rect x="0" y="108" width="240" height="6" fill="#A30000" />
          <rect x="0" y="292" width="240" height="6" fill="#A30000" />
          {STRIPES.map((d) => (
            <path key={d} d={d} fill="#14281D" />
          ))}
          <text x="120" y="174" textAnchor="middle" fontFamily="Galada, serif" fontSize="36" fill="#A30000">
            হাইমার
          </text>
          <text
            x="120"
            y="238"
            textAnchor="middle"
            fontFamily="Rozha One, Georgia, serif"
            fontSize="50"
            fill="#14281D"
            textLength="176"
            lengthAdjust="spacingAndGlyphs"
          >
            HEIMER
          </text>
          <text
            x="120"
            y="267"
            textAnchor="middle"
            fontFamily="Archivo Variable, Archivo, sans-serif"
            fontWeight="800"
            fontSize="10"
            letterSpacing="2.4"
            fill="#14281D"
            style={{ fontVariationSettings: '"wdth" 80' }}
          >
            BATCH 001 ✦ UNFILTERED
          </text>

          <text
            x="120"
            y="342"
            textAnchor="middle"
            fontFamily="Rozha One, Georgia, serif"
            fontSize="40"
            fill={`url(#foil-${id})`}
            textLength="164"
            lengthAdjust="spacingAndGlyphs"
          >
            STRONG
          </text>
          <text
            x="120"
            y="366"
            textAnchor="middle"
            fontFamily="Archivo Variable, Archivo, sans-serif"
            fontWeight="800"
            fontSize="11"
            letterSpacing="2.2"
            fill="#DEB841"
            style={{ fontVariationSettings: '"wdth" 78' }}
          >
            IMPERIAL AMBER ALE
          </text>
          <text x="120" y="388" textAnchor="middle" fontFamily="Galada, serif" fontSize="15" fill="#FFFCFF">
            নলেন গুড় দিয়ে তৈরি
          </text>
          <text
            x="120"
            y="401"
            textAnchor="middle"
            fontFamily="Archivo Variable, Archivo, sans-serif"
            fontWeight="700"
            fontSize="7.5"
            letterSpacing="1.4"
            fill="#FFFCFF"
            opacity="0.8"
          >
            7.2% ABV  330 ML
          </text>

          {/* cylinder shading and moving specular */}
          <rect x="0" y="0" width="240" height="444" fill={`url(#shade-${id})`} />
          <rect className="can__shine" x="54" y="0" width="44" height="444" fill={`url(#shine-${id})`} />
        </g>
        <path d={BODY} fill="none" stroke="#000" strokeOpacity="0.25" strokeWidth="1" />
      </svg>
      <div className="can__shadow" aria-hidden="true" />
    </div>
  );
}
