import { useCallback, useEffect, useState } from "react";
import type { BalanceRecord } from "../types";

const DEFAULT_HORIZON_URL = "https://horizon-testnet.stellar.org";

interface UseWalletBalancesParams {
  accountAddress?: string | null;
  horizonUrl?: string;
  enabled?: boolean;
}

interface WalletBalancesState {
  balances: BalanceRecord[];
  isLoading: boolean;
  error: string | null;
}

interface HorizonBalance {
  balance: string;
  asset_type: string;
  asset_code?: string;
}

interface HorizonAccountResponse {
  balances?: HorizonBalance[];
}

function normalizeHorizonUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

function parseHorizonError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return "Failed to fetch wallet balances";
}

function toBalanceRecord(balance: HorizonBalance): BalanceRecord {
  const isNative = balance.asset_type === "native";
  return {
    asset: isNative ? "XLM" : balance.asset_code ?? balance.asset_type,
    balance: balance.balance,
    isNative,
  };
}

export function useWalletBalances({
  accountAddress,
  horizonUrl = DEFAULT_HORIZON_URL,
  enabled = true,
}: UseWalletBalancesParams) {
  const [state, setState] = useState<WalletBalancesState>({
    balances: [],
    isLoading: false,
    error: null,
  });

  const fetchBalances = useCallback(async () => {
    if (!enabled || !accountAddress) {
      setState({ balances: [], isLoading: false, error: null });
      return;
    }

    setState((current) => ({ ...current, isLoading: true, error: null }));

    try {
      const response = await fetch(
        `${normalizeHorizonUrl(horizonUrl)}/accounts/${encodeURIComponent(accountAddress)}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Account not found on Horizon");
        }
        throw new Error(`Horizon request failed with status ${response.status}`);
      }

      const account = (await response.json()) as HorizonAccountResponse;
      setState({
        balances: (account.balances ?? []).map(toBalanceRecord),
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        balances: [],
        isLoading: false,
        error: parseHorizonError(error),
      });
    }
  }, [accountAddress, enabled, horizonUrl]);

  useEffect(() => {
    void fetchBalances();
  }, [fetchBalances]);

  return { ...state, refetch: fetchBalances };
}
