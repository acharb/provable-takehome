"use client";

import { useEffect, useRef } from "react";
import ChartJS from "chart.js/auto";

export const Chart = ({ data, options, type }) => {
  const canvasRef = useRef(null);
  // need to hold instance of chart, bc chartjs doesnt let you re-initialize chart on canvas
  //   unless old one destroyed first
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create new chart into canvas
    const ctx = canvasRef.current.getContext("2d");
    chartInstanceRef.current = new ChartJS(ctx, {
      type,
      data,
      options,
    });

    // Remove the chart on unmount - prevent mem leaks / errors
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [JSON.stringify(data)]); // Redraw only if data content changes

  return <canvas ref={canvasRef} />;
};

export const LineChart = ({ timeframe, type, data }) => {
  const selectedTimeframe = data[timeframe] || data[Object.keys(data)[0]];

  const chartData = {
    labels: selectedTimeframe.labels,
    datasets: [
      {
        label: type === "volume" ? "Transaction Volume" : "Active Addresses",
        data: selectedTimeframe.data,
        borderColor: "#6366f1", // Indigo color to match the app's theme
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 100);
          gradient.addColorStop(0, "rgba(99, 102, 241, 0.2)"); // Indigo with opacity
          gradient.addColorStop(1, "rgba(99, 102, 241, 0)");
          return gradient;
        },
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 4,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "rgba(75, 85, 99, 0.2)",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US").format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#9ca3af",
          callback: function (value, index, values) {
            // Show first and last
            if (index === 0 || index === values.length - 1) {
              return this.getLabelForValue(value);
            }
            return "";
          },
        },
      },
      y: {
        grid: {
          display: true,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#9ca3af",
          callback: function (value, index, values) {
            // Only show first and last ticks
            if (index === 0 || index === values.length - 1) {
              return new Intl.NumberFormat("en-US").format(value);
            }
            return "";
          },
        },
      },
    },
  };

  return <Chart data={chartData} options={options} type="line" />;
};

export const AssetPieChart = ({ assets }) => {
  // Filter out assets with zero balance and prepare data for the chart
  const chartData = {
    labels: assets
      .filter((asset) => Number(asset.balanceUsd) > 0)
      .map((asset) => asset.tokenSymbol),
    datasets: [
      {
        data: assets
          .filter((asset) => Number(asset.balanceUsd) > 0)
          .map((asset) => Number(asset.balanceUsd)),
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)", // Indigo
          "rgba(168, 85, 247, 0.8)", // Purple
          "rgba(236, 72, 153, 0.8)", // Pink
          "rgba(16, 185, 129, 0.8)", // Green
          "rgba(245, 158, 11, 0.8)", // Yellow
        ],
        borderColor: [
          "rgba(99, 102, 241, 1)",
          "rgba(168, 85, 247, 1)",
          "rgba(236, 72, 153, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "rgb(75, 85, 99)",
          font: {
            size: 12,
          },
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: $${value.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} (${percentage}%)`;
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        padding: 12,
      },
    },
  };

  return <Chart data={chartData} options={options} type="pie" />;
};
