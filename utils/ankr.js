import axios from "axios";

const ANKR_API_KEY = process.env.NEXT_PUBLIC_ANKR_API_KEY;

if (!ANKR_API_KEY) {
  throw new Error("ANKR_API_KEY environment variable is not set");
}

export const getAnkrNodeData = async (method, params = []) => {
  try {
    const url = `https://rpc.ankr.com/eth/${ANKR_API_KEY}`;

    const response = await axios.post(
      url,
      {
        jsonrpc: "2.0",
        method,
        params,
        id: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error(`Error calling ${method}:`, error);
    throw error;
  }
};

export const getAnkrTokenData = async (method, params = {}) => {
  const url = `https://rpc.ankr.com/multichain/${ANKR_API_KEY}`;

  try {
    const response = await axios.post(
      url,
      {
        jsonrpc: "2.0",
        method,
        params,
        id: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error(`Error calling ${method}:`, error);
    throw error;
  }
};
