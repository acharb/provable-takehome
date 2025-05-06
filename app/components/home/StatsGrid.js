"use client";

import { useState, useEffect } from "react";
import { Box, Clock, Gauge, DollarSign } from "lucide-react";
import { LoadingSpinner } from "@/app/components/ui/LoadingSpinner";
import { NetworkCharts } from "@/app/components/home/NetworkCharts";
import { useAlert } from "@/app/context/AlertContext";
import { formatCurrency } from "@/app/utils/eth";

export default function StatsGrid() {
  const [networkStats, setNetworkStats] = useState({});
  const [isLoadingData, setIsLoadingData] = useState(true);
  const { showAlert } = useAlert();

  useEffect(() => {
    try {
      const fetchStats = async () => {
        setIsLoadingData(true);
        const response = await fetch("/api/network_stats");
        const data = await response.json();

        setNetworkStats(data);
        setIsLoadingData(false);
      };
      fetchStats();
    } catch (error) {
      showAlert({
        title: "Error",
        description: "Error loading data. Please refresh and try again.",
        variant: "error",
      });
      setIsLoadingData(false);
    }
  }, []);

  // Stats with icons
  const stats = [
    {
      title: "Current Block Number",
      value: networkStats.block_number,
      icon: Box,
    },
    {
      title: "Average Block Time",
      value: `${networkStats.avg_block_time}s`,
      icon: Clock,
    },
    {
      title: "Gas Price",
      value: `${networkStats.gas_price} Gwei`,
      icon: Gauge,
    },
    {
      title: "ETH Price",
      value: `${formatCurrency(networkStats.eth_price)}`,
      icon: DollarSign,
    },
  ];

  return (
    <div className="flex flex-col gap-y-8" data-testid="stats-grid">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-800 hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-lg bg-gray-800 group-hover:scale-105 transition-transform duration-300">
                <stat.icon className="h-6 w-6 text-gray-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-400 mb-1">
                  {stat.title}
                </h3>
                {isLoadingData ? (
                  <LoadingSpinner />
                ) : (
                  <p className="text-2xl font-bold text-gray-100 tracking-tight">
                    {stat.value}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <NetworkCharts
        isLoading={isLoadingData}
        volumeData={networkStats.volume_data}
        activeAddressesData={networkStats.active_addresses_data}
      />
    </div>
  );
}
