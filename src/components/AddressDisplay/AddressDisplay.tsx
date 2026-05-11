import { useState } from "react";
import { truncateAddress } from "../../utils/address";
import QRCode from "qrcode.react";

interface AddressDisplayProps {
  address: string;
  showQR?: boolean;
}

export function AddressDisplay({ address, showQR = false }: AddressDisplayProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleCopy}
        aria-label="Copy address to clipboard"
        className="flex items-center gap-2 font-mono text-sm px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <span className="text-gray-700 dark:text-gray-300">
          {truncateAddress(address)}
        </span>
        <span className="text-xs text-gray-400">
          {copied ? "✓ Copied" : "Copy"}
        </span>
      </button>

      {showQR && (
        <div className="p-3 bg-white rounded inline-block">
          <QRCode value={address} size={128} />
        </div>
      )}
    </div>
  );
}