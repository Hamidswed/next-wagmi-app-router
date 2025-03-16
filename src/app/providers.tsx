"use client";

import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "../config/wagmi";
import { useClientMounted } from "../hooks/useClientMounted";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const mounted = useClientMounted();

  if (!mounted) {
    return <div suppressHydrationWarning>{children}</div>;
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
