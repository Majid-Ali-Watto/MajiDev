import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import PropTypes from "prop-types";
import { navLinks } from "../data/nav-links";

function PageLink({ link, label, direction }) {
  const isNext = direction === "next";
  return (
    <Box
      as={Link}
      to={link.path}
      gridColumn={isNext ? 2 : 1}
      display="flex"
      flexDirection="column"
      alignItems={isNext ? "flex-end" : "flex-start"}
      px={3}
      py={2}
      borderRadius="lg"
      borderWidth="1px"
      borderColor="rgba(56, 178, 172, 0.25)"
      bgGradient="linear(135deg, rgba(56, 178, 172, 0.06), rgba(128, 90, 213, 0.06))"
      transition="border-color 0.25s, transform 0.25s"
      _hover={{ borderColor: "teal.400", transform: "translateY(-1px)" }}
    >
      <Text as="span" fontSize="2xs" textTransform="uppercase" letterSpacing="wider" opacity={0.6}>
        {label}
      </Text>
      <Text
        as="span"
        display="flex"
        alignItems="center"
        gap={1.5}
        fontSize="sm"
        fontWeight="semibold"
        color="teal.600"
        _dark={{ color: "teal.300" }}
      >
        {!isNext && <FiArrowLeft aria-hidden />}
        {link.pathTitle}
        {isNext && <FiArrowRight aria-hidden />}
      </Text>
    </Box>
  );
}
PageLink.propTypes = {
  link: PropTypes.shape({ path: PropTypes.string, pathTitle: PropTypes.string }).isRequired,
  label: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(["prev", "next"]).isRequired,
};

// Previous/next links in header order; CSS shows them only while the header is collapsed to the hamburger
function PageNav() {
  const { pathname } = useLocation();
  const index = navLinks.findIndex((item) => item.path === pathname);
  if (index === -1) return null;

  const prev = navLinks[index - 1];
  const next = navLinks[index + 1];

  return (
    <nav className="page-nav" aria-label="Page">
      <SimpleGrid columns={2} spacing={2} mt={3}>
        {prev && <PageLink link={prev} label="Previous" direction="prev" />}
        {next && <PageLink link={next} label="Next" direction="next" />}
      </SimpleGrid>
    </nav>
  );
}

export default PageNav;
