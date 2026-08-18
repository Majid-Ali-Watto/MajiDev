import { Button, HStack } from "@chakra-ui/react";
import { devResume, hireMeLink } from "../data/generic-data";
import { FaExternalLinkAlt } from "react-icons/fa";
import { TbFileCv } from "react-icons/tb";
import printResume from "../utils/printResume";

export default function HireMe() {
  return (
    <HStack spacing={4} flexWrap="wrap" justifyContent="center">
      <Button
        as="a"
        href={hireMeLink}
        target="_blank"
        rel="noreferrer"
        colorScheme="green"
        size="md"
        leftIcon={<FaExternalLinkAlt />}
        _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
        transition="all 0.2s"
      >
        Hire Me
      </Button>
      <Button
        variant="outline"
        colorScheme="green"
        size="md"
        leftIcon={<TbFileCv />}
        onClick={printResume}
        _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
        transition="all 0.2s"
      >
        Resume
      </Button>
    </HStack>
  );
}
