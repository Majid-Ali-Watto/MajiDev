import { Box, Flex, SimpleGrid, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import SectionHeadingSkeleton from "./SectionHeadingSkeleton";

// Mirrors components/Skills: category panels with a row of chips
const SkillsSkeleton = (
  <Box>
    {SectionHeadingSkeleton}
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={[4, 6]}>
      {[1, 2, 3, 4].map((panel) => (
        <Box
          key={panel}
          p={[4, 6]}
          borderRadius="xl"
          borderWidth="1px"
          borderTopWidth="3px"
          borderTopColor="teal.400"
        >
          <Flex align="center" gap={3} mb={4}>
            <SkeletonCircle boxSize="2.5rem" />
            <Skeleton height="1.2rem" width="35%" />
          </Flex>
          <Flex wrap="wrap" gap={2}>
            {[5, 7, 6, 8, 5, 7].map((w, chip) => (
              <Skeleton key={chip} height="2rem" width={`${w * 14}px`} borderRadius="full" />
            ))}
          </Flex>
        </Box>
      ))}
    </SimpleGrid>
  </Box>
);

export default SkillsSkeleton;
