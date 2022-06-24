import { useContext } from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Tooltip,
  useToast
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  CopyIcon,
  CheckCircleIcon,
  WarningIcon,
  MoonIcon,
  SunIcon
} from "@chakra-ui/icons";
import { truncateAddress, copyToClipboard } from "../utils";
import { getNetworkName } from "../networks.js";
import { NavbarContext } from "../App.js";

const Links = ["Dashboard", "Streams", "Governance"];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700")
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const context = useContext(NavbarContext);
  const toast = useToast();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Stream.io</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={2} overflow="visible"></Stack>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={context.toggleColorMode}>
                {context.colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}>Main Content Here</Box>
    </>
  );
}
