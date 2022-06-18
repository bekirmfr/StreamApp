import React, { useEffect, useState } from "react";
import { getStreamInformation } from "../services/streams";

export default function StreamInformation(library) {
  const [streamInformation, setStreamInformation] = useState({});
  useEffect(() => {
    getStreamInformation(library).then((data) => setStreamInformation(data));
  }, [streamInformation]);
  return (
    <div>
      <h2>Stream Information</h2>
      <ul>
        <li>Last ID: {streamInformation.lastId}</li>
      </ul>
    </div>
  );
}
