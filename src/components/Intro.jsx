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
  Highlight
} from "@chakra-ui/react";
import AnimatedText from "./Animate";
import { devFullName, devLocation } from "../data/generic-data";
import PrintResume from "./PrintResume";
import { motion } from "framer-motion";
import { fadeInUp } from "../data/fadeInUpTransitionConfig";
import { getTotalExperince } from "../utils/getExpYears";
import { FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

MyIntro.propTypes = {
  devName: PropTypes.string.isRequired,
  Contact: PropTypes.elementType.isRequired,
  image: PropTypes.string,
  about: PropTypes.string,
};

export default function MyIntro({
  Contact,
  devName = devFullName,
  image,
  about,
}) {
  const imgSrc = image || "/majid2.webp";
  const aboutText =
    about?.replace("Y-M-D", `(${getTotalExperince()})`) ||
    `Full Stack Web Developer with (${getTotalExperince()}) of experience, building end-to-end products across Vue.js, Nuxt.js, React, and TypeScript on the frontend, and Python/FastAPI microservices with gRPC and Kafka on the backend. Experienced with MSSQL, Redis, Docker, Kong API Gateway, and CI/CD pipelines with Prometheus, Grafana, and ELK Stack observability.`;

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
          <img
            src={imgSrc}
            alt={devName ? `${devName}'s profile` : "Developer's profile image"}
            className="profile-img"
            onError={(e) => (e.target.src = "/majid2.webp")}
          />

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
                      {getTotalExperince()} Experience
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

      <PrintResume about={about} />
    </>
  );
}
