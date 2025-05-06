"use client";

import { LineChart } from "@/app/components/ui/Chart";
import { useState } from "react";

export const NetworkCharts = ({
  isLoading,
  volumeData,
  activeAddressesData,
}) => {
  const [volumeTimeframe, setVolumeTimeframe] = useState("7d");
  const [activeAddressesTimeframe, setActiveAddressesTimeframe] =
    useState("1y");

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-6">
      <div className="bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-800 flex-1">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-semibold text-gray-100">
            Transaction Volume
          </h3>
          <div className="inline-flex text-sm text-gray-400">
            <button
              type="button"
              onClick={() => setVolumeTimeframe("7d")}
              className={`cursor-pointer px-2 py-0.5 border-b-2 ${
                volumeTimeframe === "7d"
                  ? "border-indigo-400 font-medium"
                  : "border-transparent hover:border-gray-700"
              }`}
            >
              7d
            </button>
            <button
              type="button"
              onClick={() => setVolumeTimeframe("30d")}
              className={`cursor-pointer px-2 py-0.5 ml-2 border-b-2 ${
                volumeTimeframe === "30d"
                  ? "border-indigo-400 font-medium"
                  : "border-transparent hover:border-gray-700"
              }`}
            >
              30d
            </button>
          </div>
        </div>
        <div className="h-[100px] max-w-[250px] sm:max-w-none">
          {volumeData && (
            <LineChart
              timeframe={volumeTimeframe}
              type="volume"
              data={volumeData}
            />
          )}
        </div>
      </div>
      <div className="bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-800 flex-1">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-semibold text-gray-100">
            Active Addresses
          </h3>
          <div className="inline-flex text-sm text-gray-400">
            <button
              type="button"
              onClick={() => setActiveAddressesTimeframe("1y")}
              className={`cursor-pointer px-2 py-0.5 border-b-2 ${
                activeAddressesTimeframe === "1y"
                  ? "border-indigo-400 font-medium"
                  : "border-transparent hover:border-gray-700"
              }`}
            >
              1y
            </button>
            <button
              type="button"
              onClick={() => setActiveAddressesTimeframe("5y")}
              className={`cursor-pointer px-2 py-0.5 ml-2 border-b-2 ${
                activeAddressesTimeframe === "5y"
                  ? "border-indigo-400 font-medium"
                  : "border-transparent hover:border-gray-700"
              }`}
            >
              5y
            </button>
          </div>
        </div>
        <div className="h-[100px] max-w-[250px] sm:max-w-none">
          {activeAddressesData && (
            <LineChart
              timeframe={activeAddressesTimeframe}
              type="addresses"
              data={activeAddressesData}
            />
          )}
        </div>
      </div>
    </div>
  );
};
