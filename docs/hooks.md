# Hooks

## useStellarWallet

Core wallet hook. Manages connection state across all wallet adapters.

```ts
import { useStellarWallet } from 'soroban-ui-kit';

const { publicKey, isConnected, isConnecting, error, connect, disconnect } = useStellarWallet();
```

| Return | Type | Description |
|--------|------|-------------|
| `publicKey` | `string \| null` | Connected wallet public key |
| `isConnected` | `boolean` | Whether a wallet is connected |
| `isConnecting` | `boolean` | Whether a connection is in progress |
| `error` | `string \| null` | Last connection error |
| `connect` | `(walletId: string) => Promise<void>` | Connect a wallet by ID |
| `disconnect` | `() => void` | Disconnect the current wallet |

---

## useTxStatus

Polls transaction status from Horizon/RPC until a terminal state is reached.

```ts
import { useTxStatus } from 'soroban-ui-kit';

const { status, error, stop } = useTxStatus(txHash, 3000);
```

| Param | Type | Required | Default |
|-------|------|----------|---------|
| `txHash` | `string` | ✅ | — |
| `pollInterval` | `number` | ❌ | `3000` |

| Return | Type | Description |
|--------|------|-------------|
| `status` | `"pending" \| "success" \| "error"` | Current tx status |
| `error` | `string \| null` | Error message if failed |
| `stop` | `() => void` | Manually stop polling |

---

## useContractCall

Builds and submits a Soroban contract invocation transaction.

```ts
import { useContractCall } from 'soroban-ui-kit';

const { invoke, result, isLoading, error } = useContractCall({
  contractId: "CABC...",
  method: "increment",
  args: [],
});
```

| Return | Type | Description |
|--------|------|-------------|
| `invoke` | `() => Promise<void>` | Trigger the contract call |
| `result` | `xdr.ScVal \| null` | Return value from contract |
| `isLoading` | `boolean` | Whether call is in progress |
| `error` | `string \| null` | Error message if failed |

---

## useTokenBalance

Fetches a token balance for an account from a Soroban contract.

```ts
import { useTokenBalance } from 'soroban-ui-kit';

const { balance, isLoading, error, refetch } = useTokenBalance({
  contractId: "CABC...",
  accountAddress: "GABC...",
});
```

| Return | Type | Description |
|--------|------|-------------|
| `balance` | `string \| null` | Formatted token balance |
| `isLoading` | `boolean` | Whether fetch is in progress |
| `error` | `string \| null` | Error message if failed |
| `refetch` | `() => void` | Manually trigger a fresh fetch |

---

## useContractEvents

Polls for contract events from Soroban RPC.

```ts
import { useContractEvents } from 'soroban-ui-kit';

const { events, isLoading, error, stop } = useContractEvents({
  contractId: "CABC...",
  eventType: "transfer",
  limit: 10,
});
```

| Return | Type | Description |
|--------|------|-------------|
| `events` | `ContractEvent[]` | List of received events |
| `isLoading` | `boolean` | Whether polling is active |
| `error` | `string \| null` | Error message if failed |
| `stop` | `() => void` | Stop polling |

---

## useNetwork

Reads and sets the active Stellar network from `NetworkContext`.

```ts
import { useNetwork } from 'soroban-ui-kit';

const { network, setNetwork, rpcUrl, networkPassphrase } = useNetwork();
```

> Must be used inside `<NetworkProvider>`.