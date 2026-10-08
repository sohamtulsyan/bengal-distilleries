import { useId, useRef, useState, type KeyboardEvent } from "react";
import { flagship } from "../content/site";

/** Tabbed tasting notes; the active note lights up the profile rows it drives. */
export function TastingNotes() {
  const [active, setActive] = useState(0);
  const base = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const note = flagship.notes[active];

  const onKey = (e: KeyboardEvent) => {
    const n = flagship.notes.length;
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % n;
    else if (e.key === "ArrowLeft") next = (active - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="tasting">
      <div className="tasting__tabs" role="tablist" aria-label="Tasting notes" onKeyDown={onKey}>
        {flagship.notes.map((n, i) => (
          <button
            key={n.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            id={`${base}-tab-${n.id}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`${base}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
          >
            {n.label}
          </button>
        ))}
      </div>

      <div className="tasting__panel" id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${note.id}`}>
        <p key={note.id} className="tasting__body">
          {note.body}
        </p>
        <dl className="profile">
          {flagship.profile.map((p) => {
            const lit = note.highlight.includes(p.label);
            return (
              <div key={p.label} className={`profile__row ${lit ? "is-lit" : ""}`}>
                <dt>{p.label}</dt>
                <dd>
                  <span className="profile__pips" aria-hidden="true">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <i key={v} className={v <= p.value ? "on" : ""} />
                    ))}
                  </span>
                  <span className="sr-only">
                    {p.value} out of 5
                  </span>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}
