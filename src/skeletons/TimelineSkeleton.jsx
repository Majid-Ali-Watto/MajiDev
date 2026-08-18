import { Stack, Skeleton, SkeletonText, SkeletonCircle } from "@chakra-ui/react";

// Shared by Experience & Education (stepper / timeline layout)
const TimelineSkeleton = (
  <Stack p={8} w="100%" spacing={6}>
    <Skeleton height="30px" width="35%" />
    {[1, 2, 3].map((i) => (
      <Stack key={i} direction="row" spacing={4} align="flex-start">
        <SkeletonCircle size="10" flexShrink={0} />
        <Stack flex={1} spacing={3}>
          <Skeleton height="20px" width="55%" />
          <Skeleton height="14px" width="30%" />
          <SkeletonText noOfLines={2} spacing={3} skeletonHeight="13px" />
        </Stack>
      </Stack>
    ))}
  </Stack>
);

export default TimelineSkeleton;
