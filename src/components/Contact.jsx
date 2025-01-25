import { contactLinks } from "../assets/contact-links";
import { Link, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { fadeInUp } from "../assets/fadeInUpTransitionConfig";

function Contact() {

	return (
		<section id="contact" className="contact-form">
			<motion.div initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
				<Box w="fit-content" borderRadius="lg" overflow="scroll" className="top-links">
					{contactLinks.map((contactLink) => {
						// Use React.createElement for the icon component
						const IconComponent = contactLink.icon;

						return (
							<Link key={contactLink.title} href={contactLink.href} target="_blank" rel="noreferrer">
								<abbr title={contactLink.title}>
									<motion.div
										whileHover={{ scale: 1.2 }} // Scale effect on hover
										whileTap={{ scale: 0.9 }} // Tap effect
										transition={{ type: "spring", stiffness: 300, damping: 10 }}
										style={{ display: "inline-block" }}
									>
										<IconComponent style={{ fontSize: "25px", color: contactLink.color }} />
									</motion.div>
								</abbr>
							</Link>
						);
					})}
				</Box>
			</motion.div>
		</section>
	);
}

export default Contact;
