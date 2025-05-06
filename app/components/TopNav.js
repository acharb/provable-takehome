"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Select from "@/app/components/ui/Select";
import { Search } from "lucide-react";
import { useAlert } from "@/app/context/AlertContext";
import { useRouter } from "next/navigation";
import { isValidEthereumAddress } from "@/app/utils/eth";

const NETWORK_OPTIONS = [
  { id: "mainnet", name: "Mainnet" },
  { id: "testnet", name: "Testnet" },
];

export default function TopNav() {
  const router = useRouter();
  const [selectedNetwork, setSelectedNetwork] = useState(NETWORK_OPTIONS[0]);
  const [searchAddress, setSearchAddress] = useState("");
  const { showAlert } = useAlert();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const cleaned = searchAddress.trim();
      if (!cleaned) {
        showAlert({
          title: "Error",
          message: "Please enter an address",
          type: "error",
        });
        return;
      }

      if (!isValidEthereumAddress(cleaned)) {
        showAlert({
          title: "Error",
          message: "Invalid Ethereum address",
          type: "error",
        });
        return;
      }

      router.push(`/wallet/${cleaned}`);
    }
  };

  return (
    <nav
      className="bg-gray-900 shadow-lg border-b border-gray-800"
      data-testid="top-nav"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <Link
            href="/"
            className="flex items-center justify-center md:justify-start"
            data-testid="nav-home"
          >
            <div className="flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="EthDash Logo"
                width={32}
                height={32}
                className="rounded-md"
              />
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-100">EthDash</h1>
            </div>
          </Link>

          <div
            className="flex flex-row items-center justify-center mt-4 md:mt-0 space-x-2 md:space-x-4"
            data-testid="nav-links"
          >
            <div className="h-10 w-28 md:w-32">
              <Select
                value={selectedNetwork}
                onChange={(val) => {
                  setSelectedNetwork(val);
                  if (val.id !== "mainnet") {
                    showAlert({
                      title: "Warning",
                      message: "Only mainnet is supported for this demo",
                      type: "warning",
                    });
                  }
                }}
                options={NETWORK_OPTIONS}
                data-testid="network-select"
              />
            </div>

            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                value={searchAddress}
                onChange={(e) => {
                  setSearchAddress(e.target.value);
                }}
                onKeyDown={handleSearch}
                placeholder="Search wallet address..."
                className={`w-full h-10 text-xs sm:text-sm text-gray-200 bg-gray-800 py-2 px-4 rounded-lg outline outline-1 -outline-offset-1 outline-gray-700 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500`}
                data-testid="wallet-search"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
