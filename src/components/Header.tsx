import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import CONFIG from "@/data/config";
import logoImage from "@/assets/logo.png";

const navItems = [
  { label: "Product", href: "/#product" },
  { label: "Live demo", href: "/demo" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/#faq" },
];

function isHashLink(href: string) {
  return href.startsWith("/#");
}

export const Header = () => {
  const [open, setOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    // close mobile menu on route change
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleNavClick = (href: string) => {
    if (isHashLink(href)) {
      const id = href.split("#")[1];
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.location.href = href;
    }
    setOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-3 focus-highlight rounded-lg"
            aria-label={`${CONFIG.PROJECT_NAME} home`}
          >
            <div className="w-10 h-10 relative overflow-hidden rounded-full">
              <img
                src={logoImage}
                alt="AlphaTape logo"
                className="absolute w-full h-full object-cover scale-[1.6]"
                style={{ objectPosition: "center" }}
              />
            </div>
            <span className="font-heading font-bold text-lg tracking-tight">
              Alpha<span className="text-primary">Tape</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => handleNavClick(item.href)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button asChild variant="secondary">
              <Link to="/demo">
                Open demo <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="hero">
              <Link to="/pricing">Get Pro</Link>
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors focus-highlight"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {open && (
          <div ref={mobileRef} className="md:hidden pb-4">
            <div className="flex flex-col gap-2 pt-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex gap-2 px-3 pt-2">
                <Button asChild variant="secondary" className="flex-1">
                  <Link to="/demo">Open demo</Link>
                </Button>
                <Button asChild variant="hero" className="flex-1">
                  <Link to="/pricing">Get Pro</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
