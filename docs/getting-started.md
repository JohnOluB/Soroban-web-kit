# Getting Started

## Installation

```bash
npm install soroban-ui-kit
```

## Quick Start

Wrap your app with `NetworkProvider` to share network state across all components:

```tsx
import { NetworkProvider, WalletConnect } from 'soroban-ui-kit';

export default function App() {
  return (
    <NetworkProvider>
      <WalletConnect />
    </NetworkProvider>
  );
}
```

## Peer Dependencies

Make sure you have these installed in your project:

```bash
npm install react react-dom @stellar/stellar-sdk
```

## Network Support

soroban-ui-kit supports all three Stellar networks out of the box:

- **Mainnet** — production
- **Testnet** — for development and testing
- **Futurenet** — for bleeding-edge protocol features

Switch networks via the `NetworkSwitcher` component or the `useNetwork` hook.