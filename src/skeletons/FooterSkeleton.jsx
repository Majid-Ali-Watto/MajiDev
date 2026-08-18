import { Box, Stack, Skeleton, SkeletonCircle } from "@chakra-ui/react";

const FooterSkeleton = (
  <Box p={6} textAlign="center" w="100%">
    <Skeleton height="1px" mb={6} />
    <Stack direction="row" justify="center" spacing={6} mb={4}>
      {[1, 2, 3, 4].map((i) => <SkeletonCircle key={i} size="8" />)}
    </Stack>
    <Skeleton height="14px" width="180px" mx="auto" />
  </Box>
);

export default FooterSkeleton;
