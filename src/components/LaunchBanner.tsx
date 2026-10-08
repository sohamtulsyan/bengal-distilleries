import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { company, flagship } from "../content/site";

const LAUNCH = new Date(company.launchAt).getTime();

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [
    { label: "days", short: "d", value: Math.floor(s / 86400) },
    { label: "hours", short: "h", value: Math.floor((s % 86400) / 3600) },
    { label: "minutes", short: "m", value: Math.floor((s % 3600) / 60) },
    { label: "seconds", short: "s", value: s % 60 },
  ];
}

const launchLabel = new Intl.DateTimeFormat("en-IN", {
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Asia/Kolkata",
}).format(LAUNCH);

/** Site-wide countdown to the flagship launch. */
export function LaunchBanner() {
  const [now, setNow] = useState(() => Date.now());
  const live = now >= LAUNCH;

  useEffect(() => {
    if (live) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [live]);

  const left = LAUNCH - now;
  const units = parts(left);

  if (live) {
    return (
      <div className="launch launch--live">
        <div className="container launch__inner">
          <p className="launch__text">
            <strong>{flagship.name} is out now.</strong> Ask for it at bars across West Bengal.
          </p>
          <Link to="/products" className="launch__link">
            Meet the beer
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="launch">
      <div className="container launch__inner">
        <p className="launch__text">
          <strong>{flagship.name} launches</strong>
          <span className="launch__date"> {launchLabel} IST</span>
        </p>
        <div
          className="launch__clock"
          role="timer"
          aria-label={`${units[0].value} days, ${units[1].value} hours and ${units[2].value} minutes until launch`}
        >
          {units.map((u) => (
            <span key={u.label} className="launch__cell" aria-hidden="true">
              <span className="launch__num num">{String(u.value).padStart(2, "0")}</span>
              <span className="launch__unit">{u.short}</span>
            </span>
          ))}
        </div>
        <Link to="/products" className="launch__link">
          Meet the beer
        </Link>
      </div>
    </div>
  );
}
