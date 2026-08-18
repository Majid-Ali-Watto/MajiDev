import { Box, SimpleGrid, Skeleton, SkeletonCircle } from "@chakra-ui/react";

const StatsSkeleton = (
  <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} p={8} w="100%">
    {[1, 2, 3, 4].map((i) => (
      <Box key={i} p={5} borderRadius="lg" borderWidth="1px" textAlign="center">
        <SkeletonCircle size="10" mx="auto" mb={3} />
        <Skeleton height="32px" width="50%" mx="auto" mb={2} />
        <Skeleton height="14px" width="65%" mx="auto" />
      </Box>
    ))}
  </SimpleGrid>
);

export default StatsSkeleton;
