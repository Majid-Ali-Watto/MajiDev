import { SimpleGrid, Skeleton, SkeletonCircle, VStack } from "@chakra-ui/react";

// Mirrors components/Stats
const StatsSkeleton = (
  <SimpleGrid columns={[2, 2, 4]} spacing={[3, 6, 8]} py={[4, 8]} px={[1, 4]}>
    {[1, 2, 3, 4].map((i) => (
      <VStack
        key={i}
        spacing={2}
        p={[3, 5]}
        borderRadius="xl"
        border="1px solid"
        borderColor="teal.200"
        _dark={{ borderColor: "teal.700" }}
      >
        <SkeletonCircle boxSize={[9, 11]} />
        <Skeleton height={["1.75rem", "2rem", "2.25rem"]} width="50%" />
        <Skeleton height="14px" width="65%" />
      </VStack>
    ))}
  </SimpleGrid>
);

export default StatsSkeleton;
