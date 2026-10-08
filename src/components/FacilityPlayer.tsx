import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { StageArt } from "./StageArt";
import { company } from "../content/site";

const CHAPTERS = [
  { id: "mash", title: "Mash tun", caption: "Grain and Gobindobhog rice steep at 66 °C in a 20 BBL mash tun." },
  { id: "ferment", title: "Fermentation hall", caption: "Eight jacketed fermenters, each 40 BBL, glycol-chilled against Bengal summers." },
  { id: "still", title: "Copper pot stills", caption: "A 2,500 L wash still and 1,200 L spirit still, hand-beaten copper." },
  { id: "cask", title: "Bonded cask room", caption: "Racked for 2,000 casks. Humid heat matures spirit roughly three times faster than Scotland." },
];
const CHAPTER_SECONDS = 7;
const TOTAL = CHAPTERS.length * CHAPTER_SECONDS;

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function FacilityPlayer() {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(company.facilityVideo ? 0 : TOTAL);
  const video = useRef<HTMLVideoElement>(null);
  const raf = useRef(0);
  const hasVideo = Boolean(company.facilityVideo);

  // Drawn storyboard clock
  useEffect(() => {
    if (hasVideo || !playing) return;
    let last = performance.now();
    const tick = (t: number) => {
      // rAF timestamps can predate performance.now(); never step backwards.
      const dt = Math.max(0, t - last) / 1000;
      last = t;
      setTime((prev) => {
        const next = prev + dt;
        if (next >= TOTAL) {
          setPlaying(false);
          return TOTAL;
        }
        return next;
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [playing, hasVideo]);

  const toggle = () => {
    if (hasVideo && video.current) {
      if (video.current.paused) void video.current.play();
      else video.current.pause();
      return;
    }
    if (!playing && time >= TOTAL) setTime(0);
    setPlaying((p) => !p);
  };

  const seek = (s: number) => {
    if (hasVideo && video.current) video.current.currentTime = s;
    setTime(s);
  };

  const chapterIndex = Math.max(
    0,
    Math.min(CHAPTERS.length - 1, Math.floor(time / (duration / CHAPTERS.length || 1)) || 0),
  );
  const chapter = CHAPTERS[chapterIndex];
  const ended = !playing && time >= duration && duration > 0;

  return (
    <figure className="player">
      <div className="player__frame">
        <div className="player__stage" onClick={toggle}>
          {hasVideo ? (
            <video
              ref={video}
              src={company.facilityVideo}
              playsInline
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
            />
          ) : (
            CHAPTERS.map((c, i) => (
              <div key={c.id} className={`player__scene ${i === chapterIndex ? "is-active" : ""}`}>
                <StageArt stage={c.id} playing={playing && i === chapterIndex} />
              </div>
            ))
          )}
          <div className="player__caption" aria-live="polite">
            <span className="stamp stamp-gold">
              Stop {chapterIndex + 1} of {CHAPTERS.length}
            </span>
            <strong>{chapter.title}</strong>
            <span>{chapter.caption}</span>
          </div>
          {!playing && (
            <button
              type="button"
              className="player__big"
              aria-label={ended ? "Replay facility tour" : "Play facility tour"}
              onClick={(e) => {
                e.stopPropagation();
                toggle();
              }}
            >
              {ended ? <RotateCcw aria-hidden="true" /> : <Play aria-hidden="true" />}
            </button>
          )}
        </div>

        <div className="player__bar">
          <button type="button" className="player__btn" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
            {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          </button>
          <div className="player__track">
            <input
              type="range"
              min={0}
              max={duration || 1}
              step={0.1}
              value={Math.min(time, duration)}
              onChange={(e) => seek(Number(e.target.value))}
              aria-label="Seek"
              aria-valuetext={`${fmt(time)} of ${fmt(duration)}, ${chapter.title}`}
              style={{ ["--p" as string]: `${(time / (duration || 1)) * 100}%` }}
            />
          </div>
          <span className="player__time num">
            {fmt(time)} / {fmt(duration)}
          </span>
        </div>
      </div>

      <ol className="player__chapters">
        {CHAPTERS.map((c, i) => (
          <li key={c.id}>
            <button
              type="button"
              className={i === chapterIndex ? "is-active" : ""}
              aria-current={i === chapterIndex ? "step" : undefined}
              onClick={() => {
                seek(i * (duration / CHAPTERS.length) + 0.01);
                if (!hasVideo) setPlaying(true);
                else void video.current?.play();
              }}
            >
              <span className="num">{fmt(i * (duration / CHAPTERS.length))}</span>
              {c.title}
            </button>
          </li>
        ))}
      </ol>
      {!hasVideo && (
        <figcaption className="player__note">
          Drawn walkthrough of the production floor. The filmed tour replaces it after commissioning.
        </figcaption>
      )}
    </figure>
  );
}
