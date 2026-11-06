import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { multiFactor, onAuthStateChanged, signOut, TotpMultiFactorGenerator } from "firebase/auth";
import {
  Alert,
  AlertIcon,
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Skeleton,
  SkeletonCircle,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaExternalLinkAlt, FaSignOutAlt, FaUserShield } from "react-icons/fa";
import { auth } from "../config/firebaseApp";
import { sectionContent, siteContent, withDefaults, publicView } from "../data/siteContent";
import AdminLogin from "./AdminLogin";
import TotpSetup from "./TotpSetup";
import SectionEditor from "./SectionEditor";
import { sections } from "./adminSchemas";
import { AdminContent } from "./adminContent";
import GitHubPublish from "./GitHubPublish";
import { loadAdminData, saveSection } from "./adminStore";

function LoadingSkeleton() {
  return (
    <Stack spacing={6} aria-busy="true">
      <Flex align="center" gap={4}>
        <SkeletonCircle size="12" />
        <Stack flex="1">
          <Skeleton h="5" w="40%" />
          <Skeleton h="4" w="70%" />
        </Stack>
      </Flex>
      {[0, 1, 2].map((i) => (
        <Skeleton key={i} h="14" borderRadius="xl" />
      ))}
    </Stack>
  );
}

function TopBar({ user }) {
  return (
    <Box as="header" position="sticky" top={0} zIndex={20} borderBottomWidth="1px" bg={useColorModeValue("whiteAlpha.900", "blackAlpha.700")} backdropFilter="blur(12px)">
      <Flex maxW="6xl" mx="auto" h="4rem" px={{ base: 4, md: 6 }} align="center" justify="space-between" gap={3}>
        <HStack spacing={3}>
          <Flex boxSize={9} align="center" justify="center" borderRadius="lg" color="white" bgGradient="linear(to-br, teal.400, purple.500)">
            <Icon as={FaUserShield} />
          </Flex>
          <Box lineHeight="1.2">
            <Heading as="h1" size="sm">
              Admin
            </Heading>
            <Text fontSize="xs" opacity={0.6}>
              Content manager
            </Text>
          </Box>
        </HStack>
        <HStack spacing={2}>
          <Button as="a" href="/" target="_blank" rel="noopener noreferrer" size="sm" variant="ghost" leftIcon={<FaExternalLinkAlt />}>
            <Box as="span" display={{ base: "none", sm: "inline" }}>
              View site
            </Box>
          </Button>
          <Tooltip label={user.email} hasArrow>
            <Avatar size="sm" name={user.email} bg="teal.500" color="white" />
          </Tooltip>
          <Button size="sm" variant="outline" leftIcon={<FaSignOutAlt />} onClick={() => signOut(auth)}>
            <Box as="span" display={{ base: "none", sm: "inline" }}>
              Sign out
            </Box>
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}
TopBar.propTypes = { user: PropTypes.shape({ email: PropTypes.string }).isRequired };

// Every signed-in admin screen: the top bar (with sign-out) over the page's content
function AdminShell({ user, children }) {
  return (
    <Box minH="100dvh" background="linear-gradient(135deg, rgba(56,178,172,0.06) 0%, rgba(128,90,213,0.06) 100%)">
      <TopBar user={user} />
      <Container maxW="6xl" py={{ base: 4, md: 8 }} px={{ base: 4, md: 6 }}>
        {children}
      </Container>
    </Box>
  );
}
AdminShell.propTypes = { user: PropTypes.object.isRequired, children: PropTypes.node.isRequired };

// Where this session stands with the authenticator app (TOTP second factor):
// "setup" = none added yet; "reauth" = added, but this session signed in without it (e.g. just after adding it);
// "ok" = signed in with its code. Firestore rules and the backend accept only "ok" sessions, so only those see the dashboard.
function useSecondFactor(user) {
  const [state, setState] = useState("checking");
  useEffect(() => {
    let current = true;
    setState("checking");
    const enrolled = multiFactor(user).enrolledFactors.some((factor) => factor.factorId === TotpMultiFactorGenerator.FACTOR_ID);
    if (!enrolled) {
      setState("setup");
      return;
    }
    user.getIdTokenResult().then(
      ({ signInSecondFactor }) => current && setState(signInSecondFactor === TotpMultiFactorGenerator.FACTOR_ID ? "ok" : "reauth"),
      () => current && setState("reauth"),
    );
    return () => {
      current = false;
    };
  }, [user]);
  return state;
}

function SignedIn({ user }) {
  const secondFactor = useSecondFactor(user);
  if (secondFactor === "checking") {
    return (
      <Center minH="100dvh">
        <Spinner color="teal.400" />
      </Center>
    );
  }
  if (secondFactor === "ok") return <Dashboard user={user} />;
  return (
    <AdminShell user={user}>
      {secondFactor === "setup" ? (
        <TotpSetup user={user} />
      ) : (
        <Stack maxW="30rem" mx="auto" spacing={4} p={{ base: 5, md: 8 }} bg="chakra-body-bg" borderWidth="1px" borderRadius="2xl" textAlign="center">
          <Heading size="md">Sign in with your authenticator code</Heading>
          <Text fontSize="sm" opacity={0.75}>
            This session started without a code from your authenticator app, so content can&apos;t be changed from it. Sign in again and enter the code.
          </Text>
          <Button colorScheme="teal" onClick={() => signOut(auth)}>
            Sign in again
          </Button>
        </Stack>
      )}
    </AdminShell>
  );
}
SignedIn.propTypes = { user: PropTypes.object.isRequired };

function Dashboard({ user }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const vertical = useBreakpointValue({ base: false, lg: true });
  const selectedBg = useColorModeValue("teal.50", "whiteAlpha.200");
  const selectedColor = useColorModeValue("teal.700", "teal.200");
  const hoverBg = useColorModeValue("blackAlpha.50", "whiteAlpha.100");

  useEffect(() => {
    loadAdminData().then(setData, (err) => setError(err.message));
  }, []);

  // Every section from the saved content: with hidden items for the "choices" fields (so hiding an item keeps its ticks),
  // and as the public site shows it (forSite) for publishing to GitHub
  const savedView =
    data &&
    Object.fromEntries(Object.keys(siteContent).map((key) => [key, sectionContent(key, key in data.stored ? { value: data.stored[key], builtIn: data.stored.builtIn[key] } : undefined)]));
  const siteView = savedView && publicView(savedView);

  // The editor's starting value: the stored section over its built-in defaults
  const savedOf = (section) => withDefaults(data.stored)[section.key];

  // Fields of a single-record section that use their built-in value: not stored
  const defaultFieldsOf = (section) => {
    if (section.kind === "list") return [];
    const raw = data.stored[section.key] ?? {};
    return section.fields.map(({ name }) => name).filter((name) => !(name in raw));
  };

  const save = async (section, value, useBuiltIn) => {
    await saveSection(section.key, value, useBuiltIn, data.stored);
    setData((d) => {
      const builtIn = section.kind === "list" ? { ...d.stored.builtIn, [section.key]: useBuiltIn } : d.stored.builtIn;
      return { ...d, stored: { ...d.stored, [section.key]: value, builtIn } };
    });
  };

  return (
    <AdminShell user={user}>
      {error && (
        <Alert status="error" borderRadius="xl" mb={6}>
          <AlertIcon />
          Could not load content: {error}
        </Alert>
      )}
      {!data && !error && (
        <Box bg="chakra-body-bg" borderWidth="1px" borderRadius="2xl" p={{ base: 4, md: 8 }}>
          <LoadingSkeleton />
        </Box>
      )}
      {data && (
        <AdminContent.Provider value={savedView}>
        <Tabs isLazy lazyBehavior="keepMounted" variant="unstyled" orientation={vertical ? "vertical" : "horizontal"} display="flex" flexDirection={{ base: "column", lg: "row" }} gap={{ base: 4, lg: 8 }}>
          <TabList
            flexDirection={{ base: "row", lg: "column" }}
            gap={1}
            overflowX={{ base: "auto", lg: "visible" }}
            w={{ lg: "15rem" }}
            flexShrink={0}
            alignSelf="flex-start"
            position={{ lg: "sticky" }}
            top={{ lg: "5.5rem" }}
            maxW="100%"
            p={2}
            bg="chakra-body-bg"
            borderWidth="1px"
            borderRadius="2xl"
          >
            {sections.map((section) => (
              <Tab
                key={section.key}
                justifyContent="flex-start"
                gap={3}
                px={3}
                py={2.5}
                borderRadius="xl"
                fontWeight="500"
                whiteSpace="nowrap"
                transition="background 0.15s ease"
                _hover={{ bg: hoverBg }}
                _selected={{ bg: selectedBg, color: selectedColor, fontWeight: "700" }}
                _focusVisible={{ boxShadow: "outline" }}
              >
                <Icon as={section.icon} />
                {section.label}
              </Tab>
            ))}
          </TabList>
          <TabPanels flex="1" minW={0}>
            {sections.map((section) => (
              <TabPanel key={section.key} p={{ base: 4, md: 8 }} bg="chakra-body-bg" borderWidth="1px" borderRadius="2xl">
                <SectionEditor
                  section={section}
                  saved={savedOf(section)}
                  isBuiltIn={!(section.key in data.stored)}
                  useBuiltIn={!!data.stored.builtIn?.[section.key]}
                  defaultFields={defaultFieldsOf(section)}
                  onSave={(value, useBuiltIn) => save(section, value, useBuiltIn)}
                />
                {section.key === "github" && <GitHubPublish content={siteView} />}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
        </AdminContent.Provider>
      )}
    </AdminShell>
  );
}
Dashboard.propTypes = { user: PropTypes.shape({ email: PropTypes.string }).isRequired };

export default function AdminPage() {
  const [user, setUser] = useState(undefined); // undefined = auth state not known yet

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  return (
    <>
      <Helmet>
        <title>Admin</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
      </Helmet>
      {user === undefined ? (
        <Center minH="100dvh">
          <Spinner color="teal.400" />
        </Center>
      ) : user ? (
        <SignedIn user={user} />
      ) : (
        <AdminLogin />
      )}
    </>
  );
}
