import { createContext, useContext, useState, useEffect } from "react";
import type { NetworkType } from "../types";

const NETWORK_CONFIG: Record<NetworkType, { rpcUrl: string; networkPassphrase: string }> = {
  mainnet: {
    rpcUrl: "https://mainnet.stellar.validations.stellar.org",
    networkPassphrase: "Public Global Stellar Network ; September 2015",
  },
  testnet: {
    rpcUrl: "https://soroban-testnet.stellar.org",
    networkPassphrase: "Test SDF Network ; September 2015",
  },
  futurenet: {
    rpcUrl: "https://rpc-futurenet.stellar.org",
    networkPassphrase: "Test SDF Future Network ; October 2022",
  },
};

interface NetworkContextValue {
  network: NetworkType;
  setNetwork: (n: NetworkType) => void;
  rpcUrl: string;
  networkPassphrase: string;
}

const NetworkContext = createContext<NetworkContextValue | null>(null);

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const [network, setNetworkState] = useState<NetworkType>(() => {
    return (localStorage.getItem("stellar_network") as NetworkType) ?? "testnet";
  });

  function setNetwork(n: NetworkType) {
    localStorage.setItem("stellar_network", n);
    setNetworkState(n);
  }

  const { rpcUrl, networkPassphrase } = NETWORK_CONFIG[network];

  return (
    <NetworkContext.Provider value={{ network, setNetwork, rpcUrl, networkPassphrase }}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork(): NetworkContextValue {
  const ctx = useContext(NetworkContext);
  if (!ctx) throw new Error("useNetwork must be used inside <NetworkProvider>");
  return ctx;
}

