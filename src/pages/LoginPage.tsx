import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { auth } from "../utils/firebase";
import { loginState } from "../utils/provider";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const loginInfo = useRecoilValue(loginState);
  const toast = useToast();
  const login = () => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((_) =>
        toast({
          title: "Login Success",
          status: "success",
          isClosable: true,
          duration: 2000,
        })
      )
      .catch((error) =>
        toast({
          title: error.message,
          status: "error",
          isClosable: true,
          duration: 2000,
        })
      )
      .finally(() => setIsLoading(false));
  };

  return loginInfo ? (
    <Navigate to="/dashboard" />
  ) : (
    <Center h="100vh" bg="purple.50">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Stack spacing={6} py={4} px={10}>
          <Heading as="h1" size="lg" textAlign="center">
            Login
          </Heading>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            disabled={email === "" || password === ""}
            isLoading={isLoading}
            onClick={login}
          >
            ログイン
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};
