import { useState } from "react";
import { useStellarWallet } from "../../hooks/useStellarWallet";
import { truncateAddress } from "../../utils/address";

const WALLETS = ["Freighter", "xBull", "Lobstr", "WalletConnect"];

export function WalletConnect() {
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected, isConnecting, publicKey, connect, disconnect, error } =
    useStellarWallet();

  if (isConnected && publicKey) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-mono text-gray-700 dark:text-gray-300">
          {truncateAddress(publicKey)}
        </span>
        <button
          onClick={disconnect}
          className="text-xs px-3 py-1 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 rounded bg-indigo-600 text-white text-sm hover:bg-indigo-700"
      >
        Connect Wallet
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="wallet-modal-title"
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
        >
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-80 shadow-xl">
            <h2 id="wallet-modal-title" className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Select Wallet
            </h2>
            <ul className="space-y-2">
              {WALLETS.map((wallet) => (
                <li key={wallet}>
                  <button
                    onClick={() => {
                      connect(wallet.toLowerCase());
                      setIsOpen(false);
                    }}
                    disabled={isConnecting}
                    className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-sm text-gray-800 dark:text-gray-200"
                  >
                    {wallet}
                  </button>
                </li>
              ))}
            </ul>
            {error && <p className="mt-3 text-xs text-red-500">{error}</p>}
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 text-xs text-gray-400 hover:text-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}