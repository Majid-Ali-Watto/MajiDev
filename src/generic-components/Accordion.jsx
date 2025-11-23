import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function MyAccordion({ title, children }) {
  const fontSize = useBreakpointValue({
    base: "sm",
    md: "md",
  });

  const paddingY = useBreakpointValue({
    base: 1.5,
    md: 2,
  });

  return (
    <Accordion allowMultiple width="100%">
      <AccordionItem border="none">
        <span>
          <AccordionButton px={0} py={paddingY}>
            <AccordionIcon
              fontSize={useBreakpointValue({ base: "lg", md: "xl" })}
            />

            <Box
              as="span"
              flex="1"
              textAlign="left"
              fontSize={fontSize}
              fontWeight="semibold"
              ml={2}
              wordBreak="break-word"
              whiteSpace="normal"
            >
              {title || "Details"}
            </Box>
          </AccordionButton>
        </span>

        <AccordionPanel pb={4} fontSize={fontSize} px={0} lineHeight="1.65">
          {children}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

MyAccordion.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};
