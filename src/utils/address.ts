export function truncateAddress(
    address: string,
    start = 4,
    end = 4
  ): string {
    if (!address) return "";
    return `${address.slice(0, start)}...${address.slice(-end)}`;
  }
  
  export function isValidStellarAddress(address: string): boolean {
    return /^G[A-Z2-7]{55}$/.test(address);
  }
  
  export function isValidContractId(id: string): boolean {
    return /^C[A-Z2-7]{55}$/.test(id);
  }