import { useEffect, useRef } from "react";

/**
 * Drawn stand-in for the hero film: carbonation rising through amber beer
 * under a foam head. Replace by setting company.heroVideo.
 */
export function PourField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;

    type Bubble = { x: number; y: number; r: number; v: number; drift: number; phase: number };
    let bubbles: Bubble[] = [];

    const spawn = (anywhere: boolean): Bubble => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + Math.random() * 40,
      r: 0.6 + Math.random() ** 2 * 3.6,
      v: 0.25 + Math.random() * 0.9,
      drift: 0.3 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 5200);
      bubbles = Array.from({ length: count }, () => spawn(true));
    };

    const paintBeer = (t: number) => {
      const g = ctx.createLinearGradient(0, 0, w * 0.4, h);
      g.addColorStop(0, "#3a1f05");
      g.addColorStop(0.35, "#8a4a0c");
      g.addColorStop(0.7, "#c9781c");
      g.addColorStop(1, "#e3a33a");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // slow light caustics through the glass
      for (let i = 0; i < 3; i++) {
        const cx = w * (0.25 + i * 0.3) + Math.sin(t / 3200 + i) * w * 0.06;
        const cy = h * (0.55 + Math.cos(t / 4100 + i * 2) * 0.12);
        const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.38);
        rg.addColorStop(0, "rgba(255, 214, 120, 0.22)");
        rg.addColorStop(1, "rgba(255, 214, 120, 0)");
        ctx.fillStyle = rg;
        ctx.fillRect(0, 0, w, h);
      }
    };

    const paintFoam = (t: number) => {
      const base = h * 0.11;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (let x = 0; x <= w; x += 12) {
        const y = base + Math.sin(x / 46 + t / 900) * 5 + Math.sin(x / 17 + t / 600) * 2.5;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, 0);
      ctx.closePath();
      const fg = ctx.createLinearGradient(0, 0, 0, base + 10);
      fg.addColorStop(0, "#fff6e0");
      fg.addColorStop(0.8, "#f3dca8");
      fg.addColorStop(1, "rgba(243, 220, 168, 0.6)");
      ctx.fillStyle = fg;
      ctx.fill();
    };

    const paintBubbles = (t: number, dt: number) => {
      for (const b of bubbles) {
        b.y -= b.v * dt * 0.06 * (1 + b.r * 0.15);
        const x = b.x + Math.sin(t / 700 + b.phase) * b.drift * 2;
        if (b.y < h * 0.1) Object.assign(b, spawn(false));
        ctx.beginPath();
        ctx.arc(x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 238, 190, ${0.18 + b.r * 0.08})`;
        ctx.fill();
        if (b.r > 1.8) {
          ctx.beginPath();
          ctx.arc(x - b.r * 0.35, b.y - b.r * 0.35, b.r * 0.32, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.55)";
          ctx.fill();
        }
      }
    };

    let last = performance.now();
    const frame = (t: number) => {
      const dt = Math.min(t - last, 48);
      last = t;
      paintBeer(t);
      paintBubbles(t, dt);
      paintFoam(t);
      if (!reduce && visible) raf = requestAnimationFrame(frame);
    };

    resize();
    frame(performance.now());

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) frame(performance.now());
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was && !reduce) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
