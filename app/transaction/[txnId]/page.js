"use client";

import { useEffect, useState, use } from "react";
import { getAnkrNodeData } from "@/utils/ankr";
import TopNav from "@/app/components/TopNav";
import { ArrowLeft, Receipt, ExternalLink } from "lucide-react";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import {
  convertHexStringToInteger,
  convertHexStringToEther,
  convertHexStringToGwei,
} from "@/utils/hex";

export default function TransactionPage({ params }) {
  const { txnId } = use(params);
  const [transaction, setTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!txnId) return;

    setIsLoading(true);
    const fetchTransaction = async () => {
      const data = await getAnkrNodeData("eth_getTransactionByHash", [txnId]);
      setTransaction(data);
      setIsLoading(false);
    };
    fetchTransaction();
  }, [txnId]);

  return (
    <>
      <div className="min-h-screen bg-gray-950 flex flex-col">
        <TopNav />
        <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-800">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <Link
                  href="/"
                  className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                </Link>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="p-2 bg-gray-800 rounded-full">
                    <Receipt className="w-6 h-6 sm:w-8 sm:h-8 text-gray-300" />
                  </div>
                  <div>
                    <h1 className="text-lg sm:text-xl font-bold text-gray-100">
                      Transaction Details
                    </h1>
                    <p
                      data-testid="transaction-hash"
                      className="text-xs sm:text-sm text-gray-400 font-mono truncate max-w-[200px] sm:max-w-none"
                    >
                      {txnId}
                    </p>
                  </div>
                </div>
              </div>
              <a
                href={`https://etherscan.io/tx/${txnId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 px-3 py-2 sm:px-4 bg-gray-800 text-indigo-400 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <span className="text-xs sm:text-sm font-medium">
                  Etherscan
                </span>
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : transaction ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                <div className="space-y-4 sm:space-y-8">
                  <div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700">
                    <h2
                      className="text-xs sm:text-sm font-medium text-gray-400 mb-2 sm:mb-3"
                      data-testid="transaction-from"
                    >
                      From
                    </h2>
                    <Link
                      href={`/wallet/${transaction.from}`}
                      className="text-xs sm:text-sm font-mono text-indigo-400 hover:text-indigo-300 hover:underline break-all"
                    >
                      <div className="max-w-full truncate">
                        {transaction.from}
                      </div>
                    </Link>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700">
                    <h2
                      className="text-xs sm:text-sm font-medium text-gray-400 mb-2 sm:mb-3"
                      data-testid="transaction-to"
                    >
                      To
                    </h2>
                    <Link
                      href={`/wallet/${transaction.to}`}
                      className="text-xs sm:text-sm font-mono text-indigo-400 hover:text-indigo-300 hover:underline break-all"
                    >
                      <div className="max-w-full truncate">
                        {transaction.to}
                      </div>
                    </Link>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700">
                    <h2
                      className="text-xs sm:text-sm font-medium text-gray-400 mb-2 sm:mb-3"
                      data-testid="transaction-value"
                    >
                      Value
                    </h2>
                    <p className="text-sm sm:text-base font-bold text-gray-100">
                      {convertHexStringToEther(transaction.value).toFixed(6)}{" "}
                      ETH
                    </p>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-8">
                  <div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700">
                    <h2 className="text-xs sm:text-sm font-medium text-gray-400 mb-2 sm:mb-3">
                      Gas
                    </h2>
                    <p className="text-sm sm:text-base font-bold text-gray-100">
                      {convertHexStringToInteger(
                        transaction.gas
                      ).toLocaleString()}{" "}
                      units
                    </p>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700">
                    <h2 className="text-xs sm:text-sm font-medium text-gray-400 mb-2 sm:mb-3">
                      Gas Price
                    </h2>
                    <p className="text-sm sm:text-base font-bold text-gray-100">
                      {convertHexStringToGwei(transaction.gasPrice).toFixed(2)}
                      Gwei
                    </p>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700">
                    <h2 className="text-xs sm:text-sm font-medium text-gray-400 mb-2 sm:mb-3">
                      Block
                    </h2>
                    <p className="text-sm sm:text-base font-bold text-gray-100">
                      #
                      {convertHexStringToInteger(
                        transaction.blockNumber
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">Transaction not found</p>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
