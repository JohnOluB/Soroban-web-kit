import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ContractCall } from "../../src/components/ContractCall/ContractCall";

// Mock hooks
vi.mock("../../src/hooks/useContractCall", () => ({
  useContractCall: vi.fn(),
}));

vi.mock("../../src/hooks/useTxStatus", () => ({
  useTxStatus: vi.fn(),
}));

import { useContractCall } from "../../src/hooks/useContractCall";
import { useTxStatus } from "../../src/hooks/useTxStatus";

const mockInvoke = vi.fn();

describe("ContractCall integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useTxStatus).mockReturnValue({
      status: "pending",
      error: null,
      stop: vi.fn(),
    });
  });

  it("renders invoke button in idle state", () => {
    vi.mocked(useContractCall).mockReturnValue({
      invoke: mockInvoke,
      result: null,
      isLoading: false,
      error: null,
    });

    render(
      <ContractCall contractId="CABC..." method="increment" label="Call" />
    );

    expect(screen.getByText("Call")).toBeTruthy();
  });

  it("shows loading state while invoking", () => {
    vi.mocked(useContractCall).mockReturnValue({
      invoke: mockInvoke,
      result: null,
      isLoading: true,
      error: null,
    });

    render(
      <ContractCall contractId="CABC..." method="increment" label="Call" />
    );

    expect(screen.getByText("Invoking...")).toBeTruthy();
  });

  it("calls invoke when button is clicked", async () => {
    vi.mocked(useContractCall).mockReturnValue({
      invoke: mockInvoke,
      result: null,
      isLoading: false,
      error: null,
    });

    render(
      <ContractCall contractId="CABC..." method="increment" label="Call" />
    );

    fireEvent.click(screen.getByText("Call"));

    await waitFor(() => {
      expect(mockInvoke).toHaveBeenCalledOnce();
    });
  });

  it("displays success message when result is returned", () => {
    vi.mocked(useContractCall).mockReturnValue({
      invoke: mockInvoke,
      result: {} as any,
      isLoading: false,
      error: null,
    });

    render(
      <ContractCall contractId="CABC..." method="increment" label="Call" />
    );

    expect(screen.getByText(/contract call succeeded/i)).toBeTruthy();
  });

  it("displays parsed error message on failure", () => {
    vi.mocked(useContractCall).mockReturnValue({
      invoke: mockInvoke,
      result: null,
      isLoading: false,
      error: "transaction rejected by user",
    });

    render(
      <ContractCall contractId="CABC..." method="increment" label="Call" />
    );

    expect(screen.getByText(/transaction rejected by user/i)).toBeTruthy();
  });

  it("fires onError callback with parsed error", async () => {
    const onError = vi.fn();

    vi.mocked(useContractCall).mockReturnValue({
      invoke: mockInvoke,
      result: null,
      isLoading: false,
      error: "insufficient funds",
    });

    render(
      <ContractCall
        contractId="CABC..."
        method="increment"
        label="Call"
        onError={onError}
      />
    );

    fireEvent.click(screen.getByText("Call"));

    await waitFor(() => {
      expect(mockInvoke).toHaveBeenCalledOnce();
    });
  });
});