import {
  Step,
  StepDescription,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  useBreakpointValue,
  useSteps,
} from "@chakra-ui/react";
import { Element } from "react-scroll";
import useContent from "../hooks/useContent";
import SectionHeader from "../ui/SectionHeader";
import { motion } from "framer-motion";
import TimelineCard from "../ui/TimelineCard";
import { fadeInUp } from "../data/fadeInUpTransitionConfig";

const Education = () => {
  const educationData = useContent("education");
  const { activeStep } = useSteps({
    index: 0,
    count: educationData.length,
  });

  const stepperSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });
  const titleFontSize = useBreakpointValue({ base: "md", md: "lg" });
  const descriptionFontSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <Element id="education">
      <SectionHeader heading="Education" />

      <Stepper
        size={stepperSize}
        colorScheme="green"
        index={activeStep}
        orientation="vertical"
        gap={[2, 5]}
        width={["100%", "95%"]}
        marginTop={[2, 5]}
      >
        {educationData.map((education, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            style={{ width: "100%" }}
          >
            <Step key={index} width="100%">
              <StepIndicator>
                <StepStatus
                  complete={<Text fontSize="xl">🎓</Text>}
                  incomplete={<Text fontSize="xl">🎓</Text>}
                  active={<Text fontSize="xl">📖</Text>}
                />
              </StepIndicator>

              <TimelineCard>
                <StepTitle fontSize={titleFontSize} fontWeight="bold">
                  {education.degree}
                </StepTitle>

                <StepDescription fontSize={descriptionFontSize} color="teal.500" fontWeight="600">
                  {education.institution}
                </StepDescription>

                <Text fontSize="sm" opacity={0.6} mt={1}>
                  {education.duration}
                </Text>
              </TimelineCard>

              <StepSeparator />
            </Step>
          </motion.div>
        ))}
      </Stepper>
    </Element>
  );
};

export default Education;
