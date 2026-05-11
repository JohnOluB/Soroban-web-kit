export function parseSorobanError(error: unknown): string {
    if (typeof error === "string") return error;
    if (error instanceof Error) return error.message;
    if (typeof error === "object" && error !== null) {
      const e = error as Record<string, unknown>;
      if (typeof e.message === "string") return e.message;
      if (typeof e.detail === "string") return e.detail;
    }
    return "An unexpected error occurred";
  }
  
  export function isTxRejected(error: unknown): boolean {
    return parseSorobanError(error).toLowerCase().includes("rejected");
  }
  
  export function isInsufficientFunds(error: unknown): boolean {
    return parseSorobanError(error).toLowerCase().includes("insufficient");
  }
  
  export function isNetworkError(error: unknown): boolean {
    return parseSorobanError(error).toLowerCase().includes("network");
  }