import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Container,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  return (
    <Box
      py={2}
      bgGradient="linear(to-b, #4F3BB9, #2068AE)"
      position="sticky"
      top={0}
      zIndex={100}
    >
      <Container maxW="container.lg">
        <Flex justify="space-between" align="center">
          <Box>
            <Flex align="center">
              <IconButton
                aria-label="Toggle Theme"
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                bg="transparent"
                border="none"
                onClick={toggleColorMode}
              />
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<ChevronDownIcon boxSize={6} />}
                  variant="unstyled"
                />
                <MenuList>
                  <Link to={'/main'}> <MenuItem>Home</MenuItem></Link>
                  <Link to={'/dashboard'}> <MenuItem>Attendance</MenuItem></Link>
                  <Link to={'/results'}> <MenuItem>Results</MenuItem></Link>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
