import React, { useEffect, useState } from "react";
import { getStreamInformation } from "../services/streams";
import { utils } from "ethers";
import { toHex, truncateAddress } from "../utils";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer
} from "@chakra-ui/react";

export default function StreamInformation() {
  const [streamInformation, setStreamInformation] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getStreamInformation();
        setStreamInformation(data);
        console.log(streamInformation);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <TableContainer>
      <Table variant="simple" size="sm">
        <TableCaption>Streams</TableCaption>
        <Thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>TOTAL SHARES</th>
            <th>COLLECTION SHARE LIMIT</th>
            <th>POOL SHARE LIMIT</th>
            <th>WHITELISTED</th>
            <th>STATUS</th>
            <th>FEE</th>
            <th>MAX POOLS</th>
            <th>MIN DEPOSIT DURATION</th>
          </tr>
        </Thead>
        <Tbody>
          {streamInformation.map((item, id) => {
            return (
              <tr>
                <td>{item[0]}</td>
                <td>{utils.parseBytes32String(item[1])}</td>
                <td>{item[4]}</td>
                <td>{item[5]}</td>
                <td>{item[6]}</td>
                <td>{item[7].toString()}</td>
                <td>{item[8].toString()}</td>
                <td>
                  {parseInt(item[9]["_hex"], 16)} / {item[10]}
                </td>
                <td>{item[11]}</td>
                <td>{item[12]}</td>
              </tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
