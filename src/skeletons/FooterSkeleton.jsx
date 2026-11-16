import { Box, Skeleton } from "@chakra-ui/react";

// Mirrors components/Footer
const FooterSkeleton = (
  <Box mt={[6, 10]}>
    <Box h="3px" bgGradient="linear(to-r, teal.400, purple.500)" borderRadius="full" opacity={0.5} />
    <Box py={[4, 6]}>
      <Skeleton height="14px" width="16rem" maxW="80%" mx="auto" />
    </Box>
  </Box>
);

export default FooterSkeleton;
