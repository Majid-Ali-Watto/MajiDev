import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, Highlight, List, ListIcon, ListItem, Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import { motion } from "framer-motion"; // Import framer-motion
import { Element } from "react-scroll";
import { experienceData } from "../assets/experienceData";
import SectionHeader from "../generic-components/Section-Header";
import { getExperienceYear } from "../utils/getExpYears";
/** @format */

import PropTypes from "prop-types";

// Subcomponent to display each experience item
const ExperienceItem = ({ description, highlightQuery }) => (
  <ListItem>
    <ListIcon as={CheckCircleIcon} color="green.500" />
    <Highlight query={highlightQuery} styles={{ color: "blue.500" }}>
      {description}
    </Highlight>
  </ListItem>
);

ExperienceItem.propTypes = {
  description: PropTypes.string.isRequired,
  highlightQuery: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]), // Allow string or array of strings
};

export default function Experience() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  function getHighLight(item) {
    return item.highlightQuery.length <= 1
      ? item.highlightQuery[0] || "" // If a single item, return as string
      : item.highlightQuery; // Return array for multiple items
  }

  return (
    <Element id="experience">
      <Box textAlign="left" mb="8">
        <SectionHeader heading="Experience" textAlign="left" />
      </Box>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true }}
      >
        <Stat color="gray.700" mb={6}>
          <StatNumber>Al Habib Banking System</StatNumber>
          <StatLabel>Front End Developer at Teresol Pvt Ltd</StatLabel>
          <StatHelpText>Oct 24, 2022 - Present ({getExperienceYear()})</StatHelpText>
        </Stat>

        <List spacing={3} color="gray.700">
          {experienceData.map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              viewport={{ once: true }}
            >
              <ExperienceItem
                description={item.description}
                highlightQuery={getHighLight(item)}
              />
            </motion.div>
          ))}
        </List>
      </motion.div>
    </Element>
  );
}
