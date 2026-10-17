import { Box, Skeleton } from "@chakra-ui/react";

// Same box as the real fixed header (style.css .header) so nothing shifts when it swaps in
const HeaderSkeleton = (
  <header className="header" style={{ animation: "none" }}>
    <Box px="1.1rem">
      <Skeleton height="1.5rem" width="7rem" startColor="whiteAlpha.200" endColor="whiteAlpha.400" />
    </Box>
    <Box display={{ base: "none", lg: "flex" }} gap={5} px={4}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Skeleton key={i} height="1rem" width="4rem" startColor="whiteAlpha.200" endColor="whiteAlpha.400" />
      ))}
    </Box>
    <Box display={{ base: "block", lg: "none" }} px="1.1rem">
      <Skeleton boxSize="1.75rem" startColor="whiteAlpha.200" endColor="whiteAlpha.400" />
    </Box>
  </header>
);

export default HeaderSkeleton;
