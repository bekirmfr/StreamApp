import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../Config.js";
import { ethers } from "ethers";

export async function getStreamInformation() {
  const lastStreamId = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    if (!provider) return;
    try {
      const signer = provider.getSigner();
      const serviceContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
      let result = await serviceContract.collectionId();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return new Promise(async (resolve) => {
    let id = await lastStreamId();
    resolve({ lastId: id });
  });
}
