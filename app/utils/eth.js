export const formatCurrency = (value) => {
  if (!value) return;

  const num = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(num)) return "-";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const isValidEthereumAddress = (address) => {
  // Check if it's a string
  if (typeof address !== "string") return false;

  // Check if it starts with 0x
  if (!address.startsWith("0x")) return false;

  // Check if it's the correct length (42 characters including 0x)
  if (address.length !== 42) return false;

  // Check if it's a valid hex string
  const hexRegex = /^0x[a-fA-F0-9]+$/;
  return hexRegex.test(address);
};
