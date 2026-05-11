# Components

## NetworkBadge

Displays the active Stellar network as a colored badge.

```tsx
import { NetworkBadge } from 'soroban-ui-kit';

<NetworkBadge network="testnet" />
```

| Prop | Type | Required | Default |
|------|------|----------|---------|
| `network` | `"mainnet" \| "testnet" \| "futurenet"` | ✅ | — |

---

## TokenDisplay

Renders a formatted token balance with symbol.

```tsx
import { TokenDisplay } from 'soroban-ui-kit';

<TokenDisplay balance="100.5" symbol="XLM" decimals={2} />
```

| Prop | Type | Required | Default |
|------|------|----------|---------|
| `balance` | `string` | ✅ | — |
| `symbol` | `string` | ✅ | — |
| `decimals` | `number` | ❌ | `7` |
| `isLoading` | `boolean` | ❌ | `false` |

---

## TxStatus

Displays a transaction lifecycle state — pending, success, or error.

```tsx
import { TxStatus } from 'soroban-ui-kit';

<TxStatus txHash="abc123..." />
```

| Prop | Type | Required | Default |
|------|------|----------|---------|
| `txHash` | `string` | ✅ | — |

---

## WalletConnect

A modal that lists and connects available Stellar wallet adapters.

```tsx
import { WalletConnect } from 'soroban-ui-kit';

<WalletConnect />
```

No props required. Consumes `useStellarWallet` internally.

---

## ContractCall

A button-driven UI for invoking Soroban smart contract methods.

```tsx
import { ContractCall } from 'soroban-ui-kit';

<ContractCall
  contractId="CABC..."
  method="increment"
  label="Call Contract"
  onSuccess={(result) => console.log(result)}
  onError={(err) => console.error(err)}
/>
```

| Prop | Type | Required | Default |
|------|------|----------|---------|
| `contractId` | `string` | ✅ | — |
| `method` | `string` | ✅ | — |
| `args` | `xdr.ScVal[]` | ❌ | `[]` |
| `label` | `string` | ❌ | `"Invoke"` |
| `onSuccess` | `(result: xdr.ScVal) => void` | ❌ | — |
| `onError` | `(error: string) => void` | ❌ | — |

---

## AddressDisplay

Shows a truncated wallet address with copy-to-clipboard and optional QR code.

```tsx
import { AddressDisplay } from 'soroban-ui-kit';

<AddressDisplay address="GABC..." showQR={true} />
```

| Prop | Type | Required | Default |
|------|------|----------|---------|
| `address` | `string` | ✅ | — |
| `showQR` | `boolean` | ❌ | `false` |hooks.md