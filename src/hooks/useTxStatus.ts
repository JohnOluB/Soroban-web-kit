import { useState, useEffect, useRef } from "react";

type TxStatus = "pending" | "success" | "error";

interface TxStatusState {
  status: TxStatus;
  error: string | null;
}

export function useTxStatus(txHash: string, pollInterval = 3000) {
  const [state, setState] = useState<TxStatusState>({
    status: "pending",
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
    if (!txHash) return;

    intervalRef.current = setInterval(async () => {
      try {
        // SDK polling logic goes here
        console.log("Polling tx:", txHash);
      } catch (err) {
        setState({
          status: "error",
          error: err instanceof Error ? err.message : "Transaction failed",
        });
        stop();
      }
    }, pollInterval);

    return () => stop();
  }, [txHash, pollInterval]);

  return { ...state, stop };
}