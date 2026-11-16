import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import QRCode from "qrcode";
import { multiFactor, sendEmailVerification, signOut, TotpMultiFactorGenerator } from "firebase/auth";
import { Alert, AlertDescription, AlertIcon, Box, Button, Code, Flex, Heading, Icon, Image, ListItem, OrderedList, Skeleton, Stack, Text } from "@chakra-ui/react";
import { FaCheckCircle, FaMobileAlt } from "react-icons/fa";
import { auth } from "../config/firebaseApp";
import CodeInput from "./CodeInput";

// Name the authenticator app shows next to the account
const ISSUER = "Majidev admin";

// Why a secret could not be made, as the step that unblocks it
function problemFor(err) {
  switch (err.code) {
    case "auth/unverified-email":
      return "unverified";
    case "auth/requires-recent-login":
      return "recent";
    case "auth/operation-not-allowed":
    case "auth/admin-restricted-operation":
      return "disabled";
    default:
      return err.message;
  }
}

// "ABCDEFGHIJKL" → "ABCD EFGH IJKL", easier to type into an app by hand
const grouped = (key) => key.match(/.{1,4}/g).join(" ");

// Adds an authenticator app (TOTP) as the account's second sign-in step. AdminPage shows this until one is set up,
// because Firestore rules and the backend only accept sessions signed in with the app's code.
export default function TotpSetup({ user }) {
  const [secret, setSecret] = useState(null);
  const [qr, setQr] = useState("");
  const [problem, setProblem] = useState(null);
  const [attempt, setAttempt] = useState(0); // a new attempt makes a new secret (after verifying the email, say)
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let current = true;
    setProblem(null);
    setSecret(null);
    (async () => {
      try {
        const totp = await TotpMultiFactorGenerator.generateSecret(await multiFactor(user).getSession());
        const image = await QRCode.toDataURL(totp.generateQrCodeUrl(user.email, ISSUER), { margin: 1, width: 220 });
        if (current) {
          setSecret(totp);
          setQr(image);
        }
      } catch (err) {
        if (current) setProblem(problemFor(err));
      }
    })();
    return () => {
      current = false;
    };
  }, [user, attempt]);

  const enroll = async (oneTimePassword) => {
    setBusy(true);
    setError("");
    try {
      await multiFactor(user).enroll(TotpMultiFactorGenerator.assertionForEnrollment(secret, oneTimePassword), "Authenticator app");
      setDone(true);
    } catch (err) {
      setError(err.code === "auth/invalid-verification-code" ? "That code didn't match. Check that your phone's clock is set automatically, then try the next code." : err.message);
      setCode("");
    } finally {
      setBusy(false);
    }
  };

  const recheckEmail = async () => {
    await user.reload();
    setAttempt((n) => n + 1);
  };

  let body;
  if (done) {
    body = (
      <Stack spacing={4} align="center" textAlign="center">
        <Icon as={FaCheckCircle} boxSize={10} color="green.400" />
        <Text>
          Your authenticator app is set up. Sign in again now: from here on, sign-in asks for your password and then a code from the app.
        </Text>
        <Button colorScheme="teal" onClick={() => signOut(auth)}>
          Sign in again
        </Button>
      </Stack>
    );
  } else if (problem === "unverified") {
    body = (
      <Stack spacing={4}>
        <Text>Firebase only adds a second step to an account whose email is verified. Verify {user.email} first:</Text>
        <Button
          variant="outline"
          onClick={() => sendEmailVerification(user).then(() => setVerificationSent(true), (err) => setError(err.message))}
          isDisabled={verificationSent}
        >
          {verificationSent ? "Verification email sent" : "Send verification email"}
        </Button>
        <Button colorScheme="teal" onClick={recheckEmail}>
          I&apos;ve opened the link, continue
        </Button>
      </Stack>
    );
  } else if (problem === "recent") {
    body = (
      <Stack spacing={4}>
        <Text>For safety, adding a sign-in step needs a fresh sign-in. Sign in again and you&apos;ll come straight back here.</Text>
        <Button colorScheme="teal" onClick={() => signOut(auth)}>
          Sign in again
        </Button>
      </Stack>
    );
  } else if (problem === "disabled") {
    body = (
      <Alert status="warning" borderRadius="lg">
        <AlertIcon />
        <AlertDescription fontSize="sm">
          Authenticator apps aren&apos;t enabled for this Firebase project yet. Follow &quot;Two-step sign-in&quot; in DEVELOPMENT.md (one-time setup), then reload this page.
        </AlertDescription>
      </Alert>
    );
  } else if (problem) {
    body = (
      <Alert status="error" borderRadius="lg">
        <AlertIcon />
        <AlertDescription fontSize="sm">{problem}</AlertDescription>
      </Alert>
    );
  } else {
    body = (
      <Stack spacing={5}>
        <OrderedList spacing={2} fontSize="sm">
          <ListItem>Open an authenticator app on your phone (Google Authenticator, Microsoft Authenticator, 1Password, Authy…).</ListItem>
          <ListItem>Scan this QR code, or type the setup key.</ListItem>
          <ListItem>Enter the 6-digit code the app shows.</ListItem>
        </OrderedList>
        <Flex direction="column" align="center" gap={3}>
          {secret ? (
            <Image src={qr} alt="QR code for your authenticator app" boxSize="220px" borderRadius="lg" bg="white" p={2} />
          ) : (
            <Skeleton boxSize="220px" borderRadius="lg" />
          )}
          {secret && (
            <Box textAlign="center">
              <Text fontSize="xs" opacity={0.7}>
                Setup key
              </Text>
              <Code fontSize="sm" px={2} py={1} userSelect="all" wordBreak="break-all">
                {grouped(secret.secretKey)}
              </Code>
              <Text fontSize="xs" opacity={0.7} mt={2} maxW="22rem">
                Save this key in your password manager: it is how you add the account to a new phone if you lose this one.
              </Text>
            </Box>
          )}
        </Flex>
        <CodeInput value={code} onChange={setCode} onComplete={enroll} isDisabled={!secret || busy} />
        <Button colorScheme="teal" onClick={() => enroll(code)} isLoading={busy} loadingText="Checking" isDisabled={!secret || code.length < 6}>
          Turn on two-step sign-in
        </Button>
      </Stack>
    );
  }

  return (
    <Box maxW="30rem" mx="auto" p={{ base: 5, md: 8 }} bg="chakra-body-bg" borderWidth="1px" borderTopWidth="3px" borderTopColor="teal.400" borderRadius="2xl" boxShadow="xl">
      <Stack spacing={6}>
        <Stack spacing={3} align="center" textAlign="center">
          <Flex boxSize={14} align="center" justify="center" borderRadius="2xl" color="white" fontSize="xl" bgGradient="linear(to-br, teal.400, purple.500)">
            <Icon as={FaMobileAlt} />
          </Flex>
          <Heading size="md">Set up two-step sign-in</Heading>
          <Text fontSize="sm" opacity={0.7}>
            Content can only be changed from a sign-in that used your authenticator app, so a leaked password alone can&apos;t edit the site.
          </Text>
        </Stack>
        {error && (
          <Alert status="error" borderRadius="lg" fontSize="sm">
            <AlertIcon />
            {error}
          </Alert>
        )}
        {body}
      </Stack>
    </Box>
  );
}

TotpSetup.propTypes = {
  user: PropTypes.shape({ email: PropTypes.string, reload: PropTypes.func }).isRequired,
};
