import { Box, Stack, SimpleGrid, Skeleton, SkeletonText } from "@chakra-ui/react";

// Shared by Services, Projects, Blogs & Packages (card grid layout)
const CardGridSkeleton = (
  <Stack p={8} w="100%" spacing={5}>
    <Skeleton height="30px" width="28%" />
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
      {[1, 2, 3].map((i) => (
        <Box key={i} borderRadius="lg" borderWidth="1px" overflow="hidden">
          <Skeleton height="160px" />
          <Stack p={4} spacing={3}>
            <Skeleton height="20px" width="70%" />
            <SkeletonText noOfLines={3} spacing={3} skeletonHeight="13px" />
          </Stack>
          <Box px={4} pb={4}>
            <Skeleton height="32px" borderRadius="md" />
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  </Stack>
);

export default CardGridSkeleton;
