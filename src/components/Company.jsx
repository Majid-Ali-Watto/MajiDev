/** @format */

import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
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
import { companyData } from "../data/company-data";

function Company() {
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
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          transition="transform 0.3s ease, box-shadow 0.3s ease"
          _hover={{ transform: "translateY(-3px)", boxShadow: "xl" }}
        >
          <CardBody>
            <Stack spacing={3}>
              <HStack spacing={3} flexWrap="wrap">
                <Heading as="h4" size="md">
                  {companyData.name}
                </Heading>
                <Badge colorScheme="green" borderRadius="full" px={3} py={0.5}>
                  {companyData.status}
                </Badge>
              </HStack>
              <Text fontSize="sm" fontWeight="semibold" opacity={0.75}>
                {companyData.tagline}
              </Text>
              <Text fontSize="md">{companyData.description}</Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
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
            px={[1, 3]}
            pb={[3, 4]}
            spacing="5px"
          >
            {companyData.stack.map((item) => (
              <Tag key={item} colorScheme="blue" size="md">
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
