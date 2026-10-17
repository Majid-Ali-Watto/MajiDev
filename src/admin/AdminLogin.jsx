import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaArrowRight, FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUserShield } from "react-icons/fa";
import { auth } from "../config/firebaseApp";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.code === "auth/too-many-requests" ? "Too many attempts. Try again later." : "Invalid email or password.");
      setBusy(false);
    }
  };

  return (
    <Flex minH="100dvh" align="center" justify="center" px={4} py={10} position="relative" overflow="hidden">
      {/* Soft brand-colored glows behind the card */}
      <Box aria-hidden position="absolute" top="-8rem" left="-6rem" boxSize="26rem" borderRadius="full" bg="teal.400" opacity={0.25} filter="blur(90px)" />
      <Box aria-hidden position="absolute" bottom="-9rem" right="-6rem" boxSize="28rem" borderRadius="full" bg="purple.500" opacity={0.25} filter="blur(100px)" />

      <Box
        as="form"
        onSubmit={submit}
        position="relative"
        w="100%"
        maxW="26rem"
        p={{ base: 6, md: 8 }}
        bg="chakra-body-bg"
        borderWidth="1px"
        borderTopWidth="3px"
        borderTopColor="teal.400"
        borderRadius="2xl"
        boxShadow="2xl"
      >
        <Stack spacing={6}>
          <Stack spacing={3} align="center" textAlign="center">
            <Flex boxSize={16} align="center" justify="center" borderRadius="2xl" color="white" fontSize="2xl" bgGradient="linear(to-br, teal.400, purple.500)" boxShadow="0 10px 30px rgba(56,178,172,0.35)">
              <Icon as={FaUserShield} />
            </Flex>
            <Box>
              <Heading size="lg">Welcome back</Heading>
              <Text mt={1} fontSize="sm" opacity={0.7} textAlign="center">
                Sign in to manage your portfolio content
              </Text>
            </Box>
          </Stack>

          {error && (
            <Alert status="error" borderRadius="xl" fontSize="sm" role="alert">
              <AlertIcon />
              {error}
            </Alert>
          )}

          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="600">
                Email
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" color="gray.400">
                  <FaEnvelope />
                </InputLeftElement>
                <Input type="email" autoComplete="username" placeholder="you@example.com" focusBorderColor="teal.400" value={email} onChange={(e) => setEmail(e.target.value)} />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="600">
                Password
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" color="gray.400">
                  <FaLock />
                </InputLeftElement>
                <Input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  focusBorderColor="teal.400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement>
                  <IconButton
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    size="sm"
                    variant="ghost"
                    icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                    onClick={() => setShowPassword((v) => !v)}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Stack>

          <Button type="submit" size="lg" colorScheme="teal" rightIcon={<FaArrowRight />} isLoading={busy} loadingText="Signing in">
            Sign in
          </Button>

          <Text fontSize="sm" textAlign="center" opacity={0.7}>
            <Link href="/" color="teal.400">
              ← Back to site
            </Link>
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
}
