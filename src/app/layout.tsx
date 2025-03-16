import type { Metadata } from "next";

import { headers } from "next/headers"; // added
import "./globals.css";
import ContextProvider from "@/context";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Next.js Wagmi App",
  description: "Next.js app with Wagmi integration",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersData = await headers();
  const cookies = headersData.get("cookie");

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <ContextProvider cookies={cookies}>{children}</ContextProvider>
        </Providers>
      </body>
    </html>
  );
}
