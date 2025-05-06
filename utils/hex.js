export const convertHexStringToInteger = (hexString) => {
  return parseInt(hexString, 16);
};

export const convertIntegerToHexString = (integer) => {
  return "0x" + integer.toString(16);
};

export const convertHexStringToEther = (hexString) => {
  const integer = BigInt(hexString);
  return Number(integer) / 1e18;
};

export const convertHexStringToGwei = (hexString) => {
  const integer = BigInt(hexString);
  return Number(integer) / 1e9;
};
