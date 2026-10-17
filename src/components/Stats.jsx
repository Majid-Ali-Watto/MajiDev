import { SimpleGrid, Text, VStack, Icon, Flex } from "@chakra-ui/react";
import { FaBriefcase, FaProjectDiagram, FaNpm, FaCode } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeInUp } from "../data/fadeInUpTransitionConfig";
import { getTotalExperince } from "../utils/getExpYears";
import useContent from "../hooks/useContent";

export default function Stats() {
  const experienceData = useContent("experience");
  const projects = useContent("projects");
  const packages = useContent("packages");
  const stats = [
    {
      label: "Experience",
      value: getTotalExperince(experienceData),
      icon: FaBriefcase,
    },
    {
      label: "Companies",
      value: `${experienceData.length}`,
      icon: FaCode,
    },
    {
      label: "Projects",
      value: `${projects.length}+`,
      icon: FaProjectDiagram,
    },
    {
      label: "NPM Packages",
      value: `${packages.length}+`,
      icon: FaNpm,
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={fadeInUp}
      viewport={{ once: true }}
    >
      <SimpleGrid
        columns={[2, 2, 4]}
        spacing={[3, 6, 8]}
        py={[4, 8]}
        px={[1, 4]}
      >
        {stats.map((stat) => (
          <VStack
            key={stat.label}
            spacing={2}
            p={[3, 5]}
            borderRadius="xl"
            border="1px solid"
            borderColor="teal.200"
            _dark={{ borderColor: "teal.700", bg: "rgba(56,178,172,0.06)" }}
            bg="rgba(56,178,172,0.04)"
            transition="transform 0.2s ease, box-shadow 0.2s ease"
            _hover={{ transform: "translateY(-4px)", boxShadow: "0 8px 24px rgba(56,178,172,0.2)" }}
          >
            <Flex align="center" justify="center" boxSize={[9, 11]} borderRadius="full" bgGradient="linear(to-br, teal.400, purple.500)" color="white">
              <Icon as={stat.icon} boxSize={[4, 5]} />
            </Flex>
            <Text fontSize={["xl", "2xl", "3xl"]} fontWeight="extrabold" bgGradient="linear(to-r, teal.400, purple.500)" bgClip="text">
              {stat.value}
            </Text>
            <Text fontSize={["xs", "sm"]} opacity={0.7} textAlign="center">
              {stat.label}
            </Text>
          </VStack>
        ))}
      </SimpleGrid>
    </motion.div>
  );
}
