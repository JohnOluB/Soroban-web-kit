import { useState } from "react";

interface WalletState {
  publicKey: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
}

export function useStellarWallet() {
  const [state, setState] = useState<WalletState>({
    publicKey: null,
    isConnected: false,
    isConnecting: false,
    error: null,
  });

  async function connect(walletId: string): Promise<void> {
    setState((s) => ({ ...s, isConnecting: true, error: null }));
    try {
      // wallet kit integration goes here
      console.log("Connecting wallet:", walletId);
      setState((s) => ({
        ...s,
        isConnecting: false,
        isConnected: true,
        publicKey: "PLACEHOLDER_PUBLIC_KEY",
      }));
    } catch (err) {
      setState((s) => ({
        ...s,
        isConnecting: false,
        error: err instanceof Error ? err.message : "Connection failed",
      }));
    }
  }

  function disconnect(): void {
    setState({
      publicKey: null,
      isConnected: false,
      isConnecting: false,
      error: null,
    });
  }

  return { ...state, connect, disconnect };
}