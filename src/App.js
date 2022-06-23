import { useEffect, useState, createContext } from "react";
import {
  VStack,
  Container,
  Button,
  Text,
  HStack,
  Select,
  Input,
  Box,
  useToast,
  Flex,
  useColorModeValue,
  Stack,
  useColorMode
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  WarningIcon,
  CopyIcon,
  MoonIcon,
  SunIcon
} from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { networkParams } from "./networks";
import { toHex, truncateAddress, copyToClipboard } from "./utils";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "./providerOptions";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./Config.js";
import StreamTable from "./components/StreamTable";

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions // required
});
export const Web3Context = createContext();
export default function App() {
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();
  const [streamId, setId] = useState();
  const [amount, setAmount] = useState();
  const toast = useToast();

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);
      setLibrary(library);
      toast({
        title: "Connected.",
        description:
          "You are connected as " + account + " on " + getNetworkName() + ".",
        status: "success",
        duration: 4000,
        isClosable: true
      });
    } catch (error) {
      setError(error);
    }
  };

  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  const getNetworkName = () => {
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
        return null;
    }
  };

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(network) }]
      });
      toast({
        title: "Network changed.",
        description: "You are now connected on " + getNetworkName() + ".",
        status: "success",
        duration: 4000,
        isClosable: true
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[toHex(network)]]
          });
        } catch (error) {
          setError(error);
        }
      }
    }
  };

  const signMessage = async () => {
    if (!library) return;
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [message, account]
      });
      setSignedMessage(message);
      setSignature(signature);
    } catch (error) {
      setError(error);
    }
  };

  const verifyMessage = async () => {
    if (!library) return;
    try {
      const verify = await library.provider.request({
        method: "personal_ecRecover",
        params: [signedMessage, signature]
      });
      setVerified(verify === account.toLowerCase());
    } catch (error) {
      setError(error);
    }
  };

  const buy = async () => {
    if (!library) return;
    try {
      const signer = library.getSigner();
      const serviceContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
      let txn = await serviceContract.buy(streamId, amount);
      await txn.wait();
    } catch (error) {
      setError(error);
    }
  };

  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork("");
    setMessage("");
    setSignature("");
    setVerified(undefined);
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
    toast({
      title: "Disconnected.",
      description: "You are disconnected from the App.",
      status: "success",
      duration: 3000,
      isClosable: true
    });
  };

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Flex
        as="header"
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        bg={useColorModeValue("gray.100", "gray.900")}
        px={5}
        w="100%"
        backdropFilter="saturate(180%) blur(5px)"
        pos="relative"
        boxSize="full"
        position="static"
      >
        <Box>Stream.io</Box>
        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={2} overflow="visible">
            {account && (
              <Box>
                <Tooltip label={account} placement="right">
                  <Text>{`${truncateAddress(account)}`}</Text>
                </Tooltip>
              </Box>
            )}
            {account && (
              <CopyIcon
                onClick={() => {
                  if (copyToClipboard(account))
                    toast({
                      description:
                        "Address " + account + " is copied to clipboard.",
                      status: "success",
                      duration: 2000,
                      isClosable: true
                    });
                }}
              />
            )}
            <Text>
              {chainId && getNetworkName()}
              {account ? (
                <CheckCircleIcon color="green" />
              ) : (
                <WarningIcon color="#cd5700" />
              )}
            </Text>
            {!account ? (
              <Button size="l" onClick={connectWallet}>
                Connect Wallet
              </Button>
            ) : (
              <Button size="l" onClick={disconnect}>
                Disconnect
              </Button>
            )}
          </Stack>
          <Stack direction={"row"} spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
        </Flex>
      </Flex>
      <Container as="main" mt="20">
        <VStack justifyContent="center" alignItems="center" h="100vh">
          {account && (
            <VStack>
              <HStack justifyContent="flex-start" alignItems="flex-start">
                <Box
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  padding="10px"
                >
                  <VStack>
                    <Button onClick={switchNetwork} isDisabled={!network}>
                      Switch Network
                    </Button>
                    <Select
                      placeholder="Select network"
                      onChange={handleNetwork}
                    >
                      <option value="3">Ropsten</option>
                      <option value="4">Rinkeby</option>
                      <option value="42">Kovan</option>
                      <option value="1666600000">Harmony</option>
                      <option value="42220">Celo</option>
                    </Select>
                  </VStack>
                </Box>
                <Box
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  padding="10px"
                >
                  <VStack>
                    <Button onClick={signMessage} isDisabled={!message}>
                      Sign Message
                    </Button>
                    <Input
                      placeholder="Set Message"
                      maxLength={20}
                      onChange={handleInput}
                      w="140px"
                    />
                    {signature ? (
                      <Tooltip label={signature} placement="bottom">
                        <Text>{`Signature: ${truncateAddress(
                          signature
                        )}`}</Text>
                      </Tooltip>
                    ) : null}
                  </VStack>
                </Box>
                <Box
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  padding="10px"
                >
                  <VStack>
                    <Button onClick={verifyMessage} isDisabled={!signature}>
                      Verify Message
                    </Button>
                    {verified !== undefined ? (
                      verified === true ? (
                        <VStack>
                          <CheckCircleIcon color="green" />
                          <Text>Signature Verified!</Text>
                        </VStack>
                      ) : (
                        <VStack>
                          <WarningIcon color="red" />
                          <Text>Signature Denied!</Text>
                        </VStack>
                      )
                    ) : null}
                  </VStack>
                </Box>
              </HStack>
              <HStack>
                <Box
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  padding="10px"
                >
                  <VStack>
                    <Button onClick={buy} isDisabled={!(streamId && amount)}>
                      Buy
                    </Button>
                    <HStack>
                      <Input
                        onChange={(e) => {
                          setId(e.target.value);
                        }}
                        placeholder="Stream Id"
                      />
                      <Input
                        onChange={(e) => {
                          setAmount(e.target.value);
                        }}
                        placeholder="Share Amount"
                      />
                    </HStack>
                  </VStack>
                </Box>
              </HStack>
            </VStack>
          )}
          <h1>Streams</h1>
          <Web3Context.Provider value={{ provider, library, account }}>
            <StreamTable />
          </Web3Context.Provider>
          <Text color="red">{error ? error.message : null}</Text>
        </VStack>
      </Container>
    </>
  );
}
