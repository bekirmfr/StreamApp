import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../Config.js";
import { ethers } from "ethers";

export async function getStreamInformation() {
  const data = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    if (!provider) return;
    try {
      const signer = provider.getSigner();
      const serviceContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
      let lastId = await serviceContract.collectionId();
      console.log("Last Collection ID: ".$lastId);
      const data = [];
      for (var i = 1; i <= lastId; i++) {
        let collection = await serviceContract.getCollection(i);
        data.push(collection);
      }
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return new Promise(async (resolve) => {
    resolve(await data());
  });
}
