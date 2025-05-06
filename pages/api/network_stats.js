import { getAnkrNodeData } from "@/utils/ankr";

const getCurrentBlockNumber = async () => {
  const hexBlockNumber = await getAnkrNodeData("eth_blockNumber");
  return parseInt(hexBlockNumber, 16);
};

const getCurrentGasPrice = async () => {
  const hexGasPrice = await getAnkrNodeData("eth_gasPrice");
  const wei = BigInt(hexGasPrice);
  const gweiValue = Number(wei) / 1e9;
  return gweiValue.toFixed(3);
};

// Note: these methods are hardcoded for demo simplicity. In reality this involve computing from
// raw database block data, and then cached with updates on some interval (eg daily).
const getVolumeData = async () => {
  return {
    "7d": {
      labels: ["Apr 1", "Apr 2", "Apr 3", "Apr 4", "Apr 5", "Apr 6", "Apr 7"],
      data: [1200000, 1500000, 1800000, 1600000, 2000000, 2500000, 2200000],
    },
    "30d": {
      labels: [
        "Apr 1",
        "Apr 5",
        "Apr 10",
        "Apr 15",
        "Apr 20",
        "Apr 25",
        "Apr 30",
        "May 1",
      ],
      data: [
        1100000, 1850000, 1280000, 2420000, 1380000, 3000000, 2490000, 2620000,
      ],
    },
  };
};
const getActiveAddressesData = async () => {
  return {
    "1y": {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      data: [
        450000, 480000, 520000, 550000, 600000, 650000, 680000, 710000, 690000,
        720000, 750000, 790000,
      ],
    },
    "5y": {
      labels: ["2019", "2020", "2021", "2022", "2023"],
      data: [320000, 420000, 580000, 680000, 790000],
    },
  };
};
const getEthPrice = async () => {
  return 1802.67;
};

const getAvgBlockTime = async () => {
  return 12.3;
};

export default async function getNetworkStats(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const blockNumber = await getCurrentBlockNumber();
  const gasPrice = await getCurrentGasPrice();

  return res.json({
    avg_block_time: await getAvgBlockTime(),
    eth_price: await getEthPrice(),
    block_number: blockNumber,
    gas_price: gasPrice,
    volume_data: await getVolumeData(),
    active_addresses_data: await getActiveAddressesData(),
  });
}
