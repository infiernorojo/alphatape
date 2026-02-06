import { useMemo, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Check, Copy, AlertTriangle, ArrowLeft, ExternalLink } from "lucide-react";
import { toast } from "sonner";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { setPlan, type Plan } from "@/lib/plan";
import { useCryptoUsd } from "@/hooks/useCryptoUsd";

type Network = {
  id: string;
  name: string;
  fullName: string;
  address: string;
  warning: string;
};

type Coin = {
  id: string;
  symbol: string;
  name: string;
  coingeckoId: string;
  isStable?: boolean;
  networks: Network[];
};

const COINS: Coin[] = [
  {
    id: "usdt",
    symbol: "USDT",
    name: "Tether",
    coingeckoId: "tether",
    isStable: true,
    networks: [
      {
        id: "trc20",
        name: "TRC20",
        fullName: "Tron (TRC20)",
        address: "TKJWNpZiH1zskhZ9QWagc1Y7AKewWb11C4",
        warning: "Send ONLY via TRC20. Wrong network = permanent loss.",
      },
      {
        id: "bsc",
        name: "BEP20",
        fullName: "BNB Chain (BEP20)",
        address: "0x376818665bC6041fb2cb449cDa362Ed10a492e2e",
        warning: "Send ONLY via BNB Chain (BEP20). Wrong network = permanent loss.",
      },
      {
        id: "polygon",
        name: "Polygon",
        fullName: "Polygon (PoS)",
        address: "0x376818665bC6041fb2cb449cDa362Ed10a492e2e",
        warning: "Send ONLY via Polygon. Wrong network = permanent loss.",
      },
      {
        id: "erc20",
        name: "ERC20",
        fullName: "Ethereum (ERC20)",
        address: "0x376818665bC6041fb2cb449cDa362Ed10a492e2e",
        warning: "Ethereum fees can be high. Send ONLY via ERC20.",
      },
    ],
  },
  {
    id: "usdc",
    symbol: "USDC",
    name: "USD Coin",
    coingeckoId: "usd-coin",
    isStable: true,
    networks: [
      {
        id: "polygon",
        name: "Polygon",
        fullName: "Polygon (PoS)",
        address: "0x376818665bC6041fb2cb449cDa362Ed10a492e2e",
        warning: "Send ONLY via Polygon. Wrong network = permanent loss.",
      },
      {
        id: "solana",
        name: "Solana",
        fullName: "Solana (SPL)",
        address: "87TK1xZ7xopNvaF2k83iuEvqaDM31nKGqf94DGUeAYGp",
        warning: "Send ONLY via Solana (SPL). Wrong network = permanent loss.",
      },
      {
        id: "ethereum",
        name: "Ethereum",
        fullName: "Ethereum (ERC20)",
        address: "0x376818665bC6041fb2cb449cDa362Ed10a492e2e",
        warning: "Ethereum fees can be high. Send ONLY via ERC20.",
      },
    ],
  },
  {
    id: "eth",
    symbol: "ETH",
    name: "Ethereum",
    coingeckoId: "ethereum",
    networks: [
      {
        id: "ethereum",
        name: "Ethereum",
        fullName: "Ethereum Mainnet",
        address: "0x376818665bC6041fb2cb449cDa362Ed10a492e2e",
        warning: "Ethereum fees can be high.",
      },
      {
        id: "arbitrum",
        name: "Arbitrum",
        fullName: "Arbitrum One",
        address: "0x376818665bC6041fb2cb449cDa362Ed10a492e2e",
        warning: "Lower fees than mainnet. Send ONLY via Arbitrum One.",
      },
      {
        id: "polygon",
        name: "Polygon",
        fullName: "Polygon (PoS)",
        address: "0x376818665bC6041fb2cb449cDa362Ed10a492e2e",
        warning: "Very low fees. Send ONLY via Polygon.",
      },
    ],
  },
  {
    id: "btc",
    symbol: "BTC",
    name: "Bitcoin",
    coingeckoId: "bitcoin",
    networks: [
      {
        id: "bitcoin",
        name: "Bitcoin",
        fullName: "Bitcoin",
        address: "bc1qmgux4hu40ltckrdxe40ffhrep2q3mrq6p056gc",
        warning: "Send ONLY via Bitcoin network.",
      },
    ],
  },
  {
    id: "sol",
    symbol: "SOL",
    name: "Solana",
    coingeckoId: "solana",
    networks: [
      {
        id: "solana",
        name: "Solana",
        fullName: "Solana",
        address: "87TK1xZ7xopNvaF2k83iuEvqaDM31nKGqf94DGUeAYGp",
        warning: "Send ONLY via Solana network.",
      },
    ],
  },
  {
    id: "trx",
    symbol: "TRX",
    name: "TRON",
    coingeckoId: "tron",
    networks: [
      {
        id: "tron",
        name: "TRON",
        fullName: "Tron",
        address: "TKJWNpZiH1zskhZ9QWagc1Y7AKewWb11C4",
        warning: "Send ONLY via Tron network.",
      },
    ],
  },
  {
    id: "bnb",
    symbol: "BNB",
    name: "BNB",
    coingeckoId: "binancecoin",
    networks: [
      {
        id: "bsc",
        name: "BSC",
        fullName: "BNB Chain (BEP20)",
        address: "0x376818665bC6041fb2cb449cDa362Ed10a492e2e",
        warning: "Send ONLY via BNB Chain (BEP20).",
      },
    ],
  },
  {
    id: "matic",
    symbol: "MATIC",
    name: "Polygon",
    coingeckoId: "polygon-pos",
    networks: [
      {
        id: "polygon",
        name: "Polygon",
        fullName: "Polygon (PoS)",
        address: "0x376818665bC6041fb2cb449cDa362Ed10a492e2e",
        warning: "Send ONLY via Polygon (PoS).",
      },
    ],
  },
];

const PRICES: Record<Exclude<Plan, "free">, number> = {
  pro: 89,
  team: 499,
};

function formatAddress(addr: string) {
  if (addr.startsWith("0x")) return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

function explorerAddressUrl(netId: string, address: string) {
  if (netId === "bitcoin") return `https://blockstream.info/address/${address}`;
  if (netId === "solana") return `https://solscan.io/account/${address}`;
  if (netId === "tron" || netId === "trc20") return `https://tronscan.org/#/address/${address}`;
  if (netId === "bsc") return `https://bscscan.com/address/${address}`;
  if (netId === "arbitrum") return `https://arbiscan.io/address/${address}`;
  if (netId === "erc20" || netId === "ethereum") return `https://etherscan.io/address/${address}`;
  // default to polygon
  return `https://polygonscan.com/address/${address}`;
}

function explorerLabel(netId: string) {
  if (netId === "bitcoin") return "Blockstream";
  if (netId === "solana") return "Solscan";
  if (netId === "tron" || netId === "trc20") return "Tronscan";
  if (netId === "bsc") return "BscScan";
  if (netId === "arbitrum") return "Arbiscan";
  if (netId === "erc20" || netId === "ethereum") return "Etherscan";
  return "Polygonscan";
}

type CheckoutStep = "select" | "pay";

export default function CheckoutPage() {
  const [params] = useSearchParams();
  const plan = (params.get("plan") as Plan) || "pro";
  const navigate = useNavigate();

  const usdAmount = useMemo(() => {
    if (plan === "team") return PRICES.team;
    return PRICES.pro;
  }, [plan]);

  const rates = useCryptoUsd();

  const [step, setStep] = useState<CheckoutStep>("select");
  const [coin, setCoin] = useState<Coin>(COINS[0]);
  const [networkId, setNetworkId] = useState<string>(COINS[0].networks[0].id);
  const [ack, setAck] = useState(false);
  const [copied, setCopied] = useState(false);

  const network = useMemo(() => coin.networks.find((n) => n.id === networkId) ?? coin.networks[0], [coin, networkId]);

  const usdPerCoin = rates.data?.[coin.coingeckoId]?.usd;
  const payAmount = useMemo(() => {
    if (coin.isStable) return { text: `${usdAmount} ${coin.symbol}`, approx: false };
    if (!usdPerCoin || usdPerCoin <= 0) return { text: `~ ${usdAmount} ${coin.symbol}`, approx: true };
    const amt = usdAmount / usdPerCoin;
    const digits = amt >= 1 ? 4 : 6;
    return { text: `~ ${amt.toFixed(digits)} ${coin.symbol}`, approx: true };
  }, [coin.isStable, coin.symbol, usdAmount, usdPerCoin]);

  const copy = async () => {
    await navigator.clipboard.writeText(network.address);
    setCopied(true);
    toast.success("Address copied");
    setTimeout(() => setCopied(false), 1500);
  };

  const confirm = () => {
    if (!ack) {
      toast.error("Please confirm you understand the network risk.");
      return;
    }

    // Activate plan on this device.
    if (plan !== "free") setPlan(plan);
    toast.success(`Access activated: ${plan.toUpperCase()}`);
    navigate("/demo");
  };

  const handleContinue = () => {
    setStep("pay");
  };

  const handleBack = () => {
    setStep("select");
    setAck(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main" className="pt-20">
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  Back to pricing
                </Link>
                <h1 className="font-heading text-3xl md:text-4xl font-bold mt-3">Checkout</h1>
                <p className="mt-2 text-muted-foreground">
                  Pay with crypto (stablecoins recommended). After sending, click “I sent payment” to activate access.
                </p>
              </div>
              <div className="hidden md:block">
                <div className="rounded-2xl border border-border bg-card/40 p-4 text-right">
                  <div className="text-xs text-muted-foreground">Selected plan</div>
                  <div className="text-lg font-bold gradient-text">{plan.toUpperCase()}</div>
                  <div className="text-sm text-muted-foreground">{usdAmount} USDT / month</div>
                </div>
              </div>
            </div>

            <div className="mt-8 max-w-2xl mx-auto">
              {step === "select" ? (
                <Card className="card-gradient border-border">
                  <div className="p-4 md:p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">1</div>
                      <div>
                        <div className="text-sm font-semibold">Choose payment method</div>
                        <div className="text-xs text-muted-foreground">Select your preferred cryptocurrency and network</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {COINS.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => {
                            setCoin(c);
                            setNetworkId(c.networks[0].id);
                          }}
                          className={
                            "rounded-xl border-2 px-3 py-3 text-left transition-all " +
                            (coin.id === c.id ? "border-primary bg-primary/10" : "border-border bg-card/40 hover:border-primary/50")
                          }
                        >
                          <div className="font-bold text-sm">{c.symbol}</div>
                          <div className="text-xs text-muted-foreground">{c.name}</div>
                        </button>
                      ))}
                    </div>

                    <div className="mt-4">
                      <label className="text-xs text-muted-foreground">Network</label>
                      <select
                        value={networkId}
                        onChange={(e) => setNetworkId(e.target.value)}
                        className="mt-1 w-full p-3 bg-muted border border-border rounded-lg text-sm appearance-none cursor-pointer"
                      >
                        {coin.networks.map((n) => (
                          <option key={n.id} value={n.id}>
                            {n.fullName}
                          </option>
                        ))}
                      </select>

                      <div className="mt-3 flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <p className="text-xs text-yellow-200">{network.warning}</p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-muted-foreground">Amount to pay:</div>
                        <div className="text-lg font-bold">{payAmount.text}</div>
                      </div>
                      <Button variant="hero" className="w-full" onClick={handleContinue}>
                        Continue to payment →
                      </Button>
                      <div className="mt-2 text-center">
                        <Button asChild variant="heroOutline" className="w-full">
                          <Link to="/demo">Skip (demo)</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="card-gradient border-border">
                  <div className="p-4 md:p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">2</div>
                      <div>
                        <div className="text-sm font-semibold">Send payment</div>
                        <div className="text-xs text-muted-foreground">Send the exact amount to the address below</div>
                      </div>
                    </div>

                    <div className="mb-4 p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Selected:</span>
                        <span className="font-semibold">{coin.symbol} on {network.fullName}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-bold text-primary">{payAmount.text}</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-[220px_1fr] gap-4 items-start">
                      <div className="p-4 bg-white rounded-xl w-fit mx-auto md:mx-0">
                        <QRCodeSVG value={network.address} size={180} level="H" includeMargin />
                      </div>

                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Payment address</div>
                        <div className="flex gap-2 items-center">
                          <code className="flex-1 p-3 bg-background rounded-lg text-sm font-mono text-center border border-border">
                            {formatAddress(network.address)}
                          </code>
                          <Button variant="secondary" size="icon" onClick={copy} aria-label="Copy address">
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                        <div className="mt-2 text-[11px] text-muted-foreground break-all">{network.address}</div>

                        <div className="mt-3 text-xs text-muted-foreground">
                          Verify on explorer:
                          <a
                            className="text-primary inline-flex items-center gap-1 ml-2 hover:underline"
                            href={explorerAddressUrl(network.id, network.address)}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {explorerLabel(network.id)} <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0" aria-hidden="true" />
                      <p className="text-xs text-yellow-200">{network.warning}</p>
                    </div>

                    <div className="mt-5 flex items-center gap-3">
                      <Checkbox id="ack" checked={ack} onCheckedChange={(v) => setAck(Boolean(v))} />
                      <label htmlFor="ack" className="text-sm text-muted-foreground">
                        I understand I must send on the selected network.
                      </label>
                    </div>

                    <div className="mt-5 flex flex-col sm:flex-row gap-2">
                      <Button variant="hero" className="sm:flex-1" onClick={confirm}>
                        I sent payment → Unlock
                      </Button>
                      <Button variant="outline" className="sm:flex-1" onClick={handleBack}>
                        ← Change method
                      </Button>
                    </div>

                    <div className="mt-3 text-xs text-muted-foreground text-center">
                      Once active, Pro/Team unlocks the full tape limits and premium widgets.
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
