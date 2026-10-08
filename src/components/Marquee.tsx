import { Spark } from "./Icons";

export function Marquee({ items, tone = "crimson" }: { items: string[]; tone?: "crimson" | "gold" }) {
  const row = (hidden: boolean) => (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t}>
          <span>{t}</span>
          <Spark />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee marquee--${tone}`}>
      <div className="marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
