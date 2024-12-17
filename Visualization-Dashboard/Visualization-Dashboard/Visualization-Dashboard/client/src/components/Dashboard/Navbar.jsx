import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Container,
  Button,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";

const Navbar = () => {
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
          <Flex align="center">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/koti-efce7.appspot.com/o/download.jpeg?alt=media&token=99491413-2340-4a22-a3a3-2a4614413aff"
              alt="Centurion University Logo"
              boxSize="40px"
              mr={3}
            />
            <Text fontSize="xl" fontWeight="bold" color="white">
              DEAN'S DASHBOARD
            </Text>
          </Flex>
          <Flex gap={4}>
            <Link to={'/main'}>
              <Button colorScheme="blue" size="sm">Home</Button>
            </Link>
            <Link to={'/dashboard'}>
              <Button colorScheme="blue" size="sm">Attendance</Button>
            </Link>
            <Link to={'/results'}>
              <Button colorScheme="blue" size="sm">Results</Button>
            </Link>
            <Button colorScheme="red" size="sm" onClick={handleLogout}>Logout</Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
