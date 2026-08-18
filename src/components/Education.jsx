import {
  Box,
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
import { educationData } from "../data/educationData";
import SectionHeader from "../ui/SectionHeader";
import { motion } from "framer-motion";
import { fadeInUp } from "../data/fadeInUpTransitionConfig";

const Education = () => {
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

              <Box
                flex={1}
                minW={0}
                mt={0}
                ml={[0, 2]}
                borderWidth="1px"
                borderRadius="lg"
                p={[2, 4]}
                transition="transform 0.3s ease, box-shadow 0.3s ease"
                _hover={{ transform: "translateY(-3px)", boxShadow: "xl" }}
              >
                <StepTitle fontSize={titleFontSize} fontWeight="bold">
                  {education.degree}
                </StepTitle>

                <StepDescription fontSize={descriptionFontSize} opacity={0.8}>
                  {education.institution}
                </StepDescription>

                <Text fontSize="sm" opacity={0.6} mt={1}>
                  {education.duration}
                </Text>
              </Box>

              <StepSeparator />
            </Step>
          </motion.div>
        ))}
      </Stepper>
    </Element>
  );
};

export default Education;
