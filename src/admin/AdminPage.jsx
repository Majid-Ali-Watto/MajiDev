import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { onAuthStateChanged, signOut } from "firebase/auth";
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
import { sectionContent, siteContent, withDefaults, withoutHidden } from "../data/siteContent";
import AdminLogin from "./AdminLogin";
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
  const siteView = savedView && withoutHidden(savedView);

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
    <Box minH="100dvh" background="linear-gradient(135deg, rgba(56,178,172,0.06) 0%, rgba(128,90,213,0.06) 100%)">
      <TopBar user={user} />
      <Container maxW="6xl" py={{ base: 4, md: 8 }} px={{ base: 4, md: 6 }}>
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
      </Container>
    </Box>
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
        <Dashboard user={user} />
      ) : (
        <AdminLogin />
      )}
    </>
  );
}
