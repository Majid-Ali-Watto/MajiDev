import { SimpleGrid, Text, VStack, Icon } from "@chakra-ui/react";
import { FaBriefcase, FaProjectDiagram, FaNpm, FaCode } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeInUp } from "../data/fadeInUpTransitionConfig";
import { getTotalExperince } from "../utils/getExpYears";
import { projects } from "../data/project-links";
import { packages } from "../data/packages";
import { experienceData } from "../data/experienceData";

const stats = [
  {
    label: "Experience",
    value: getTotalExperince(),
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

export default function Stats() {
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
            <Icon as={stat.icon} boxSize={[5, 6]} color="teal.400" />
            <Text fontSize={["lg", "xl", "2xl"]} fontWeight="bold">
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
