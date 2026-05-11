import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TokenDisplay } from "../../src/components/TokenDisplay/TokenDisplay";

describe("TokenDisplay", () => {
  it("renders balance and symbol", () => {
    render(<TokenDisplay balance="100.5" symbol="XLM" />);
    expect(screen.getByText(/XLM/)).toBeTruthy();
  });

  it("renders loading skeleton when isLoading is true", () => {
    const { container } = render(
      <TokenDisplay balance="" symbol="XLM" isLoading={true} />
    );
    expect(container.querySelector(".animate-pulse")).toBeTruthy();
  });

  it("renders zero balance as 0 not blank", () => {
    render(<TokenDisplay balance="0" symbol="USDC" />);
    expect(screen.getByText(/0/)).toBeTruthy();
  });

  it("formats decimals correctly", () => {
    render(<TokenDisplay balance="50" symbol="XLM" decimals={2} />);
    expect(screen.getByText(/50\.00/)).toBeTruthy();
  });
});