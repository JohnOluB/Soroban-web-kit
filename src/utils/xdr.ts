import { xdr, ScInt } from "@stellar/stellar-sdk";

export function scValToString(val: xdr.ScVal): string {
  try {
    return val.value()?.toString() ?? "";
  } catch {
    return "";
  }
}

export function stringToScVal(val: string): xdr.ScVal {
  return xdr.ScVal.scvString(val);
}

export function numberToScVal(val: number): xdr.ScVal {
  return new ScInt(val).toScVal();
}

export function scValToNumber(val: xdr.ScVal): number {
  try {
    return Number(val.value());
  } catch {
    return 0;
  }
}