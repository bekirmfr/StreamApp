import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../Config.js";
import { ethers } from "ethers";

export function getStreamInformation(library) {
  //alert(library);
  const lastStreamId = async () => {
    alert("lastStreamId before if");
    //if (!library) return;
    try {
      const signer = library.getSigner();
      const serviceContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
      alert("lastStreamId after if");
      return await serviceContract.collectionId();
    } catch (error) {
      //setError(error);
    }
  };

  return new Promise((resolve) => {
    resolve({ lastId: 5 });
  });
}
