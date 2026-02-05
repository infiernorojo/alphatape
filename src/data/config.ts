// AlphaTape configuration

export const CONFIG = {
  PROJECT_NAME: "AlphaTape",
  PROJECT_SLUG: "alphatape",
  DOMAIN: "alphatape.vercel.app",

  META: {
    TITLE: "AlphaTape — Polymarket Smart Money Tape",
    DESCRIPTION:
      "A realtime trade tape for Polymarket. See large trades, trending markets, and wallet activity — powered by public data.",
    KEYWORDS:
      "polymarket, polymarket analytics, polymarket trades, smart money, whale trades, prediction markets, crypto",
    AUTHOR: "AlphaTape",
    OG_IMAGE: "/logo.svg",
  },

  BRAND: {
    // Finance-style green accent (see src/index.css for actual theme tokens)
    PRIMARY_COLOR: "#22c55e",
    SECONDARY_COLOR: "#0b0b0b",
    LOGO_URL: "/logo.svg",
    FAVICON: "/favicon.ico",
  },

  CONTACT: {
    EMAIL: "support@alphatape.com",
    X: "",
    DISCORD: "",
  },

  POLYMARKET: {
    // We consume Polymarket via our own /api proxy (CORS-safe, stateless)
    // See /api/pm/*
    GAMMA_BASE: "https://gamma-api.polymarket.com",
    DATA_BASE: "https://data-api.polymarket.com",
    CLOB_BASE: "https://clob.polymarket.com",
  },

  FEATURES: {
    BLOG: false,
    AUTH: false,
    CHECKOUT: false,
  },

  TEXT: {
    HERO_TITLE: "Follow the money on Polymarket — in real time.",
    HERO_SUBTITLE:
      "AlphaTape is a clean, fast trade tape that surfaces large trades and trending markets using public Polymarket data.",
    CTA_PRIMARY: "View live demo",
    CTA_SECONDARY: "See pricing",

    DISCLAIMER_SHORT: "Not affiliated with Polymarket. Public-data analytics only. Not financial advice.",
  },
} as const;

export default CONFIG;
