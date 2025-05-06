"use client";

import { useEffect, useState, use } from "react";
import { getAnkrTokenData } from "@/utils/ankr";
import TopNav from "@/app/components/TopNav";
import { UserCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Toggle from "@/app/components/ui/Toggle";
import TokenList from "@/app/components/wallet/TokenList";
import NFTGrid from "@/app/components/wallet/NFTGrid";
import { AssetPieChart } from "@/app/components/ui/Chart";
import { LoadingSpinner } from "@/app/components/ui/LoadingSpinner";
import Footer from "@/app/components/Footer";
import { useAlert } from "@/app/context/AlertContext";

export default function WalletPage({ params }) {
  const { accountId } = use(params);
  const [accountData, setAccountData] = useState({});
  const [nftData, setNftData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showNFTs, setShowNFTs] = useState(false);
  const { showAlert } = useAlert();

  useEffect(() => {
    if (!accountId) return;

    setIsLoading(true);
    const fetchAccountData = async () => {
      try {
        const data = await getAnkrTokenData("ankr_getAccountBalance", {
          blockchain: "eth",
          walletAddress: accountId,
        });

        setAccountData(data);
      } catch (error) {
        showAlert({
          title: "Error",
          description: "Error loading data. Please refresh and try again.",
          variant: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchAccountData();
  }, [accountId]);

  useEffect(() => {
    if (!showNFTs || !accountId) return;

    setIsLoading(true);
    const fetchNFTs = async () => {
      try {
        const data = await getAnkrTokenData("ankr_getNFTsByOwner", {
          blockchain: "eth",
          walletAddress: accountId,
        });

        setNftData(data);
      } catch (e) {
        showAlert({
          title: "Error",
          description: "Error loading data. Please refresh and try again.",
          variant: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchNFTs();
  }, [showNFTs, accountId]);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <TopNav />
        <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="min-h-[100vh] bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-800">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
              <Link
                href="/"
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors self-start"
              >
                <ArrowLeft className="w-5 h-5 text-gray-300" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-800 rounded-full">
                  <UserCircle className="w-6 h-6 sm:w-8 sm:h-8 text-gray-300" />
                </div>
                <div>
                  <h1
                    className="text-sm sm:text-lg font-bold text-gray-100 break-all"
                    data-testid="account-id"
                  >
                    {accountId}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Ethereum Address
                  </p>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-[50vh]">
                <LoadingSpinner size="large" />
              </div>
            ) : (
              <>
                <div className="flex justify-start mb-4 sm:mb-6">
                  <Toggle
                    enabled={showNFTs}
                    onChange={setShowNFTs}
                    leftLabel="balance"
                    rightLabel="NFT"
                  />
                </div>

                {!showNFTs ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="">
                        <div className="h-[fit-content] bg-gray-800 rounded-xl p-4 sm:p-6">
                          <h2 className="text-base sm:text-lg font-semibold text-gray-100 mb-2 sm:mb-4">
                            Total Balance
                          </h2>
                          <div className="space-y-1 sm:space-y-2">
                            <div
                              className="text-xl sm:text-3xl font-bold text-gray-100"
                              data-testid="total-balance"
                            >
                              $
                              {Number(
                                accountData.totalBalanceUsd
                              ).toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </div>
                            <div className="text-sm sm:text-lg text-gray-300">
                              {
                                accountData?.assets?.find(
                                  (asset) => asset.tokenSymbol === "ETH"
                                )?.balance
                              }
                              ETH
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-800 rounded-xl p-4 sm:p-6">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-100 mb-2 sm:mb-4">
                          Token Distribution
                        </h2>
                        {accountData.assets && (
                          <div className="h-[200px] sm:h-[300px]">
                            <AssetPieChart assets={accountData.assets} />
                          </div>
                        )}
                      </div>
                    </div>
                    {accountData.assets && (
                      <TokenList assets={accountData.assets} />
                    )}
                  </>
                ) : (
                  nftData.assets && <NFTGrid nfts={nftData.assets} />
                )}
              </>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
