interface TokenDisplayProps {
    balance: string;
    symbol: string;
    decimals?: number;
    isLoading?: boolean;
  }
  
  export function TokenDisplay({
    balance,
    symbol,
    decimals = 7,
    isLoading = false,
  }: TokenDisplayProps) {
    if (isLoading) {
      return (
        <div className="animate-pulse h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
      );
    }
  
    const formatted = balance
      ? parseFloat(balance).toFixed(decimals)
      : "0";
  
    return (
      <span className="font-mono text-sm text-gray-900 dark:text-gray-100">
        {formatted} {symbol}
      </span>
    );
  }