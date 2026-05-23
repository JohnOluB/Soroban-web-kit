/* @vitest-environment jsdom */

import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { WalletBalance } from "../../src/components/WalletBalance/WalletBalance";

const accountAddress = "GBZXN7PIRZGNMHGAZ5A2J6Q5WY4T7K6QX6J7H2X5QY4B7P4UO4V3TEST";

function mockFetch(response: unknown, ok = true, status = 200) {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok,
      status,
      json: vi.fn().mockResolvedValue(response),
    })
  );
}

describe("WalletBalance", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  afterEach(() => {
    cleanup();
  });

  it("fetches and renders native and token balances", async () => {
    mockFetch({
      balances: [
        { asset_type: "native", balance: "100.0000000" },
        {
          asset_type: "credit_alphanum4",
          asset_code: "USDC",
          balance: "25.5000000",
        },
      ],
    });

    render(<WalletBalance accountAddress={accountAddress} />);

    expect(await screen.findByText("XLM")).toBeTruthy();
    expect(screen.getByText("USDC")).toBeTruthy();
    expect(screen.getByText("100.0000000 XLM")).toBeTruthy();
    expect(screen.getByText("25.5000000 USDC")).toBeTruthy();
    expect(fetch).toHaveBeenCalledWith(
      `https://horizon-testnet.stellar.org/accounts/${encodeURIComponent(accountAddress)}`
    );
  });

  it("shows a loading skeleton", () => {
    render(<WalletBalance isLoading={true} />);
    expect(screen.getByLabelText("Loading wallet balances")).toBeTruthy();
  });

  it("shows an empty state", () => {
    render(<WalletBalance balances={[]} />);
    expect(screen.getByText("No balances found for this wallet.")).toBeTruthy();
  });

  it("shows a parsed Horizon error", async () => {
    mockFetch({ title: "not found" }, false, 404);

    render(<WalletBalance accountAddress={accountAddress} />);

    expect((await screen.findByRole("alert")).textContent).toContain(
      "Account not found on Horizon"
    );
  });

  it("refreshes balances when the refresh button is clicked", async () => {
    const onRefresh = vi.fn();
    render(
      <WalletBalance
        balances={[{ asset: "XLM", balance: "1.0000000", isNative: true }]}
        onRefresh={onRefresh}
      />
    );

    screen.getByRole("button", { name: "Refresh" }).click();

    await waitFor(() => {
      expect(onRefresh).toHaveBeenCalledOnce();
    });
  });
});
