import { Box, Flex, Grid, SimpleGrid, Skeleton, SkeletonText, VStack } from "@chakra-ui/react";
import SectionHeadingSkeleton from "./SectionHeadingSkeleton";

// Mirrors components/ContactPage: intro column beside a grid of contact cards
const ContactSkeleton = (
  <Box>
    {SectionHeadingSkeleton}
    <Grid templateColumns={{ base: "1fr", lg: "2fr 3fr" }} gap={{ base: 8, lg: 12 }} alignItems="start" mt={[2, 4]}>
      <VStack align="start" spacing={5}>
        <Skeleton height={["2.25rem", "3rem"]} width="85%" />
        <Skeleton height={["2.25rem", "3rem"]} width="60%" />
        <SkeletonText w="100%" noOfLines={3} spacing={3} skeletonHeight="16px" />
        <Skeleton height="3rem" width="9rem" borderRadius="full" />
        <Skeleton height="14px" width="10rem" />
      </VStack>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={[3, 4]}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Flex key={i} align="center" gap={4} p={4} borderWidth="1px" borderRadius="xl">
            <Skeleton boxSize={12} borderRadius="lg" flexShrink={0} />
            <Box flex={1}>
              <Skeleton height="1rem" width="45%" mb={2} />
              <Skeleton height="0.8rem" width="80%" />
            </Box>
          </Flex>
        ))}
      </SimpleGrid>
    </Grid>
  </Box>
);

export default ContactSkeleton;
