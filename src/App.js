import { useEffect, useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  VStack,
  Button,
  Text,
  HStack,
  Select,
  Input,
  Box,
  useToast,
  useColorMode
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { networkParams } from "./networks";
import { toHex, truncateAddress } from "./utils";
import { getNetworkName } from "./networks";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "./providerOptions";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./Config.js";
import StreamTable from "./components/StreamTable";
import Sidebar from "./components/Sidebar.js";
import Dashboard from "./pages/Dashboard.js";

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions // required
});
export const Web3Context = createContext();
export const NavbarContext = createContext();
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
        description:
          "You are now connected on " + getNetworkName(chainId) + ".",
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
      <BrowserRouter>
        <NavbarContext.Provider
          value={{
            account,
            chainId,
            connectWallet,
            disconnect,
            switchNetwork,
            handleNetwork,
            colorMode,
            toggleColorMode
          }}
        >
          <Sidebar />
          <Routes>
            <Route index path="dashboard" element={<Dashboard />} />
          </Routes>
        </NavbarContext.Provider>
      </BrowserRouter>
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
          </VStack>
        )}
        <h1>Streams</h1>
        <Web3Context.Provider value={{ provider, library, account }}>
          <StreamTable />
        </Web3Context.Provider>
        <Text color="red">{error ? error.message : null}</Text>
      </VStack>
    </>
  );
}
