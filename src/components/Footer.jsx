/** @format */

import { Text, Box } from "@chakra-ui/react";
import useContent from "../hooks/useContent";

function Footer() {
  const { devName: owner } = useContent("settings");
  return (
    <Box as="footer" mt={[6, 10]}>
      <Box h="3px" bgGradient="linear(to-r, teal.400, purple.500)" borderRadius="full" />
      {/* Extra bottom padding on mobile keeps the text clear of the fixed theme toggle */}
      <Text fontSize="sm" opacity={0.7} textAlign="center" pt={[4, 6]} pb={[14, 6]}>
        &copy; {new Date().getFullYear()} {owner}. All rights reserved.
      </Text>
    </Box>
  );
}

export default Footer;
