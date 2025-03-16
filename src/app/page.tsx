// import { cookieStorage, createStorage, http } from '@wagmi/core'
import { ConnectButton } from "@/components/ConnectButton";
import { InfoList } from "@/components/InfoList";
import { ActionButtonList } from "@/components/ActionButtonList";
import { TokenInfo } from "@/components/TokenInfo";
import Image from "next/image";

export default function Home() {
  // آدرس قرارداد USDT در شبکه اتریوم
  const usdtAddress =
    "0x7FFB3d637014488b63fb9858E279385685AFc1e2" as `0x${string}`;

  return (
    <main className="min-h-screen w-full">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-start gap-6 md:gap-8 lg:gap-10">
        {/* Logo section */}
        <div className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] relative">
          <Image
            src="/reown.svg"
            alt="Reown"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Title section */}
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center max-w-2xl">
          AppKit Wagmi Next.js App Router Example
        </h1>

        {/* Connect Button section */}
        <div className="w-full max-w-md">
          <ConnectButton />
        </div>

        {/* Token Info section */}
        <TokenInfo contractAddress={usdtAddress} />

        {/* Action Buttons section */}
        <div className="w-full max-w-xl">
          <ActionButtonList />
        </div>

        {/* Advice section */}
        {/* <div className="w-full max-w-lg">
          <div className="text-center space-y-2 p-4 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-sm md:text-base">
              This projectId only works on localhost.{" "}
              <br className="md:hidden" />
              Go to{" "}
              <a
                href="https://cloud.reown.com"
                target="_blank"
                className="inline-block bg-black text-white px-3 py-1.5 rounded hover:bg-white hover:text-black transition-colors duration-300 border border-black"
                rel="noopener noreferrer"
              >
                Reown Cloud
              </a>{" "}
              to get your own.
            </p>
          </div>
        </div> */}

        {/* Info List section */}
        <div className="w-full max-w-2xl">
          <InfoList />
        </div>
      </div>
    </main>
  );
}
