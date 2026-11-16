/** @format */

import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Heading,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { Element } from "react-scroll";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import SectionHeader from "../ui/SectionHeader";
import { fadeInUp } from "../data/fadeInUpTransitionConfig";
import useContent from "../hooks/useContent";

function Company() {
  const companyData = useContent("company");
  return (
    <Element id="company" className="company">
      <Box textAlign="left" mb="4">
        <SectionHeader heading="New Venture" />
      </Box>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true }}
      >
        <Card
          variant="outline"
          bg="chakra-body-bg"
          borderRadius="xl"
          borderTopWidth="3px"
          borderTopColor="purple.400"
          overflow="hidden"
          transition="transform 0.3s ease, box-shadow 0.3s ease"
          _hover={{ transform: "translateY(-3px)", boxShadow: "xl" }}
        >
          <CardBody>
            <Stack spacing={3}>
              <HStack spacing={3} flexWrap="wrap">
                <Heading as="h4" size="lg" bgGradient="linear(to-r, teal.400, purple.500)" bgClip="text">
                  {companyData.name}
                </Heading>
                <Badge colorScheme="green" borderRadius="full" px={3} py={0.5}>
                  <Box as="span" display="inline-block" boxSize="6px" borderRadius="full" bg="green.400" mr={1.5} mb="1px" />
                  {companyData.status}
                </Badge>
              </HStack>
              <Text fontSize="md" fontWeight="semibold" opacity={0.75}>
                {companyData.tagline}
              </Text>
              <Text fontSize="md">{companyData.description}</Text>
            </Stack>
          </CardBody>
          <CardFooter pt={0}>
            <Button
              as="a"
              href={companyData.link}
              target="_blank"
              rel="noopener noreferrer"
              colorScheme="teal"
              rightIcon={<FaArrowRight />}
            >
              Visit {companyData.name}
            </Button>
          </CardFooter>
          <HStack
            justify="flex-start"
            align="center"
            wrap="wrap"
            px={[4, 6]}
            pb={[4, 6]}
            spacing={0}
            gap={1.5}
          >
            {companyData.stack.map((item) => (
              <Tag key={item} colorScheme="teal" size="md" borderRadius="full">
                {item}
              </Tag>
            ))}
          </HStack>
        </Card>
      </motion.div>
    </Element>
  );
}

export default Company;
