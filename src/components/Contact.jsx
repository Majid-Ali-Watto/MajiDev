import { Button, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import useContactLinks from "../hooks/useContactLinks";
import { fadeInUp } from "../data/fadeInUpTransitionConfig";

const MotionButton = motion(Button);

function Contact() {
  const contacts = useContactLinks();
  return (
    <section id="contact" className="contact-form">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true }}
      >
        <Flex wrap="wrap" justify="center" gap={[2, 3]} maxW="640px">
          {contacts.map(({ title, color, Icon, linkProps }, index) => (
            <MotionButton
              key={`${index}-${title}`}
              {...linkProps}
              variant="outline"
              size={["sm", "md"]}
              borderRadius="full"
              fontWeight="500"
              leftIcon={<Icon color={color} />}
              _hover={{ boxShadow: "lg", borderColor: "teal.400" }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {title}
            </MotionButton>
          ))}
        </Flex>
      </motion.div>
    </section>
  );
}

export default Contact;
