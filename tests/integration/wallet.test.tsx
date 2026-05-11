import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { WalletConnect } from "../../src/components/WalletConnect/WalletConnect";

// Mock useStellarWallet
vi.mock("../../src/hooks/useStellarWallet", () => ({
  useStellarWallet: vi.fn(),
}));

import { useStellarWallet } from "../../src/hooks/useStellarWallet";

const mockDisconnect = vi.fn();
const mockConnect = vi.fn();

describe("WalletConnect integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Connect Wallet button when disconnected", () => {
    vi.mocked(useStellarWallet).mockReturnValue({
      publicKey: null,
      isConnected: false,
      isConnecting: false,
      error: null,
      connect: mockConnect,
      disconnect: mockDisconnect,
    });

    render(<WalletConnect />);
    expect(screen.getByText("Connect Wallet")).toBeTruthy();
  });

  it("opens modal and lists all wallet options", () => {
    vi.mocked(useStellarWallet).mockReturnValue({
      publicKey: null,
      isConnected: false,
      isConnecting: false,
      error: null,
      connect: mockConnect,
      disconnect: mockDisconnect,
    });

    render(<WalletConnect />);
    fireEvent.click(screen.getByText("Connect Wallet"));

    expect(screen.getByText("Freighter")).toBeTruthy();
    expect(screen.getByText("xBull")).toBeTruthy();
    expect(screen.getByText("Lobstr")).toBeTruthy();
    expect(screen.getByText("WalletConnect")).toBeTruthy();
  });

  it("calls connect with correct wallet ID on selection", () => {
    vi.mocked(useStellarWallet).mockReturnValue({
      publicKey: null,
      isConnected: false,
      isConnecting: false,
      error: null,
      connect: mockConnect,
      disconnect: mockDisconnect,
    });

    render(<WalletConnect />);
    fireEvent.click(screen.getByText("Connect Wallet"));
    fireEvent.click(screen.getByText("Freighter"));

    expect(mockConnect).toHaveBeenCalledWith("freighter");
  });

  it("shows truncated public key when connected", () => {
    vi.mocked(useStellarWallet).mockReturnValue({
      publicKey: "GABC1234WXYZ5678GABC1234WXYZ5678GABC1234WXYZ5678GABC1234WX",
      isConnected: true,
      isConnecting: false,
      error: null,
      connect: mockConnect,
      disconnect: mockDisconnect,
    });

    render(<WalletConnect />);
    expect(screen.getByText(/GABC/)).toBeTruthy();
    expect(screen.getByText("Disconnect")).toBeTruthy();
  });

  it("calls disconnect when disconnect button is clicked", async () => {
    vi.mocked(useStellarWallet).mockReturnValue({
      publicKey: "GABC1234WXYZ5678GABC1234WXYZ5678GABC1234WXYZ5678GABC1234WX",
      isConnected: true,
      isConnecting: false,
      error: null,
      connect: mockConnect,
      disconnect: mockDisconnect,
    });

    render(<WalletConnect />);
    fireEvent.click(screen.getByText("Disconnect"));

    await waitFor(() => {
      expect(mockDisconnect).toHaveBeenCalledOnce();
    });
  });

  it("displays error message on failed connection", () => {
    vi.mocked(useStellarWallet).mockReturnValue({
      publicKey: null,
      isConnected: false,
      isConnecting: false,
      error: "Wallet not found",
      connect: mockConnect,
      disconnect: mockDisconnect,
    });

    render(<WalletConnect />);
    fireEvent.click(screen.getByText("Connect Wallet"));
    expect(screen.getByText("Wallet not found")).toBeTruthy();
  });
});