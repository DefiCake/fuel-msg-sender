import "dotenv/config";
import { HardhatUserConfig } from "hardhat/config";
import "hardhat-deploy";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      forking: {
        url: process.env.RPC_URL || "https://1rpc.io/sepolia",
      },
    },
    sepolia: {
      url: process.env.RPC_URL || "https://1rpc.io/sepolia",
      accounts: [process.env.ETH_PRIVATE_KEY!],
    },
  },
  verify: {
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY,
    },
  },
};

export default config;
