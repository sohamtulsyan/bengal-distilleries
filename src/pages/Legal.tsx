import { Link } from "react-router-dom";
import { usePageTitle } from "../lib/usePageTitle";
import { company } from "../content/site";

const COPY = {
  privacy: {
    title: "Privacy",
    body: [
      "We collect only what you send us: your name, email and message when you use the inquiry or newsletter forms.",
      "We use it to reply and, if you subscribed, to send the updates you chose. We don’t sell or share it.",
      "This site remembers your age confirmation and theme choice in your browser. Clear your site data to reset them.",
    ],
  },
  terms: {
    title: "Terms of use",
    body: [
      `This site is for people aged ${company.legalAge} and over. Content is for information only.`,
      "Financial figures, timelines and launch dates are forward-looking estimates. Nothing here is an offer to sell or a solicitation to buy securities.",
      "Bengal Distilleries names, labels and artwork are our trademarks. Ask before you use them.",
    ],
  },
};

export default function Legal({ kind }: { kind: keyof typeof COPY }) {
  const c = COPY[kind];
  usePageTitle(c.title);
  return (
    <section className="page-hero legal">
      <div className="container prose">
        <h1>{c.title}</h1>
        <p className="legal__note">Draft for review by counsel. Last updated October 2026.</p>
        {c.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p>
          Questions? <Link to="/contact">Get in touch</Link>.
        </p>
      </div>
    </section>
  );
}
