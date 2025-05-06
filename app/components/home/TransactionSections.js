"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { convertHexStringToEther } from "@/utils/hex";
import { useRouter } from "next/navigation";
import { Activity, Ship } from "lucide-react";
import { LoadingSpinner } from "@/app/components/ui/LoadingSpinner";
import { useAlert } from "@/app/context/AlertContext";

export default function TransactionSections() {
  const router = useRouter();
  const [latestTransactions, setLatestTransactions] = useState([]);
  const [whaleTransactions, setWhaleTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showAlert } = useAlert();

  useEffect(() => {
    setIsLoading(true);

    const fetchLatestTransactions = async () => {
      try {
        const response = await fetch("/api/latest_transactions");
        const data = await response.json();
        setLatestTransactions(data.transactions);
      } catch (error) {
        showAlert({
          title: "Error",
          description: "Error loading data. Please refresh and try again.",
          variant: "error",
        });
      }
    };

    const fetchWhaleTransactions = async () => {
      try {
        const response = await fetch("/api/whale_watch");
        const data = await response.json();
        setWhaleTransactions(data.transactions);
      } catch (error) {
        showAlert({
          title: "Error",
          description: "Error loading data. Please refresh and try again.",
          variant: "error",
        });
      }
    };

    fetchLatestTransactions();
    fetchWhaleTransactions();
    setIsLoading(false);
  }, []);

  const getPrettyTxnValueEth = (txnValue) => {
    const converted = convertHexStringToEther(txnValue).toFixed(3);
    if (converted === "0.000") return "0";
    return converted;
  };

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8"
      data-testid="transaction-sections"
    >
      {/* Latest Transactions */}
      <div className="bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-100">
            Latest Transactions
          </h2>
          <span className="text-sm text-gray-400">Live Updates</span>
        </div>
        <div className="min-h-[400px]">
          {isLoading ? (
            <div className="mt-[100px] flex justify-center items-center h-full">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="space-y-3">
              {latestTransactions.map((tx, index) => (
                <div
                  key={index}
                  className="cursor-pointer p-4 rounded-lg bg-gray-800/80 hover:bg-gray-700/90 transition-all duration-200 border border-gray-700/50 backdrop-blur-sm shadow-sm relative"
                  onClick={() => {
                    router.push(`/transaction/${tx.hash}`);
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Activity className="text-indigo-400" size={16} />
                        <div className="text-sm font-medium text-gray-200 truncate max-w-[150px]">
                          {tx.hash}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center space-x-2">
                        <span className="text-xs font-medium text-gray-400">
                          From:
                        </span>
                        <Link
                          href={`/wallet/${tx.from}`}
                          className="text-sm font-medium text-indigo-400 truncate max-w-[120px] hover:text-indigo-300 hover:underline transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          {tx.from}
                        </Link>
                      </div>
                      <div className="mt-1 flex items-center space-x-2">
                        <span className="text-xs font-medium text-gray-400">
                          To:
                        </span>
                        <Link
                          href={`/wallet/${tx.to}`}
                          className="text-sm font-medium text-indigo-400 truncate max-w-[120px] hover:text-indigo-300 hover:underline transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          {tx.to}
                        </Link>
                      </div>
                    </div>
                    <div className="text-right px-3 py-1.5 rounded-md">
                      <span className="text-sm font-bold text-gray-200 flex items-center">
                        {getPrettyTxnValueEth(tx.value)} ETH
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Whale Watch */}
      <div className="bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-100">Whale Watch</h2>
          <span className="text-sm text-gray-400">Large Transactions</span>
        </div>
        <div className="min-h-[400px]">
          {isLoading ? (
            <div className="mt-[100px] flex justify-center items-center h-full">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="space-y-3">
              {whaleTransactions.map((tx, index) => (
                <div
                  key={index}
                  className="cursor-pointer p-4 rounded-lg bg-gray-800/80 hover:bg-gray-700/90 transition-all duration-200 border border-gray-700/50 backdrop-blur-sm shadow-sm relative"
                  onClick={() => {
                    router.push(`/transaction/${tx.hash}`);
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Ship className="text-indigo-400" size={16} />
                        <div className="text-sm font-medium text-gray-200 truncate max-w-[150px]">
                          {tx.hash}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center space-x-2">
                        <span className="text-xs font-medium text-gray-400">
                          From:
                        </span>
                        <Link
                          href={`/wallet/${tx.from}`}
                          className="text-sm font-medium text-indigo-400 truncate max-w-[120px] hover:text-indigo-300 hover:underline transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          {tx.from}
                        </Link>
                      </div>
                      <div className="mt-1 flex items-center space-x-2">
                        <span className="text-xs font-medium text-gray-400">
                          To:
                        </span>
                        <Link
                          href={`/wallet/${tx.to}`}
                          className="text-sm font-medium text-indigo-400 truncate max-w-[120px] hover:text-indigo-300 hover:underline transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          {tx.to}
                        </Link>
                      </div>
                    </div>
                    <div className="text-right px-3 py-1.5 rounded-md">
                      <span className="text-sm font-bold text-gray-200 flex items-center">
                        {getPrettyTxnValueEth(tx.value)} ETH
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
