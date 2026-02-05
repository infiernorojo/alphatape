import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center rounded-2xl border border-border bg-card/40 p-8">
        <div className="text-5xl font-heading font-bold">404</div>
        <p className="mt-3 text-muted-foreground">This page doesn’t exist.</p>
        <div className="mt-6">
          <Link className="text-primary hover:underline" to="/">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
