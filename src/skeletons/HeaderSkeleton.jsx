import { Box, Stack, Skeleton } from "@chakra-ui/react";

const HeaderSkeleton = (
  <Box px={8} py={4} display="flex" justifyContent="space-between" alignItems="center" w="100%">
    <Skeleton height="30px" width="120px" borderRadius="md" />
    <Stack direction="row" spacing={6}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton key={i} height="18px" width="60px" borderRadius="md" />
      ))}
    </Stack>
  </Box>
);

export default HeaderSkeleton;
