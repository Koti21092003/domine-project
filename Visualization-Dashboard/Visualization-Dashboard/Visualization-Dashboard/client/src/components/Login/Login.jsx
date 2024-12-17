import React, { useState } from 'react';
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';

const LoginPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
      window.location.href = '/main';
    }, 2000);
  };

  // Disable button if the email or password doesn't match the criteria
  const isButtonDisabled = email !== 'admin@gmail.com' || password !== 'admin';

  return (
    <Box
      bg="linear-gradient(to bottom right, #4F3BA9, #9068BE)"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Container
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        borderColor="white"
        textAlign="center"
      >
        <h1 style={{ color: 'white' }}>Welcome Dean Admin !!!</h1>
        <form>
          <FormControl>
            <FormLabel style={{ color: 'white' }}>Dean Admin Email</FormLabel>
            <Input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              borderColor="white"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel style={{ color: 'white' }}>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              borderColor="white"
            />
          </FormControl>

          <Button
            colorScheme="green"
            mt={6}
            w="100%"
            onClick={handleLogin}
            isDisabled={isButtonDisabled} // Disable button if conditions are not met
          >
            Login
          </Button>

          {/* AlertDialog */}
          <AlertDialog isOpen={isOpen} leastDestructiveRef={undefined}>
            <AlertDialogOverlay>
              <AlertDialogContent bg="purple.800" color="white">
                <AlertDialogHeader>Welcome Admin !!!</AlertDialogHeader>
                <AlertDialogBody>
                  Redirecting to the dashboard page...
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </form>
      </Container>
    </Box>
  );
};

export default LoginPage;
