export type Plan = "free" | "pro" | "team";

const KEY = "alphatape_plan";

export function getPlan(): Plan {
  if (typeof window === "undefined") return "free";
  const v = window.localStorage.getItem(KEY);
  if (v === "pro" || v === "team" || v === "free") return v;
  return "free";
}

export function setPlan(plan: Plan) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, plan);
}

export function isAtLeastPro(plan: Plan) {
  return plan === "pro" || plan === "team";
}
