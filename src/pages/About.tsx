import { Link } from "react-router-dom";
import { StageArt } from "../components/StageArt";
import { milestones, productionSteps, team } from "../content/site";
import { usePageTitle } from "../lib/usePageTitle";

function Origins() {
  return (
    <section className="page-hero" aria-labelledby="about-title">
      <div className="container page-hero__grid">
        <h1 id="about-title">We broke the order of things on purpose.</h1>
        <div className="page-hero__copy">
          <p className="lede">
            Distilleries usually open with an unaged gin, or a sourced whisky with someone else’s name filed off. We opened
            with a beer.
          </p>
        </div>
      </div>
    </section>
  );
}

function Thesis() {
  return (
    <section className="section thesis" aria-labelledby="thesis-title">
      <div className="container thesis__grid">
        <div className="prose">
          <h2 id="thesis-title">Why a distillery starts with beer</h2>
          <p>
            Kharagpur is a railway town with one of the longest platforms in the world and a student population from every
            corner of India. It drinks beer. It drinks a lot of the same three beers. We think it deserves one brewed down
            the road, with Bengal in the glass.
          </p>
          <p>
            Beer is also the oldest trick in whisky. Every single malt begins as an unhopped beer called wash. Our brewhouse
            makes both: hopped ale for the taps, wash for the stills. Same grain buyers, same mill, same mash tun, same team.
          </p>
          <p>
            The cultural statement is the label. The financial one is the calendar. Ale is sold three weeks after brewing.
            Whisky is sold years after distilling. Running both lets beer revenue carry the cask inventory, so we grow an
            ageing spirits stock without raising money every year to wait on it.
          </p>
        </div>
        <aside className="calendar" aria-labelledby="calendar-title">
          <h3 id="calendar-title">Grain to cash</h3>
          <ol className="calendar__rows">
            <li>
              <span>Heimer Strong ale</span>
              <strong className="num">21 days</strong>
            </li>
            <li>
              <span>Gondhoraj Gin</span>
              <strong className="num">2 weeks</strong>
            </li>
            <li>
              <span>Mahua Heritage Spirit</span>
              <strong className="num">6 months</strong>
            </li>
            <li>
              <span>Rakhajungle Single Malt</span>
              <strong className="num">36+ months</strong>
            </li>
          </ol>
          <p>Time from brew day to first sale, by product.</p>
        </aside>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="section band process" aria-labelledby="process-title">
      <div className="container">
        <div className="section-head">
          <h2 id="process-title">One grain bill, two destinations</h2>
          <p className="lede">
            Copper pot stills from Kolkata fabricators, steel from Pune, malt from Rajasthan and rice from Bardhaman. Here is
            how it moves through the building.
          </p>
        </div>
        <ol className="flow">
          {productionSteps.map((s, i) => (
            <li key={s.id} className={`flow__step ${i >= 3 ? "flow__step--spirit" : ""}`}>
              <div className="flow__art">
                <StageArt stage={s.id} playing />
              </div>
              <div className="flow__text">
                <span className="flow__n num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
              {i === 2 && (
                <p className="flow__fork">
                  <span className="stamp stamp-gold">Fork</span>
                  Hopped beer goes to cans and kegs. Unhopped wash goes to the stills.
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="section team" aria-labelledby="team-title">
      <div className="container">
        <div className="section-head">
          <h2 id="team-title">The people with their names on the casks</h2>
        </div>
        <ul className="team__grid">
          {team.map((p) => (
            <li key={p.name} className="person lift">
              <div className="person__portrait" aria-hidden="true">
                <span>{p.initials}</span>
              </div>
              <div className="person__body">
                <h3>{p.name}</h3>
                <p className="person__role">{p.role}</p>
                <p>{p.bio}</p>
                <ul className="person__creds">
                  {p.creds.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Roadmap() {
  return (
    <section className="section roadmap" aria-labelledby="roadmap-title">
      <div className="container roadmap__grid">
        <div className="section-head roadmap__head">
          <h2 id="roadmap-title">Milestones for investors and partners</h2>
          <p className="lede">Where the build stands as of October 2026, and what the seed round pays for next.</p>
          <Link to="/contact?track=investor" className="btn btn-lg">
            Request investor deck
          </Link>
        </div>
        <ol className="timeline">
          {milestones.map((m) => (
            <li key={m.title} className={`timeline__item is-${m.status}`}>
              <span className="timeline__when num">{m.when}</span>
              <div>
                <h3>
                  {m.title}
                  {m.status === "now" && <span className="stamp stamp-crimson">In progress</span>}
                </h3>
                <p>{m.body}</p>
              </div>
              <span className="sr-only">
                {m.status === "done" ? "Completed" : m.status === "now" ? "In progress" : "Planned"}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function About() {
  usePageTitle("About us");
  return (
    <>
      <Origins />
      <Thesis />
      <Process />
      <Team />
      <Roadmap />
    </>
  );
}
