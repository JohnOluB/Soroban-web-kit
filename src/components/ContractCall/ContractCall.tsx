import { useContractCall } from "../../hooks/useContractCall";
import { TxStatus } from "../TxStatus/TxStatus";
import { parseSorobanError } from "../../utils/errors";
import { xdr } from "@stellar/stellar-sdk";

interface ContractCallProps {
  contractId: string;
  method: string;
  args?: xdr.ScVal[];
  label?: string;
  onSuccess?: (result: xdr.ScVal) => void;
  onError?: (error: string) => void;
}

export function ContractCall({
  contractId,
  method,
  args,
  label = "Invoke",
  onSuccess,
  onError,
}: ContractCallProps) {
  const { invoke, isLoading, result, error } = useContractCall({
    contractId,
    method,
    args,
  });

  async function handleClick() {
    await invoke();
    if (result && onSuccess) onSuccess(result);
    if (error && onError) onError(parseSorobanError(error));
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="px-4 py-2 rounded bg-indigo-600 text-white text-sm hover:bg-indigo-700 disabled:opacity-50"
      >
        {isLoading ? "Invoking..." : label}
      </button>

      {isLoading && <TxStatus txHash="pending" />}

      {result && (
        <p className="text-sm text-green-600 dark:text-green-400">
          ✓ Contract call succeeded
        </p>
      )}

      {error && (
        <p className="text-sm text-red-500">{parseSorobanError(error)}</p>
      )}
    </div>
  );
}