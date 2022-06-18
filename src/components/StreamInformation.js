import React, { useEffect, useState } from "react";
import { getStreamInformation } from "../services/streams";

export default function StreamInformation() {
  const [streamInformation, setStreamInformation] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getStreamInformation();
        setStreamInformation(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Stream Information</h2>
      <ul>
        <li>Last ID: {streamInformation.lastId}</li>
      </ul>
    </div>
  );
}
