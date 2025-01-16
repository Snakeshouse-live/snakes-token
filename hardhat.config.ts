import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require(`dotenv`).config();

const { DEVNET_PRIVKEY, BSCSCAN_API_KEY, BASESCAN_API_KEY } = process.env;

const config: HardhatUserConfig = {
  defaultNetwork: "bnbt",
  etherscan: {
    apiKey: {
      bsc: BSCSCAN_API_KEY as string,
      bnbt: BSCSCAN_API_KEY as string,
      base: BASESCAN_API_KEY as string,
      baset: BASESCAN_API_KEY as string,
    },
    customChains: [
      {
        network: "bnbt",
        chainId: 97,
        urls: {
          apiURL: process.env.BSCSCAN_API_URL as any,
          browserURL: process.env.BSCSCAN_BROWSER_URL as any,
        },
      },
      {
        network: "baset",
        chainId: 84532,
        urls: {
          apiURL: process.env.BASESCAN_API_URL as any,
          browserURL: process.env.BASESCAN_BROWSER_URL as any,
        },
      },
    ],
  },
  gasReporter: {
    currency: "USD",
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    src: "./contracts",
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: [`0x${DEVNET_PRIVKEY}`],
      gasPrice: 20000000000000, // 20 Gwei
    },
    bnb: {
      url: process.env.L1RPC_BSC,
      accounts: [`0x${DEVNET_PRIVKEY}`],
    },
    bnbt: {
      url: process.env.L1RPC_BSCTEST,
      accounts: [`0x${DEVNET_PRIVKEY}`],
    },
    base: {
      url: process.env.BASE_MAIN_RPC_URL,
      accounts: [`0x${DEVNET_PRIVKEY}`],
    },
    baset: {
      url: process.env.BASE_SEPOLIA_RPC_URL,
      accounts: [`0x${DEVNET_PRIVKEY}`],
    },
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    compilers: [
      {
        version: "0.8.27",
        settings: {
          metadata: {
            bytecodeHash: "none",
          },
          // Disable the optimizer when debugging
          optimizer: {
            enabled: true,
            runs: 800,
          },
        },
      },
    ],
  },
};

export default config;
