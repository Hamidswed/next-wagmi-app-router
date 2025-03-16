"use client";

import { useState, useEffect } from "react";
import {
  useReadContract,
  useWriteContract,
  useAccount,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { Abi } from "viem";
import abi from "../json/abi.json";
import { useClientMounted } from "../hooks/useClientMounted";

// ABI برای توکن ERC20
const erc20ABI = abi as Abi;

// const testABI= [
//     {
//       constant: true,
//       inputs: [],
//       name: "name",
//       outputs: [{ name: "", type: "string" }],
//       type: "function",
//     },
//     {
//       constant: true,
//       inputs: [],
//       name: "symbol",
//       outputs: [{ name: "", type: "string" }],
//       type: "function",
//     },
//     {
//       constant: true,
//       inputs: [{ name: "_owner", type: "address" }],
//       name: "balanceOf",
//       outputs: [{ name: "balance", type: "uint256" }],
//       type: "function",
//     },
//     {
//       constant: true,
//       inputs: [],
//       name: "decimals",
//       outputs: [{ name: "", type: "uint8" }],
//       type: "function",
//     },
//     {
//       constant: false,
//       inputs: [
//         { name: "_to", type: "address" },
//         { name: "_value", type: "uint256" },
//       ],
//       name: "transfer",
//       outputs: [{ name: "", type: "bool" }],
//       type: "function",
//     },
//   ] as const;

interface TokenInfoProps {
  contractAddress: `0x${string}`;
}

export const TokenInfo = ({ contractAddress }: TokenInfoProps) => {
  const mounted = useClientMounted();
  const { address } = useAccount();
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [isTransferring, setIsTransferring] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string>("");
  const [error, setError] = useState<string>("");

  // خواندن نام توکن
  const { data: name } = useReadContract({
    address: contractAddress,
    abi: erc20ABI,
    functionName: "name",
  }) as { data: string | undefined };

  // خواندن سیمبل توکن
  const { data: symbol } = useReadContract({
    address: contractAddress,
    abi: erc20ABI,
    functionName: "symbol",
  }) as { data: string | undefined };

  // خواندن تعداد اعشار توکن
  const { data: decimals } = useReadContract({
    address: contractAddress,
    abi: erc20ABI,
    functionName: "decimals",
  }) as { data: number | undefined };

  // خواندن موجودی توکن
  const { data: balance } = useReadContract({
    address: contractAddress,
    abi: erc20ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  }) as { data: bigint | undefined };

  // نمایش خطاها
  useEffect(() => {
    if (
      name === undefined ||
      symbol === undefined ||
      decimals === undefined ||
      balance === undefined
    ) {
      setError("Loading...");
    } else {
      setError("");
    }
  }, [name, symbol, decimals, balance]);

  // تابع انتقال توکن
  const { writeContract, data: hash } = useWriteContract();

  // پیگیری وضعیت تراکنش
  const {
    isLoading: isTransactionPending,
    isSuccess: isTransactionSuccessful,
  } = useWaitForTransactionReceipt({
    hash: transactionHash as `0x${string}`,
  });

  useEffect(() => {
    if (hash) {
      setTransactionHash(hash);
    }
  }, [hash]);

  // مدیریت انتقال توکن
  const handleTransfer = async () => {
    if (!recipient || !amount || !decimals) return;

    try {
      setIsTransferring(true);
      setError("");
      const parsedAmount = parseUnits(amount, decimals);
      await writeContract({
        address: contractAddress,
        abi: erc20ABI,
        functionName: "transfer",
        args: [recipient as `0x${string}`, parsedAmount],
      });
    } catch (err: any) {
      console.error("Transfer failed:", err);
      setError(err?.message || "Transfer failed");
    } finally {
      setIsTransferring(false);
    }
  };

  // پاک کردن فرم بعد از تراکنش موفق
  useEffect(() => {
    if (isTransactionSuccessful) {
      setRecipient("");
      setAmount("");
      setTransactionHash("");
      setError("");
    }
  }, [isTransactionSuccessful]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-4">
          Token Information
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* اطلاعات توکن */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">{name || "Loading..."}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Symbol:</span>
            <span className="font-medium">{symbol || "Loading..."}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Balance:</span>
            <span className="font-medium">
              {balance && decimals
                ? formatUnits(balance, decimals)
                : "Loading..."}{" "}
              {symbol}
            </span>
          </div>
        </div>

        {/* فرم انتقال توکن */}
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Transfer Tokens</h3>
          <div className="space-y-3">
            <div>
              <label
                htmlFor="recipient"
                className="block text-sm font-medium text-gray-700"
              >
                Recipient Address
              </label>
              <input
                type="text"
                id="recipient"
                className="mt-2 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="0x..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                className="mt-2 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <button
              onClick={handleTransfer}
              disabled={isTransferring || isTransactionPending || !address}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isTransferring || isTransactionPending
                ? "Processing..."
                : "Transfer"}
            </button>
          </div>
        </div>

        {/* نمایش وضعیت تراکنش */}
        {isTransactionSuccessful && transactionHash && (
          <div className="mt-4 p-4 bg-green-50 rounded-md">
            <p className="text-sm text-green-700">
              Transfer successful! Transaction hash: {transactionHash}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
