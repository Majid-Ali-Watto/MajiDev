import { Stack, Skeleton, SkeletonText, SkeletonCircle } from "@chakra-ui/react";

const IntroSkeleton = (
  <Stack direction={{ base: "column", md: "row" }} p={8} spacing={8} align="center" w="100%">
    <SkeletonCircle size="48" flexShrink={0} />
    <Stack flex={1} spacing={4}>
      <Skeleton height="40px" width="60%" />
      <Skeleton height="24px" width="45%" />
      <SkeletonText noOfLines={3} spacing={3} skeletonHeight="14px" />
      <Stack direction="row" spacing={3} mt={2}>
        <Skeleton height="36px" width="110px" borderRadius="md" />
        <Skeleton height="36px" width="110px" borderRadius="md" />
      </Stack>
    </Stack>
  </Stack>
);

export default IntroSkeleton;
