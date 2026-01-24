/** @format */

import { Box, Highlight, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Element } from "react-scroll";
import SectionHeader from "../generic-components/Section-Header";
import { motion } from "framer-motion"; // Import framer-motion
import { fadeInUp } from "../assets/fadeInUpTransitionConfig";
import { getTotalExperince } from "../utils/getExpYears";
About.propTypes = {
  about: PropTypes.string,
};

function About({ about }) {
  return (
    <Element id="about" className="about">
      <Box textAlign="left" mb="4">
        <SectionHeader heading="About Me" />
      </Box>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true }}
      >
        <Text fontSize="md">
          <Highlight
            query={[
              "Full Stack Web Developer",
              "Vue",
              "React",
              "Node.js",
              "Express",
              "micro front-end",
            ]}
            styles={{ color: "green.500", textAlign: "left" }}
          >
            {about?.replace("Y-M-D", `(${getTotalExperince()})`) ||
              `Full Stack Web Developer with (${getTotalExperince()}) of experience specializing in Vue, React, Node.js, and Express. Proficient in building scalable micro front-end architectures, modernizing legacy systems, and delivering efficient, user-focused solutions. Skilled in optimizing performance and developing reusable components for seamless software delivery.`}
          </Highlight>
        </Text>
      </motion.div>
    </Element>
  );
}

export default About;
