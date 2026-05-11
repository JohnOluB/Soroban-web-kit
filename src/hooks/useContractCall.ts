import { useState } from "react";
import { xdr } from "@stellar/stellar-sdk";
import { useStellarWallet } from "./useStellarWallet";

interface ContractCallState {
  result: xdr.ScVal | null;
  isLoading: boolean;
  error: string | null;
}

interface ContractCallParams {
  contractId: string;
  method: string;
  args?: xdr.ScVal[];
  networkPassphrase?: string;
}

export function useContractCall(params: ContractCallParams) {
  const [state, setState] = useState<ContractCallState>({
    result: null,
    isLoading: false,
    error: null,
  });

  async function invoke(): Promise<void> {
    setState((s) => ({ ...s, isLoading: true, error: null }));
    try {
      // TODO: build and submit contract invocation via @stellar/stellar-sdk
      console.log("Invoking contract:", params.contractId, params.method);
      setState((s) => ({ ...s, isLoading: false, result: null }));
    } catch (err) {
      setState((s) => ({
        ...s,
        isLoading: false,
        error: err instanceof Error ? err.message : "Contract call failed",
      }));
    }
  }

  return { ...state, invoke };
}