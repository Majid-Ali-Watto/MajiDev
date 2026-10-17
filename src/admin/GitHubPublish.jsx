import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Alert, AlertDescription, AlertIcon, Avatar, Badge, Box, Button, ButtonGroup, Code, Divider, Flex, HStack, Heading, Icon, Link, Skeleton, Stack, Text, useColorMode } from "@chakra-ui/react";
import { FaBuilding, FaGithub, FaLink, FaMapMarkerAlt } from "react-icons/fa";
import { auth } from "../config/firebaseApp";
import { buildProfile, buildReadme } from "./githubReadme";

// The majidev-backend service (its own repository, deployed on Vercel), e.g. https://majidev-backend.vercel.app
const API_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

// FastAPI errors: `detail` is a message, or a list of validation errors
function errorMessage(body, status) {
  if (typeof body?.detail === "string") return body.detail;
  if (Array.isArray(body?.detail)) return body.detail.map((error) => `${error.loc?.at(-1)}: ${error.msg}`).join("; ");
  return `Request failed (${status})`;
}

async function publish(payload) {
  const token = await auth.currentUser.getIdToken();
  const response = await fetch(`${API_URL}/github/publish`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
  const body = await response.json().catch(() => null);
  if (!response.ok) throw new Error(errorMessage(body, response.status));
  return body;
}

const RESULT_LABELS = { readme: "Profile README", profile: "Profile details" };

// GitHub's README styling (light and dark), for the rendered preview
const PREVIEW_COLORS = {
  light: { text: "#1f2328", bg: "#ffffff", border: "#d1d9e0", link: "#0969da", code: "rgba(129,139,152,0.12)", muted: "#59636e" },
  dark: { text: "#f0f6fc", bg: "#0d1117", border: "#3d444d", link: "#4493f8", code: "rgba(101,108,118,0.2)", muted: "#9198a1" },
};

function previewDocument(body, mode) {
  const c = PREVIEW_COLORS[mode];
  return `<!doctype html><html><head><meta charset="utf-8"><base target="_blank"><style>
    :root { color-scheme: ${mode}; }
    body { margin: 0; padding: 16px 24px; background: ${c.bg}; color: ${c.text}; font: 14px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif; word-wrap: break-word; }
    h1, h2, h3 { margin: 24px 0 16px; font-weight: 600; line-height: 1.25; }
    h1, h2 { padding-bottom: .3em; border-bottom: 1px solid ${c.border}; }
    h1 { font-size: 2em; } h2 { font-size: 1.5em; }
    body > :first-child { margin-top: 0; }
    p, ul, ol { margin: 0 0 16px; } ul, ol { padding-left: 2em; } li + li { margin-top: .25em; }
    a { color: ${c.link}; text-decoration: none; } a:hover { text-decoration: underline; }
    code { padding: .2em .4em; font-size: 85%; background: ${c.code}; border-radius: 6px; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
    img { max-width: 100%; } sub { color: ${c.muted}; }
  </style></head><body>${body}</body></html>`;
}

// The README rendered the way GitHub shows it. A sandboxed iframe (no scripts, its own origin) keeps the
// README's HTML from touching the admin page; links open in a new tab.
function ReadmePreview({ markdown }) {
  const { colorMode } = useColorMode();
  const [html, setHtml] = useState(null);

  useEffect(() => {
    let current = true;
    import("marked").then(({ marked }) => current && setHtml(marked.parse(markdown)));
    return () => {
      current = false;
    };
  }, [markdown]);

  if (html === null) return <Skeleton height="28rem" borderRadius="lg" />;
  return (
    <Box
      as="iframe"
      title="README preview"
      sandbox="allow-popups allow-popups-to-escape-sandbox"
      srcDoc={previewDocument(html, colorMode)}
      w="100%"
      h="28rem"
      borderWidth="1px"
      borderRadius="lg"
    />
  );
}
ReadmePreview.propTypes = { markdown: PropTypes.string.isRequired };
const BIO_LIMIT = 160;

// A field left empty is not sent, so GitHub keeps its current value
const Unchanged = () => (
  <Text as="span" fontStyle="italic" opacity={0.5}>
    not changed
  </Text>
);

// The profile details as they will look on GitHub's profile sidebar
function ProfileCard({ profile }) {
  const rows = [
    { icon: FaBuilding, label: "Company", value: profile.company },
    { icon: FaMapMarkerAlt, label: "Location", value: profile.location },
    {
      icon: FaLink,
      label: "Website",
      value: profile.blog && (
        <Link href={profile.blog} isExternal color="teal.500" wordBreak="break-all">
          {profile.blog.replace(/^https?:\/\//, "")}
        </Link>
      ),
    },
  ];
  const bioLength = profile.bio?.length ?? 0;

  return (
    <Box borderWidth="1px" borderRadius="xl" p={{ base: 4, md: 5 }} bg="chakra-body-bg" maxW="30rem">
      <HStack spacing={4} align="center" mb={3}>
        <Avatar name={profile.name} size="lg" bgGradient="linear(to-br, teal.400, purple.500)" color="white" />
        <Box minW={0}>
          <Text fontSize="xl" fontWeight="700" lineHeight="1.2" noOfLines={1}>
            {profile.name}
          </Text>
          <Badge mt={1} borderRadius="full" px={2} colorScheme={profile.hireable ? "green" : "gray"} variant="subtle">
            {profile.hireable ? "Available for hire" : "Not available for hire"}
          </Badge>
        </Box>
      </HStack>

      <Box mb={4}>
        <Text fontSize="sm" lineHeight="1.6">
          {profile.bio || <Unchanged />}
        </Text>
        {profile.bio && (
          <Text fontSize="xs" mt={1} textAlign="right" color={bioLength > BIO_LIMIT ? "red.400" : undefined} opacity={bioLength > BIO_LIMIT ? 1 : 0.5}>
            {bioLength}/{BIO_LIMIT}
          </Text>
        )}
      </Box>

      <Stack spacing={2} fontSize="sm">
        {rows.map(({ icon, label, value }) => (
          <Flex key={label} align="center" gap={2.5}>
            <Icon as={icon} boxSize={3.5} opacity={0.6} flexShrink={0} aria-label={label} />
            {value || <Unchanged />}
          </Flex>
        ))}
      </Stack>
    </Box>
  );
}
ProfileCard.propTypes = { profile: PropTypes.object.isRequired };

// Under the GitHub section: previews what will be published from the saved content and sends it to the backend
export default function GitHubPublish({ content }) {
  const { github } = content;
  // Credit the public site, not wherever /admin happens to run (e.g. the dev server)
  const readme = useMemo(() => buildReadme(content, import.meta.env.VITE_SITE_URL || window.location.origin), [content]);
  const profile = useMemo(() => buildProfile(content), [content]);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [readmeView, setReadmeView] = useState("preview");
  const nothing = !github.updateReadme && !github.updateProfile;

  const send = async () => {
    setBusy(true);
    setError("");
    setResult(null);
    try {
      setResult(await publish({ ...(github.updateReadme && { readme }), ...(github.updateProfile && { profile }) }));
    } catch (err) {
      setError(err.message === "Failed to fetch" ? `Could not reach the backend at ${API_URL}` : err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box mt={8}>
      <Divider mb={6} />
      <Heading as="h3" size="md" mb={1}>
        Publish to GitHub
      </Heading>
      <Text fontSize="sm" opacity={0.7} mb={4}>
        Uses the saved content of every section, so save your changes first.
      </Text>

      {!API_URL && (
        <Alert status="warning" borderRadius="lg" mb={4}>
          <AlertIcon />
          <AlertDescription fontSize="sm">
            Set <Code>VITE_API_URL</Code> to your backend&apos;s address (see the majidev-backend README) and rebuild the site.
          </AlertDescription>
        </Alert>
      )}

      <Stack spacing={4}>
        {github.updateReadme && (
          <Box>
            <HStack justify="space-between" mb={2}>
              <Text fontSize="sm" fontWeight="600">
                README.md
              </Text>
              <ButtonGroup size="xs" isAttached variant="outline" role="group" aria-label="README view">
                {[
                  ["preview", "Preview"],
                  ["markdown", "Markdown"],
                ].map(([view, label]) => (
                  <Button key={view} onClick={() => setReadmeView(view)} isActive={readmeView === view} aria-pressed={readmeView === view} colorScheme={readmeView === view ? "teal" : "gray"}>
                    {label}
                  </Button>
                ))}
              </ButtonGroup>
            </HStack>
            {readmeView === "preview" ? (
              <ReadmePreview markdown={readme} />
            ) : (
              <Box as="pre" fontSize="xs" whiteSpace="pre-wrap" wordBreak="break-word" h="28rem" overflowY="auto" p={3} borderWidth="1px" borderRadius="lg" bg="blackAlpha.50" _dark={{ bg: "whiteAlpha.50" }}>
                {readme}
              </Box>
            )}
          </Box>
        )}
        {github.updateProfile && (
          <Box>
            <Text fontSize="sm" fontWeight="600" mb={1}>
              Profile details
            </Text>
            <ProfileCard profile={profile} />
          </Box>
        )}

        <HStack>
          <Button colorScheme="teal" leftIcon={<FaGithub />} onClick={send} isLoading={busy} loadingText="Publishing" isDisabled={!API_URL || nothing}>
            Publish to GitHub
          </Button>
          {nothing && (
            <Text fontSize="sm" opacity={0.7}>
              Turn on the README or the profile details above.
            </Text>
          )}
        </HStack>

        {error && (
          <Alert status="error" borderRadius="lg">
            <AlertIcon />
            <AlertDescription fontSize="sm">{error}</AlertDescription>
          </Alert>
        )}
        {result && (
          <Alert status="success" borderRadius="lg" alignItems="flex-start">
            <AlertIcon />
            <Stack spacing={1} fontSize="sm">
              {Object.entries(result).map(([part, { status, url }]) => (
                <Text key={part}>
                  {RESULT_LABELS[part]}: {status === "unchanged" ? "already up to date" : "updated"} ·{" "}
                  <Link href={url} isExternal color="teal.500">
                    View on GitHub
                  </Link>
                </Text>
              ))}
            </Stack>
          </Alert>
        )}
      </Stack>
    </Box>
  );
}
GitHubPublish.propTypes = { content: PropTypes.object.isRequired };
