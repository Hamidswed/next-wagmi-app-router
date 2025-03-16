"use client";

import { useEffect } from "react";
import {
  useAppKitState,
  useAppKitTheme,
  useAppKitEvents,
  useAppKitAccount,
  useWalletInfo,
} from "@reown/appkit/react";
import { useClientMounted } from "@/hooks/useClientMount";

export const InfoList = () => {
  const kitTheme = useAppKitTheme();
  const state = useAppKitState();
  const { address, caipAddress, isConnected, embeddedWalletInfo } =
    useAppKitAccount();
  const events = useAppKitEvents();
  const walletInfo = useWalletInfo();
  const mounted = useClientMounted();

  useEffect(() => {
    console.log("Events: ", events);
  }, [events]);

  const infoData = [
    {
      title: "useAppKit",
      items: [
        { label: "Address", value: address },
        { label: "CAIP Address", value: caipAddress },
        { label: "Connected", value: isConnected.toString() },
        { label: "Account Type", value: embeddedWalletInfo?.accountType },
        ...(embeddedWalletInfo?.user?.email
          ? [{ label: "Email", value: embeddedWalletInfo.user.email }]
          : []),
        ...(embeddedWalletInfo?.user?.username
          ? [{ label: "Username", value: embeddedWalletInfo.user.username }]
          : []),
        ...(embeddedWalletInfo?.authProvider
          ? [{ label: "Provider", value: embeddedWalletInfo.authProvider }]
          : []),
      ],
    },
    {
      title: "Theme",
      items: [{ label: "Theme Mode", value: kitTheme.themeMode }],
    },
    {
      title: "State",
      items: [
        { label: "Active Chain", value: state.activeChain },
        { label: "Loading", value: state.loading.toString() },
        { label: "Open", value: state.open.toString() },
      ],
    },
    {
      title: "WalletInfo",
      items: [
        {
          label: "Name",
          value: walletInfo.walletInfo?.name?.toString() || "N/A",
        },
      ],
    },
  ];

  return !mounted ? null : (
    <div className="w-full space-y-4">
      {infoData.map((section, index) => (
        <section
          key={index}
          className="bg-white rounded-lg shadow-sm border border-gray-100"
        >
          <h2 className="text-lg font-semibold px-6 py-3 border-b border-gray-100">
            {section.title}
          </h2>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-4 items-center sm:items-start">
              <ul className="flex flex-col gap-y-2 font-medium text-gray-600 col-span-1">
                {section.items.map((item, idx) => (
                  <li key={idx} className="px-2">
                    {item.label}:
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-y-3 font-mono text-sm col-span-2">
                {section.items.map((item, idx) => (
                  <li key={idx} className="px-2 break-all">
                    {item.value || "N/A"}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};
