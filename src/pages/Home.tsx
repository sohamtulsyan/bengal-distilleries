import { Link } from "react-router-dom";
import { ArrowDownRight } from "lucide-react";
import { BeerCan } from "../components/BeerCan";
import { FacilityPlayer } from "../components/FacilityPlayer";
import { Marquee } from "../components/Marquee";
import { PourField } from "../components/PourField";
import { Seal } from "../components/Seal";
import { TastingNotes } from "../components/TastingNotes";
import { company, flagship, marquee } from "../content/site";
import { usePageTitle } from "../lib/usePageTitle";

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        {company.heroVideo ? (
          <video src={company.heroVideo} autoPlay muted loop playsInline aria-hidden="true" />
        ) : (
          <PourField className="hero__canvas" />
        )}
      </div>
      <div className="hero__veil" aria-hidden="true" />
      <div className="hero__seal" aria-hidden="true">
        <Seal size={150} spin ring="BATCH No. 001 ✦ READY ✦ KHARAGPUR ✦ " />
      </div>
      <div className="hero__content">
        <span className="stamp stamp-crimson hero__flag">Now brewing in Kharagpur</span>
        <h1 id="hero-title" className="hero__title">
          <span className="foil">Craft defiance.</span>
          <span className="foil">Distilled ambition.</span>
        </h1>
        <p className="hero__sub">
          Bengal Distilleries is a modern distillery that starts with beer. Our flagship ale, Heimer Strong, funds the copper
          stills and oak casks behind the whisky, gin and mahua spirit that follow.
        </p>
        <div className="hero__ctas">
          <a href="#flagship" className="btn btn-gold btn-lg">
            Explore flagship brew
            <ArrowDownRight aria-hidden="true" />
          </a>
          <Link to="/contact?track=investor" className="btn btn-ghost btn-lg hero__ghost">
            Investor brief / deck request
          </Link>
        </div>
      </div>
    </section>
  );
}

function Spotlight() {
  return (
    <section id="flagship" className="section spotlight" aria-labelledby="flagship-title">
      <div className="container spotlight__grid">
        <div className="spotlight__visual">
          <span className="stamp stamp-gold spotlight__stamp spotlight__stamp--a">Batch 001</span>
          <span className="stamp stamp-crimson spotlight__stamp spotlight__stamp--b">Limited first run</span>
          <BeerCan />
        </div>
        <div className="spotlight__copy">
          <h2 id="flagship-title" className="spotlight__title">
            {flagship.name}
          </h2>
          <p className="spotlight__style">{flagship.style}</p>
          <p className="spotlight__tagline">{flagship.tagline}</p>
          <dl className="stats">
            {flagship.stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd className="num">
                  {s.value}
                  {s.unit && <small>{s.unit}</small>}
                </dd>
              </div>
            ))}
          </dl>
          <TastingNotes />
        </div>
      </div>
    </section>
  );
}

function Facility() {
  return (
    <section className="section band facility" aria-labelledby="facility-title">
      <div className="container facility__grid">
        <div className="section-head">
          <h2 id="facility-title">Walk the production floor.</h2>
          <p className="lede">
            One building, two products. The brewhouse feeds the fermenters, the fermenters feed the stills, and the stills
            fill the casks. Take the four-stop tour.
          </p>
          <Link to="/about#process" className="text-link">
            How we make it
          </Link>
        </div>
        <FacilityPlayer />
      </div>
    </section>
  );
}

export default function Home() {
  usePageTitle("");
  return (
    <>
      <div className="hero-wrap">
        <Hero />
        <Marquee items={marquee} />
      </div>
      <Spotlight />
      <Facility />
    </>
  );
}
