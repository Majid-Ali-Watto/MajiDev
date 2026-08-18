/** @format */

import { Box, Card, CardBody, Highlight, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Element } from "react-scroll";
import SectionHeader from "../ui/SectionHeader";
import { motion } from "framer-motion"; // Import framer-motion
import { fadeInUp } from "../data/fadeInUpTransitionConfig";
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
        <Card
          variant="outline"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          transition="transform 0.3s ease, box-shadow 0.3s ease"
          _hover={{ transform: "translateY(-3px)", boxShadow: "xl" }}
        >
          <CardBody>
            <Text fontSize="md">
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
                styles={{ color: "green.500", textAlign: "left" }}
              >
                {about?.replace("Y-M-D", `(${getTotalExperince()})`) ||
                  `Full Stack Web Developer with (${getTotalExperince()}) of experience, building end-to-end products across Vue.js, Nuxt.js, React, and TypeScript on the frontend, and Python/FastAPI microservices with gRPC and Kafka on the backend. Experienced with MSSQL, Redis, Docker, Kong API Gateway, and CI/CD pipelines with Prometheus, Grafana, and ELK Stack observability.`}
              </Highlight>
            </Text>
          </CardBody>
        </Card>
      </motion.div>
    </Element>
  );
}

export default About;
