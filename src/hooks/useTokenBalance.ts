import { useState, useEffect } from "react";

interface TokenBalanceState {
  balance: string | null;
  isLoading: boolean;
  error: string | null;
}

interface UseTokenBalanceParams {
  contractId: string;
  accountAddress: string;
}

export function useTokenBalance({ contractId, accountAddress }: UseTokenBalanceParams) {
  const [state, setState] = useState<TokenBalanceState>({
    balance: null,
    isLoading: false,
    error: null,
  });

  async function fetchBalance() {
    if (!contractId || !accountAddress) return;
    setState((s) => ({ ...s, isLoading: true, error: null }));
    try {
      // TODO: fetch token balance via @stellar/stellar-sdk
      console.log("Fetching balance for:", accountAddress, "on contract:", contractId);
      setState({ balance: "0", isLoading: false, error: null });
    } catch (err) {
      setState((s) => ({
        ...s,
        isLoading: false,
        error: err instanceof Error ? err.message : "Failed to fetch balance",
      }));
    }
  }

  useEffect(() => {
    fetchBalance();
  }, [contractId, accountAddress]);

  return { ...state, refetch: fetchBalance };
}