import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useBreakpointValue,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function MyAccordion({ title, about, children }) {
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
            <div
              style={{
                fontSize: fontSize,
                textAlign: "left",
                marginLeft: "0.5rem",
              }}
            >
              <span style={{ fontWeight: "600" }}>{title}</span>
              {about ? <span>: {about}</span> : null}
            </div>
          </AccordionButton>
        </span>

        <AccordionPanel
          ml={5}
          pb={4}
          fontSize={fontSize - 10}
          px={0}
          lineHeight="1.65"
        >
          {children}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

MyAccordion.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  about: PropTypes.string,
};
