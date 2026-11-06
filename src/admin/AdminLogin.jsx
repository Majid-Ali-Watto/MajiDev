import { useState } from "react";
import { getMultiFactorResolver, signInWithEmailAndPassword, TotpMultiFactorGenerator } from "firebase/auth";
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
import { FaArrowRight, FaEnvelope, FaEye, FaEyeSlash, FaLock, FaMobileAlt, FaUserShield } from "react-icons/fa";
import { auth } from "../config/firebaseApp";
import CodeInput from "./CodeInput";

// A bare username ("majidaliqau") means a Gmail address; anything with an "@" is used as typed
const withGmail = (value) => {
  const email = value.trim();
  return email && !email.includes("@") ? `${email}@gmail.com` : email;
};

// Sign-in is two steps once the authenticator app is set up (admin/TotpSetup): the password, then the app's 6-digit code.
// Firebase answers the password with "multi-factor auth required"; its resolver then finishes the sign-in with the code.
export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resolver, setResolver] = useState(null); // set = the password was right, the code is next
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const signIn = async () => {
    const fullEmail = withGmail(email);
    setEmail(fullEmail);
    setBusy(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, fullEmail, password);
    } catch (err) {
      if (err.code === "auth/multi-factor-auth-required") {
        setResolver(getMultiFactorResolver(auth, err));
        setPassword("");
      } else {
        setError(err.code === "auth/too-many-requests" ? "Too many attempts. Try again later." : "Invalid email or password.");
      }
      setBusy(false);
    }
  };

  const verify = async (oneTimePassword) => {
    const hint = resolver.hints.find((factor) => factor.factorId === TotpMultiFactorGenerator.FACTOR_ID);
    if (!hint) {
      setError("This account's second step is not an authenticator app.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await resolver.resolveSignIn(TotpMultiFactorGenerator.assertionForSignIn(hint.uid, oneTimePassword));
      // Signed in: AdminPage swaps this screen for the dashboard
    } catch (err) {
      if (err.code === "auth/invalid-multi-factor-session") {
        setResolver(null);
        setError("That sign-in took too long. Enter your password again.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many attempts. Try again later.");
      } else {
        setError("That code didn't match. Wait for the next code in your app and try again.");
      }
      setCode("");
      setBusy(false);
    }
  };

  const startOver = () => {
    setResolver(null);
    setCode("");
    setError("");
  };

  const submit = (e) => {
    e.preventDefault();
    if (!resolver) signIn();
    else if (code.length === 6) verify(code);
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
              <Icon as={resolver ? FaMobileAlt : FaUserShield} />
            </Flex>
            <Box>
              <Heading size="lg">{resolver ? "Two-step verification" : "Welcome back"}</Heading>
              <Text mt={1} fontSize="sm" opacity={0.7} textAlign="center">
                {resolver ? "Enter the 6-digit code from your authenticator app" : "Sign in to manage your portfolio content"}
              </Text>
            </Box>
          </Stack>

          {error && (
            <Alert status="error" borderRadius="xl" fontSize="sm" role="alert">
              <AlertIcon />
              {error}
            </Alert>
          )}

          {resolver ? (
            <CodeInput value={code} onChange={setCode} onComplete={verify} isDisabled={busy} />
          ) : (
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel fontSize="sm" fontWeight="600">
                  Email
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.400">
                    <FaEnvelope />
                  </InputLeftElement>
                  {/* type="text" (with the email keyboard): type="email" would block a bare username before withGmail completes it */}
                  <Input
                    type="text"
                    inputMode="email"
                    autoComplete="username"
                    autoCapitalize="none"
                    spellCheck={false}
                    placeholder="you or you@example.com"
                    focusBorderColor="teal.400"
                    paddingEnd="6.5rem" // room for the "@gmail.com" hint
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEmail(withGmail)}
                  />
                  <InputRightElement pointerEvents="none" w="auto" pr={3} fontSize="sm" color="gray.400">
                    {email && !email.includes("@") ? "@gmail.com" : null}
                  </InputRightElement>
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
          )}

          <Button
            type="submit"
            size="lg"
            colorScheme="teal"
            rightIcon={<FaArrowRight />}
            isLoading={busy}
            loadingText={resolver ? "Verifying" : "Signing in"}
            isDisabled={resolver && code.length < 6}
          >
            {resolver ? "Verify" : "Sign in"}
          </Button>

          <Text fontSize="sm" textAlign="center" opacity={0.7}>
            {resolver ? (
              <Link as="button" type="button" onClick={startOver} color="teal.400">
                ← Use a different account
              </Link>
            ) : (
              <Link href="/" color="teal.400">
                ← Back to site
              </Link>
            )}
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
}
