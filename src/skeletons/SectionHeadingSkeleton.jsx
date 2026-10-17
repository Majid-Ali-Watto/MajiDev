import { Box, Skeleton } from "@chakra-ui/react";

// Mirrors ui/SectionHeader: heading line over the teal→purple underline
const SectionHeadingSkeleton = (
  <Box mb={[3, 6]} width="fit-content">
    <Skeleton height="1.75rem" width={{ base: "8rem", md: "11rem" }} mb={[1, 2]} />
    <Box height="3px" bgGradient="linear(to-r, teal.400, purple.500)" borderRadius="full" opacity={0.5} />
  </Box>
);

export default SectionHeadingSkeleton;
