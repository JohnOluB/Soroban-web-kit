import { cva } from "class-variance-authority";

type Network = "mainnet" | "testnet" | "futurenet";

interface NetworkBadgeProps {
  network: Network;
}

const badge = cva(
  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
  {
    variants: {
      network: {
        mainnet: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        testnet: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        futurenet: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      },
    },
  }
);

export function NetworkBadge({ network }: NetworkBadgeProps) {
  return (
    <span className={badge({ network })}>
      {network.charAt(0).toUpperCase() + network.slice(1)}
    </span>
  );
}