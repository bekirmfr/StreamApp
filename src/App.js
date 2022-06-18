import { useEffect, useState } from "react";
import {
  VStack,
  Container,
  Button,
  Text,
  HStack,
  Select,
  Input,
  Box,
  useToast
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { networkParams } from "./networks";
import { toHex, truncateAddress } from "./utils";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "./providerOptions";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./Config.js";
import StreamInformation from "./components/StreamInformation";

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions // required
});

export default function Home() {
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
  var [streamsData, setStreamsData] = useState([]);
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
        break;
      case 4:
        return "Rinkeby";
        break;
      case 42:
        return "Kovan";
        break;
      case 1666600000:
        return "Harmony";
        break;
      case 42220:
        return "Celo";
        break;
      default:
        return null;
        break;
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

      //setWarning("Initialize payment");
      let txn = await serviceContract.buy(streamId, amount);

      //setWarning("Mining... please wait");
      await txn.wait();
      //getCounterHandler();
      /*setSuccess(
        `Mined, see transaction: https://rinkeby.etherscan.io/tx/${txn.hash}`
      );*/
    } catch (error) {
      setError(error);
    }
  };

  const lastStreamId = async () => {
    if (!library) return;
    try {
      const signer = library.getSigner();
      const serviceContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      let id = await serviceContract.collectionId();
      return id;
    } catch (error) {
      setError(error);
    }
  };

  const showStreams = async () => {
    //alert(await lastStreamId());
    if (!library) return;
    try {
      const signer = library.getSigner();
      const serviceContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
      for (var i = 0; i < lastStreamId; i++) {}
    } catch (error) {
      setError(error);
    }
    return <div>{lastStreamId}</div>;
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
      duration: 4000,
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

  return (
    <>
      <Container>
        <VStack position="absolute" top={0} left="15px">
          <Text
            margin="0"
            lineHeight="1.15"
            fontSize={["1.5em", "2em", "3em", "4em"]}
            fontWeight="600"
            sx={{
              background: "linear-gradient(90deg, #1652f0 0%, #b9cbfb 70.35%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Stream.io
          </Text>
          <Text fontSize="small" fontWeight="600">
            Passive income for everyone!
          </Text>
        </VStack>
        <HStack position="absolute" top={0} right="15px">
          <Tooltip label={account} placement="right">
            <Text>
              {`${truncateAddress(account)} (${
                chainId ? getNetworkName() : "Not connected"
              }) `}
              {account ? (
                <CheckCircleIcon color="green" />
              ) : (
                <WarningIcon color="#cd5700" />
              )}
            </Text>
          </Tooltip>

          {!account ? (
            <Button size="sm" onClick={connectWallet}>
              Connect Wallet
            </Button>
          ) : (
            <Button size="sm" onClick={disconnect}>
              Disconnect
            </Button>
          )}
        </HStack>
        <HStack></HStack>
      </Container>
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
                  <Select placeholder="Select network" onChange={handleNetwork}>
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
                      <Text>{`Signature: ${truncateAddress(signature)}`}</Text>
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
            <HStack>
              <Box
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                padding="10px"
              >
                <VStack>
                  <Button onClick={showStreams}>Show Streams</Button>
                </VStack>
              </Box>
            </HStack>
          </VStack>
        )}
        <Text>{error ? error.message : null}</Text>
      </VStack>
      <div>
        <h1>Streams</h1>
        <StreamInformation library={library} />
      </div>
    </>
  );
}
