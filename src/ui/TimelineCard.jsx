import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function TimelineCard({ children }) {
  return (
    <Box
      flex={1}
      minW={0}
      ml={[0, 2]}
      bg="chakra-body-bg"
      borderWidth="1px"
      borderLeftWidth="4px"
      borderLeftColor="teal.400"
      borderRadius="xl"
      p={[3, 5]}
      transition="transform 0.3s ease, box-shadow 0.3s ease"
      _hover={{ transform: "translateY(-3px)", boxShadow: "xl" }}
    >
      {children}
    </Box>
  );
}

TimelineCard.propTypes = { children: PropTypes.node };
