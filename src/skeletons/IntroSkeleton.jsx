import { Box, Skeleton, SkeletonText, VStack, HStack } from "@chakra-ui/react";

// Mirrors components/Intro: same min-height, photo size and centered text stack
const IntroSkeleton = (
  <Box
    display="flex"
    flexDirection={{ base: "column", md: "row" }}
    minH={{ base: "auto", md: "calc(100dvh - 4rem)" }}
    alignItems="center"
    justifyContent={{ base: "center", md: "space-around" }}
    px={{ base: 2, md: 8 }}
    pt={{ base: "5rem", md: 0 }}
    pb={{ base: 6, md: 0 }}
    gap={{ base: 8, md: 0 }}
  >
    <Skeleton
      w={{ base: "clamp(150px, 50vw, 200px)", md: "clamp(220px, 28vw, 440px)" }}
      aspectRatio={1}
      borderRadius="3xl"
    />
    <VStack spacing={4} align="center" w={{ base: "100%", md: "55vw" }} px={{ base: 4, md: 0 }}>
      <Skeleton height="clamp(2.8rem, 3.5vw, 3.8rem)" width={{ base: "75%", md: "60%" }} />
      <Skeleton height="clamp(1.3rem, 2vw, 2rem)" width={{ base: "55%", md: "40%" }} />
      <HStack spacing={4}>
        <Skeleton height="14px" width="90px" />
        <Skeleton height="14px" width="120px" />
      </HStack>
      <Box w="100%" maxW="600px" pb={4}>
        <SkeletonText noOfLines={5} spacing={3} skeletonHeight="14px" />
      </Box>
      <HStack spacing={3}>
        <Skeleton height="40px" width="120px" borderRadius="md" />
        <Skeleton height="40px" width="120px" borderRadius="md" />
      </HStack>
    </VStack>
  </Box>
);

export default IntroSkeleton;
