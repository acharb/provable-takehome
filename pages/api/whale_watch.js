import { getAnkrNodeData } from "@/utils/ankr";
import { convertHexStringToInteger } from "@/utils/hex";

// In real app I'd like to compute these values once every day to find the day's largest
// transactions, then use Redis for quick retrievals.
export default async function whaleWatch(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const latestBlock = await getAnkrNodeData("eth_getBlockByNumber", [
    "latest",
    true,
  ]);

  const transactions = latestBlock.transactions;

  return res.json({
    transactions: transactions
      .sort((a, b) => {
        return (
          convertHexStringToInteger(b.value) -
          convertHexStringToInteger(a.value)
        );
      })
      .slice(0, 5),
  });
}
