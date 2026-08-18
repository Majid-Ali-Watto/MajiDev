import { contactLinks } from "../data/contact-links";
import { Link, Box, Tooltip } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { fadeInUp } from "../data/fadeInUpTransitionConfig";

function Contact() {
  return (
    <section id="contact" className="contact-form">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true }}
      >
        <Box
          w="fit-content"
          borderRadius="lg"
          overflow="hidden"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={[3, 5, 8]}
        >
          {contactLinks.map((contactLink) => {
            // Use React.createElement for the icon component
            const IconComponent = contactLink.icon;

            const linkProps = contactLink.onClick
              ? { as: "button", onClick: contactLink.onClick }
              : { href: contactLink.href, target: "_blank", rel: "noreferrer" };

            return (
              <Tooltip key={contactLink.title} label={contactLink.title} hasArrow>
                <Link
                  className="contact-link"
                  {...linkProps}
                >
                  <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    p={3}
                    transition="transform 0.3s ease, box-shadow 0.3s ease"
                    _hover={{ boxShadow: "xl", borderColor: "teal.400" }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      style={{ display: "inline-block" }}
                    >
                      <IconComponent
                        style={{ fontSize: "25px", color: contactLink.color }}
                      />
                    </motion.div>
                  </Box>
                </Link>
              </Tooltip>
            );
          })}
        </Box>
      </motion.div>
    </section>
  );
}

export default Contact;
