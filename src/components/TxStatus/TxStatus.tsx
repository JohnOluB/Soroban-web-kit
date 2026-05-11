import { useTxStatus } from "../../hooks/useTxStatus";

interface TxStatusProps {
  txHash: string;
}

export function TxStatus({ txHash }: TxStatusProps) {
  const { status, error } = useTxStatus(txHash);

  if (status === "pending") {
    return (
      <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
        <span className="text-sm">Transaction pending...</span>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
        <span>✓</span>
        <span className="text-sm">Transaction confirmed</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
      <span>✕</span>
      <span className="text-sm">{error ?? "Transaction failed"}</span>
    </div>
  );
}