import { useCallback, useSyncExternalStore } from "react";
import { writeStore } from "./storage";

export type Theme = "light" | "dark";

const listeners = new Set<() => void>();

function current(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, current, () => "light" as Theme);

  const toggle = useCallback(() => {
    const next: Theme = current() === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      writeStore("bd-theme", next);
      listeners.forEach((l) => l());
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (doc.startViewTransition && !reduce) doc.startViewTransition(apply);
    else apply();
  }, []);

  return { theme, toggle };
}
