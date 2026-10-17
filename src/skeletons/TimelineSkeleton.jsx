import { Box, Skeleton, SkeletonCircle, SkeletonText, Stack } from "@chakra-ui/react";
import SectionHeadingSkeleton from "./SectionHeadingSkeleton";

// Shared by Experience & Education: stepper indicator + ui/TimelineCard
const TimelineSkeleton = (
  <Box>
    {SectionHeadingSkeleton}
    <Stack spacing={[3, 5]} width={["100%", "95%"]}>
      {[1, 2, 3].map((i) => (
        <Stack key={i} direction="row" spacing={[2, 3]} align="flex-start">
          <SkeletonCircle boxSize={[8, 10]} flexShrink={0} />
          <Box
            flex={1}
            minW={0}
            borderWidth="1px"
            borderLeftWidth="4px"
            borderLeftColor="teal.400"
            borderRadius="xl"
            p={[3, 5]}
          >
            <Stack spacing={2}>
              <Skeleton height="1.4rem" width="55%" />
              <Skeleton height="1rem" width="35%" />
              <Skeleton height="14px" width="45%" />
              <SkeletonText noOfLines={2} spacing={3} skeletonHeight="13px" mt={2} />
            </Stack>
          </Box>
        </Stack>
      ))}
    </Stack>
  </Box>
);

export default TimelineSkeleton;
