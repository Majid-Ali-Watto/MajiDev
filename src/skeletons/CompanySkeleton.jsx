import { Box, Stack, Skeleton, SkeletonText } from "@chakra-ui/react";

const CompanySkeleton = (
  <Stack p={8} w="100%" spacing={5}>
    <Skeleton height="30px" width="28%" />
    <Box borderRadius="lg" borderWidth="1px" overflow="hidden" p={4}>
      <Stack spacing={3}>
        <Skeleton height="24px" width="40%" />
        <Skeleton height="16px" width="60%" />
        <SkeletonText noOfLines={3} spacing={3} skeletonHeight="13px" />
        <Skeleton height="36px" width="180px" borderRadius="md" />
      </Stack>
    </Box>
  </Stack>
);

export default CompanySkeleton;
