import { Box, Grid, HStack, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";
import SectionHeadingSkeleton from "./SectionHeadingSkeleton";

// Mirrors ui/CardsList (Services, Projects, Blogs, Packages)
const CardGridSkeleton = (
  <Box>
    {SectionHeadingSkeleton}
    <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={[3, 4, 6]} mt={[3, 6]}>
      {[1, 2, 3].map((i) => (
        <Box key={i} borderRadius="xl" borderWidth="1px" overflow="hidden">
          <Skeleton height="13rem" />
          <Stack p={5} spacing={3}>
            <Skeleton height="1.4rem" width="65%" />
            <HStack spacing={1.5}>
              <Skeleton height="1.25rem" width="3.5rem" borderRadius="full" />
              <Skeleton height="1.25rem" width="4.5rem" borderRadius="full" />
              <Skeleton height="1.25rem" width="3rem" borderRadius="full" />
            </HStack>
            <SkeletonText noOfLines={1} skeletonHeight="14px" />
            <Skeleton height="14px" width="5rem" />
          </Stack>
          <HStack spacing={3} px={5} pb={5}>
            <Skeleton height="2rem" width="5.5rem" borderRadius="md" />
            <Skeleton height="2rem" width="5.5rem" borderRadius="md" />
          </HStack>
        </Box>
      ))}
    </Grid>
  </Box>
);

export default CardGridSkeleton;
