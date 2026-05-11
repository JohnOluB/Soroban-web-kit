Here

## Soroban-Ui-kit

A library of reusable React UI components purpose-built for Soroban dApp frontends, covering wallet connection, transaction status, and contract interaction displays.

Overview

Soroban-ui-kit provides developers building on Stellar/Soroban with a battle-tested set of UI primitives — wallet connectors, transaction lifecycle displays, contract call interfaces, token balances, and network badges — so they spend zero time rebuilding common dApp UI patterns and 100% of their time on product logic.

Every component is headless-friendly, accessibility-aware, and designed to compose cleanly
into any existing design system.

Technical Architecture

- Framework: React 18 with TypeScript for type-safe component contracts and prop validation
- Styling: Tailwind CSS with `class-variance-authority (cva)` for variant-driven theming supporting dark/light mode out of the box
- Wallet Integration: `@creit.tech/stellar-wallets-kit` provides a unified adapter layer across Freighter, xBull, Lobstr, and WalletConnect-compatible signers
- SDK Layer: `@stellar/stellar-sdk` handles XDR serialization, transaction building, and Horizon/RPC endpoint communication
- Testing: Vitest + React Testing Library for unit and integration tests; Storybook for isolated component development and visual regression
- Build: Vite in library mode, outputting ESM and CJS bundles with full TypeScript declaration files

Drips Wave Program

This repository is an active participant in the
[Drips Wave Program](https://drips.network)\*\* — a funding mechanism that rewards open-source contributors for resolving scoped GitHub issues with on-chain streaming payments.

How to Contribute & Earn

Step 1 — Register on Drips
Visit [drips.network](https://drips.network) and connect your Ethereum-compatible wallet (MetaMask, Rainbow, etc.). Your wallet address is where reward streams will be sent.

Step 2 — Browse Open Issues
Head to the [Issues tab](../../issues). Issues are labeled by complexity tier:

Label Complexity | Typical Scope

`drips:trivial` - Trivial: Docs fixes, adding a Storybook story, writing a single unit test  
`drips:medium` - Medium: Building a new component variant, adding hook logic, a11y upgrades  
`drips:high` - High: New component families, wallet adapter integrations, full test suites

Step 3 — Claim an Issue

Comment `/claim` on the issue you want to work on. The maintainer will assign it to you.
Only one contributor may hold a claim at a time.

Step 4 — Submit Your Work
Open a Pull Request referencing the issue number (`Closes #XX`). Ensure all CI checks pass
and the component is covered by tests and a Storybook story.

Step 5 — Get Paid
Once the PR is merged, your wallet address is registered in the Drips stream for the bounty
amount tied to that issue's complexity tier. Payments stream continuously — no waiting for
lump sums.

Questions? Open a Discussion or reach out in the issue thread.

Project Structure

soroban-ui-kit/
├── src/
│ ├── components/
│ │ ├── WalletConnect/ # Wallet connection modal and button
│ │ ├── TxStatus/ # Transaction pending/success/error states
│ │ ├── ContractCall/ # Generic contract invocation UI
│ │ ├── TokenDisplay/ # Formatted token balance and symbol
│ │ └── NetworkBadge/ # Testnet/Mainnet/Futurenet indicator
│ ├── hooks/ # useStellarWallet, useTxStatus, useContractCall
│ ├── utils/ # XDR helpers, error parsers, address formatters
│ └── styles/ # Tailwind base config and CSS variables
├── tests/
│ ├── unit/ # Vitest unit tests per component
│ └── integration/ # Multi-component interaction tests
├── docs/ # Additional markdown documentation
├── public/ # Static assets for Storybook
├── package.json
└── README.md

````

---

## Getting Started
```bash
npm install soroban-ui-kit
````

```tsx
import { WalletConnect, TxStatus } from 'soroban-ui-kit';

export default function App() {
  return (
    <div>
      <WalletConnect />
      <TxStatus txHash="abc123..." />
    </div>
  );
}

MIT © soroban-ui-kit contributors
```
