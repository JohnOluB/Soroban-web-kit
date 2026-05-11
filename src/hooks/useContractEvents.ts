import { useState, useEffect, useRef } from "react";
import type { ContractEvent } from "../types";

interface UseContractEventsParams {
  contractId: string;
  eventType?: string;
  limit?: number;
}

interface ContractEventsState {
  events: ContractEvent[];
  isLoading: boolean;
  error: string | null;
}

export function useContractEvents({
  contractId,
  eventType,
  limit = 10,
}: UseContractEventsParams) {
  const [state, setState] = useState<ContractEventsState>({
    events: [],
    isLoading: false,
    error: null,
  });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function stop() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  useEffect(() => {
    if (!contractId) return;

    setState((s) => ({ ...s, isLoading: true }));

    intervalRef.current = setInterval(async () => {
      try {
        // TODO: fetch contract events via @stellar/stellar-sdk RPC
        console.log("Polling events for:", contractId, eventType, limit);
        setState((s) => ({ ...s, isLoading: false }));
      } catch (err) {
        setState((s) => ({
          ...s,
          isLoading: false,
          error: err instanceof Error ? err.message : "Failed to fetch events",
        }));
        stop();
      }
    }, 5000);

    return () => stop();
  }, [contractId, eventType, limit]);

  return { ...state, stop };
}