import { Box, Card, Flex, Heading, SimpleGrid, Tag, TagLabel, TagLeftIcon, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import { skillIcons, FallbackSkillIcon } from "../data/skillIcons";
import useContent from "../hooks/useContent";
import { fadeInUp } from "../data/fadeInUpTransitionConfig";

const WIDE_PANEL_MIN_SKILLS = 10;

const SkillChip = ({ label, icon, colorScheme }) => (
  <Tag
    size="lg"
    variant="subtle"
    colorScheme={colorScheme}
    borderRadius="full"
    px={3}
    py={1.5}
    cursor="default"
    transition="transform 0.2s ease, box-shadow 0.2s ease"
    _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
  >
    <TagLeftIcon as={icon} boxSize="1rem" />
    <TagLabel fontSize="0.85rem" fontWeight="500">
      {label}
    </TagLabel>
  </Tag>
);

const SkillPanel = ({ label, icon, colorScheme, items }) => {
  const CategoryIcon = skillIcons[icon] ?? FallbackSkillIcon;
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={fadeInUp}
      viewport={{ once: true }}
      style={{ gridColumn: items.length > WIDE_PANEL_MIN_SKILLS ? "1 / -1" : undefined }}
    >
      <Card
        variant="outline"
        h="100%"
        p={[4, 6]}
        borderRadius="xl"
        borderTopWidth="3px"
        borderTopColor={`${colorScheme}.400`}
        transition="box-shadow 0.3s ease"
        _hover={{ boxShadow: "xl" }}
      >
        <Flex align="center" gap={3} mb={4}>
          <Flex
            align="center"
            justify="center"
            boxSize="2.5rem"
            borderRadius="lg"
            bg={`${colorScheme}.100`}
            color={`${colorScheme}.600`}
            _dark={{ bg: `${colorScheme}.900`, color: `${colorScheme}.200` }}
            fontSize="1.25rem"
          >
            <CategoryIcon />
          </Flex>
          <Heading as="h3" fontSize="lg" flex="1">
            {label}
          </Heading>
          <Text fontSize="sm" opacity={0.6}>
            {items.length}
          </Text>
        </Flex>
        <Flex wrap="wrap" gap={2}>
          {items.map(({ label: skill, icon: skillIcon }) => (
            <SkillChip key={skill} label={skill} icon={skillIcons[skillIcon] ?? FallbackSkillIcon} colorScheme={colorScheme} />
          ))}
        </Flex>
      </Card>
    </motion.div>
  );
};

const SkillsSection = () => {
  const skillsData = useContent("skills");
  return (
  <Box as="section" id="skills">
    <SectionHeader heading="Skills" />
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={[4, 6]}>
      {skillsData.map((category) => (
        <SkillPanel key={category.label} {...category} />
      ))}
    </SimpleGrid>
  </Box>
  );
};

export default SkillsSection;
