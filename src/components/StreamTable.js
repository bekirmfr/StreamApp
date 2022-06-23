import React, { useEffect, useState, useContext } from "react";
import { getStreamData } from "../services/streamData";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text
} from "@chakra-ui/react";
import { Web3Context } from "../App.js";

export default function StreamTable() {
  const [streamData, setStreamData] = useState(new Array(0));
  const context = useContext(Web3Context);
  useEffect(() => {
    setStreamData([]);
    async function fetchData() {
      try {
        setStreamData(await getStreamData(context.library));
        console.log(streamData);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [context]);

  const noData = () => {
    return <Text>No data.</Text>;
  };

  return (
    <Accordion allowMultiple allowToggle="true">
      {streamData
        ? streamData.map((collection) => {
            return (
              <AccordionItem key={collection.id}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {collection.id}
                    </Box>
                    <Box flex="1">{collection.name}</Box>
                    <Box flex="1">
                      <Text>TVL</Text>
                    </Box>
                    <Box flex="1">
                      <Text>Pools</Text>
                    </Box>
                    <Box flex="1" textAlign="right">
                      <Text>Etc.</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <TableContainer>
                    <Table size="sm" colorScheme="blue">
                      <TableCaption placement="top">Stream Detail</TableCaption>
                      <Thead>
                        <Tr>
                          <Th>Total Shares</Th>
                          <Th>Collection Share Limit</Th>
                          <Th>Pool Share Limit</Th>
                          <Th>Whitelisted</Th>
                          <Th>Status</Th>
                          <Th>Fee</Th>
                          <Th>Max Pools</Th>
                          <Th>Min Deposit Duration</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr key={collection}>
                          <Td>{collection.totalShares}</Td>
                          <Td>{collection.collecitonShareLimit}</Td>
                          <Td>{collection.poolShareLimit}</Td>
                          <Td>{collection.isWhitelisted.toString()}</Td>
                          <Td>{collection.status.toString()}</Td>
                          <Td>{collection.fee} </Td>
                          <Td>{collection.maxPools}</Td>
                          <Td>{collection.minDepositDuration}</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </AccordionPanel>
              </AccordionItem>
            );
          })
        : noData()}
    </Accordion>
  );
}
