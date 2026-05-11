import { NetworkProvider } from "./context/NetworkContext";
import { NetworkBadge } from "./components/NetworkBadge/NetworkBadge";
import { WalletConnect } from "./components/WalletConnect/WalletConnect";
import { TokenDisplay } from "./components/TokenDisplay/TokenDisplay";
import { AddressDisplay } from "./components/AddressDisplay/AddressDisplay";
import { TxStatus } from "./components/TxStatus/TxStatus";

export default function App() {
  return (
    <NetworkProvider>
      <div className="min-h-screen bg-white dark:bg-gray-950 p-8 space-y-8">

        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Soroban UI Kit
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Component preview — for development only
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            NetworkBadge
          </h2>
          <div className="flex gap-2">
            <NetworkBadge network="mainnet" />
            <NetworkBadge network="testnet" />
            <NetworkBadge network="futurenet" />
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            WalletConnect
          </h2>
          <WalletConnect />
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            TokenDisplay
          </h2>
          <TokenDisplay balance="1000.50" symbol="XLM" decimals={2} />
          <TokenDisplay balance="" symbol="USDC" isLoading={true} />
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            AddressDisplay
          </h2>
          <AddressDisplay
            address="GABC1234WXYZ5678GABC1234WXYZ5678GABC1234WXYZ5678GABC1234WX"
            showQR={true}
          />
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            TxStatus
          </h2>
          <TxStatus txHash="abc123pending" />
        </section>

      </div>
    </NetworkProvider>
  );
}