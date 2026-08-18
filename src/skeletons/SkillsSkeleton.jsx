import { Box, Stack, SimpleGrid, Skeleton, SkeletonCircle } from "@chakra-ui/react";

const SkillsSkeleton = (
  <Stack p={8} w="100%" spacing={6}>
    <Skeleton height="30px" width="20%" />
    {[1, 2].map((cat) => (
      <Stack key={cat} spacing={3}>
        <Skeleton height="18px" width="28%" borderRadius="md" />
        <SimpleGrid columns={{ base: 3, md: 5, lg: 8 }} spacing={3}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Box
              key={i}
              p={3}
              borderRadius="lg"
              borderWidth="1px"
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
            >
              <SkeletonCircle size="8" />
              <Skeleton height="10px" width="80%" />
            </Box>
          ))}
        </SimpleGrid>
      </Stack>
    ))}
  </Stack>
);

export default SkillsSkeleton;
