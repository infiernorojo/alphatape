import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main" className="pt-20">
        <section className="py-10">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="font-heading text-3xl font-bold">Terms</h1>
            <p className="mt-4 text-muted-foreground">
              AlphaTape is an informational analytics UI. We do not provide financial advice, do not custody funds, and do
              not place trades.
            </p>

            <div className="mt-6 space-y-4 text-sm text-muted-foreground">
              <p>
                Data is provided “as is” from public sources. Availability and accuracy depend on upstream APIs and the
                blockchain.
              </p>
              <p>
                By using AlphaTape, you agree you are responsible for your own decisions and verification. Use at your
                own risk.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
