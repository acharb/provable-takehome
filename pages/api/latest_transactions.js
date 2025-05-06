import { getAnkrNodeData } from "@/utils/ankr";

const TRANSACTION_LIMIT = 5;

// In real app I'd like to compute these values once every day to find the day's largest
// transactions, then use Redis for quick retrievals.
export default async function latestTransactions(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const latestBlock = await getAnkrNodeData("eth_getBlockByNumber", [
    "latest",
    true,
  ]);

  return res.json({
    transactions: latestBlock.transactions.slice(0, TRANSACTION_LIMIT),
  });
}
