import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQSection() {
  return (
    <section id="faq" className="py-14">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold">FAQ</h2>
          <p className="mt-3 text-muted-foreground">Clear, trust-building answers (and honest limits).</p>
        </div>

        <div className="mt-8 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is AlphaTape affiliated with Polymarket?</AccordionTrigger>
              <AccordionContent>
                No. AlphaTape is an independent analytics UI that consumes public endpoints and on-chain links for
                verification.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Does AlphaTape place trades or manage wallets?</AccordionTrigger>
              <AccordionContent>
                No. We do not connect wallets, do not place orders, and never ask for private keys. Analytics only.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Where does the data come from?</AccordionTrigger>
              <AccordionContent>
                Polymarket public endpoints (Gamma API + Data API) and Polygonscan links. In production we proxy the
                requests via a stateless /api route to avoid browser CORS.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Do you guarantee “winning wallets”?</AccordionTrigger>
              <AccordionContent>
                No. We surface activity and wallet performance signals so you can do your own research. Not financial
                advice.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
