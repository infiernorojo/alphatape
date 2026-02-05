import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main" className="pt-20">
        <section className="py-10">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="font-heading text-3xl font-bold">Privacy</h1>
            <p className="mt-4 text-muted-foreground">
              AlphaTape does not require accounts and does not store personal data in a database.
            </p>

            <div className="mt-6 space-y-4 text-sm text-muted-foreground">
              <p>
                When you look up a wallet address, the address is used to request public data from Polymarket endpoints.
                We do not claim ownership of that data.
              </p>
              <p>
                In production, requests may pass through a stateless proxy route to bypass browser CORS. No persistence
                is required.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
