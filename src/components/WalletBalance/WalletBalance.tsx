import type { BalanceRecord } from "../../types";
import { useWalletBalances } from "../../hooks/useWalletBalances";
import { TokenDisplay } from "../TokenDisplay/TokenDisplay";

interface WalletBalanceProps {
  accountAddress?: string | null;
  horizonUrl?: string;
  balances?: BalanceRecord[];
  isLoading?: boolean;
  error?: string | null;
  onRefresh?: () => void | Promise<void>;
  emptyMessage?: string;
}

export function WalletBalance({
  accountAddress,
  horizonUrl,
  balances,
  isLoading,
  error,
  onRefresh,
  emptyMessage = "No balances found for this wallet.",
}: WalletBalanceProps) {
  const shouldFetch = balances === undefined && isLoading === undefined && error === undefined;
  const walletBalances = useWalletBalances({
    accountAddress,
    horizonUrl,
    enabled: shouldFetch,
  });

  const displayedBalances = balances ?? walletBalances.balances;
  const displayedLoading = isLoading ?? walletBalances.isLoading;
  const displayedError = error ?? walletBalances.error;
  const refresh = onRefresh ?? walletBalances.refetch;

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Wallet balances
          </h2>
          {accountAddress ? (
            <p className="text-xs text-gray-500 dark:text-gray-400">{accountAddress}</p>
          ) : null}
        </div>
        <button
          type="button"
          className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-900"
          disabled={displayedLoading}
          onClick={() => {
            void refresh();
          }}
        >
          Refresh
        </button>
      </div>

      {displayedLoading ? (
        <div aria-label="Loading wallet balances" className="space-y-3">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="h-10 animate-pulse rounded-md bg-gray-100 dark:bg-gray-800"
            />
          ))}
        </div>
      ) : null}

      {!displayedLoading && displayedError ? (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
        >
          {displayedError}
        </div>
      ) : null}

      {!displayedLoading && !displayedError && displayedBalances.length === 0 ? (
        <div className="rounded-md border border-dashed border-gray-300 px-3 py-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
          {emptyMessage}
        </div>
      ) : null}

      {!displayedLoading && !displayedError && displayedBalances.length > 0 ? (
        <ul className="divide-y divide-gray-100 dark:divide-gray-800">
          {displayedBalances.map((balance) => (
            <li key={`${balance.asset}-${balance.isNative}`} className="flex items-center justify-between py-3">
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {balance.asset}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {balance.isNative ? "Native asset" : "Stellar token"}
                </div>
              </div>
              <TokenDisplay balance={balance.balance} symbol={balance.asset} />
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
