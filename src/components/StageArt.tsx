import type { ReactElement } from "react";

// Schematic drawings of each production stage. Colours come from CSS so they
// follow the theme; moving parts animate only while `playing` is set.

type Props = { stage: string; playing?: boolean; className?: string };

const Steam = ({ x, y }: { x: number; y: number }) => (
  <g className="anim-steam">
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={x + i * 10 - 10} cy={y} r={5 + i} style={{ animationDelay: `${i * 0.7}s` }} />
    ))}
  </g>
);

function Mash() {
  return (
    <>
      <rect x="118" y="20" width="84" height="18" rx="4" className="sa-fill-2" />
      <rect x="156" y="38" width="8" height="30" className="sa-line-fill" />
      <path d="M86 70 Q160 44 234 70 L234 176 Q234 188 222 188 L98 188 Q86 188 86 176 Z" className="sa-vessel" />
      <rect x="92" y="104" width="136" height="78" rx="6" className="sa-liquid" />
      <g className="anim-spin" style={{ transformOrigin: "160px 140px" }}>
        <rect x="104" y="137" width="112" height="6" rx="3" className="sa-line-fill" />
        {[116, 136, 184, 204].map((x) => (
          <rect key={x} x={x} y="143" width="4" height="22" className="sa-line-fill" />
        ))}
      </g>
      {[110, 132, 170, 196, 214, 150].map((x, i) => (
        <circle key={x} cx={x} cy={120 + (i % 3) * 6} r="3" className="sa-grain" />
      ))}
      <rect x="110" y="188" width="10" height="18" className="sa-line-fill" />
      <rect x="200" y="188" width="10" height="18" className="sa-line-fill" />
    </>
  );
}

function Brew() {
  return (
    <>
      <Steam x={160} y={34} />
      <path d="M92 64 L228 64 L228 170 Q228 184 214 184 L106 184 Q92 184 92 170 Z" className="sa-vessel" />
      <rect x="86" y="58" width="148" height="10" rx="4" className="sa-fill-2" />
      <rect x="98" y="96" width="124" height="82" rx="6" className="sa-liquid" />
      <g className="anim-drop">
        <path d="M160 44 q10 8 0 22 q-10 -14 0 -22Z" className="sa-hop" />
      </g>
      <g className="anim-flicker">
        {[118, 142, 166, 190].map((x) => (
          <path key={x} d={`M${x} 206 l7 -14 l7 14 Z`} className="sa-flame" />
        ))}
      </g>
    </>
  );
}

function Ferment() {
  return (
    <>
      <path d="M116 22 L204 22 L204 140 L160 190 L116 140 Z" className="sa-vessel" />
      <path d="M122 70 L198 70 L198 138 L160 182 L122 138 Z" className="sa-liquid" />
      {[136, 150, 164, 178, 190, 144, 172].map((x, i) => (
        <circle key={i} cx={x} cy={130} r={2 + (i % 3)} className="anim-bubble sa-bubble" style={{ animationDelay: `${i * 0.35}s` }} />
      ))}
      <rect x="112" y="140" width="6" height="66" className="sa-line-fill" />
      <rect x="202" y="140" width="6" height="66" className="sa-line-fill" />
      <rect x="156" y="190" width="8" height="16" className="sa-line-fill" />
      <path d="M204 40 h28 v-14" className="sa-pipe" />
      <circle cx="232" cy="22" r="6" className="sa-fill-2" />
    </>
  );
}

function Still() {
  return (
    <>
      <Steam x={250} y={42} />
      <ellipse cx="116" cy="146" rx="64" ry="50" className="sa-copper" />
      <path d="M100 100 L106 60 Q116 30 140 34 Q200 44 240 92" className="sa-neck" />
      <rect x="226" y="92" width="38" height="96" rx="6" className="sa-vessel" />
      {[110, 126, 142, 158, 174].map((y) => (
        <path key={y} d={`M232 ${y} h26`} className="sa-pipe" />
      ))}
      <rect x="60" y="190" width="112" height="16" rx="3" className="sa-fill-2" />
      <g className="anim-drip">
        <circle cx="245" cy="200" r="3.5" className="sa-drop" />
      </g>
      <ellipse cx="96" cy="128" rx="14" ry="22" className="sa-sheen" />
    </>
  );
}

function Cask() {
  const barrel = (cx: number, cy: number) => (
    <g key={`${cx}-${cy}`}>
      <circle cx={cx} cy={cy} r="42" className="sa-wood" />
      <circle cx={cx} cy={cy} r="42" className="sa-hoop" />
      <circle cx={cx} cy={cy} r="34" className="sa-hoop-thin" />
      {[-24, -12, 0, 12, 24].map((d) => (
        <line key={d} x1={cx + d} y1={cy - 30} x2={cx + d} y2={cy + 30} className="sa-stave" />
      ))}
      <circle cx={cx + 22} cy={cy + 18} r="3.5" className="sa-bung" />
    </g>
  );
  return (
    <>
      {barrel(118, 160)}
      {barrel(204, 160)}
      {barrel(161, 86)}
      <g className="anim-clock" style={{ transformOrigin: "262px 40px" }}>
        <line x1="262" y1="40" x2="262" y2="28" className="sa-pipe" />
      </g>
      <circle cx="262" cy="40" r="16" className="sa-ring" />
    </>
  );
}

const MAP: Record<string, () => ReactElement> = {
  mash: Mash,
  brew: Brew,
  ferment: Ferment,
  still: Still,
  cask: Cask,
};

export function StageArt({ stage, playing = false, className = "" }: Props) {
  const Art = MAP[stage] ?? Mash;
  return (
    <svg className={`stage-art ${className}`} data-playing={playing} viewBox="0 0 320 220" aria-hidden="true">
      <Art />
    </svg>
  );
}
