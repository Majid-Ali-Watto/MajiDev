import { Heading } from "@chakra-ui/react";
import PropTypes from "prop-types";
import Helmet_SEO from "./Helmet";

function SectionHeader({ heading, textAlign = "left" }) {
  return (
    <>
      <Helmet_SEO />
      <div className="divider"></div>
      <Heading
        as="h4"
        size="lg"
        mb="3"
        textAlign={textAlign}
        width={"fit-content"}
        borderBottom={"1px dashed"}
        borderLeft={"1px dashed"}
        borderRight={"1px dashed"}
        padding={"4px 8px"}
        boxShadow={"md"}
      >
        {heading}
      </Heading>
    </>
  );
}
SectionHeader.propTypes = {
  heading: PropTypes.string.isRequired,
  textAlign: PropTypes.string,
};
export default SectionHeader;
