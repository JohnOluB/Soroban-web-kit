import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AddressDisplay } from "../../src/components/AddressDisplay/AddressDisplay";

const MOCK_ADDRESS = "GABC1234WXYZ5678GABC1234WXYZ5678GABC1234WXYZ5678GABC1234WX";

describe("AddressDisplay", () => {
  it("renders truncated address", () => {
    render(<AddressDisplay address={MOCK_ADDRESS} />);
    expect(screen.getByText(/GABC/)).toBeTruthy();
  });

  it("has correct aria-label for accessibility", () => {
    render(<AddressDisplay address={MOCK_ADDRESS} />);
    expect(
      screen.getByRole("button", { name: /copy address to clipboard/i })
    ).toBeTruthy();
  });

  it("shows copied confirmation on click", async () => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
    render(<AddressDisplay address={MOCK_ADDRESS} />);
    fireEvent.click(screen.getByRole("button", { name: /copy address/i }));
    expect(await screen.findByText(/copied/i)).toBeTruthy();
  });

  it("renders QR code when showQR is true", () => {
    const { container } = render(
      <AddressDisplay address={MOCK_ADDRESS} showQR={true} />
    );
    expect(container.querySelector("canvas, svg")).toBeTruthy();
  });
});