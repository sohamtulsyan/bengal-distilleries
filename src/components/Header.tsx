import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Mail, Menu, Phone, X } from "lucide-react";
import { Seal } from "./Seal";
import { ThemeToggle } from "./ThemeToggle";
import { company } from "../content/site";

export const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About us" },
  { to: "/products", label: "Products" },
];

export function Wordmark() {
  return (
    <Link to="/" className="wordmark" aria-label="Bengal Distilleries, home">
      <Seal size={46} />
      <span className="wordmark__text">
        <span>Bengal</span>
        <span>Distilleries</span>
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = drawerRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtnRef.current?.focus();
      }
      if (e.key === "Tab" && drawerRef.current) {
        const items = drawerRef.current.querySelectorAll<HTMLElement>("a, button");
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (to: string, end?: boolean) => (end ? location.pathname === to : location.pathname.startsWith(to));

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container site-header__inner">
        <Wordmark />
        <nav className="site-nav" aria-label="Main">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={() => `site-nav__link ${isActive(item.to, item.end) ? "is-active" : ""}`}
              aria-current={isActive(item.to, item.end) ? "page" : undefined}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="site-header__actions">
          <ThemeToggle />
          <Link to="/contact" className="btn site-header__cta">
            Get in touch
          </Link>
          <button
            ref={menuBtnRef}
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-drawer"
        ref={drawerRef}
        className={`drawer ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
      >
        <div className="drawer__top">
          <Seal size={52} />
          <button type="button" className="menu-btn drawer__close" aria-label="Close menu" onClick={() => setOpen(false)}>
            <X aria-hidden="true" />
          </button>
        </div>
        <nav className="drawer__nav" aria-label="Mobile">
          {[...navItems, { to: "/contact", label: "Get in touch" }].map((item, i) => (
            <Link key={item.to} to={item.to} className="drawer__link" style={{ ["--i" as string]: i }}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="drawer__contact">
          <a href={`mailto:${company.email.general}`}>
            <Mail aria-hidden="true" /> {company.email.general}
          </a>
          <a href={company.phone.href}>
            <Phone aria-hidden="true" /> {company.phone.display}
          </a>
          <ThemeToggle className="theme-toggle--on-dark" />
        </div>
      </div>
    </header>
  );
}
