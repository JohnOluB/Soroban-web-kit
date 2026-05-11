import { NetworkProvider } from "./context/NetworkContext";
import { NetworkBadge } from "./components/NetworkBadge/NetworkBadge";
import { WalletConnect } from "./components/WalletConnect/WalletConnect";
import { TokenDisplay } from "./components/TokenDisplay/TokenDisplay";
import { AddressDisplay } from "./components/AddressDisplay/AddressDisplay";
import { TxStatus } from "./components/TxStatus/TxStatus";

function ComponentCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white tracking-tight">
          {title}
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">{description}</p>
      </div>
      <div className="px-5 py-5 bg-gray-50 dark:bg-gray-950/50">{children}</div>
    </div>
  );
}

export default function App() {
  return (
    <NetworkProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* Header */}
        <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
              S
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              soroban-ui-kit
            </span>
            <NetworkBadge network="testnet" />
          </div>
          
           <a href="https://github.com/JohnOluB/Soroban-web-kit"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
          View on GitHub
          </a>
        </header>

        {/* Hero */}
        <div className="px-8 py-12 max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
            Component Showcase
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
            Production-ready React UI primitives for Soroban dApp frontends.
            Wallet-aware, accessible, and composable into any design system.
          </p>
          <div className="flex items-center gap-2 mt-5 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 w-fit">
            <span className="text-xs text-gray-400 select-none">$</span>
            <code className="text-xs font-mono text-gray-700 dark:text-gray-200">
              npm install soroban-ui-kit
            </code>
          </div>
        </div>

        {/* Components Grid */}
        <div className="px-8 pb-16 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">

          <ComponentCard
            title="NetworkBadge"
            description="Displays the active Stellar network as a colored badge."
          >
            <div className="flex flex-wrap gap-2">
              <NetworkBadge network="mainnet" />
              <NetworkBadge network="testnet" />
              <NetworkBadge network="futurenet" />
            </div>
          </ComponentCard>

          <ComponentCard
            title="WalletConnect"
            description="Modal for connecting Freighter, xBull, Lobstr, and WalletConnect adapters."
          >
            <WalletConnect />
          </ComponentCard>

          <ComponentCard
            title="TokenDisplay"
            description="Formatted token balance with symbol, decimals, and loading state."
          >
            <div className="flex-col">
              <TokenDisplay balance="1000.50" symbol="XLM" decimals={2} />
              <TokenDisplay balance="250.0000000" symbol="USDC" />
              <TokenDisplay balance="" symbol="ETH" isLoading={true} />
            </div>
          </ComponentCard>

          <ComponentCard
            title="AddressDisplay"
            description="Truncated address with copy-to-clipboard and optional QR code."
          >
            <AddressDisplay
              address="GABC1234WXYZ5678GABC1234WXYZ5678GABC1234WXYZ5678GABC1234WX"
              showQR={false}
            />
          </ComponentCard>

          <ComponentCard
            title="TxStatus"
            description="Transaction lifecycle display — pending, success, or error."
          >
            <div className="space-y-3">
              <TxStatus txHash="abc123pending" />
            </div>
          </ComponentCard>

        </div>
      </div>
    </NetworkProvider>
  );
}