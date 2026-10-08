import { useId } from "react";

type Props = {
  size?: number;
  className?: string;
  ring?: string;
  spin?: boolean;
};

/** Circular rubber-stamp emblem: the brand seal used in header, footer and hero. */
export function Seal({ size = 44, className, ring = "BENGAL DISTILLERIES ✦ KHARAGPUR ✦ EST. 2025 ✦ ", spin }: Props) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      role="img"
      aria-label="Bengal Distilleries seal"
    >
      <defs>
        <linearGradient id={`foil-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a87d26" />
          <stop offset="0.35" stopColor="#f6dc82" />
          <stop offset="0.55" stopColor="#deb841" />
          <stop offset="1" stopColor="#9c7524" />
        </linearGradient>
        <path id={`ring-${id}`} d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
      </defs>
      <circle cx="100" cy="100" r="98" fill="#14281D" />
      <circle cx="100" cy="100" r="92" fill="none" stroke={`url(#foil-${id})`} strokeWidth="3" />
      <circle cx="100" cy="100" r="58" fill="none" stroke={`url(#foil-${id})`} strokeWidth="2" />
      <g className={spin ? "seal-spin" : undefined} style={{ transformOrigin: "100px 100px" }}>
        <text
          fill={`url(#foil-${id})`}
          fontFamily="Archivo Variable, Archivo, sans-serif"
          fontWeight="800"
          fontSize="17"
          letterSpacing="2.6"
          style={{ fontVariationSettings: '"wdth" 80' }}
        >
          <textPath href={`#ring-${id}`} startOffset="0" textLength="458">
            {ring}
          </textPath>
        </text>
      </g>
      <text
        x="100"
        y="121"
        textAnchor="middle"
        fontFamily="Rozha One, Georgia, serif"
        fontSize="62"
        fill={`url(#foil-${id})`}
      >
        BD
      </text>
      <path d="M72 136 h56" stroke="#A30000" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
