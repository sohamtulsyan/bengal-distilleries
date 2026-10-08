import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Seal } from "./Seal";
import { ThemeToggle } from "./ThemeToggle";
import { InstagramIcon, LinkedInIcon, XIcon, YouTubeIcon } from "./Icons";
import { company } from "../content/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Subscribe() {
  const [email, setEmail] = useState("");
  const [list, setList] = useState<"news" | "investor">("news");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setState("error");
      return;
    }
    setState("done");
  };

  if (state === "done") {
    return (
      <p className="subscribe__done" role="status">
        <Check aria-hidden="true" />
        Subscribed. {list === "investor" ? "Investor updates" : "Brewery news"} will arrive at {email.trim()}.
      </p>
    );
  }

  return (
    <form className="subscribe" onSubmit={submit} noValidate>
      <h3 className="subscribe__title">Get the next batch report</h3>
      <fieldset className="subscribe__lists">
        <legend className="sr-only">Choose a list</legend>
        <label>
          <input type="radio" name="list" checked={list === "news"} onChange={() => setList("news")} />
          <span>Brewery news</span>
        </label>
        <label>
          <input type="radio" name="list" checked={list === "investor"} onChange={() => setList("investor")} />
          <span>Investor updates</span>
        </label>
      </fieldset>
      <div className="subscribe__row">
        <label htmlFor="sub-email" className="sr-only">
          Email address
        </label>
        <input
          id="sub-email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          aria-invalid={state === "error"}
          aria-describedby={state === "error" ? "sub-error" : undefined}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
        />
        <button type="submit" className="btn btn-gold">
          Subscribe
        </button>
      </div>
      {state === "error" && (
        <p id="sub-error" className="subscribe__error">
          Enter an email address like name@company.com.
        </p>
      )}
    </form>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Seal size={132} spin />
            <p className="site-footer__address">
              {company.address.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </p>
          </div>

          <nav className="site-footer__links" aria-label="Footer">
            <div>
              <h3>Company</h3>
              <Link to="/about">About us</Link>
              <Link to="/products">Products</Link>
              <Link to="/contact">Get in touch</Link>
            </div>
            <div>
              <h3>Resources</h3>
              <Link to="/contact?track=investor">Investor portal</Link>
              <Link to="/contact?track=general&type=Press">Press kit</Link>
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms of use</Link>
            </div>
          </nav>

          <Subscribe />
        </div>

        <div className="site-footer__mid">
          <ul className="social" aria-label="Social media">
            <li>
              <a href={company.social.instagram} aria-label="Instagram" target="_blank" rel="noreferrer">
                <InstagramIcon />
              </a>
            </li>
            <li>
              <a href={company.social.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">
                <LinkedInIcon />
              </a>
            </li>
            <li>
              <a href={company.social.x} aria-label="X" target="_blank" rel="noreferrer">
                <XIcon />
              </a>
            </li>
            <li>
              <a href={company.social.youtube} aria-label="YouTube" target="_blank" rel="noreferrer">
                <YouTubeIcon />
              </a>
            </li>
          </ul>
          <div className="site-footer__theme">
            <span>Theme</span>
            <ThemeToggle className="theme-toggle--on-dark" />
          </div>
        </div>

        <div className="site-footer__legal">
          <p>
            Drink responsibly. Sale and consumption of alcohol is restricted to persons aged {company.legalAge} and above in West
            Bengal. Do not drink and drive. Statutory warning: consumption of alcohol is injurious to health.
          </p>
          <p>
            © {year} Bengal Distilleries Pvt. Ltd., {company.city}. Figures on this site are forward-looking and for discussion
            only; they are not an offer of securities.
          </p>
        </div>
      </div>
    </footer>
  );
}
