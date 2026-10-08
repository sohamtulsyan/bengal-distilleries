import { Link } from "react-router-dom";
import { usePageTitle } from "../lib/usePageTitle";

export default function NotFound() {
  usePageTitle("Page not found");
  return (
    <section className="page-hero legal">
      <div className="container prose">
        <h1>This tap’s dry.</h1>
        <p className="lede">The page you asked for isn’t here. It may have moved, or the link has a typo.</p>
        <p>
          <Link to="/" className="btn btn-lg">
            Back to the home page
          </Link>
        </p>
      </div>
    </section>
  );
}
