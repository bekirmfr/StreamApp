import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../Config.js";
import { ethers, utils } from "ethers";

export async function getStreamData(library) {
  const getData = async () => {
    if (!library) {
      console.log("No provider!");
      return;
    }
    try {
      const signer = library.getSigner();
      const serviceContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
      let lastId = await serviceContract.collectionId();
      console.log("Last Collection ID: ".$lastId);
      var collections = [];
      for (var i = 1; i <= lastId; i++) {
        var collection = {};
        let data = await serviceContract.getCollection(i);
        collection.id = data[0];
        collection.name = utils.parseBytes32String(data[1]);
        collection.totalShares = data[4];
        collection.collectionShareLimit = data[5];
        collection.poolShareLimit = data[6];
        collection.isWhitelisted = data[7].toString === "true" ? true : false;
        collection.status = data[8].toString === "true" ? true : false;
        collection.fee =
          data[10] > 0
            ? `${parseInt(data[9]["_hex"], 16)} / ${data[10]}`
            : `${parseInt(data[9]["_hex"], 16)}`;
        collection.maxPools = data[11];
        collection.minDepositDuration = data[12];
        collections.push(collection);
      }
      console.log(collections);
      return collections;
    } catch (error) {
      console.log(error);
    }
  };

  return new Promise(async (resolve) => {
    resolve(await getData());
  });
}
