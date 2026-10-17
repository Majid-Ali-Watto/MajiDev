import { Box, HStack, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";
import SectionHeadingSkeleton from "./SectionHeadingSkeleton";

// Mirrors components/Company: one featured card
const CompanySkeleton = (
  <Box>
    {SectionHeadingSkeleton}
    <Box borderRadius="xl" borderWidth="1px" borderTopWidth="3px" borderTopColor="purple.400" p={[4, 6]}>
      <Stack spacing={3}>
        <HStack spacing={3}>
          <Skeleton height="2rem" width="12rem" />
          <Skeleton height="1.4rem" width="5rem" borderRadius="full" />
        </HStack>
        <Skeleton height="1.2rem" width="55%" />
        <SkeletonText noOfLines={3} spacing={3} skeletonHeight="14px" />
        <Skeleton height="40px" width="11rem" borderRadius="md" mt={2} />
        <HStack spacing={1.5} wrap="wrap" pt={2}>
          {[4, 5, 3, 6, 4].map((w, i) => (
            <Skeleton key={i} height="1.5rem" width={`${w}rem`} borderRadius="full" />
          ))}
        </HStack>
      </Stack>
    </Box>
  </Box>
);

export default CompanySkeleton;
