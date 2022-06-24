import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  HStack,
  VStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
  Avatar,
  Button,
  Select,
  useToast
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiSettings,
  FiMenu,
  FiChevronDown
} from "react-icons/fi";
import { TbWallet, TbWorld } from "react-icons/tb";
import { CopyIcon } from "@chakra-ui/icons";
import { truncateAddress, copyToClipboard } from "../utils";
import { getNetworkName } from "../networks.js";
import { NavbarContext } from "../App.js";

const LinkItems = [
  { name: "Dashboard", icon: FiHome, to: "/dashboard" },
  { name: "Streams", icon: FiTrendingUp, to: "/streams" },
  { name: "Governance", icon: FiCompass, to: "/governance" },
  { name: "Settings", icon: FiSettings, to: "/settings" }
];

export default function Sidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Stream.io
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          to={link.to}
          onClose={onClose}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, to, onClose, children, ...rest }) => {
  return (
    <NavLink
      to={to}
      onClick={onClose}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white"
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white"
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </NavLink>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const context = useContext(NavbarContext);
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Stream.io
      </Text>
      <HStack spacing={{ base: "0", md: "0" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<TbWorld />}
        />
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiSettings />}
        />

        <Flex alignItems={"center"}>
          <Menu>
            {!context.account ? (
              <Button
                /* flex={1} */
                px={4}
                fontSize={"sm"}
                rounded={"full"}
                bg={"blue.100"}
                color={"black"}
                _hover={{
                  bg: "blue.200"
                }}
                _focus={{
                  bg: "blue.200"
                }}
                onClick={context.connectWallet}
              >
                Connect
              </Button>
            ) : (
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <Box
                  display="flex"
                  bg="blue.100"
                  rounded={"full"}
                  px={4}
                  py={1}
                  alignItems="center"
                >
                  <Avatar bg="blue.100" icon={<TbWallet fontSize="1.5rem" />} />
                  <Text
                    display={{ base: "none", md: "flex" }}
                  >{`${truncateAddress(context.account)}`}</Text>
                  <FiChevronDown />
                </Box>
              </MenuButton>
            )}

            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>
                <WalletOverlay />
              </MenuItem>
              <MenuItem>Recent Transactions</MenuItem>
              <MenuDivider />
              <MenuItem onClick={context.disconnect}>Disconnect</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const WalletOverlay = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const context = useContext(NavbarContext);
  const toast = useToast();
  return (
    <>
      <Box
        h="full"
        w="full"
        bg="red.200"
        onClick={() => {
          onOpen();
        }}
        p="0"
        m="0"
      >
        Wallet
      </Box>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>Your Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <HStack>
                <Text>{context.account}</Text>
                <IconButton
                  size="lg"
                  variant="ghost"
                  aria-label="open menu"
                  icon={<CopyIcon />}
                  onClick={() => {
                    if (copyToClipboard(context.account))
                      toast({
                        description:
                          "Address " +
                          context.account +
                          " is copied to clipboard.",
                        status: "success",
                        duration: 2000,
                        isClosable: true
                      });
                  }}
                />
              </HStack>
              <HStack>
                <Text>Network: </Text>
                <Text>{getNetworkName(context.chainId)}</Text>
                <Box
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  padding="10px"
                >
                  <VStack>
                    <Button onClick={context.switchNetwork}>
                      Switch Network
                    </Button>
                    <Select
                      placeholder="Select network"
                      onChange={context.handleNetwork}
                    >
                      <option value="3">Ropsten</option>
                      <option value="4">Rinkeby</option>
                      <option value="42">Kovan</option>
                      <option value="1666600000">Harmony</option>
                      <option value="42220">Celo</option>
                    </Select>
                  </VStack>
                </Box>
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
