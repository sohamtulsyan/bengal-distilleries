import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { Check, Clock, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { SiteMap } from "../components/SiteMap";
import { company } from "../content/site";
import { usePageTitle } from "../lib/usePageTitle";

type Track = "general" | "investor";
const ACCOUNT_TYPES = ["Retailer", "Hospitality", "Press", "Consumer"] as const;
const TICKETS = ["Under ₹25 lakh", "₹25 lakh to ₹1 Cr", "₹1 Cr to ₹5 Cr", "Above ₹5 Cr"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

type Fields = {
  name: string;
  email: string;
  firm: string;
  accredited: boolean;
  ticket: string;
  accountType: string;
  subject: string;
  message: string;
};

const EMPTY: Fields = {
  name: "",
  email: "",
  firm: "",
  accredited: false,
  ticket: "",
  accountType: "",
  subject: "",
  message: "",
};

function validate(track: Track, f: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (!f.name.trim()) e.name = "Enter your name.";
  if (!EMAIL_RE.test(f.email.trim())) e.email = "Enter an email address like name@company.com.";
  if (track === "investor") {
    if (!f.firm.trim()) e.firm = "Enter your firm, fund or family office. Write “Individual” if investing personally.";
    if (!f.ticket) e.ticket = "Choose a ticket size range.";
  } else {
    if (!f.accountType) e.accountType = "Choose the option that describes you.";
    if (!f.subject.trim()) e.subject = "Add a subject so we can route your message.";
  }
  if (f.message.trim().length < 10) e.message = "Write at least a sentence so we know how to help.";
  return e;
}

export default function Contact() {
  usePageTitle("Get in touch");
  const [params] = useSearchParams();
  const [track, setTrack] = useState<Track>(params.get("track") === "investor" ? "investor" : "general");
  const [fields, setFields] = useState<Fields>(() => {
    const t = params.get("type");
    return { ...EMPTY, accountType: ACCOUNT_TYPES.find((a) => a === t) ?? "" };
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto" | "failed">("idle");

  useEffect(() => {
    const t = params.get("track");
    if (t === "investor" || t === "general") setTrack(t);
    const type = params.get("type");
    const match = ACCOUNT_TYPES.find((a) => a === type);
    if (match) setFields((f) => ({ ...f, accountType: match }));
  }, [params]);

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    setFields((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const to = track === "investor" ? company.email.investors : company.email.general;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate(track, fields);
    setErrors(found);
    const firstBad = Object.keys(found)[0];
    if (firstBad) {
      document.getElementById(`f-${firstBad}`)?.focus();
      return;
    }
    const payload =
      track === "investor"
        ? {
            track: "Investor relations",
            name: fields.name,
            email: fields.email,
            firm: fields.firm,
            accredited: fields.accredited ? "Yes" : "Not stated",
            ticket: fields.ticket,
            message: fields.message,
          }
        : {
            track: "General and distribution",
            name: fields.name,
            email: fields.email,
            accountType: fields.accountType,
            subject: fields.subject,
            message: fields.message,
          };

    if (ENDPOINT) {
      setStatus("sending");
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus("sent");
      } catch {
        setStatus("failed");
      }
      return;
    }

    // No form backend configured: hand off to the visitor's email app.
    const subject = track === "investor" ? `Investor inquiry from ${fields.firm}` : `[${fields.accountType}] ${fields.subject}`;
    const body = Object.entries(payload)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("mailto");
  };

  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p className="field__error" id={`e-${k}`}>
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof Fields) => ({
    id: `f-${k}`,
    "aria-invalid": Boolean(errors[k]),
    "aria-describedby": errors[k] ? `e-${k}` : undefined,
  });

  return (
    <>
      <section className="page-hero contact-hero" aria-labelledby="contact-title">
        <div className="container">
          <h1 id="contact-title">Let’s talk business, beer, or barrels.</h1>
          <p className="lede">
            Investors reach our CFO directly. Bars, retailers and press reach the commercial team. Everyone gets a reply within
            two working days.
          </p>
        </div>
      </section>

      <section className="section contact" aria-label="Inquiry form and contact details">
        <div className="container contact__grid">
          <div className="inquiry">
            <div className="segmented" role="radiogroup" aria-label="Inquiry type">
              {(
                [
                  ["general", "General & distribution"],
                  ["investor", "Investor relations"],
                ] as [Track, string][]
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={track === value}
                  className={track === value ? "is-on" : ""}
                  onClick={() => {
                    setTrack(value);
                    setErrors({});
                    setStatus("idle");
                  }}
                >
                  {label}
                </button>
              ))}
              <span className="segmented__thumb" data-pos={track} aria-hidden="true" />
            </div>

            {status === "sent" || status === "mailto" ? (
              <div className="inquiry__done" role="status">
                <span className="inquiry__check">
                  <Check aria-hidden="true" />
                </span>
                <h2>{status === "sent" ? "Message sent." : "Your email app should open now."}</h2>
                <p>
                  {status === "sent"
                    ? `We’ll reply to ${fields.email} within two working days.`
                    : `If it didn’t, write to ${to} and paste your message there.`}
                </p>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => {
                    setFields(EMPTY);
                    setStatus("idle");
                  }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="form" onSubmit={submit} noValidate>
                <div className="form__row">
                  <div className="field">
                    <label htmlFor="f-name">Name</label>
                    <input {...a11y("name")} autoComplete="name" value={fields.name} onChange={(e) => set("name", e.target.value)} />
                    {err("name")}
                  </div>
                  <div className="field">
                    <label htmlFor="f-email">Email</label>
                    <input
                      {...a11y("email")}
                      type="email"
                      autoComplete="email"
                      value={fields.email}
                      onChange={(e) => set("email", e.target.value)}
                    />
                    {err("email")}
                  </div>
                </div>

                {track === "investor" ? (
                  <>
                    <div className="field">
                      <label htmlFor="f-firm">Entity or firm</label>
                      <input
                        {...a11y("firm")}
                        autoComplete="organization"
                        value={fields.firm}
                        onChange={(e) => set("firm", e.target.value)}
                      />
                      {err("firm")}
                    </div>
                    <div className="field">
                      <label htmlFor="f-ticket">Ticket size</label>
                      <select {...a11y("ticket")} value={fields.ticket} onChange={(e) => set("ticket", e.target.value)}>
                        <option value="">Choose a range</option>
                        {TICKETS.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                      {err("ticket")}
                    </div>
                    <label className="check">
                      <input type="checkbox" checked={fields.accredited} onChange={(e) => set("accredited", e.target.checked)} />
                      <span>
                        I am an accredited investor under SEBI rules <em>(optional)</em>
                      </span>
                    </label>
                  </>
                ) : (
                  <>
                    <fieldset className="field" aria-describedby={errors.accountType ? "e-accountType" : undefined}>
                      <legend>I’m a</legend>
                      <div className="chips">
                        {ACCOUNT_TYPES.map((t, i) => (
                          <label key={t} className="chip">
                            <input
                              type="radio"
                              name="accountType"
                              id={i === 0 ? "f-accountType" : undefined}
                              checked={fields.accountType === t}
                              onChange={() => set("accountType", t)}
                            />
                            <span>{t}</span>
                          </label>
                        ))}
                      </div>
                      {err("accountType")}
                    </fieldset>
                    <div className="field">
                      <label htmlFor="f-subject">Subject</label>
                      <input {...a11y("subject")} value={fields.subject} onChange={(e) => set("subject", e.target.value)} />
                      {err("subject")}
                    </div>
                  </>
                )}

                <div className="field">
                  <label htmlFor="f-message">Message</label>
                  <textarea
                    {...a11y("message")}
                    rows={5}
                    value={fields.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder={
                      track === "investor"
                        ? "Tell us about your fund and what you’d like to see in the deck."
                        : "Tell us what you need: kegs, cans, a sample, an interview."
                    }
                  />
                  {err("message")}
                </div>

                {status === "failed" && (
                  <p className="form__failed" role="alert">
                    The message didn’t send. Check your connection and try again, or email {to}.
                  </p>
                )}

                <button type="submit" className="btn btn-lg form__submit" disabled={status === "sending"}>
                  {status === "sending" && <Loader2 className="spin" aria-hidden="true" />}
                  {status === "sending" ? "Sending" : track === "investor" ? "Request investor deck" : "Send message"}
                </button>
              </form>
            )}
          </div>

          <aside className="hq" aria-labelledby="hq-title">
            <h2 id="hq-title">Distillery headquarters</h2>
            <SiteMap />
            <ul className="hq__list">
              <li>
                <MapPin aria-hidden="true" />
                <span>
                  {company.address.map((l) => (
                    <span key={l} className="hq__line">
                      {l}
                    </span>
                  ))}
                </span>
              </li>
              <li>
                <Mail aria-hidden="true" />
                <span>
                  <span className="hq__label">Investor relations</span>
                  <a href={`mailto:${company.email.investors}`}>{company.email.investors}</a>
                </span>
              </li>
              <li>
                <Mail aria-hidden="true" />
                <span>
                  <span className="hq__label">Trade and distribution</span>
                  <a href={`mailto:${company.email.trade}`}>{company.email.trade}</a>
                </span>
              </li>
              <li>
                <Phone aria-hidden="true" />
                <a href={company.phone.href}>{company.phone.display}</a>
              </li>
              <li className="hq__notice">
                <Clock aria-hidden="true" />
                <span>{company.hours}</span>
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
