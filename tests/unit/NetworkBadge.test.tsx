import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { NetworkBadge } from "../../src/components/NetworkBadge/NetworkBadge";

describe("NetworkBadge", () => {
  it("renders mainnet correctly", () => {
    render(<NetworkBadge network="mainnet" />);
    expect(screen.getByText("Mainnet")).toBeTruthy();
  });

  it("renders testnet correctly", () => {
    render(<NetworkBadge network="testnet" />);
    expect(screen.getByText("Testnet")).toBeTruthy();
  });

  it("renders futurenet correctly", () => {
    render(<NetworkBadge network="futurenet" />);
    expect(screen.getByText("Futurenet")).toBeTruthy();
  });
});