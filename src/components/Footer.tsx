import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

import CONFIG from "@/data/config";
import logoImage from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 relative overflow-hidden rounded-full">
              <img
                src={logoImage}
                alt="AlphaTape logo"
                className="absolute w-full h-full object-cover scale-[1.6]"
                style={{ objectPosition: "center" }}
              />
            </div>
            <div>
              <div className="font-heading font-bold">
                Alpha<span className="text-primary">Tape</span>
              </div>
              <div className="text-xs text-muted-foreground">{CONFIG.TEXT.DISCLAIMER_SHORT}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <Link className="text-muted-foreground hover:text-foreground" to="/demo">
              Demo
            </Link>
            <Link className="text-muted-foreground hover:text-foreground" to="/pricing">
              Pricing
            </Link>
            <Link className="text-muted-foreground hover:text-foreground" to="/terms">
              Terms
            </Link>
            <Link className="text-muted-foreground hover:text-foreground" to="/privacy">
              Privacy
            </Link>
            <a
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
              href="https://docs.polymarket.com/quickstart/reference/endpoints"
              target="_blank"
              rel="noreferrer"
            >
              Data sources <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row gap-2 md:items-center md:justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {CONFIG.PROJECT_NAME}. All rights reserved.</p>
          <p>Educational / informational content only. No investment advice.</p>
        </div>
      </div>
    </footer>
  );
};
