/** @format */

import PropTypes from "prop-types";
import { Text, Box, HStack, Link, Icon, Divider, VStack } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaMedium } from "react-icons/fa";
import { TbBrandUpwork } from "react-icons/tb";
import { devGithub, devPortfolio, devArticles, hireMeLink } from "../data/generic-data";

Footer.propTypes = {
  owner: PropTypes.string,
};
function Footer({ owner }) {
  const socialLinks = [
    { href: devPortfolio, icon: FaLinkedin, label: "LinkedIn" },
    { href: devGithub, icon: FaGithub, label: "GitHub" },
    { href: devArticles, icon: FaMedium, label: "Medium" },
    { href: hireMeLink, icon: TbBrandUpwork, label: "Upwork" },
  ];

  return (
    <Box as="footer" py={6} textAlign="center">
      <Divider mb={6} />
      <VStack spacing={4}>
        <HStack spacing={6} justifyContent="center">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
            >
              <Icon
                as={link.icon}
                boxSize={5}
                opacity={0.7}
                _hover={{ opacity: 1, color: "green.500" }}
                transition="all 0.2s"
              />
            </Link>
          ))}
        </HStack>
        <Text fontSize="sm" opacity={0.7}>
          &copy; {new Date().getFullYear()} {owner}. Islamabad, Pakistan.
        </Text>
      </VStack>
    </Box>
  );
}

export default Footer;
