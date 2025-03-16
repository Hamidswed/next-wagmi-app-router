"use client";
import {
  useDisconnect,
  useAppKit,
  useAppKitNetwork,
} from "@reown/appkit/react";
import { networks } from "@/config";

export const ActionButtonList = () => {
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();
  const { switchNetwork } = useAppKitNetwork();

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  };
  return (
    <div className="flex flex-col gap-y-1 sm:flex-row sm:items-center sm:justify-between sm:gap-x-1">
      <button className="w-full" onClick={() => open()}>
        Open
      </button>
      <button className="w-full" onClick={handleDisconnect}>
        Disconnect
      </button>
      <button className="w-full" onClick={() => switchNetwork(networks[1])}>
        Switch
      </button>
    </div>
  );
};
