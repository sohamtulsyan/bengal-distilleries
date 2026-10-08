import { useEffect, useRef, useState } from "react";
import { Seal } from "./Seal";
import { readStore, writeStore } from "../lib/storage";
import { company } from "../content/site";

const KEY = "bd-age-verified";

export function AgeGate() {
  const [state, setState] = useState<"ask" | "denied" | "ok">(() => (readStore(KEY) === "yes" ? "ok" : "ask"));
  const yesRef = useRef<HTMLButtonElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state === "ok") {
      delete document.documentElement.dataset.gate;
      return;
    }
    document.documentElement.dataset.gate = "open";
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    yesRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !boxRef.current) return;
      const items = boxRef.current.querySelectorAll<HTMLElement>("button, a");
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [state]);

  if (state === "ok") return null;

  return (
    <div className="age-gate" role="dialog" aria-modal="true" aria-labelledby="age-title" aria-describedby="age-desc">
      <div className="age-gate__card" ref={boxRef}>
        <Seal size={112} />
        {state === "ask" ? (
          <>
            <h2 id="age-title">Are you of legal drinking age?</h2>
            <p id="age-desc">
              This site is about beer and spirits. You must be {company.legalAge} or older to enter, as required in West Bengal.
            </p>
            <div className="age-gate__actions">
              <button
                ref={yesRef}
                type="button"
                className="btn btn-gold btn-lg"
                onClick={() => {
                  writeStore(KEY, "yes");
                  setState("ok");
                }}
              >
                Yes, I’m {company.legalAge} or older
              </button>
              <button type="button" className="btn btn-ghost btn-lg" onClick={() => setState("denied")}>
                No, I’m not
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 id="age-title">Come back when you’re {company.legalAge}.</h2>
            <p id="age-desc">We’ll keep a cold one for you. Until then, you can read about responsible drinking.</p>
            <div className="age-gate__actions">
              <a className="btn btn-gold btn-lg" href="https://www.who.int/news-room/fact-sheets/detail/alcohol" rel="noreferrer">
                Read about alcohol and health
              </a>
              <button type="button" className="btn btn-ghost btn-lg" onClick={() => setState("ask")}>
                Go back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
