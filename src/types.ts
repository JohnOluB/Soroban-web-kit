export type NetworkType = "mainnet" | "testnet" | "futurenet";

export interface ContractEvent {
  id: string;
  type: string;
  payload: unknown[];
  ledger: number;
  timestamp: string;
}

export interface BalanceRecord {
  asset: string;
  balance: string;
  isNative: boolean;
}

export interface TxRecord {
  hash: string;
  date: string;
  status: "success" | "failed" | "pending";
  fee: string;
}