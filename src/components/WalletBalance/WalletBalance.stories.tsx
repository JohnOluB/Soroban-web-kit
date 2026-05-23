import type { Meta, StoryObj } from "@storybook/react";
import { WalletBalance } from "./WalletBalance";

const meta = {
  title: "Components/WalletBalance",
  component: WalletBalance,
  args: {
    accountAddress: "GBZXN7PIRZGNMHGAZ5A2J6Q5WY4T7K6QX6J7H2X5QY4B7P4UO4V3TEST",
  },
} satisfies Meta<typeof WalletBalance>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Loaded: Story = {
  args: {
    balances: [
      { asset: "XLM", balance: "125.5000000", isNative: true },
      { asset: "USDC", balance: "42.2500000", isNative: false },
      { asset: "cNGN", balance: "25000.0000000", isNative: false },
    ],
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    balances: [],
  },
};

export const Error: Story = {
  args: {
    error: "Account not found on Horizon",
  },
};
