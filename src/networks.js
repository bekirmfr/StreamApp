export const networkParams = {
  "0x63564c40": {
    chainId: "0x63564c40",
    rpcUrls: ["https://api.harmony.one"],
    chainName: "Harmony Mainnet",
    nativeCurrency: { name: "ONE", decimals: 18, symbol: "ONE" },
    blockExplorerUrls: ["https://explorer.harmony.one"],
    iconUrls: ["https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png"]
  },
  "0xa4ec": {
    chainId: "0xa4ec",
    rpcUrls: ["https://forno.celo.org"],
    chainName: "Celo Mainnet",
    nativeCurrency: { name: "CELO", decimals: 18, symbol: "CELO" },
    blockExplorerUrl: ["https://explorer.celo.org"],
    iconUrls: [
      "https://celo.org/images/marketplace-icons/icon-celo-CELO-color-f.svg"
    ]
  }
};
export const getNetworkName = (chainId) => {
  switch (chainId) {
    case 3:
      return "Ropsten";
    case 4:
      return "Rinkeby";
    case 42:
      return "Kovan";
    case 1666600000:
      return "Harmony";
    case 42220:
      return "Celo";
    default:
      return "Unregistered";
  }
};
