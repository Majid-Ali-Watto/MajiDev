import { Box, Button, Flex, Grid, Heading, HStack, Icon, SimpleGrid, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaArrowRight, FaEnvelope, FaLocationDot } from "react-icons/fa6";
import SectionHeader from "../ui/SectionHeader";
import useContactLinks from "../hooks/useContactLinks";
import { devLocation } from "../data/generic-data";
import { fadeInUp } from "../data/fadeInUpTransitionConfig";

// The /contact page; the intro on Home keeps the compact button row (components/Contact)
function ContactPage() {
  const contacts = useContactLinks();
  const email = contacts.find(({ href }) => href?.startsWith("mailto:"));
  const iconBg = useColorModeValue("blackAlpha.50", "whiteAlpha.100");

  return (
    <Box id="contact">
      <SectionHeader heading="Contact" />

      <Grid templateColumns={{ base: "1fr", lg: "2fr 3fr" }} gap={{ base: 8, lg: 12 }} alignItems="start" mt={[2, 4]}>
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <VStack align="start" spacing={5}>
            <Heading as="h2" size={["xl", "2xl"]} lineHeight="1.2" bgGradient="linear(to-r, teal.400, purple.500)" bgClip="text">
              Let&apos;s build something together
            </Heading>
            <Text fontSize={["md", "lg"]} opacity={0.8} lineHeight="1.7">
              Have a project in mind, a role to fill, or just a question? Reach out on whichever channel suits you best.
            </Text>
            {email && (
              <Button {...email.linkProps} size="lg" colorScheme="teal" borderRadius="full" leftIcon={<FaEnvelope />}>
                Email me
              </Button>
            )}
            <HStack spacing={2} opacity={0.7}>
              <Icon as={FaLocationDot} color="green.500" />
              <Text fontSize="sm">{devLocation}</Text>
            </HStack>
          </VStack>
        </motion.div>

        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={[3, 4]}>
          {contacts.map(({ title, detail, color, Icon: ContactIcon, linkProps }, index) => (
            <motion.div key={`${index}-${title}`} initial="hidden" animate="visible" variants={fadeInUp}>
              <Flex
                {...linkProps}
                role="group"
                w="100%"
                h="100%"
                align="center"
                gap={4}
                p={4}
                textAlign="left"
                borderWidth="1px"
                borderRadius="xl"
                bg="chakra-body-bg"
                cursor="pointer"
                transition="transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease"
                _hover={{ transform: "translateY(-3px)", boxShadow: "lg", borderColor: "teal.400" }}
                _focusVisible={{ outline: "2px solid", outlineColor: "teal.400", outlineOffset: "2px" }}
              >
                <Flex flexShrink={0} boxSize={12} align="center" justify="center" borderRadius="lg" bg={iconBg} fontSize="xl">
                  <ContactIcon color={color} />
                </Flex>
                <Box minW={0} flex={1}>
                  <Text fontWeight="600">{title}</Text>
                  <Text fontSize="sm" opacity={0.65} noOfLines={1} wordBreak="break-all">
                    {detail}
                  </Text>
                </Box>
                <Icon
                  as={FaArrowRight}
                  flexShrink={0}
                  opacity={0.4}
                  transition="transform 0.2s ease, opacity 0.2s ease"
                  _groupHover={{ opacity: 1, transform: "translateX(3px)", color: "teal.400" }}
                />
              </Flex>
            </motion.div>
          ))}
        </SimpleGrid>
      </Grid>
    </Box>
  );
}

export default ContactPage;
