import { BeerCan } from "../components/BeerCan";
import { flagship } from "../content/site";
import { usePageTitle } from "../lib/usePageTitle";

function Flagship() {
  return (
    <section className="page-hero product-hero" aria-labelledby="product-title">
      <div className="container product-hero__grid">
        <div className="product-hero__visual">
          <span className="stamp stamp-gold spotlight__stamp spotlight__stamp--a">Batch 001</span>
          <span className="stamp stamp-crimson spotlight__stamp spotlight__stamp--b">Limited first run</span>
          <BeerCan />
        </div>
        <div className="product-hero__copy">
          <p className="product-hero__kicker" lang="bn">
            {flagship.bengali}
          </p>
          <h1 id="product-title">{flagship.name}</h1>
          <p className="spotlight__style">{flagship.style}</p>
          <p className="lede">{flagship.tagline}</p>
        </div>
      </div>
    </section>
  );
}

function Specs() {
  return (
    <section className="section specs" aria-labelledby="specs-title">
      <div className="container specs__grid">
        <div className="section-head">
          <h2 id="specs-title">Full specification</h2>
          <p className="lede">Everything a buyer, bartender or brewer will ask about the first commercial release.</p>
        </div>
        <table className="spec-table">
          <caption className="sr-only">{flagship.name} specification</caption>
          <tbody>
            {flagship.specs.map(([k, v]) => (
              <tr key={k}>
                <th scope="row">{k}</th>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Story() {
  const [first, ...rest] = flagship.story.paragraphs;
  return (
    <section className="section story" aria-labelledby="story-title">
      <div className="container story__grid">
        <h2 id="story-title">{flagship.story.title}</h2>
        <div className="story__body">
          <p className="story__lead">{first}</p>
          {rest.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Products() {
  usePageTitle("Products");
  return (
    <>
      <Flagship />
      <Specs />
      <Story />
    </>
  );
}
