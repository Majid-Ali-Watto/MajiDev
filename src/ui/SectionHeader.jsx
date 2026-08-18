import { Box, Heading } from "@chakra-ui/react";
import PropTypes from "prop-types";
import Helmet_SEO from "./Helmet";

function SectionHeader({ heading, textAlign = "left" }) {
  return (
    <>
      <Helmet_SEO />
      <Box mb={[3, 6]} width="fit-content">
        <Heading
          as="h4"
          size="lg"
          textAlign={textAlign}
          letterSpacing="wide"
          pb={[1, 2]}
        >
          {heading}
        </Heading>
        <Box
          height="3px"
          bgGradient="linear(to-r, teal.400, purple.500)"
          borderRadius="full"
        />
      </Box>
    </>
  );
}
SectionHeader.propTypes = {
  heading: PropTypes.string.isRequired,
  textAlign: PropTypes.string,
};
export default SectionHeader;
