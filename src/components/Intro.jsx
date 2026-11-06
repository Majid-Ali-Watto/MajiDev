/** @format */
import { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { Element } from "react-scroll";
import StatsSkeleton from "../skeletons/StatsSkeleton";

const Stats = lazy(() => import("./Stats"));
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Highlight,
  Flex,
  Skeleton,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import AnimatedText from "./Animate";
import { devLocation } from "../data/generic-data";
import { motion } from "framer-motion";
import { fadeInUp } from "../data/fadeInUpTransitionConfig";
import { getTotalExperince } from "../utils/getExpYears";
import useContent from "../hooks/useContent";
import { FaMapMarkerAlt, FaBriefcase, FaCode } from "react-icons/fa";

const FALLBACK_IMAGE = "/majid2.webp";

// The floating, tilted frame around the profile photo; holds the photo or, while it loads, a placeholder of the same size
function PhotoFrame({ children }) {
  const reduceMotion = usePrefersReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={
        reduceMotion
          ? { opacity: 1, scale: 1 }
          : { opacity: 1, scale: 1, y: [0, -8, 0] }
      }
      transition={{
        opacity: { duration: 1 },
        scale: { duration: 1 },
        y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <Box
        role="group"
        position="relative"
        w={{ base: "clamp(150px, 50vw, 200px)", md: "clamp(220px, 28vw, 440px)" }}
        aspectRatio={1}
      >
        <Box
          aria-hidden
          position="absolute"
          inset={0}
          borderRadius="3xl"
          bgGradient="linear(to-br, teal.400, purple.500)"
          transform="rotate(6deg)"
          boxShadow="0 12px 48px rgba(56, 178, 172, 0.35)"
          transition="transform 0.5s ease"
          _groupHover={{ transform: "rotate(0deg) scale(1.04)" }}
        />
        {children}
        <Flex
          aria-hidden
          position="absolute"
          right="-0.5rem"
          bottom="1rem"
          boxSize={{ base: 9, md: 11 }}
          align="center"
          justify="center"
          borderRadius="xl"
          bg="chakra-body-bg"
          color="teal.500"
          boxShadow="lg"
          borderWidth="1px"
        >
          <Icon as={FaCode} />
        </Flex>
      </Box>
    </motion.div>
  );
}

PhotoFrame.propTypes = {
  children: PropTypes.node.isRequired,
};

const photoProps = {
  position: "relative",
  w: "100%",
  h: "100%",
  borderRadius: "3xl",
  borderWidth: "4px",
  borderColor: "chakra-body-bg",
};

// The admin's photo (useContent "photo": fetched apart from the intro text), else the built-in one
function ProfilePhoto({ alt }) {
  const { imageBase64 } = useContent("photo");
  return (
    <Box
      as="img"
      src={imageBase64 || FALLBACK_IMAGE}
      alt={alt}
      decoding="async"
      onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
      objectFit="cover"
      transition="transform 0.5s ease"
      _groupHover={{ transform: "translate(-4px, -4px)" }}
      {...photoProps}
    />
  );
}

ProfilePhoto.propTypes = {
  alt: PropTypes.string.isRequired,
};

MyIntro.propTypes = {
  Contact: PropTypes.elementType.isRequired,
};

export default function MyIntro({
  Contact,
}) {
  const { devName } = useContent("settings");
  const { experience } = useContent("stats"); // job dates only, for the total
  const { paragraph: about } = useContent("about");
  const aboutText =
    about?.replace("Y-M-D", `(${getTotalExperince(experience)})`) ||
    `Full Stack Web Developer with (${getTotalExperince(experience)}) of experience, building end-to-end products across Vue.js, Nuxt.js, React, and TypeScript on the frontend, and Python/FastAPI microservices with gRPC and Kafka on the backend. Experienced with MSSQL, Redis, Docker, Kong API Gateway, and CI/CD pipelines with Prometheus, Grafana, and ELK Stack observability. Currently building LocalhostOnly.tech, a full-stack software delivery company for founders and lean teams — launching soon.`;

  return (
    <>
      <Element id="home">
        <Box
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          minH={{ base: "auto", md: "calc(100dvh - 4rem)" }}
          alignItems="center"
          justifyContent={{ base: "center", md: "space-around" }}
          px={{ base: 2, md: 8 }}
          pt={{ base: "5rem", md: 0 }}
          pb={{ base: 6, md: 0 }}
          gap={{ base: 8, md: 0 }}
        >
          <PhotoFrame>
            {/* The text never waits for the photo: until it arrives, a placeholder holds its place */}
            <Suspense fallback={<Skeleton {...photoProps} startColor="whiteAlpha.300" endColor="whiteAlpha.500" />}>
              <ProfilePhoto alt={devName ? `${devName}'s profile` : "Developer's profile image"} />
            </Suspense>
          </PhotoFrame>

          <VStack spacing={4} align="center" className="intro">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              viewport={{ once: true }}
            >
              <VStack spacing={3} align="center">
                <Heading as="h1" className="dev-name" textAlign="center">
                  {devName}
                </Heading>

                <AnimatedText />

                <HStack spacing={4} flexWrap="wrap" justifyContent="center">
                  <HStack spacing={1}>
                    <Icon as={FaMapMarkerAlt} color="green.500" boxSize={3.5} />
                    <Text fontSize="sm" opacity={0.7}>
                      {devLocation}
                    </Text>
                  </HStack>
                  <HStack spacing={1}>
                    <Icon as={FaBriefcase} color="green.500" boxSize={3.5} />
                    <Text fontSize="sm" opacity={0.7}>
                      {getTotalExperince(experience)} Experience
                    </Text>
                  </HStack>
                </HStack>

                <Box maxW="600px" textAlign="center" px={2} pb={4}>
                  <Text fontSize={["sm", "md"]} lineHeight="1.7">
                    <Highlight
                      query={[
                        "Full Stack Web Developer",
                        "Vue.js",
                        "Nuxt.js",
                        "React",
                        "TypeScript",
                        "Python",
                        "FastAPI",
                        "gRPC",
                        "Kafka",
                        "LocalhostOnly.tech",
                      ]}
                      styles={{ color: "green.500" }}
                    >
                      {aboutText}
                    </Highlight>
                  </Text>
                </Box>

                <Contact />
              </VStack>
            </motion.div>
          </VStack>
        </Box>
      </Element>

      <Suspense fallback={StatsSkeleton}>
        <Stats />
      </Suspense>
    </>
  );
}
