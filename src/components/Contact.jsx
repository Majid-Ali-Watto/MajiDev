import { contactLinks } from "../assets/contact-links";
import { Link, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

function Contact() {
	const fadeInUp = {
		hidden: { opacity: 0, y: 50 },
		visible: { opacity: 1, y: 0, transition: { duration: 1.2 } }
	};
	return (
		<section id="contact" className="contact-form">
			<motion.div initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
				<Box w="fit-content" p={4} borderRadius="lg" overflow="hidden" className="top-links">
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
