import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Highlight,
  List,
  ListIcon,
  ListItem,
  Step,
  StepDescription,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";

import { motion } from "framer-motion";
import { Element } from "react-scroll";
import { experienceData } from "../assets/experienceData";
import SectionHeader from "../generic-components/Section-Header";
import { getExperienceYear } from "../utils/getExpYears";
import PropTypes from "prop-types";
import toLocalDate from "../utils/toLocaleDateString";
import Helmet_SEO from "../generic-components/Helmet";
import { fadeInUp } from "../assets/fadeInUpTransitionConfig";
import MyAccordion from "../generic-components/Accordion";

// ---------------------
// EXPERIENCE ITEM
// ---------------------
const ExperienceItem = ({ description, highlightQuery }) => (
  <ListItem width="100%">
    <ListIcon
      as={CheckCircleIcon}
      color="green.500"
      mt={1}
      flexShrink={0} // icon doesn't move
    />

    <Highlight
      query={highlightQuery}
      styles={{ color: "green.600", fontWeight: "600" }}
      style={{
        whiteSpace: "normal",
        wordBreak: "break-word",
        display: "inline",
        textAlign: "left",
        lineHeight: "1.6",
      }}
    >
      {description}
    </Highlight>
  </ListItem>
);

ExperienceItem.propTypes = {
  description: PropTypes.string.isRequired,
  highlightQuery: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

// ---------------------
// MAIN EXPERIENCE COMPONENT
// ---------------------
export default function Experience() {
  function getHighLight(item) {
    return item.highlightQuery.length <= 1
      ? item.highlightQuery[0] || ""
      : item.highlightQuery;
  }

  const { activeStep } = useSteps({
    index: 0,
    count: experienceData.length,
  });

  // Responsive values
  const stepperSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });

  const stepperOrientation = useBreakpointValue({
    base: "vertical",
    md: "vertical",
    lg: "vertical", // change to "horizontal" on large screens if needed
  });

  const stepperGap = useBreakpointValue({ base: 3, md: 5 });

  //   const boxMtValue = useBreakpointValue({ base: 2, md: 0 });
  const titleFontSize = useBreakpointValue({ base: "md", md: "lg" });
  const descriptionFontSize = useBreakpointValue({ base: "sm", md: "md" });

  const accordionSpacing = useBreakpointValue({ base: 2, md: 3 });

  return (
    <Element id="experience">
      <Box textAlign="left" mb="8">
        <Helmet_SEO />
        <SectionHeader heading="Experience" />
      </Box>

      {/* MAIN STEPPER */}
      <Stepper
        size={stepperSize}
        colorScheme="green"
        index={activeStep}
        orientation={stepperOrientation}
        gap={stepperGap}
        width="95%"
      >
        {experienceData.map((item, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <Step key={index} width="100%">
              <StepIndicator>
                <StepStatus
                  complete={<Text fontSize="xl">✅</Text>}
                  incomplete={<Text fontSize="xl">✅</Text>}
                  active={<Text fontSize="xl">🔥</Text>}
                />
              </StepIndicator>

              {/* Step Content */}
              <Box flexShrink={0} mt={0} width="100%">
                <StepTitle fontSize={titleFontSize} fontWeight="bold">
                  {item.role} at {item.company}
                </StepTitle>

                <StepDescription
                  fontSize={descriptionFontSize}
                  opacity={0.8}
                  mb={2}
                >
                  {`${toLocalDate(item.startDate)} - ${toLocalDate(
                    item.endDate
                  )} (${getExperienceYear(item.startDate, item.endDate)})`}
                </StepDescription>

                {/* Accordion */}
                {item.projects.map((project, pIndex) => (
                  <MyAccordion
                    key={pIndex}
                    title={project.name || "Project Details"}
                    about={project.about || ""}
                  >
                    <List spacing={accordionSpacing}>
                      {project.description.map((desc, i) => (
                        <motion.div
                          key={desc.id || i}
                          initial="hidden"
                          whileInView="visible"
                          variants={fadeInUp}
                          viewport={{ once: true, amount: 0.2 }}
                          style={{ width: "100%" }}
                        >
                          <ExperienceItem
                            description={desc.description}
                            highlightQuery={getHighLight(desc)}
                          />
                        </motion.div>
                      ))}
                    </List>
                  </MyAccordion>
                ))}
              </Box>

              <StepSeparator />
            </Step>
          </motion.div>
        ))}
      </Stepper>
    </Element>
  );
}
